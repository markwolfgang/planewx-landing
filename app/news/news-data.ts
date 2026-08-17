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
   * Optional hero image under the excerpt. Width/height are the asset's
   * intrinsic pixels, for aspect ratio only.
   */
  heroImage?: {
    src: string
    alt: string
    width: number
    height: number
    caption?: string
  }
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
    href?: string
  }
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "5x5-aviation-insurance-exclusive-partner",
    category: "Partnerships",
    title: "PlaneWX Names 5X5 Aviation Insurance Its Exclusive Insurance Partner",
    excerpt:
      "Verified PlaneWX Pro Plus members are eligible for risk-based premium credits through 5X5's Safety Rewards program — underwriting recognition for the preflight work pilots already do.",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    location: "St. Petersburg, Florida",
    coBrand: {
      name: "5X5 Aviation Insurance",
      logo: "/logos/5x5-wordmark-white.webp",
      logoWidth: 1000,
      logoHeight: 327,
      href: "https://www.5x5insurance.com",
    },
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 17, 2026 &mdash;</strong> PlaneWX, the pilot&rsquo;s decision support system, today named <a href="https://www.5x5insurance.com" target="_blank" rel="noopener noreferrer">5X5 Aviation Insurance</a> its exclusive insurance partner. Verified PlaneWX Pro Plus members are eligible for risk-based premium credits through 5X5&rsquo;s Safety Rewards program &mdash; recognition, in the underwriting process, of the preparation pilots already do before they fly.</p>

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
<p>5X5 Aviation Insurance is an aviation insurance service company headquartered in Minneapolis, Minnesota. With a data-driven, direct-to-consumer model, 5X5 provides coverage to pilots and owners of fixed-wing, high-performance aircraft in 38 states and plans to expand underwriting to all 48 contiguous states. 5X5 writes on AM Best A- (Excellent) rated paper, backed by strong financial reserves and full compliance with all capitalization and regulatory requirements. 5X5 Aviation Insurance is an Invenshure-built company. <a href="https://www.5x5insurance.com" target="_blank" rel="noopener noreferrer">www.5x5insurance.com</a></p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "pro-plus-launch",
    category: "Product",
    title: "PlaneWX Launches Pro Plus",
    excerpt:
      "A new plan for pilots who fly enough that the briefing should follow the airplane — Ground Protection, Auto-Brief, a pre-flight text, and eligibility for 5X5's risk-based premium credits.",
    date: "August 17, 2026",
    isoDate: "2026-08-17",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 17, 2026 &mdash;</strong> PlaneWX today launched Pro Plus, a new plan for pilots who fly enough that weather intelligence should follow the airplane, not the other way around.</p>

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
    slug: "foreflight-share-to-planewx",
    category: "Product",
    title: "Send a ForeFlight Plan to PlaneWX Without Retyping",
    excerpt:
      "On iPhone, ForeFlight’s Send To sheet can hand the route to PlaneWX. On any device, paste still works. Either way, the trip opens prefilled — it does not brief itself.",
    date: "August 12, 2026",
    isoDate: "2026-08-12",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 12, 2026 &mdash;</strong> PlaneWX now takes a flight plan out of ForeFlight without making you type the route twice. On iPhone, use ForeFlight&rsquo;s <strong>Send To</strong> sheet and pick PlaneWX. The app extracts the plan &mdash; route text, a Flight Documents PDF, or GPX &mdash; and opens <strong>Watch a New Trip</strong> already filled in.</p>

<p>That is a handoff, not a briefing. You still pick the date, the airplane, and the flight rules, then run the weather. PlaneWX does not file the flight, and it does not auto-brief on share.</p>

<p>ForeFlight&rsquo;s Share FPL web link is still behind ForeFlight&rsquo;s login wall, so that path is not supported. If Send To is not on the phone you have, paste the route string into New Trip the way you already can from ForeFlight, Garmin Pilot, or a printed plan. Airways get stripped. Origin and destination fill from the first and last fix &mdash; including international routes.</p>

<p>Long multi-leg navlogs can exceed the share payload. If that happens, paste the route instead. The in-app walkthrough is at <a href="https://app.planewx.ai/help/route-paste">app.planewx.ai/help/route-paste</a>.</p>

