"use client";

import { MouseEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";
import { createURL, sumInvestments } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { transactionState } from "@/libs/redux-state/features/transactions/transactionSlice";
import Transactions from "./Transactions";
import Loading from "./Loading";

export const HomeContainer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoader, setIsLoader] = useState<boolean>(true);

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
          <span className="w-full flex items-center gap-4 justify-between">
            <Link
              href="/receive"
              type="button"
              className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
            >
              <Image src="/receive.svg" width={17} height={17} alt="receive" />
              <p>Receive</p>
            </Link>
            <Link
              href="/send"
              type="button"
              className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
            >
              <Image src="/send.svg" width={17} height={17} alt="receive" />
              <p>Send</p>
            </Link>
            <Link
              href="/swap"
              className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
            >
              <Image src="/swap.svg" width={17} height={17} alt="receive" />
              <p>Swap</p>
            </Link>
          </span>
          <span className="w-full max-h-64 flex flex-col gap-4 bg-zinc-100 rounded-md p-6 overflow-y-auto">
            <p className="text-zinc-800 text-center text">Transactions</p>
            <ul className="flex items-center justify-between gap-3">
              <button
                type="button"
                className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
                  currentTransactionType === "received" &&
                  "bg-blue-500 text-white"
                }`}
                onClick={(e) => setTransactionType(e)}
              >
                Received
              </button>
              <button
                type="button"
                className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
                  currentTransactionType === "sent" && "bg-blue-500 text-white"
                }`}
                onClick={(e) => setTransactionType(e)}
              >
                Sent
              </button>
              <button
                type="button"
                className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
                  currentTransactionType === "swapped" &&
                  "bg-blue-500 text-white"
                }`}
                onClick={(e) => setTransactionType(e)}
              >
                Swapped
              </button>
            </ul>
            <Transactions
              transactions={
                currentTransactionType === "received"
                  ? receivedTransactions
                  : currentTransactionType === "sent"
                  ? sentTransactions
                  : swappedTransactions
              }
            />
          </span>
        </div>
      )}
    </section>
  );
};

export default HomeContainer;
