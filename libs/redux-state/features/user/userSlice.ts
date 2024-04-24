import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  user: {
    privateKey: "",
    publicKey: "",
    passcode: "",
    seedPhrase: "",
    addresses: {},
    balances: {},
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userState = (state: RootState) => state.user;
export const {} = user.actions;

export default user.reducer;
