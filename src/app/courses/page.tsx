"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { CourseFilters, SortKey } from "@/components/courses/CourseFilters";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses, Category, Level } from "@/lib/courses";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [level, setLevel] = useState<Level | "All">("All");
  const [sort, setSort] = useState<SortKey>("Popular");

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesSearch =
        search.trim() === "" ||
        c.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      const matchesLevel = level === "All" || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    list = [...list].sort((a, b) => {
      if (sort === "Latest") return a.publishedDaysAgo - b.publishedDaysAgo;
      if (sort === "Rating") return b.rating - a.rating;
      return b.students - a.students; // Popular
    });

    return list;
  }, [search, category, level, sort]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1180px] px-8 py-14 sm:px-5">
        <div className="mb-9">
          <h1 className="mb-2 font-display text-[32px] font-semibold tracking-tight">
            All courses
          </h1>
          <p className="text-[15px] text-ink-soft">
            {filtered.length} of {courses.length} courses
          </p>
        </div>

        <CourseFilters
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          level={level}
          onLevel={setLevel}
          sort={sort}
          onSort={setSort}
        />

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="mb-1 font-display text-[18px] font-semibold">
              No courses match those filters
            </p>
            <p className="text-[14px] text-muted">
              Try clearing the search or picking a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
