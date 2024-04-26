"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SwapCryptoInput from "./SwapCryptoInput";
import Image from "next/image";
import { swapCurrencies } from "@/libs/utils";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";

const SwapCrypto = () => {
  const getUser = useSelector(userState);
  const { user } = getUser;

  const [fromCrypto, setFromCrypto] = useState<string>("BTC");
  const [toCrypto, setToCrypto] = useState<string>("ETH");
  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [exchangeError, setExchangeError] = useState<boolean>(false);

  // Set user input amount
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountFrom(e.target.value);
  };

  useEffect(() => {
    const convertCrypto = swapCurrencies(
      fromCrypto,
      toCrypto,
      Number(amountFrom)
    );
    setAmountTo(convertCrypto as number);

    if (convertCrypto === null) {
      setExchangeError(true);
    } else {
      setExchangeError(false);
    }

    if (user.balances) {
      // Get user balances
      const userBalance = user.balances;

      // Find crypto that has its symbol the same as the fromCrypto and return it
      const crypto = userBalance.find((crypto) => {
        return crypto.symbol === fromCrypto;
      });

      // If crypto exists, calculate the amount of crypto the user has and check if the user input is less than or greater than user's amount of crypto
      if (crypto) {
        const amountOfCrypto = crypto.investment / crypto.value;
        const roundedAmountOfCrypto = Number(amountOfCrypto.toFixed(8));
        const roundedAmountFrom = Number(Number(amountFrom).toFixed(8));

        if (roundedAmountOfCrypto < roundedAmountFrom) {
          setError(true);
        } else {
          setError(false);
        }
      } else {
        console.log("You do not have selected crypto");
      }
    } else {
      console.log("Your balances are empty");
    }
  }, [amountFrom, fromCrypto, toCrypto]);

  // Switch crypto
  const switchCrypto = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  return (
    <section>
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-xl text-center">Swap crypto</h1>
        <div className="w-full flex flex-col items-center gap-8">
          <span className="w-full">
            <SwapCryptoInput
              type="from"
              selectedCrypto={fromCrypto}
              setSelectedCrypto={setFromCrypto}
              placeholder="from"
              onChange={onChange}
              exchangeError={exchangeError}
            />
            {error && (
              <p className="text-red-500 text-sm">
                Insufficient crypto balance
              </p>
            )}
          </span>
          <button
            type="button"
            className="p-3 bg-blue-500 rounded-full"
            onClick={switchCrypto}
          >
            <Image src="/swap.svg" width={15} height={15} alt="arrow" />
          </button>
          <SwapCryptoInput
            type="to"
            selectedCrypto={toCrypto}
            setSelectedCrypto={setToCrypto}
            placeholder="to"
            amountTo={amountTo}
          />
        </div>
        <button
          type="button"
          disabled={error || exchangeError}
          className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {exchangeError
            ? `Exchange rate not found for ${fromCrypto} to ${toCrypto}`
            : `Buy ${toCrypto}`}
        </button>
      </div>
    </section>
  );
};

export default SwapCrypto;
