import { ButtonHTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald/8 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-deep">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
      {children}
    </div>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "gold";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5.5 py-2.5 text-[14.5px] font-semibold transition-all duration-150 cursor-pointer";
  const variants: Record<string, string> = {
    primary:
      "bg-ink text-paper hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(18,20,26,0.22)]",
    ghost: "text-ink-soft border border-line hover:text-ink",
    gold: "bg-gold text-[#1c1400] hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(192,138,46,0.3)]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// We're importing the logo image directly from the root folder!
import logoImage from "../../../blazly-logo-white.png";

export function LogoMark({ size = 26, className = "" }: { size?: number, className?: string }) {
  return (
    <img 
      src={logoImage.src} 
      alt="Blazly Academy Logo" 
      width={size * 1.5}
      height={size * 1.5}
      className={`object-contain shrink-0 ${className}`} 
      style={{ 
        width: size * 1.5, 
        height: size * 1.5,
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
      }}
    />
  );
}
