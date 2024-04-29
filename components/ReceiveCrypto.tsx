import { cryptocurrencies } from "@/constants";
import { copyTextToClipboard } from "@/libs/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "@/libs/redux-state/features/user/userSlice";

type ReceiveCryptoProps = {
  currentCrypto: string;
};

const ReceiveCrypto: React.FC<ReceiveCryptoProps> = ({ currentCrypto }) => {
  const getUser = useSelector(userState);
  const { user } = getUser;
  const addresses = user.addresses;

  const [copied, setCopied] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  // Get the user's currentCrypto address
  useEffect(() => {
    const crypto = cryptocurrencies.find(
      (crypto) => crypto.symbol === currentCrypto
    );
    if (crypto) setAddress(addresses[crypto.name]);
  }, [currentCrypto, addresses, cryptocurrencies]);

  const copyAddressToClipboard = () => {
    copyTextToClipboard(address);
    setCopied(true);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8 overflow-hidden">
        <h1 className="font-semibold text-xl text-center">
          Receive {currentCrypto}
        </h1>
        <div className="bg-yellow-100 px-4 py-3 flex items-start gap-3 rounded">
          <Image src="/warn.svg" width={17} height={17} alt="copy" />
          <p className="text-yellow-600 text-sm">
            {`Only send ${currentCrypto} assets to this address. Other assets will be lost forever.`}
          </p>
        </div>
        <p className="text-xl font-medium text-center break-words">
          &quot;{address}&quot;
        </p>
        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={copyAddressToClipboard}
          >
            {copied ? (
              <Image src="/check.svg" width={17} height={17} alt="copy" />
            ) : (
              <Image src="/copy.svg" width={17} height={17} alt="copy" />
            )}
            <p className="text-blue-600 text-center">
              {copied ? "Copied" : "Copy to clipboard"}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReceiveCrypto;
