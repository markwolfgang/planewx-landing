import {
  MessageSquare,
  Target,
  Share2,
  MessageCircle,
  Hash,
  Ban,
  Rss,
  Shield,
  Building2,
  Users,
  Search,
  Lock,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Social Media Playbook | PlaneWX Brand Portal",
  description:
    "PlaneWX social media guidelines, content pillars, platform guidance, and response templates for partners and content creators.",
}

export default function SocialMediaPlaybookPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <MessageSquare className="h-4 w-4" />
          Social Media Playbook
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Social Media Playbook
        </h1>
        <p className="text-xl text-white/70">
          A comprehensive guide for partners and content creators. Use these
          pillars, formats, and response guidelines to share PlaneWX authentically.
        </p>
      </section>

      {/* 1. Content Pillars */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Content Pillars
        </h2>
        <p className="text-white/60 mb-8">
          Six core themes that define how we talk about PlaneWX. Use these as
          anchors for posts, reels, and conversations.
        </p>
        <div className="space-y-4">
          {[
            {
              num: 1,
              title: "Decide Before the Pressure Starts",
              desc: "The safest decision is the one you make before the pressure is on.",
            },
            {
              num: 2,
              title: "Synthesis, Not Display",
              desc: "Every EFB shows raw METARs. We show what they mean for YOUR flight.",
            },
            {
              num: 3,
              title: "Your Aircraft. Your Minimums. Your Score.",
              desc: "Your SR22T has different limits than a rental 172.",
            },
            {
              num: 4,
              title: "PAVE, Operationalized",
              desc: "The FAA's own framework, pre-filled from your actual trip data.",
            },
            {
              num: 5,
              title: "Built by Pilots, for Pilots",
              desc: "We built the tool we needed and couldn't find. 500+ pilots are using it now.",
            },
            {
              num: 6,
              title: "Multi-Model Consensus",
              desc: "HRRR, GFS, and ECMWF. Three models. Multiple waypoints. One consensus — with explicit confidence scoring.",
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4 items-start"
            >
              <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm flex items-center justify-center">
                {pillar.num}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {pillar.title}
                </h3>
                <p className="text-white/70">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Platform-Specific Guidance */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Platform-Specific Guidance
        </h2>
        <p className="text-white/60 mb-8">
          Tailor your approach by platform. Each audience expects a different tone.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Share2 className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Facebook (pilot groups)
            </h3>
            <p className="text-white/70 leading-relaxed">
              Peer-to-peer. Share like a fellow pilot who found something useful.
              Lead with the scenario, not the product. Don&apos;t hard sell.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Target className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">LinkedIn</h3>
            <p className="text-white/70 leading-relaxed">
              Professional but pilot-authentic. Share insights about aviation
              weather decision-making, founder journey, product milestones.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <MessageCircle className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Aviation forums (COPA, ABS, Beechtalk, PoA)
            </h3>
            <p className="text-white/70 leading-relaxed">
              Lead with knowledge and helpfulness. Earn trust through expertise,
              not promotion.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Creator Translation Guide */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Creator Translation Guide
        </h2>
        <p className="text-white/60 mb-8">
          A simple formula for most content, plus format-specific guidance.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Content Formula
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <strong className="text-white">Problem:</strong> The late, loaded
                decision
              </li>
              <li>
                <strong className="text-white">Shift:</strong> Move the call
                earlier
              </li>
              <li>
                <strong className="text-white">Role:</strong> PlaneWX organizes
                the picture
              </li>
              <li>
                <strong className="text-white">Proof:</strong> 14-day planning +
                PAVE + model consensus
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Format-Specific Guidance
            </h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <strong className="text-white">For reels:</strong> Lead with the
                pain of late decisions, not generic weather visuals.
              </li>
              <li>
                <strong className="text-white">For captions:</strong> One message,
                one proof point, one takeaway.
              </li>
              <li>
                <strong className="text-white">For founder content:</strong>{" "}
                Speak like a pilot solving a real pilot problem — not like a
                startup founder pitching software.
              </li>
              <li>
                <strong className="text-white">For comments:</strong> Clarify,
                stay calm, never get defensive.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Recurring Content Formats */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Recurring Content Formats
        </h2>
        <p className="text-white/60 mb-8">
          Proven formats that resonate with pilot audiences.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "One-minute founder monologue",
            "Weather case-study carousel",
            '"Should you go?" scenario breakdown',
            "Mentor clip",
            "Planning-week update",
          ].map((format, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-white/90 font-medium">{format}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Response Guidelines */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Response Guidelines
        </h2>
        <p className="text-white/60 mb-8">
          How to answer common questions and comments. Use these verbatim or adapt
          as needed.
        </p>
        <div className="space-y-4">
          {[
            {
              q: "How is this different from ForeFlight?",
              a: "ForeFlight and Garmin Pilot excel within 24 hours. We fill the gap beyond that — and provide aircraft-specific analysis that goes further than basic personal minimums. We complement, never replace.",
            },
            {
              q: "Is this an official briefing?",
              a: "PlaneWX provides weather intelligence from multiple authoritative sources to help pilots meet their planning requirements. The pilot-in-command always makes the final call per 14 CFR §91.3.",
            },
            {
              q: "What about accuracy?",
              a: "Weather forecasts become more reliable closer to departure. PlaneWX starts monitoring 14 days out and increases update frequency as your flight approaches. We use three independent weather models (HRRR, GFS, ECMWF) and show you where they agree and where they don't.",
            },
            {
              q: "I don't need this, I can read a TAF.",
              a: "If you're comfortable synthesizing METARs, TAFs, PIREPs, SIGMETs, model data, and NWS forecaster narratives across your entire route, matched to your specific aircraft capabilities and personal minimums — great. PlaneWX does that work for you, starting 14 days out.",
            },
            {
              q: "This is just for inexperienced pilots, right?",
              a: "We have 120+ jet pilots and 51 ATPs on the platform. For experienced pilots, it's not a knowledge problem — it's a workload problem. A professional flying 5-6 trips a week can't manually monitor weather across all of them. PlaneWX gives them at-a-glance WX Scores for every active trip.",
            },
            {
              q: "Someone mentions a competitor negatively",
              a: "Never pile on. Redirect: \"Different tools serve different needs. We focus on the planning phase that comes before the operational briefing.\"",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-sky-400 font-medium mb-2">{item.q}</p>
              <p className="text-white/80 leading-relaxed">&ldquo;{item.a}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Approved Social Proof */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Approved Social Proof
        </h2>
        <p className="text-white/60 mb-8">
          Stats to cite. All numbers backed by production data (March 2026).
        </p>

        <h3 className="text-lg font-semibold text-white mb-4">
          Community Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { value: "600+", label: "pilots" },
            { value: "1.1M+", label: "cumulative hours" },
            { value: "85%", label: "instrument rated" },
            { value: "120+", label: "jet aircraft" },
            { value: "102", label: "aircraft types" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-sky-400">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-white mb-4">
          Safety Impact (177 post-flight surveys)
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { value: "28 pilots", desc: "said PlaneWX gave them permission to cancel a flight they might have otherwise attempted" },
            { value: "92%", desc: "of pilots who flew said the WX Score was accurate or conservative — only 8% said conditions were worse than predicted" },
            { value: "3.4 days", desc: "average planning horizon — pilots are using PlaneWX for advance planning, not day-of" },
            { value: "8.3 briefings", desc: "per trip on average — pilots check back repeatedly as departure approaches" },
          ].map((stat) => (
            <div
              key={stat.value}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="text-xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <p className="text-white/60 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-white/80 text-sm">
            <strong className="text-amber-400/90">Usage guidelines:</strong> Lead
            with the &quot;28 pilots&quot; stat for safety messaging, community
            stats for credibility, and 3.4-day planning horizon for the advance
            planning value prop. Always cite &quot;from post-flight feedback&quot;
            for the safety numbers.
          </p>
        </div>
      </section>

      {/* 7. Hashtag & Tagging */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Hashtag & Tagging
        </h2>
        <p className="text-white/60 mb-6">
          Use aviation-relevant tags naturally. Don&apos;t overuse hashtags.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Hash className="h-8 w-8 text-sky-400 mb-4" />
          <p className="text-white/70 mb-4">
            No specific hashtag strategy defined yet. Use tags like{" "}
            <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
              #aviation
            </code>
            ,{" "}
            <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
              #pilotlife
            </code>
            ,{" "}
            <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
              #generalaviation
            </code>
            ,{" "}
            <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
              #weatherplanning
            </code>
            ,{" "}
            <code className="text-sky-400 bg-white/5 px-1.5 py-0.5 rounded">
              #flightsafety
            </code>{" "}
            when they fit naturally.
          </p>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <p className="text-white/80 text-sm">
              Don&apos;t overuse hashtags. Quality over quantity.
            </p>
          </div>
        </div>
      </section>

      {/* 8. What Never to Say on Social */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          What Never to Say on Social
        </h2>
        <p className="text-white/60 mb-8">
          Avoid these phrases. They create regulatory, positioning, or brand risk.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Ban className="h-8 w-8 text-amber-400/80 mb-4" />
          <ul className="space-y-2 text-white/70">
            <li>
              <strong className="text-white/90">&quot;Go Score&quot;</strong>{" "}
              (deprecated — always &quot;WX Score&quot;)
            </li>
            <li>
              <strong className="text-white/90">&quot;Official weather briefing&quot;</strong>{" "}
              (regulatory concern)
            </li>
            <li>
              <strong className="text-white/90">&quot;Replacement for ForeFlight&quot;</strong>{" "}
              (we complement)
            </li>
            <li>
              <strong className="text-white/90">&quot;Better than [competitor]&quot;</strong>{" "}
              (we fill a gap)
            </li>
            <li>
              <strong className="text-white/90">&quot;Guaranteed&quot;</strong> or{" "}
              <strong className="text-white/90">&quot;certain weather&quot;</strong>
            </li>
            <li>
              <strong className="text-white/90">&quot;Revolutionary&quot;</strong> or{" "}
              <strong className="text-white/90">&quot;disrupting&quot;</strong>
            </li>
            <li>
              <strong className="text-white/90">&quot;AI-powered&quot;</strong> as
              the primary descriptor (AI is the how, not the what)
            </li>
          </ul>
        </div>
      </section>

      {/* 9. Community Vision */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Community Vision: &quot;Strava for Pilots&quot;
        </h2>
        <p className="text-white/60 mb-8">
          Beyond social media — the in-app community layer we&apos;re building.
          This is internal roadmap context for partners.
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Rss className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              The Flight Feed
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
              Pilots love hangar talk. COPA has 7,000 members and 1,000 daily active
              users. On forums and Facebook groups, pilots constantly ask:{" "}
              <em>&quot;I&apos;m thinking about flying from here to here. Has
              anybody done this before?&quot;</em>
            </p>
            <p className="text-white/70 leading-relaxed">
              When a pilot has no active trips, instead of an empty dashboard,
              they&apos;ll see a feed of real flights from the community — with
              configurable filters by aircraft type, by friends, or global. Feed
              events follow the flight lifecycle: briefing created, WX Score
              updated, pilot departed, post-flight debrief shared.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Search className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Airport & Route Expertise
            </h3>
            <p className="text-white/70 leading-relaxed">
              No forum can tell you &quot;here are all the SR22T flights into KASE
              in the last 6 months, with WX Scores and pilot notes.&quot; PlaneWX
              will have structured, searchable flight intelligence from actual
              trips. Pilots can search for others who have flown a specific route
              or airport and — if the pilot opts in — connect for advice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <Lock className="h-6 w-6 text-sky-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                Pro-Gated Access
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Social participation requires a Pro subscription — no throwaway
                accounts. Similar to how COPA charges $80/year primarily for
                community access. Every participant has skin in the game.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <Shield className="h-6 w-6 text-sky-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                Self-Moderating Platform
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Unlike forums where bans mean losing conversations, misbehaving on
                PlaneWX means risking your briefings, trip history, personal minimums,
                and mentor connections. Nobody risks their flight planning
                infrastructure to troll someone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Enterprise & Flight School */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">
          Enterprise & Flight School Use Cases
        </h2>
        <p className="text-white/60 mb-8">
          How the social feed and community features scale to organizations.
        </p>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Building2 className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Part 135 / Charter Operations
            </h3>
            <p className="text-white/70 leading-relaxed">
              Chief pilots and scheduling staff see WX Scores across all flights days
              in advance. If a score sits at 50% for several days, the scheduler can
              proactively call the customer to reschedule — before pressure reaches
              the cockpit. Ops spec minimums replace personal minimums as
              organization-wide standards.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Users className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Part 141 Flight Schools
            </h3>
            <p className="text-white/70 leading-relaxed">
              A flight school with 20 cross-country flights going out daily needs an
              operational dashboard. The feed becomes a real-time view of all student
              flights — route, WX Score, status. Future features include conditional
              dispatch rules (WX Score thresholds triggering mandatory PAVE +
              mentoring with CFI) and student decision-making pattern tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Portal */}
      <section>
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
