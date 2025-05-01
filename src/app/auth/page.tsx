"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleSignUpClick = () => {
    router.push("/auth/sign-up");
  };

  return (
    <div className="flex  w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="aspect-square w-5/6">
          <Image
            src="/assets/auth/auth-hero.svg"
            alt="Quantum Partner"
            width={240}
            height={240}
            priority
            className="w-full"
          />
        </div>
        <div className="flex w-5/6 flex-col gap-2 text-center">
          <p className="font-brand text-2xl font-bold">Lets Get Started</p>
          <p className="font-brand text-sm text-muted-foreground">
            Explore the infinite possibilities with quantum
          </p>
        </div>
      </div>
      <div className="flex  flex-col gap-4 font-brand">
        <Button onClick={handleLoginClick}>Log In</Button>
        <Button variant={"secondary"} onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};
export default AuthPage;
