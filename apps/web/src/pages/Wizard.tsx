import { useState } from 'react';

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  return (
    <div className="wizard-container" aria-live="polite">
      <h1>ClauseCompass Setup</h1>
      {step === 1 && (
        <section>
          <h2>Step 1: Your Role</h2>
          <select aria-label="Select your role" onChange={e => setData({...data, role: e.target.value})}>
            <option value="">Select...</option>
            <option value="tenant">Tenant</option>
            <option value="employee">Employee</option>
            <option value="freelancer">Freelancer</option>
          </select>
          <button onClick={() => setStep(2)}>Next</button>
        </section>
      )}
      {step === 2 && (
        <section>
          <h2>Step 2: Upload Document</h2>
          <input type="file" aria-label="Upload document" />
          <button onClick={() => setStep(3)}>Analyze</button>
        </section>
      )}
      {step === 3 && (
        <section>
          <h2>Analyzing...</h2>
          <div aria-busy="true">Please wait while we review your document...</div>
          {/* In a real app we'd trigger SSE stream here and redirect to results */}
          <button onClick={() => window.location.href = '/results'}>Go to Results</button>
        </section>
      )}
    </div>
  );
}
