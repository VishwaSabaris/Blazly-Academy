import { Course } from "@/lib/courses";

export function CourseCard({ course: c }: { course: Course }) {
  return (
    <a href={`/dashboard/courses/${c.slug}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group">
        <div className={`relative flex aspect-video w-full items-end overflow-hidden p-4 ${c.imageUrl ? 'bg-ink' : 'bg-gradient-to-br ' + c.gradient}`}>
          {c.imageUrl && (
            <img 
              src={c.imageUrl} 
              alt={c.title} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {c.badge && !c.imageUrl && (
            <span className="relative z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow-sm">
              {c.badge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="mb-2 block text-[11.5px] font-semibold uppercase tracking-wide text-emerald-deep">
            {c.tag}
          </span>
          <h3 className="mb-2 font-display text-[18px] font-semibold tracking-tight">
            {c.title}
          </h3>
          <p className="mb-4 flex-1 text-[13.5px] text-muted">{c.description}</p>
          <p className="mb-3 text-[12.5px] text-ink-soft">For: {c.audience}</p>
          <div className="flex items-center justify-between border-t border-line pt-3.5 text-[12.5px] text-ink-soft">
            <span>
              {c.modules} modules · {c.duration}
            </span>
            <span className="font-semibold text-gold">★ {c.rating}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
