import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type CryptoToSwapProps = {
  selectedCrypto: string | null;
  setShowCryproList: Dispatch<SetStateAction<boolean>>;
};

const CryptoToSwap: React.FC<CryptoToSwapProps> = ({
  selectedCrypto,
  setShowCryproList,
}) => {
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
      <p>Balance: 0</p>
    </div>
  );
};

export default CryptoToSwap;
