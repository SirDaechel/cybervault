"use client";

import { MouseEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";
import { createURL, sumInvestments } from "@/libs/utils";
import { transactionState } from "@/libs/redux-state/features/transactions/transactionSlice";
import Transactions from "./Transactions";
import Loading from "./Loading";
import TransactionTabs from "./TransactionTabs";
import TransactionTypes from "./TransactionTypes";

export const HomeContainer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isTransactionLoader, setIsTransactionLoader] =
    useState<boolean>(false);

  const getUser = useSelector(userState);
  const { user } = getUser;

  const getTransactions = useSelector(transactionState);
  const { receivedTransactions, sentTransactions, swappedTransactions } =
    getTransactions;

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentTransactionType = UrlSearchParams.get("transaction-type");

  useEffect(() => {
    // Check if we're on the client
    if (typeof window !== "undefined") {
      const userData = user;

      // If no user data, redirect to sign-in page
      if (userData.publicKey === "") {
        router.push("/onboarding");
      }
    }
  }, [router]);

  // Get user's investments
  const userInvestment = sumInvestments(user.balances);

  // Set a loader for 1.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 1500);
  }, []);

  const setTransactionType = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const type = event.currentTarget.textContent;

    if (type) {
      UrlSearchParams.set("transaction-type", type.toLowerCase());
      // Call the function that creates a URL string with the data from UrlSearchParams
      const pageURL = createURL(pathname, UrlSearchParams);
      // Push the created URL string to the URL
      router.push(`${pageURL}`);
    }
    setIsTransactionLoader(true);
    setTimeout(() => {
      setIsTransactionLoader(false);
    }, 500);
  };

  return (
    <section>
      {isLoader ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center gap-8">
          <span className="w-full flex flex-col gap-2 bg-zinc-100 rounded-md p-6">
            <p className="text-zinc-800 text-center text-sm">
              Available balance
            </p>
            <h1 className="text-center text-2xl font-bold text-zinc-700">
              ${userInvestment.toFixed(2)}
            </h1>
          </span>
          <TransactionTypes />
          <span className="w-full max-h-64 flex flex-col gap-4 bg-zinc-100 rounded-md p-6 overflow-y-auto">
            <p className="text-zinc-800 text-center text">Transactions</p>
            <TransactionTabs
              setTransactionType={setTransactionType}
              currentTransactionType={currentTransactionType}
            />
            <Transactions
              isTransactionLoader={isTransactionLoader}
              transactions={
                currentTransactionType === "received"
                  ? receivedTransactions
                  : currentTransactionType === "sent"
                  ? sentTransactions
                  : currentTransactionType === "swapped"
                  ? swappedTransactions
                  : []
              }
            />
          </span>
        </div>
      )}
    </section>
  );
};

export default HomeContainer;
