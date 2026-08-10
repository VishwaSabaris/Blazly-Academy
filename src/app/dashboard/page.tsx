import { StatCards } from "@/components/dashboard/StatCards";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { RecentCourses } from "@/components/dashboard/RecentCourses";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "Student";

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10 md:px-12 reveal is-visible">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-[15px] text-muted">
          Here&apos;s your learning snapshot for today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Main Learning Areas */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Stat Cards placed at top */}
          <div className="reveal is-visible" style={{ transitionDelay: '100ms' }}>
            <StatCards />
          </div>

          <div className="reveal is-visible" style={{ transitionDelay: '200ms' }}>
            <ContinueLearning />
          </div>

          <div className="reveal is-visible" style={{ transitionDelay: '300ms' }}>
            <WeeklyProgress />
          </div>
        </div>

        {/* Right Column: Feeds & Up Next */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <div className="reveal is-visible" style={{ transitionDelay: '400ms' }}>
            <ActivityFeed />
          </div>

          <div className="reveal is-visible" style={{ transitionDelay: '500ms' }}>
            <RecentCourses />
          </div>
        </div>
      </div>
    </main>
  );
}
