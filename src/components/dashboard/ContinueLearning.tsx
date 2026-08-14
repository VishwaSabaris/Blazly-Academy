"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import Link from "next/link";

const modulesList = [
  { id: "m1", title: "Search is Changing" },
  { id: "m2", title: "Understanding AI Search" },
  { id: "m3", title: "Introduction to GEO" },
  { id: "m4", title: "Content for AI" },
  { id: "m5", title: "Building Digital Authority" },
  { id: "m6", title: "Future of Search" },
];

export function ContinueLearning() {
  const [courseSlug, setCourseSlug] = useState("geo-foundations");
  const [courseTitle, setCourseTitle] = useState("GEO Foundations");
  const [moduleText, setModuleText] = useState("Module 1 • Search is Changing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedVideos = localStorage.getItem("blazly_videos_geo-foundations");
    const savedQuizzes = localStorage.getItem("blazly_quizzes_geo-foundations");

    const videos = savedVideos ? JSON.parse(savedVideos) : {};
    const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : {};

    let completedCount = 0;
    let firstUncompletedModuleIndex = -1;

    modulesList.forEach((m, idx) => {
      const videoDone = !!videos[m.id];
      const quizDone = !!quizzes[m.id];
      
      if (videoDone) completedCount++;
      if (quizDone) completedCount++;

      if (firstUncompletedModuleIndex === -1 && (!videoDone || !quizDone)) {
        firstUncompletedModuleIndex = idx;
      }
    });

    const calculatedProgress = Math.round((completedCount / 12) * 100);

    if (calculatedProgress < 100) {
      // User is still learning GEO Foundations
      setCourseSlug("geo-foundations");
      setCourseTitle("GEO Foundations");
      setProgress(calculatedProgress);

      const activeIdx = firstUncompletedModuleIndex !== -1 ? firstUncompletedModuleIndex : 0;
      const activeModule = modulesList[activeIdx];
      setModuleText(`Module ${activeIdx + 1} • ${activeModule.title}`);
    } else {
      // User has completed GEO Foundations! Suggest next course
      setCourseSlug("geo-professional");
      setCourseTitle("GEO Professional");
      setModuleText("Module 6 • Structuring content for retrieval-augmented answers");
      setProgress(58); // Mock progress for the next level
    }
  }, []);

  return (
    <Link 
      href={`/dashboard/courses/${courseSlug}`} 
      className="block group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1A1D24] via-[#12141A] to-[#0D0F14] text-paper shadow-2xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
    >
      {/* Decorative gradient orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald/20 blur-[80px] transition-opacity duration-500 group-hover:bg-emerald/30" />
      
      <div className="relative grid grid-cols-[1fr_auto] items-center gap-8 p-8 max-[560px]:grid-cols-1 max-[560px]:gap-6">
        <div className="z-10">
          <p className="mb-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-widest text-gold-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
            </span>
            Continue learning
          </p>
          <h2 className="mb-1.5 font-display text-[26px] font-bold tracking-tight text-white drop-shadow-sm">
            {courseTitle}
          </h2>
          <p className="mb-6 text-[14.5px] text-[#A1A699]">
            {moduleText}
          </p>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-full max-w-[320px] overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-deep shadow-[0_0_10px_rgba(11,110,79,0.5)] transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[13px] font-medium text-[#8C9086]">{progress}%</p>
          </div>
        </div>
        <button className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
          <Play size={24} fill="currentColor" className="ml-1" />
        </button>
      </div>
    </Link>
  );
}
