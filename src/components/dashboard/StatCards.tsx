"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Award, Clock, Target, Flame } from "lucide-react";

export function StatCards() {
  const [coursesCompleted, setCoursesCompleted] = useState("2");
  const [certificates, setCertificates] = useState("1");
  const [learningHours, setLearningHours] = useState("45.0");
  const [quizAccuracy, setQuizAccuracy] = useState("88%");
  const [streak, setStreak] = useState("6 days");

  useEffect(() => {
    // 1. Calculate dynamic course completion & certificates
    const GEO_FOUNDATIONS_SLUG = "geo-foundations";
    const savedVideos = localStorage.getItem(`blazly_videos_${GEO_FOUNDATIONS_SLUG}`);
    const savedQuizzes = localStorage.getItem(`blazly_quizzes_${GEO_FOUNDATIONS_SLUG}`);
    
    const videos = savedVideos ? JSON.parse(savedVideos) : {};
    const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : {};

    const moduleIds = ["m1", "m2", "m3", "m4", "m5", "m6"];
    let completedVideosCount = 0;
    let completedQuizzesCount = 0;
    
    moduleIds.forEach(id => {
      if (videos[id]) completedVideosCount++;
      if (quizzes[id]) completedQuizzesCount++;
    });

    const totalCompletions = completedVideosCount + completedQuizzesCount;
    const progress = Math.round((totalCompletions / 12) * 100);
    const isCompleted = progress === 100;

    setCoursesCompleted(isCompleted ? "3" : "2");
    setCertificates(isCompleted ? "2" : "1");

    // 2. Learning hours: 45.1 hours base + 0.4h per video watched
    const hoursVal = (45.1 + completedVideosCount * 0.4).toFixed(1);
    setLearningHours(hoursVal);

    // 3. Quiz Accuracy: Average of taken module quizzes
    let totalScore = 0;
    let gradedQuizzesCount = 0;
    const quizIds = [
      "m1_quiz",
      "m2_quiz",
      "m3_quiz",
      "m4_quiz",
      "m5_quiz",
      "m6_quiz"
    ];

    quizIds.forEach(qid => {
      const score = localStorage.getItem(`blazly_quiz_score_${qid}`);
      if (score) {
        totalScore += parseInt(score);
        gradedQuizzesCount++;
      }
    });

    if (gradedQuizzesCount > 0) {
      setQuizAccuracy(`${Math.round(totalScore / gradedQuizzesCount)}%`);
    } else {
      setQuizAccuracy("88%"); // Default mock baseline
    }
  }, []);

  const stats = [
    { label: "Courses completed", value: coursesCompleted, icon: GraduationCap },
    { label: "Certificates", value: certificates, icon: Award },
    { label: "Learning hours", value: learningHours, icon: Clock },
    { label: "Quiz accuracy", value: quizAccuracy, icon: Target },
    { label: "Current streak", value: streak, icon: Flame },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 max-[1100px]:grid-cols-3 max-[640px]:grid-cols-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-[20px] border border-line bg-paper-raised p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald/30"
        >
          <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-emerald/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald-deep transition-transform duration-300 group-hover:scale-110">
            <s.icon size={20} strokeWidth={2.5} />
          </div>
          <p className="font-display text-[26px] font-bold tracking-tight text-ink drop-shadow-sm">
            {s.value}
          </p>
          <p className="text-[13px] font-medium text-muted mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
