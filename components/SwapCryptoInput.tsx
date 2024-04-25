"use client";

import { Dispatch, SetStateAction, useState } from "react";
import CurrencyListDropdown from "./CurrencyListDropdown";
import CryptoToSwap from "./CryptoToSwap";

type SwapCryptoInput = {
  selectedCrypto: string | null;
  setSelectedCrypto: Dispatch<SetStateAction<string | null>>;
};

const SwapCryptoInput: React.FC<SwapCryptoInput> = ({
  selectedCrypto,
  setSelectedCrypto,
}) => {
  const [showCryproList, setShowCryptoList] = useState(false);

  return (
    <section className="w-full">
      <span className="flex flex-col gap-1">
        <div className="w-full relative">
          <CryptoToSwap
            selectedCrypto={selectedCrypto}
            setShowCryproList={setShowCryptoList}
          />
          {showCryproList && (
            <CurrencyListDropdown
              setShowCryptoList={setShowCryptoList}
              setSelectedCrypto={setSelectedCrypto}
            />
          )}
        </div>
        <input
          type="text"
          className="p-2 border border-zinc-700 rounded-md"
          placeholder="from"
        />
      </span>
    </section>
  );
};

export default SwapCryptoInput;
