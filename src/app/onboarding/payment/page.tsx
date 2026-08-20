import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PaymentContent } from "@/components/onboarding/PaymentContent";

export default function OnboardingPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-paper">
          <Loader2 className="h-10 w-10 animate-spin text-emerald" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
