"use client";

import { useState } from "react";
import SwapCryptoInput from "./SwapCryptoInput";
import Image from "next/image";

const SwapCrypto = () => {
  const [fromCrypto, setFromCrypto] = useState<string | null>("BTC");
  const [toCrypto, setToCrypto] = useState<string | null>("ETH");

  const [isChangePosition, setIsChangePosition] = useState<boolean>(false);

  return (
    <section>
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-xl text-center">Swap crypto</h1>
        <div className="w-full flex flex-col items-center gap-8">
          <SwapCryptoInput
            selectedCrypto={isChangePosition ? toCrypto : fromCrypto}
            setSelectedCrypto={isChangePosition ? setToCrypto : setFromCrypto}
          />
          <button
            type="button"
            className="p-3 bg-blue-500 rounded-full"
            onClick={() => setIsChangePosition((prev) => !prev)}
          >
            <Image src="/swap.svg" width={15} height={15} alt="arrow" />
          </button>
          <SwapCryptoInput
            selectedCrypto={isChangePosition ? fromCrypto : toCrypto}
            setSelectedCrypto={isChangePosition ? setFromCrypto : setToCrypto}
          />
        </div>
      </div>
    </section>
  );
};

export default SwapCrypto;
