import Image from "next/image";
import Link from "next/link";
import React from "react";

const SecretPhrase = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-8 justify-between">
        <Image
          src="/background/illustration (5).webp"
          width={250}
          height={250}
          alt="img"
        />
        <span className="flex flex-col gap-2 text-center">
          <p className="font-semibold text-2xl text-center">
            Backup your secret phrase
          </p>
          <p className="text-sm">
            Protect your assets by backing up your secret/seed phrase now
          </p>
        </span>
        <Link
          href="/sign-up"
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold text-center rounded-md hover:bg-blue-600 transition"
        >
          Backup seed phrase
        </Link>
      </div>
    </section>
  );
};

export default SecretPhrase;
