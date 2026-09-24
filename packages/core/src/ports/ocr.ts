export interface OcrPort {
  extractText(fileBuffer: Buffer, mimeType: string): Promise<string>;
}
