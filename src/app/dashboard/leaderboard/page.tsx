import { Flame, Medal, Trophy } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Priya Sharma", title: "GEO Professional", points: 2840, streak: 12, badge: "gold" },
  { rank: 2, name: "Alex", title: "Professional GEO Specialist", points: 2610, streak: 6, badge: "silver", isCurrentUser: true },
  { rank: 3, name: "Marcus Lee", title: "Platform Specialist", points: 2395, streak: 9, badge: "bronze" },
  { rank: 4, name: "Sofia Alvarez", title: "GEO Foundations", points: 2140, streak: 4 },
  { rank: 5, name: "Daniel Kim", title: "GEO Professional", points: 1985, streak: 3 },
  { rank: 6, name: "Emily Carter", title: "GEO Foundations", points: 1760, streak: 5 },
  { rank: 7, name: "James Wright", title: "Platform Specialist", points: 1625, streak: 2 },
  { rank: 8, name: "Nina Patel", title: "GEO Professional", points: 1490, streak: 7 },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Medal size={18} className="text-gold" />;
  if (rank === 2) return <Medal size={18} className="text-muted" />;
  if (rank === 3) return <Medal size={18} className="text-[#B87333]" />;
  return <span className="w-[18px] text-center text-[13px] font-bold text-muted">{rank}</span>;
}

export default function LeaderboardPage() {
  const currentUser = leaderboard.find((entry) => entry.isCurrentUser);

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      <div className="mb-10">
        <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
          Leaderboard
        </h1>
        <p className="text-[15px] text-muted">
          See how you rank against other learners this month.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[20px] border border-gold/20 bg-gold/5 p-5">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-muted">Your Rank</p>
          <p className="font-display text-[28px] font-bold text-ink">#{currentUser?.rank ?? "-"}</p>
        </div>
        <div className="rounded-[20px] border border-emerald/20 bg-emerald/5 p-5">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-muted">Your Points</p>
          <p className="font-display text-[28px] font-bold text-ink">{currentUser?.points ?? 0}</p>
        </div>
        <div className="rounded-[20px] border border-line bg-paper-raised p-5">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-muted">Active Streak</p>
          <p className="flex items-center gap-2 font-display text-[28px] font-bold text-ink">
            <Flame size={22} className="text-gold" />
            {currentUser?.streak ?? 0} days
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-line bg-paper-raised shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-emerald-deep" />
            <h2 className="font-display text-[18px] font-bold text-ink">Top Learners</h2>
          </div>
          <span className="rounded-full bg-ink/5 px-3 py-1 text-[12px] font-bold text-ink">
            August 2026
          </span>
        </div>

        <div className="divide-y divide-line">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${
                entry.isCurrentUser ? "bg-emerald/5" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex w-8 shrink-0 justify-center">
                  <RankBadge rank={entry.rank} />
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dcd6c3] to-[#b8ae8f] text-[15px] font-bold text-ink">
                  {entry.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[15px] text-ink">
                    {entry.name}
                    {entry.isCurrentUser ? " (You)" : ""}
                  </p>
                  <p className="truncate text-[12.5px] text-muted">{entry.title}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-6 text-right">
                <div>
                  <p className="text-[14px] font-bold text-ink">{entry.points.toLocaleString()}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Points</p>
                </div>
                <div className="hidden sm:block">
                  <p className="flex items-center justify-end gap-1 text-[14px] font-bold text-ink">
                    <Flame size={14} className="text-gold" />
                    {entry.streak}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Streak</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
