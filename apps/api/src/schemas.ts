import { z } from 'zod';

export const analyzeFlowInput = z.object({
  text: z.string(),
  userContext: z.any() // using any here for brevity, normally imported from core
});

export const classifyFlowInput = z.object({
  text: z.string()
});
