import express from 'express';
import cors from 'cors';
import { FakeLlm } from './fake-llm.js';

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
    // Genkit real implementation goes here
    return res.status(501).json({ error: 'Not implemented in real mode yet.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT} | DEMO_MODE: ${DEMO_MODE}`);
});
