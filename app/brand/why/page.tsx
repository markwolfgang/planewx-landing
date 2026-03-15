import {
  Compass,
  AlertTriangle,
  Layers,
  Scale,
  Heart,
  Shield,
  Users,
  Sparkles,
  Cloud,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  Quote,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Why PlaneWX Exists | PlaneWX Brand Portal",
  description:
    "The founder journey, the three problems PlaneWX solves, and the emotional reality of the go/no-go decision.",
}

export default function WhyPlaneWXPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <Compass className="h-4 w-4" />
          Why PlaneWX Exists
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Three WFOs and a Grok Message
        </h1>
        <p className="text-xl text-white/70">
          The origin story, the problems we solve, and the emotional reality
          that drives every design decision.
        </p>
      </section>

      {/* Origin Story */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">The Origin</h2>
        <p className="text-white/60 mb-8">
          How a cross-country flight planning headache became a product.
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-white/80 leading-relaxed text-lg">
              Mark Wolfgang got his pilot&apos;s license, bought a plane, and started
              flying a lot. For a trip from Bentonville, Arkansas to Fremont,
              Nebraska, he needed to understand the weather across 500+ miles of
              airspace. He found the Area Forecast Discussion — a detailed NWS
              narrative covering synoptic patterns out to 7 days.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-white/80 leading-relaxed text-lg">
              The problem: a single WFO only covers its region. For that flight,
              Mark had to read the <strong className="text-white">Tulsa AFD</strong>,
              the <strong className="text-white">Wichita AFD</strong>, and the{" "}
              <strong className="text-white">Omaha AFD</strong> — three dense,
              technical documents updated four to six times daily — then mentally
              synthesize a big-picture weather story across the entire route.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
            <p className="text-white/90 leading-relaxed text-lg">
              He copied the AFDs, pasted them into an AI, and asked:{" "}
              <em className="text-sky-400">
                &quot;I&apos;m flying an SR22 from here to here. Tell me what my
                likelihood of making the trip is.&quot;
              </em>
            </p>
            <p className="text-white/70 mt-4">
              It worked. The AI could parse the meteorological language and provide
              useful synoptic information. That was the moment PlaneWX was born.
              The AFD synthesis became what is now{" "}
              <strong className="text-sky-400">Synoptic Intelligence&trade;</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Problems */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          The Three Problems
        </h2>
        <p className="text-white/60 mb-8">
          Every feature in PlaneWX traces back to one of these.
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-amber-400/80" />
              <h3 className="text-xl font-bold text-white">
                1. The Relevance Problem
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Pull a briefing in ForeFlight for a flight four days out. It still
              shows you currently available METARs and TAFs — data that&apos;s
              irrelevant to your flight timeframe. And it doesn&apos;t show you the
              information that <em>could</em> be relevant: synoptic patterns,
              model guidance, the big-picture weather story. Inside 24 hours,
              existing tools are excellent. Beyond that, pilots are on their own.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-6 w-6 text-sky-400" />
              <h3 className="text-xl font-bold text-white">
                2. The Synthesis Problem
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              There is no shortage of weather information. aviationweather.gov,
              ForeFlight imagery, prog charts — pilots can cycle through 6-hour,
              12-hour, 24-hour, 2-day, 3-day, 4-day views. But nobody helps you{" "}
              <em>analyze</em> it. It&apos;s up to the pilot — who is not a
              meteorologist — to piece together TAFs, AFDs, prog charts, model
              data, PIREPs, and SIGMETs into a coherent picture of what the
              weather will look like along their route, at their altitude, for
              their aircraft.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-violet-500">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="h-6 w-6 text-violet-400" />
              <h3 className="text-xl font-bold text-white">
                3. The Scale Problem
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              A weekend pilot with one trip planned can manage the manual process.
              It&apos;s tedious, but doable. Now consider a professional pilot who
              flies 5&ndash;6 trips per week across multiple aircraft. Monitoring
              weather across all those trips, all those routes, all those time
              frames — manually — is simply impossible to do well. PlaneWX gives
              that pilot an at-a-glance dashboard with WX Scores across all active
              trips.
            </p>
          </div>
        </div>
      </section>

      {/* Emotional Reality */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          The Emotional Reality
        </h2>
        <p className="text-white/60 mb-8">
          The go/no-go decision isn&apos;t just analytical. It carries emotional
          weight that changes everything.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Heart className="h-8 w-8 text-rose-400/80 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Flying Your Family
            </h3>
            <p className="text-white/70 leading-relaxed">
              Mark planned his first long trip — a four-hour VFR flight from
              Arkansas to Florida with his wife. A front had moved through. The
              sky was dark and gray. On radar, there was convection in the general
              direction they needed to go.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              The weight of responsibility was immense. He wasn&apos;t just risking
              his own life — he was carrying his wife. If something happened, both
              families would think he was reckless. He knew the rules: don&apos;t
              fly toward the gray, keep toward the blue, land if needed. But the
              emotional reality of carrying loved ones in a single-engine airplane
              through uncertain weather — that&apos;s what drives PlaneWX&apos;s
              design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Shield className="h-8 w-8 text-amber-400/80 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              The Pressure on Young Pilots
            </h3>
            <p className="text-white/70 leading-relaxed">
              A 22-year-old charter pilot wants to complete the mission, keep the
              boss happy, and not look like a wimp. With PlaneWX Enterprise, the
              chief pilot and scheduling staff see the WX Score days in advance.
              If it&apos;s been sitting at 50% for days, the scheduler can
              proactively call the customer:{" "}
              <em className="text-white/90">
                &quot;It doesn&apos;t look good on Friday. We can get you out
                Thursday night. Does that work?&quot;
              </em>
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              The pilot doesn&apos;t have to take on more risk than he wants. The
              customer still gets where they need to go. Nobody&apos;s pushed
              beyond their limits. PlaneWX gives the organization the visibility
              to make proactive scheduling decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Key Philosophy Quotes */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Product Philosophy
        </h2>
        <p className="text-white/60 mb-8">
          The beliefs behind every design decision.
        </p>
        <div className="space-y-4">
          {[
            {
              quote:
                "PlaneWX doesn't tell you what to do. It tells you what you already decided — before the pressure set in.",
              context: "On personal minimums enforcement",
            },
            {
              quote:
                "The hardest part of flying isn't handling the airplane — it's making the decision to go at all.",
              context: "On the go/no-go decision",
            },
            {
              quote:
                "Other tools show you the weather and let you rationalize. PlaneWX enforces what you decided when you were calm and clear-headed.",
              context: "On the difference between data display and decision support",
            },
            {
              quote:
                "Get-there-itis doesn't just come from you. It comes from family, passengers, and clients.",
              context: "On why Trip Watchers exist",
            },
            {
              quote: "Safety is not a premium feature.",
              context: "On the free plan philosophy",
            },
          ].map((item) => (
            <div
              key={item.quote}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <Quote className="h-5 w-5 text-sky-400/60 mb-3" />
              <p className="text-white/90 text-lg leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="text-white/40 text-sm mt-3">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Three Pillars of Safer Flying
        </h2>
        <p className="text-white/60 mb-8">
          Every feature supports one of three safety pillars. Together, they give
          pilots the tools to make sound, confident decisions.
        </p>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">
                Weather Intelligence
              </h3>
            </div>
            <p className="text-white/70">
              Continuously monitored briefings from federal weather sources,
              personalized to your aircraft and minimums. Synoptic
              Intelligence&trade; synthesizes every available source starting up to
              14 days out.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardCheck className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                PAVE Self-Assessment
              </h3>
            </div>
            <p className="text-white/70">
              Weather is only one part of flight safety. The FAA&apos;s PAVE
              framework — Pilot, Aircraft, enVironment, External pressures —
              structured, timed to departure, and integrated into the briefing.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-violet-500">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-6 w-6 text-violet-400" />
              <h3 className="text-lg font-bold text-white">Peer Mentoring</h3>
            </div>
            <p className="text-white/70">
              No pilot should face a critical go/no-go call alone. Matches you
              with experienced volunteers who see your exact briefing — same WX
              Score, same weather analysis, same personal minimums. The
              conversation starts with real data.
            </p>
          </div>
        </div>
      </section>

      {/* Without / With */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Without PlaneWX vs. With PlaneWX
        </h2>
        <p className="text-white/60 mb-8">
          The tangible difference in a pilot&apos;s workflow.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 font-medium">
                  Without PlaneWX
                </th>
                <th className="text-left py-3 px-4 text-sky-400 font-medium">
                  With PlaneWX
                </th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {[
                [
                  "Read Tulsa AFD, Wichita AFD, Omaha AFD separately",
                  "Synoptic Intelligence synthesizes all WFOs along your route",
                ],
                [
                  "Cycle through prog charts at 6h, 12h, 24h, 2d, 3d, 4d",
                  "Pattern outlook delivered to your inbox, updated automatically",
                ],
                [
                  "Pull a briefing 4 days out — see irrelevant current METARs",
                  "See an outlook calibrated to your flight's timeframe",
                ],
                [
                  "Mentally synthesize dozens of weather products",
                  "AI synthesis against YOUR aircraft and YOUR minimums",
                ],
                [
                  "Face the go/no-go alone on departure morning",
                  "Start the rescheduling conversation days earlier with Trip Watchers",
                ],
                [
                  "Text a friend at 6 AM hoping they're available",
                  "Mentor sees your exact briefing before the conversation",
                ],
                [
                  "Manually check weather across 5\u20136 trips per week",
                  "Dashboard with at-a-glance WX Scores for all active trips",
                ],
              ].map(([without, withPWX], i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white/50">{without}</td>
                  <td className="py-3 px-4 text-white/80">{withPWX}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mentor Origin */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Why Mentoring Exists
        </h2>
        <p className="text-white/60 mb-8">
          The Steamboat Springs crash and the COPA forum response.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <p className="text-white/70 leading-relaxed">
            When an Epic E1000 crashed in Steamboat Springs — a 5,000-hour pilot
            in a $4 million turboprop, killing everyone on board due to poor
            decision-making — the response on the COPA forum was immediate. Someone
            posted about being a mentor. Pilots started posting their phone numbers.
            The community wanted to be there for each other.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            But the process was ad hoc. Texting a friend at 6 AM, hoping they&apos;re
            available, hoping they have relevant experience. PlaneWX&apos;s mentor
            system formalizes this: experienced volunteers who see the exact same
            briefing data, so the conversation starts with real data — not verbal
            descriptions over the phone.
          </p>
        </div>
      </section>

      {/* Audience Profiles */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Who We Serve
        </h2>
        <p className="text-white/60 mb-8">
          PlaneWX isn&apos;t built for one type of pilot.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Users,
              title: "Weekend IFR Pilot",
              desc: "Planning family trips — beach weekends, holidays, special events. Managing commitments, hotel bookings, and family expectations. Needs advance notice to reschedule gracefully.",
            },
            {
              icon: Sparkles,
              title: "Professional Jet Pilot",
              desc: "5\u20136 trips per week across multiple aircraft. Doesn't need help understanding weather — needs help with workload. At-a-glance WX Scores across all active trips.",
            },
            {
              icon: Shield,
              title: "Busy Owner-Pilot",
              desc: "Runs a business or practice. Extremely busy, extremely successful. As PIC, still responsible for weather analysis. Needs two weeks of trips monitored with minimal effort.",
            },
            {
              icon: Scale,
              title: "Part 135 / Charter",
              desc: "Scheduling staff, chief pilots, line pilots. Ops spec minimums, fleet-wide WX Score visibility, proactive rescheduling before pressure reaches the cockpit.",
            },
          ].map((profile) => (
            <div
              key={profile.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <profile.icon className="h-6 w-6 text-sky-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {profile.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {profile.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-wrap gap-4">
        <Link
          href="/brand/social"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors text-sm font-medium"
        >
          Social Media Playbook
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/brand/voice"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          Voice & Tone
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/brand"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
        >
          &larr; Back to Brand Portal
        </Link>
      </section>
    </div>
  )
}
