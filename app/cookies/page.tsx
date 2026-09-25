import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CookiePrefsLinks } from "@/components/cookie-prefs-links"

export const metadata = {
  title: "Cookie Policy | PlaneWX",
  description: "How PlaneWX uses cookies and similar technologies on www.planewx.ai.",
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
            <h1 className="text-4xl font-bold tracking-tight">Cookie and Tracking Policy</h1>
            <p className="text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>
          </div>
        </header>

        <Section title="Categories we use on www.planewx.ai">
          <ul className="list-disc space-y-3 pl-6 text-sm leading-relaxed text-white/70">
            <li>
              <strong className="text-white">Essential.</strong> First-party cookies 
              <code className="text-white/80">planewx-variant</code> (homepage variant assignment), 
              <code className="text-white/80">planewx-brand-auth</code> (brand portal auth), 
              <code className="text-white/80">pw_consent_region</code> (consent region from Vercel geo), and 
              <code className="text-white/80">pw_gpc</code> (Global Privacy Control signal). First-party
              localStorage key <code className="text-white/80">cookie_prefs_v1</code> stores your cookie choice
              (with a version field), plus referral codes and UI dismissals. These run so the site and
              consent controls work.
            </li>
            <li>
              <strong className="text-white">Analytics.</strong> Google Analytics (
              <code className="text-white/80">G-FKM0TMPH4M</code>) and Vercel Analytics. Used to understand site
              usage. In strict regions they load only after you allow Analytics (Accept all, or Manage and
              save with Analytics on).
            </li>
            <li>
              <strong className="text-white">Marketing.</strong> Google Ads (
              <code className="text-white/80">AW-18011683791</code>, <code className="text-white/80">AW-18016407179</code>
              ), Meta Pixel (<code className="text-white/80">1236857811920781</code>), and Reddit Pixel (
              <code className="text-white/80">a2_iy53y8iesnik</code>). Used for ad measurement and remarketing.
              These can support cross-context advertising and may count as a &quot;sale&quot; or
              &quot;sharing&quot; under CCPA/CPRA. They load only when Marketing is allowed and Global
              Privacy Control is not on.
            </li>
            <li>
              <strong className="text-white">Embedded third-party.</strong> YouTube videos use a click-to-load
              player on youtube-nocookie.com. The video contact YouTube only after you press play. Inter is
              self-hosted via next/font (no fonts.googleapis.com request at runtime). This site does not load
              a GTM container, PostHog, Calendly, a chat widget, or Vercel Speed Insights.
            </li>
          </ul>
        </Section>

        <Section title="How consent works by region">
          <ul className="list-disc space-y-3 pl-6 text-sm leading-relaxed text-white/70">
            <li>
              <strong className="text-white">EU, UK, EEA, and Switzerland</strong> (and when country cannot be
              determined): non-essential Analytics and Marketing scripts stay blocked until you opt in. The
              banner offers Manage, Essential only, and Accept all with equal button weight. Essential only
              is one click and keeps Analytics and Marketing off.
            </li>
            <li>
              <strong className="text-white">United States and other regions:</strong> a notice banner is
              shown. Analytics may run under the notice model until you choose Essential only. Marketing
              stays off when Global Privacy Control is on (
              <code className="text-white/80">navigator.globalPrivacyControl</code> or the 
              <code className="text-white/80">Sec-GPC</code> request header), or when you choose Do not sell
              or share / turn Marketing off in Manage.
            </li>
            <li>
              Country comes from Vercel request geo (
              <code className="text-white/80">x-vercel-ip-country</code>) only. There is no third-party geo
              lookup. Missing country defaults to the strict opt-in behavior.
            </li>
          </ul>
        </Section>

        <Section title="Do not sell or share">
          <p className="text-sm leading-relaxed text-white/70">
            Because Marketing tools on this site can support cross-context advertising, a 
            <strong className="text-white">Do not sell or share</strong> control is available in the notice
            banner and in the site footer. Choosing it keeps Analytics on (where the notice model allows) and
            turns Marketing off, so Google Ads, Meta Pixel, and Reddit Pixel do not load. Global Privacy
            Control is treated the same way for Marketing.
          </p>
        </Section>

        <Section title="Changing your choice">
          <p className="text-sm leading-relaxed text-white/70 mb-3">
            Use <strong className="text-white">Cookie settings</strong> in the footer on every page to reopen
            the banner, or the controls below. You can also clear site data in your browser, which clears 
            <code className="text-white/80">cookie_prefs_v1</code> and shows the banner again.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <CookiePrefsLinks className="text-sky-400 hover:text-sky-300 underline underline-offset-2" />
          </div>
        </Section>

        <Section title="How long things last">
          <p className="text-sm leading-relaxed text-white/70">
            Consent prefs in <code className="text-white/80">cookie_prefs_v1</code> include a version field so we
            can ask again if categories change. Variant and consent-region cookies are first-party with a
            finite max-age. When Analytics or Marketing is allowed, third-party cookie lifetimes are set by
            those vendors.
          </p>
        </Section>

        <Section title="Contact">
          <p className="text-sm leading-relaxed text-white/70">
            Questions about cookies or tracking: 
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
