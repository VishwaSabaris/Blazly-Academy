import { courses } from "@/lib/courses";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Primitives";
import Link from "next/link";

export function CourseHero({ slug }: { slug: string }) {
  const course = courses.find((c) => c.slug === slug) || courses[0];

  return (
    <div className={`bg-linear-to-br ${course.gradient} text-white py-16 px-6 md:px-12`}>
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          {course.level}
        </div>
        <h1 className="mb-4 font-display text-[32px] md:text-[44px] font-bold tracking-tight">
          {course.title}
        </h1>
        <p className="mb-8 text-[16px] md:text-[18px] text-white/80 max-w-2xl">
          {course.description}. Learn from industry experts and get certified to prove your skills.
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-10 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Star className="text-gold" size={18} fill="currentColor" />
            <span>{course.rating} ({course.students} ratings)</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>{course.modules} Modules</span>
          </div>
        </div>

        <Link href={`/courses/${slug}/learn`}>
          <Button variant="gold" className="px-8 py-3.5 text-[16px]">
            Start Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
