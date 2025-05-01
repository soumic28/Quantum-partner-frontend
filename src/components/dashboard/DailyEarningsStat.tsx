"use client";

const DemoData = [
  {
    date: "Today",
    day: "Monday",
    earnings: "1400",
  },
  {
    date: "Yesterday",
    day: "Sunday",
    earnings: "1200",
  },
  {
    date: "18-01-2025",
    day: "Saturday",
    earnings: "1000",
  },
  {
    date: "17-01-2025",
    day: "Friday",
    earnings: "1300",
  },
  {
    date: "16-01-2025",
    day: "Thursday",
    earnings: "1100",
  },
  {
    date: "15-01-2025",
    day: "Wednesday",
    earnings: "1400",
  },
  {
    date: "14-01-2025",
    day: "Tuesday",
    earnings: "1200",
  },
];

const DailyEarningsStat = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-bold">Past Week</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        {DemoData.map((day, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between rounded-md bg-stone-50 p-2 px-3"
          >
            <div className="flex flex-col gap-1">
              <p className="font-brand text-xs font-semibold">{day.day}</p>
              <p className="text-2xs text-primary">{day.date}</p>
            </div>
            <p className="font-bold">$ {day.earnings}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DailyEarningsStat;
