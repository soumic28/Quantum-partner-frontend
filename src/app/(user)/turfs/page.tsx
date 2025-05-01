"use client";

import MenuPage from "@/components/app-ui/MenuPage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupeeIcon, MapPinIcon, PlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTurfs } from "@/api/turfs";

const DemoData = [
  {
    name: "Sunset Soccer Complex",
    address: "1234 Sunset Blvd, Los Angeles, CA",
    price: "$50/hr",
    sports: ["Soccer", "Basketball"],
    isActive: true,
    rating: 4.5,
    images: ["https://picsum.photos/1920/1080"],
  },
  {
    name: "Victory Sports Field",
    address: "1234 Victory Blvd, Los Angeles, CA",
    price: "$40/hr",
    sports: ["Soccer", "Basketball"],
    isActive: true,
    rating: 4.2,
    images: ["https://picsum.photos/1920/1080"],
  },
  {
    name: "Central Park Ground",
    address: "1234 Central Park Blvd, Los Angeles, CA",
    price: "$60/hr",
    sports: ["Soccer", "Basketball"],
    isActive: false,
    rating: 4.8,
    images: ["https://picsum.photos/1920/1080"],
  },
  {
    name: "Champions Turf",
    address: "1234 Champions Blvd, Los Angeles, CA",
    price: "$70/hr",
    sports: ["Soccer", "Basketball"],
    isActive: true,
    rating: 4.9,
    images: ["https://picsum.photos/1920/1080"],
  },
  {
    name: "Elite Athletic Field",
    address: "1234 Elite Blvd, Los Angeles, CA",
    price: "$80/hr",
    sports: ["Soccer", "Basketball"],
    isActive: true,
    rating: 4.7,
    images: ["https://picsum.photos/1920/1080"],
  },
];

const TurfsPage = () => {
  const router = useRouter();

  const [turfs, setTurfs] = useState<any>([]);

  const AddNewTurfButton = () => {
    return (
      <Button
        onClick={() => {
          router.push("/turfs/new");
        }}
        className="h-fit w-fit p-2"
      >
        <PlusIcon className="" />
      </Button>
    );
  };

  useEffect(() => {
    getTurfs()
      .then((data) => {
        console.log(data);
        setTurfs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MenuPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-4 p-6">
        <div className="flex w-full items-center gap-4">
          <div className="flex w-full flex-col">
            <h1 className="font-brand text-2xl font-bold">Turfs</h1>
            <p className="text-sm text-primary">All your registered turfs</p>
          </div>
          <AddNewTurfButton />
        </div>
        <div className="flex w-full flex-col gap-4">
          {turfs.map((turf: any, index: number) => (
            <div
              key={turf._id}
              className="flex w-full flex-col gap-4 rounded-lg border bg-white p-4"
              onClick={() => router.push(`/turfs/turf/${turf._id}`)}
            >
              {/* <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-lg"
              >
                <Image src={turf.images[0]} alt={turf.name} layout="fill" />
                
              </AspectRatio> */}

              <div className="flex w-full items-center justify-between gap-2">
                <p className="line-clamp-1 font-brand text-base font-semibold">
                  {turf.name}
                </p>
                {turf.isActive ? (
                  <Badge className="text-2xs text-white">Active</Badge>
                ) : (
                  <Badge
                    className="text-2xs text-muted-foreground"
                    variant={"secondary"}
                  >
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full items-center gap-2">
                  <MapPinIcon className="size-4 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    {turf.address ? 
                      `${turf.address.street || ''}, ${turf.address.city || ''}, ${turf.address.state || ''}` : 
                      'Address not available'}
                  </p>
                </div>

                <div className="flex w-full items-center gap-2">
                  <IndianRupeeIcon className="size-4 text-primary" />
                  <p className="text-xs text-muted-foreground">{turf.price}</p>
                </div>

                {turf.rating.length > 0 && (
                  <div className="flex w-full items-center gap-2">
                    <StarIcon className="size-4 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      {turf.rating.reduce((a: any, b: any) => a + b, 0) /
                        turf.rating.length}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex w-full flex-wrap gap-2">
                  {turf.sports.map((sport: any, index: number) => (
                    <Badge key={index} variant={"secondary"}>
                      {sport}
                    </Badge>
                  ))}
                </div>
                {/* <span>
                  <SettingsIcon className="size-5 text-muted-foreground" />
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MenuPage>
  );
};
export default TurfsPage;
