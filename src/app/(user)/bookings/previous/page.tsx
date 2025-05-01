"use client";

import { getPreviousBookings } from "@/api/bookings";
import StackPage from "@/components/app-ui/StackPage";
import { useEffect, useState } from "react";

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

const PreviousBookings = () => {

  const [prevBookings, setPrevBookings] = useState([]);

  useEffect(() => {
    // fetch previous bookings
    getPreviousBookings()
      .then((data) => {
        setPrevBookings(data);
      }
      )
      .catch((error) => {
        console.log(error);
      }
      );
  }, []);

  return (
    <StackPage title="All Previous Bookings" containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col gap-2">
          {DemoData.map((booking, index) => (
            <div
              key={index}
              className="flex w-full justify-between rounded-md bg-stone-50 p-4"
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
    </StackPage>
  );
};
export default PreviousBookings;
