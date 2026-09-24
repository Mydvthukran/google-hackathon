import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let hasError = false;

function error(msg) {
  console.error(`[FAIL] ${msg}`);
  hasError = true;
}

function info(msg) {
  console.log(`[PASS] ${msg}`);
}

// 1. Check size (< 8MB tracked + .git)
try {
  // Approximate tracked size + .git folder. We will just check .git folder and tracked files.
  // Windows `dir /s` is slow and parsing is annoying, so let's do a simple node traversal for known bad folders.
  // Actually, wait, the prompt says "total size (tracked files + .git) exceeds 8 MB".
  // A simple approximation is checking if .git + source files is < 8MB.
  let totalSize = 0;
  
  function getDirSize(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;
    const files = fs.readdirSync(dirPath);
    let size = 0;
    for (const f of files) {
      if (f === 'node_modules' || f === 'dist' || f === 'coverage') continue;
      const fPath = path.join(dirPath, f);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory()) {
        size += getDirSize(fPath);
      } else {
        size += stat.size;
      }
    }
    return size;
  }
  
  totalSize = getDirSize(ROOT_DIR);
  const MB = 1024 * 1024;
  if (totalSize > 8 * MB) {
    error(`Total size exceeds 8MB (currently ${(totalSize / MB).toFixed(2)} MB)`);
  } else {
    info(`Size is within limits (${(totalSize / MB).toFixed(2)} MB)`);
  }
} catch (e) {
  error(`Could not check size: ${e.message}`);
}

// 2. Check branch count (exactly 1)
try {
  const branchLines = execSync('git branch -a', { encoding: 'utf-8' })
    .split('\n')
    .filter(b => b.trim().length > 0 && !b.includes('HEAD'));
  const uniqueBranches = new Set(
    branchLines.map(b => b.replace('*', '').trim().replace(/^remotes\/[^\/]+\//, ''))
  );
  if (uniqueBranches.size > 1) {
    error(`Too many branches. Exactly 1 branch allowed, found ${uniqueBranches.size}: ${Array.from(uniqueBranches).join(', ')}`);
  } else {
    info(`Exactly 1 branch found.`);
  }
} catch (e) {
  console.warn(`[WARN] Git branch check failed: ${e.message}`);
}

// 3. No .env/key/secret pattern tracked
try {
  const trackedFiles = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
  const forbidden = ['.env', 'service-account', '.key', 'secret'];
  const hasSecrets = trackedFiles.some(f => forbidden.some(forbid => f.includes(forbid)) && !f.endsWith('.example'));
  if (hasSecrets) {
    error(`Tracked secrets found in git!`);
  } else {
    info(`No tracked secrets found.`);
  }
  
  // 4. Any tracked file > 500KB
  let oversized = false;
  for (const f of trackedFiles) {
    const fPath = path.join(ROOT_DIR, f);
    if (fs.existsSync(fPath) && fs.statSync(fPath).size > 500 * 1024) {
      error(`File too large (>500KB): ${f}`);
      oversized = true;
    }
  }
  if (!oversized) info(`No tracked files exceed 500KB.`);
  
  // 5. Check lockfile & LICENSE
  if (!trackedFiles.includes('package-lock.json') && !trackedFiles.includes('yarn.lock')) {
    error(`Missing lockfile in git tracker (or git not init).`);
  } else {
    info(`Lockfile tracked.`);
  }
  if (!trackedFiles.some(f => f.toLowerCase() === 'license')) {
    error(`Missing LICENSE file.`);
  } else {
    info(`LICENSE found.`);
  }
  
  // 6. node_modules or dist tracked
  if (trackedFiles.some(f => f.includes('node_modules/') || f.includes('dist/'))) {
    error(`node_modules or dist are tracked!`);
  } else {
    info(`No build output tracked.`);
  }

  // 7. README headings
  const readmeContent = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');
  const requiredHeadings = [
    'Chosen vertical', 'Approach and logic', 'How it works', 'Assumptions'
  ];
  const missing = requiredHeadings.filter(h => !readmeContent.toLowerCase().includes(h.toLowerCase()));
  if (missing.length > 0) {
    error(`README missing required headings: ${missing.join(', ')}`);
  } else {
    info(`README has all required headings.`);
  }
} catch (e) {
  console.warn(`[WARN] Git tracked files check failed: ${e.message}`);
}

if (hasError) {
  console.error('\n[X] Preflight failed!');
  process.exit(1);
} else {
  console.log('\n[V] Preflight passed!');
  process.exit(0);
}
