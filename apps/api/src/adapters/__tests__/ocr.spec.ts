import { describe, it, expect } from 'vitest';
import { FakeOcrAdapter } from '../google/ocr';

describe('OCR Adapters', () => {
  it('FakeOcrAdapter should return mock text', async () => {
    const fake = new FakeOcrAdapter();
    const result = await fake.extractText(Buffer.from('test'), 'image/png');
    expect(result).toBe('This is fake extracted text for tests/demo.');
  });
});
