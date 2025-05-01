"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth");
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-6 bg-primary font-brand">
      <div className="aspect-square w-3/6">
        <Image
          src="/assets/brand/quantum-logo.png"
          alt="Quantum Partner"
          width={240}
          height={240}
          priority
          className="w-full"
        />
      </div>
      <div className="space-y-2 text-center text-white">
        <p className="font-brand text-2xl font-bold">Quantum Partner</p>
        <p className="font-brand text-sm">Infinite Possiblities</p>
      </div>
    </div>
  );
};
export default SplashScreen;
