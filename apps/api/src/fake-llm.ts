export const fakeAnalysisResponse = {
  documentType: "Lease Agreement",
  roleConfidence: "high",
  findings: [
    {
      id: "f1",
      category: "Auto-Renewal",
      paragraphId: "P4",
      quote: "This lease shall automatically renew for an additional 12 months unless canceled 60 days prior.",
      plainSummary: "The lease renews automatically if you don't cancel early.",
      favors: "partyB",
      flags: ["auto_renewal"],
      confidence: "high"
    }
  ]
};

export class FakeLlm {
  async analyze(documentText: string) {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return fakeAnalysisResponse;
  }
}
