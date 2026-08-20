"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { LogoMark } from "@/components/ui/Primitives";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing payment session. Please contact support if you were charged.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/stripe/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Payment verification failed.");
        }

        router.replace(data.redirectUrl || "/dashboard");
        router.refresh();
      } catch (err) {
        console.error("Payment verification failed", err);
        setError(err instanceof Error ? err.message : "Payment verification failed.");
      }
    };

    void verifyPayment();
  }, [sessionId, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="w-full max-w-[440px] rounded-3xl border border-line bg-paper p-8 text-center shadow-lg">
          <AlertCircle size={40} className="mx-auto mb-4 text-red-500" />
          <h1 className="mb-2 font-display text-[24px] font-bold text-ink">Verification issue</h1>
          <p className="mb-6 text-[14px] text-muted">{error}</p>
          <a
            href="/onboarding/payment"
            className="inline-flex rounded-xl bg-emerald px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            Back to payment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-[440px] rounded-3xl border border-line bg-paper p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center text-emerald-deep">
          <LogoMark />
        </div>
        <CheckCircle2 size={44} className="mx-auto mb-4 text-emerald" />
        <h1 className="mb-2 font-display text-[24px] font-bold text-ink">Payment successful</h1>
        <p className="mb-6 text-[14px] text-muted">
          Saving your payment details and unlocking your dashboard...
        </p>
        <Loader2 size={28} className="mx-auto animate-spin text-emerald" />
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-paper">
          <Loader2 className="h-10 w-10 animate-spin text-emerald" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
