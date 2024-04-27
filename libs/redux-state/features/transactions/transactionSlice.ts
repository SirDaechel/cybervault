import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  transactions: [] as string[],
};

export const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
});

export const transactionState = (state: RootState) => state.transactions;
export const { setTransaction } = transactions.actions;

export default transactions.reducer;
