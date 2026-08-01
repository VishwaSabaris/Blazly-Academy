import { Button, Eyebrow, LogoMark } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function CertificateSection() {
  return (
    <section id="certificate" className="px-8 py-22 sm:px-5">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-14 py-18 max-[640px]:px-6.5 max-[640px]:py-12">
            <div className="relative z-10 grid grid-cols-[1fr_0.85fr] items-center gap-14 max-[900px]:grid-cols-1">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F1E3C4]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Certification
                </div>
                <h2 className="mb-4 font-display text-[clamp(26px,3vw,34px)] font-semibold tracking-tight text-paper">
                  A certificate employers can actually check.
                </h2>
                <p className="mb-7 max-w-[440px] text-[15.5px] leading-relaxed text-[#B9BCB0]">
                  Every certificate carries a unique ID and QR code linking to a
                  public verification page — no more &ldquo;trust me&rdquo;
                  credentials on a resume.
                </p>
                <Button variant="gold" className="px-6.5 py-3.5 text-[15px]">
                  Verify a certificate →
                </Button>
              </div>

              <div className="rounded-2xl bg-paper-raised p-7 text-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">
                <div className="mb-6.5 flex items-start justify-between">
                  <div className="flex items-center gap-2 font-display text-[14px] font-bold">
                    <LogoMark size={20} />
                    Blazly Academy
                  </div>
                  <div
                    className="h-14 w-14 rounded-md"
                    style={{
                      backgroundImage:
                        "repeating-conic-gradient(var(--ink) 0% 25%, transparent 0% 50%)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                </div>
                <h4 className="mb-1.5 font-accent text-[21px] font-medium italic">
                  Professional GEO Certification
                </h4>
                <div className="mb-5.5 text-[13.5px] text-muted">
                  Issued to Alex · Aug 2026
                </div>
                <div className="flex justify-between border-t border-dashed border-line pt-4 font-code text-[11.5px] text-muted">
                  <span>ID · BLZ-GEO-24817</span>
                  <span>Verified ✓</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
