"use client";

import StackPage from "@/components/app-ui/StackPage";

const HelpPage = () => {
  return (
    <StackPage>
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col">
          <h1 className="font-brand text-2xl font-bold">Help Center</h1>
          <p className="text-sm text-primary">Get help and support</p>
        </div>
      </div>
    </StackPage>
  );
};
export default HelpPage;
