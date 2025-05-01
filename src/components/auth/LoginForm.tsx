"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { AppInput } from "../app-ui/AppInput";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { signUp } from "@/api/auth";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

interface LoginFormProps {
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  password?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
}

const LoginForm = ({ email, setEmail, password, setPassword }: LoginFormProps) => {
  const router = useRouter();
  const [localEmail, setLocalEmail] = useState(email || "");
  const [localPassword, setLocalPassword] = useState(password || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      password: password || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Update parent state if props are provided
    if (setEmail) setEmail(values.email);
    if (setPassword) setPassword(values.password);
    
    // Set local state
    setLocalEmail(values.email);
    setLocalPassword(values.password);
    
    // Log and call signUp
    console.log("Login form values:", values);
    signUp({
      ...values,
      fullName: "Default Name", // Replace with actual data if available
      addressLine1: "Default Address Line 1", // Replace with actual data if available
      state: "Default State", // Replace with actual data if available
      city: "Default City", // Replace with actual data if available
      pincode: "000000", // Replace with actual data if available
      phoneNumber: "0000000000", // Replace with actual data if available
    })
      .then((response) => {
        console.log("Login successful:", response);
        localStorage.setItem("accessToken", response);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col justify-center gap-2">
          <p className="font-brand text-xl font-bold">Welcome back!</p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Email Address *"
                  placeholder="abc@gmail.com"
                  className="text-sm"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setLocalEmail(e.target.value);
                    if (setEmail) setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Password *"
                  type="password"
                  placeholder="********"
                  className="text-sm"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setLocalPassword(e.target.value);
                    if (setPassword) setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button
            className="font-medium text-primary"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign up here
          </button>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;