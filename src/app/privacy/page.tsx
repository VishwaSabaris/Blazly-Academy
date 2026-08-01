import { Navbar } from "@/components/landing/Navbar";
import { CtaAndFooter } from "@/components/landing/CtaAndFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-emerald/20">
      <Navbar />
      
      <main className="mx-auto max-w-[800px] px-6 py-20 md:py-32">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-12">
          <h1 className="mb-8 font-display text-[32px] font-bold tracking-tight text-ink">
            Blazly Privacy Policy
          </h1>
          
          <div className="space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Blazly AI ("Blazly AI", "us", "we", or "our") operates the Blazly SEO & Blazly GEO application (the "Service"). This Policy applies to our Services and explains the following:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>What information we collect from you when you use the Service</li>
              <li>How we may use and share this information</li>
              <li>The security measures we use to protect your information</li>
            </ul>

            <p>
              We will not use or share your personal information with anyone except as described in this Privacy Policy. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">Information We Collect and Use</h2>
            
            <p>
              <strong>Information You Provide:</strong> When you register for an account with Blazly, you provide us with information such as your name and email address. We may use your email address to send you Service-related notices. You can opt out of these messages by following the instructions provided in the message.
            </p>
            
            <p>
              <strong>Payment Information:</strong> If you sign up for a paid subscription, your credit card information is processed by a third-party payment processor and never passes through our servers.
            </p>
            
            <p>
              <strong>Content:</strong> The content you post to the Service may be viewed by other users according to your settings. Blazly employees, contractors, or agents will not view your content except: (i) to maintain, provide or improve the Service; (ii) to assist with support requests; (iii) to ensure compliance with our Terms of Service; (iv) to comply with legal obligations; or (v) as otherwise described in this Privacy Policy.
            </p>
            
            <p>
              <strong>Cookies:</strong> We use cookies to identify your browser and enhance your navigation through our Service. You can control cookie settings in your web browser, but some features of the Service may not function properly if cookies are disabled.
            </p>
            
            <p>
              <strong>Usage Data:</strong> Our servers automatically record certain information sent by your web browser, including IP address, browser type, pages viewed, and interaction with the Service.
            </p>
            
            <p>
              <strong>Third-Party Tools:</strong> We use third-party tools for customer support and analytics. These tools may collect information as sent by your browser, including cookies and your IP address.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">How We Share Your Information</h2>
            
            <p>
              <strong>Service Providers and Business Partners:</strong> We may share your information with third parties who provide services to support our operations. These third parties are bound by terms similar to this Privacy Policy.
            </p>
            
            <p>
              <strong>Legal Compliance:</strong> We may disclose your personal information if required by law or if we believe it's necessary to comply with a legal request, protect safety, address fraud, or protect our rights or property.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">How We Protect Your Information</h2>
            
            <p>
              We implement industry-standard security measures to protect your personal information, including regular data backups, firewalls, and hosting in secure data centers. However, no method of electronic transmission or storage is 100% secure.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">Data Retention</h2>
            
            <p>
              We retain your information as long as your account is active or as needed to provide you services. We may retain certain data as necessary to prevent fraud or future abuse, or for legitimate business purposes, such as analysis of aggregated, non-personally-identifiable data, account recovery, or if required by law.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">Your Choices About Your Information</h2>
            
            <p>
              You can update or correct your account information at any time by logging into your account. You may request that your personal information be erased from our systems, subject to certain limitations. Some data deletion requests may result in the closure of your account if the data is necessary for the Service to function.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">Children's Privacy</h2>
            
            <p>
              Our Service is not directed to persons under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">International Data Transfers</h2>
            
            <p>
              If you are using our Service from outside United States, please be aware that your information may be transferred to, stored, and processed in the United States servers where our servers are located.
            </p>

            <h2 className="mt-8 mb-4 text-[22px] font-semibold text-ink">Changes to Our Privacy Policy</h2>
            
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <p>
              This privacy policy is designed to be clear and comprehensive while addressing the key points typically covered in a SaaS platform's privacy policy. You may want to tailor this further based on Blazly's specific features, data handling practices, and any applicable regional regulations.
            </p>

            <p className="mt-8">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:srijita@blazly.ai" className="text-emerald hover:underline">srijita@blazly.ai</a>
            </p>
          </div>
        </div>
      </main>

      <CtaAndFooter />
    </div>
  );
}
