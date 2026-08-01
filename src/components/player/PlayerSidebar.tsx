import { Module, Lesson } from "@/lib/courseData";
import { CheckCircle2, PlayCircle, FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";

export function PlayerSidebar({
  courseTitle,
  courseSlug,
  curriculum,
  activeLessonId,
  completedLessonIds,
  onLessonSelect,
}: {
  courseTitle: string;
  courseSlug: string;
  curriculum: Module[];
  activeLessonId: string;
  completedLessonIds: string[];
  onLessonSelect: (id: string) => void;
}) {
  const totalLessons = curriculum.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progress = Math.round((completedLessonIds.length / totalLessons) * 100) || 0;

  return (
    <div className="w-[320px] shrink-0 border-r border-line bg-paper-raised flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-line shrink-0">
        <Link href={`/courses/${courseSlug}`} className="text-sm font-semibold text-muted hover:text-ink flex items-center gap-1 mb-4">
          <ChevronLeft size={16} /> Back to Course
        </Link>
        <h2 className="font-display text-lg font-bold tracking-tight mb-3">{courseTitle}</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
            <div className="h-full bg-emerald transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-semibold text-emerald-deep">{progress}%</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {curriculum.map((module) => (
          <div key={module.id}>
            <h3 className="text-[13.5px] font-bold text-ink-soft mb-2 px-2 uppercase tracking-wider">{module.title}</h3>
            <div className="flex flex-col gap-1">
              {module.lessons.map((lesson) => {
                const isActive = activeLessonId === lesson.id;
                const isCompleted = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      isActive ? "bg-emerald/10 text-emerald-deep" : "hover:bg-ink/[0.04] text-ink"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={16} className="text-emerald" fill="currentColor" />
                      ) : lesson.type === "video" ? (
                        <PlayCircle size={16} className={isActive ? "text-emerald-deep" : "text-muted"} />
                      ) : (
                        <FileText size={16} className={isActive ? "text-emerald-deep" : "text-muted"} />
                      )}
                    </div>
                    <div>
                      <p className={`text-[14px] font-medium leading-tight ${isActive ? "" : "text-ink-soft"}`}>{lesson.title}</p>
                      <p className="text-[12px] text-muted mt-1">{lesson.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
