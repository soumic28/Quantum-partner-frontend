import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface AppInputProps extends React.ComponentProps<"textarea"> {
  label?: string;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const AppTextArea = React.forwardRef<HTMLTextAreaElement, AppInputProps>(
  ({ className, label, icon, suffixIcon, ...props }, ref) => {
    return (
      <div className="group -space-y-2">
        {label && (
          <Label className="ml-2 bg-background px-1 text-xs font-medium tracking-wide text-muted-foreground group-focus-within:text-primary">
            {label}
          </Label>
        )}
        <div className="flex w-full items-center rounded-md border border-input focus-within:border-primary">
          {icon ? <div className="pl-3">{icon}</div> : null}
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-md bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffixIcon ? <div className="pr-3">{suffixIcon}</div> : null}
        </div>
      </div>
    );
  }
);
AppTextArea.displayName = "Input";

export { AppTextArea };
