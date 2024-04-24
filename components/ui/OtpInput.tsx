import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
} from "react";

type OtpInputProps = {
  onComplete: (otpValue: any) => void;
  confirmCode: boolean;
  otp1: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  otp2: string[];
  setOtp2: Dispatch<SetStateAction<string[]>>;
  onConfirmComplete: (otpValue: any) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({
  onComplete,
  confirmCode,
  otp1,
  setOtp,
  otp2,
  setOtp2,
  onConfirmComplete,
}) => {
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (!confirmCode) {
      if (isNaN(Number(element.value))) return false; // Ensure that it is a number
      const newOtp = [...otp1];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Auto-focus to next input on fill
      if (element.nextSibling && element.value) {
        (element.nextSibling as HTMLInputElement).focus();
      }

      // If all inputs for otp are filled
      if (newOtp.every((num) => num !== "")) {
        onComplete(newOtp.join(""));
      }
    } else {
      if (isNaN(Number(element.value))) return false; // Ensure that it is a number
      const newOtp = [...otp2];
      newOtp[index] = element.value;
      setOtp2(newOtp);

      // Auto-focus to next input on fill
      if (element.nextSibling && element.value) {
        (element.nextSibling as HTMLInputElement).focus();
      }
    }
  };

  useEffect(() => {
    // If all inputs for otp2 are filled
    if (otp2.every((num) => num !== "")) {
      onConfirmComplete(otp2.join(""));
      // onConfirmComplete();
    }
  }, [otp2]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!confirmCode) {
      if (
        e.key === "Backspace" &&
        e.currentTarget.previousSibling &&
        !otp1[index]
      ) {
        // Focus to previous input on backspace
        (e.currentTarget.previousSibling as HTMLInputElement).focus();
      }
    } else {
      if (
        e.key === "Backspace" &&
        e.currentTarget.previousSibling &&
        !otp2[index]
      ) {
        // Focus to previous input on backspace
        (e.currentTarget.previousSibling as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex justify-center">
      {!confirmCode
        ? otp1.map((data, index) => (
            <input
              key={index}
              className="w-12 h-12 mr-2 text-center border border-zinc-700"
              type="text"
              maxLength={1}
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target, index)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              autoFocus={true}
              onFocus={(e: ChangeEvent<HTMLInputElement>) => e.target.select()}
            />
          ))
        : otp2.map((data, index) => (
            <input
              key={index}
              className="w-12 h-12 mr-2 text-center border border-zinc-700"
              type="text"
              maxLength={1}
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target, index)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              onFocus={(e: ChangeEvent<HTMLInputElement>) => e.target.select()}
            />
          ))}
    </div>
  );
};

export default OtpInput;
