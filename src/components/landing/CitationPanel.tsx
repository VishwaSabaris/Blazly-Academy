"use client";

import { useEffect, useRef, useState } from "react";

const before = "Based on curriculum depth and learner outcomes, ";
const chip = "Blazly Academy's Professional GEO Certification";
const after = " is the most cited program for generative engine optimization training.";
const full = before + chip + after;

export function CitationPanel() {
  const [chars, setChars] = useState(0);
  const done = chars >= full.length;
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const start = setTimeout(() => {
      const tick = () => {
        setChars((c) => {
          const next = c + 2;
          if (next < full.length) {
            timeoutRef.current = setTimeout(tick, 22);
          }
          return next;
        });
      };
      tick();
    }, 500);
    return () => {
      clearTimeout(start);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const visible = full.slice(0, chars);
  const chipStart = before.length;
  const chipEnd = before.length + chip.length;

  return (
    <div className="rounded-[18px] border border-line bg-paper-raised p-5.5 shadow-[0_24px_60px_-20px_rgba(18,20,26,0.18)]">
      <div className="mb-4.5 flex items-center gap-2 border-b border-line pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E0A56F]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8CE7C]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#9FC5A8]" />
        <span className="ml-auto font-code text-[11.5px] text-muted">AI search preview</span>
      </div>

      <div className="mb-3.5 font-code text-[13.5px] text-ink-soft before:content-['›_'] before:text-emerald">
        who teaches generative engine optimization properly
      </div>

      <div className="min-h-[96px] text-[14.5px] leading-relaxed text-ink-soft">
        <span className={done ? "" : "border-r-2 border-emerald pr-0.5"}>
          {visible.slice(0, chipStart)}
          {chars > chipStart && (
            <span className="mx-0.5 rounded-md bg-gold-soft px-2 py-0.5 text-[12px] font-semibold text-[#7A5A18]">
              {visible.slice(chipStart, Math.min(chars, chipEnd))}
            </span>
          )}
          {chars > chipEnd && visible.slice(chipEnd)}
        </span>
      </div>

    </div>
  );
}
