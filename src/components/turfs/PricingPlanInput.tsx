"use client";

// Create a new component for pricing selection
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const PricingPlanInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="h-fit w-full">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="relative flex flex-col"
      >
        <Label
          htmlFor="fixed"
          className={cn(
            "cursor-pointer rounded-xl border-2 transition-all hover:border-primary/50",
            value === "FIXED" ? "border-primary bg-primary/5" : "border-muted"
          )}
        >
          <div className="flex items-start gap-4 p-4">
            <RadioGroupItem value="FIXED" id="fixed" className="mt-1" />
            <div className="flex items-start gap-4">
              <div className="flex flex-col justify-between">
                <p className="text-sm font-medium">Fixed Price</p>
                <p className="text-xs text-muted-foreground">
                  Fixed monthly payment regardless of bookings
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">₹5000</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>
          </div>
        </Label>

        <Label
          htmlFor="revenue"
          className={cn(
            "cursor-pointer rounded-xl border-2 transition-all hover:border-primary/50",
            value === "REVENUE_SHARE"
              ? "border-primary bg-primary/5"
              : "border-muted"
          )}
        >
          <div className="flex items-start gap-4 p-4">
            <RadioGroupItem
              value="REVENUE_SHARE"
              id="revenue"
              className="mt-1"
            />
            <div className="flex items-start gap-4">
              <div className="flex flex-col justify-between gap-1">
                <p className="text-sm font-medium">Revenue Share</p>
                <p className="text-xs text-muted-foreground">
                  Pay a percentage of your booking revenue
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">15%</span>
                <span className="text-nowrap text-sm text-muted-foreground">
                  of revenue
                </span>
              </div>
            </div>
          </div>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default PricingPlanInput;
