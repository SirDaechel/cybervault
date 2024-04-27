"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import CurrencyListDropdown from "./CurrencyListDropdown";
import CryptoToSwap from "./CryptoToSwap";

type SwapCryptoInput = {
  type: string;
  selectedCrypto: string;
  setSelectedCrypto: Dispatch<SetStateAction<string>>;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  amountTo?: number;
  exchangeError?: boolean;
  refetchUserData: number;
};

const SwapCryptoInput: React.FC<SwapCryptoInput> = ({
  type,
  selectedCrypto,
  setSelectedCrypto,
  placeholder,
  onChange,
  amountTo,
  exchangeError,
  refetchUserData,
}) => {
  const [showCryproList, setShowCryptoList] = useState(false);

  return (
    <section className="w-full">
      <span className="flex flex-col gap-1">
        <div className="w-full relative">
          <CryptoToSwap
            selectedCrypto={selectedCrypto}
            setShowCryproList={setShowCryptoList}
            refetchUserData={refetchUserData}
          />
          {showCryproList && (
            <CurrencyListDropdown
              setShowCryptoList={setShowCryptoList}
              setSelectedCrypto={setSelectedCrypto}
            />
          )}
        </div>
        <input
          type="number"
          className="p-2 border border-zinc-700 rounded-md disabled:bg-gray-200"
          placeholder={placeholder}
          step={0.00000000001}
          onChange={onChange}
          value={amountTo}
          disabled={type === "to" || exchangeError}
        />
      </span>
    </section>
  );
};

export default SwapCryptoInput;
