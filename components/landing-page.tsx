"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Globe
} from "lucide-react"

// Base count for social proof - change this to restart the counter
const WAITLIST_BASE_COUNT = 42

export function LandingPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [homeAirport, setHomeAirport] = useState("")
  const [xcFlightsPerWeek, setXcFlightsPerWeek] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const [synopticExpanded, setSynopticExpanded] = useState(false)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  // Capture referral code from URL (?ref=CODE) and persist in localStorage
  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam) {
      // Store in localStorage so it persists if they browse around
      localStorage.setItem("planewx_referral", refParam.toUpperCase())
      setReferralCode(refParam.toUpperCase())
    } else {
      // Check localStorage for previously stored referral
      const storedRef = localStorage.getItem("planewx_referral")
      if (storedRef) {
        setReferralCode(storedRef)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          homeAirport: homeAirport.trim() || null,
          xcFlightsPerWeek: xcFlightsPerWeek || null,
          referralCode: referralCode || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Failed to join waitlist. Please try again.")
        return
      }

      setStatus("success")
      setEmail("")
      setHomeAirport("")
      setXcFlightsPerWeek("")
      fetchWaitlistCount()
    } catch (error) {
      console.error("[LandingPage] Error submitting:", error)
      setStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchWaitlistCount = async () => {
    try {
      const response = await fetch("/api/waitlist/count")
      if (response.ok) {
        const data = await response.json()
        setWaitlistCount(WAITLIST_BASE_COUNT + (data.count || 0))
      }
    } catch (error) {
      console.error("[LandingPage] Error fetching waitlist count:", error)
    }
  }

  useEffect(() => {
    fetchWaitlistCount()
  }, [])

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
          <div className="flex items-center gap-3">
            <div className="relative">
              <Plane className="h-8 w-8 text-sky-400" />
              <div className="absolute inset-0 blur-sm bg-sky-400/30 rounded-full" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PlaneWX</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </button>
            <a href="#founder" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
            <Button 
              size="sm" 
              className="bg-sky-500 hover:bg-sky-400 text-white"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4">
              <Plane className="h-16 w-16 md:h-20 md:w-20 text-sky-400" />
              <span className="text-5xl md:text-7xl font-bold text-sky-400">PlaneWX</span>
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Synoptic Intelligence™</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">The confidence to</span>{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">go</span>
              <br />
              <span className="text-white">or the courage to</span>{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">stay</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              AI-powered weather intelligence that synthesizes expert meteorological insights 
              into actionable briefings—so you know if your flight is a GO, <strong className="text-white/80">days in advance</strong>.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-sky-500/25"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
            
            {/* Social proof */}
            {waitlistCount !== null && (
              <p className="text-sm text-white/40 pt-4">
                Join <span className="text-sky-400 font-semibold">{waitlistCount.toLocaleString()}+</span> pilots on the waitlist
              </p>
            )}
          </div>
        </div>
      </section>

      {/* What is Synoptic Intelligence Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is <span className="text-sky-400">Synoptic Intelligence</span>™?
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              <strong className="text-white">PlaneWX is the first and only AI-powered aviation weather product.</strong> Synoptic Intelligence™ is our proprietary technology that makes this possible—no other platform synthesizes weather data like we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-sky-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Source Synthesis</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Aggregates expert meteorological insights from multiple National Weather Service 
                  offices into unified regional summaries—something no other tool does.
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
                <h3 className="text-xl font-semibold mb-2">Confidence Calibration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cross-references forecaster narratives with probabilistic model data (NBM) 
                  to give you calibrated confidence levels you can actually trust.
                </p>
              </div>
            </div>
          </div>

          {/* Where It's Used */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-700/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-400" />
              Where Synoptic Intelligence Powers PlaneWX
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white">National Watch</strong> <span className="text-white/60">— Continental weather synopsis synthesized from all 22 regions</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white">Regional Watch</strong> <span className="text-white/60">— AI-synthesized regional summaries with VFR probabilities</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white">Corridor Watch</strong> <span className="text-white/60">— Route-specific weather intelligence for saved corridors</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white">Every Flight Briefing</strong> <span className="text-white/60">— Route-aware analysis with personalized GO scores</span></span>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-700/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              What Makes PlaneWX Different
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">AI Synthesis:</strong> <span className="text-white/60">We don't just show data — we analyze and explain it in plain language. Unlike ForeFlight and Garmin Pilot, we synthesize, not just display.</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">72-Hour Forecasting:</strong> <span className="text-white/60">Extends reliable planning beyond the 24-hour TAF window with 71% accuracy</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Per-Aircraft Minimums:</strong> <span className="text-white/60">Ceilings, visibility, crosswind, turbulence, icing — all customizable per aircraft you fly</span></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">→</span>
                <span><strong className="text-white">Route-Aware:</strong> <span className="text-white/60">Synthesizes conditions along your entire flight path, not just point-to-point</span></span>
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
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Synoptic Map */}
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/synoptic-map.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/synoptic-map.png"
                  alt="Synoptic Intelligence Map showing VFR probabilities across US regions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-sky-500/80 text-xs font-medium">LIVE</span>
                    <span className="text-sm font-medium">Synoptic Intelligence™ Map</span>
                  </div>
                  <p className="text-xs text-white/60">22 regions with AI-synthesized VFR probabilities</p>
                </div>
              </div>
            </div>
            
            {/* Region Forecast Detail */}
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/synoptic-region-tomorrow.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/synoptic-region-tomorrow.png"
                  alt="Regional weather forecast with hazards, synopsis, and best flying windows"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-sky-500/80 text-xs font-medium">Click Any Region</span>
                    <span className="text-sm font-medium">Detailed Regional Forecast</span>
                  </div>
                  <p className="text-xs text-white/60">Hazards, synopsis, best flying windows, and avoid times</p>
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
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">PlaneWX is the first and only AI-powered aviation weather product.</strong> Synoptic Intelligence™ is our proprietary technology that makes this possible. 
                    Unlike ForeFlight, Garmin Pilot, and others that simply display raw weather data, Synoptic Intelligence <em className="text-white/90">synthesizes</em> multiple sources — 
                    human forecaster narratives <em className="text-white/90">and</em> numerical models — 
                    into actionable intelligence. You get the <em className="text-white/90">why</em> behind the weather, not just the data.
                  </p>
                  <p className="text-xs text-white/40 italic mb-4">
                    While competitors show you METARs, TAFs, and charts, PlaneWX tells you what it all means for <em>your</em> flight, <em>your</em> aircraft, and <em>your</em> personal minimums.
                  </p>
                  <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                    <p className="text-sm text-sky-200">
                      <strong className="text-white">Regional Weather</strong> is what Synoptic Intelligence produces — 
                      AI-synthesized weather summaries for 22 custom aviation regions across the US. Each briefing includes 
                      Regional Weather for your <strong>origin</strong>, <strong>en-route</strong>, and <strong>destination</strong> — 
                      updated 4× daily as NWS forecasters issue new guidance.
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
                  <span><strong className="text-white">GO Score</strong> <span className="text-white/60">— calibrated against your personal minimums</span></span>
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
            {/* GO Score */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-emerald-950/20 border border-emerald-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Gauge className="w-full h-full text-emerald-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <CheckCircle2 className="h-3 w-3" />
                  Core Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Personalized GO Score</h3>
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
            
            {/* Trip Wizard */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-950/50 to-violet-950/20 border border-violet-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Sparkles className="w-full h-full text-violet-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium mb-4">
                  <Sparkles className="h-3 w-3" />
                  New Feature
                </div>
                <h3 className="text-2xl font-bold mb-3">Trip Wizard</h3>
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
            
            {/* Trip Crew */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-950/50 to-amber-950/20 border border-amber-500/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
                <Users className="w-full h-full text-amber-400" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                  <Users className="h-3 w-3" />
                  Peace of Mind
                </div>
                <h3 className="text-2xl font-bold mb-3">Trip Crew</h3>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Share trip updates with family, friends, and mentors. They get progressive 
                  notifications as departure approaches—and you get accountability.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Email alerts at 14d, 7d, 3d, 1d, and departure
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Quick-response buttons for watchers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400" />
                    Auto-add your crew to new trips
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
                    <span className="text-white/70">Turbulence tolerance (per aircraft)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Icing tolerance (per aircraft)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    <span className="text-white/70">Aircraft-specific overrides</span>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 italic">
                  Flying a well-equipped SR22T with FIKI? Set tighter minimums. Renting a basic 172? Different aircraft, different limits.
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
                  <span>GO Score is <strong className="text-white">input to your decision</strong>, not the decision itself</span>
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
                PlaneWX is not a substitute for a proper weather briefing or professional judgment. Always file a flight plan and obtain an official briefing.
              </p>
            </div>
          </div>

          {/* Simple Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-sky-950/50 border border-emerald-500/20 text-center">
            <p className="text-lg text-white/80">
              <strong className="text-white">Bottom line:</strong> PlaneWX gives you the intelligence to decide confidently — 
              <span className="text-sky-400"> the confidence to GO</span> or <span className="text-amber-400">the courage to stay</span>.
            </p>
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
                As departure approaches, more weather products become available → your GO Score becomes more precise
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
                  <span className="text-white/70"><strong className="text-white">GO Score changes</strong> — up or down, you&apos;ll know immediately</span>
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
                  💡 Your Trip Crew watchers get the same alerts — so family knows when your GO Score drops.
                </p>
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
              onClick={() => setZoomedImage("/screenshots/planeWX-dashboard.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/planeWX-dashboard.png"
                  alt="PlaneWX dashboard showing trip overview and GO Scores"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium">Trip Dashboard</p>
                  <p className="text-xs text-white/60">All your trips with live GO Scores</p>
                </div>
              </div>
            </div>
            <div 
              className="group rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 hover:border-sky-500/50 transition-all cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/PlaneWX Briefing Page.png")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/screenshots/PlaneWX Briefing Page.png"
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

      {/* Waitlist Form Section */}
      <section id="waitlist" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent">
        <div className="container mx-auto max-w-xl">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Join the Waitlist</CardTitle>
              <CardDescription className="text-white/60">
                Be among the first to experience PlaneWX. We'll notify you when access is available.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-400">You're on the list!</p>
                      <p className="text-sm text-white/60">
                        We'll send you an email when access is available.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5"
                  >
                    Add Another Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="pilot@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="homeAirport" className="text-white/80">Home Airport (Optional)</Label>
                    <Input
                      id="homeAirport"
                      type="text"
                      placeholder="KABC"
                      value={homeAirport}
                      onChange={(e) => setHomeAirport(e.target.value.toUpperCase())}
                      maxLength={4}
                      pattern="[A-Z]{3,4}"
                      disabled={isSubmitting}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30 uppercase"
                    />
                    <p className="text-xs text-white/40">
                      Your home base ICAO code (e.g., KABC)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="xcFlightsPerWeek" className="text-white/80">Cross-Country Flights Per Week (Optional)</Label>
                    <Select
                      value={xcFlightsPerWeek}
                      onValueChange={setXcFlightsPerWeek}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="xcFlightsPerWeek" className="w-full bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select frequency..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less_than_1">Less than 1</SelectItem>
                        <SelectItem value="1_to_2">1-2 flights</SelectItem>
                        <SelectItem value="3_to_5">3-5 flights</SelectItem>
                        <SelectItem value="more_than_5">More than 5 flights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
                      <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                      <p className="text-sm text-rose-400">{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold"
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </Button>

                  {waitlistCount !== null && (
                    <p className="text-center text-sm text-white/40 pt-2">
                      {waitlistCount.toLocaleString()} pilots on the waitlist
                    </p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
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
                onClick={() => setZoomedImage("/screenshots/foreflight.jpeg")}
              >
                <img
                  src="/screenshots/foreflight.jpeg"
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
                After completing an accelerated IFR program in five days, Mark discovered the complexities of weather planning for instrument flying. He grew frustrated having to tell his wife, <em className="text-white/80">"Yeah, the flight should happen—we'll know about 85% the night before."</em>
              </p>
              <p>
                Now flying a Cirrus SR22T with over 800 hours total time—including 620 hours of cross-country PIC in 18 months—Mark built PlaneWX to solve his own problem. What started as personal frustration became a mission to help every pilot answer the question: <em className="text-sky-400">"Is this flight going to happen?"</em>
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm">
                  <strong className="text-white">Mark Wolfgang</strong> is a Commercially Rated Instrument pilot with single and multiengine ratings.
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
          </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} PlaneWX, LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              <a href="mailto:contact@planewx.ai?subject=PlaneWX%20Inquiry" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={zoomedImage || ""}
              alt="Zoomed view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
