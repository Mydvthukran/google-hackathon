import { describe, it, expect } from 'vitest';
import { verifyQuote } from '../verifier';

describe('Verifier', () => {
  it('Should verify exact match', () => {
    expect(verifyQuote('exact match', 'This is an exact match in the text.')).toBe(true);
  });

  it('Should verify with messy whitespace', () => {
    expect(verifyQuote('exact   match', 'This is an exact match in the text.')).toBe(true);
  });

  it('Should reject false quotes', () => {
    expect(verifyQuote('not found', 'This is an exact match in the text.')).toBe(false);
  });

  it('Should handle empty inputs', () => {
    expect(verifyQuote('', 'text')).toBe(false);
    expect(verifyQuote('quote', '')).toBe(false);
  });
});
