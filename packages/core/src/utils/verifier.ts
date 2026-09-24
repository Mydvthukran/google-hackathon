export function verifyQuote(quote: string, sourceParagraph: string): boolean {
  if (!quote || !sourceParagraph) return false;
  
  // Normalize both by removing all extra whitespace/punctuation for loose matching
  // Or just normalize space sequences
  const normQuote = quote.replace(/\s+/g, ' ').trim().toLowerCase();
  const normSource = sourceParagraph.replace(/\s+/g, ' ').trim().toLowerCase();
  
  return normSource.includes(normQuote);
}
