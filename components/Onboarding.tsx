import Image from "next/image";
import Link from "next/link";

const Onboarding = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-8 justify-between">
        <Image
          src="/background/illustration (3).webp"
          width={250}
          height={250}
          alt="img"
        />
        <span className="flex flex-col gap-2 text-center">
          <p className="font-semibold text-2xl text-center">
            Welcome To CyberVault!
          </p>
          <p className="text-sm">Your Stealth Wealth Guardian.</p>
        </span>
        <p className="text-center">
          Be Part Of The 20M+ Visionaries Crafting Tomorrow’s Digital Landscape
          With Us.
        </p>
        <Link
          href="/sign-up"
          className="w-full py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
        >
          Create a wallet
        </Link>
      </div>
    </section>
  );
};

export default Onboarding;
