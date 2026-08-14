"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle, CheckCircle, Lock, Loader2, FileText, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Module, Lesson } from "@prisma/client";
import { QuizInterface } from "./QuizInterface";

// Define a type for a module that includes its lessons
export type ModuleWithLessons = Module & { lessons: Lesson[] };

export type PlayableItem = {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  type: "video" | "quiz";
  videoUrl?: string | null;
  isFreePreview?: boolean;
};

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Video and Quiz completion tracking states
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>({});
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedVideos = localStorage.getItem(`blazly_videos_${courseSlug}`);
    if (savedVideos) {
      setCompletedVideos(JSON.parse(savedVideos));
    }
    const savedQuizzes = localStorage.getItem(`blazly_quizzes_${courseSlug}`);
    if (savedQuizzes) {
      setCompletedQuizzes(JSON.parse(savedQuizzes));
    }
  }, [courseSlug]);

  const handleVideoEnded = (moduleId: string) => {
    const updated = { ...completedVideos, [moduleId]: true };
    setCompletedVideos(updated);
    localStorage.setItem(`blazly_videos_${courseSlug}`, JSON.stringify(updated));
  };

  const handleQuizComplete = (moduleId: string) => {
    const updated = { ...completedQuizzes, [moduleId]: true };
    setCompletedQuizzes(updated);
    localStorage.setItem(`blazly_quizzes_${courseSlug}`, JSON.stringify(updated));
  };

  const getModuleProgress = (moduleId: string) => {
    let progress = 0;
    if (completedVideos[moduleId]) progress += 50;
    if (completedQuizzes[moduleId]) progress += 50;
    return progress;
  };

  const totalItems = modules.length * 2;
  const completedItemsCount = modules.reduce((acc, m) => {
    let count = 0;
    if (completedVideos[m.id]) count++;
    if (completedQuizzes[m.id]) count++;
    return acc + count;
  }, 0);
  const overallProgress = totalItems > 0 ? Math.round((completedItemsCount / totalItems) * 100) : 0;
  
  // Set first item as default active item
  const [activeItem, setActiveItem] = useState<PlayableItem | null>(() => {
    const firstLesson = modules[0]?.lessons[0];
    if (!firstLesson) return null;
    return {
      id: firstLesson.id,
      moduleId: firstLesson.moduleId,
      title: "Video Lecture",
      duration: firstLesson.duration || "4:00",
      type: "video",
      videoUrl: firstLesson.videoUrl,
      isFreePreview: firstLesson.isFreePreview,
    };
  });

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
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-70px)] bg-paper relative">
      {/* LEFT: Module Syllabus */}
      {isSidebarOpen && (
        <div className="w-full lg:w-[350px] xl:w-[400px] bg-paper-raised flex flex-col h-full lg:h-[calc(100vh-70px)] overflow-y-auto border-r border-line shrink-0">
        <div className="p-6 border-b border-line sticky top-0 bg-paper-raised z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ink text-[16px]">Course Content</h3>
            <span className="text-xs font-bold text-emerald-deep">{overallProgress}% Complete</span>
          </div>
          <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald transition-all duration-300" 
              style={{ width: `${overallProgress}%` }} 
            />
          </div>
        </div>
        <div className="p-4 space-y-4">
          {modules.map((module, mIndex) => {
            const videoLesson = module.lessons[0]; // Assume first lesson is the video
            const isVideoCompleted = completedVideos[module.id] || false;
            const isQuizCompleted = completedQuizzes[module.id] || false;
            const moduleProgress = getModuleProgress(module.id);
            
            const videoItem: PlayableItem | null = videoLesson ? {
              id: videoLesson.id,
              moduleId: module.id,
              title: "Video Lecture",
              duration: videoLesson.duration || "N/A",
              type: "video",
              videoUrl: videoLesson.videoUrl,
              isFreePreview: videoLesson.isFreePreview,
            } : null;

            const quizItem: PlayableItem = {
              id: `${module.id}_quiz`,
              moduleId: module.id,
              title: "Module Quiz",
              duration: "3:00",
              type: "quiz",
              isFreePreview: videoLesson?.isFreePreview || false,
            };

            return (
              <div key={module.id} className="mb-4">
                <div className="flex flex-col mb-3 ml-2">
                  <h4 className="text-[13px] font-bold tracking-wider text-ink/80 uppercase">
                    Module {mIndex + 1}: {module.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1 pr-2">
                    <div className="w-[120px] h-1 bg-line rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald transition-all duration-300" 
                        style={{ width: `${moduleProgress}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-deep">
                      {moduleProgress}%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {/* Video Lesson */}
                  {videoItem && (() => {
                    const isActive = activeItem?.id === videoItem.id && activeItem?.type === "video";
                    const canView = isEnrolled || videoItem.isFreePreview;
                    return (
                      <button
                        onClick={() => setActiveItem(videoItem)}
                        className={`w-full text-left flex items-start p-3 rounded-xl transition-colors ${
                          isActive 
                            ? "bg-emerald/10 border border-emerald/20 shadow-sm" 
                            : "hover:bg-line/50 border border-transparent"
                        }`}
                      >
                        <div className="mt-0.5 mr-3 flex-shrink-0">
                          {isVideoCompleted ? (
                            <CheckCircle2 size={18} className="text-emerald fill-emerald/10" />
                          ) : canView ? (
                            <PlayCircle size={18} className={isActive ? "text-emerald" : "text-muted"} />
                          ) : (
                            <Lock size={18} className="text-muted/50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[14px] font-medium leading-snug mb-0.5 ${isActive ? "text-emerald-deep" : "text-ink"}`}>
                            {videoItem.title}
                          </p>
                          <div className="flex items-center text-[12px] text-muted">
                            <span>{videoItem.duration}</span>
                            {videoItem.isFreePreview && !isEnrolled && (
                              <span className="ml-2 bg-emerald/25 text-emerald-deep px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                                Preview
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })()}

                  {/* Quiz Lesson */}
                  {(() => {
                    const isActive = activeItem?.id === quizItem.id && activeItem?.type === "quiz";
                    const canView = isEnrolled || quizItem.isFreePreview;
                    return (
                      <button
                        onClick={() => setActiveItem(quizItem)}
                        className={`w-full text-left flex items-start p-3 rounded-xl transition-colors ${
                          isActive 
                            ? "bg-emerald/10 border border-emerald/20 shadow-sm" 
                            : "hover:bg-line/50 border border-transparent"
                        }`}
                      >
                        <div className="mt-0.5 mr-3 flex-shrink-0">
                          {isQuizCompleted ? (
                            <CheckCircle2 size={18} className="text-emerald fill-emerald/10" />
                          ) : canView ? (
                            <FileText size={18} className={isActive ? "text-emerald" : "text-muted"} />
                          ) : (
                            <Lock size={18} className="text-muted/50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[14px] font-medium leading-snug mb-0.5 ${isActive ? "text-emerald-deep" : "text-ink"}`}>
                            {quizItem.title}
                          </p>
                          <div className="flex items-center text-[12px] text-muted">
                            <span>{quizItem.duration}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* RIGHT: Video Player / Quiz Area & Info */}
      <div className="flex-1 flex flex-col border-l border-line overflow-y-auto relative">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`hidden lg:flex absolute top-[20%] z-40 bg-paper border border-line rounded-lg w-8 h-10 items-center justify-center text-ink-soft hover:text-ink shadow-md transition-all hover:bg-emerald/10 hover:border-emerald ${
            isSidebarOpen ? "left-0 -translate-x-1/2" : "left-0"
          }`}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        <div className="w-full bg-black aspect-video relative flex items-center justify-center">
          {isEnrolled || activeItem?.isFreePreview ? (
            activeItem?.type === "video" ? (
              activeItem.videoUrl ? (
                activeItem.videoUrl.includes("youtube.com") || activeItem.videoUrl.includes("embed") ? (
                  <iframe
                    src={activeItem.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeItem.videoUrl}
                    controls
                    onEnded={() => handleVideoEnded(activeItem.moduleId)}
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <div className="text-white/70">Video coming soon</div>
              )
            ) : (
              <div className="w-full h-full bg-paper-raised overflow-y-auto p-4 flex items-center justify-center">
                {activeItem && (
                  <QuizInterface 
                    quizId={activeItem.id} 
                    onComplete={() => handleQuizComplete(activeItem.moduleId)} 
                  />
                )}
              </div>
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
            {activeItem?.type === "video" ? (activeItem?.title || courseTitle) : `${activeItem?.title} - Module Quiz`}
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
    </div>
  );
}
