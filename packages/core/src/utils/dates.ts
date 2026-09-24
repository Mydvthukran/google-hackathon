import { addDays, parseISO, differenceInDays } from 'date-fns';

export function calculateDaysRemaining(deadlineISO: string, currentISO: string = new Date().toISOString()): number {
  const current = parseISO(currentISO);
  const deadline = parseISO(deadlineISO);
  return differenceInDays(deadline, current);
}

export function parseAndNormalizeAmount(amountStr: string): number {
  const sanitized = amountStr.replace(/[^0-9.]/g, '');
  return parseFloat(sanitized) || 0;
}
