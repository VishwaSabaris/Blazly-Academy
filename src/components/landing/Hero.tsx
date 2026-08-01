import { Button, Eyebrow } from "@/components/ui/Primitives";
import { CitationPanel } from "./CitationPanel";

export function Hero() {
  return (
    <section className="px-8 pb-20 pt-24 sm:px-5">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-16 max-[940px]:grid-cols-1 max-[940px]:gap-12">
        <div>
          <div className="mb-5.5">
            <Eyebrow>Cohort enrolling now</Eyebrow>
          </div>
          <h1 className="mb-5.5 font-display text-[clamp(38px,4.6vw,58px)] font-semibold leading-[1.06] tracking-tight">
            Get certified in the discipline that gets you{" "}
            <em className="font-accent font-medium text-emerald-deep not-italic italic">
              found by AI
            </em>
            .
          </h1>
          <p className="mb-8.5 max-w-[480px] text-[17.5px] leading-relaxed text-ink-soft">
            The Professional GEO Certification teaches you to structure content so
            ChatGPT, Perplexity, and Google&apos;s AI Overviews cite it as the source.
            Taught by practitioners, graded by a real curriculum — not a badge mill.
          </p>
          <div className="mb-9 flex flex-wrap items-center gap-3.5">
            <a href="/signup">
              <Button variant="primary" className="px-6.5 py-3.5 text-[15px]">
                Enroll in Professional GEO →
              </Button>
            </a>
            <a href="#courses">
              <Button variant="ghost" className="px-6.5 py-3.5 text-[15px]">
                View curriculum
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-4.5 text-[13.5px] text-muted">
            <div className="flex">
              {[
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg",
                "https://randomuser.me/api/portraits/men/46.jpg",
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Student"
                  className="-ml-2 h-7.5 w-7.5 rounded-full border-2 border-paper object-cover first:ml-0"
                />
              ))}
            </div>
            <span>Joined by 200+ learners building AI-search skills</span>
          </div>
        </div>

        <CitationPanel />
      </div>
    </section>
  );
}
