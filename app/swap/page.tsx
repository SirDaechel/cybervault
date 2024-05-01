import SwapCrypto from "@/components/SwapCrypto";
import { Suspense } from "react";

const page = () => {
  return (
    <section>
      <div className="w-full">
        <Suspense fallback={<p className="text-center"></p>}>
          <SwapCrypto />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
