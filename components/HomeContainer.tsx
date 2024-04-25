"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";
import { sumInvestments } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

export const HomeContainer = () => {
  const router = useRouter();

  const getUser = useSelector(userState);
  const { user } = getUser;

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

  return (
    <section>
      <div className="flex flex-col items-center gap-8">
        <span className="w-full flex flex-col gap-2 bg-zinc-100 rounded-md p-6">
          <p className="text-zinc-800 text-center text-sm">Available balance</p>
          <h1 className="text-center text-2xl font-bold text-zinc-700">
            ${userInvestment}
          </h1>
        </span>
        <span className="w-full flex items-center gap-4 justify-between">
          <button
            type="button"
            className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
          >
            <Image src="/receive.svg" width={17} height={17} alt="receive" />
            <p>Receive</p>
          </button>
          <button
            type="button"
            className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
          >
            <Image src="/send.svg" width={17} height={17} alt="receive" />
            <p>Send</p>
          </button>
          <Link
            href="/swap"
            className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
          >
            <Image src="/swap.svg" width={17} height={17} alt="receive" />
            <p>Swap</p>
          </Link>
        </span>
        <span className="w-full bg-zinc-100 rounded-md p-6">
          <p className="text-zinc-800 text-center text">Transactions</p>
        </span>
      </div>
    </section>
  );
};

export default HomeContainer;
