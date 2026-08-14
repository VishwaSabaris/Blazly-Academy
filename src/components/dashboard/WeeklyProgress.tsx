"use client";

import { useState, useEffect } from "react";

const baseChartData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 5.0 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 2.0 },
  { day: "Sun", hours: 0.0 },
];

export function WeeklyProgress() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalHours, setTotalHours] = useState("18.5");

  useEffect(() => {
    // 1. Calculate dynamic learning hours added today based on completions
    const GEO_FOUNDATIONS_SLUG = "geo-foundations";
    const savedVideos = localStorage.getItem(`blazly_videos_${GEO_FOUNDATIONS_SLUG}`);
    const savedQuizzes = localStorage.getItem(`blazly_quizzes_${GEO_FOUNDATIONS_SLUG}`);

    const videos = savedVideos ? JSON.parse(savedVideos) : {};
    const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : {};

    let completedCount = 0;
    const moduleIds = ["m1", "m2", "m3", "m4", "m5", "m6"];
    moduleIds.forEach(id => {
      if (videos[id]) completedCount++;
      if (quizzes[id]) completedCount++;
    });

    // Add 0.5 hours of study time for each completed lesson item
    const studyHoursAdded = completedCount * 0.5;

    // Get today's day of week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();
    const todayDay = daysOfWeek[todayIndex];

    const updatedChart = baseChartData.map(item => {
      let finalHours = item.hours;
      if (item.day === todayDay) {
        finalHours += studyHoursAdded;
      }
      
      // Calculate height percentage based on a max capacity of 6 hours
      const percentage = Math.min(Math.round((finalHours / 6.0) * 100), 100);
      return {
        ...item,
        hours: parseFloat(finalHours.toFixed(1)),
        percentage: percentage > 0 ? percentage : 5, // minimum height representation
      };
    });

    setChartData(updatedChart);

    // Sum total learning hours for the weekly indicator
    const total = updatedChart.reduce((sum, item) => sum + item.hours, 0);
    setTotalHours(total.toFixed(1));
  }, []);

  return (
    <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">
            Learning Hours
          </h3>
          <p className="text-[14px] text-muted mt-1">This week's activity</p>
        </div>
        <div className="text-right">
          <p className="font-display text-[28px] font-bold tracking-tight text-emerald-deep">
            {totalHours}
          </p>
          <p className="text-[12px] font-bold uppercase tracking-wider text-muted">Total Hours</p>
        </div>
      </div>

      <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
        {chartData.map((data, i) => (
          <div key={data.day} className="group relative flex w-full flex-col items-center gap-3">
            {/* Tooltip */}
            <div className="absolute -top-10 scale-0 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-bold text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
              {data.hours}h
              {/* Tooltip triangle */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-ink" />
            </div>

            {/* Bar Track */}
            <div className="relative flex h-36 w-full max-w-[40px] items-end justify-center rounded-xl bg-line/30 overflow-hidden">
              {/* Animated Bar */}
              <div 
                className="w-full rounded-xl bg-gradient-to-t from-emerald-deep to-emerald transition-all duration-1000 ease-out group-hover:opacity-80"
                style={{ height: `${data.percentage}%` }}
              />
            </div>
            
            <span className="text-[12.5px] font-semibold text-muted">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
