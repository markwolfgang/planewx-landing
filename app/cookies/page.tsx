import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CookiePrefsLinks } from "@/components/cookie-prefs-links"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Cookie Policy | PlaneWX",
  description: "Cookie and tracking preferences for PlaneWX.",
}

const EFFECTIVE_DATE = "September 27, 2026"

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
            <h1 className="text-4xl font-bold tracking-tight">Cookie &amp; Tracking Policy</h1>
            <p className="text-sm text-white/60">Effective {EFFECTIVE_DATE}</p>
          </div>
        </header>

        <Section title="What We Use">
          <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
            <li>Essential cookies for authentication, session continuity, security, and remembering your cookie choice.</li>
            <li>
              Analytics (Google Analytics and Vercel Analytics) only after you allow Analytics. This helps us
              understand usage to improve PlaneWX.
            </li>
            <li>
              Marketing measurement only after you allow Marketing: Google Ads, Meta Pixel, and Reddit Pixel.
            </li>
            <li>
              Analytics and marketing tags load only on production hostnames{" "}
              <code className="text-sky-300">www.planewx.ai</code> and{" "}
              <code className="text-sky-300">planewx.ai</code>. Preview and local hosts do not load them
              (except a deliberate GA DebugView opt-in with <code className="text-sky-300">?ga_debug=1</code>).
            </li>
            <li>
              Embedded videos: YouTube videos use a click-to-load player on youtube-nocookie.com. The video
              contacts YouTube only after you press play.
            </li>
          </ul>
        </Section>

        <Section title="Managing Preferences">
          <div className="space-y-3 text-sm leading-relaxed text-white/70">
            <p>
              A Cookies &amp; Preferences banner lets you Accept all, choose Essential only, or Manage preferences
              for Analytics and Marketing. Your choice is stored in this browser under the key{" "}
              <code className="text-sky-300">cookie_prefs_v1</code>. Analytics and marketing do not load until you
              allow them, in every region including the United States.
            </p>
            <p>
              Reopen the banner anytime with Cookie settings in the site footer, or use the controls here:{" "}
              <CookiePrefsLinks className="text-sky-400 hover:underline" showDoNotSell />. You can also manage
              cookies via your browser settings. If you block essential storage, login and saved trips may not work.
            </p>
            <p>
              Global Privacy Control (GPC), when signaled by your browser or the Sec-GPC header, keeps Marketing off
              and disables the Marketing toggle. Do not sell or share turns Marketing off and keeps your existing
              Analytics choice (or leaves Analytics off if you have not chosen yet).
            </p>
          </div>
        </Section>

        <Section title="Consent">
          <p className="text-sm leading-relaxed text-white/70">
            Analytics and marketing tags do not load until you make a choice that allows them. Google tags use
            Consent Mode with analytics and ad storage denied by default, then updated from your choice.
            Meta and Reddit scripts load only after Marketing is allowed.
          </p>
        </Section>

        <Section title="Data Retention">
          <p className="text-sm leading-relaxed text-white/70">
            Cookie lifetimes vary by purpose. Essential session cookies typically expire when you log out or after a short period of inactivity.
            Preference and analytics cookies may persist longer to improve your experience. Your preference object stays
            until you clear site data or change it in Cookie settings.
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
