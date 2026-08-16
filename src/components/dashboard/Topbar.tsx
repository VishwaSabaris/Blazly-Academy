import { Search, Bell } from "lucide-react";
import { UserButton } from "@/components/auth/UserButton";

export function Topbar() {
  return (
    <div className="flex items-center justify-between border-b border-line bg-paper-raised px-6 py-4 md:px-9">
      <div className="relative hidden max-w-[340px] flex-1 sm:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search courses, lessons..."
          className="w-full rounded-lg border border-line bg-paper py-2 pl-9 pr-3 text-[13.5px] outline-none placeholder:text-muted focus:border-emerald"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:text-ink">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
        </button>
        <UserButton />
      </div>
    </div>
  );
}
