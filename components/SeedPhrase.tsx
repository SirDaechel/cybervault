import { copyTextToClipboard } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

type SeedPhraseProps = {
  seedPhrase: string;
};

const SeedPhrase: React.FC<SeedPhraseProps> = ({ seedPhrase }) => {
  const [copied, setCopied] = useState(false);

  const copySeedPhraseToClipboard = () => {
    copyTextToClipboard(seedPhrase);
    setCopied(true);
  };

  return (
    <section>
      <div className="flex flex-col gap-24 justify-between">
        <p className="text-xl font-medium text-center">"{seedPhrase}"</p>
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
        <div className="flex flex-col gap-4">
          <div className="bg-yellow-100 px-4 py-3 flex items-start gap-3 rounded">
            <Image src="/warn.svg" width={17} height={17} alt="copy" />
            <p className="text-yellow-600 text-sm">
              Do not share your seed phrase with anyone. Keep it safe!
            </p>
          </div>
          <button
            type="button"
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold text-center rounded-md hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeedPhrase;
