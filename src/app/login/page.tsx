"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginContent } from "@/components/auth/LoginContent";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-paper">
          <Loader2 className="animate-spin text-emerald w-10 h-10" />
        </div>
      }
    >
      <LoginContent defaultMode="login" />
    </Suspense>
  );
}
