"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  otp: z.string().min(6).max(6),
});

interface OtpFormProps {
  mobileNumber: string;
  step: "PHONE" | "OTP";
  setStep: Dispatch<SetStateAction<"PHONE" | "OTP">>;
}

const OtpForm = ({ mobileNumber, step, setStep }: OtpFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleBackToMobile = () => {
    setStep("PHONE");
  };

  if (step === "PHONE" || !mobileNumber || mobileNumber.length === 0) {
    setStep("PHONE");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <div
          className="flex w-full items-center gap-2 text-xs text-muted-foreground"
          onClick={handleBackToMobile}
        >
          <ArrowLeftIcon className="size-4" />
          <p>Back to Mobile</p>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-brand text-xl font-bold">OTP Verification</p>
          <p className="text-xs text-muted-foreground">
            Enter the code sent to +91 {mobileNumber}. It may take a minute to
            arrive.
          </p>
        </div>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-full justify-between">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="size-12 rounded-md border"
                        autoFocus={index === 0}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full font-brand">
          Login
        </Button>
        <p className="text-xs text-muted-foreground">
          Did not receive OTP?{" "}
          <span
            className="font-medium text-primary"
            onClick={() => router.push("/auth/sign-up")}
          >
            Resend here
          </span>
        </p>
      </form>
    </Form>
  );
};
export default OtpForm;
