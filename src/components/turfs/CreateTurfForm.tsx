"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AppInput } from "../app-ui/AppInput";
import AppSelect from "../app-ui/AppSelect";
import { INDIAN_STATES_CITIES } from "@/lib/constants/IndianStatesToCitiesMap";
import { INDIAN_STATES } from "@/lib/constants/IndianStates";
import { IndianRupeeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import TurfGalleryInput from "./TurfGalleryInput";
import PricingPlanInput from "./PricingPlanInput";
import { AppTextArea } from "../app-ui/AppTextArea";

const createTurfFormSchema = z.object({
  name: z.string().nonempty({ message: "Full Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  street: z.string().nonempty({ message: "Street is required" }),
  state: z.string().nonempty({ message: "State is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  pincode: z.string().min(6, { message: "Pincode must be 6 digits" }).max(6),
  hourlyRate: z
    .string()
    .nonempty({ message: "Hourly rate is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Hourly rate must be a valid number",
    })
    .refine((value) => Number(value) > 0, {
      message: "Hourly rate must be greater than 0",
    }),
  capacity: z
    .string()
    .nonempty({ message: "Capacity is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Capacity must be a valid number",
    })
    .refine((value) => Number(value) >= 1, {
      message: "Capacity must be at least 1",
    }),
  availableDays: z
    .object({
      sunday: z.boolean(),
      monday: z.boolean(),
      tuesday: z.boolean(),
      wednesday: z.boolean(),
      thursday: z.boolean(),
      friday: z.boolean(),
      saturday: z.boolean(),
    })
    .refine((days) => Object.values(days).some((day) => day), {
      message: "Select at least one day",
    }),
  images: z.array(z.string()).max(5, { message: "Maximum 5 images allowed" }),
  pricingPlan: z.enum(["FIXED", "REVENUE_SHARE"], {
    required_error: "Please select a pricing plan",
  }),
});

const CreateTurfForm = () => {
  const formattedStates = INDIAN_STATES.map((state) => ({
    value: state,
    label: state,
  }));

  const form = useForm<z.infer<typeof createTurfFormSchema>>({
    resolver: zodResolver(createTurfFormSchema),
    defaultValues: {
      name: "",
      description: "",
      street: "",
      state: "",
      city: "",
      pincode: "",
      hourlyRate: "",
      capacity: "1",
      availableDays: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      images: [],
      pricingPlan: "FIXED",
    },
    mode: "onSubmit", // Ensure validation triggers on submit
  });

  async function onSubmit(values: z.infer<typeof createTurfFormSchema>) {
    console.log("✅ Form submitted successfully with values:", values);
    try {
      const response = await fetch("http://localhost:3001/api/v1/turf", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("✅ Success! Response data:", data);
        alert("Turf created successfully!");
      } else {
        console.error("❌ Failed to create turf. Status:", response.status, "Response:", data);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
    }
  }

  // Log form state on every render
  console.log("Current Form Values:", form.getValues());
  console.log("Form Errors:", form.formState.errors);
  console.log("Is Submitting:", form.formState.isSubmitting);

  // Handle manual submission trigger for debugging
  const handleDebugSubmit = () => {
    console.log("Debug: Manually triggering submit");
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log("Form submit event triggered");
          form.handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-4"
      >
        {/* Location Details */}
        <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
          <div className="flex w-full flex-col gap-1">
            <p className="font-brand font-bold">Location Details</p>
            <p className="text-xs text-muted-foreground">
              Provide accurate details about your turf location
            </p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <AppInput
                    label="Turf Name *"
                    placeholder="Greenfield Arena"
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add other fields similarly */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <AppTextArea
                    label="Description *"
                    placeholder="Describe your turf"
                    className="text-sm"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <AppInput
                    label="Street *"
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
          {form.getValues("state") !== "" && (
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Service Details */}
        <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
          <div className="flex w-full flex-col gap-1">
            <p className="font-brand font-bold">Service Details</p>
            <p className="text-xs text-muted-foreground">
              Provide accurate details about your turf services
            </p>
          </div>
          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <AppInput
                    type="number"
                    label="Hourly Rate *"
                    placeholder="2900"
                    className="text-sm"
                    icon={<IndianRupeeIcon className="size-4 text-muted-foreground" />}
                    suffixIcon={<p className="font-brand text-sm font-medium text-primary">/hr</p>}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <div className="flex flex-col justify-center gap-4">
                    <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground">
                      How many people can your turf host? *
                    </FormLabel>
                    <div className="flex w-full items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => field.onChange(String(Math.max(1, Number(field.value) - 1)))}
                      >
                        <MinusIcon className="size-4 text-primary" />
                      </Button>
                      <span className="text-center font-brand text-xl font-bold">{field.value}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => field.onChange(String(Number(field.value) + 1))}
                      >
                        <PlusIcon className="size-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableDays"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground">
                  Select your working days *
                </FormLabel>
                <FormControl>
                  <div className="flex w-full items-center justify-around gap-4">
                    {Object.keys(field.value).map((day) => (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <Checkbox
                          checked={field.value[day as keyof typeof field.value]}
                          onCheckedChange={(checked) => {
                            field.onChange({ ...field.value, [day]: checked });
                          }}
                          className="size-6 rounded-full"
                        />
                        <span className="text-xs font-medium text-muted-foreground">
                          {day[0].toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Gallery */}
        <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
          <div className="flex w-full flex-col gap-1">
            <p className="font-brand font-bold">Gallery</p>
            <p className="text-xs text-muted-foreground">Upload up to 5 photos of your turf</p>
          </div>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <TurfGalleryInput images={field.value} onChange={field.onChange} maxImages={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Pricing Plan */}
        <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
          <div className="flex w-full flex-col gap-1">
            <p className="font-brand font-bold">Pricing Plan</p>
            <p className="text-xs text-muted-foreground">Flexible pricing plans that grow with you</p>
          </div>
          <FormField
            control={form.control}
            name="pricingPlan"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PricingPlanInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Buttons */}
        <Button type="submit" className="w-full font-brand">
          Create Turf
        </Button>
        <Button type="button" variant="outline" onClick={handleDebugSubmit}>
          Debug Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateTurfForm;