"use client";

import { userState } from "@/libs/redux-state/features/user/userSlice";
import { createURL } from "@/libs/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import SendCrypto from "./SendCrypto";
import ReceiveCrypto from "./ReceiveCrypto";
import { useEffect, useState } from "react";
import Loading from "./Loading";

type CryptoListContainerProps = {
  type: string;
};

const CryptoListContainer: React.FC<CryptoListContainerProps> = ({ type }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentCrypto = UrlSearchParams.get("crypto");

  const [isLoader, setIsLoader] = useState<boolean>(true);

  const getUser = useSelector(userState);
  const { user } = getUser;
  const userBalances = user.balances;

  const selectCryptoToSend = (crypto: string) => {
    UrlSearchParams.set("crypto", crypto);
    // Call the function that creates a URL string with the data from UrlSearchParams
    const pageURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${pageURL}`);
  };

  // Set a loader for 0.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  }, []);

  return (
    <section className="w-full">
      {isLoader ? (
        <Loading />
      ) : (
        <>
          {currentCrypto ? (
            type === "send" ? (
              <SendCrypto currentCrypto={currentCrypto} />
            ) : (
              <ReceiveCrypto currentCrypto={currentCrypto} />
            )
          ) : (
            <>
              <div className="flex flex-col gap-3 mb-8">
                <h1 className="font-semibold text-xl text-center">
                  {type === "send" ? "Send" : "Receive"} crypto
                </h1>
                <p className="text-center">Here is your list of owned assets</p>
              </div>
              <div className="flex flex-col gap-2 bg-zinc-100 rounded-md p-2">
                {userBalances.length > 0 ? (
                  userBalances.map((crypto, index) => (
                    <button
                      key={index}
                      type="button"
                      className="hover:bg-blue-500 hover:text-white p-3 rounded transition"
                      onClick={() => selectCryptoToSend(crypto.symbol)}
                    >
                      <div className="flex items-center justify-between">
                        <p>{crypto.symbol}</p>
                        <div className="flex flex-col gap-1 items-end">
                          <p>{(crypto.investment / crypto.value).toFixed(8)}</p>
                          <p>${crypto.investment.toFixed(2)}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-center">You have no assets</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default CryptoListContainer;
