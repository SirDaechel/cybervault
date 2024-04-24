import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  user: {
    privateKey: "",
    publicKey: "",
    passcode: "",
    seedPhrase: "",
    addresses: {},
    balances: [] as Balance[],
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSeedPhrase: (state, action) => {
      state.user.seedPhrase = action.payload;
    },
  },
});

export const userState = (state: RootState) => state.user;
export const { setUser, setSeedPhrase } = user.actions;

export default user.reducer;
