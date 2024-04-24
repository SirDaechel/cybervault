import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

type PasscodeInputProps = {
  onComplete: (passcodeValue: any) => void;
  confirmCode: boolean;
  passcode1: string[];
  setPasscode1: Dispatch<SetStateAction<string[]>>;
  passcode2: string[];
  setPasscode2: Dispatch<SetStateAction<string[]>>;
  onConfirmComplete: (passcodeValue: any) => void;
};

const PasscodeInput: React.FC<PasscodeInputProps> = ({
  onComplete,
  confirmCode,
  passcode1,
  setPasscode1,
  passcode2,
  setPasscode2,
  onConfirmComplete,
}) => {
  const passcode1Refs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    passcode1.map(() => React.createRef())
  );

  const passcode2Refs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    passcode2.map(() => React.createRef())
  );

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    const newOtp = confirmCode ? [...passcode2] : [...passcode1];
    const setNewOtp = confirmCode ? setPasscode2 : setPasscode1;

    if (isNaN(Number(value))) return; // Ensure that it is a number

    newOtp[index] = value;
    setNewOtp(newOtp);

    // Auto focus to next input on fill
    if (value && index < newOtp.length - 1) {
      const nextSibling = confirmCode
        ? passcode2Refs.current[index + 1]
        : passcode1Refs.current[index + 1];
      nextSibling.current?.focus();
    }

    // If all inputs are filled
    if (newOtp.every((num) => num !== "")) {
      const completeHandler = confirmCode ? onConfirmComplete : onComplete;
      completeHandler(newOtp.join(""));
    }
  };

  // If confirmCode is true, focus on the first input of passcode2
  useEffect(() => {
    if (confirmCode && passcode2Refs.current[0].current) {
      passcode2Refs.current[0].current.focus();
    }
  }, [confirmCode]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const passcode = confirmCode ? passcode2 : passcode1;

    if (
      e.key === "Backspace" &&
      e.currentTarget.previousSibling &&
      !passcode[index]
    ) {
      // Focus to previous input on backspace
      (e.currentTarget.previousSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex justify-center">
      {(confirmCode ? passcode2 : passcode1).map((data, index) => (
        <input
          key={index}
          ref={
            confirmCode
              ? passcode2Refs.current[index]
              : passcode1Refs.current[index]
          }
          className="otp-input w-12 h-12 mr-2 text-center border border-zinc-700"
          type="number"
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

export default PasscodeInput;
