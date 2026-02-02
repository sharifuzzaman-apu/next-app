import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string;
  date: string;
  paidTo: string;
  amount: number;
  note: string;
  createdAt: string;
}

interface ExpenseState {
  expenses: Expense[];
  totalExpense: number;
}

const initialState: ExpenseState = {
  expenses: [],
  totalExpense: 0,
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('expense');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      expenses: parsedData.expenses || [],
      totalExpense: parsedData.totalExpense || 0,
    });
  }
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{
        id: string;
        date: string;
        paidTo: string;
        amount: number;
        note: string;
      }>,
    ) => {
      const { id, date, paidTo, amount, note } = action.payload;

      const expense: Expense = {
        id,
        date,
        paidTo,
        amount,
        note,
        createdAt: new Date().toISOString(),
      };

      state.expenses.push(expense);
      state.totalExpense += amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('expense', JSON.stringify(state));
      }
    },

    deleteExpense: (state, action: PayloadAction<string>) => {
      const expense = state.expenses.find((e) => e.id === action.payload);
      if (expense) {
        state.totalExpense -= expense.amount;
        state.expenses = state.expenses.filter((e) => e.id !== action.payload);

        if (typeof window !== 'undefined') {
          localStorage.setItem('expense', JSON.stringify(state));
        }
      }
    },

    clearExpenses: (state) => {
      state.expenses = [];
      state.totalExpense = 0;

      if (typeof window !== 'undefined') {
        localStorage.setItem('expense', JSON.stringify(state));
      }
    },
  },
});

export const { addExpense, deleteExpense, clearExpenses } =
  expenseSlice.actions;

export default expenseSlice.reducer;
