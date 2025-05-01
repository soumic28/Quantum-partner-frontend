"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogOut = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    console.log("Logged out");
    router.push("/auth"); 
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h1>Log Out from this session</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default LogOut;
