// PlaneWX Newsroom — press releases, product news, and partnership announcements.
// To add an item: prepend a new object to NEWS_ITEMS (newest first). Body is HTML.

export type NewsCategory = "Partnerships" | "Product" | "Press Release" | "Company"

export interface NewsItem {
  slug: string
  category: NewsCategory
  title: string
  excerpt: string
  date: string // human-readable, e.g. "August 17, 2026"
  isoDate: string // e.g. "2026-08-17"
  location?: string
  body: string // HTML
  /**
   * Optional co-branded logo lockup, rendered above the body for joint
   * announcements. Our wordmark leads; the partner's mark follows.
   * Width/height are the asset's intrinsic pixels, for aspect ratio only —
   * display size is set in the component.
   */
  coBrand?: {
    name: string
    logo: string
    logoWidth: number
    logoHeight: number
  }
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "pro-plus-launch",
    category: "Product",
    title: "PlaneWX Launches Pro Plus",
    excerpt:
      "A new plan for pilots who fly enough that the briefing should follow the airplane — Ground Protection, Auto-Brief, a pre-flight text, and eligibility for 5X5's risk-based premium credits.",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    location: "Fremont, Nebraska",
    body: `
<p><strong>Fremont, Nebraska &mdash; August 17, 2026 &mdash;</strong> PlaneWX today launched Pro Plus, a new plan for pilots who fly enough that weather intelligence should follow the airplane, not the other way around.</p>

<p>Pro Plus is the same decision support system &mdash; a WX Score against your aircraft and your personal minimums, an integrated risk assessment built on the FAA&rsquo;s PAVE framework, and a mentor who can see the full briefing. What changes is the busywork. The briefing follows the flight you actually filed. A text reaches you on the walk out. And someone is watching the airplane when you are not.</p>

<p><strong>Ground Protection</strong> watches the weather at your parked airplane and texts you before hail, damaging wind, or freezing rain gets there. You do not have to remember to check.</p>

<p><strong>Auto-Brief</strong> means filing a flight plan is the trigger. If you already built a briefing, PlaneWX finds it, updates it to the time you actually filed, and refreshes it. If you never got around to building one, it creates it. Think about the normal morning: you brief an 0800 departure the night before, something slips, and you file 0900. Until now that meant going back in and waiting on a new briefing. Now the briefing follows the flight plan you filed.</p>

<p><strong>Pre-Flight Text</strong> sends your WX Score and the go/no-go picture about 30 minutes before departure, while you&rsquo;re walking out to the airplane.</p>

<p><strong>On-Demand Briefing Refresh</strong> lets you pull fresh weather when you want it, instead of waiting on a schedule.</p>

<p><strong>Contract Fuel Pricing</strong> and <strong>Briefed Fuel Stops</strong> apply the fuel programs you already belong to, so the stop we recommend is the one that actually saves you money.</p>

<p><strong>PlaneWX Labs</strong> is early access to what we&rsquo;re still building &mdash; including Pilot Debrief, which closes the loop after the flight: plan it, fly it, write down what you learned. Labs features are beta, and we label them that way in the app.</p>

<p>Pro Plus also raises the ceiling: 25 monitored flights, 10 aircraft, unlimited saved routes, and 25 Corridor Watch routes.</p>

<p>The same day, <a href="/news/5x5-aviation-insurance-exclusive-partner">5X5 Aviation Insurance named PlaneWX its exclusive insurance partner</a>. Verified Pro Plus members are eligible for risk-based premium credits through 5X5&rsquo;s Safety Rewards program &mdash; 5% at quote and bind, with more available at renewal for members who stay on the plan and use it. Credits are subject to 5X5&rsquo;s underwriting guidelines. PlaneWX does not sell insurance and receives no compensation tied to any policy.</p>

<p>Pro Plus is $29.99 a month or $249 a year. Through October 1, annual plans can be locked for two years &mdash; Pro Plus is $498 for 24 months. After October 1 that option goes away. Existing locks are honored. Pro and Casual are still there. Safety is not a premium feature: every briefing uses the same engine. We limit how much you can use PlaneWX, not how well it works.</p>

<p>Pilots can start at <a href="https://www.planewx.ai">www.planewx.ai</a>. PlaneWX is complementary to the electronic flight bag and official weather sources pilots already use. Its outputs are decision-support tools, not a substitute for pilot-in-command judgment.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "5x5-aviation-insurance-exclusive-partner",
    category: "Partnerships",
    title: "PlaneWX Names 5X5 Aviation Insurance Its Exclusive Insurance Partner",
    excerpt:
      "Verified PlaneWX Pro Plus members are eligible for risk-based premium credits through 5X5's Safety Rewards program — underwriting recognition for the preflight work pilots already do.",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    location: "Fremont, Nebraska",
    coBrand: {
      name: "5X5 Aviation Insurance",
      logo: "/logos/5x5-wordmark-white.webp",
      logoWidth: 1000,
      logoHeight: 327,
    },
    body: `
<p><strong>Fremont, Nebraska &mdash; August 17, 2026 &mdash;</strong> PlaneWX, the pilot&rsquo;s decision support system, today named 5X5 Aviation Insurance its exclusive insurance partner. Verified PlaneWX Pro Plus members are eligible for risk-based premium credits through 5X5&rsquo;s Safety Rewards program &mdash; recognition, in the underwriting process, of the preparation pilots already do before they fly.</p>

<p>PlaneWX was built for the gap every EFB leaves open. TAFs cover about 24 hours, and most trips are planned well before that. PlaneWX synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums into a WX Score, feeds that briefing into an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network so no one has to make a hard go/no-go call alone. That picture is available up to 14 days out.</p>

<blockquote><p>&ldquo;PlaneWX doesn&rsquo;t tell you not to fly. It gives you the information to make that decision yourself &mdash; days earlier, when you still have options. 5X5 is the first insurer I&rsquo;ve seen that treats that kind of preparation as something worth underwriting.&rdquo;</p><cite>&mdash; Mark Wolfgang, founder of PlaneWX, a Navy veteran and commercial instrument-rated pilot</cite></blockquote>

<p>Verified PlaneWX Pro Plus members earn a 5% risk-based premium credit at quote and bind, subject to 5X5 underwriting guidelines. At renewal, members who continue their PlaneWX Pro Plus membership may receive additional credit available for pilots who use the platform on at least 75% of their flights. Eligible pilots can receive up to 10% in total premium credits through the program. All credits are risk-based, trace to a documented loss-mitigation rationale, and are subject to 5X5&rsquo;s underwriting guidelines and applicable filings.</p>

<p>The partnership works because both companies treat preparation as evidence rather than as a slogan. A WX Score is a number. An integrated PAVE risk assessment, plus a mentor who can see the full briefing, is a process. 5X5 underwrites that process.</p>

<blockquote><p>&ldquo;We believe the way a pilot prepares and operates tells us something about risk. PlaneWX gives pilots another tool to make better decisions before they fly, and our job is to recognize that behavior in the underwriting process. Safe and smart is how we describe our policies.&rdquo;</p><cite>&mdash; Doug Tibbs, Managing Director of 5X5 Aviation Insurance</cite></blockquote>

<p>PlaneWX is complementary to the tools pilots already use. It does not replace an electronic flight bag or an official weather source, and its outputs are decision-support tools rather than a substitute for pilot-in-command judgment. What it does is the synthesis those tools leave to the pilot &mdash; against this aircraft, these minimums, this route &mdash; early enough that a change of plan is still a change of plan, not a last-minute call with bags packed.</p>

<p>PlaneWX does not evaluate, recommend, or warrant the suitability of any insurance product for any pilot, and receives no compensation tied to the sale, quotation, or renewal of any insurance policy. PlaneWX members remain free to insure with any carrier they choose. 5X5 and PlaneWX have a paid co-marketing relationship supporting joint safety content.</p>

<p>Pilots can learn more at <a href="https://www.planewx.ai">www.planewx.ai</a>. Coverage and credits are available through 5X5 at <a href="https://www.5x5insurance.com" target="_blank" rel="noopener noreferrer">www.5x5insurance.com</a>, subject to eligibility and underwriting guidelines. The two companies will also publish joint content on weather and better decision-making, including a video series and a quarterly newsletter.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>About 5X5 Aviation Insurance</h2>
<p>5X5 Aviation Insurance is an aviation insurance service company headquartered in Minneapolis, Minnesota. With a data-driven, direct-to-consumer model, 5X5 provides coverage to pilots and owners of fixed-wing, high-performance aircraft in 38 states and plans to expand underwriting to all 48 contiguous states. 5X5 writes on AM Best A- (Excellent) rated paper, backed by strong financial reserves and full compliance with all capitalization and regulatory requirements. 5X5 Aviation Insurance is an Invenshure-built company.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
]

export function getNewsItem(slug: string): NewsItem | undefined {
  return NEWS_ITEMS.find((n) => n.slug === slug)
}
