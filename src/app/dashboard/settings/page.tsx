import { User, Mail, Shield, Bell, CreditCard, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-10 md:px-12 reveal is-visible">
      <div className="mb-10">
        <h1 className="mb-2 font-display text-[32px] font-bold tracking-tight text-ink drop-shadow-sm">
          Settings
        </h1>
        <p className="text-[15px] text-muted">
          Manage your account preferences and subscriptions.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Account Section */}
        <section className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 text-ink">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-display text-[18px] font-bold text-ink">Account Details</h2>
              <p className="text-[13px] text-muted">Update your personal information</p>
            </div>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Full Name</label>
              <input type="text" defaultValue="Alex" className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[14px] outline-none focus:border-emerald transition-colors" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Email Address</label>
              <input type="email" defaultValue="alex@example.com" className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[14px] outline-none focus:border-emerald transition-colors" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="rounded-lg bg-ink px-6 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:-translate-y-px hover:shadow-md">
              Save Changes
            </button>
          </div>
        </section>

        {/* Billing Section */}
        <section className="rounded-[24px] border border-line bg-paper-raised p-7 shadow-sm reveal is-visible" style={{ transitionDelay: '100ms' }}>
          <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="font-display text-[18px] font-bold text-ink">Billing & Subscription</h2>
              <p className="text-[13px] text-muted">Manage your Pro plan</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between rounded-xl border border-gold/20 bg-gold/5 p-5">
            <div>
              <span className="mb-1 inline-block rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-paper">Pro Plan</span>
              <p className="text-[14px] font-medium text-ink">You are currently on the Pro plan.</p>
              <p className="text-[13px] text-muted mt-1">Renews on Oct 12, 2026</p>
            </div>
            <button className="rounded-lg border border-line bg-paper px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-line/50">
              Manage Billing
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
