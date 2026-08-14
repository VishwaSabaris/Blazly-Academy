"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Award, BookOpen, Clock } from "lucide-react";

const baseActivities = [
  {
    id: "act-cert",
    title: "Earned Certificate",
    course: "Platform Specialist",
    time: "Yesterday",
    icon: Award,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    id: "act-start",
    title: "Started new course",
    course: "GEO Professional",
    time: "2 days ago",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "act-study",
    title: "Studied for 2 hours",
    course: "Daily Goal Met",
    time: "3 days ago",
    icon: Clock,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export function ActivityFeed() {
  const [activitiesList, setActivitiesList] = useState<any[]>([]);

  useEffect(() => {
    const savedVideos = localStorage.getItem("blazly_videos_geo-foundations");
    const savedQuizzes = localStorage.getItem("blazly_quizzes_geo-foundations");

    const videos = savedVideos ? JSON.parse(savedVideos) : {};
    const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : {};

    const modules = [
      { id: "m1", name: "Search is Changing" },
      { id: "m2", name: "Understanding AI Search" },
      { id: "m3", name: "Introduction to GEO" },
      { id: "m4", name: "Content for AI" },
      { id: "m5", name: "Building Digital Authority" },
      { id: "m6", name: "Future of Search" },
    ];

    const completedActivities: any[] = [];

    modules.forEach((m, idx) => {
      const videoDone = !!videos[m.id];
      const quizDone = !!quizzes[m.id];
      if (videoDone && quizDone) {
        completedActivities.push({
          id: `real-completed-m${idx + 1}`,
          title: `Completed Module ${idx + 1}`,
          course: "GEO Foundations",
          time: "Just now",
          icon: CheckCircle2,
          color: "text-emerald",
          bg: "bg-emerald/10",
        });
      }
    });

    // If none are completed, we can show a mock baseline item (Completed Module 5) at the top like in the image.
    if (completedActivities.length === 0) {
      completedActivities.push({
        id: "mock-m5",
        title: "Completed Module 5",
        course: "GEO Foundations",
        time: "2 hours ago",
        icon: CheckCircle2,
        color: "text-emerald",
        bg: "bg-emerald/10",
      });
    }

    setActivitiesList([...completedActivities, ...baseActivities]);
  }, []);

  return (
    <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">
          Recent Activity
        </h3>
      </div>

      <div className="relative border-l border-line/50 ml-4 pl-6 flex flex-col gap-8">
        {activitiesList.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-paper-raised ${item.bg} ${item.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
              <item.icon size={14} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-[14px] font-bold text-ink">{item.title}</p>
              <p className="text-[12.5px] font-semibold text-muted mt-0.5">{item.course}</p>
              <p className="text-[11.5px] font-semibold text-muted/60 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
