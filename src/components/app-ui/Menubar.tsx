"use client";

import { cn } from "@/lib/utils";
import {
  BadgeIndianRupeeIcon,
  CalendarCheckIcon,
  CircleUserRoundIcon,
  HouseIcon,
  LandPlotIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <HouseIcon />,
  },
  {
    label: "Turfs",
    href: "/turfs",
    icon: <LandPlotIcon />,
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: <CalendarCheckIcon />,
  },
  {
    label: "Earnings",
    href: "/earnings",
    icon: <BadgeIndianRupeeIcon />,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: <CircleUserRoundIcon />,
  },
];

const Menubar = () => {
  const pathname = usePathname();

  return (
    <div className="z-50 flex w-full items-center justify-between gap-2 rounded-t-xl border border-b-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      {MenuItems.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <span
              className={cn(
                "size-6",
                isActive ? "text-rose-500" : "text-muted-foreground"
              )}
            >
              {item.icon}
            </span>
            <p
              className={cn(
                "text-xs",
                isActive ? "text-rose-600" : "text-muted-foreground"
              )}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default Menubar;
