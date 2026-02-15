export type TransactionStatus = 'completed' | 'pending' | 'failed';

export const CURRENCY = 'NGN' as const;
export const CURRENCY_SYMBOL = '₦';

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  date: string;
  status: TransactionStatus;
  currency?: typeof CURRENCY;
}

export function formatAmount(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  return `${sign}${CURRENCY_SYMBOL}${Math.abs(amount).toFixed(2)}`;
}

export const CATEGORIES = [
  'Groceries',
  'Transportation',
  'Dining',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Utilities',
] as const;

export type Category = (typeof CATEGORIES)[number];
