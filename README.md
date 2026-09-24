# ClauseCompass

## 1. Chosen vertical and persona
Vertical: Legal access and literacy — plain-language understanding and navigation of legal documents.
Persona: "The Everyday Signer"

## 2. Approach and logic
Triage matrix and decision logic process legal clauses into severity levels based on context.

## 3. How it works
Upload document -> Extract text -> Gemini Analysis -> Decision Engine Triage -> Presentation.

## 4. Assumptions
- This is not legal advice.
- Jurisdiction-specific details rely on general information.

## 5. Google Services Map
| Service | Purpose | Module | Flag | Fallback |
|---|---|---|---|---|
| Cloud Vision API | Document OCR | `apps/api/src/adapters/google/ocr.ts` | `FEATURE_VISION_OCR` | FakeOcrAdapter |
