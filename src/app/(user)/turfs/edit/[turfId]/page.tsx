"use client";

import StackPage from "@/components/app-ui/StackPage";
import EditTurfForm from "@/components/turfs/EditTurfForm";

const NewTurfPage = () => {
  return (
    <StackPage containerClassName="bg-muted">
      <div className="flex w-full flex-col gap-6 p-4">
        <div className="flex w-full flex-col gap-1">
          <p className="font-brand text-2xl font-bold">Edit Turf</p>
          <p className="text-sm text-primary">Edit your turf details</p>
        </div>
        <div className="w-full">
          <EditTurfForm />
        </div>
      </div>
    </StackPage>
  );
};
export default NewTurfPage;
