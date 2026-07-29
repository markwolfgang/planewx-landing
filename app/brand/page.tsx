import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6"
import { STATS } from "@/components/shared/landing-data"
import {
  Target,
  Eye,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  User,
  Compass,
  Mic2,
  BookOpen,
  MessageSquare,
  Palette,
  ArrowRight,
  Quote,
  Handshake,
  GraduationCap,
  Plane,
  Users,
  Check,
  Minus,
  Crown,
  Zap,
  Shield,
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
        <div className="mb-8">
          <Image
            src="/brand/planewx-og-wordmark.png"
            alt="PlaneWX"
            width={320}
            height={64}
            className="h-14 w-auto"
            priority
          />
        </div>
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

      {/* Three Pillars */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Three Pillars</h2>
        <p className="text-white/60 mb-8">
          PlaneWX is built on three interconnected pillars — each reinforcing the others.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center mb-4">
              <span className="text-sky-400 font-bold text-lg">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Briefing</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              A continuously updated WX Score (0–100%) personalized to your aircraft,
              your ratings, and your personal minimums. Synthesizes METARs, TAFs, AIRMETs,
              SIGMETs, NOTAMs, CIP icing, GTG turbulence, and Synoptic Intelligence™ into
              a single structured decision — not a data dump.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-4">
              <span className="text-violet-400 font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mentors</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              A peer mentoring network so no pilot faces a hard decision alone.
              Free users can broadcast a <strong className="text-white">Need Help Now</strong> alert
              to the entire mentor community. Pro users Browse Mentors — experienced
              instrument-rated pilots who volunteer their time before a challenging flight.
              Experience finally transfers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-4">
              <span className="text-amber-400 font-bold text-lg">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">PAVE</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              Every briefing includes a structured <strong className="text-white">PAVE Risk Assessment</strong> — the FAA&apos;s four-factor
              framework built into the decision flow: <strong className="text-white">P</strong>ilot,{" "}
              <strong className="text-white">A</strong>ircraft,{" "}
              en<strong className="text-white">V</strong>ironment, and{" "}
              <strong className="text-white">E</strong>xternal pressures. PlaneWX is the
              first tool to automate this assessment against live weather data.
            </p>
          </div>
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
            <p className="text-white/70 leading-relaxed mb-3">
              Pilots are forced into go/no-go decisions at the moment of maximum
              pressure — bags packed, family waiting, hotels booked — when TAFs
              only cover 24 hours. Nobody helps analyze the vast quantity of
              weather data available beyond that window.
            </p>
            <p className="text-white/70 leading-relaxed">
              And they face that decision alone. There&apos;s no system for connecting
              a student pilot or low-time IFR pilot with an experienced mentor
              who&apos;s flown the same route in the same conditions. Experience
              doesn&apos;t transfer — every pilot re-learns the hard way.
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
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-violet-500/50">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-violet-400" />
              <h3 className="text-lg font-semibold text-white">The Community Layer</h3>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              PlaneWX is building what no weather app has: a peer mentoring network
              so no pilot faces a hard decision alone. Through the{" "}
              <strong className="text-white">Browse Mentors</strong> feature, experienced
              IR pilots volunteer to be available for consultation — real pilots, real
              context, before the flight.
            </p>
            <p className="text-white/70 leading-relaxed">
              Free users can broadcast a <strong className="text-white">Need Help Now</strong>{" "}
              alert to the entire mentor network. Pro users can browse mentor profiles and
              connect directly. Experience finally transfers.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Pricing</h2>
        <p className="text-white/60 mb-6">
          Three tiers — same analysis engine at every level.
        </p>

        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-8 flex items-start gap-4">
          <Shield className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm leading-relaxed">
            <strong className="text-emerald-400">Safety is not a premium feature.</strong>{" "}
            Every briefing — Free, Casual, or Pro — uses the same AI engine, the same
            weather models, and the same scoring methodology. We limit how much you can
            use PlaneWX, not how well it works.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">

          {/* Free */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Free</p>
            <div className="text-3xl font-bold text-white mb-0.5">$0</div>
            <p className="text-xs text-white/30 mb-4">forever</p>
            <div className="space-y-2 text-sm text-white/60">
              {[
                "2 active flights",
                "Full WX Score & PAVE",
                "14-day planning horizon",
                "Synoptic Intelligence™",
                "Flight Window Explorer",
                "Need Help Now mentor broadcast",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
              {["Auto-refresh", "Email alerts", "Browse Mentors"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Minus className="h-3.5 w-3.5 text-white/20 shrink-0" />
                  <span className="text-white/25">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Casual */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-teal-950/60 to-emerald-950/40 border-2 border-teal-500/40">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-semibold">
                <Zap className="h-3 w-3" />
                Most Popular
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-teal-400/70 mb-1">Casual</p>
            <div className="text-3xl font-bold text-white mb-0.5">$7.99</div>
            <p className="text-xs text-white/30 mb-1">/month</p>
            <p className="text-xs text-teal-400 mb-4">or $59.99/year <span className="text-emerald-400">(save 37%)</span></p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Everything in Free, plus</p>
              {[
                "10 active flights",
                "5 auto-monitored trips",
                "Auto-refresh & email alerts",
                "Fuel Advisor",
                "Trip Watchers",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
              {["Browse Mentors", "Corridor Watch"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Minus className="h-3.5 w-3.5 text-white/20 shrink-0" />
                  <span className="text-white/25">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border border-sky-500/30">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-900/80 border border-sky-500/40 text-sky-300 text-xs font-semibold">
                <Crown className="h-3 w-3" />
                Full Toolkit
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-sky-400/70 mb-1">Pro</p>
            <div className="text-3xl font-bold text-white mb-0.5">$14.99</div>
            <p className="text-xs text-white/30 mb-1">/month</p>
            <p className="text-xs text-sky-400 mb-4">or $119/year <span className="text-emerald-400">(4 months free)</span></p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Everything in Casual, plus</p>
              {[
                "25+ active flights",
                "Corridor Watch",
                "Multi-City Optimizer",
                "Browse Mentors — connect directly",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        <p className="text-xs text-white/30 mt-4 text-center">
          All plans include a 14-day free Pro trial. No credit card required to start.
        </p>
      </section>

      {/* Safety Impact */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Measured Safety Impact
        </h2>
        <p className="text-white/60 mb-8">
          Real data from 831 post-flight feedback submissions (July 2026).
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { value: "90", label: "pilots said PlaneWX gave them the confidence to make a no-go call", color: "text-emerald-400" },
            { value: "78%", label: "of pilots said the WX Score was accurate or conservative", color: "text-sky-400" },
            { value: "4.6 days", label: "average planning horizon per trip", color: "text-sky-400" },
            { value: "8.1", label: "average briefing updates per trip", color: "text-sky-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-white/60 mt-2 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-2xl font-bold text-sky-400">8.5 / 10</div>
            <div className="text-sm text-white/60 mt-1">"would recommend to a fellow pilot"</div>
            <div className="text-xs text-white/30 mt-1">831 pilot responses</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-2xl font-bold text-sky-400">64%</div>
            <div className="text-sm text-white/60 mt-1">said PlaneWX helped their decision</div>
            <div className="text-xs text-white/30 mt-1">417 of 647 responses</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-2xl font-bold text-amber-400">90</div>
            <div className="text-sm text-white/60 mt-1">no-go decisions credited to PlaneWX</div>
            <div className="text-xs text-white/30 mt-1">80 weather-related cancellations</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-6">
          <p className="text-white/80 text-sm leading-relaxed">
            <strong className="text-emerald-400">The key stat:</strong> 90 pilots said PlaneWX
            gave them the confidence to make a no-go call — 80 of those were weather-related.
            These are flights where a pilot might have pushed into marginal weather without
            the data PlaneWX provided.
          </p>
        </div>

        {/* Real-world testimonial */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-emerald-500/60">
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-emerald-400/60 shrink-0 mt-0.5" />
            <div>
              <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                &ldquo;You were right on. I should not have flown. I tuned around within 30 mins and barely made it back in VMC. I should have listened to the 0% rating for the flight!&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                <span className="text-emerald-400/80 font-medium">Chris</span>
                <span>&middot;</span>
                <span>Private · Instrument Rated · C172</span>
                <span>&middot;</span>
                <span>KANP → KOXB</span>
                <span>&middot;</span>
                <span>would recommend · 10/10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">What Pilots Are Saying</h2>
        <p className="text-white/60 mb-8">
          Real post-flight feedback from our pilot community, collected after the trip.
        </p>
        <div className="space-y-4">

          {/* Safety — Chris */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-emerald-500/60">
            <div className="flex items-start gap-3">
              <Quote className="h-4 w-4 text-emerald-400/60 shrink-0 mt-0.5" />
              <div>
                <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                  &ldquo;You were right on. I should not have flown. I tuned around within 30 mins and barely made it back in VMC. I should have listened to the 0% rating for the flight!&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                  <span className="text-emerald-400/80 font-medium">Chris</span>
                  <span>&middot;</span>
                  <span>Private · IR · 282 hrs · C172</span>
                  <span>&middot;</span>
                  <span>would recommend · 10/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Planning horizon — Roy */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500/60">
            <div className="flex items-start gap-3">
              <Quote className="h-4 w-4 text-sky-400/60 shrink-0 mt-0.5" />
              <div>
                <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                  &ldquo;I made my decision not to make the trip a week in advance. This does a good job of highlighting when the weather could be bad, then I can do my homework to figure out how and when to make a safe flight. I also like the daily updates.&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                  <span className="text-sky-400/80 font-medium">Roy</span>
                  <span>&middot;</span>
                  <span>Private · IR · 3,000 hrs · SR22T</span>
                  <span>&middot;</span>
                  <span>would recommend · 10/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stress reduction — Andrew */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-sky-500/60">
            <div className="flex items-start gap-3">
              <Quote className="h-4 w-4 text-sky-400/60 shrink-0 mt-0.5" />
              <div>
                <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                  &ldquo;Fills a need for comprehensive weather forecasting all in one place leading up to your day of departure. I think it reduces overall risk because you can have a sense of what the weather will be like well in advance — and avoid being stressed on the day of departure.&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                  <span className="text-sky-400/80 font-medium">Andrew</span>
                  <span>&middot;</span>
                  <span>Private · IR · 420 hrs · SR22T</span>
                  <span>&middot;</span>
                  <span>would recommend · 10/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game changer — Paul */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-violet-500/60">
            <div className="flex items-start gap-3">
              <Quote className="h-4 w-4 text-violet-400/60 shrink-0 mt-0.5" />
              <div>
                <p className="text-white/85 text-sm leading-relaxed italic mb-3">
                  &ldquo;I&apos;ve already shared this with my pilot friends based on my experience and they&apos;re already excited — &lsquo;this is a game changer.&rsquo;&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
                  <span className="text-violet-400/80 font-medium">Paul</span>
                  <span>&middot;</span>
                  <span>Private · IR · 700 hrs · C182</span>
                  <span>&middot;</span>
                  <span>would recommend · 10/10</span>
                </div>
              </div>
            </div>
          </div>

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
            { value: STATS.totalPilots, label: "pilots" },
            { value: STATS.cumulativeHours, label: "cumulative flight hours" },
            { value: STATS.instrumentRated, label: "instrument rated" },
            { value: STATS.jetAircraft, label: "jet aircraft" },
            { value: STATS.aircraftTypes, label: "unique aircraft types" },
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
            The fleet spans C172 trainers through Gulfstream G500 — 94 unique
            aircraft types. The product is largely shaped by COPA members —
            extremely experienced, extremely detail-oriented pilots who expect precision.
          </p>
        </div>
      </section>

      {/* Traction */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">
          Traction
        </h2>
        <p className="text-white/60 mb-2">
          Since public launch on March 1, 2026.
        </p>
        <p className="text-white/40 text-sm mb-8">
          Figures as of July 2026 — sourced from production database.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "390+", label: "paying subscribers" },
            { value: "1,298+", label: "trips under active monitoring" },
            { value: "827", label: "monthly active pilots" },
            { value: "1,650+", label: "registered pilots" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xl font-bold text-sky-400">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{stat.label}</div>
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
            Commercial Instrument pilot, single and multiengine ratings, nearly 1,000
            hours (784+ cross-country PIC in under 2 years), TBM 900 pilot,
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

      {/* Audience Hooks — for creators & partners */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Audience Hooks</h2>
        <p className="text-white/60 mb-8">
          Ready-made angles for different pilot audiences — use what fits your channel.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Plane className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-world flying</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              The courage to stay — pilots who share mistakes and lessons. Pair with the Chris testimonial and the stat that 90 pilots credited PlaneWX with the confidence to make a no-go call — 80 of them weather-related.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <GraduationCap className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">IFR training</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Structured weather decision-making that complements the FAA PAVE framework — natural for instrument students and CFIs.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Sparkles className="h-8 w-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Owner & type-specific</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Aircraft-specific minimums beyond generic ceiling, visibility, and crosswind. Cirrus-heavy fleet; 94 unique types from trainers to jets.
            </p>
          </div>
        </div>
      </section>

      {/* Key Messaging & Quote Bank */}
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
        <p className="text-white/50 text-sm mt-10 mb-4">
          Sound bites — feel free to use any of these on-air or in copy.
        </p>
        <div className="space-y-3">
          {[
            { line: "TAFs end at 24 hours. Your trip doesn't.", note: "Planning horizon" },
            { line: "Built by a pilot, for pilots — and flown every day in his own plane.", note: "Founder credibility" },
            { line: "Aircraft-specific minimums, not one-size-fits-all weather.", note: "Differentiation" },
            { line: "Decision support, not data dump.", note: "Category" },
            { line: "Days of warning instead of hours of stress.", note: "Stress framing" },
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

      {/* For Partners & Creators */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">For Partners &amp; Creators</h2>
        <p className="text-white/60 mb-6">
          Working with aviation creators who care about decision-making and safety — not gear porn.
        </p>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <Handshake className="h-8 w-8 text-sky-400 mb-4" />
          <p className="text-white/70 leading-relaxed mb-6">
            PlaneWX is built by a working instrument-rated pilot and shaped by one of GA&apos;s most demanding communities. We love partners who try the product on real trips and share an honest take with their audience.
          </p>
          <p className="text-white/80 text-sm mb-6 p-4 rounded-xl bg-sky-500/5 border border-sky-500/20">
            <strong className="text-sky-400">Partner offer:</strong> Promo code coming soon — email{" "}
            <a href="mailto:mark@planewx.ai" className="text-sky-400 hover:text-sky-300">
              mark@planewx.ai
            </a>{" "}
            for an early partner code.
          </p>
          <p className="text-white/50 text-sm mb-3">Direct line to the founder</p>
          <a
            href="mailto:mark@planewx.ai"
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            mark@planewx.ai
          </a>
          <p className="text-white/40 text-sm mt-4 mb-3">
            General inquiries:{" "}
            <a href="mailto:hello@planewx.ai" className="text-sky-400/80 hover:text-sky-300">
              hello@planewx.ai
            </a>
          </p>
          <ul className="text-white/70 text-sm space-y-2 list-disc list-inside mt-6">
            <li>Try PlaneWX on a real upcoming trip</li>
            <li>Share an honest take with your audience</li>
            <li>Tell us what&apos;s missing — feature ideas often ship same day</li>
          </ul>
        </div>
      </section>

      {/* Social Media Handles */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-2">Social Media</h2>
        <p className="text-white/60 mb-8">
          Official PlaneWX accounts across all platforms. Use these handles when tagging us in posts, show notes, or episode descriptions.
        </p>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">Platform</th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">Handle</th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs">URL</th>
                <th className="text-left px-5 py-3 text-white/40 font-medium uppercase tracking-wider text-xs hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  icon: FaYoutube,
                  color: "text-red-400",
                  bg: "bg-red-500/10",
                  platform: "YouTube",
                  handle: "@planewx",
                  url: "https://youtube.com/@planewx",
                  note: "Product demos, tutorials, pilot interviews",
                },
                {
                  icon: FaInstagram,
                  color: "text-pink-400",
                  bg: "bg-pink-500/10",
                  platform: "Instagram",
                  handle: "@plane_wx",
                  url: "https://instagram.com/plane_wx",
                  note: "Community highlights, flight photos, tips",
                },
                {
                  icon: FaXTwitter,
                  color: "text-white/70",
                  bg: "bg-white/5",
                  platform: "X / Twitter",
                  handle: "@planewxai",
                  url: "https://x.com/planewxai",
                  note: "Aviation weather updates, product news",
                },
                {
                  icon: FaFacebook,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                  platform: "Facebook",
                  handle: "planewxai",
                  url: "https://facebook.com/planewxai",
                  note: "Pilot group community, longer-form posts",
                },
                {
                  icon: FaTiktok,
                  color: "text-sky-300",
                  bg: "bg-sky-500/10",
                  platform: "TikTok",
                  handle: "@planewx",
                  url: "https://tiktok.com/@planewx",
                  note: "Short-form aviation weather explainers",
                },
              ].map(({ icon: Icon, color, bg, platform, handle, url, note }) => (
                <tr key={platform} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <span className="font-medium text-white">{platform}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <code className="text-sky-400 font-mono text-sm">{handle}</code>
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-sky-400 transition-colors text-xs truncate block max-w-[200px]"
                    >
                      {url.replace("https://", "")}
                    </a>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-white/40 text-xs">{note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/30 mt-3">
          Note: Instagram handle is <code className="text-white/40">@plane_wx</code> (with underscore) — all other platforms use <code className="text-white/40">@planewx</code> or <code className="text-white/40">planewxai</code>.
        </p>
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
