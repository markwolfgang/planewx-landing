import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Cookie Policy | PlaneWX",
  description: "Cookie and tracking preferences for PlaneWX.",
}

const EFFECTIVE_DATE = "January 5, 2026"

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

        <Section title="What We Use">
          <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
            <li>Essential cookies for authentication, session continuity, and security.</li>
            <li>Preference cookies to remember settings (theme, recent routes) where applicable.</li>
            <li>Analytics to understand usage and improve the product (aggregated where possible).</li>
            <li>No marketing/ads trackers are planned at this time; if added, we will update and request consent where required.</li>
          </ul>
        </Section>

        <Section title="Managing Preferences">
          <p className="text-sm leading-relaxed text-white/70">
            You can manage cookies via your browser settings. Where required (e.g., EU/UK), we will present a consent banner to accept or
            decline non-essential cookies. If you block cookies, some features (login, saved trips) may not work.
          </p>
        </Section>

        <Section title="Regional Consent">
          <p className="text-sm leading-relaxed text-white/70">
            If you are in a region that requires consent for analytics/marketing cookies, we will request consent before setting them. You can
            change your choice anytime via the banner (when shown) or by clearing cookies and reloading.
          </p>
        </Section>

        <Section title="Data Retention">
          <p className="text-sm leading-relaxed text-white/70">
            Cookie lifetimes vary by purpose. Essential session cookies typically expire when you log out or after a short period of inactivity.
            Preference and analytics cookies may persist longer to improve your experience.
          </p>
        </Section>

        <Section title="Contact">
          <p className="text-sm leading-relaxed text-white/70">
            Questions about cookies or tracking? Contact us at <a href="mailto:privacy@planewx.ai" className="text-sky-400 hover:underline">privacy@planewx.ai</a>.
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

