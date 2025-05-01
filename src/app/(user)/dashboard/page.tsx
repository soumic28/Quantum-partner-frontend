import MenuPage from "@/components/app-ui/MenuPage";
import TodayBookingsStat from "@/components/dashboard/TodayBookingsStat";
import WeekBalanceStat from "@/components/dashboard/WeekBalanceStat";
import WeeklyEarningsStat from "@/components/dashboard/WeeklyEarningsStat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Greeting } from "@/lib/functions/Greeting";

const DashboardPage = () => {
  const userGreetingText = Greeting();

  return (
    <MenuPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-4 p-4">
        {/* <div className="flex w-full items-center justify-center gap-4">
          <Avatar>
            <AvatarImage src="/doesnotexist" alt="@shadcn" />
            <AvatarFallback className="bg-primary font-brand text-white">
              KC
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col">
            <p className="font-brand text-xs font-medium text-muted-foreground">
              {userGreetingText}
            </p>
            <p className="font-brand font-bold leading-tight">Kurt Cobain</p>
          </div>
        </div> */}

        <WeekBalanceStat />

        <TodayBookingsStat />

        <WeeklyEarningsStat />
      </div>
    </MenuPage>
  );
};
export default DashboardPage;
