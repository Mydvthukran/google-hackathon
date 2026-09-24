import { UserContext, Finding, DocumentInfo, DecisionResult, Flag } from './types';

export class DecisionEngine {
  public analyze(context: UserContext, docInfo: DocumentInfo, findings: Finding[]): DecisionResult {
    const result: DecisionResult = {
      triage: 'L0',
      severityByFinding: {},
      actions: [],
      reasons: [],
      clarifyingQuestions: []
    };

    // R2: Perspective mapping
    const isPartyA = docInfo.partyAMapping.toLowerCase() === context.role.toLowerCase();
    const isPartyB = docInfo.partyBMapping.toLowerCase() === context.role.toLowerCase();
    const roleConfidenceHigh = isPartyA || isPartyB;

    // R4: Clarify-if-needed gate
    if (!roleConfidenceHigh) {
      result.clarifyingQuestions.push(`Are you acting as the ${docInfo.partyAMapping} or the ${docInfo.partyBMapping}?`);
      result.reasons.push('R4: Role confidence is low.');
    }
    if (!context.jurisdiction && context.stakes === 'high') {
      result.clarifyingQuestions.push('Which state or country applies to this agreement?');
      result.reasons.push('R4: Jurisdiction missing on high stakes.');
    }

    let criticalCount = 0;
    let highCount = 0;
    let hasSensitiveDomain = ['court notice', 'eviction notice', 'immigration', 'family law'].includes(docInfo.documentType.toLowerCase());

    if (hasSensitiveDomain) {
      result.reasons.push('R5: Sensitive domain forces L2 or higher.');
    }

    // R3: Severity scoring
    for (const f of findings) {
      const severity = this.calculateSeverity(f, isPartyA, isPartyB, context);
      result.severityByFinding[f.id] = severity;
      
      if (severity === 'critical') criticalCount++;
      if (severity === 'high') highCount++;
    }

    // R5: Triage
    if (context.deadline && context.stakes === 'high' && criticalCount > 0) {
       // A proxy for "deadline within 72h" in actual engine it will check days
       // Let's assume the deadline is parsed upstream
       result.triage = 'L3';
       result.reasons.push('R5: High stakes, critical finding, and deadline approaching (L3).');
    } else if (hasSensitiveDomain) {
       result.triage = 'L3'; // or L2 based on detailed date math, defaulting L3 for sensitive
       result.reasons.push('R5: Sensitive domain (L3).');
    } else if (criticalCount > 0 || (highCount >= 2 && context.stakes === 'high') || (!context.jurisdiction && context.stakes === 'high')) {
       result.triage = 'L2';
       result.reasons.push('R5: Critical findings or multiple high findings on high stakes (L2).');
    } else if ((highCount > 0 || criticalCount > 0 || Object.values(result.severityByFinding).includes('medium')) && ['decide_to_sign', 'negotiate'].includes(context.goal)) {
       result.triage = 'L1';
       result.reasons.push('R5: Negotiable medium/high clauses found (L1).');
    } else {
       result.triage = 'L0';
       result.reasons.push('R5: No high/critical findings and stakes are manageable (L0).');
    }

    // Actions generation based on R7 Goal routing
    if (context.goal === 'decide_to_sign' || context.goal === 'negotiate') {
      result.actions.push('Review negotiation asks for medium/high risk clauses.');
    } else if (context.goal === 'exit_or_dispute') {
      result.actions.push('Review obligations, notice periods, and remedies.');
      result.actions.push('Prepare Lawyer Prep Pack with evidence checklist.');
    }

    return result;
  }

  private calculateSeverity(f: Finding, isPartyA: boolean, isPartyB: boolean, context: UserContext): 'info' | 'low' | 'medium' | 'high' | 'critical' {
    let score = 1; // 1: info, 2: low, 3: medium, 4: high, 5: critical

    // Base bump for having flags
    if (f.flags.length > 0) score += 1;
    
    // R2: Favors logic
    const favorsOther = (isPartyA && f.favors === 'partyB') || (isPartyB && f.favors === 'partyA');
    if (favorsOther) {
      score += 1;
    }

    // Flag-specific modifiers
    if (f.flags.includes('arbitration_or_venue') || f.flags.includes('rights_waiver')) {
      score += 1;
    }
    if (f.flags.includes('uncapped') || f.flags.includes('forfeiture')) {
      score += 2;
    }

    // Scale by stakes
    if (context.stakes === 'high') score += 1;
    
    if (score >= 5) return 'critical';
    if (score === 4) return 'high';
    if (score === 3) return 'medium';
    if (score === 2) return 'low';
    return 'info';
  }
}
