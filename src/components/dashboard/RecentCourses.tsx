import { courses } from "@/lib/courses";

export function RecentCourses() {
  const withProgress = courses.filter((c) => c.progress !== undefined);

  return (
    <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">
          Recent courses
        </h3>
        <a href="#" className="flex items-center gap-1 text-[13.5px] font-bold text-emerald-deep transition-colors hover:text-emerald">
          View all <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {withProgress.map((c) => (
          <div key={c.slug} className="group flex items-center gap-5 rounded-2xl border border-transparent p-3 transition-all hover:border-line hover:bg-paper hover:shadow-sm">
            <div
              className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${c.gradient} shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md`}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="truncate text-[15px] font-bold text-ink">{c.title}</p>
                <span className="shrink-0 text-[13px] font-bold text-emerald-deep">
                  {c.progress}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-line shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-deep transition-all duration-1000 ease-out"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
