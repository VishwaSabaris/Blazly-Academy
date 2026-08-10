"use client";

import { useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search } from "lucide-react";
// Import the frontend static type
import { Course as MockCourse } from "@/lib/courses";
import { courses as mockCourses } from "@/lib/courses";

// Define the type that merges DB data with Frontend visuals
type DBCourse = {
  slug: string;
  title: string;
  description: string;
  price: number;
};

// Merge function (in a real app, you'd store imageUrl and gradients in the DB)
function mergeDBWithMock(dbCourse: DBCourse): MockCourse {
  // Find matching static visuals, or provide defaults
  const staticData = mockCourses.find((c: MockCourse) => c.slug === dbCourse.slug);
  
  return {
    slug: dbCourse.slug,
    title: dbCourse.title,
    description: dbCourse.description,
    tag: staticData?.tag || "Course",
    category: staticData?.category || "All",
    level: staticData?.level || "Beginner",
    audience: staticData?.audience || "Everyone",
    modules: staticData?.modules || 5,
    duration: staticData?.duration || "1 hr",
    rating: staticData?.rating || 5.0,
    students: staticData?.students || 0,
    publishedDaysAgo: staticData?.publishedDaysAgo || 1,
    gradient: staticData?.gradient || "from-emerald to-emerald-deep",
    imageUrl: staticData?.imageUrl,
    badge: staticData?.badge,
  };
}

export function CourseSearchFilter({ dbCourses }: { dbCourses: DBCourse[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Map DB courses to have full visual properties
  const fullCourses = dbCourses.map(mergeDBWithMock);

  const filteredCourses = fullCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.tag.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
            Course Catalog
          </h1>
          <p className="text-[15px] text-muted max-w-xl">
            Explore our curriculum and enroll in new certifications. Click on any course to view details and start learning.
          </p>
        </div>
        
        <div className="relative w-full max-w-[300px]">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search all courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-[14px] outline-none placeholder:text-muted focus:border-emerald transition-colors shadow-sm"
          />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.slug} 
              className="reveal is-visible"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
          <Search size={40} className="mb-4 text-line" />
          <h3 className="mb-2 font-display text-[20px] font-bold text-ink">No courses found</h3>
          <p className="text-[14px] text-muted">We couldn't find any courses matching "{searchQuery}".</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-6 text-[14px] font-semibold text-emerald-deep hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
