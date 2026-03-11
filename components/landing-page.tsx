"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Plane, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Brain, 
  Route, 
  Target, 
  Users, 
  Clock, 
  Shield, 
  Sparkles, 
  MapPin, 
  TrendingUp,
  Gauge,
  Check,
  ArrowRight,
  FileText,
  BarChart3,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Radio,
  RefreshCw,
  ChevronDown,
  Globe,
  Crown,
  Minus,
  Plus,
  HeartHandshake,
  Phone,
  Quote,
  Snowflake,
  Wind,
  Layers,
  Eye,
} from "lucide-react"


const testimonials = [
  {
    quote: "I've been beta testing this product for a few weeks now and I'm really enjoying it. I think overall it does a very good job of synthesizing multiple weather products and highlighting the key factors to be aware of. It's not perfect, but it has improved markedly with feedback, and it links everything back to the source data so you can verify if anything looks amiss.",
    name: "Adam",
  },
  {
    quote: "Absolutely GREAT work!",
    name: "Alex",
  },
  {
    quote: "Impressive. Fantastic UX. Quick, clean and modern. The little icons are a nice touch.",
    name: "Tom",
  },
  {
    quote: "Awesome Wx tool that helps take a lot of the stress out of planning a trip in the future. It gives you a directionally accurate Wx information that you can use to be better informed when it comes down to making your go/no-go decision. I value the amount of data that the platform provides - and the automated updates keep me on top of ever changing weather. I use it on every XC and highly recommend it.",
    name: "Andrew",
  },
  {
    quote: "I just signed up a couple of days ago and super impressed. I will try the free version for a few more days before upgrading. You can count on feedback for sure but this is way better than other solutions I use mainly because it interprets the weather and gives me conclusions. Thank you.",
    name: "Sukumar",
  },
  {
    quote: "VERY nice work!",
    name: "Paul",
  },
  {
    quote: "Just signed up and tried it for a flight tomorrow from KTEX to KGEU (PHX area). Very impressive. I will be using this on every flight and will report back to you any issues or recommendations. Amazing work!",
    name: "William",
  },
  {
    quote: "I've been using this for several weeks and agree that it is very helpful. For big trips that are a week away it helps me stay aware of the outlook and sometimes highlights things that I'm not seeing that I need to be aware of. Also, Mark has been very responsive with bug reports and updates. I like it.",
    name: "Roy",
  },
  {
    quote: "This tool has a great flow to it, and tells me what I want to know. I'm by no means a weather geek. I'm looking to assess risk. This looks promising.",
    name: "Vas",
  },
  {
    quote: "Your tool is amazing. Thank you for the beta access and I plan to sign up for the full product soon!",
    name: "Mukul",
  },
  {
    quote: "I'm a beta tester. I've been impressed with the accuracy. The daily updates of home airport is pretty slick too, gives you a quick glance at a 3 day outlook. I think it's an outstanding product. I use it any time I do a trip away from home field. Gives me a great synopsis that I can dive deeper into by getting a weather briefing.",
    name: "Logan",
  },
  {
    quote: "Very impressive and helpful. Great use of A.I. - thanks for making this. I can relate to your comments about going to many different websites piecing things together.",
    name: "Forrest",
  },
  {
    quote: "The morning updates are very cool.",
    name: "Teresa",
  },
  {
    quote: "This is amazing. I signed up out of curiosity, but really like it. I'm a big fan of NWS discussions and I like how they're displayed.",
    name: "Nicholas",
  },
  {
    quote: "I fly an SF50 and own a business that operates in multiple states. I also have 9 years experience as a Nav on C130s in the Marine Corps. This is the best product for long range weather planning — what's going to happen 1-2 weeks out to start planning a trip. As an early beta tester and business owner that operates in multiple states, here is how I use PlaneWX: Executive time is valuable — schedules are tight and full. Having weather outlook 2 weeks out helps drive internal conversations if plans need to change early. Flight decision making — multiple instances, I've proactively changed flights to be sooner or later than intended to get more predictable weather. Daily weather email — one of my favorite parts is the daily email on local weather. Much better and more concise than any other product. I could talk about so much more of this product. It's certainly worth a try!",
    name: "Clark",
    highlight: true,
  },
  {
    quote: "Just downloaded and absolutely love the UI. Very well laid out, concise and easy to navigate. Love the information and how it's presented, colors used, etc. Really looking forward to trying it out in real world situations. We have definitely been missing an app/program like this for our flight planning. I will likely sign up for a subscription once the trial ends. Thanks for creating!",
    name: "Russell",
  },
  {
    quote: "Just signed up out of curiosity... WOW... what an amazing product! Kudos, and this just seems to be the beginning. This makes me want to plan a long XC!",
    name: "Ashit",
  },
  {
    quote: "Signed up for a trial yesterday and devised a test flight. Fantastic tool you've developed. I look forward to using it on my next cross country.",
    name: "Mark",
  },
]

