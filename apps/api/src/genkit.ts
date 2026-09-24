import { genkit, z } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

let ai: any;
export function configureGenkit() {
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = genkit({
        plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
      });
    } catch(e) {
       console.warn("Failed to init genkit with real key", e);
    }
  }
}

export async function analyzeDocumentFlow(text: string, context: any) {
  if (!ai) {
    throw new Error("Genkit is not configured with a valid Gemini API key.");
  }
  
  const prompt = `You are a legal document analyzer. Review this text and extract clauses and risks.
  User Role: ${context?.role || 'tenant'}
  Text to analyze:
  ${text.substring(0, 10000)}
  `;
  
  const response = await ai.generate({
    model: gemini15Flash,
    prompt: prompt,
    output: {
      schema: z.object({
        documentType: z.string(),
        triage: z.string().describe("L0, L1, L2, or L3"),
        findings: z.array(z.object({
          id: z.string(),
          severity: z.string().describe("info, low, medium, high, critical"),
          category: z.string(),
          title: z.string(),
          description: z.string(),
          implication: z.string(),
          recommendation: z.string(),
          quote: z.string(),
          impactScore: z.number()
        }))
      })
    }
  });

  return response.output();
}
