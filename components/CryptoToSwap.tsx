import { userState } from "@/libs/redux-state/features/user/userSlice";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type CryptoToSwapProps = {
  selectedCrypto: string | null;
  setShowCryproList: Dispatch<SetStateAction<boolean>>;
};

const CryptoToSwap: React.FC<CryptoToSwapProps> = ({
  selectedCrypto,
  setShowCryproList,
}) => {
  const getUser = useSelector(userState);
  const { user } = getUser;

  const [amountOfCrypto, setAmountOfCrypto] = useState<number>(0);

  // Get amount of crypto
  const getAmountofCrypto = () => {
    if (user.balances) {
      // Get user balances
      const userBalance = user.balances;

      // Find crypto that has its symbol the same as the selectedCrypto and return it
      const crypto = userBalance.find((crypto) => {
        return crypto.symbol === selectedCrypto;
      });

      // If crypto exists, calculate the amount of crypto the user has
      if (crypto) {
        const amountOfCrypto = crypto.investment / crypto.value;
        setAmountOfCrypto(amountOfCrypto);
      } else {
        console.log("User does not have selected crypto");
      }
    } else {
      console.log("User has no balances");
    }
  };

  // Run the getAmountofCrypto on initial render
  useEffect(() => {
    getAmountofCrypto();
  }, [selectedCrypto]);

  // Format amount of crypto
  const formatNumber = (num: number) => {
    // Convert number to string
    let numStr = num.toString();

    // Find the position of the first digit that is not 0 after the decimal point
    let index = numStr.indexOf(".") + 1;
    while (numStr[index] === "0") {
      index++;
    }

    // Number of digits to display after the decimal point
    let digits = index - numStr.indexOf(".") + 3;

    // Use toFixed to round the number
    return Number(num).toFixed(digits);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button
        type="button"
        className="flex items-center p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
        onClick={() => setShowCryproList((prev) => !prev)}
      >
        <span className="flex items-center justify-between gap-1">
          <p className="text-xs font-normal capitalize">
            {selectedCrypto && selectedCrypto}
          </p>
          <Image src="/arrow-down.svg" width={17} height={17} alt="arrow" />
        </span>
      </button>
      <p>Balance: {formatNumber(amountOfCrypto)}</p>
    </div>
  );
};

export default CryptoToSwap;
