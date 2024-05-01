import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  receivedTransactions: [] as string[],
  sentTransactions: [] as string[],
  swappedTransactions: [] as string[],
};

export const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setReceivedTransaction: (state, action) => {
      state.receivedTransactions.push(action.payload);
    },
    setSentTransaction: (state, action) => {
      state.receivedTransactions.push(action.payload);
    },
    setSwappedTransaction: (state, action) => {
      state.receivedTransactions.push(action.payload);
    },
  },
});

export const transactionState = (state: RootState) => state.transactions;
export const {
  setReceivedTransaction,
  setSentTransaction,
  setSwappedTransaction,
} = transactions.actions;

export default transactions.reducer;
