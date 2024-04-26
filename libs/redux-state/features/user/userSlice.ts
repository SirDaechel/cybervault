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
    setBalance: (state, action) => {
      const {
        fromCrypto,
        toCrypto,
        updatedFromInvestment,
        updatedToInvestment,
      } = action.payload;

      const cryptoBalance1 = state.user.balances.find(
        (balance) => balance.symbol === fromCrypto
      );

      const cryptoBalance2 = state.user.balances.find(
        (balance) => balance.symbol === toCrypto
      );

      if (cryptoBalance1 && cryptoBalance2) {
        cryptoBalance1.investment = updatedFromInvestment;
        cryptoBalance2.investment = updatedToInvestment;
      }
    },
  },
});

export const userState = (state: RootState) => state.user;
export const { setUser, setSeedPhrase, setBalance } = user.actions;

export default user.reducer;
