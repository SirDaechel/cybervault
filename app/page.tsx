import HomeContainer from "@/components/HomeContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <section>
      <Suspense fallback={<p className="text-center"></p>}>
        <HomeContainer />
      </Suspense>
    </section>
  );
}
