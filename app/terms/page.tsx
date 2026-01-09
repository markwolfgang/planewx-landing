import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | PlaneWX",
  description: "Terms of Service for using PlaneWX.",
}

const EFFECTIVE_DATE = "January 5, 2026"

export default function TermsOfServicePage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Terms of Service</p>
            <h1 className="text-4xl font-bold tracking-tight">PlaneWX Terms of Service</h1>
            <p className="text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>
          </div>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            Welcome to PlaneWX. These Terms of Service (&quot;Terms&quot;) form a binding agreement between you and PlaneWX, LLC
            (&quot;PlaneWX,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your use of the PlaneWX website,
            applications, and services (the &quot;Services&quot;). By creating an account, accessing, or using the Services,
            you agree to these Terms. If you do not agree, do not use the Services.
          </p>
        </section>

        <Section title="1. Eligibility and Accounts">
          <ul className="list-disc space-y-2 pl-6">
            <li>You must be able to form a binding contract and be at least the age of majority where you live.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</li>
            <li>Provide accurate information and keep it updated.</li>
          </ul>
        </Section>

        <Section title="2. Service Description and Aviation-Specific Disclaimers">
          <ul className="list-disc space-y-2 pl-6">
            <li>PlaneWX is an advisory and planning tool. It is <strong className="text-white">not</strong> an official weather briefing and is <strong className="text-white">not</strong> FAA-approved for primary flight planning, dispatch, or navigation.</li>
            <li>You must obtain an official FAA/NWS weather briefing (e.g., 1800wxbrief.com or FSS) before every flight and comply with all applicable regulations, including FAR 91.103.</li>
            <li>All operational decisions remain your responsibility as Pilot in Command (PIC). Use the Services at your own risk.</li>
            <li>Weather data can be delayed, incomplete, or incorrect. Alerts and notifications may be late or fail to send.</li>
            <li>Do not use the Services for real-time tactical avoidance or life-safety-critical decision making.</li>
            <li>Experimental/beta features may be inaccurate, incomplete, or withdrawn at any time.</li>
          </ul>
        </Section>

        <Section title="3. Acceptable Use">
          <ul className="list-disc space-y-2 pl-6">
            <li>No unlawful, unsafe, or misleading use; no use that would violate aviation regulations.</li>
            <li>No scraping, reverse engineering (except as permitted by law), or circumvention of security.</li>
            <li>No reselling or offering the Services to third parties without our written consent.</li>
            <li>No interference with the Services or other users.</li>
          </ul>
        </Section>

        <Section title="4. Subscriptions, Billing, and Trials">
          <ul className="list-disc space-y-2 pl-6">
            <li>Paid plans auto-renew until canceled. You can cancel in-app; cancellations take effect at the end of the current billing period.</li>
            <li>Fees are stated before purchase and may change; we will provide notice of changes where required.</li>
            <li>Trials, discounts, and promotional offers are time-limited and subject to posted terms. Abuse may result in termination.</li>
            <li>Taxes may apply based on your location.</li>
          </ul>
        </Section>

        <Section title="5. Content and Ownership">
          <ul className="list-disc space-y-2 pl-6">
            <li>We own the Services, including all software, data compilations, and branding. We grant you a limited, revocable, non-transferable license to use the Services for your personal or internal business aviation planning.</li>
            <li>You retain rights to your submitted content; you grant us a non-exclusive license to use it to operate and improve the Services.</li>
            <li>Feedback you provide may be used without restriction or obligation.</li>
          </ul>
        </Section>

        <Section title="6. Third-Party Services and Data">
          <ul className="list-disc space-y-2 pl-6">
            <li>We rely on third-party data sources (e.g., NWS/NOAA, FAA) and service providers. We do not control their availability, accuracy, or performance.</li>
            <li>Links to third-party services are provided for convenience; those services are governed by their own terms.</li>
          </ul>
        </Section>

        <Section title="7. Availability and Support">
          <ul className="list-disc space-y-2 pl-6">
            <li>The Services may experience outages, maintenance windows, data gaps, or delays.</li>
            <li>Support is provided on a commercially reasonable basis; no SLA is promised unless we agree in writing.</li>
          </ul>
        </Section>

        <Section title="8. Termination">
          <ul className="list-disc space-y-2 pl-6">
            <li>You may stop using the Services at any time. Cancel subscriptions to avoid renewal charges.</li>
            <li>We may suspend or terminate access for violations of these Terms, unsafe use, or to protect the Service or other users.</li>
          </ul>
        </Section>

        <Section title="9. Disclaimers">
          <ul className="list-disc space-y-2 pl-6">
            <li>THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</li>
            <li>We do not warrant accuracy, timeliness, completeness, or reliability of any weather data, alerts, or outputs.</li>
          </ul>
        </Section>

        <Section title="10. Limitation of Liability">
          <ul className="list-disc space-y-2 pl-6">
            <li>TO THE MAXIMUM EXTENT PERMITTED BY LAW, PLANEWX, LLC WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY.</li>
            <li>Our total liability arising out of or relating to the Services is limited to the greater of (a) the amounts you paid to PlaneWX for the Services in the six (6) months before the claim, or (b) $100.</li>
          </ul>
        </Section>

        <Section title="11. Indemnification">
          <p className="text-sm leading-relaxed text-white/70">
            You will defend and indemnify PlaneWX, LLC and its officers, employees, and contractors from claims arising out of your use of the
            Services, violation of these Terms, or violation of law.
          </p>
        </Section>

        <Section title="12. Changes to the Services or Terms">
          <ul className="list-disc space-y-2 pl-6">
            <li>We may modify or discontinue features at any time.</li>
            <li>We may update these Terms. When we do, we will post the new date above and, where required, request your consent. Continued use after changes means you accept the updated Terms.</li>
          </ul>
        </Section>

        <Section title="13. Governing Law and Venue">
          <p className="text-sm leading-relaxed text-white/70">
            These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. All disputes will
            be resolved exclusively in the state or federal courts located in Delaware, and you consent to personal jurisdiction there.
          </p>
        </Section>

        <Section title="14. Export and Compliance">
          <p className="text-sm leading-relaxed text-white/70">
            You must comply with all applicable export control and sanctions laws. You may not use the Services if you are barred from receiving
            them under US or other applicable laws.
          </p>
        </Section>

        <Section title="15. Privacy">
          <p className="text-sm leading-relaxed text-white/70">
            Please see our <Link href="/privacy" className="text-sky-400 hover:underline">Privacy Policy</Link> to learn how we collect, use, and share information. By using the Services, you consent
            to those practices.
          </p>
        </Section>

        <Section title="16. Contact">
          <p className="text-sm leading-relaxed text-white/70">
            Questions about these Terms? Contact us at <a href="mailto:contact@planewx.ai" className="text-sky-400 hover:underline">contact@planewx.ai</a>.
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