<p>PlaneWX is complementary to the electronic flight bag. ForeFlight remains the place many pilots build the route. PlaneWX is the decision support on that same route &mdash; a WX Score against this airplane and these minimums, early enough that a change of plan is still a change of plan.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "ifr-wx-score-on-vfr-briefing",
    category: "Product",
    title: "The Same Weather, Scored as IFR",
    excerpt:
      "If you are instrument-rated and the airplane is IFR-certified, a VFR WX Score crushed by ceilings is not the whole story. PlaneWX now shows the IFR number on the same briefing — and lets you switch the leg with one tap.",
    date: "August 12, 2026",
    isoDate: "2026-08-12",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 12, 2026 &mdash;</strong> A VFR WX Score in the basement is often ceilings and visibility, not ice or storms. If you are instrument-rated and the airplane is IFR-certified, that number is answering the wrong rules. PlaneWX now shows what the same weather scores under IFR &mdash; on the briefing you already have.</p>

<p>The idea came from Wayne (<a href="https://app.planewx.ai/pilot/waynemcc">@waynemcc</a>), a PlaneWX mentor: a second number on the same weather, not a second briefing, and not a silent rules change.</p>

<p>When it qualifies, a green <strong>X% if IFR*</strong> appears next to the VFR WX Score. The asterisk is the currency note. PlaneWX assumes you are instrument current. It does not check.</p>

<p>All four have to be true, or you will not see it:</p>
<ul>
<li>The leg is VFR</li>
<li>Your pilot profile has an instrument rating</li>
<li>The aircraft is marked IFR-certified</li>
<li>IFR would actually help &mdash; at least 20 points, and at least 20 of those points from ceiling, visibility, or IMC rules, not from ice, turbulence, or storms that still apply</li>
</ul>

<p>Switch to IFR &amp; re-brief on the briefing or in Path to Favorable. Confirm, and that leg becomes IFR at that score. Ice, turbulence, and convection still count. Filing IFR does not erase a thunderstorm.</p>

<p>Owner-only. Shared, public, and group views never show the dual score or the switch. It does not flip you automatically.</p>

<p>The in-app guide is at <a href="https://app.planewx.ai/help/switch-to-ifr">app.planewx.ai/help/switch-to-ifr</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "international-pilots",
    category: "Product",
    title: "PlaneWX Works Worldwide — and We Keep Adding What Each Country Needs",
    excerpt:
      "Pilots in 30 countries are using PlaneWX, with briefings filed in 35. The briefing is not a U.S. product with a few extras bolted on. When a new country shows up, we add the products that route actually needs.",
    date: "August 11, 2026",
    isoDate: "2026-08-11",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 11, 2026 &mdash;</strong> PlaneWX is used by pilots in 30 countries, with briefings filed in 35. That is not a U.S. tool that happens to accept a foreign ICAO code. Any four-letter ICAO airport can be a departure or an arrival. The briefing is built for that route.</p>

<p>Outside the continental U.S., ECMWF is the primary global model &mdash; winds, temperature, and icing on a grid that covers the planet. International SIGMETs for severe turbulence, icing, volcanic ash, and tropical cyclones are checked against the corridor. U.S.-only products such as G-AIRMETs and WPC discussions drop off so the briefing is not full of empty American sections. When both airports sit outside FAA jurisdiction, a regulatory context block names the rule set that applies: EASA, Transport Canada, or ICAO Annex 2 VFR minima.</p>

<p>The customizations keep coming because the pilots keep writing. Canada is the largest group outside the United States. Those routes pick up Environment Canada&rsquo;s HRDPS where the domain covers the flight, and Canadian RSC runway reports map to the same RWYCC 0&ndash;6 scale as U.S. FICON. Europe gets Germany&rsquo;s DWD models &mdash; ICON EU at 7 km and ICON D2 at 2 km &mdash; and, as of today, M&eacute;t&eacute;o-France AROME at 2.5 km on western European routes where both endpoints qualify. AROME does not replace ICON. On a qualifying London or Paris leg you can have five independent icing models instead of two globals. ICON D2 is the one that sees Alpine lenticulars and valley fog the coarse grids miss. European briefings also get a GRAMeT cross-section along the actual route and time.</p>

<p>Regional wind names are in the engine when they matter: F&ouml;hn, Bora, Mistral, Tramontane, Chinook, Norwester, Zonda. Tropical cyclones within 500 NM of the path are flagged. Worldwide navaids resolve. You can paste an international route string and the Mexican, Canadian, and Caribbean fixes come with it.</p>

