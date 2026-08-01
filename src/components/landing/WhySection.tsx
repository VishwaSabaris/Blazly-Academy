import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    num: "01",
    title: "AI course assistant",
    body: "Ask questions about the exact lesson you're on, and get answers grounded in that module's material.",
  },
  {
    num: "02",
    title: "Auto-saved progress",
    body: "Resume playback, notes, and quiz state exactly where you left off, on any device.",
  },
  {
    num: "03",
    title: "Graded quizzes",
    body: "10 questions per module, 80% to pass, unlimited retries — mastery over speed.",
  },
  {
    num: "04",
    title: "Verifiable certificates",
    body: "Every certificate ships with a QR code that resolves to a public verification page.",
  },
];

export function WhySection() {
  return (
    <section id="why" className="px-8 py-22 sm:px-5">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-13 max-w-[600px]">
          <div className="mb-4">
            <Eyebrow>Platform</Eyebrow>
          </div>
          <h2 className="mb-3.5 font-display text-[clamp(28px,3vw,38px)] font-semibold tracking-tight">
            Not a video library. A learning system.
          </h2>
          <p className="text-[16px] leading-relaxed text-ink-soft">
            Every feature is built around one goal: making sure the lesson actually
            sticks.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {items.map((it) => (
              <div key={it.num} className="bg-paper-raised p-7.5">
                <span className="mb-5.5 block font-code text-[12px] text-muted">
                  {it.num}
                </span>
                <h3 className="mb-2.5 font-display text-[17px] tracking-tight">
                  {it.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{it.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
