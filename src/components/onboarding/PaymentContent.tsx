"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/ui/Primitives";
import { useAuth } from "@/components/auth/AuthProvider";

export function PaymentContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect_url=/onboarding/payment");
    }
  }, [loading, user, router]);

  const handleCheckout = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Unable to start checkout.");
      }

      if (data.url.startsWith("/")) {
        router.push(data.url);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout failed", err);
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="h-10 w-10 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-[520px] rounded-3xl border border-line bg-paper/80 p-8 shadow-lg backdrop-blur-md md:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 text-emerald-deep">
            <LogoMark />
          </div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-deep">
            Step 2 of 2
          </p>
          <h1 className="mt-2 font-display text-[28px] font-bold tracking-tight text-ink">
            Complete your enrollment
          </h1>
          <p className="mt-2 max-w-[380px] text-[14px] text-muted">
            Secure your spot in Blazly Academy with a one-time payment. Dashboard access unlocks immediately after payment.
          </p>
        </div>

        {canceled && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-gold/20 bg-gold/10 p-3.5 text-xs font-semibold text-gold">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>Payment was canceled. You can try again when you&apos;re ready.</span>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-500">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-line bg-paper-raised p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                Professional GEO Certification
              </p>
              <h2 className="mt-1 font-display text-[22px] font-bold text-ink">
                Blazly Academy Access
              </h2>
            </div>
            <CreditCard size={22} className="shrink-0 text-emerald-deep" />
          </div>

          <ul className="mb-5 space-y-2 text-[13px] text-ink-soft">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald" />
              Full course library and certification path
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald" />
              Graded quizzes and verifiable certificates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald" />
              Lifetime dashboard access
            </li>
          </ul>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="text-[14px] font-medium text-muted">Total due today</span>
            <span className="font-display text-[24px] font-bold text-ink">Paid at checkout</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-deep disabled:opacity-70"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
          {submitting ? "Redirecting to Stripe..." : "Proceed to secure payment"}
        </button>

        <p className="mt-4 text-center text-[12px] text-muted">
          Signed in as {user.email}. Payments are processed securely by Stripe.
        </p>
      </div>
    </div>
  );
}
