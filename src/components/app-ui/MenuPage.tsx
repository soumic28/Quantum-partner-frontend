"use client";

import { cn } from "@/lib/utils";
import Menubar from "./Menubar";

interface MenuPageProps {
  children: React.ReactNode;
  containerClassName?: string;
}

const MenuPage = ({ children, containerClassName }: MenuPageProps) => {
  return (
    <div
      className={cn(
        "flex h-dvh w-full flex-col items-start justify-start",
        containerClassName
      )}
    >
      <div className="w-full flex-1 overflow-y-scroll">{children}</div>
      <Menubar />
    </div>
  );
};
export default MenuPage;