<p>We are not done. A new country is an invitation, not a corner case. Email what the briefing is missing and we will go find the product that country actually files. Some things are still U.S.-only &mdash; Ground Protection evaluation is U.S. airports, and international NOTAMs are not in the briefing yet. Always supplement with the local AIS, the AIP, and the MET office that owns that airspace. The WX Score was calibrated on U.S. flights; treat the international number as a strong indicator, not a certified measurement.</p>

<p>Alaska, Hawaii, Puerto Rico, and the Pacific territories stay FAA jurisdiction. You get the domestic briefing, not the international caveats.</p>

<p>The in-app guide is at <a href="https://app.planewx.ai/help/international-airports">app.planewx.ai/help/international-airports</a>. Pilots can start at <a href="https://www.planewx.ai">www.planewx.ai</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "forecast-office-on-briefing",
    category: "Product",
    title: "Your Forecast Office, In Your Own Briefing",
    excerpt:
      "Four times a day a meteorologist at your NWS office writes what they think the weather is doing and why. PlaneWX now puts that office — and their own sentence — on the home airport card, the morning digest, and the briefing.",
    date: "August 9, 2026",
    isoDate: "2026-08-09",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; August 9, 2026 &mdash;</strong> A TAF will tell you the wind shifts at 18Z. It will not tell you the forecaster thinks the front may stall before it gets to you. That sentence lives in the Area Forecast Discussion &mdash; the product almost nobody reads. PlaneWX now reads all 123 of those discussions and puts your office on the briefing.</p>

<p>This is part of Synoptic Intelligence&trade;, and it is on every plan, including Free.</p>

<p>On the home airport card you get the boundary your office is tracking and where it stands: approaching, moving through, or already past. Underneath it, the forecaster&rsquo;s own sentence, quoted. If that text is not in the published discussion, the quote is dropped rather than shown. The card carries issuance age, and it shifts to past tense once a newer discussion has replaced it. The office name links to that office&rsquo;s weather.gov page so you can read the whole thing.</p>

<p>Frontal timing in the briefing now comes from the office responsible for your airport, resolved against your departure time &mdash; not against the moment you hit refresh, and not against a generic guess about how fast fronts move. A front approaching this afternoon may already be past by tomorrow&rsquo;s departure, and the briefing says so. Departure-window suggestions are framed around that boundary: leave ahead of it, or wait for it to clear. The morning digest carries the same read.</p>

<p>A front near your airport is not a front coming to your airport. Forecasters write about boundaries they expect to stall, weaken, or slide by to the north. PlaneWX now reads whether the office actually expects it to reach their area. When they do not, the briefing describes the day-to-day airmass change instead of putting you on the wrong side of a line that never passes.</p>

<p>Coverage is every office that issues an Area Forecast Discussion: the continental U.S., Alaska, Hawaii, Puerto Rico, the U.S. Virgin Islands, Guam, and American Samoa.</p>

<p>The in-app guide is at <a href="https://app.planewx.ai/help/forecast-office">app.planewx.ai/help/forecast-office</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "live-radar-convective-score",
    category: "Product",
    title: "Live Radar Now Changes the Thunderstorm Score",
    excerpt:
      "Models answer whether storms could fire. MRMS radar answers whether they are on your path right now. When the corridor is empty, that thunderstorm deduction can go away — CONUS, near-term, and only downward.",
    date: "July 29, 2026",
    isoDate: "2026-07-29",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; July 29, 2026 &mdash;</strong> A loaded airmass is not the same thing as storms on your route. PlaneWX already scored thunderstorms from the models. As of today, live radar from NOAA&rsquo;s Multi-Radar/Multi-Sensor mosaic can change that number &mdash; but only in one direction, and only when it has actually looked at the corridor you fly.</p>

<p>Convective Watch now shows two badges on the same segment bar: what the atmosphere supports, and what is painting. Model is potential. Radar is now. When they disagree and radar is the more credible of the pair, the route-coverage thunderstorm deduction can come down. If the corridor is quiet, that deduction can go to zero instead of leaving a few points behind on a clear day.</p>

<p>Quiet is strict. Nothing at or above 30 dBZ within 10 nautical miles of the course, no lightning, and nothing at 45 dBZ there in the past hour. A single moderate cell on your path is not quiet. Radar never adds a thunderstorm deduction. Convective SIGMETs, TAF and METAR thunderstorms, and your personal-minimum hard limits are untouched. A quiet corridor cannot undo a ceiling that has already grounded the flight.</p>

