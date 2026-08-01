"use client";

import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/auth/Field";
import { Button } from "@/components/ui/Primitives";
import { MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to auth backend password-reset email flow
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 500);
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
            If an account exists for that address, a password reset link is on
            its way.
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
            Enter the email tied to your account and we&apos;ll send a reset
            link.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Email" type="email" placeholder="you@example.com" required />
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
