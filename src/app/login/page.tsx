"use client";

import { useState, Suspense } from "react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";
import { LogoMark } from "@/components/ui/Primitives";

type AuthMode = "login" | "signup";

function LoginContent() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      setError("Please fill out all required fields.");
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      console.error("Authentication failed", err);
      // Clean up firebase error codes
      const errMsg = err?.message || "An unexpected error occurred.";
      if (errMsg.includes("auth/invalid-credential")) {
        setError("Invalid email or password.");
      } else if (errMsg.includes("auth/email-already-in-use")) {
        setError("This email address is already in use.");
      } else if (errMsg.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters.");
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      console.error("Google sign-in failed", err);
      setError(err?.message || "Google sign-in was unsuccessful.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-paper to-gold/5 pointer-events-none" />

      <div className="w-full max-w-[440px] rounded-3xl border border-line bg-paper/60 backdrop-blur-md p-8 md:p-10 shadow-lg relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center gap-2.5 text-center mb-6">
          <div className="scale-110 text-emerald-deep">
            <LogoMark />
          </div>
          <h2 className="font-display text-[22px] font-bold tracking-tight text-ink">
            Blazly Academy
          </h2>
          <p className="text-[13px] text-muted max-w-[280px]">
            Access professional Generative Engine Optimization certifications.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-line mb-6">
          <button
            onClick={() => { setMode("login"); setError(null); }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              mode === "login"
                ? "border-emerald text-emerald-deep"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode("signup"); setError(null); }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              mode === "signup"
                ? "border-emerald text-emerald-deep"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold p-3.5 rounded-xl mb-5">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Details */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-paper/80 py-3 pl-10 pr-3.5 text-sm outline-none placeholder:text-muted focus:border-emerald transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-line bg-paper/80 py-3 pl-10 pr-3.5 text-sm outline-none placeholder:text-muted focus:border-emerald transition-colors"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-line bg-paper/80 py-3 pl-10 pr-3.5 text-sm outline-none placeholder:text-muted focus:border-emerald transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-emerald hover:bg-emerald-deep text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-1"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            <span>{mode === "login" ? "Log In" : "Create Account"}</span>
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <span className="relative bg-paper px-3 text-[12px] font-semibold text-muted tracking-wider uppercase">
            Or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-paper border border-line hover:border-ink/20 hover:bg-line/20 text-ink py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-1"
        >
          {googleLoading ? (
            <Loader2 className="animate-spin text-muted" size={16} />
          ) : (
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.7 0 3.25.69 4.39 1.8l3.1-3.1C19.16 2.65 15.93 1.5 12.24 1.5 6.3 1.5 1.5 6.3 1.5 12.24s4.8 10.74 10.74 10.74c5.96 0 10.4-4.2 10.4-10.59 0-.69-.08-1.21-.2-2.11H12.24z"
              />
            </svg>
          )}
          <span>Google</span>
        </button>

        {/* Mode Toggle Footer */}
        <p className="text-center text-[13px] text-muted mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => { setMode("signup"); setError(null); }}
                className="text-emerald hover:text-emerald-deep font-bold transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(null); }}
                className="text-emerald hover:text-emerald-deep font-bold transition-colors"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="animate-spin text-emerald w-10 h-10" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
