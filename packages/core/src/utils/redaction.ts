export function maskPII(text: string): string {
  if (!text) return text;
  
  // Basic PII masking fallback (Regex)
  let masked = text;
  
  // Mask Email
  masked = masked.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '[EMAIL_MASKED]');
  
  // Mask Phone (simple US pattern)
  masked = masked.replace(/(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g, '[PHONE_MASKED]');
  
  // Mask SSN (simple US pattern)
  masked = masked.replace(/\b(\d{3}-\d{2}-\d{4})\b/g, '[SSN_MASKED]');

  return masked;
}
