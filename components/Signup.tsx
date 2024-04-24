"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasscodeInput from "./PasscodeInput";

const Signup = () => {
  const router = useRouter();

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
    if (passcode1Value !== passcodeValue) {
      setError(true);
    } else {
      router.push("/sign-up/seed-phrase");
    }
  };

  return (
    <section>
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
    </section>
  );
};

export default Signup;
