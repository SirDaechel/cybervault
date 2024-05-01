"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PasscodeInput from "./PasscodeInput";
import {
  createDummyAddress,
  deriveDummyPublicKey,
  generateDummyPrivateKey,
} from "@/libs/utils";
import { cryptocurrencies } from "@/constants";
import { useDispatch } from "react-redux";
import { setUser } from "@/libs/redux-state/features/user/userSlice";
import Loading from "./Loading";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoader, setIsLoader] = useState<boolean>(true);

  const [passcode1, setPasscode1] = useState<string[]>(new Array(6).fill(""));
  const [passcode2, setPasscode2] = useState<string[]>(new Array(6).fill(""));
  const [passcode1Value, setPasscode1Value] = useState<string>("");

  const [confirmCode, setConfirmCode] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleComplete = (passcodeValue: any) => {
    setPasscode1Value(passcodeValue);
    setConfirmCode(true);
  };

  const handleConfirmComplete = (passcodeValue: any) => {
    // Prepare user's data
    const privateKey = generateDummyPrivateKey();
    const publicKey = deriveDummyPublicKey(privateKey);
    const addresses: Address = {};
    let balances: Balance[] = [];

    // Iterate through Cybervault's available crypto currencies, generate user's crypto addresses based on available crypto currencies and set user's balance
    cryptocurrencies.forEach((crypto) => {
      addresses[crypto.name] = createDummyAddress(
        publicKey,
        crypto.name.substring(0, 3)
      );

      const balance: Balance = {
        crypto: crypto.name,
        value: crypto.value,
        symbol: crypto.symbol,
        investment: 5,
      };

      balances = [...balances, balance];
    });

    if (passcode1Value !== passcodeValue) {
      setError(true);
    } else {
      dispatch(
        setUser({
          privateKey: privateKey,
          publicKey: publicKey,
          passcode: passcodeValue,
          addresses: addresses,
          balances: balances,
        })
      );

      router.push("/sign-up/seed-phrase");
    }
  };

  // Set a loader for 1.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 1500);
  }, []);

  return (
    <section>
      {isLoader ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center gap-8">
          <p className="text-2xl">
            {!confirmCode ? "Create passcode" : "Confirm passcode"}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-8"
          >
            <PasscodeInput
              passcode1={passcode1}
              setPasscode1={setPasscode1}
              passcode2={passcode2}
              setPasscode2={setPasscode2}
              onComplete={handleComplete}
              confirmCode={confirmCode}
              onConfirmComplete={handleConfirmComplete}
            />
            <p className="text-sm text-center">
              {!confirmCode ? "Enter" : "Re-enter"} your passcode. Make sure to
              remember it so you can unlock your wallet.
            </p>
            {error && (
              <p className="text-center text-red-500">
                Codes do not match. Try again.
              </p>
            )}
          </form>
        </div>
      )}
    </section>
  );
};

export default Signup;
