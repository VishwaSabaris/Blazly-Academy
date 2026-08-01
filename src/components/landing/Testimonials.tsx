import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "First certification that actually changed how I write. My client's product pages started showing up in AI Overviews within weeks.",
    name: "Ananya R.",
    role: "Content strategist",
  },
  {
    quote:
      "The quiz gate at 80% actually forced me to re-watch modules instead of skimming. Annoying at first, useful in hindsight.",
    name: "Rahul K.",
    role: "Marketing lead",
  },
  {
    quote:
      "Recruiters have actually scanned the QR code on my certificate during interviews. That alone justified the course.",
    name: "Divya S.",
    role: "Freelance SEO",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="px-8 py-22 sm:px-5">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-13 max-w-[600px]">
          <div className="mb-4">
            <Eyebrow>Reviews</Eyebrow>
          </div>
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-semibold tracking-tight">
            What learners say after they finish
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <div className="rounded-2xl border border-line bg-paper-raised p-7">
                <p className="mb-5.5 font-accent text-[16.5px] italic leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#dcd6c3] to-[#b8ae8f]" />
                  <div>
                    <b className="block text-[13.5px]">{t.name}</b>
                    <span className="text-[12px] text-muted">{t.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
