import Link from "next/link"
import {
  Target,
  Eye,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  DollarSign,
  Users,
  User,
  Compass,
  Mic2,
  BookOpen,
  MessageSquare,
  Palette,
  TrendingUp,
  ArrowRight,
  Quote,
} from "lucide-react"

export const metadata = {
  title: "Brand Portal | PlaneWX",
  description:
    "PlaneWX brand guidelines, mission, vision, and positioning for partners and creators.",
}

export default function BrandPortalPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
          <Target className="h-4 w-4" />
          Brand Overview
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          The confidence to go, or the courage to stay&trade;
        </h1>
        <p className="text-xl text-white/70 mb-2">
          The Pilot&apos;s Decision Support System
        </p>
        <p className="text-lg text-white/60">
          Weather Intelligence for Pilots
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
          <span>planewx.ai</span>
          <span>&middot;</span>
          <a href="mailto:hello@planewx.ai" className="text-sky-400 hover:text-sky-300 transition-colors">
            hello@planewx.ai
          </a>
          <span>&middot;</span>
          <span>Founded 2025 by Mark Wolfgang</span>
        </div>
      </section>

      {/* Category Claim */}
      <section>
        <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
          <p className="text-white/90 leading-relaxed text-xl font-medium">
            PlaneWX is a pilot decision support system — not another weather display.
          </p>
          <p className="text-white/60 mt-3">
            This is the single most important positioning statement. Every other tool displays
            raw data and hands the analysis back to the pilot. PlaneWX synthesizes it into a
            structured, quantified decision.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Mission & Vision</h2>
        <p className="text-white/60 mb-8">
          The foundation of everything we build and communicate.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Target className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Mission</h3>
            <p className="text-white/70 leading-relaxed">
              PlaneWX increases general aviation safety by equipping pilots with
              continuously monitored weather intelligence, structured
              self-assessment, and peer mentoring — giving pilots the confidence
              to go, or the courage to stay.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Eye className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-3">Vision</h3>
            <p className="text-white/70 leading-relaxed">
              A world where every pilot has the information they need, when they
              need it, to make the safest possible flight decision — days or weeks
              in advance, not hours.
            </p>
          </div>
        </div>
      </section>

      {/* Problem → Solution → Differentiator */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          The Problem, Solution & Differentiator
        </h2>
        <p className="text-white/60 mb-8">
          How we frame PlaneWX&apos;s value in the market.
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-amber-400/80" />
              <h3 className="text-lg font-semibold text-white">The Problem</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Pilots are forced into go/no-go decisions at the moment of maximum
              pressure — bags packed, family waiting, hotels booked — when TAFs
              only cover 24 hours. Nobody helps analyze the vast quantity of
              weather data available beyond that window.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-semibold text-white">The Solution</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              PlaneWX doesn&apos;t tell you not to fly. It gives you the
              information to make that decision yourself — days earlier, when you
              still have options. It&apos;s your early warning system that you
              might need to reschedule your plans.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-semibold text-white">
                The Differentiator
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              This is the difference between a data display and a decision
              support system. Every EFB displays raw METARs, TAFs, and PIREPs
              and hands the analysis back to you. PlaneWX synthesizes it all
              against YOUR aircraft and YOUR minimums into a quantified WX Score.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Pricing Philosophy
        </h2>
        <p className="text-white/60 mb-6">
          How we talk about free vs. Pro.
        </p>
        <div className="p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
          <DollarSign className="h-8 w-8 text-sky-400 mb-4" />
          <p className="text-white/90 leading-relaxed text-lg">
            Safety is not a premium feature. Every free briefing uses the same
            AI engine, the same weather models, and the same scoring methodology as
            a Pro briefing. We limit how much you can use PlaneWX, not how well
            it works.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Community</h2>
        <p className="text-white/60 mb-8">
          The pilots who trust PlaneWX. Refined by one of GA&apos;s most
          demanding communities.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[
            { value: "600+", label: "pilots" },
            { value: "1.1M+", label: "cumulative flight hours" },
            { value: "85%", label: "instrument rated" },
            { value: "120+", label: "jet aircraft" },
            { value: "102", label: "unique aircraft types" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-sky-400">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-white/50 text-sm">
            Cirrus aircraft (SR22T, SR22, SF50) represent over half the fleet.
            The product is largely shaped by COPA members — extremely experienced,
            extremely detail-oriented pilots who expect precision.
          </p>
        </div>
      </section>

      {/* Traction */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Traction
        </h2>
        <p className="text-white/60 mb-8">
          Early validation as of March 2026.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "~100", label: "paying customers in first 3 weeks" },
            { value: "~18%", label: "conversion rate (oldest cohort)" },
            { value: "600+", label: "accounts from 130 beta testers" },
            { value: "Annual", label: "most subscribers buying yearly" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xl font-bold text-sky-400">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Founder</h2>
        <p className="text-white/60 mb-6">
          Built by a pilot, for pilots.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <User className="h-8 w-8 text-sky-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Mark Wolfgang
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Commercial Instrument pilot, single and multiengine ratings, 800+
            hours (620+ cross-country PIC in 18 months), Cirrus SR22T owner,
            U.S. Navy veteran. Sold his InfoSec consulting company in 2022,
            earned his Private Pilot&apos;s license in 6 weeks, completed an
            accelerated 5-day IFR program, and discovered that nobody was solving
            the weather synthesis problem for pilots.
          </p>
          <p className="text-white/70 leading-relaxed">
            Mark personally responds to nearly every feedback email and bug report —
            often same-day. Feature suggestions are sometimes implemented the same
            day. The product is his own tool, refined by the community he flies with.
          </p>
          <div className="mt-4">
            <Link
              href="/brand/why"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
            >
              Read the full origin story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Positioning</h2>
        <p className="text-white/60 mb-6">
          How PlaneWX fits with existing tools.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <p className="text-white/70 leading-relaxed">
            Complementary to ForeFlight and Garmin Pilot. We fill the gap beyond
            24 hours with long-range Synoptic Intelligence, and provide
            aircraft-specific analysis that goes deeper than any EFB within 24
            hours. We complement, not compete with, existing tools.
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <Quote className="h-4 w-4 text-sky-400/50 mb-2" />
            <p className="text-white/60 text-sm italic">
              &ldquo;Every EFB and weather tool displays raw data and hands the analysis
              back to you. The cognitive work of synthesizing it, assessing risk,
              and forming a go/no-go judgment lands entirely on you, alone, often
              under pressure. PlaneWX is the first tool that does that synthesis
              for you.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Key Messaging */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Key Messaging
        </h2>
        <p className="text-white/60 mb-8">
          Lines to use across all channels.
        </p>
        <div className="space-y-3">
          {[
            { line: "Every weather tool shows you data. PlaneWX helps you decide.", note: "Primary hero headline" },
            { line: "The confidence to go, or the courage to stay\u2122", note: "Brand tagline" },
            { line: "Stop being your own meteorologist.", note: "Closing CTA" },
            { line: "Know if your trip is possible before you're locked into a decision.", note: "Planning value" },
            { line: "The safest decision is the one made early.", note: "Safety framing" },
          ].map((item) => (
            <div key={item.line} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex-1">
                <p className="text-white/90 font-medium">&ldquo;{item.line}&rdquo;</p>
              </div>
              <span className="text-xs text-white/30 shrink-0 mt-1">{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Explore the Portal</h2>
        <p className="text-white/60 mb-8">
          Dive deeper into guidelines, voice, terminology, and assets.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/brand/why"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
          >
            <Compass className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                Why PlaneWX
              </div>
              <div className="text-sm text-white/60">Origin story & philosophy</div>
            </div>
          </Link>
          <Link
            href="/brand/voice"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
          >
            <Mic2 className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                Voice & Tone
              </div>
              <div className="text-sm text-white/60">How we sound</div>
            </div>
          </Link>
          <Link
            href="/brand/terminology"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                Terminology
              </div>
              <div className="text-sm text-white/60">Words we use</div>
            </div>
          </Link>
          <Link
            href="/brand/social"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
          >
            <MessageSquare className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                Social Media
              </div>
              <div className="text-sm text-white/60">Playbook & templates</div>
            </div>
          </Link>
          <Link
            href="/brand/assets"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors group"
          >
            <Palette className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                Assets & Colors
              </div>
              <div className="text-sm text-white/60">Logos, colors, usage</div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
