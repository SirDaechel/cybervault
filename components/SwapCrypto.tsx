"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SwapCryptoInput from "./SwapCryptoInput";
import Image from "next/image";
import { swapCurrencies } from "@/libs/utils";

const SwapCrypto = () => {
  const [fromCrypto, setFromCrypto] = useState<string>("BTC");
  const [toCrypto, setToCrypto] = useState<string>("ETH");
  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState<number>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountFrom(e.target.value);
  };

  useEffect(() => {
    const convertCrypto = swapCurrencies(
      fromCrypto,
      toCrypto,
      Number(amountFrom)
    );
    setAmountTo(convertCrypto);
    console.log("The converted result is:", convertCrypto);
  }, [amountFrom, fromCrypto, toCrypto]);

  const switchCrypto = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  return (
    <section>
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-xl text-center">Swap crypto</h1>
        <div className="w-full flex flex-col items-center gap-8">
          <SwapCryptoInput
            type="from"
            selectedCrypto={fromCrypto}
            setSelectedCrypto={setFromCrypto}
            placeholder="from"
            onChange={onChange}
          />
          <button
            type="button"
            className="p-3 bg-blue-500 rounded-full"
            onClick={switchCrypto}
          >
            <Image src="/swap.svg" width={15} height={15} alt="arrow" />
          </button>
          <SwapCryptoInput
            type="to"
            selectedCrypto={toCrypto}
            setSelectedCrypto={setToCrypto}
            placeholder="to"
            amountTo={amountTo}
          />
        </div>
        <button
          type="button"
          className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          Buy {toCrypto}
        </button>
      </div>
    </section>
  );
};

export default SwapCrypto;
