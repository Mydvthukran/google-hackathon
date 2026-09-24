# ClauseCompass - Decisions and Architecture Plan

## 1. Stack and Tooling
- **Monorepo**: npm workspaces. 
- **Web App**: React 18, Vite, React Router, Radix UI (for accessible primitives), Vitest + Testing Library, `@axe-core/playwright`.
- **API**: Node 20+, Express, `genkit` (1.42+), `@genkit-ai/google-genai` for the Gemini API, `@genkit-ai/google-cloud` (for Cloud integration/logging).
- **Core**: Pure TypeScript. `zod` for schemas. `date-fns` for deterministic date logic.
- **Firebase**: `firebase-admin`, Firebase emulator suite for local dev, Firestore for optional persistence (opt-in only), Firebase Auth.
- **UI Design**: CSS variables, Google Fonts (Atkinson Hyperlegible, Lexend) self-hosted via `@fontsource`.

## 2. Approach and Logic
- **Upload -> Extraction**: Take file or text (P8: OCR fallback), normalize whitespace, mask PII via Regex/checksum initially. Segment into numbered paragraphs [P1..Pn].
- **Classification**: Determine document type and user role via Gemini (structured output). If confidence low, queue clarifying questions.
- **Fact Extraction (Gemini)**: Extract key clauses, dates, money. Each finding MUST include a verbatim quote mapped to a paragraph ID.
- **Verification Engine**: Strict TypeScript logic. Checks if Gemini's extracted quote is exactly in the source text. Drops or flags if unverified. Deterministic math for dates/money.
- **Decision Engine**: Rule-based TS. Maps document type and extracted facts to severity buckets. Applies heuristic modifiers (one-sided, lack of cap) and triage levels (L0 to L3).
- **Presentation**: Results streamed via SSE. Accessible tabbed interface.

## 3. Plan (Phased)
- **P0**: Research & Plan. (Completed)
- **P1 Scaffold**: Setup monorepo, Vite React app, Express API, shared core package. Add preflight scripts and CI setup. Setup FakeLlm and DEMO_MODE.
- **P2 Core Domain**: Schemas, segmenter, quote verifier, decision engine (pure TS). Add tests and achieve 90% coverage on engine.
- **P3 API + Genkit**: Classify, analyze, ask. Implement SSE. Hook up FakeLlm and real Gemini. Upload validation.
- **P4 Web App**: Wizard, accessible results tabs, comparison, what-if, action plan. E2E tests and axe accessibility tests.
- **P5 Enhanced Integrations**: Feature flags and stubs/implementations for Vision, Embeddings, Translate, TTS, DLP.
- **P6 Firebase**: Authentication, Firestore persistence (opt-in), Emulator.
- **P7 Stretch**: (Only if time permits) Google Maps Platform, Google Drive export.
- **P8 Hardening & Docs**: README, SECURITY.md, ACCESSIBILITY.md, EVALS.md, bundle size constraints, final release gate.
