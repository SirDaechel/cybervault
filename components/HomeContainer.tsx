"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";
import { sumInvestments } from "@/libs/utils";

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
        <h1>${userInvestment}</h1>
      </div>
    </section>
  );
};

export default HomeContainer;
