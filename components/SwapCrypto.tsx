"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SwapCryptoInput from "./SwapCryptoInput";
import Image from "next/image";
import {
  createURL,
  getCurrentDateAndTimeFormatted,
  swapCurrencies,
} from "@/libs/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setBalanceSwap,
  userState,
} from "@/libs/redux-state/features/user/userSlice";
import { setSwappedTransaction } from "@/libs/redux-state/features/transactions/transactionSlice";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessCheckmark from "./SuccessCheckmark";
import Loading from "./Loading";

const SwapCrypto = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = useSelector(userState);
  const { user } = getUser;

  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isTransactionSuccess, setIsTransactionSuccess] =
    useState<boolean>(false);

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());

  const [fromCrypto, setFromCrypto] = useState<string>("BTC");
  const [toCrypto, setToCrypto] = useState<string>("ETH");
  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [exchangeError, setExchangeError] = useState<boolean>(false);
  const [refetchUserData, setRefetchUserData] = useState<number>(0);

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

  const convertCurrency = () => {
    if (user.balances) {
      // Get user balances
      const userBalance = user.balances;

      // Find crypto that has its symbol the same as the fromCrypto and return it
      const cryptoFrom = userBalance.find((crypto) => {
        return crypto.symbol === fromCrypto;
      });

      // Find crypto that has its symbol the same as the toCrypto and return it
      const cryptoTo = userBalance.find((crypto) => {
        return crypto.symbol === toCrypto;
      });

      if (cryptoFrom && cryptoTo && amountTo) {
        // Convert crypto balance of the amountFrom and amountTo fields to fiat balance
        const fromFiat = Number(amountFrom) * cryptoFrom.value;
        const toFiat = amountTo * cryptoTo.value;

        const updatedFromInvestment = cryptoFrom.investment - fromFiat;
        const updatedToInvestment = cryptoTo.investment + toFiat;

        // Calculate the amount of crypto the user has and check if the user input (amountFrom) is less than user's amount of crypto
        const amountOfCrypto = cryptoFrom.investment / cryptoFrom.value;
        const roundedAmountOfCrypto = Number(amountOfCrypto.toFixed(8));
        const roundedAmountFrom = Number(Number(amountFrom).toFixed(8));

        if (roundedAmountOfCrypto < roundedAmountFrom) {
          setError(true);
        } else {
          setError(false);
          // Set user's balance
          dispatch(
            setBalanceSwap({
              fromCrypto,
              toCrypto,
              updatedFromInvestment,
              updatedToInvestment,
            })
          );
          // Get date of transaction
          const dateTime = getCurrentDateAndTimeFormatted();
          // Set transaction message or notification
          dispatch(
            setSwappedTransaction(
              `You swapped ${amountFrom} ${fromCrypto} to ${amountTo} ${toCrypto} on ${dateTime}`
            )
          );

          setRefetchUserData((prev) => prev + 1);

          // Set Loader to true
          setIsLoader(true);

          // After 1 second, set the loader to false and set transaction success to true
          setTimeout(() => {
            // Set Loader to false
            setIsLoader(false);
            // Set transaction success to true
            setIsTransactionSuccess(true);
          }, 1000);

          // After 1.5secs, take user to the home page
          setTimeout(() => {
            UrlSearchParams.set("transaction-type", "swapped");
            // Call the function that creates a URL string with the data from UrlSearchParams
            const pageURL = createURL("/", UrlSearchParams);
            // Push the created URL string to the URL
            router.push(`${pageURL}`);
          }, 2000);
        }
      } else {
        console.log("You do not have selected currencies");
      }
    } else {
      console.log("Your balances are empty");
    }
  };

  // Set a loader for 0.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  }, []);

  return (
    <section>
      {isTransactionSuccess ? (
        <SuccessCheckmark />
      ) : isLoader ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center gap-8">
          <h1 className="font-semibold text-xl text-center mb-6">
            Swap crypto
          </h1>
          <div className="w-full flex flex-col items-center gap-8">
            <span className="w-full">
              <SwapCryptoInput
                type="from"
                selectedCrypto={fromCrypto}
                setSelectedCrypto={setFromCrypto}
                placeholder="from"
                onChange={onChange}
                exchangeError={exchangeError}
                refetchUserData={refetchUserData}
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
              refetchUserData={refetchUserData}
            />
          </div>
          <button
            type="button"
            disabled={error || exchangeError}
            className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={convertCurrency}
          >
            {exchangeError
              ? `Exchange rate not found for ${fromCrypto} to ${toCrypto}`
              : `Buy ${toCrypto}`}
          </button>
        </div>
      )}
    </section>
  );
};

export default SwapCrypto;
