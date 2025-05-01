"use client";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface StackPageProps {
  children: React.ReactNode;
  onBack?: () => void;
  title?: string;
  topAction?: React.ReactNode;
  bottomAction?: React.ReactNode;
  containerClassName?: string;
  headerClassName?: string;
}

const StackPage = ({
  children,
  onBack,
  title,
  topAction,
  bottomAction,
  containerClassName,
  headerClassName,
}: StackPageProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex h-dvh max-h-dvh w-full flex-col items-start justify-start overflow-hidden",
        containerClassName
      )}
    >
      <div
        className={cn(
          "flex h-16 w-full items-center justify-between p-4",
          headerClassName
        )}
      >
        <div className="flex flex-1 items-center justify-start">
          <ArrowLeftIcon onClick={handleBack} className="cursor-pointer" />
        </div>
        <div className="flex flex-[3] items-center justify-center text-center">
          {title ? (
            <p className="line-clamp-1 font-brand font-bold">{title}</p>
          ) : null}
        </div>
        <div className="flex flex-1 items-center justify-end">{topAction}</div>
      </div>
      <div className="w-full flex-1 overflow-y-scroll">{children}</div>
      {bottomAction ? <div className="h-fit w-full">{bottomAction}</div> : null}
    </div>
  );
};
export default StackPage;
