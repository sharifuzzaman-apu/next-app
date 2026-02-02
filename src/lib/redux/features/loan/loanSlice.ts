import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Loan {
  id: string;
  date: string;
  receivedFrom: string;
  amount: number;
  note: string;
  paidAmount: number;
  remainingAmount: number;
  createdAt: string;
}

interface LoanState {
  loans: Loan[];
  totalLoanTaken: number;
  totalLoanPaid: number;
  totalLoanRemaining: number;
}

const initialState: LoanState = {
  loans: [],
  totalLoanTaken: 0,
  totalLoanPaid: 0,
  totalLoanRemaining: 0,
};

const recalcTotals = (state: LoanState) => {
  state.totalLoanTaken = state.loans.reduce(
    (sum, loan) => sum + (loan.amount || 0),
    0,
  );
  state.totalLoanPaid = state.loans.reduce(
    (sum, loan) => sum + (loan.paidAmount || 0),
    0,
  );
  state.totalLoanRemaining = state.loans.reduce(
    (sum, loan) => sum + (loan.remainingAmount || 0),
    0,
  );
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('loan');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      loans: parsedData.loans || [],
      totalLoanTaken: parsedData.totalLoanTaken || 0,
      totalLoanPaid: parsedData.totalLoanPaid || 0,
      totalLoanRemaining: parsedData.totalLoanRemaining || 0,
    });
  }
}

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    addLoan: (
      state,
      action: PayloadAction<{
        date: string;
        receivedFrom: string;
        amount: number;
        note: string;
      }>,
    ) => {
      const { date, receivedFrom, amount, note } = action.payload;

      const loan: Loan = {
        id: Date.now().toString(),
        date,
        receivedFrom,
        amount,
        note,
        paidAmount: 0,
        remainingAmount: amount,
        createdAt: new Date().toISOString(),
      };

      state.loans.push(loan);
      recalcTotals(state);

      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },
    deleteLoan: (state, action: PayloadAction<string>) => {
      state.loans = state.loans.filter((loan) => loan.id !== action.payload);
      recalcTotals(state);

      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },
  },
});

export const { addLoan, deleteLoan } = loanSlice.actions;

export default loanSlice.reducer;
