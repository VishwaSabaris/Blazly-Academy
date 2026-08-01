"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Trophy,
  User,
  Settings,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Primitives";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[248px] shrink-0 border-r border-line bg-paper-raised px-5 py-6 md:flex md:flex-col">
      <div className="mb-9 flex items-center gap-2.5 px-2 font-display text-[18px] font-bold tracking-tight">
        <LogoMark />
        Blazly Academy
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                isActive
                  ? "bg-emerald/10 text-emerald-deep"
                  : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
              }`}
            >
              <item.icon size={17} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-line bg-paper p-4">
        <p className="mb-3 text-[12.5px] leading-snug text-ink-soft">
          You&apos;re on a 6-day streak. One more lesson keeps it alive.
        </p>
        <a
          href="#"
          className="text-[12.5px] font-semibold text-emerald-deep hover:underline"
        >
          Resume learning →
        </a>
      </div>
    </aside>
  );
}
