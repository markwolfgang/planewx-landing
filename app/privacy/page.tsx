import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | PlaneWX",
  description: "Privacy Policy for PlaneWX.",
}

const EFFECTIVE_DATE = "January 5, 2026"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        <header className="space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Privacy Policy</p>
            <h1 className="text-4xl font-bold tracking-tight">PlaneWX Privacy Policy</h1>
            <p className="text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>
          </div>
        </header>

        <section className="space-y-3 text-sm leading-relaxed text-white/70">
          PlaneWX, LLC (&quot;PlaneWX,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) values your privacy. This Privacy
          Policy explains how we collect, use, share, and protect information when you use our website, applications, and services
          (the &quot;Services&quot;). By using the Services, you agree to this Policy. If you do not agree, do not use the Services.
        </section>

        <Section title="1. Information We Collect">
          <ul className="list-disc space-y-2 pl-6">
            <li>Account info: name, email, password (hashed), and profile details you provide.</li>
            <li>Flight planning inputs: routes, airports, times, aircraft details, personal minimums.</li>
            <li>Device and usage: IP address, browser/user agent, device identifiers, log data, cookies, analytics events, and interaction data.</li>
            <li>Payment info: handled by our payment processor; we receive limited billing metadata (e.g., subscription status, last 4 of card, expiration month/year).</li>
            <li>Communications: support requests, feedback, and correspondence.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>Provide and improve the Services, including weather intelligence and alerts.</li>
            <li>Personalize experiences (e.g., aircraft-specific minimums, saved routes).</li>
            <li>Maintain security, prevent fraud/abuse, and enforce policies.</li>
            <li>Communicate about service updates, billing, and support.</li>
            <li>Conduct analytics, research, and product development.</li>
            <li>Comply with legal obligations and respond to lawful requests.</li>
          </ul>
        </Section>

        <Section title="3. Legal Bases (if applicable)">
          <ul className="list-disc space-y-2 pl-6">
            <li>Performance of a contract (providing the Services you request).</li>
            <li>Legitimate interests (service improvement, security, fraud prevention, analytics).</li>
            <li>Consent (where required, e.g., marketing emails or certain cookies).</li>
            <li>Legal obligations (tax, accounting, regulatory compliance).</li>
          </ul>
        </Section>

        <Section title="4. How We Share Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>Service providers: hosting, analytics, email, payments, support tools—only as needed to operate the Services.</li>
            <li>Legal and safety: to comply with law, protect rights, safety, and security.</li>
            <li>Business transfers: in connection with mergers, acquisitions, financing, or asset sales.</li>
            <li>With your direction: for example, when sharing trips with watchers/crew.</li>
            <li>We do not sell personal information.</li>
          </ul>
        </Section>

        <Section title="5. Cookies and Tracking">
          <p className="text-sm leading-relaxed text-white/70">
            We use cookies and similar technologies for authentication, preferences, and analytics. Where required, we will request consent.
            You can manage cookies through your browser settings, but core functionality may be impacted.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p className="text-sm leading-relaxed text-white/70">
            We retain information for as long as needed to provide the Services, comply with legal obligations, resolve disputes, and enforce
            agreements. We may anonymize or aggregate data for longer-term use.
          </p>
        </Section>

        <Section title="7. Security">
          <p className="text-sm leading-relaxed text-white/70">
            We use reasonable administrative, technical, and physical safeguards to protect information. No method of transmission or storage
            is 100% secure.
          </p>
        </Section>

        <Section title="8. Your Choices">
          <ul className="list-disc space-y-2 pl-6">
            <li>Account settings: update or delete certain info in your profile.</li>
            <li>Emails: opt out of marketing via email footer; transactional/service emails will still be sent.</li>
            <li>Cookies: manage via browser or consent tools (where provided).</li>
          </ul>
        </Section>

        <Section title="9. Regional Rights (if applicable)">
          <p className="text-sm leading-relaxed text-white/70">
            Depending on your region (e.g., EU/UK/California), you may have rights to access, correct, delete, or request a copy of your data,
            and to object or restrict certain processing. To exercise rights, contact privacy@planewx.ai. We may need to verify your identity.
          </p>
        </Section>

        <Section title="10. International Transfers">
          <p className="text-sm leading-relaxed text-white/70">
            We may process and store information in the United States and other countries. Where required, we will use appropriate safeguards
            (e.g., Standard Contractual Clauses) for cross-border transfers.
          </p>
        </Section>

        <Section title="11. Children">
          <p className="text-sm leading-relaxed text-white/70">
            The Services are not directed to children under 13 (or under 16 where applicable). Do not use the Services if you are under the
            applicable age. If we learn we have collected data from a child, we will delete it.
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p className="text-sm leading-relaxed text-white/70">
            We may update this Policy. The &quot;Effective&quot; date will change. Where required, we will provide notice or request consent.
            Continued use after changes means you accept the updated Policy.
          </p>
        </Section>

        <Section title="13. Contact">
          <p className="text-sm leading-relaxed text-white/70">
            Questions about this Policy? Contact us at <a href="mailto:privacy@planewx.ai" className="text-sky-400 hover:underline">privacy@planewx.ai</a>.
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="text-sm leading-relaxed text-white/70">{children}</div>
    </section>
  )
}

