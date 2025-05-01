"use client";

import MenuPage from "@/components/app-ui/MenuPage";
import DailyBookingStat from "@/components/bookings/DailyBookingStat";
import PreviousBookingsStat from "@/components/bookings/PreviousBookingsStat";
import WeekBookingStat from "@/components/bookings/WeekBookingStat";
import TodayBookingsStat from "@/components/dashboard/TodayBookingsStat";

const BookingsPage = () => {
  return (
    <MenuPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-4 p-6">
        <div className="flex w-full flex-col">
          <h1 className="font-brand text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-primary">Everything related to bookings</p>
        </div>
        <DailyBookingStat />
        <WeekBookingStat />
        <TodayBookingsStat />
        <PreviousBookingsStat />
      </div>
    </MenuPage>
  );
};
export default BookingsPage;
