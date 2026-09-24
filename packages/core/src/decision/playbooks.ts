export interface Playbook {
  documentType: string;
  expectedClauses: string[];
  redFlagPatterns: string[];
  negotiationAsks: Record<string, string>;
}

export const playbooks: Record<string, Playbook> = {
  'Lease Agreement': {
    documentType: 'Lease Agreement',
    expectedClauses: ['Term', 'Rent Amount', 'Deposit', 'Maintenance', 'Termination'],
    redFlagPatterns: ['auto_renewal', 'uncapped_rent_increase', 'forfeiture'],
    negotiationAsks: {
      'auto_renewal': 'Ask to replace automatic renewal with a mutual option to renew.',
      'uncapped': 'Ask for a reasonable cap (e.g., 5%) on any increases.'
    }
  },
  'Employment Agreement': {
    documentType: 'Employment Agreement',
    expectedClauses: ['Role', 'Compensation', 'Benefits', 'Termination', 'Confidentiality'],
    redFlagPatterns: ['non_compete', 'at_will_without_notice'],
    negotiationAsks: {
      'non_compete': 'Ask to narrow the geographic scope and duration of the non-compete.'
    }
  },
  'Freelance Agreement': {
    documentType: 'Freelance Agreement',
    expectedClauses: ['Scope of Work', 'Payment Terms', 'Intellectual Property', 'Deadlines'],
    redFlagPatterns: ['unlimited_revisions', 'ip_transfer_before_payment', 'late_payment_penalty'],
    negotiationAsks: {
      'unlimited_revisions': 'Ask to limit revisions to 2 rounds, billed hourly thereafter.'
    }
  }
};
