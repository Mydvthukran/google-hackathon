# Security Model

## Threat Model
1. **Prompt Injection**: Uploaded documents are untrusted data. We mitigate this by wrapping text in XML-like delimiters, ignoring instructions inside the text, and enforcing Zod schema outputs.
2. **Malicious Uploads**: API enforces 500KB limit. File headers (magic bytes) must match accepted types (PDF, text).
3. **Data Leakage**: Ephemeral processing by default. Firestore requires authentication and restricts users to their own data via Rules.
4. **Abuse/Cost**: Rate limiting and App Check enforced in production API.

## Mitigations
- Cloud Run instances run with least-privilege service accounts.
- Firestore rules rigorously unit tested.
