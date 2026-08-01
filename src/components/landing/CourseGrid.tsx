import { Eyebrow, Button } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/lib/courses";

export function CourseGrid() {
  const featured = courses.slice(0, 6);
  return (
    <section id="courses" className="px-8 py-22 sm:px-5">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-13 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[600px]">
            <div className="mb-4">
              <Eyebrow>Curriculum</Eyebrow>
            </div>
            <h2 className="mb-3.5 font-display text-[clamp(28px,3vw,38px)] font-semibold tracking-tight">
              Courses built for the AI-native job market
            </h2>
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Every course ships with graded quizzes, downloadable resources, and a
              certificate you can put a QR code behind — not just a PDF.
            </p>
          </div>
          <a href="/courses">
            <Button variant="ghost">Browse all courses →</Button>
          </a>
        </Reveal>

        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {featured.map((c) => (
            <Reveal key={c.slug}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
