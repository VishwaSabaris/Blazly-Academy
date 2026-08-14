"use client";

import { useState, useMemo, use } from "react";
import { getCurriculumForCourse } from "@/lib/courseData";
import { courses } from "@/lib/courses";
import { PlayerSidebar } from "@/components/player/PlayerSidebar";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { PlayerTabs } from "@/components/player/PlayerTabs";
import { Topbar } from "@/components/dashboard/Topbar";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoursePlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const course = useMemo(() => courses.find((c) => c.slug === slug) || courses[0], [slug]);
  
  if (!course) {
    notFound();
  }

  const courseCurriculum = useMemo(() => getCurriculumForCourse(slug), [slug]);
  const allLessons = useMemo(() => courseCurriculum.flatMap(m => m.lessons), [courseCurriculum]);
  
  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const activeLesson = allLessons[activeLessonIndex];

  if (!activeLesson) return null;

  const hasNext = activeLessonIndex < allLessons.length - 1;
  const hasPrev = activeLessonIndex > 0;

  const handleNext = () => {
    if (hasNext) setActiveLessonId(allLessons[activeLessonIndex + 1].id);
  };

  const handlePrev = () => {
    if (hasPrev) setActiveLessonId(allLessons[activeLessonIndex - 1].id);
  };

  const handleToggleComplete = () => {
    setCompletedLessonIds(prev => 
      prev.includes(activeLessonId) 
        ? prev.filter(id => id !== activeLessonId)
        : [...prev, activeLessonId]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-paper-raised relative">
      {isSidebarOpen && (
        <PlayerSidebar
          courseTitle={course.title}
          courseSlug={slug}
          curriculum={courseCurriculum}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onLessonSelect={setActiveLessonId}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
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
        <Topbar />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1000px] mx-auto">
            <VideoPlayer
              lesson={activeLesson}
              isCompleted={completedLessonIds.includes(activeLessonId)}
              onToggleComplete={handleToggleComplete}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
            
            <PlayerTabs lesson={activeLesson} />
          </div>
        </div>
      </div>
    </div>
  );
}
