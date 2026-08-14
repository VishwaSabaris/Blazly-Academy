"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  const name = user.displayName || user.name || "Student";
  const email = user.email || "";
  const photo = user.photoURL || user.picture || "";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-9 w-9 overflow-hidden rounded-full border border-line bg-paper-raised focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-offset-2 transition-all shadow-sm hover:scale-105"
      >
        {photo ? (
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-emerald text-white text-[13px] font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-60 origin-top-right rounded-2xl border border-line bg-paper p-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          {/* User Info Header */}
          <div className="flex items-center gap-3 border-b border-line px-3.5 py-3 mb-2">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-line shrink-0">
              {photo ? (
                <img src={photo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-emerald text-white text-[13px] font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-ink truncate leading-snug">{name}</p>
              <p className="text-[12px] text-muted truncate leading-tight mt-0.5">{email}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <a
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-line/40 hover:text-ink transition-colors"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
