import { ReactNode } from "react";
import { LogoMark } from "@/components/ui/Primitives";

export function AuthShell({
  children,
}: {
  children: ReactNode;
  panelEyebrow?: string;
  panelTitle?: string;
  panelBody?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg selection:bg-emerald/20 px-6 py-12">
      <div className="w-full max-w-[380px]">
        <a href="/" className="mb-10 flex items-center justify-center gap-2.5 font-display text-[18px] font-bold tracking-tight">
          <LogoMark />
          Blazly Academy
        </a>
        {children}
      </div>
    </div>
  );
}
