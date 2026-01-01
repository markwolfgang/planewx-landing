"use client"

import { useState, useEffect } from "react"
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
import { Plane, CheckCircle2, AlertCircle, X } from "lucide-react"

// Base count for social proof - change this to restart the counter
const WAITLIST_BASE_COUNT = 42

export function LandingPage() {
  const [email, setEmail] = useState("")
  const [homeAirport, setHomeAirport] = useState("")
  const [xcFlightsPerWeek, setXcFlightsPerWeek] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

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
      // Refresh waitlist count after successful signup
      fetchWaitlistCount()
    } catch (error) {
      console.error("[LandingPage] Error submitting:", error)
      setStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fetch waitlist count on component mount
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 dark:from-sky-950 dark:via-slate-900 dark:to-sky-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Plane className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">PlaneWX</h1>
          </div>
          <p className="text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">
            The confidence to go, or the courage to stay™
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered weather intelligence for general aviation pilots. Know if your flight is a go—days in advance.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What Makes PlaneWX Different</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Long-Range Forecasting</h3>
                  <p className="text-sm text-muted-foreground">
                    Get weather briefings days or weeks in advance, beyond the 24-hour TAF window.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Synthesizes all official weather products—METARs, TAFs, AFDs, GFS, CPC—into clear, actionable briefings.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">GO Score</h3>
                  <p className="text-sm text-muted-foreground">
                    A clear 0-100% certainty metric that evolves as your departure approaches.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Personal Minimums</h3>
                  <p className="text-sm text-muted-foreground">
                    Briefings tailored to your aircraft, experience, and personal weather limits.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">PAVE Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrated risk management framework built into every briefing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <Card>
            <CardHeader>
              <CardTitle>Join the Waitlist</CardTitle>
              <CardDescription>
                Be among the first to experience PlaneWX. We'll notify you when access is available.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-success">You're on the list!</p>
                      <p className="text-sm text-muted-foreground">
                        We'll send you an email when access is available.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="w-full"
                  >
                    Add Another Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="pilot@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="homeAirport">Home Airport (Optional)</Label>
                    <Input
                      id="homeAirport"
                      type="text"
                      placeholder="KABC"
                      value={homeAirport}
                      onChange={(e) => setHomeAirport(e.target.value.toUpperCase())}
                      maxLength={4}
                      pattern="[A-Z]{3,4}"
                      disabled={isSubmitting}
                      className="uppercase"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your home base ICAO code (e.g., KABC)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="xcFlightsPerWeek">Cross-Country Flights Per Week (Optional)</Label>
                    <Select
                      value={xcFlightsPerWeek}
                      onValueChange={setXcFlightsPerWeek}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="xcFlightsPerWeek" className="w-full">
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
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </Button>

                  {/* Waitlist Count */}
                  {waitlistCount !== null && (
                    <p className="text-center text-sm text-muted-foreground pt-2">
                      {waitlistCount.toLocaleString()} people on the waitlist
                    </p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Screenshots Section */}
        <div className="max-w-6xl mx-auto mt-24 mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-8">
            See PlaneWX in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Screenshot 1 - Dashboard */}
            <div 
              className="rounded-lg border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/planeWX-dashboard.png")}
            >
              <Image
                src="/screenshots/planeWX-dashboard.png"
                alt="PlaneWX dashboard showing trip overview and GO Scores"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority={false}
                unoptimized={true}
              />
            </div>
            {/* Screenshot 2 - Briefing Page */}
            <div 
              className="rounded-lg border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card cursor-pointer"
              onClick={() => setZoomedImage("/screenshots/PlaneWX Briefing Page.png")}
            >
              <Image
                src="/screenshots/PlaneWX Briefing Page.png"
                alt="PlaneWX detailed weather briefing with GO Score breakdown and weather analysis"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority={false}
                unoptimized={true}
              />
            </div>
          </div>
        </div>

        {/* Founder's Story Section */}
        <div className="max-w-4xl mx-auto mt-24 mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            Founder's Story
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Image */}
            <div className="space-y-4">
              <div 
                className="rounded-lg border border-border overflow-hidden shadow-lg bg-card cursor-pointer"
                onClick={() => setZoomedImage("/screenshots/foreflight.jpeg")}
              >
                <img
                  src="/screenshots/foreflight.jpeg"
                  alt="Flight log showing extensive cross-country flying"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center italic">
                "I Built PlaneWX Because I needed it!"
              </p>
            </div>
            
            {/* Story Text */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                PlaneWX was founded in 2025 by Mark Wolfgang, an experienced technology entrepreneur and General Aviation pilot.
              </p>
              <p>
                After selling his Information Security consulting company in December 2022, Mark retired and bought his first airplane—a Diamond DA40 NG. Retirement initially delayed his flight training, but he began training in mid-June 2024. He earned his Private Pilot's license six weeks later and started flying his wife and dog around the country, visiting family, friends, and exploring new destinations.
              </p>
              <p>
                Recognizing the need for an Instrument Rating, Mark completed an accelerated IFR program in just five days. While the rating improved safety, it also introduced more complex weather challenges and required deeper weather knowledge.
              </p>
              <p>
                Mark continued studying weather, flying frequently, and taking long cross-country trips in his new Cirrus SR22T, building experience in trip planning, weather analysis, and pilot skills. He was surprised by the lack of long-range aviation weather forecasting tools and grew frustrated having to tell his wife, "Yeah, the flight should happen—we'll know about 85% the night before, and 100% the day of the flight."
              </p>
              <p>
                Drawing on his technical and business background, Mark started building PlaneWX to solve this problem. What started as a solution to his own frustration has become his new venture, and he can now firmly answer his wife's question about the likelihood of the flight.
              </p>
              <p className="pt-4 border-t border-border">
                <strong className="text-foreground">Mark is a Commercially Rated Instrument pilot</strong> with single and multiengine ratings, with over 800 hours total time—including 620 hours of cross-country PIC in the past 18 months.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} PlaneWX, LLC. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
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

