import { Button, LogoMark } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const footerCols = [
  {
    heading: "Learn",
    links: [
      { label: "All courses", href: "#courses" },
      { label: "Certification", href: "#certificate" },
      { label: "Instructors", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function CtaAndFooter() {
  return (
    <>
      <section className="px-8 pb-18 pt-22 text-center sm:px-5">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <h2 className="mb-4.5 font-display text-[clamp(30px,4vw,44px)] font-semibold tracking-tight">
              Ready to be the source AI cites?
            </h2>
          </Reveal>
          <Reveal>
            <p className="mb-8 text-[16px] text-ink-soft">
              Start the Professional GEO Certification today. Self-paced, lifetime
              access.
            </p>
          </Reveal>
          <Reveal>
            <a href="/signup">
              <Button variant="primary" className="px-6.5 py-3.5 text-[15px]">
                Enroll now
              </Button>
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line px-8 pb-8 pt-14 sm:px-5">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 max-[760px]:grid-cols-2">
            <div>
              <div className="mb-3.5 flex items-center gap-2.5 font-display text-[19px] font-bold tracking-tight">
                <LogoMark />
                Blazly Academy
              </div>
              <p className="max-w-[240px] mb-6 text-[13.5px] text-muted">
                Professional certification for the AI-search era.
              </p>
              <div className="flex items-center gap-4 text-muted">
                <a href="https://www.linkedin.com/company/blazly-ai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors"><LinkedinIcon width={18} height={18} /></a>
                <a href="https://www.youtube.com/@blazly-ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors"><YoutubeIcon width={18} height={18} /></a>
                <a href="https://www.facebook.com/people/Blazly-AI/61579677590703/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors"><FacebookIcon width={18} height={18} /></a>
                <a href="https://x.com/Blazly_AI" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors"><TwitterIcon width={18} height={18} /></a>
              </div>
            </div>
            {footerCols.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 text-[12.5px] font-semibold uppercase tracking-wide text-muted">
                  {col.heading}
                </h4>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="mb-2.5 block text-[14px] text-ink-soft hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7 text-[13px] text-muted">
            <span>© 2026 Blazly Academy. All rights reserved.</span>
            <span>Made for learners who build.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