<p>Radar is a nowcast, not a 14-day forecast. It attaches when part of the flight falls inside roughly the next two hours, the route has MRMS coverage &mdash; the continental U.S. and nearby mosaic &mdash; and the image is fresher than 20 minutes. Farther out, the models keep the call. If radar has seen less than 70 percent of the route points, it does not get to vouch for the rest.</p>

<p>This is not a crystal ball. It is the difference between &ldquo;the airmass could support storms&rdquo; and &ldquo;the scope is empty on the path you will actually fly.&rdquo;</p>

<p>The in-app guide is at <a href="https://app.planewx.ai/help/live-radar">app.planewx.ai/help/live-radar</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "oshkosh-wildfire-smoke",
    category: "Product",
    title: "Wildfire Smoke on the Briefing — and 104 Journeys Into Oshkosh",
    excerpt:
      "Smoke can wreck VFR visibility a long way from the fire, while both METARs still look fine. PlaneWX now scores that corridor. During AirVenture week, 104 PlaneWX journeys were planned into Wittman Regional.",
    date: "July 21, 2026",
    isoDate: "2026-07-21",
    location: "Oshkosh, Wisconsin",
    heroImage: {
      src: "/news/oshkosh-flight-map.png",
      alt: "Map of PlaneWX journeys converging on Oshkosh, colored by WX Score",
      width: 1024,
      height: 860,
      caption:
        "PlaneWX journeys into Wittman Regional (KOSH). Color is WX Score. Solid lines are flown (ADS-B); dashed are planned.",
    },
    body: `
<p><strong>Oshkosh, Wisconsin &mdash; July 21, 2026 &mdash;</strong> EAA AirVenture is underway, and 104 PlaneWX journeys are on the map into Wittman Regional. That is not a claim that we got anyone here. Those pilots planned the trip, ran the briefing, and made the call. The map is the community looking at the same week from every coast.</p>

<p>A lot of those routes crossed wildfire smoke. METARs at departure and arrival can still look VFR while the corridor between them is haze. You need to see the ground and the next waypoint. As of July 15, PlaneWX samples smoke along the route so that problem shows up before you are airborne.</p>

<p>When NOAA&rsquo;s Hazard Mapping System detects smoke near the route, a plume draws on the map. Corridor points show estimated visibility where particulate data exists. The briefing names severity, how much of the route is affected, and the lowest estimated visibility. For VFR, that visibility is scored against your personal minimums &mdash; the same soft and hard limits you already use at the airports, applied en-route. Below the hard minimum, the WX Score goes to 0% and the breakdown names en-route smoke. Between soft and hard is a caution on the same curve, not a separate smoke scale. You need a VFR visibility hard minimum on file for smoke to produce a NO-GO. Soft-only profiles still see the overlay.</p>

<p>IFR flights still show the smoke. Smoke alone does not change an IFR WX Score. Instrument rules are not visibility-limited the same way.</p>

<p>The push to treat smoke as a first-class input came from Steve, <a href="https://www.youtube.com/@FlightChops" target="_blank" rel="noopener noreferrer">FlightChops</a>, PlaneWX&rsquo;s YouTube partner. He walked through it in <a href="https://www.youtube.com/watch?v=EJ5s4XzmQ2M" target="_blank" rel="noopener noreferrer">this video</a>. A YouTube video does not make a go/no-go. The score does not either. It puts the plume on the same briefing as the rest of the weather, against the minimums you set.</p>

<p>Data is NOAA HMS plume outlines plus PM2.5 where we have it. Plumes are broad. They can extend past the air that is actually thick. Always look out the window, and always use the official weather you already file with.</p>

<p>If you are on the field this week: Mark Wolfgang is giving <a href="https://events.rdmobile.com/Sessions/Details/3567392" target="_blank" rel="noopener noreferrer">Advanced Aviation Risk Management</a> tomorrow, Wednesday, July 22, 4:00&ndash;5:15 p.m. CDT, Forum Stage 10. Meetup at 11 a.m. at Flyte Booth 337. Details at <a href="https://www.planewx.ai/osh">planewx.ai/osh</a>.</p>

<p>The in-app guide is at <a href="https://app.planewx.ai/help/wildfire-smoke">app.planewx.ai/help/wildfire-smoke</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "ground-protection",
    category: "Product",
    title: "Ground Protection Watches the Airplane After You Land",
    excerpt:
      "A briefing card answers whether the destination ramp is safe to leave the airplane on. Then, if you want it, texts keep watching — and you can tell PlaneWX hangar, ramp, or home from your phone.",
    date: "July 16, 2026",
    isoDate: "2026-07-16",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; July 16, 2026 &mdash;</strong> PlaneWX today named Ground Protection as an always-on watch for parked aircraft, with optional text alerts. The same weather engine already appears on the briefing as <strong>While You&rsquo;re There</strong> &mdash; so the hangar, preheat, and wind picture is on the trip before you leave, not after you&rsquo;re standing on someone else&rsquo;s ramp.</p>

<p>A WX Score answers whether you should fly. It does not answer whether the airplane is safe sitting there for the next few days. Hail, a gust front, freezing rain, and a hard freeze do not care that you already landed. While You&rsquo;re There is that second question. It does not change the WX Score or a go/no-go call. It tells you whether you need a hangar, a preheat, or a harder look at the tie-downs.</p>

<h2>On the briefing, before you go</h2>
<p>On eligible U.S. trips, the briefing shows a card titled <strong>While You&rsquo;re There</strong> after the Gotchas. PlaneWX infers how long the airplane will sit: a later leg from the same airport, a separately saved return trip, or a stated 72-hour assumption if no return is on the books yet. Day-by-day detail follows the NWS point forecast, about seven days. Farther out is a lower-confidence preview.</p>

<p>When an Urgent or Alert advisory is in the stay window, the card says hangar or shade is recommended. The advisories underneath are the reason to call the FBO early &mdash; hangar space fills &mdash; not a reservation. PlaneWX does not book hangars.</p>

<p>What the engine actually watches:</p>
<ul>
<li><strong>Convective</strong> &mdash; tornado and severe thunderstorm watches and warnings, hail, and convective wind</li>
<li><strong>Wind</strong> &mdash; forecast wind against the aircraft&rsquo;s advisory and critical limits, plus high-wind products</li>
<li><strong>Cold</strong> &mdash; overnight at or below the preheat threshold, below POH minimum operating temperature, freezing rain or drizzle, and likely snow</li>
<li><strong>Heat</strong> &mdash; highs at or above 95&deg;F, with a stronger alert at 105&deg;F</li>
<li><strong>Regional</strong> &mdash; ice storm, hurricane and tropical, flood, and similar NWS events that matter to a parked airplane</li>
</ul>
<p>Typical guidance is practical: arrange engine preheat or hangar overnight; ensure the airplane is tied down or hangared when wind is above the aircraft limit; hangar now if freezing rain is coming. It is not frost monitoring. There is no frost check in the engine.</p>

<p>You can tell the briefing how the airplane will be stored on that stay &mdash; open ramp, tie-downs, shade hangar, hangar, or climate-controlled hangar. An enclosed hangar demotes the wind and storm advisories to reference. A climate hangar also covers cold and heat. Tie-downs alone do not silence an Urgent watch.</p>

<h2>Then the texts, if you want them</h2>
<p>Ground Protection is the always-on version of the same watch. Turn it on for an aircraft and PlaneWX keeps evaluating the parked location on an hourly cycle. New Urgent or Alert threats can come by text, outside quiet hours (10 p.m. to 7 a.m. by default). You can also watch without texts.</p>

<p>Texts require a verified phone number and an opt-in. First evaluation seeds what is already in play, so you are not spammed with current weather as if it were new.</p>

<p>Reply with a keyword. The parser is keywords, not a sentence:</p>
<ul>
<li><strong>HANGAR</strong> (or HANGARED, SECURED) &mdash; the airplane is in a hangar</li>
<li><strong>RAMP</strong> (or OPEN, UNHANGAR) &mdash; it is back on the open ramp</li>
<li><strong>HOME</strong> &mdash; clear the away override and resume the home or standby airport</li>
<li><strong>WX</strong> &mdash; a weather snapshot for the watch airport, even during quiet hours</li>
<li><strong>STATUS</strong> &mdash; what is being watched</li>
<li><strong>HELP</strong> &mdash; the command list</li>
</ul>
<p>Add a tail if you have more than one airplane on the watch: <code>HANGAR N916CM</code> or the last three, <code>RAMP 6CM</code>.</p>

<h2>Where it thinks the airplane is</h2>
<p>Ground Protection does not move the watch off live ADS-B. The location is parked override, then standby airport, then home airport. You set that in the app or by texting HANGAR, RAMP, or HOME.</p>

<p>If the tail is in FlightAware history and you turn on Follow Me, the morning digest can use the last landing airport. When that lookup shows the airplane back at home after it was away, PlaneWX clears the parked override &mdash; the same effect as texting HOME. A missed FlightAware lookup does not wipe an away airport. If FlightAware never saw the flight, the override you set by hand stays put.</p>

<h2>Who gets it</h2>
<p>While You&rsquo;re There is on eligible briefings for Pro and above. Always-on Ground Protection and the texts are Pro Plus (up to three aircraft) and Enterprise. Evaluation is U.S. airports. It is complementary to the EFB and official weather you already use, and it is not a substitute for PIC judgment or a call to the FBO.</p>

<p>Pro Plus is <a href="/news/pro-plus-launch">$29.99 a month or $249 a year</a>. Pilots can start at <a href="https://www.planewx.ai">www.planewx.ai</a>. The in-app guide is at <a href="https://app.planewx.ai/help/ground-weather">app.planewx.ai/help/ground-weather</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
  {
    slug: "oshkosh-talk-advanced-aviation-risk-management",
    category: "Company",
    title: "Mark Wolfgang to Speak at EAA AirVenture Oshkosh",
    excerpt:
      "The PlaneWX founder gives Advanced Aviation Risk Management on Wednesday, July 22, 4:00–5:15 p.m. CDT, Forum Stage 10 — WX Score inside a PAVE risk assessment, and why the decision has to start before the TAF.",
    date: "July 12, 2026",
    isoDate: "2026-07-12",
    location: "St. Petersburg, Florida",
    body: `
