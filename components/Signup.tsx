"use client";

import { useState } from "react";
import OtpInput from "./ui/OtpInput";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [otp1, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otp2, setOtp2] = useState<string[]>(new Array(6).fill(""));
  const [otp1Value, setOtp1Value] = useState<string>("");

  const [confirmCode, setConfirmCode] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleComplete = (otpValue: any) => {
    setOtp1Value(otpValue);
    setConfirmCode(true);
  };

  const handleConfirmComplete = (otpValue: any) => {
    if (otp1Value !== otpValue) {
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
          <OtpInput
            otp1={otp1}
            setOtp={setOtp}
            otp2={otp2}
            setOtp2={setOtp2}
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
