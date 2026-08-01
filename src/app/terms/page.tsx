import { Navbar } from "@/components/landing/Navbar";
import { CtaAndFooter } from "@/components/landing/CtaAndFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-emerald/20">
      <Navbar />
      
      <main className="mx-auto max-w-[800px] px-6 py-20 md:py-32">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-12">
          <h1 className="mb-8 font-display text-[32px] font-bold tracking-tight text-ink">
            Blazly Terms and Conditions
          </h1>
          
          <div className="space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Blazly AI, ("Blazly AI", "us", "we", or "our") operates the Blazly SEO & Blazly GEO application (the "Service").
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and our Privacy Policy. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">1. Account Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must provide accurate, complete, and current information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account and password.</li>
              <li>You are responsible for all content and activity under your account.</li>
              <li>You may not use the Service for any illegal purposes or to violate any laws.</li>
              <li>You must be a human and at least 18 years old to use this Service.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">2. Payment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>For paid services, payment is required in advance to maintain access.</li>
              <li>If payment is not received, your account may be frozen or queued for cancellation.</li>
              <li>All fees are exclusive of taxes, which are your responsibility.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">3. Cancellation and Refund</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for properly canceling your account through our designated cancellation process.</li>
              <li>Upon cancellation, your data will become inaccessible immediately and will be permanently deleted within 30 days.</li>
              <li>We reserve the right to suspend or terminate accounts for any reason, at any time.</li>
              <li>Abuse of Blazly employees or excessive usage may result in account termination.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">4. Modifications to the Service and Prices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We reserve the right to modify or discontinue the Service at any time.</li>
              <li>Prices are subject to change upon notice.</li>
              <li>We shall not be liable for any modification, price change, suspension, or discontinuance of the Service.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">5. Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The Service and its original content remain the exclusive property of Blazly AI.</li>
              <li>Our trademarks may not be used without prior written consent.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">6. User Content</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for the content you post on the Service.</li>
              <li>By posting content, you grant us the right to use, modify, and distribute it within the Service.</li>
              <li>You retain all rights to your content.</li>
              <li>We reserve the right to remove any content at our discretion.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">7. Links to Other Websites</h2>
            <p>We are not responsible for third-party websites linked to or from our Service.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Blazly AI from any claims resulting from your use of the Service or violation of these Terms.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">9. Limitation of Liability</h2>
            <p>Blazly AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">10. Disclaimer</h2>
            <p>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">11. Governing Law</h2>
            <p>These Terms shall be governed by the laws of India, without regard to its conflict of law provisions.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">12. Changes to Terms</h2>
            <p>We may revise these Terms at any time. We will provide notice of material changes. Your continued use of the Service after changes constitutes acceptance of the updated Terms.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">13. Data Protection and Privacy</h2>
            <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">14. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Service to violate any laws or regulations.</li>
              <li>Infringe on intellectual property rights.</li>
              <li>Transmit any malicious code or interfere with the Service's functionality.</li>
              <li>Attempt to gain unauthorized access to the Service or its related systems.</li>
            </ul>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">15. Support and Maintenance</h2>
            <p>We will provide reasonable technical support for the Service and will use commercially reasonable efforts to make the Service available 24/7, except for planned downtime.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">16. Feedback</h2>
            <p>Any feedback you provide about the Service is considered non-confidential and non-proprietary, and we may use it without any obligation to you.</p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">17. Entire Agreement</h2>
            <p>These Terms constitute the entire agreement between you and Blazly AI regarding the Service, superseding any prior agreements.</p>
            
            <p className="mt-8">
              This Terms of Service document provides a comprehensive framework for Blazly relationship with its users. You may want to adjust specific clauses based on Blazly's particular features, business model, and legal requirements in your jurisdiction. It's advisable to have this document reviewed by a legal professional before publication.
            </p>

            <p className="mt-8">
              If you have any questions about these Terms of Service, please contact our support team at <a href="mailto:srijita@blazly.ai" className="text-emerald hover:underline">srijita@blazly.ai</a>
            </p>
          </div>
        </div>
      </main>

      <CtaAndFooter />
    </div>
  );
}
