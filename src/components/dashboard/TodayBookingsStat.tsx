"use client";

import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DemoData = [
  {
    turf: "Sunset Soccer Complex",
    bookerName: "Maria Rodriguez",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
    date: "21-01-2025",
  },
  {
    turf: "Victory Sports Field",
    bookerName: "James Chen",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    date: "21-01-2025",
  },
  {
    turf: "Central Park Ground",
    bookerName: "Sarah Thompson",
    startTime: "8:00 AM",
    endTime: "9:00 AM",
    date: "22-01-2025",
  },
  {
    turf: "Champions Turf",
    bookerName: "Ahmed Hassan",
    startTime: "7:30 PM",
    endTime: "8:30 PM",
    date: "22-01-2025",
  },
  {
    turf: "Elite Athletic Field",
    bookerName: "Emma Wilson",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    date: "23-01-2025",
  },
];

const TodayBookingsStat = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-bold">Upcoming Bookings</p>
        <span
          className="flex items-center gap-1 text-xs text-muted-foreground"
          onClick={() => router.push("/bookings/upcoming")}
        >
          See All
          <ChevronRightIcon className="size-5" />
        </span>
      </div>
      <div className="flex w-full flex-col gap-2">
        {DemoData.map((booking, index) => (
          <div
            key={index}
            className="flex w-full justify-between rounded-md bg-stone-50 p-2 px-3"
          >
            <div className="flex flex-col gap-1">
              <p className="font-brand text-xs font-semibold">
                {booking.bookerName}
              </p>
              <p className="text-2xs text-primary">{booking.turf}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-muted-foreground">
                {booking.startTime} - {booking.endTime}
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                {booking.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodayBookingsStat;
