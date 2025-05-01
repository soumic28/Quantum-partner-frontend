"use client";

const WeekBalanceStat = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-primary p-4">
      <p className="text-xs uppercase text-white/50">Earnings</p>
      <p className="font-brand text-4xl font-bold text-white">$11,800</p>
      <p className="text-xs uppercase text-white/50">
        This week across all Turfs
      </p>
    </div>
  );
};
export default WeekBalanceStat;
