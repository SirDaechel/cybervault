"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");

      // If no user data, redirect to sign-in page
      if (!userData) {
        router.push("/onboarding");
      }
    }
  }, [router]);

  return <section>home</section>;
}
