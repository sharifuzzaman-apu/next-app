import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BankTransaction {
  id: string;
  date: string;
  receivedFrom: string;
  amount: number;
  note: string;
  createdAt: string;
}

interface BankState {
  transactions: BankTransaction[];
  totalBank: number;
}

const initialState: BankState = {
  transactions: [],
  totalBank: 0,
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('bank');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      transactions: parsedData.transactions || [],
      totalBank: parsedData.totalBank || 0,
    });
  }
}

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    addBankTransaction: (
      state,
      action: PayloadAction<{
        date: string;
        receivedFrom: string;
        amount: number;
        note: string;
      }>,
    ) => {
      const { date, receivedFrom, amount, note } = action.payload;

      const transaction: BankTransaction = {
        id: Date.now().toString(),
        date,
        receivedFrom,
        amount,
        note,
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalBank += amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('bank', JSON.stringify(state));
      }
    },

    deleteBankTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload,
      );
      if (transaction) {
        state.totalBank -= transaction.amount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload,
        );

        if (typeof window !== 'undefined') {
          localStorage.setItem('bank', JSON.stringify(state));
        }
      }
    },

    clearBankTransactions: (state) => {
      state.transactions = [];
      state.totalBank = 0;

      if (typeof window !== 'undefined') {
        localStorage.setItem('bank', JSON.stringify(state));
      }
    },
  },
});

export const {
  addBankTransaction,
  deleteBankTransaction,
  clearBankTransactions,
} = bankSlice.actions;

export default bankSlice.reducer;
