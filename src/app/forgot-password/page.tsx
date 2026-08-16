"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/firebase";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/auth/Field";
import { Button } from "@/components/ui/Primitives";
import { AlertCircle, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      console.error("Password reset failed", err);
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      if (errMsg.includes("auth/user-not-found")) {
        setError("No account found with that email address.");
      } else if (errMsg.includes("auth/invalid-email")) {
        setError("Please enter a valid email address.");
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      panelEyebrow="Account recovery"
      panelTitle="Locked out happens to everyone."
      panelBody="We'll send a reset link to your inbox. It expires in 30 minutes for your account's security."
    >
      {sent ? (
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald-deep">
            <MailCheck size={22} />
          </div>
          <h1 className="mb-2 font-display text-[24px] font-semibold tracking-tight">
            Check your email
          </h1>
          <p className="mb-7 text-[14px] leading-relaxed text-muted">
            If an account exists for {email}, a password reset link is on its way.
          </p>
          <a href="/login" className="text-[13.5px] font-semibold text-emerald-deep hover:underline">
            ← Back to log in
          </a>
        </div>
      ) : (
        <>
          <h1 className="mb-1.5 font-display text-[26px] font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="mb-7 text-[14px] text-muted">
            Enter the email tied to your account and we&apos;ll send a reset link.
          </p>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs font-semibold text-red-500">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="primary" className="mt-1 w-full py-3">
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>

          <a
            href="/login"
            className="mt-7 inline-block text-[13.5px] font-semibold text-emerald-deep hover:underline"
          >
            ← Back to log in
          </a>
        </>
      )}
    </AuthShell>
  );
}
