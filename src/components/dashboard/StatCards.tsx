import { GraduationCap, Award, Clock, Target, Flame } from "lucide-react";

const stats = [
  { label: "Courses completed", value: "3", icon: GraduationCap },
  { label: "Certificates", value: "2", icon: Award },
  { label: "Learning hours", value: "47.5", icon: Clock },
  { label: "Quiz accuracy", value: "88%", icon: Target },
  { label: "Current streak", value: "6 days", icon: Flame },
];

export function StatCards() {
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
