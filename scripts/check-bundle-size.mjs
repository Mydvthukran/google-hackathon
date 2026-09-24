import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Budget in bytes (350KB, increased from 250KB for React/Vite/Radix base)
const BUDGET = 350 * 1024; 

const distDir = path.join(ROOT_DIR, 'apps', 'web', 'dist', 'assets');

if (!fs.existsSync(distDir)) {
  console.log('[WARN] No dist dir found. Build the app first.');
  process.exit(0);
}

let totalSize = 0;
const files = fs.readdirSync(distDir);

for (const f of files) {
  if (f.endsWith('.js') || f.endsWith('.css')) {
    totalSize += fs.statSync(path.join(distDir, f)).size;
  }
}

if (totalSize > BUDGET) {
  console.error(`[FAIL] Bundle size ${(totalSize / 1024).toFixed(2)} KB exceeds budget of ${BUDGET / 1024} KB`);
  process.exit(1);
} else {
  console.log(`[PASS] Bundle size ${(totalSize / 1024).toFixed(2)} KB is under budget of ${BUDGET / 1024} KB`);
  process.exit(0);
}
