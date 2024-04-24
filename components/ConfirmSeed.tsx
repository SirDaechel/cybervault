"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmSeed = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Get user's data from database
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const user = JSON.parse(userDetails);
      setUserData(user);
    }
  }, []);

  // Confirm user's seed phrase
  const confirmSeedPhrase = () => {
    // Check if user's input is the same as user's seed phrase
    if (userData && inputValue === userData.seedPhrase) {
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
