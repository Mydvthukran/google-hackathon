import express from 'express';
import cors from 'cors';
import { FakeLlm } from './fake-llm.js';
import { setupSSE, sendSSE } from './utils/sse.js';

const app = express();
app.use(cors());
app.use(express.json());

const DEMO_MODE = process.env.GEMINI_API_KEY ? false : true;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', demoMode: DEMO_MODE });
});

app.post('/api/v1/analyze', async (req, res) => {
  if (DEMO_MODE) {
    const fake = new FakeLlm();
    const result = await fake.analyze(req.body.text || '');
    return res.json(result);
  } else {
    return res.status(501).json({ error: 'Not implemented in real mode yet.' });
  }
});

// SSE endpoint for analysis
app.get('/api/v1/analyze/stream', async (req, res) => {
  setupSSE(res);
  sendSSE(res, 'status', { message: 'Extracting text...' });
  setTimeout(() => sendSSE(res, 'status', { message: 'Segmenting...' }), 500);
  setTimeout(() => {
    sendSSE(res, 'result', { triage: 'L1', findings: [] });
    res.end();
  }, 1000);
});

// Mock endpoints for Genkit flows
['classify', 'ask', 'compare', 'what-if', 'glossary'].forEach(endpoint => {
  app.post(`/api/v1/${endpoint}`, (req, res) => {
    res.json({ status: 'mocked', endpoint });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT} | DEMO_MODE: ${DEMO_MODE}`);
});
