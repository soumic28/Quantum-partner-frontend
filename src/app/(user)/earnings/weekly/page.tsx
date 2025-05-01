"use client";

import StackPage from "@/components/app-ui/StackPage";

const DemoData = [
  {
    weekNumber: "3",
    startDate: "12 Jan",
    endDate: "18 Jan",
    earnings: "13400",
  },
  {
    weekNumber: "2",
    startDate: "5 Jan",
    endDate: "11 Jan",
    earnings: "14200",
  },
  {
    weekNumber: "1",
    startDate: "29 Dec",
    endDate: "4 Jan",
    earnings: "12500",
  },
  {
    weekNumber: "52",
    startDate: "22 Dec",
    endDate: "28 Dec",
    earnings: "15800",
  },
  {
    weekNumber: "51",
    startDate: "15 Dec",
    endDate: "21 Dec",
    earnings: "13900",
  },
];

const WeeklyEarnings = () => {
  return (
    <StackPage title="All Weekly Earnings" containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col gap-2">
          {DemoData.map((week, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between rounded-md bg-stone-50 p-4"
            >
              <div className="flex flex-col gap-1">
                <p className="font-brand text-xs font-semibold">
                  Week {week.weekNumber}
                </p>
                <p className="text-2xs text-primary">
                  {week.startDate} - {week.endDate}
                </p>
              </div>
              <p className="font-bold">$ {week.earnings}</p>
            </div>
          ))}
        </div>
      </div>
    </StackPage>
  );
};
export default WeeklyEarnings;
