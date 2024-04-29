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
    setBalanceSwap: (state, action) => {
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
    setBalanceSend: (state, action) => {
      const { currentCrypto, updatedInvestment } = action.payload;

      const cryptoBalance = state.user.balances.find(
        (balance) => balance.symbol === currentCrypto
      );

      if (cryptoBalance) {
        cryptoBalance.investment = updatedInvestment;
      }
    },
  },
});

export const userState = (state: RootState) => state.user;
export const { setUser, setSeedPhrase, setBalanceSwap, setBalanceSend } =
  user.actions;

export default user.reducer;
