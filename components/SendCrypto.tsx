import { setSentTransaction } from "@/libs/redux-state/features/transactions/transactionSlice";
import {
  setBalanceSend,
  userState,
} from "@/libs/redux-state/features/user/userSlice";
import { createURL, getCurrentDateAndTimeFormatted } from "@/libs/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessCheckmark from "./SuccessCheckmark";
import Loading from "./Loading";

type SendCryptoProps = {
  currentCrypto: string;
};

const SendCrypto: React.FC<SendCryptoProps> = ({ currentCrypto }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUser = useSelector(userState);
  const { user } = getUser;
  const userBalances = user.balances;

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isTransactionSuccess, setIsTransactionSuccess] =
    useState<boolean>(false);

  const [currentCryptoBalance, setCurrentCryptoBalance] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Get user crypto balances
  useEffect(() => {
    const cryptoBalance = userBalances.find(
      (crypto) => crypto.symbol === currentCrypto
    );
    if (cryptoBalance)
      setCurrentCryptoBalance(cryptoBalance.investment / cryptoBalance.value);
  }, [userBalances, currentCrypto]);

  // This useEffect checks the validity of user's input
  useEffect(() => {
    const isAddressInvalid = address.length === 0 || address.length >= 26;
    const isAmountInvalid =
      Number(amount) <= 0 || Number(amount) > currentCryptoBalance;

    setError(currentCryptoBalance ? isAddressInvalid || isAmountInvalid : true);
  }, [address, amount, currentCryptoBalance]);

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // Ensure input is a number
    setAmount(value);
  };

  // Send crypto to recepient
  const handleSend = () => {
    // Find crypto that has its symbol the same as the fromCrypto and return it
    const crypto = userBalances.find((crypto) => {
      return crypto.symbol === currentCrypto;
    });

    if (crypto) {
      // Convert amount input to fiat balance
      const amountFiat = Number(amount) * crypto.value;
      // Subtract user's amount in fiat from user's available investment balance
      const updatedInvestment = crypto.investment - amountFiat;
      // Set user's balance
      dispatch(
        setBalanceSend({
          currentCrypto,
          updatedInvestment,
        })
      );
      // Get date of transaction
      const dateTime = getCurrentDateAndTimeFormatted();
      // Set transaction message or notification
      dispatch(
        setSentTransaction(
          `You sent ${amount} ${currentCrypto}($${amountFiat.toFixed(
            2
          )}) to the address ${address} on ${dateTime}`
        )
      );

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
        UrlSearchParams.set("transaction-type", "sent");
        // Call the function that creates a URL string with the data from UrlSearchParams
        const pageURL = createURL("/", UrlSearchParams);
        // Push the created URL string to the URL
        router.push(`${pageURL}`);
      }, 2000);
    } else {
      console.log("You do not have selected currencies");
    }
  };

  return (
    <section className="w-full">
      {isTransactionSuccess ? (
        <SuccessCheckmark />
      ) : isLoader ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="font-semibold text-xl text-center">
              Send {currentCrypto}
            </h1>
            <p className="text-sm text-center">{currentCryptoBalance}</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <span className="flex flex-col">
              <label htmlFor="address">Recepient address</label>
              <input
                id="address"
                type="text"
                className="p-2 border border-zinc-700 rounded-md"
                placeholder="enter recepient address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </span>
            <span className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                className="p-2 border border-zinc-700 otp-input rounded-md"
                placeholder={`enter amount of ${currentCrypto}`}
                value={amount}
                onChange={handleAmount}
              />
            </span>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={error}
              onClick={handleSend}
            >
              Send {currentCrypto}
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default SendCrypto;
