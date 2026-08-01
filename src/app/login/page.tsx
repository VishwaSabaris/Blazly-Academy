"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/auth/Field";
import { GoogleButton, OrDivider } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Primitives";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up to auth backend (JWT / refresh token flow)
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <AuthShell
      panelEyebrow="Welcome back"
      panelTitle="Pick up right where you left off."
      panelBody="Module progress, quiz history, and certificates are all saved to your account and sync across devices."
    >
      <h1 className="mb-1.5 font-display text-[26px] font-semibold tracking-tight">
        Log in
      </h1>
      <p className="mb-7 text-[14px] text-muted">
        New to Blazly?{" "}
        <a href="/signup" className="font-semibold text-emerald-deep hover:underline">
          Create an account
        </a>
      </p>

      <GoogleButton />
      <OrDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Email" type="email" placeholder="you@example.com" required />
        <div>
          <Field label="Password" type="password" placeholder="••••••••" required />
          <a
            href="/forgot-password"
            className="mt-2 inline-block text-[13px] font-semibold text-emerald-deep hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Button type="submit" variant="primary" className="mt-1 w-full py-3">
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-7 text-[12px] leading-relaxed text-muted">
        By continuing, you agree to Blazly Academy&apos;s{" "}
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
