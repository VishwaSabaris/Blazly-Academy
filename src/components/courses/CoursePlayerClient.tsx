"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle, CheckCircle, Lock, Loader2 } from "lucide-react";
import { Module, Lesson } from "@prisma/client";

// Define a type for a module that includes its lessons
export type ModuleWithLessons = Module & { lessons: Lesson[] };

interface CoursePlayerClientProps {
  courseSlug: string;
  courseTitle: string;
  courseDescription: string;
  isEnrolled: boolean;
  modules: ModuleWithLessons[];
}

export function CoursePlayerClient({
  courseSlug,
  courseTitle,
  courseDescription,
  isEnrolled,
  modules,
}: CoursePlayerClientProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    modules[0]?.lessons[0] || null
  );

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      const response = await fetch(`/api/courses/${courseSlug}/enroll`, {
        method: "POST",
      });
      if (response.ok) {
        router.refresh(); // Refresh the page to reflect enrollment status
      } else {
        alert("Failed to enroll");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-70px)] bg-paper">
      {/* LEFT: Video Player & Info */}
      <div className="flex-1 flex flex-col border-r border-line">
        <div className="w-full bg-black aspect-video relative flex items-center justify-center">
          {isEnrolled || activeLesson?.isFreePreview ? (
            activeLesson?.videoUrl ? (
              <iframe
                src={activeLesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-white/70">Video coming soon</div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-white/70 p-6 text-center">
              <Lock size={48} className="mb-4 text-white/40" />
              <h3 className="text-2xl font-display font-semibold mb-2">Enroll to unlock this lesson</h3>
              <p className="text-sm max-w-md">You need to be enrolled in the course to view this content.</p>
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-10 flex-1">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
            {activeLesson?.title || courseTitle}
          </h1>
          <p className="text-muted text-[15px] mb-8">{courseDescription}</p>

          {!isEnrolled && (
            <div className="bg-emerald/10 border border-emerald/20 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-ink mb-1">Start learning today</h4>
                <p className="text-[14px] text-muted">Get full access to all modules and lessons.</p>
              </div>
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="bg-emerald text-white px-6 py-2.5 rounded-full font-semibold text-[14px] hover:bg-emerald-deep transition-colors shadow-sm disabled:opacity-70 flex items-center"
              >
                {isEnrolling && <Loader2 size={16} className="animate-spin mr-2" />}
                Enroll for Free
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Module Syllabus */}
      <div className="w-full lg:w-[400px] xl:w-[450px] bg-paper-raised flex flex-col h-full lg:h-[calc(100vh-70px)] overflow-y-auto">
        <div className="p-6 border-b border-line sticky top-0 bg-paper-raised z-10">
          <h3 className="font-semibold text-ink text-[16px]">Course Content</h3>
        </div>
        <div className="p-4 space-y-4">
          {modules.map((module, mIndex) => (
            <div key={module.id} className="mb-4">
              <h4 className="text-[13px] font-bold tracking-wider text-ink/60 uppercase mb-2 ml-2">
                Module {mIndex + 1}: {module.title}
              </h4>
              <div className="space-y-1">
                {module.lessons.map((lesson, lIndex) => {
                  const isActive = activeLesson?.id === lesson.id;
                  const canView = isEnrolled || lesson.isFreePreview;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left flex items-start p-3 rounded-xl transition-colors ${
                        isActive 
                          ? "bg-emerald/10 border border-emerald/20 shadow-sm" 
                          : "hover:bg-line/50 border border-transparent"
                      }`}
                    >
                      <div className="mt-0.5 mr-3 flex-shrink-0">
                        {canView ? (
                          <PlayCircle size={18} className={isActive ? "text-emerald" : "text-muted"} />
                        ) : (
                          <Lock size={18} className="text-muted/50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[14px] font-medium leading-snug mb-1 ${isActive ? "text-emerald-deep" : "text-ink"}`}>
                          {lIndex + 1}. {lesson.title}
                        </p>
                        <div className="flex items-center text-[12px] text-muted">
                          <span>{lesson.duration || "N/A"}</span>
                          {lesson.isFreePreview && !isEnrolled && (
                            <span className="ml-2 bg-emerald/20 text-emerald-deep px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                              Preview
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
