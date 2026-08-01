"use client";

import { useState, useMemo } from "react";
import { curriculum } from "@/lib/courseData";
import { courses } from "@/lib/courses";
import { PlayerSidebar } from "@/components/player/PlayerSidebar";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { PlayerTabs } from "@/components/player/PlayerTabs";
import { Topbar } from "@/components/dashboard/Topbar";
import { notFound } from "next/navigation";

export default function CoursePlayerPage({ params }: { params: { slug: string } }) {
  // In a real app, this would use a database. We mock the state here.
  const course = useMemo(() => courses.find((c) => c.slug === params.slug) || courses[0], [params.slug]);
  
  if (!course) {
    notFound();
  }

  // Flatten lessons to make prev/next navigation easier
  const allLessons = useMemo(() => curriculum.flatMap(m => m.lessons), []);
  
  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

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
    <div className="flex h-screen overflow-hidden bg-paper-raised">
      <PlayerSidebar
        courseTitle={course.title}
        courseSlug={params.slug}
        curriculum={curriculum}
        activeLessonId={activeLessonId}
        completedLessonIds={completedLessonIds}
        onLessonSelect={setActiveLessonId}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
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
