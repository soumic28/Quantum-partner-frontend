"use client";

import StackPage from "@/components/app-ui/StackPage";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StackPage containerClassName="bg-primary" headerClassName="text-white">
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 bg-primary p-4 font-brand">
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
        <div className="flex h-fit w-full flex-col gap-6 rounded-t-3xl bg-white p-6 py-8">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </StackPage>
  );
};
export default LoginPage;
