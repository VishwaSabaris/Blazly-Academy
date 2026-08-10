import { CheckCircle2, Award, BookOpen, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Completed Module 5",
    course: "GEO Foundations",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    id: 2,
    title: "Earned Certificate",
    course: "Platform Specialist",
    time: "Yesterday",
    icon: Award,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    id: 3,
    title: "Started new course",
    course: "GEO Professional",
    time: "2 days ago",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 4,
    title: "Studied for 2 hours",
    course: "Daily Goal Met",
    time: "3 days ago",
    icon: Clock,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export function ActivityFeed() {
  return (
    <div className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">
          Recent Activity
        </h3>
      </div>

      <div className="relative border-l border-line/50 ml-4 pl-6 flex flex-col gap-8">
        {activities.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-paper-raised ${item.bg} ${item.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
              <item.icon size={14} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-[14px] font-bold text-ink">{item.title}</p>
              <p className="text-[13px] font-medium text-emerald-deep mt-0.5">{item.course}</p>
              <p className="text-[12px] text-muted mt-1.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
