"use client";

import { userState } from "@/libs/redux-state/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const ConfirmSeed = () => {
  const router = useRouter();
  const getUser = useSelector(userState);
  const { user } = getUser;

  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Confirm user's seed phrase
  const confirmSeedPhrase = () => {
    // Check if user's input is the same as user's seed phrase
    if (user && inputValue === user.seedPhrase) {
      router.push("/");
    } else {
      setError(true);

      // Remove error message after 3 seconds
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center gap-4">
        <p className="text-center font-semibold text-lg">
          Enter your seed phrase to continue
        </p>
        <textarea
          className="w-full min-h-[10rem] max-h-[15rem] border border-[#272829] rounded-md p-3 appearance-none"
          placeholder="enter seed phrase"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold text-center rounded-md hover:bg-blue-600 transition"
          onClick={confirmSeedPhrase}
        >
          Confirm
        </button>
        {error && (
          <p className="text-red-500">Incorrect seed phrase. Try again!</p>
        )}
      </div>
    </section>
  );
};

export default ConfirmSeed;
