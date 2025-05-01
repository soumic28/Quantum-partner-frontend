"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { INDIAN_STATES } from "@/lib/constants/IndianStates";
import { AppInput } from "../app-ui/AppInput";
import AppSelect from "../app-ui/AppSelect";
import { INDIAN_STATES_CITIES } from "@/lib/constants/IndianStatesToCitiesMap";
import { signUp } from "@/api/auth";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().nonempty({ message: "Full Name is required" }),
  addressLine1: z.string().nonempty({ message: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  state: z.string().nonempty({ message: "State is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  pincode: z.string().length(6, { message: "Pincode must be exactly 6 digits" }),
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" })
    .nonempty({ message: "Phone Number is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty({ message: "Password is required" }),
});

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      city: "",
      pincode: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const formattedStates = INDIAN_STATES.map((state) => ({
    value: state,
    label: state,
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setIsLoading(true);
    try {
      // Ensure phoneNumber is formatted correctly (strip any non-digits if needed)
      const payload = {
        ...values,
        phoneNumber: values.phoneNumber.trim(), // Ensure no extra spaces
      };
      const token = await signUp(payload);
      console.log("Signup successful:", token);
      localStorage.setItem("accessToken", token);
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup failed:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Full Name *"
                  placeholder="Owners Name"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  icon={<p className="text-sm">+91</p>}
                  label="Phone Number *"
                  placeholder="XXXXXXXXXX"
                  className="text-sm"
                  maxLength={10}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} // Only allow digits
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Address Line 1 *"
                  placeholder="House No, Street Name"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Address Line 2"
                  placeholder="Locality, Landmark"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <AppSelect
                items={formattedStates}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Select State"
                label="State *"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues("state") && (
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <AppSelect
                  items={INDIAN_STATES_CITIES[
                    form.watch("state") as keyof typeof INDIAN_STATES_CITIES
                  ].map((city) => ({
                    value: city,
                    label: city,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select City"
                  label="City *"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <AppInput
                  label="Pincode *"
                  placeholder="XXXXXX"
                  className="text-sm"
                  maxLength={6}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} // Only allow digits
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="font-brand" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;