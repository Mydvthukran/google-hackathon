import * as Tabs from '@radix-ui/react-tabs';
import { useLocation } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const { result, context } = location.state || {};

  const role = context?.role || 'User';
  const triageLevel = result?.triage || 'Unknown';
  const findings = result?.findings || [];

  return (
    <div className="results-container">
      <h1>Analysis Results</h1>
      
      <div className="card" style={{ padding: '1rem 2rem', marginBottom: '2rem' }}>
        <Tabs.Root defaultValue="overview">
          <Tabs.List aria-label="Analysis Results Tabs">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="clauses">Clauses & Risks</Tabs.Trigger>
            <Tabs.Trigger value="ask">Ask Document</Tabs.Trigger>
            <Tabs.Trigger value="action">Action Plan</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview" className="card" style={{ marginTop: '1rem', border: 'none', background: 'transparent', padding: '1rem 0' }}>
            <h2>Document Overview</h2>
            <p style={{ color: 'var(--text-muted)' }}>We analyzed your document based on your role: <strong>{role}</strong>.</p>
            <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ marginBottom: '1rem' }}><strong>Document Type:</strong> Contract</div>
              <div><strong>Risk Triage Level:</strong> <span className="triage-badge">{triageLevel}</span></div>
            </div>
          </Tabs.Content>
          
          <Tabs.Content value="clauses" className="card" style={{ marginTop: '1rem', border: 'none', background: 'transparent', padding: '1rem 0' }}>
            <h2>Risks & Clauses</h2>
            {findings.length > 0 ? (
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {findings.map((finding: any, index: number) => (
                  <li key={index} style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                    <strong style={{ color: '#fca5a5' }}>Risk:</strong> {finding.clause || 'Unknown clause'}
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{finding.implication || 'Review this carefully.'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No specific risks found or data missing.</p>
            )}
          </Tabs.Content>
          
          <Tabs.Content value="ask" className="card" style={{ marginTop: '1rem', border: 'none', background: 'transparent', padding: '1rem 0' }}>
            <h2>Ask Your Document</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Ask any specific questions about the terms and conditions.</p>
            <input type="text" placeholder="E.g., What happens if I terminate early?" />
            <button>Ask Question</button>
          </Tabs.Content>
          
          <Tabs.Content value="action" className="card" style={{ marginTop: '1rem', border: 'none', background: 'transparent', padding: '1rem 0' }}>
            <h2>Recommended Next Steps</h2>
            <ol>
              <li style={{ marginBottom: '1rem' }}>Review any highlighted clauses carefully.</li>
              <li style={{ marginBottom: '1rem' }}>Prepare necessary changes or addendums before signing.</li>
            </ol>
            <button style={{ marginTop: '1rem' }}>Export PDF Summary</button>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
