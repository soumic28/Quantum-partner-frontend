import StackPage from "@/components/app-ui/StackPage";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <StackPage>
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full flex-col gap-1">
          <p className="font-brand text-2xl font-bold">Create account 🚀</p>
          <p className="text-sm text-muted-foreground">
            Get updates on your turf bookings, payments, and customer services
          </p>
        </div>
        <div className="w-full">
          <SignUpForm />
        </div>
      </div>
    </StackPage>
  );
};
export default SignUpPage;
