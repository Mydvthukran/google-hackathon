import { z } from 'zod';

export const UserContextSchema = z.object({
  role: z.string(),
  goal: z.enum(['decide_to_sign', 'negotiate', 'exit_or_dispute', 'understand']),
  jurisdiction: z.string().optional(),
  language: z.string().default('en'),
  readingLevel: z.enum(['simple', 'standard', 'detailed']).default('standard'),
  deadline: z.string().optional(),
  stakes: z.enum(['low', 'medium', 'high']).default('medium'),
  riskTolerance: z.enum(['low', 'medium', 'high']).default('medium')
});

export type UserContext = z.infer<typeof UserContextSchema>;

export const FlagSchema = z.enum([
  'unilateral', 'uncapped', 'auto_renewal', 'lock_in', 'penalty',
  'forfeiture', 'rights_waiver', 'arbitration_or_venue', 'ambiguous', 'missing_protection'
]);

export type Flag = z.infer<typeof FlagSchema>;

export const FindingSchema = z.object({
  id: z.string(),
  category: z.string(),
  paragraphId: z.string(),
  quote: z.string(),
  plainSummary: z.string(),
  favors: z.enum(['partyA', 'partyB', 'neutral', 'unclear']),
  flags: z.array(FlagSchema),
  confidence: z.enum(['low', 'medium', 'high'])
});

export type Finding = z.infer<typeof FindingSchema>;

export const DocumentInfoSchema = z.object({
  documentType: z.string(),
  partyA: z.string(),
  partyB: z.string(),
  partyAMapping: z.string(), // e.g., 'landlord', 'employer'
  partyBMapping: z.string(), // e.g., 'tenant', 'employee'
});

export type DocumentInfo = z.infer<typeof DocumentInfoSchema>;

export interface DecisionResult {
  triage: 'L0' | 'L1' | 'L2' | 'L3';
  severityByFinding: Record<string, 'info' | 'low' | 'medium' | 'high' | 'critical'>;
  actions: string[];
  reasons: string[];
  clarifyingQuestions: string[];
}
