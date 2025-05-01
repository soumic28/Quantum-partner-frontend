"use client";

import StackPage from "@/components/app-ui/StackPage";
import CreateTurfForm from "@/components/turfs/CreateTurfForm";

const NewTurfPage = () => {
  return (
    <StackPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-6 p-4">
        <div className="flex w-full flex-col gap-1">
          <p className="font-brand text-2xl font-bold">Add New Turf 🚀</p>
          <p className="text-sm text-primary">
            Fill in basic details about your turf
          </p>
        </div>
        <div className="w-full">
          <CreateTurfForm />
        </div>
      </div>
    </StackPage>
  );
};
export default NewTurfPage;
