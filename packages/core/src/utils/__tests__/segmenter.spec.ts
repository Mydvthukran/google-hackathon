import { describe, it, expect } from 'vitest';
import { segmentDocument } from '../segmenter';

describe('Segmenter', () => {
  it('Should split text by double newlines into numbered paragraphs', () => {
    const text = "First\r\n\r\nSecond\n\nThird\n\n\nFourth";
    const res = segmentDocument(text);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe('P1');
    expect(res[0].text).toBe('First');
    expect(res[1].id).toBe('P2');
    expect(res[1].text).toBe('Second');
  });

  it('Should handle empty inputs', () => {
    expect(segmentDocument('')).toEqual([]);
    expect(segmentDocument('   \n\n  ')).toEqual([]);
  });
});
