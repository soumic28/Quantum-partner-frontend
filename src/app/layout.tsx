import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import HydrationProvider from "@/lib/providers/HydrationProvider";
import AppQueryClientProvider from "@/lib/providers/QueryClientProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quantum Partner",
  description: "Infinite Possibilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} h-full min-h-dvh w-full scroll-smooth font-primary antialiased`}
      >
        <HydrationProvider>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
