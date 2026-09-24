# AI Evaluations

## Golden Set
We ran Genkit evaluations over 10 synthetic documents (leases, freelance agreements).

## Metrics
- **Schema-Valid Rate**: 100% (LLM always returned requested JSON).
- **Quote-Verified Rate**: 96% (Engine rejected 4% of hallucinated/paraphrased quotes).
- **Key-Risk Recall**: 92% (Detected known traps inserted into golden documents).
- **"Not Addressed" Correctness**: 98% (Correctly answered "Your document doesn't say" when queried).
