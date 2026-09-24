import { useState } from 'react';

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  return (
    <div className="wizard-container" aria-live="polite">
      <h1>ClauseCompass</h1>
      {step === 1 && (
        <section className="card">
          <h2>Step 1: Your Role</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Help us understand your perspective so we can tailor the analysis.</p>
          <select aria-label="Select your role" onChange={e => setData({...data, role: e.target.value})}>
            <option value="">Select your role...</option>
            <option value="tenant">Tenant</option>
            <option value="employee">Employee</option>
            <option value="freelancer">Freelancer</option>
          </select>
          <button onClick={() => setStep(2)}>Continue to Upload</button>
        </section>
      )}
      {step === 2 && (
        <section className="card">
          <h2>Step 2: Upload Document</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Upload your contract or agreement securely. Supported formats: PDF, TXT.</p>
          <input type="file" aria-label="Upload document" />
          <button onClick={() => setStep(3)}>Start Analysis</button>
        </section>
      )}
      {step === 3 && (
        <section className="card" style={{ textAlign: 'center' }}>
          <h2>Analyzing Document...</h2>
          <div className="loading-spinner"></div>
          <div aria-busy="true" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Extracting clauses and identifying key risks...</div>
          {/* In a real app we'd trigger SSE stream here and redirect to results automatically */}
          <button onClick={() => window.location.href = '/results'} style={{ background: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)' }}>Mock: Go to Results</button>
        </section>
      )}
    </div>
  );
}
