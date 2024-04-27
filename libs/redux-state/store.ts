import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/user/userSlice";
import TransactionReducer from "./features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    transactions: TransactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
