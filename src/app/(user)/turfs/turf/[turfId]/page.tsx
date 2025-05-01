"use client";

import { getTurf } from "@/api/turfs";
import StackPage from "@/components/app-ui/StackPage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SettingsIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DemoData = {
  _id: "1",
  name: "Sunset Soccer Complex",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam quam, provident dolore libero ducimus autem! Commodi officia nulla culpa cumque explicabo ipsam enim similique odio voluptatum nemo possimus ad beatae animi itaque aliquam, nihil alias officiis! Adipisci, possimus! Debitis aperiam quod unde ab non sequi nisi officia sint veniam totam?",
  street: "1234 Sunset Blvd",
  state: "West Bengal",
  city: "Kolkata",
  pincode: "700001",
  hourlyRate: "$50/hr",
  capacity: "12",
  sports: ["Soccer", "Basketball"],
  isActive: true,
  rating: 4.5,
  images: ["https://picsum.photos/1920/1080"],
  availableDays: {
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
  },
  pricingPlan: "FIXED",
};

const TurfPage = () => {
  const router = useRouter();
  const { turfId } = useParams();
  const [turf, setTurf] = useState({
    name: "",
    description: "",
    address: {
      street: "",
      state: "",
      city: "",
      pincode: "",
    },
    hourlyRate: "",
    capacity: "",
    sports: [],
    isActive: true,
    rating: 0,
    images: [],
    availableDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    pricingPlan: "FIXED",
  });

  const EditTurfButton = () => {
    return (
      <span
        onClick={() => {
          router.push(`/turfs/edit/${turfId}`);
        }}
      >
        <SettingsIcon className="size-5" />
      </span>
    );
  };

  useEffect(() => {
    if (turfId) {
      getTurf(turfId)
        .then((data) => {
          setTurf(data);
        })
    }
  }, []);

  return (
    <StackPage topAction={<EditTurfButton />}>
      <div className="flex w-full flex-col gap-6 p-4 pt-0">
        {/* <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <Image
            src={DemoData.images[0]}
            width={512}
            height={512}
            alt="Turf Image"
            className="h-full w-full object-cover"
          />
        </AspectRatio> */}

        <div className="flex w-full items-center justify-between gap-2">
          <p className="font-brand text-xl font-bold">{turf.name}</p>
          <div className="flex items-center gap-2">
            <StarIcon className="size-4 fill-primary text-primary" />
            <p className="text-sm text-muted-foreground">{turf.rating}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Description
          </p>
          <p className="text-sm text-muted-foreground">
            {turf.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Address
          </p>
          <p className="text-sm text-muted-foreground">{`
            ${turf.address.street}, ${turf.address.city}, ${turf.address.state}, ${turf.address.pincode}
          `}</p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Hourly Rate
          </p>
          <p className="text-sm text-muted-foreground">{turf.hourlyRate}</p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Sports
          </p>
          <div className="flex w-full flex-wrap gap-2">
            {turf.sports.map((sport, index) => (
              <Badge key={index} variant={"secondary"}>
                {sport}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Capacity
          </p>
          <p className="text-sm text-muted-foreground">
            {turf.capacity} Individuals
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Available Days
          </p>
          <div className="flex w-full flex-wrap gap-2">
            {Object.keys(turf.availableDays).map((day, index) => {
              const dayKey = day as keyof typeof turf.availableDays;
              return (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className={cn(
                    "capitalize",
                    turf.availableDays[dayKey]
                      ? "bg-primary text-white"
                      : "bg-muted"
                  )}
                >
                  {day}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="font-brand text-xs font-medium uppercase text-primary">
            Pricing Plan
          </p>
          <p className="text-sm text-muted-foreground">
            {turf.pricingPlan === "FIXED" && "Fixed Rate 5000 per month"}
            {turf.pricingPlan === "REVENUE_SHARE" && "15% of Revenue"}
          </p>
        </div>
      </div>
    </StackPage>
  );
};
export default TurfPage;
