export function segmentDocument(text: string): { id: string, text: string }[] {
  // Normalize whitespace and split by double newlines or similar boundaries
  const normalized = text.replace(/\r\n/g, '\n').trim();
  const rawParagraphs = normalized.split(/\n{2,}/);
  
  return rawParagraphs.map((p, i) => ({
    id: `P${i + 1}`,
    text: p.trim()
  })).filter(p => p.text.length > 0);
}
