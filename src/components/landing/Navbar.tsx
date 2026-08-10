import { Button, LogoMark } from "@/components/ui/Primitives";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Blazly" },
  { href: "#certificate", label: "Certification" },
  { href: "#reviews", label: "Reviews" },
];

export async function Navbar() {
  const { userId } = await auth();

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
          {!userId ? (
            <>
              <a href="/login" className="hidden text-[14.5px] font-semibold text-ink-soft hover:text-ink sm:block">
                Log in
              </a>
              <a href="/signup">
                <Button variant="primary">Enroll now</Button>
              </a>
            </>
          ) : (
            <>
              <a href="/dashboard" className="hidden text-[14.5px] font-semibold text-ink-soft hover:text-ink sm:block mr-2">
                Dashboard
              </a>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
