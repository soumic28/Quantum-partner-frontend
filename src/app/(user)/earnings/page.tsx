"use client";

import MenuPage from "@/components/app-ui/MenuPage";
import DailyEarningsStat from "@/components/dashboard/DailyEarningsStat";
import WeeklyEarningsStat from "@/components/dashboard/WeeklyEarningsStat";

const EarningsPage = () => {
  return (
    <MenuPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col">
          <h1 className="font-brand text-2xl font-bold">Earnings</h1>
          <p className="text-sm text-primary">
            Everything related to your earnings
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
          <p className="text-xs uppercase text-muted-foreground">
            Earnings Today
          </p>
          <p className="font-brand text-4xl font-bold">$1400</p>
          <p className="text-xs uppercase text-muted-foreground">
            Across all Turfs
          </p>
        </div>

        <DailyEarningsStat />

        <WeeklyEarningsStat />
      </div>
    </MenuPage>
  );
};
export default EarningsPage;
