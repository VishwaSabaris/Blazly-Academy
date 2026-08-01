"use client";

import { Search } from "lucide-react";
import { Category, Level } from "@/lib/courses";

const categories: Category[] = [];
const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];
const sorts = ["Latest", "Popular", "Rating"] as const;
export type SortKey = (typeof sorts)[number];

export function CourseFilters({
  search,
  onSearch,
  category,
  onCategory,
  level,
  onLevel,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (v: string) => void;
  category: Category | "All";
  onCategory: (v: Category | "All") => void;
  level: Level | "All";
  onLevel: (v: Level | "All") => void;
  sort: SortKey;
  onSort: (v: SortKey) => void;
}) {
  return (
    <div className="mb-9 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-[340px] flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search courses or instructors..."
            className="w-full rounded-lg border border-line bg-paper-raised py-2.5 pl-9 pr-3 text-[13.5px] outline-none placeholder:text-muted focus:border-emerald"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none focus:border-emerald"
        >
          {sorts.map((s) => (
            <option key={s} value={s}>
              Sort: {s}
            </option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => onLevel(e.target.value as Level | "All")}
          className="rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-[13.5px] text-ink-soft outline-none focus:border-emerald"
        >
          <option value="All">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategory("All")}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            category === "All"
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink-soft hover:text-ink"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategory(c)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              category === c
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
