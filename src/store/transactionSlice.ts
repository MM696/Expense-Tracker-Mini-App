import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types/transaction';
import { mockTransactions } from '../data/mockTransactions';

interface TransactionState {
  items: Transaction[];
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: TransactionState = {
  items: mockTransactions,
  selectedCategory: null,
  searchQuery: '',
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items = [action.payload, ...state.items];
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    refreshTransactions: (state) => {
      state.items = [...mockTransactions];
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  setSelectedCategory,
  setSearchQuery,
  refreshTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
