import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CookiePrefsLinks } from "@/components/cookie-prefs-links"

export const metadata = {
  title: "Cookie Policy | PlaneWX",
  description: "Cookie and tracking preferences for PlaneWX.",
}

const EFFECTIVE_DATE = "September 25, 2026"

export default function CookiesPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Cookie Policy</p>
            <h1 className="text-4xl font-bold tracking-tight">Cookie & Tracking Policy</h1>
            <p className="text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>
          </div>
        </header>

        <Section title="What We Use on www.planewx.ai">
          <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
            <li>
              <strong className="text-white">Essential:</strong> first-party cookies for A/B variant assignment (
              <code className="text-white/80">planewx-variant</code>), brand-portal auth (
              <code className="text-white/80">planewx-brand-auth</code>), consent region (
              <code className="text-white/80">pw_consent_region</code>), GPC signal (
              <code className="text-white/80">pw_gpc</code>), and first-party localStorage for consent prefs (
              <code className="text-white/80">cookie_prefs_v1</code>), referral codes, and UI dismissals.
            </li>
            <li>
              <strong className="text-white">Analytics (optional):</strong> Google Analytics (
              <code className="text-white/80">G-FKM0TMPH4M</code>) and Vercel Analytics.
            </li>
            <li>
              <strong className="text-white">Marketing (optional):</strong> Google Ads (
              <code className="text-white/80">AW-18011683791</code>, <code className="text-white/80">AW-18016407179</code>
              ), Meta Pixel (<code className="text-white/80">1236857811920781</code>), and Reddit Pixel (
              <code className="text-white/80">a2_iy53y8iesnik</code>). These can support cross-context advertising and may count as a
              &quot;sale&quot; or &quot;sharing&quot; under CCPA/CPRA.
            </li>
            <li>
              <strong className="text-white">Embedded third-party:</strong> YouTube embeds load only after you press play, via
              youtube-nocookie.com. An unused Soro blog embed script exists in the codebase and is gated the same way if mounted.
            </li>
            <li>
              Inter is self-hosted by next/font (no fonts.googleapis.com request at runtime). No GTM container, PostHog, Calendly,
              chat widget, or Speed Insights on this site today.
            </li>
          </ul>
        </Section>

        <Section title="Managing Preferences">
          <p className="text-sm leading-relaxed text-white/70 mb-3">
            Use the on-site controls below, or your browser settings. Blocking essential storage can break variant assignment and
            preference memory.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <CookiePrefsLinks className="text-sky-400 hover:text-sky-300 underline underline-offset-2" />
          </div>
        </Section>

        <Section title="Regional Consent">
          <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
            <li>
              <strong className="text-white">EU, UK, EEA, Switzerland:</strong> non-essential analytics and marketing scripts stay
              blocked until you opt in. Equal-prominence Accept all and Essential only; Manage for per-category choice.
            </li>
            <li>
              <strong className="text-white">US and elsewhere:</strong> a notice is shown. Global Privacy Control (navigator and
              Sec-GPC) is treated as an opt-out of marketing / sale-or-share scripts. A Do not sell or share control is available
              because marketing pixels are present.
            </li>
            <li>
              If geo detection is missing, we default to the strict (opt-in) behavior. Country comes from Vercel request geo only
              (no third-party geo API).
            </li>
          </ul>
        </Section>

        <Section title="Data Retention">
          <p className="text-sm leading-relaxed text-white/70">
            Consent prefs live in first-party localStorage with a version field so we can ask again if categories change. Variant and
            consent-region cookies are first-party with finite max-age. Third-party cookie lifetimes are controlled by those vendors
            when you allow marketing or analytics.
          </p>
        </Section>

        <Section title="Contact">
          <p className="text-sm leading-relaxed text-white/70">
            Questions about cookies or tracking? Contact us at{" "}
            <a href="mailto:privacy@planewx.ai" className="text-sky-400 hover:underline">
              privacy@planewx.ai
            </a>
            .
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
