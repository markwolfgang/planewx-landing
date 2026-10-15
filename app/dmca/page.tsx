import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "DMCA / Copyright | PlaneWX",
  description: "Designated copyright agent and DMCA notice process for PlaneWX.",
}

export default function DmcaPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">Copyright</p>
            <h1 className="text-4xl font-bold tracking-tight">DMCA / Copyright Agent</h1>
            <p className="text-sm text-white/60">
              How to notify PlaneWX of alleged copyright infringement
            </p>
          </div>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            PlaneWX, LLC respects the intellectual property rights of others and expects users of the PlaneWX
            website, applications, and services (the &quot;Services&quot;) to do the same. If you believe that
            material available on or through the Services infringes your copyright, you may send a notice to our
            designated copyright agent as described below.
          </p>
        </section>

        <Section title="Designated Copyright Agent">
          <div className="space-y-3 text-sm leading-relaxed text-white/70">
            <p>Notices of claimed copyright infringement should be sent to:</p>
            <p className="text-white/90">
              PlaneWX, LLC
              <br />
              Attn: Copyright Agent
              <br />
              7901 4th St N, Ste 300
              <br />
              St. Petersburg, FL 33702
            </p>
            <p>
              Email:{" "}
              <a href="mailto:dmca@planewx.ai" className="text-sky-400 hover:underline">
                dmca@planewx.ai
              </a>
            </p>
            <p>
              Prefer email for the fastest handling. Postal mail is also accepted at the address above.
            </p>
          </div>
        </Section>

        <Section title="What to Include in a Notice">
          <p className="text-sm leading-relaxed text-white/70 mb-3">
            To help us review your notice under 17 U.S.C. §512, please include all of the following:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/70">
            <li>
              A physical or electronic signature of a person authorized to act on behalf of the owner of the
              exclusive right that is allegedly infringed.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been infringed, or, if multiple works are
              covered by a single notice, a representative list of such works.
            </li>
            <li>
              Identification of the material that is claimed to be infringing or to be the subject of
              infringing activity, and information reasonably sufficient to permit us to locate the material
              (for example, a URL or clear description of where it appears in the Services).
            </li>
            <li>
              Information reasonably sufficient to permit us to contact you, such as an address, telephone
              number, and email address.
            </li>
            <li>
              A statement that you have a good-faith belief that use of the material in the manner complained
              of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notice is accurate, and under penalty of perjury, that
              you are authorized to act on behalf of the owner of the exclusive right that is allegedly
              infringed.
            </li>
          </ul>
        </Section>

        <Section title="Counter-Notification">
          <p className="text-sm leading-relaxed text-white/70">
            If your material was removed or disabled as a result of a copyright notice and you believe the
            removal or disablement was a mistake or misidentification, you may send a counter-notification to
            the same designated agent. Include your contact information, identification of the material and
            where it appeared before removal, a statement under penalty of perjury that you have a good-faith
            belief the material was removed or disabled as a result of mistake or misidentification, consent to
            the jurisdiction of the federal district court for your address (or for St. Petersburg, Florida if
            outside the United States), and your physical or electronic signature.
          </p>
        </Section>

        <Section title="Repeat Infringers">
          <p className="text-sm leading-relaxed text-white/70">
            PlaneWX may terminate accounts of users who are repeat infringers in appropriate circumstances.
          </p>
        </Section>

        <Section title="Related Terms">
          <p className="text-sm leading-relaxed text-white/70">
            This page is part of how we handle copyright claims for the Services. See also our{" "}
            <Link href="/terms" className="text-sky-400 hover:underline">
              Terms of Service
            </Link>
            , including the DMCA / Copyright Agent section.
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
      <div>{children}</div>
    </section>
  )
}
