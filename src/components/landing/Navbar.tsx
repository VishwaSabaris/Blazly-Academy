import { Button, LogoMark } from "@/components/ui/Primitives";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Blazly" },
  { href: "#certificate", label: "Certification" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-4.5 sm:px-5">
        <div className="flex items-center gap-2.5 font-display text-[19px] font-bold tracking-tight">
          <LogoMark />
          Blazly Academy
        </div>

        <div className="hidden items-center gap-8.5 text-[14.5px] text-ink-soft md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/dashboard">
            <Button variant="primary">Go to Dashboard</Button>
          </a>
        </div>
      </nav>
    </header>
  );
}
