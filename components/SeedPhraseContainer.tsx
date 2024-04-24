"use client";

import GenerateSeedPhrase from "@/components/GenerateSeedPhrase";
import SeedPhrase from "@/components/SeedPhrase";
import { useState } from "react";

const SeedPhraseContainer = () => {
  const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false);
  const [seedPhrase, setSeedPhrase] = useState<string>("");

  return (
    <section>
      {showSeedPhrase ? (
        <SeedPhrase seedPhrase={seedPhrase} />
      ) : (
        <GenerateSeedPhrase
          setShowSeedPhrase={setShowSeedPhrase}
          setSeedPhrase={setSeedPhrase}
        />
      )}
    </section>
  );
};

export default SeedPhraseContainer;
