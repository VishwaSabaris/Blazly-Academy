import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <SignUp routing="hash" fallbackRedirectUrl="/dashboard" signInUrl="/login" />
    </div>
  );
}
