import { cryptocurrencies } from "@/constants";
import { Dispatch, MouseEvent, SetStateAction } from "react";

type CurrencyListDropdownProps = {
  setShowCryptoList: Dispatch<SetStateAction<boolean>>;
  setSelectedCrypto: Dispatch<SetStateAction<string | null>>;
};

const CurrencyListDropdown: React.FC<CurrencyListDropdownProps> = ({
  setShowCryptoList,
  setSelectedCrypto,
}) => {
  // Select crypto to swap
  const handleCryptoChange = (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    setSelectedCrypto(e.currentTarget.textContent);
    setShowCryptoList(false);
  };

  return (
    <ul className="w-16 mt-1 rounded-md absolute items-center justify-center border border-zinc-700 bg-white drop-shadow-md">
      {cryptocurrencies.map((crypto, index) => (
        <li
          key={index}
          className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
          onClick={(e) => handleCryptoChange(e)}
        >
          {crypto.symbol}
        </li>
      ))}
    </ul>
  );
};

export default CurrencyListDropdown;
