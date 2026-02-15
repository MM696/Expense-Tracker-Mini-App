import { Transaction, CURRENCY } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  { id: '1', amount: -45.5, merchant: 'Whole Foods', category: 'Groceries', date: '2024-02-10', status: 'completed', currency: CURRENCY },
  { id: '2', amount: -120.0, merchant: 'AP Gas Station', category: 'Transportation', date: '2024-02-09', status: 'completed', currency: CURRENCY },
  { id: '3', amount: -32.75, merchant: 'Chicken Republic', category: 'Dining', date: '2024-02-08', status: 'completed', currency: CURRENCY },
  { id: '4', amount: -15.99, merchant: 'Netflix', category: 'Entertainment', date: '2024-02-07', status: 'completed', currency: CURRENCY },
  { id: '5', amount: -85.0, merchant: 'H-Medix Pharmacy', category: 'Healthcare', date: '2024-02-06', status: 'completed', currency: CURRENCY },
  { id: '6', amount: -199.99, merchant: 'Jumia', category: 'Shopping', date: '2024-02-05', status: 'completed', currency: CURRENCY },
  { id: '7', amount: -142.0, merchant: 'AEDC Plc', category: 'Utilities', date: '2024-02-04', status: 'completed', currency: CURRENCY },
  { id: '8', amount: -68.2, merchant: 'Mama Success Supermarket', category: 'Groceries', date: '2024-02-03', status: 'completed', currency: CURRENCY },
  { id: '9', amount: -55.0, merchant: 'Bolt', category: 'Transportation', date: '2024-02-02', status: 'completed', currency: CURRENCY },
  { id: '10', amount: -42.5, merchant: 'RiverPlate Garden', category: 'Dining', date: '2024-02-01', status: 'completed', currency: CURRENCY },
  { id: '11', amount: -9.99, merchant: 'Spotify', category: 'Entertainment', date: '2024-01-31', status: 'completed', currency: CURRENCY },
  { id: '12', amount: -25.0, merchant: 'Nelina Wellness', category: 'Healthcare', date: '2024-01-30', status: 'completed', currency: CURRENCY },
  { id: '13', amount: -89.0, merchant: 'Boss Wuse', category: 'Shopping', date: '2024-01-29', status: 'completed', currency: CURRENCY },
  { id: '14', amount: -78.5, merchant: 'Water Utility', category: 'Utilities', date: '2024-01-28', status: 'completed', currency: CURRENCY },
  { id: '15', amount: -112.3, merchant: 'Bakangizo', category: 'Groceries', date: '2024-01-27', status: 'completed', currency: CURRENCY },
  { id: '16', amount: -35.0, merchant: 'Uber', category: 'Transportation', date: '2024-01-26', status: 'completed', currency: CURRENCY },
  { id: '17', amount: -28.0, merchant: 'Domino\'s Pizza', category: 'Dining', date: '2024-01-25', status: 'completed', currency: CURRENCY },
  { id: '18', amount: -19.99, merchant: 'DStv', category: 'Entertainment', date: '2024-01-24', status: 'completed', currency: CURRENCY },
];
