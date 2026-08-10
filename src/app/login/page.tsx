import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <SignIn routing="hash" fallbackRedirectUrl="/dashboard" signUpUrl="/signup" />
    </div>
  );
}
