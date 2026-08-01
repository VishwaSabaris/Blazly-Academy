import { StatCards } from "@/components/dashboard/StatCards";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { RecentCourses } from "@/components/dashboard/RecentCourses";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      <div className="mb-10">
        <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
          Welcome back, Alex 👋
        </h1>
        <p className="text-[15px] text-muted">
          Here&apos;s where you left off.
        </p>
      </div>

      <div className="mb-10 reveal is-visible" style={{ transitionDelay: '100ms' }}>
        <ContinueLearning />
      </div>

      <div className="mb-10 reveal is-visible" style={{ transitionDelay: '200ms' }}>
        <StatCards />
      </div>

      <div className="reveal is-visible" style={{ transitionDelay: '300ms' }}>
        <RecentCourses />
      </div>
    </main>
  );
}
