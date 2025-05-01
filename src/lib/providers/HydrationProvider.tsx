"use client";

import React, { useEffect, useState } from "react";


const HydrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if(!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationProvider;
