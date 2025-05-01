"use client";

import { getWeeklyBookings } from "@/api/bookings";
import { useEffect, useState } from "react";

// import { ChevronRightIcon } from "lucide-react";

const WeekBookingStat = () => {

  const [weeklyBookings, setWeeklyBookings] = useState([]);

  useEffect(() => {
    // fetch week bookings

    getWeeklyBookings()
      .then((data) => {
        data = 15; // TODO: remove this line
        setWeeklyBookings(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-semibold">Bookings this week</p>
        {/* <span className="flex items-center gap-1 text-xs text-muted-foreground">
          See All
          <ChevronRightIcon className="size-5" />
        </span> */}
      </div>
      <p className="font-brand text-3xl font-bold">{weeklyBookings}</p>
      <p className="text-2xs uppercase text-muted-foreground">
        Across all Turfs
      </p>
    </div>
  );
};
export default WeekBookingStat;
