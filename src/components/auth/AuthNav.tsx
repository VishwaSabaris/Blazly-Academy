"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { UserButton } from "./UserButton";
import { Button } from "@/components/ui/Primitives";

export function AuthNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-line/60" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Dashboard
          </Button>
        </Link>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login">
        <Button variant="ghost">Log in</Button>
      </Link>
      <Link href="/signup">
        <Button variant="primary">Sign up</Button>
      </Link>
    </div>
  );
}