export function LandingPage() {
  const searchParams = useSearchParams()
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [synopticExpanded, setSynopticExpanded] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam) {
      localStorage.setItem("planewx_referral", refParam.toUpperCase())
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a0f1a]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Plane className="h-7 w-7 text-sky-400" />
              <div className="absolute inset-0 blur-sm bg-sky-400/30 rounded-full" />
            </div>
            <span className="hidden sm:inline text-2xl font-bold tracking-tight">PlaneWX</span>
            <span className="hidden md:inline text-xs text-white/40 font-medium tracking-wide ml-2">Weather Intelligence for Pilots</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Testimonials
            </button>
            <a href="#founder" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
            <a href="https://app.planewx.ai" className="text-sm text-white/60 hover:text-white transition-colors">
              Log In
            </a>
            <a 
              href="https://app.planewx.ai"
              className="hidden sm:inline-flex items-center justify-center rounded-md text-xs font-medium h-9 px-3 bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <Plane className="h-16 w-16 md:h-20 md:w-20 text-sky-400" />
                <span className="text-5xl md:text-7xl font-bold text-sky-400">PlaneWX</span>
              </div>
              <span className="text-sm md:text-base text-white/40 font-medium tracking-widest uppercase">Weather Intelligence for Pilots</span>
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
              <Shield className="h-4 w-4 flex-shrink-0" />
              <span>Built for Safety.<br className="sm:hidden" /> Powered by Synoptic Intelligence™</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">The confidence to</span>{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">go</span>
              <br />
              <span className="text-white">or the courage to</span>{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">stay</span>
            </h1>
            
            {/* Subheadline - Safety focused */}
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Know if your flight will happen <strong className="text-white/80">days in advance</strong>—before 
              you're at the airport with bags packed, facing pressure to fly in conditions you shouldn't.
            </p>
            
            {/* Safety message */}
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-200">
                <strong className="text-amber-100">The safest decision is the one made early.</strong> PlaneWX gives you 
                weather intelligence up to 14 days out, so you never face a last-minute go/no-go under pressure.
              </p>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="https://app.planewx.ai"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
            
            <p className="text-sm text-white/40 pt-4">
              14-day Pro trial — no credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 mb-6">
              <Shield className="h-4 w-4 text-rose-400" />
              <span className="text-sm text-rose-400 font-medium">Why PlaneWX Exists</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Most Dangerous Decision is the <span className="text-rose-400">Last-Minute</span> One
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              The FAA identifies external pressure and "get-there-itis" as leading contributors to GA accidents. 
              PlaneWX exists to eliminate that pressure by giving you visibility <strong className="text-white">before</strong> you're locked into a decision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* The Problem */}
            <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-rose-300">
                <AlertCircle className="h-5 w-5" />
                The Pattern That Kills
              </h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-1">1.</span>
                  <span>Plans made days or weeks in advance — flights booked, hotels reserved, family waiting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-1">2.</span>
                  <span>Weather monitored, but TAFs only go 24 hours — "we'll know the night before"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-1">3.</span>
                  <span>Morning of departure: conditions marginal, but bags are packed, commitments made</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-1">4.</span>
                  <span><strong className="text-white">The pressure to go is immense.</strong> The decision feels impossible.</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-rose-300/70 italic">
                This is when accidents happen. Not because pilots lack skill, but because they're forced into decisions when the stakes are highest.
              </p>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                How PlaneWX Changes This
              </h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Know 7+ days out</strong> — See weather trends and WX Score before you commit</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">40+ automatic updates</strong> — Watch conditions evolve, not scramble the night before</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Alternative departure times</strong> — "Friday looks bad, but Thursday afternoon shows 85%"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Trip Watchers reduces external pressure</strong> — Stakeholders see the data, so rescheduling is shared</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-emerald-300/70 italic">
                The safest pilots aren't the ones who can fly in anything — they're the ones who never put themselves in that position.
              </p>
            </div>
          </div>

          {/* Bottom line */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/20 text-center">
            <p className="text-lg text-white/80">
              <strong className="text-white">PlaneWX doesn't tell you not to fly.</strong> It gives you the information 
              to make that decision yourself — <span className="text-sky-400">days earlier</span>, when you still have options.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Model Icing & Turbulence Analysis */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-4">
              <Layers className="h-3 w-3" />
              Nobody Else Does This
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Models. <span className="text-sky-400">One Confident Answer.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              PlaneWX queries three independent weather models at multiple points along your route, 
              builds consensus with confidence scoring, and corroborates with real-world PIREPs and 
              government advisories — giving you icing and turbulence intelligence no other tool provides.
            </p>
          </div>

          {/* Model Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-center">
              <div className="bg-blue-500/20 rounded-lg px-3 py-1.5 inline-block mb-3">
                <span className="text-lg font-bold text-blue-400">HRRR</span>
              </div>
              <p className="text-sm text-white/70 font-medium">3 km • Hourly • 0–18h</p>
              <p className="text-xs text-white/40 mt-1">NOAA high-resolution</p>
            </div>
            <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-center">
              <div className="bg-purple-500/20 rounded-lg px-3 py-1.5 inline-block mb-3">
                <span className="text-lg font-bold text-purple-400">GFS</span>
              </div>
              <p className="text-sm text-white/70 font-medium">~13 km • 4×/day • 0–16 days</p>
              <p className="text-xs text-white/40 mt-1">NOAA global model</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center">
              <div className="bg-amber-500/20 rounded-lg px-3 py-1.5 inline-block mb-3">
                <span className="text-lg font-bold text-amber-400">ECMWF</span>
              </div>
              <p className="text-sm text-white/70 font-medium">~9 km • 4×/day • 0–10 days</p>
              <p className="text-xs text-white/40 mt-1">World&rsquo;s most accurate global model</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-sky-400">3–7</p>
              <p className="text-xs text-white/50 mt-1">Sample points along your route</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-sky-400">8</p>
              <p className="text-xs text-white/50 mt-1">Altitude levels per point</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-sky-400">~120</p>
              <p className="text-xs text-white/50 mt-1">Data points per flight</p>
            </div>
          </div>

          {/* Icing + Turbulence Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/50 to-blue-950/50 border border-sky-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                  <Snowflake className="h-5 w-5 text-sky-400" />
                </div>
                <h3 className="text-xl font-semibold">Icing Analysis</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Layer boundaries — exact entry/exit altitudes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Ice type prediction — clear, rime, or mixed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>SLD &amp; warm nose detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Total exposure — climb, cruise, descent minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Worst-case consensus (safety-first)</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 to-orange-950/50 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Wind className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">Turbulence Analysis</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Physics-based — vertical wind shear + Richardson number</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Altitude-specific severity at 8 pressure levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Calibrated against ForeFlight&rsquo;s GTG product</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>CAT detection at jet stream and frontal zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>Median consensus (reduces false alarms)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Corroboration + Confidence */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                Corroborated by Real-World Observations
              </h3>
              <p className="text-sm text-white/60 mb-3">
                Model predictions are validated, adjusted, or overridden by PIREPs, AIRMETs, G-AIRMETs, and SIGMETs.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>PIREPs confirm model → confidence boosted</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>PIREPs contradict model → assessment adjusted</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>SIGMETs always override model predictions</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-sky-400" />
                Full Data Transparency
              </h3>
              <p className="text-sm text-white/60 mb-3">
                Most aviation weather apps present conclusions without evidence. PlaneWX shows you everything.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Per-model columns — see each model&rsquo;s assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Raw data tables at every altitude and sample point</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span>Disagree with the consensus? The data is there.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Confidence Badges */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-green-400 font-bold mb-0.5">HIGH</p>
              <p className="text-xs text-green-400/60">Unanimous</p>
              <p className="text-xs text-white/40 mt-1">All models agree</p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold mb-0.5">MODERATE</p>
              <p className="text-xs text-yellow-400/60">Majority</p>
              <p className="text-xs text-white/40 mt-1">Most agree, one differs</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
              <p className="text-orange-400 font-bold mb-0.5">LOW</p>
              <p className="text-xs text-orange-400/60">Split</p>
              <p className="text-xs text-white/40 mt-1">Models disagree — plan conservatively</p>
            </div>
          </div>

          {/* Deep Dive CTA */}
          <div className="text-center">
            <Link 
              href="/multi-model-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-medium rounded-xl transition-all"
            >
              Deep dive: How multi-model analysis works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Fly <span className="text-sky-400">Confidently</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From 14-day planning horizons to real-time departure decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* WX Score */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-emerald-950/20 border border-emerald-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Gauge className="w-full h-full text-emerald-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <CheckCircle2 className="h-3 w-3" />
                  Core Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Personalized WX Score</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  A clear 0-100% metric calculated against <em>your</em> personal minimums—not generic VFR/IFR categories. 
                  Each aircraft you fly gets its own tailored minimums.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Ceiling, visibility, and crosswind limits — your numbers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Turbulence & icing tolerance tailored to each aircraft
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Aircraft-aware: FIKI, TAS, autopilot, weather radar
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Transparent breakdown of every deduction
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Trip Planner */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-950/50 to-violet-950/20 border border-violet-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Sparkles className="w-full h-full text-violet-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium mb-4">
                  <Sparkles className="h-3 w-3" />
                  Core Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Trip Planner</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Two mission paths for two types of flights. Weather-aware planning that works the way pilots actually think.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 font-medium text-sm mb-1">
                      <span className="text-lg">🍔</span>
                      <span>"I Just Want to Fly"</span>
                    </div>
                    <p className="text-xs text-white/50">Flexible destination and timing—weather picks when and where</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 font-medium text-sm mb-1">
                      <span className="text-lg">💼</span>
                      <span>"I Need to Be Somewhere"</span>
                    </div>
                    <p className="text-xs text-white/50">Fixed obligation—we find the safest departure window</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Long Range Forecasting */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sky-950/50 to-sky-950/20 border border-sky-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Clock className="w-full h-full text-sky-400" />
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-3">14-Day Planning Horizon</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Plan trips weeks in advance with confidence levels that honestly reflect forecast 
                  uncertainty. No more "we'll know the night before."
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-400">72h+</div>
                    <div className="text-xs text-white/40">Pattern outlook</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-400">12-72h</div>
                    <div className="text-xs text-white/40">TAF + NBM</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-400">&lt;12h</div>
                    <div className="text-xs text-white/40">Full products</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trip Watchers */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-950/50 to-amber-950/20 border border-amber-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Users className="w-full h-full text-amber-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                  <Shield className="h-3 w-3" />
                  Reduce External Pressure
                </div>
                <h3 className="text-2xl font-bold mb-3">Trip Watchers</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  The FAA identifies external pressure as a leading cause of GA accidents. Trip Watchers 
                  reduces that pressure by keeping stakeholders informed — so rescheduling is a shared decision, not a confrontation.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Family, passengers, and schedulers see the same data
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Alerts when conditions deteriorate — days in advance
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    You're not the one "breaking bad news" at the last minute
                  </li>
                </ul>
              </div>
            </div>

            {/* Multi-City Optimizer */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-cyan-950/50 to-cyan-950/20 border border-cyan-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Globe className="w-full h-full text-cyan-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
                  <Sparkles className="h-3 w-3" />
                  Pro Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Multi-City Optimizer</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Planning a multi-leg trip? Enter all your stops and PlaneWX finds the optimal departure 
                  sequence based on weather windows across every leg.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    Weather-optimized leg sequencing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    WX Scores for every leg at a glance
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" />
                    Flexible timing across multiple destinations
                  </li>
                </ul>
              </div>
            </div>

            {/* Corridor Watch */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-rose-950/50 to-rose-950/20 border border-rose-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Route className="w-full h-full text-rose-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-medium mb-4">
                  <Radio className="h-3 w-3" />
                  Pro Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Corridor Watch</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Route-specific weather intelligence along your flight path. See conditions at departure, 
                  en route waypoints, and arrival — all in one view.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-rose-400" />
                    Waypoint-by-waypoint weather analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-rose-400" />
                    TFR and NOTAM awareness along route
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-rose-400" />
                    Turbulence and icing corridor overlays
                  </li>
                </ul>
              </div>
            </div>

            {/* Mentor System */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-teal-950/50 to-teal-950/20 border border-teal-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <HeartHandshake className="w-full h-full text-teal-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-medium mb-4">
                  <Users className="h-3 w-3" />
                  Free + Pro
                </div>
                <h3 className="text-2xl font-bold mb-3">Ask a Mentor</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Connect with experienced pilots for go/no-go decision support. Unlike a phone call to a friend, 
                  your mentor sees your full briefing — WX Score, personal minimums, aircraft profile — so advice is grounded in shared data, not guesswork.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400" />
                    Matched by aircraft type and specialty
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400" />
                    Mentor sees your full briefing — shared context, not verbal descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400" />
                    <span><strong className="text-white">Free:</strong> &quot;Need Help Now&quot; broadcast to matching mentors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400" />
                    <span><strong className="text-white">Pro:</strong> Browse the directory and pick a specific mentor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400" />
                    Community-rated mentors — the best rise to the top
                  </li>
                </ul>
              </div>
            </div>

            {/* Become a Mentor */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-indigo-950/20 border border-indigo-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Phone className="w-full h-full text-indigo-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
                  <HeartHandshake className="h-3 w-3" />
                  Community
                </div>
                <h3 className="text-2xl font-bold mb-3">Become a Mentor</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Experienced pilots already help strangers with go/no-go calls — on forums, in hangars, over the phone. 
                  PlaneWX formalizes it with shared briefing context, aircraft-type matching, and community ratings.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" />
                    Set your specialties: mountain, icing, IFR, night ops
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" />
                    Control your availability and Do Not Disturb
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" />
                    Conversations happen off-platform — phone, text, WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400" />
                    Top mentors earn free Pro access
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Personal Minimums Highlight */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 to-indigo-950/50 border border-violet-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                <Target className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Minimums. Your Aircraft. Your Analysis.</h3>
                <p className="text-white/60 text-sm mb-4">
                  PlaneWX doesn&apos;t use generic VFR/IFR thresholds. Every briefing is analyzed against YOUR personal minimums — 
                  and they can be different for each aircraft you fly.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Departure & arrival ceilings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Departure & arrival visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Crosswind component limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Turbulence tolerance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Icing tolerance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Night/IMC comfort level</span>
                  </div>
                </div>
                <p className="text-xs text-violet-300/70 mt-3">
                  All minimums are set per aircraft — because your limits in a well-equipped SR22T are different from a rental 172.
                </p>
              </div>
            </div>
          </div>

          {/* Additional features row */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Shield className="h-8 w-8 text-rose-400 mb-4" />
              <h3 className="font-semibold mb-2">PAVE Risk Assessment</h3>
              <p className="text-sm text-white/50">
                Integrated risk management framework pre-filled from your trip context
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <MapPin className="h-8 w-8 text-teal-400 mb-4" />
              <h3 className="font-semibold mb-2">Weather Watch</h3>
              <p className="text-sm text-white/50">
                National Watch, Regional Watch with VFR probabilities, and Corridor Watch for route-specific intelligence
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Target className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="font-semibold mb-2">Smart Refresh</h3>
              <p className="text-sm text-white/50">
                Briefings auto-update on schedules optimized for your departure time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl shadow-black/50"
              src="https://www.youtube.com/embed/qu7ppznhcGM?si=MnoooX_Fu66IxwRg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See PlaneWX <span className="text-sky-400">in Action</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/homepage.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/homepage.png"
                  alt="PlaneWX dashboard showing trip overview and WX Scores"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium">Trip Dashboard</p>
                  <p className="text-xs text-white/60">All your trips with live WX Scores</p>
                </div>
              </div>
            </div>
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/briefing 1.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/briefing 1.png"
                  alt="PlaneWX detailed weather briefing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium">Weather Briefing</p>
                  <p className="text-xs text-white/60">Detailed analysis powered by Synoptic Intelligence™</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="text-sky-400">Transparent</span> Pricing
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Start with a 14-day Pro trial. No credit card required. <span className="text-amber-400">Introductory rates end April 1.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Free</h3>
                <p className="text-white/50 text-sm">For students and occasional flyers</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-white/40 ml-1">/forever</span>
              </div>
              <a
                href="https://app.planewx.ai"
                className="inline-flex items-center justify-center rounded-md w-full py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors mb-8"
              >
                Get Started
              </a>
              <div className="space-y-3 text-sm">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">What&apos;s included</p>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">2 active flights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">1 aircraft profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">Synoptic Intelligence™</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">Full WX Score breakdown</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">Per-aircraft personal minimums</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">PAVE Risk Assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">14-day planning horizon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70">Trip Planner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Need Help Now</strong> — broadcast to volunteer mentors</span>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No auto-refresh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No email alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No Trip Watchers</span>
                </div>
                <div className="flex items-center gap-3">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No Corridor Watch</span>
                </div>
                <div className="flex items-center gap-3">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No Multi-City Optimizer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Minus className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-white/30">No Browse Mentors</span>
                </div>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border-2 border-sky-500/40 shadow-lg shadow-sky-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-sky-500 text-white text-xs font-semibold">
                  <Crown className="h-3 w-3" />
                  Most Popular
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-white/50 text-sm">For active GA pilots</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">$11.99</span>
                <span className="text-white/40 ml-1">/month</span>
              </div>
              <p className="text-sm text-sky-400 mb-4">
                or $99/year <span className="text-emerald-400 font-medium">(save 31%)</span>
              </p>
              <div className="mb-6 px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-300 leading-relaxed">
                  <strong className="text-amber-200">Introductory pricing</strong> — rates increase April 1. Subscribe now to lock in this rate.
                  <strong className="text-white block mt-1">First 500 subscribers are grandfathered in for life.</strong>
                </p>
              </div>
              <a
                href="https://app.planewx.ai"
                className="inline-flex items-center justify-center rounded-md w-full py-3 text-sm font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 transition-colors mb-8"
              >
                Start 14-Day Free Trial
              </a>
              <div className="space-y-3 text-sm">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Everything in Free, plus</p>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70">10 active flights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70">5 aircraft profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Auto-refresh</strong> — briefings update automatically</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Email alerts</strong> — weather changes sent to your inbox</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Trip Watchers</strong> — share live trip status</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Corridor Watch</strong> — route-specific weather monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Multi-City Optimizer</strong> — up to 6 destinations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Browse Mentors</strong> — find and connect with experienced pilots</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-white/40 mt-8">
            All plans include Synoptic Intelligence™, PAVE Risk Assessment, Mentor Broadcast, and 14-day planning. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Get Started CTA Section */}
      <section id="get-started" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fly <span className="text-sky-400">Smarter</span>?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Create your free account and start your 14-day Pro trial. No credit card required.
          </p>
          <a 
            href="https://app.planewx.ai"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-10 py-6 text-lg font-semibold shadow-lg shadow-sky-500/25 transition-colors"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Cancel your subscription anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Secure payments powered by Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Briefing Updates Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <RefreshCw className="h-4 w-4" />
              <span>Always Current</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Briefing <span className="text-emerald-400">Evolves</span> With the Weather
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Plan a trip 14 days out? We&apos;ll update your briefing <strong className="text-white">40+ times</strong> before departure — 
              automatically, every time new weather products are issued.
            </p>
          </div>

          {/* The big number */}
          <div className="text-center mb-12">
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30">
              <div className="text-6xl md:text-8xl font-bold text-emerald-400 mb-2">40+</div>
              <div className="text-lg text-white/60">briefing updates for a 14-day trip</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Weather Products Unlock as Departure Approaches</h3>
              <p className="text-white/50 text-sm">More products = more precision = higher confidence</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4">
              {/* 14-7 days */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-slate-700 text-xs font-medium text-slate-300">14-7 days</div>
                <div className="text-2xl font-bold text-amber-400 mb-2">~55%</div>
                <div className="text-sm font-medium mb-3 text-white/80">Pattern Confidence</div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Regional Weather (4×/day)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    GFS & WPC outlooks
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    No TAFs or NBM yet
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-emerald-400">
                  ~8-12 updates
                </div>
              </div>

              {/* 7-3 days */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-slate-700 text-xs font-medium text-slate-300">7-3 days</div>
                <div className="text-2xl font-bold text-amber-400 mb-2">~70%</div>
                <div className="text-sm font-medium mb-3 text-white/80">Trend Confidence</div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Regional Weather (4×/day)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    GFS model guidance
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    SPC convective outlooks
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-emerald-400">
                  ~6-10 updates
                </div>
              </div>

              {/* 3-1 days */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-slate-700 text-xs font-medium text-slate-300">72-24h</div>
                <div className="text-2xl font-bold text-sky-400 mb-2">~80%</div>
                <div className="text-sm font-medium mb-3 text-white/80">High Confidence</div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Regional Weather (4×/day)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    NBM hourly forecasts
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    TAFs appear (near 24h)
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-emerald-400">
                  ~8-12 updates
                </div>
              </div>

              {/* 24-6h */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-slate-700 text-xs font-medium text-slate-300">24-6h</div>
                <div className="text-2xl font-bold text-sky-400 mb-2">~90%</div>
                <div className="text-sm font-medium mb-3 text-white/80">Very High Confidence</div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Regional Weather (4×/day)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    TAFs & NBM forecasts
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    G-AIRMETs (from 12h)
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-emerald-400">
                  ~6-8 updates
                </div>
              </div>

              {/* <6h */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 border border-emerald-500/30 relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-emerald-600 text-xs font-medium text-white">Final 6h</div>
                <div className="text-2xl font-bold text-emerald-400 mb-2">~95%+</div>
                <div className="text-sm font-medium mb-3 text-white/80">Go/No-Go Ready</div>
                <ul className="space-y-1.5 text-xs text-white/50">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Regional Weather context
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Live METARs & TAFs
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    PIREPs, SIGMETs, AIRMETs
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    CWAs
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-emerald-500/30 text-xs text-emerald-400">
                  ~4-6 updates
                </div>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-white/60">Confidence</span>
                <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500" style={{width: '100%'}} />
                </div>
                <span className="text-sm text-white/60">Certainty</span>
              </div>
              <p className="text-xs text-center text-white/40">
                As departure approaches, more weather products become available → your WX Score becomes more precise
              </p>
            </div>
          </div>

          {/* What triggers updates */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                What Triggers a Briefing Update?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/70">New TAF issuance or amendment</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/70">Regional Weather refresh via Synoptic Intelligence™</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/70">New SIGMET, AIRMET, or G-AIRMET</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/70">Approaching critical time thresholds (72h, 24h, 6h)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/70">New METARs, PIREPs, or CWAs (final 6h)</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Each briefing includes Regional Weather for <strong className="text-white/60">origin</strong>, <strong className="text-white/60">en-route</strong>, and <strong className="text-white/60">destination</strong> — 
                synthesized from NWS forecaster narratives via Synoptic Intelligence™.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/50 to-indigo-950/50 border border-sky-500/20">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-sky-400" />
                Email Alerts When It Matters
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Don&apos;t constantly refresh the app. We&apos;ll email you when something changes:
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">WX Score changes</strong> — up or down, you&apos;ll know immediately</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">New hazards appear</strong> — convection, icing, turbulence alerts</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Trip milestones</strong> — 7 days, 3 days, 24h, departure reminders</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <p className="text-xs text-sky-300">
                  💡 Your Trip Watchers get the same alerts — so the conversation about rescheduling starts early, not at the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use AI Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
              <Brain className="h-4 w-4 text-indigo-400" />
              <span className="text-sm text-indigo-400 font-medium">AI-Powered Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How PlaneWX Uses <span className="text-indigo-400">AI</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              AI that synthesizes and explains — not AI that decides for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* What AI Does */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-indigo-500/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-indigo-300">
                <Sparkles className="h-5 w-5" />
                What Our AI Does
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Ingests & Synthesizes</strong> — METARs, TAFs, NBM, GFS MOS, AFDs, PIREPs, AIRMETs, SIGMETs, and more into unified intelligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Extends Your Horizon</strong> — Reliable forecasts from 14 days out to imminent departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Auto-Refreshes</strong> — 40+ updates as new products are issued, without you lifting a finger</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Powers Synoptic Intelligence™</strong> — Synthesizes NWS forecaster narratives into regional summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Suggests Alternatives</strong> — Better departure times and routing options when conditions are marginal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Knows Your Aircraft</strong> — FIKI, TAS, equipment, service ceiling — all factored in</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span className="text-white/70"><strong className="text-white">Integrates PAVE</strong> — Risk assessment pre-filled from your trip context</span>
                </li>
              </ul>
            </div>

            {/* What AI Doesn't Do */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-amber-300">
                <AlertCircle className="h-5 w-5" />
                What Our AI Does NOT Do
              </h3>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                <p className="text-amber-200 font-medium">
                  PlaneWX does NOT make the GO/NO-GO decision for you.
                </p>
              </div>
              <p className="text-white/60 text-sm mb-4">
                You are the pilot in command. Our AI provides intelligence and analysis — you provide the judgment.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>We give you <strong className="text-white">confidence levels</strong>, not commands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>WX Score is <strong className="text-white">input to your decision</strong>, not the decision itself</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>We surface <strong className="text-white">risks and gotchas</strong> — you decide what to do about them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Personal minimums are <strong className="text-white">your standards</strong>, not ours</span>
                </li>
              </ul>
              <p className="text-xs text-white/40 mt-4 italic">
                Weather data sourced from federal regulatory agencies. The pilot in command always makes the final go/no-go decision.
              </p>
            </div>
          </div>

          {/* Simple Summary - Safety Focus */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-sky-950/50 border border-emerald-500/20 text-center">
            <p className="text-lg text-white/80 mb-3">
              <strong className="text-white">Bottom line:</strong> PlaneWX gives you the intelligence to decide confidently — 
              <span className="text-sky-400"> the confidence to GO</span> or <span className="text-amber-400">the courage to stay</span>.
            </p>
            <p className="text-sm text-white/60">
              The safest pilots aren't the ones who can fly in anything — they're the ones who 
              <strong className="text-white"> never put themselves in that position</strong>. 
              PlaneWX helps you make that decision days earlier, when you still have options.
            </p>
          </div>
        </div>
      </section>

      {/* What is Synoptic Intelligence Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-4">
              <span>Patent Pending • US App. 63/970,803</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is <span className="text-sky-400">Synoptic Intelligence</span>™?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-4">
              "Synoptic Intelligence captures what human forecasters know but models don't —
              then calibrates it with what models can quantify."
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              <strong className="text-white">PlaneWX is the first and only AI-powered aviation weather product.</strong> No other
              platform combines human forecaster insight with quantitative model data beyond 24 hours.
            </p>
          </div>

          {/* The Gap Explanation */}
          <div className="mb-12 p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-center">The Gap in Aviation Weather Today</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="font-semibold text-rose-300 mb-2">TAFs</div>
                <p className="text-white/60">Human insight + quantitative</p>
                <p className="text-rose-400 font-medium mt-2">But only 24 hours</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="font-semibold text-amber-300 mb-2">MOS / NBM</div>
                <p className="text-white/60">Quantitative out to 7+ days</p>
                <p className="text-amber-400 font-medium mt-2">But pure model — no human reasoning</p>
              </div>
              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <div className="font-semibold text-sky-300 mb-2">AFDs (Area Forecast Discussions)</div>
                <p className="text-white/60">Human insight out to 7 days</p>
                <p className="text-sky-400 font-medium mt-2">But qualitative & written for meteorologists</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <p className="text-emerald-300 font-medium">
                <strong className="text-white">Synoptic Intelligence</strong> = Human forecaster insight (from AFDs) synthesized by AI,
                calibrated with quantitative model data (NBM days 1-3, GFS MEX days 4-7) = <span className="text-emerald-400">Accurate VFR probabilities out to 7 days</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-sky-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Human Insight Synthesis</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  AI synthesizes expert forecaster narratives from 122 NWS offices — capturing the <em>why</em> behind weather patterns
                  that pure model data misses.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Route className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Route-Aware Analysis</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Samples your flight path every 75nm to identify all weather regions along your
                  route—not just origin and destination like traditional briefings.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-emerald-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quantitative Calibration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cross-references qualitative forecaster narratives with objective NBM/GFS model data
                  to produce calibrated VFR probability estimates you can trust.
                </p>
              </div>
            </div>
          </div>

          {/* Why This Matters for Safety */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-700/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Why This Matters for Safety
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Know 7 days out:</strong> <span className="text-white/60">See deteriorating conditions before you're committed — not the night before departure</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Understand the "why":</strong> <span className="text-white/60">Human forecaster reasoning explains why conditions are evolving, not just model numbers</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Trust the numbers:</strong> <span className="text-white/60">Calibrated with objective model data — 71% accuracy at 72 hours in backtesting</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Make early decisions:</strong> <span className="text-white/60">The safest decision is the one made when you still have options</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synoptic Intelligence in Action */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Synoptic Intelligence™ <span className="text-sky-400">in Action</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              See how we synthesize weather data across regions into actionable briefings
            </p>
            <p className="text-xs text-amber-400/60 mt-2">Patent Pending</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Synoptic Map */}
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/national_watch.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/national_watch.png"
                  alt="National Watch showing weather patterns across the US"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-sky-500/80 text-xs font-medium">LIVE</span>
                    <span className="text-sm font-medium">National Watch</span>
                  </div>
                  <p className="text-xs text-white/60">Continental weather synthesis powered by Synoptic Intelligence™</p>
                </div>
              </div>
            </div>
            
            {/* Region Forecast Detail */}
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/corridor_watch.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/corridor_watch.png"
                  alt="Corridor Watch showing route-specific weather intelligence"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-sky-500/80 text-xs font-medium">Route Intelligence</span>
                    <span className="text-sm font-medium">Corridor Watch</span>
                  </div>
                  <p className="text-xs text-white/60">Weather conditions along your saved routes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Synoptic Intelligence - Collapsible */}
          <div className="mt-12">
            <button
              onClick={() => setSynopticExpanded(!synopticExpanded)}
              className="w-full p-5 rounded-2xl bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/30 hover:border-sky-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-sky-400" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">What is Synoptic Intelligence™?</h3>
                    <p className="text-sm text-white/50">Learn how our AI synthesizes forecaster insights and model data</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-sky-400 transition-transform duration-300 ${synopticExpanded ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {/* Expandable Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${synopticExpanded ? 'max-h-[3000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-6">
                {/* What is Synoptic Intelligence */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="h-5 w-5 text-sky-400" />
                    <h3 className="text-lg font-semibold">What is Synoptic Intelligence™?</h3>
                  </div>
                  <p className="text-white/90 text-lg mb-4 italic">
                    "Synoptic Intelligence captures what human forecasters know but models don't — 
                    then calibrates it with what models can quantify."
                  </p>
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">No existing product combines human forecaster insight with quantitative data beyond 24 hours.</strong> TAFs 
                    give you human insight — but only for 24 hours. MOS and NBM go further, but they're pure model output with no forecaster reasoning. 
                    AFDs contain 7-day human insight, but they're written for meteorologists and scattered across 122 offices.
                  </p>
                  <p className="text-white/70 mb-4">
                    Synoptic Intelligence uses AI to synthesize AFD narratives — capturing pattern-level reasoning and uncertainty — 
                    then calibrates with objective NBM/GFS model data to produce quantified VFR probability estimates out to 7 days.
                  </p>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-sm text-emerald-200">
                      <strong className="text-white">Why this matters for safety:</strong> You see weather trends deteriorating 
                      <strong> days before departure</strong>, not the night before — when you still have options to delay, 
                      reschedule, or find better departure windows.
                    </p>
                  </div>
                </div>

            {/* Multi-Source Verification */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold">Multi-Source Verification</h3>
                </div>
              <p className="text-white/60 mb-4">
                Synoptic Intelligence cross-references two independent sources to calibrate every forecast:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-amber-400" />
                    <span className="font-semibold">AFD Analysis</span>
                </div>
                  <p className="text-sm text-white/60">
                    Human-written forecaster narratives from NWS Weather Forecast Offices. 
                    Explains <em className="text-white/80">why</em> weather is happening — fronts, pressure systems, terrain effects. 
                    Provides context that models miss.
                  </p>
              </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-sky-400" />
                    <span className="font-semibold">NBM Models</span>
                </div>
                  <p className="text-sm text-white/60">
                    NOAA&apos;s National Blend of Models — probabilistic numerical forecasts with specific percentages 
                    for IFR ceilings, low visibility, and high winds. Objective, calibrated, 72-hour coverage.
                  </p>
                </div>
              </div>
                </div>

            {/* Understanding Forecast Confidence */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-semibold">Understanding Forecast Confidence</h3>
              </div>
              <p className="text-white/60 mb-4">
                When you see the <strong className="text-white">Forecast Confidence</strong> panel, 
                it&apos;s comparing what human forecasters say (AFD) with what the models show (NBM):
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <span className="text-emerald-400 font-semibold">High confidence</span>
                    <span className="text-white/60"> — Sources agree (within 15%). Whether they agree on good or bad conditions, you can trust this forecast.</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <span className="text-amber-400 font-semibold">Medium confidence</span>
                    <span className="text-white/60"> — Minor disagreement (15-30%). Worth monitoring conditions more closely.</span>
                  </p>
              </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-rose-400 mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <span className="text-rose-400 font-semibold">Low confidence</span>
                    <span className="text-white/60"> — Significant disagreement (30%+). Dig deeper before committing — one source may be seeing something the other isn&apos;t.</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4 italic">
                Note: &quot;High confidence&quot; doesn&apos;t mean good weather — it means the sources agree. 
                A high-confidence forecast of 10% VFR is still a NO-GO.
                  </p>
                </div>

            {/* Powers Every Briefing */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-semibold">Powers Every PlaneWX Briefing</h3>
              </div>
              <p className="text-white/60 mb-4">
                Synoptic Intelligence isn&apos;t just for this map — it&apos;s integrated into every flight briefing:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-sky-400" />
                  <span><strong className="text-white">Route-aware</strong> <span className="text-white/60">— samples regions along your flight path</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-sky-400" />
                  <span><strong className="text-white">WX Score</strong> <span className="text-white/60">— calibrated against your personal minimums</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-sky-400" />
                  <span><strong className="text-white">Alternate departures</strong> <span className="text-white/60">— uses regional trends for better timing</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-sky-400" />
                  <span><strong className="text-white">Hazard detection</strong> <span className="text-white/60">— surfaces risks across your entire route</span></span>
                </div>
            </div>
          </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <Radio className="h-5 w-5 text-amber-400" />
                  <h4 className="font-semibold">122 Weather Forecast Offices</h4>
                </div>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    NWS offices covering <strong className="text-white">every US region</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    Staffed <strong className="text-white">24/7</strong> by operational meteorologists
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    AFDs updated <strong className="text-white">4× daily</strong>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-sky-400" />
                  <h4 className="font-semibold">89 NBM Sample Points</h4>
                </div>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <strong className="text-white">3-5 airports per region</strong> based on complexity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    Hourly forecasts out to <strong className="text-white">72 hours</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    IFR probability, wind, precipitation data
                  </li>
                </ul>
              </div>
            </div>

            {/* Always Fresh Data */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="h-5 w-5 text-emerald-400" />
                <h4 className="font-semibold">Always Fresh Data</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Regional summaries refresh every <strong className="text-sky-400">6 hours</strong>, synchronized with AFD updates (4 times daily).
              </p>
              <p className="text-xs text-white/40">
                NBM data is fetched fresh for each briefing to ensure the latest model guidance.
              </p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accuracy Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Target className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Backtested & Validated</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Accurate is <span className="text-emerald-400">Synoptic Intelligence™</span>?
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We ran 286 predictions against actual METAR observations across 5 regions over 90 days. Here&apos;s what we found.
            </p>
          </div>

          {/* Main accuracy stat */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1 p-8 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/30 text-center">
              <div className="text-6xl font-bold text-emerald-400 mb-2">71%</div>
              <div className="text-lg font-medium text-white mb-2">Accuracy</div>
              <p className="text-sm text-white/60">
                Correctly predicts &quot;VFR-legal&quot; vs &quot;IFR required&quot; — the distinction that matters most for flight planning
              </p>
            </div>
            <div className="flex-1 p-8 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
              <div className="text-6xl font-bold text-sky-400 mb-2">62%</div>
              <div className="text-lg font-medium text-white mb-2">Better Than Random</div>
              <p className="text-sm text-white/60">
                Random guessing gets 25%. Our 40.6% strict accuracy shows meaningful predictive power.
              </p>
            </div>
          </div>

          {/* Accuracy by lead time */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">76%</div>
              <div className="text-sm font-medium text-white/80 mb-1">24 Hours Out</div>
              <div className="text-xs text-white/40">±22% VFR probability error</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-sky-400 mb-1">70%</div>
              <div className="text-sm font-medium text-white/80 mb-1">48 Hours Out</div>
              <div className="text-xs text-white/40">±23% VFR probability error</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">61%</div>
              <div className="text-sm font-medium text-white/80 mb-1">72 Hours Out</div>
              <div className="text-xs text-white/40">±28% VFR probability error</div>
            </div>
          </div>

          {/* Regional performance */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700">
            <h3 className="font-semibold mb-4 flex items-center gap-2 justify-center">
              <MapPin className="h-5 w-5 text-sky-400" />
              Accuracy by Region
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-xl font-bold text-emerald-400">98%</div>
                <div className="text-xs text-white/60">Desert SW</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <div className="text-xl font-bold text-sky-400">82%</div>
                <div className="text-xs text-white/60">N. California</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <div className="text-xl font-bold text-sky-400">64%</div>
                <div className="text-xs text-white/60">Southeast</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="text-xl font-bold text-amber-400">55%</div>
                <div className="text-xs text-white/60">Great Lakes</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="text-xl font-bold text-amber-400">49%</div>
                <div className="text-xs text-white/60">Northeast</div>
              </div>
            </div>
            <p className="text-xs text-center text-white/40 mt-4">
              Stable climates = higher accuracy. Variable winter weather = harder to predict. This is expected for any forecast system.
            </p>
          </div>

          {/* Why this matters */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-sky-950/30 border border-emerald-500/20">
            <h3 className="font-semibold mb-3 text-center">Why 71% Matters</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-white/70">Answers <strong className="text-white">&quot;Will VFR be legal, or will I need IFR?&quot;</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-white/70">Most VFR pilots can fly in <strong className="text-white">MVFR with reduced margins</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-white/70"><strong className="text-white">98% in stable climates</strong> proves the methodology works</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-sky-400">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Does PlaneWX meet the requirements of 14 CFR §91.103?",
                a: "PlaneWX provides weather information from federal regulatory agencies (NOAA, NWS, FAA) to help pilots obtain all available information before a flight. There is no regulatory requirement to obtain a briefing from any specific source — FAA Advisory Circular 91-92 endorses pilot self-briefing. The WX Score and AI analysis are decision-support tools — as pilot in command, you always make the final go/no-go decision."
              },
              {
                q: "What happens after my 14-day Pro trial?",
                a: "Your account automatically moves to the Free plan — no charge, no action needed. You keep your trips, aircraft, and settings. You can subscribe to Pro anytime to unlock auto-refresh, email alerts, Trip Watchers, Corridor Watch, and Multi-City Optimizer."
              },
              {
                q: "Do I need a credit card to start?",
                a: "No. You can create an account and start your 14-day Pro trial without entering any payment information."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes. You can cancel directly from your profile in the app — no emails, no phone calls. Your Pro access continues until the end of your billing period, then you move to the Free plan."
              },
              {
                q: "What weather data sources does PlaneWX use?",
                a: "PlaneWX ingests official NWS products including METARs, TAFs, Area Forecast Discussions (AFDs), SIGMETs, AIRMETs, PIREPs, and the National Blend of Models (NBM). Our Synoptic Intelligence™ AI synthesizes these into clear, actionable summaries."
              },
              {
                q: "What's the difference between Free and Pro?",
                a: "Free gives you full-quality briefings with personal minimums, WX Scores, and PAVE — but you're limited to 2 active flights and 1 aircraft. Pro adds auto-refresh, email alerts, Trip Watchers, Corridor Watch, Multi-City Optimizer, and expands to 10 active flights and 5 aircraft."
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes. If you subscribe to Pro and it's not right for you, contact us within 30 days for a full refund — no questions asked."
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white/90">{faq.q}</span>
                  {openFaq === i ? (
                    <Minus className="h-5 w-5 text-sky-400 shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-white/40 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm mb-6">
              <Users className="h-4 w-4" />
              From the Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Pilots Are <span className="text-sky-400">Saying</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Real feedback from GA pilots using PlaneWX for cross-country planning.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className={`break-inside-avoid p-6 rounded-2xl border space-y-4 ${
                  t.highlight
                    ? "bg-gradient-to-br from-sky-950/60 to-indigo-950/40 border-sky-500/20"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                <Quote className={`h-5 w-5 ${t.highlight ? "text-sky-400" : "text-white/20"}`} />
                <p className="text-sm text-white/70 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/30 flex items-center justify-center text-xs font-semibold text-white/80">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-medium text-white/60">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section id="founder" className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Founder's <span className="text-sky-400">Story</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Image */}
            <div className="md:col-span-2 space-y-4">
              <div 
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl cursor-pointer hover:border-sky-500/50 transition-colors"
                onClick={() => setZoomedImage("/screenshots/foreflight.png")}
              >
                <img
                  src="/screenshots/foreflight.png"
                  alt="Flight log showing extensive cross-country flying"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-white/40 text-center italic">
                "I built PlaneWX because I needed it!"
              </p>
            </div>
            
            {/* Story Text */}
            <div className="md:col-span-3 space-y-4 text-white/60 leading-relaxed">
              <p>
                PlaneWX was founded in 2025 by <strong className="text-white">Mark Wolfgang</strong>, an experienced technology entrepreneur and General Aviation pilot.
              </p>
              <p>
                After selling his Information Security consulting company in December 2022, Mark retired and bought his first airplane—a Diamond DA40 NG. He earned his Private Pilot's license in just six weeks and started flying his wife and dog around the country.
              </p>
              <p>
                After completing an accelerated IFR program in five days, Mark discovered the complexities of weather planning for instrument flying. He grew frustrated having to tell his wife, <em className="text-white/80">"Yeah, we should be good. I'll let you know after the TAF comes out tonight."</em>
              </p>
              <p>
                Now flying a Cirrus SR22T with over 800 hours total time—including 620 hours of cross-country PIC in 18 months—Mark built PlaneWX to solve his own problem. What started as personal frustration became a mission to help every pilot answer the question: <em className="text-sky-400">"Is this flight going to happen?"</em>
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm">
                  <strong className="text-white">Mark Wolfgang</strong> is a Commercial Instrument pilot with single and multiengine ratings. Mark is a veteran of the U.S. Navy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-sky-400" />
              <span className="font-bold">PlaneWX</span>
              <span className="text-xs text-white/30 hidden sm:inline">Weather Intelligence for Pilots</span>
          </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} PlaneWX, LLC. All rights reserved. • Patent Pending
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              <a href="mailto:hello@planewx.ai" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-auto"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="fixed top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="min-h-full flex items-center justify-center p-4">
            <img
              src={zoomedImage || ""}
              alt="Zoomed view"
              className="max-w-[95vw] w-auto h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
