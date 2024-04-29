import CryptoListContainer from "@/components/CryptoListContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <CryptoListContainer type="send" />
      </Suspense>
    </section>
  );
};

export default page;
