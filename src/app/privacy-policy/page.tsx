"use client";

import StackPage from "@/components/app-ui/StackPage";

const PrivacyPolicyPage = () => {
  return (
    <StackPage>
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col">
          <h1 className="font-brand text-2xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-primary">
            Make sure to read our privacy policy
          </p>
        </div>
      </div>
    </StackPage>
  );
};
export default PrivacyPolicyPage;
