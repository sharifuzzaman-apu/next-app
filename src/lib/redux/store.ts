import { configureStore } from '@reduxjs/toolkit';
import bkashReducer from './features/bkash/bkashSlice';
import cashReducer from './features/cash/cashSlice';
import loanReducer from './features/loan/loanSlice';
import expenseReducer from './features/expense/expenseSlice';
import bankReducer from './features/bank/bankSlice';

export const store = configureStore({
  reducer: {
    bkash: bkashReducer,
    cash: cashReducer,
    loan: loanReducer,
    expense: expenseReducer,
    bank: bankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