<p><strong>St. Petersburg, Florida &mdash; July 12, 2026 &mdash;</strong> Mark Wolfgang, founder of PlaneWX, will give a forum talk at EAA AirVenture Oshkosh 2026: <a href="https://events.rdmobile.com/Sessions/Details/3567392" target="_blank" rel="noopener noreferrer">Advanced Aviation Risk Management</a>. Wednesday, July 22, 4:00&ndash;5:15 p.m. CDT, Forum Stage 10, sponsored by Poly Fiber Inc.</p>

<p>The session is about the go/no-go that starts weeks out, not the night before. Automation &mdash; and a little AI &mdash; can pull the weather products together, run them against your personal minimums and the airplane you actually fly, and put a WX Score inside a PAVE risk assessment. That is the job PlaneWX was built for: the confidence to go, or the courage to stay.</p>

<p>Wolfgang is a Navy veteran and commercial instrument-rated pilot. He built PlaneWX because TAFs cover about 24 hours and most trips are planned well before that. The talk walks through how a personalized score, an integrated risk assessment, and a mentor who can see the full briefing change that timeline.</p>

<p>Same day, earlier: a PlaneWX meetup at 11:00 a.m. CDT at Flyte Booth 337 &mdash; Mark and Sara, drinks, and a giveaway (must be present to win). There is also a drawing at the talk. Details and calendar files are at <a href="https://www.planewx.ai/osh">planewx.ai/osh</a>.</p>

<p>AirVenture runs July 20&ndash;26, 2026, at Wittman Regional Airport. The EAA listing is <a href="https://events.rdmobile.com/Sessions/Details/3567392" target="_blank" rel="noopener noreferrer">events.rdmobile.com/Sessions/Details/3567392</a>.</p>

<h2>About PlaneWX</h2>
<p>PlaneWX is the pilot&rsquo;s decision support system, founded in 2025 by Mark Wolfgang, a Navy veteran and commercial instrument-rated pilot. Its WX Score synthesizes authoritative weather data against each pilot&rsquo;s specific aircraft and personal minimums, feeds an integrated flight risk assessment built on the FAA&rsquo;s PAVE framework, and connects pilots to a peer mentor network &mdash; so go/no-go planning can start up to 14 days out, not the night before. Tagline: The confidence to go, or the courage to stay&trade;.</p>

<h2>Media contact</h2>
<p>Mark Wolfgang, PlaneWX<br/><a href="mailto:hello@planewx.ai">hello@planewx.ai</a><br/><a href="https://www.planewx.ai">www.planewx.ai</a></p>
`,
  },
]

export function getNewsItem(slug: string): NewsItem | undefined {
  return NEWS_ITEMS.find((n) => n.slug === slug)
}
