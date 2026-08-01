import { Play } from "lucide-react";

export function ContinueLearning() {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#1A1D24] via-[#12141A] to-[#0D0F14] text-paper shadow-2xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
      {/* Decorative gradient orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald/20 blur-[80px] transition-opacity duration-500 group-hover:bg-emerald/30" />
      
      <div className="relative grid grid-cols-[1fr_auto] items-center gap-8 p-8 max-[560px]:grid-cols-1 max-[560px]:gap-6">
        <div className="z-10">
          <p className="mb-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-widest text-gold-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
            </span>
            Continue learning
          </p>
          <h2 className="mb-1.5 font-display text-[26px] font-bold tracking-tight text-white drop-shadow-sm">
            Professional GEO Certification
          </h2>
          <p className="mb-6 text-[14.5px] text-[#A1A699]">
            Module 6 <span className="mx-1.5 text-white/20">•</span> Structuring content for retrieval-augmented answers
          </p>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-full max-w-[320px] overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-emerald to-emerald-deep shadow-[0_0_10px_rgba(11,110,79,0.5)]" />
            </div>
            <p className="text-[13px] font-medium text-[#8C9086]">58%</p>
          </div>
        </div>
        <button className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
          <Play size={24} fill="currentColor" className="ml-1" />
        </button>
      </div>
    </div>
  );
}
