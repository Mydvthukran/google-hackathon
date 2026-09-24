import { OcrPort } from '@clause-compass/core/src/ports/ocr';

export class CloudVisionOcrAdapter implements OcrPort {
  async extractText(fileBuffer: Buffer, mimeType: string): Promise<string> {
    // Stub for Google Cloud Vision API integration
    if (!process.env.FEATURE_VISION_OCR) {
      throw new Error('Vision OCR is not enabled');
    }
    return Promise.resolve("Extracted text via Cloud Vision");
  }
}

export class FakeOcrAdapter implements OcrPort {
  async extractText(fileBuffer: Buffer, mimeType: string): Promise<string> {
    return Promise.resolve("This is fake extracted text for tests/demo.");
  }
}
