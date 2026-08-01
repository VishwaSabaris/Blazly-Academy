"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/auth/Field";
import { GoogleButton, OrDivider } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Primitives";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to auth backend + send email verification
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <AuthShell
      panelEyebrow="Join 200+ learners"
      panelTitle="Start with Professional GEO Certification."
      panelBody="Graded quizzes, downloadable resources, and a verifiable certificate — free to start, upgrade anytime."
    >
      <h1 className="mb-1.5 font-display text-[26px] font-semibold tracking-tight">
        Create your account
      </h1>
      <p className="mb-7 text-[14px] text-muted">
        Already have one?{" "}
        <a href="/login" className="font-semibold text-emerald-deep hover:underline">
          Log in
        </a>
      </p>

      <GoogleButton />
      <OrDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Full name" type="text" placeholder="Alex" required />
        <Field label="Email" type="email" placeholder="you@example.com" required />
        <Field label="Password" type="password" placeholder="At least 8 characters" required minLength={8} />

        <Button type="submit" variant="primary" className="mt-1 w-full py-3">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-7 text-[12px] leading-relaxed text-muted">
        By creating an account, you agree to Blazly Academy&apos;s{" "}
        <a href="/terms" className="underline hover:text-ink transition-colors">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-ink transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </AuthShell>
  );
}
