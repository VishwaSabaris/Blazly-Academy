import { Navbar } from "@/components/landing/Navbar";
import { CtaAndFooter } from "@/components/landing/CtaAndFooter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-emerald/20">
      <Navbar />
      
      <main className="mx-auto max-w-[800px] px-6 py-20 md:py-32">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-12">
          <h1 className="mb-10 font-display text-[32px] font-bold tracking-tight text-ink">
            Contact us
          </h1>
          
          <div className="mb-10 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#8b5cf6]">
                <Phone size={18} />
                <span className="font-semibold text-ink">Phone</span>
              </div>
              <p className="text-[13.5px] text-muted">+91 6383182578</p>
            </div>
            
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#8b5cf6]">
                <Mail size={18} />
                <span className="font-semibold text-ink">Email</span>
              </div>
              <a href="mailto:srijita@blazly.ai" className="text-[13.5px] text-[#8b5cf6] hover:underline">
                srijita@blazly.ai
              </a>
            </div>
            
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#8b5cf6]">
                <MapPin size={18} />
                <span className="font-semibold text-ink">Address</span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-muted">
                8 THE GREEN STE A DOVER<br />DE 19901
              </p>
            </div>
          </div>
          
          <form className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-[13.5px] font-medium text-ink">Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-line bg-transparent px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#8b5cf6]"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-[13.5px] font-medium text-ink">Email *</label>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-lg border border-line bg-transparent px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#8b5cf6]"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-[13.5px] font-medium text-ink">Subject</label>
              <input
                type="text"
                placeholder="e.g., Support"
                className="w-full rounded-lg border border-line bg-transparent px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#8b5cf6]"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-[13.5px] font-medium text-ink">Write a message *</label>
              <textarea
                placeholder="Message"
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-line bg-transparent px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#8b5cf6]"
              ></textarea>
            </div>
            
            <div className="mt-2 text-right">
              <button 
                type="button" 
                className="rounded-lg bg-[#8b5cf6] px-8 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#7c3aed]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <CtaAndFooter />
    </div>
  );
}
