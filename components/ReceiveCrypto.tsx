import { copyTextToClipboard } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

type ReceiveCryptoProps = {
  currentCrypto: string;
};

const ReceiveCrypto: React.FC<ReceiveCryptoProps> = ({ currentCrypto }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  const copySeedPhraseToClipboard = () => {
    copyTextToClipboard(address);
    setCopied(true);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-xl text-center">
          Receive {currentCrypto}
        </h1>
        <div className="bg-yellow-100 px-4 py-3 flex items-start gap-3 rounded">
          <Image src="/warn.svg" width={17} height={17} alt="copy" />
          <p className="text-yellow-600 text-sm">
            {`Only send ${currentCrypto} assets to this address. Other assets will be lost forever.`}
          </p>
        </div>
        <p className="text-xl font-medium text-center">{`"hksfjnofjjfsjlsfjlklsfsvsvsvsv"`}</p>
        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={copySeedPhraseToClipboard}
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
