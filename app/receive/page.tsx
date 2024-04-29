import CryptoListContainer from "@/components/CryptoListContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <section className="w-full">
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <CryptoListContainer type="receive" />
      </Suspense>
    </section>
  );
};

export default page;
