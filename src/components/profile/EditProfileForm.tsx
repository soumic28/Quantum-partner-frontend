"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { getProfile, updateProfile } from "@/api/auth";
import { useEffect, useState } from "react";

const formSchema = z.object({
  fullName: z.string().nonempty({ message: "Full Name is required" }),
  addressLine1: z.string().nonempty({ message: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  state: z.string().nonempty({ message: "State is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  pincode: z.union([z.string(), z.number()]),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  phoneNumber: z.string().nonempty({ message: "Phone Number is required" }),
});

const EditProfileForm = () => {

  const [profile, setProfile] = useState({
    fullName: "",
    addressLine1: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    email: "",
    phoneNumber: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: profile.fullName || "",
      addressLine1: profile.address.street || "",
      state: profile.address.state || "",
      city: profile.address.city || "",
      pincode: profile.address.pincode,
      email: profile.email || "",
      phoneNumber: profile.phoneNumber || "",
    },
  });

  const formattedStates = INDIAN_STATES.map((state) => ({
    value: state,
    label: state,
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    updateProfile(values);
  }

  useEffect(() => {
    getProfile()
      .then(data => {
        setProfile({...data});
        form.reset({
          fullName: data.fullName || "",
          addressLine1: data.address.street || "",
          state: data.address.state || "",
          city: data.address.city || "",
          pincode: data.address.pincode || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="XXXXX XXXXX"
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

        {form.getValues("state") !== "" ? (
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
        ) : null}

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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full font-brand">
          Save Profile
        </Button>
      </form>
    </Form>
  );
};
export default EditProfileForm;
