import { Award, BookOpen, Flame, MapPin, Link as LinkIcon, Edit3 } from "lucide-react";
import { courses } from "@/lib/courses";

export default function ProfilePage() {
  const completedCourses = courses.filter(c => c.progress === 100);

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      {/* Profile Header */}
      <div className="relative mb-10 overflow-hidden rounded-[24px] border border-line bg-paper-raised p-8 shadow-sm">
        <div className="absolute right-0 top-0 h-40 w-40 -translate-y-12 translate-x-12 rounded-full bg-emerald/10 blur-[40px]" />
        
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dcd6c3] to-[#b8ae8f] text-[40px] font-bold text-ink shadow-md">
            A
          </div>
          
          <div className="flex-1">
            <h1 className="font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
              Alex
            </h1>
            <p className="mb-4 text-[15px] font-medium text-emerald-deep">
              Professional GEO Specialist
            </p>
            <div className="flex flex-wrap gap-4 text-[13px] text-muted">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> San Francisco, CA</span>
              <span className="flex items-center gap-1.5"><LinkIcon size={14} /> alex.com</span>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-line/50">
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Stats & Badges */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm reveal is-visible" style={{ transitionDelay: '100ms' }}>
            <h3 className="mb-5 font-display text-[18px] font-bold text-ink">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-gold/20 bg-gold/5 p-4 text-center transition-transform hover:-translate-y-1">
                <Flame size={24} className="mb-2 text-gold" />
                <p className="text-[18px] font-bold text-ink">6 Days</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Streak</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald/20 bg-emerald/5 p-4 text-center transition-transform hover:-translate-y-1">
                <Award size={24} className="mb-2 text-emerald" />
                <p className="text-[18px] font-bold text-ink">2</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Completed Courses */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm reveal is-visible" style={{ transitionDelay: '200ms' }}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">
                Completed Courses
              </h3>
              <span className="flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-[12px] font-bold text-ink">
                <BookOpen size={14} /> {completedCourses.length} Total
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {completedCourses.length > 0 ? (
                completedCourses.map(course => (
                  <div key={course.slug} className="flex items-center justify-between rounded-xl border border-line bg-paper p-4 transition-all hover:border-emerald/30 hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${course.gradient}`} />
                      <div>
                        <h4 className="font-bold text-[15px] text-ink">{course.title}</h4>
                        <p className="text-[12.5px] text-muted">Completed 2 days ago</p>
                      </div>
                    </div>
                    <button className="text-[13px] font-bold text-emerald-deep hover:text-emerald transition-colors">
                      View Certificate &rarr;
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[14px] text-muted text-center py-6">No courses completed yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
