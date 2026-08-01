import { courses } from "@/lib/courses";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search } from "lucide-react";

export default function MyCoursesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
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
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-[14px] outline-none placeholder:text-muted focus:border-emerald transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div 
            key={course.slug} 
            className="reveal is-visible"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </main>
  );
}
