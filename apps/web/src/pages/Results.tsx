import * as Tabs from '@radix-ui/react-tabs';

export default function Results() {
  return (
    <div className="results-container">
      <h1>Analysis Results</h1>
      <Tabs.Root defaultValue="overview">
        <Tabs.List aria-label="Analysis Results Tabs">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="clauses">Clauses & Risks</Tabs.Trigger>
          <Tabs.Trigger value="ask">Ask Document</Tabs.Trigger>
          <Tabs.Trigger value="action">Action Plan</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <h2>Overview</h2>
          <p>This is a Lease Agreement. Triage level: <strong>L1 - Negotiate</strong></p>
        </Tabs.Content>
        <Tabs.Content value="clauses">
          <h2>Risks & Clauses</h2>
          <ul>
            <li><strong>High:</strong> Auto-Renewal (Protect yourself by opting out).</li>
          </ul>
        </Tabs.Content>
        <Tabs.Content value="ask">
          <h2>Ask Your Document</h2>
          <input type="text" placeholder="Ask a question..." />
        </Tabs.Content>
        <Tabs.Content value="action">
          <h2>Next Steps</h2>
          <ol>
            <li>Review auto-renewal clause.</li>
            <li>Prepare negotiation asks.</li>
          </ol>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
