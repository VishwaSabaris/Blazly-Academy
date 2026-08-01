const stats = [
  { value: "200+", label: "Active learners" },
  { value: "3", label: "AI-focused courses" },
  { value: "92%", label: "Course completion" },
  { value: "340+", label: "Hiring partners" },
];

export function StatsBar() {
  return (
    <div className="border-y border-line bg-paper-raised">
      <div className="mx-auto grid max-w-[1180px] grid-cols-4 px-8 py-9 max-[700px]:grid-cols-2 max-[700px]:gap-y-6 sm:px-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center ${i !== stats.length - 1 ? "border-r border-line max-[700px]:border-r-0" : ""} ${
              i === 1 ? "max-[700px]:border-r-0" : ""
            }`}
          >
            <b className="block font-display text-[28px] tracking-tight">{s.value}</b>
            <span className="text-[12.5px] text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
