// PlaneWX Learning Center: weather product explainers, concepts, and ADM.
// To add an article: prepend a new object to LEARN_ARTICLES (or append within section order).
// To add a tip: prepend to TIPS_OF_THE_WEEK (newest first) as each Weekly PIREP is archived.
//
// Indexing safety: LEARN_PUBLIC gates the Learning Center hub and allowlisted
// articles. Draft and non-allowlisted articles stay reachable by URL for review,
// but robots noindex and stay out of the sitemap / JSON-LD.

export const LEARN_PUBLIC = true

/** Flip LEARN_PUBLIC only after this many non-draft, sourced articles ship. */
export const LEARN_PUBLIC_MIN_ARTICLES = 3

/**
 * Allow list of /learn/[slug] articles that may index, emit JSON-LD, and appear
 * in the sitemap when LEARN_PUBLIC is true.
 *
 * Default is gated: any article (current or future) whose slug is not on this
 * list stays noindex, out of the sitemap, and without JSON-LD, even when
 * LEARN_PUBLIC is true and draft is false. Tips of the Week are never on this
 * list (hub archive only). Add a slug here deliberately when SEO clears it.
 *
 * Shipped now: mos-vs-nbm-vs-taf.
 * Still gated: tcf-vs-ecfp, tip what-the-wx-score-actually-is, Tips archive.
 */
export const INDEXABLE_LEARN_ARTICLE_SLUGS = [
  "mos-vs-nbm-vs-taf",
] as const

export type LearnSection =
  | "Weather Products"
  | "Weather Knowledge"
  | "Decision-Making"

export type LearnPublisher = "FAA" | "NWS" | "AWC" | "MDL" | "NTSB" | "AOPA ASI"

export interface LearnSource {
  label: string
  url: string
  publisher: LearnPublisher
}

export type LearnBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "htmlComment"; text: string }

/** Decision-support loop stages. Mentor is an optional layer, not a fifth step. */
export type LearnLoopStage =
  | "Weather Briefing"
  | "FRAT"
  | "GO / NO-GO"
  | "Self Debrief"

export const LEARN_LOOP_STAGES: readonly LearnLoopStage[] = [
  "Weather Briefing",
  "FRAT",
  "GO / NO-GO",
  "Self Debrief",
] as const

/**
 * Required on every article. Teach first, pitch second: how the idea is put
 * into practice without a dispatcher. Not an ad. Soft CTA stays at page bottom.
 */
export interface PuttingItIntoPractice {
  /** Why this matters for pilots flying without a dispatcher. */
  whyItMatters: string
  /**
   * One or more of the four loop stages. Mentor may be noted in toolOrHabit
   * as an optional layer; it is not a loop stage.
   */
  loopStage: [LearnLoopStage, ...LearnLoopStage[]]
  /** Which PlaneWX tool or habit supports it (plain text). */
  toolOrHabit: string
  /** Optional dark-mode screenshot. */
  screenshot?: {
    src: string
    alt: string
  }
}

export interface LearnArticle {
  slug: string
  title: string
  section: LearnSection
  summary: string
  body: LearnBodyBlock[]
  /** Required. Rendered after the educational body and before Sources. */
  puttingItIntoPractice: PuttingItIntoPractice
  /** ISO date, e.g. "2026-09-25" */
  lastReviewed: string
  sources: LearnSource[]
  /**
   * Draft articles render a visible banner, stay noindex, and stay out of the
   * sitemap. Bodies must not invent weather facts until a reviewed fact pack lands.
   */
  draft: boolean
}

/**
 * Weekly PIREP tip archive. Same list/prepend pattern as NEWS_ITEMS.
 * Tips are listed as archived. Hub shows a standing empty-state line when none are published.
 */
export interface TipOfTheWeek {
  slug: string
  title: string
  summary: string
  /** Human-readable, e.g. "September 25, 2026" */
  date: string
  /** ISO date, e.g. "2026-09-25" */
  isoDate: string
  /** Weekly PIREP issue number the tip ran in */
  issueNumber: number
  body: LearnBodyBlock[]
  draft?: boolean
}

export const LEARN_SECTIONS: {
  id: LearnSection
  description: string
}[] = [
  {
    id: "Weather Products",
    description:
      "Explainers for aviationweather.gov products: what each one is for, and how to read it in context.",
  },
  {
    id: "Weather Knowledge",
    description:
      "Concepts such as dry lines, troughs and ridges, and what they mean for your flight.",
  },
  {
    id: "Decision-Making",
    description:
      "ADM best practices from FAA risk-management material. Habits that keep the PIC in command.",
  },
]

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "mos-vs-nbm-vs-taf",
    title: "TAF vs MOS, LAMP and NBM",
    section: "Weather Products",
    summary:
      "TAFs are the official NWS terminal forecast. This article compares them with MOS, LAMP and NBM guidance, and explains why many small airports never get a forecaster-written TAF.",
    lastReviewed: "2026-09-25",
    draft: false,
    body: [
      {
        type: "heading",
        text: "What a TAF is and what it covers",
      },
      {
        type: "paragraph",
        text: "A Terminal Aerodrome Forecast (TAF) is the official NWS terminal forecast for an airport. Weather Forecast Office (WFO) forecasters prepare and monitor TAFs using professional judgment in AvnFPS. An NDFD formatter may build a first-guess TAF that forecasters should edit.",
      },
      {
        type: "paragraph",
        text: "Coverage is the area within 5 statute miles of the center of the runway complex. Vicinity (VC) means 5 to 10 SM. Elements include surface wind, visibility, weather, obstructions to vision, clouds or vertical visibility, non-convective low-level wind shear, and significant changes.",
      },
      {
        type: "paragraph",
        text: "The valid period is ordinarily 24 hours. FAA-specified international airports get 30-hour TAFs. TAFs are scheduled four times daily, every six hours, with amendments as needed. FAA Core 30 airports get scheduled amendments every 3 hours. TEMPO groups do not exceed 4 hours. PROB groups are 6 hours or less. Formats include TAC and IWXXM.",
      },
      {
        type: "paragraph",
        text: "According to the Aviation Weather Center, TAFs are issued for nearly 700 U.S. airports, typically 20 to 40 minutes before the valid time. The airport network changes over time through NWS service change notices.",
      },
      {
        type: "htmlComment",
        text: "SLOT: TAF decoding walkthrough pending fact pack",
      },
      {
        type: "heading",
        text: "MOS, LAMP and NBM: guidance, not the official TAF",
      },
      {
        type: "paragraph",
        text: "MOS, LAMP and NBM are forecast guidance that forecasters use as input. The TAF remains the official NWS terminal forecast. PlaneWX complements FAA and Flight Service weather products. PlaneWX is decision support. It is not a substitute for your full preflight briefing (for example a standard briefing through Flight Service or your EFB).",
      },
      {
        type: "heading",
        text: "MOS (Model Output Statistics)",
      },
      {
        type: "paragraph",
        text: "MOS is made by NOAA's Meteorological Development Laboratory (MDL). It is statistical post-processing that uses multiple linear regression. Predictors are numerical model output, prior observations and geoclimatic data. It runs on the GFS and the NAM.",
      },
      {
        type: "paragraph",
        text: "GFS MOS coverage includes CONUS, Alaska, Hawaii, Puerto Rico, the U.S. Virgin Islands and some Pacific islands.",
      },
      {
        type: "list",
        items: [
          "MAV (short-range GFS MOS): runs 00, 06, 12 and 18 UTC, 6 to 72 hours, over 1500 stations. Includes ceiling (CIG), visibility (VIS) and obstruction to vision (OBV).",
          "MEX (extended-range GFS MOS): runs 00 and 12 UTC, 24 to 192 hours, over 1600 stations. The MEX card shows no ceiling or visibility elements.",
          "MET (NAM MOS): runs 00 and 12 UTC, 6 to 72 hours, same element set as MAV including CIG, VIS and OBV. NAM MOS is scheduled to end along with the NAM on October 14, 2026 at 1200 UTC (NWS SCN 26-47).",
        ],
      },
      {
        type: "heading",
        text: "LAMP (Localized Aviation MOS Program)",
      },
      {
        type: "paragraph",
        text: "LAMP is made by MDL. It is a statistical system that updates MOS every hour, with ceiling and visibility every 15 minutes, using recent observations, analyses, simple models, and MOS from models such as GFS and HRRR. It covers over 2000 stations.",
      },
      {
        type: "paragraph",
        text: "The standard range is 1 to 25 hours. It extends to 38 hours for key elements including temperature, dewpoint, wind, gusts, ceiling, visibility and obstruction to vision. Elements include ceiling, conditional ceiling, visibility, conditional visibility, obstruction to vision, lightning and convection.",
      },
      {
        type: "paragraph",
        text: "LAMP v2.7, implemented September 16, 2025 (NWS SCN 25-62), added flight-category bulletins for 1,818 CONUS stations: 15-minute periods out to 6 hours, and hourly out to 38 hours. Gridded LAMP (GLMP) is hourly, with ceiling and visibility every 15 minutes, on a 2.5 km grid. The LAMP FAQ defines VLIFR, LIFR, IFR, MVFR and VFR thresholds.",
      },
      {
        type: "heading",
        text: "NBM (National Blend of Models)",
      },
      {
        type: "paragraph",
        text: "NBM is a nationally consistent and skillful suite of calibrated forecast guidance that blends NWS and non-NWS model data and post-processed guidance. It serves as a starting point for the NDFD grids forecasters edit.",
      },
      {
        type: "paragraph",
        text: "NBM v5.0 became operational April 30, 2026 (NWS SCN 26-24). It runs every hour, with output out to 264 hours. Text bulletins cover over 9,000 land and marine stations: NBH hourly 1 to 25 hours, NBS 3-hourly 6 to 72 hours, NBE 12-hourly 24 to 192 hours, NBX 12-hourly 204 to 264 hours.",
      },
      {
        type: "paragraph",
        text: "NBH includes ceiling, visibility, lowest cloud base, and MVFR, IFR and LIFR ceiling and visibility probabilities. NBS includes ceiling, visibility and lowest cloud base. NBE has no ceiling or visibility.",
      },
      {
        type: "heading",
        text: "How they compare",
      },
      {
        type: "paragraph",
        text: "TAFs cover about 700 airports. MOS covers about 2,000 stations. LAMP covers over 2,000. NBM covers over 9,000. At many small airports, pilots see only automated guidance, never a forecaster-written TAF.",
      },
      {
        type: "list",
        items: [
          "TAF: Who makes it: NWS WFO forecasters (AvnFPS, professional judgment). How: official terminal forecast. Run times: scheduled 4x daily (every 6 hours), amendments as needed; Core 30 get scheduled amendments every 3 hours. Range: ordinarily 24 hr (30 hr at FAA-specified international airports). Ceiling and visibility: included. Stations: nearly 700 U.S. airports. Official or guidance: official.",
          "MOS: Who makes it: MDL. How: statistical post-processing (multiple linear regression) on GFS and NAM. Run times: MAV 00/06/12/18 UTC; MEX and MET 00/12 UTC. Range: MAV 6 to 72 hr; MEX 24 to 192 hr; MET 6 to 72 hr (NAM MOS scheduled to end Oct 14, 2026 at 1200 UTC). Ceiling and visibility: MAV and MET include CIG, VIS, OBV; MEX card shows no ceiling or visibility. Stations: MAV over 1500; MEX over 1600. Official or guidance: guidance.",
          "LAMP: Who makes it: MDL. How: statistical system that updates MOS every hour (ceiling and visibility every 15 minutes). Run times: hourly updates. Range: 1 to 25 hr standard; extends to 38 hr for key elements. Ceiling and visibility: yes (plus conditional ceiling/visibility, obstruction, lightning, convection). Stations: over 2000. Official or guidance: guidance.",
          "NBM: Who makes it: MDL. How: nationally consistent and skillful suite of calibrated forecast guidance; starting point for NDFD grids. Run times: every hour. Range: out to 264 hr (NBH 1 to 25 hr; NBS 6 to 72 hr; NBE 24 to 192 hr; NBX 204 to 264 hr). Ceiling and visibility: NBH and NBS yes; NBE no. Stations: over 9,000 land and marine. Official or guidance: guidance.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Without a dispatcher, you have to know whether you are reading an official forecaster TAF or automated guidance. That matters most at airports with no TAF, where MOS, LAMP or NBM may be what you have. Knowing which product you are looking at keeps the go/\u2060no\u2011go call grounded in what the product actually is.",
      loopStage: ["Weather Briefing"],
      toolOrHabit:
        "PlaneWX Weather Briefing and WX Score weigh forecast conditions against your own personal minimums. PlaneWX never recommends go or no-go. You make the GO\u00A0/\u00A0NO\u2011GO call.",
    },
    sources: [
      {
        label: "NWS Instruction 10-813, Terminal Aerodrome Forecasts (Oct 30, 2024)",
        url: "https://www.weather.gov/media/directives/010_pdfs/pd01008013curr.pdf",
        publisher: "NWS",
      },
      {
        label: "Aviation Weather Center: Data help (TAFs)",
        url: "https://aviationweather.gov/help/data/",
        publisher: "AWC",
      },
      {
        label: "MDL: Model Output Statistics (MOS)",
        url: "https://vlab.noaa.gov/web/mdl/mos",
        publisher: "MDL",
      },
      {
        label: "MDL: GFS MOS",
        url: "https://vlab.noaa.gov/web/mdl/gfs-mos",
        publisher: "MDL",
      },
      {
        label: "MDL: Short-Range GFS MOS (MAV)",
        url: "https://vlab.noaa.gov/web/mdl/short-range-gfs-mos",
        publisher: "MDL",
      },
      {
        label: "MDL: Extended-Range GFS MOS (MEX)",
        url: "https://vlab.noaa.gov/web/mdl/mex-card",
        publisher: "MDL",
      },
      {
        label: "MDL: NAM MOS (MET)",
        url: "https://vlab.noaa.gov/web/mdl/met-card",
        publisher: "MDL",
      },
      {
        label: "NWS SCN 26-47: Retire NAM, SREF, HREF, HiresW and NAM MOS",
        url: "https://www.weather.gov/media/notification/pdf_2026/SCN26-47_Updated_Retire_NAM_SREF_HREF_HiresW_NAM_MOS.aab.pdf",
        publisher: "NWS",
      },
      {
        label: "MDL: Localized Aviation MOS Program (LAMP)",
        url: "https://vlab.noaa.gov/web/mdl/lamp",
        publisher: "MDL",
      },
      {
        label: "MDL: LAMP card 2.7.0",
        url: "https://vlab.noaa.gov/web/mdl/lamp-card-2.7.0",
        publisher: "MDL",
      },
      {
        label: "NWS SCN 25-62: LAMP/GLMP v2.7",
        url: "https://www.weather.gov/media/notification/pdf_2025/scn25-62_lampglmp_v2.7aaa.pdf",
        publisher: "NWS",
      },
      {
        label: "MDL: Gridded LAMP (GLMP)",
        url: "https://vlab.noaa.gov/web/mdl/gridded-lamp",
        publisher: "MDL",
      },
      {
        label: "MDL: LAMP FAQ",
        url: "https://vlab.noaa.gov/web/mdl/lamp-faq",
        publisher: "MDL",
      },
      {
        label: "MDL: National Blend of Models (NBM)",
        url: "https://vlab.noaa.gov/web/mdl/nbm",
        publisher: "MDL",
      },
      {
        label: "MDL: NBM text products",
        url: "https://vlab.noaa.gov/web/mdl/nbm-text-products",
        publisher: "MDL",
      },
      {
        label: "MDL: NBM text card v5.0",
        url: "https://vlab.noaa.gov/web/mdl/nbm-textcard-v5.0",
        publisher: "MDL",
      },
      {
        label: "NWS SCN 26-24: NBM V5.0",
        url: "https://www.weather.gov/media/notification/pdf_2026/scn26-24_Updated_NBM_V5.0_aac.pdf",
        publisher: "NWS",
      },
    ],
  },
  {
    slug: "tcf-vs-ecfp",
    title: "TCF vs ECFP: Reading the Airline System's Convective Forecasts",
    section: "Weather Products",
    summary:
      "How the TFM Convective Forecast and Extended Convective Forecast Product help traffic managers and airline dispatch plan around storms, and how a GA pilot can read them as context (not as a go/\u2060no\u2011go product).",
    lastReviewed: "2026-09-25",
    draft: false,
    body: [
      {
        type: "paragraph",
        text: "TCF and ECFP are products built for traffic flow managers and airline dispatch, not as a pilot's go/\u2060no\u2011go product. They help a GA pilot see where the airline system expects storm trouble. They are not a substitute for SIGMETs, Convective SIGMETs, TAFs, radar or a Flight Service briefing.",
      },
      {
        type: "heading",
        text: "TCF (TFM Convective Forecast)",
      },
      {
        type: "paragraph",
        text: "The TCF is issued by the Aviation Weather Center. From March 1 to October 31 it is collaborated by AWC meteorologists, AWC staff at the FAA Command Center (ATCSCC), CWSUs at the ARTCCs, airlines and other authorized participants. From November 1 to February 28 it is automated, with no collaboration.",
      },
      {
        type: "paragraph",
        text: "It is issued every 2 hours, 24/7, 30 minutes before the nominal issuance time. There are no amendments. Valid times are 4, 6 and 8 hours after issuance. Coverage is FIRs covering the lower 48 states and adjacent coastal waters, plus part of southern Canada.",
      },
      {
        type: "paragraph",
        text: "Area criteria: composite reflectivity at least 40 dBZ, echo tops at or above FL250, coverage at least 25% of the polygon, and forecaster confidence at least 50%. Line criteria: at least 40 dBZ, at least 100 NM long, 75% or more linear coverage, tops at or above FL250, and confidence at least 50%. All criteria must be met. Convection below them is not shown. A blank TCF does not mean no thunderstorms.",
      },
      {
        type: "paragraph",
        text: "Everything shown is high confidence (50 to 100%). Coverage hatching: broken 25 to 39%, striped 40 to 74%, and a solid purple line for lines with 75 to 100% coverage. Tops come in four classes: 290, 340, 390 and above 400.",
      },
      {
        type: "paragraph",
        text: "Audience: traffic flow managers at the FAA ATCSCC and ARTCC Traffic Management Units, and airline and corporate flight operations centers. Stated purpose: \"Authoritative source of convective weather forecast information for Traffic Flow Management strategic planning.\" FAA TFM training is at tfmlearning.faa.gov.",
      },
      {
        type: "heading",
        text: "eTCF (Extended TCF)",
      },
      {
        type: "paragraph",
        text: "The Extended TCF is a model blend that uses the same criteria as the TCF. It is issued every 2 hours and is valid every 2 hours from 10 to 30 hours after issuance. It bridges TCF and ECFP.",
      },
      {
        type: "heading",
        text: "ECFP (Extended Convective Forecast Product)",
      },
      {
        type: "paragraph",
        text: "The ECFP is issued by AWC. It is fully automated: a model probability of thunderstorms only. The product is not a TCF forecast. It is issued around 01, 07, 13 and 19 UTC (four times a day), available 24/7. Coverage is CONUS.",
      },
      {
        type: "paragraph",
        text: "Probability contours are drawn at 30, 50 and 70%: blue hash 30 to 49%, solid orange line 50 to 69%, solid magenta fill above 70%. Stated purpose: a \"quick-look\" planning tool for where thunderstorm probability is greatest, supporting planning beyond the 8-hour TCF. Range covers later periods, roughly days 2 through 4 per AWC's product page. The FAA handbook describes it as covering up to about 3 days.",
      },
      {
        type: "heading",
        text: "Plain-language takeaways",
      },
      {
        type: "list",
        items: [
          "The TCF maps only organized, tall, high-confidence storms that would disrupt jet traffic, 4 to 8 hours out.",
          "The ECFP is an automated probability map for later days.",
          "A blank TCF does not mean no storms.",
          "The ECFP shows probability, not coverage or tops.",
          "Both were built for traffic managers and airline dispatch.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Without a dispatcher, looking at what airline dispatchers and traffic managers are planning around gives useful context days out. It is context for your own go/\u2060no\u2011go decision. PlaneWX never recommends go or no-go. The pilot makes the call.",
      loopStage: ["Weather Briefing", "GO / NO-GO"],
      toolOrHabit:
        "Brief early and re-brief as the flight gets closer, using the PlaneWX Weather Briefing with a WX Score against your personal minimums. That supports the GO\u00A0/\u00A0NO\u2011GO step.",
    },
    sources: [
      {
        label: "AWC: TFM Forecast help (TCF / eTCF / ECFP)",
        url: "https://aviationweather.gov/tcf/help.html",
        publisher: "AWC",
      },
      {
        label: "AWC: TCF product page",
        url: "https://aviationweather.gov/tcf/",
        publisher: "AWC",
      },
      {
        label: "FAA Aviation Weather Handbook FAA-H-8083-28B",
        url: "https://www.faa.gov/sites/faa.gov/files/FAA-H-8083-28B.pdf",
        publisher: "FAA",
      },
      {
        label: "NWS Instruction 10-811",
        url: "https://www.weather.gov/media/directives/010_pdfs/pd01008011curr.pdf",
        publisher: "NWS",
      },
      {
        label: "FAA TFM Learning",
        url: "https://tfmlearning.faa.gov/",
        publisher: "FAA",
      },
    ],
  },
  {
    slug: "risk-stacking",
    title: "Risk Stacking: How Small Risks Add Up to a Big One",
    section: "Decision-Making",
    summary:
      "No single item on a flight has to be dangerous for the flight to be dangerous. A case study from the AOPA Air Safety Institute shows how risks stack, and how to see the stack while you can still act on it.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Most pilots can handle one problem at a time: marginal weather, a tired day, an unfamiliar approach or a schedule to keep. Trouble starts when several show up on the same flight. Each one looks manageable on its own, so none of them feels like a reason to stop. Together they can use up all the margin you have. That is risk stacking.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) walks through a clear example in its video \"Accident Case Study: Risk Stacking\": https://www.youtube.com/watch?v=QdbR3Jba7A4. The summary below is ours. ASI made the video before the NTSB finished its investigation. The NTSB final report (WPR22FA151) is now out, and we note where it adds to or differs from the video. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On April 13, 2022, a single pilot flew a Cessna 208B Grand Caravan on a Part 135 cargo flight from Salt Lake City (KSLC) to Burley, Idaho (KBYI). The day before, on the same run, she had diverted to Twin Falls because of ground icing conditions at Burley. ASI reports that the trip was about 133 NM and that Burley was forecast VFR.",
      },
      {
        type: "paragraph",
        text: "ASI reports that en route the Burley METAR showed 6 SM in light snow with a broken layer at 2,600, and that by the approach it was 1 SM in mist and light snow with a 2,100 ceiling. The NTSB report lists 1 mile in light snow and mist with a broken ceiling at 2,300 feet around the first approach, improving to 2.5 miles and a broken ceiling at 3,000 feet by the second.",
      },
      {
        type: "paragraph",
        text: "She flew the RNAV (GPS) 20, which has a steep 3.75 degree glide path. ASI reports an MDA of 4,560 MSL (about 400 feet above the ground) and no gray stippled visual segment on the chart, because the stacks of a potato processing plant stand under the approach close to the threshold.",
      },
      {
        type: "paragraph",
        text: "On the first approach she made a low pass over the runway, then went missed and asked for the same approach again. She flew the second approach slower. The NTSB estimates about 85 knots near the end, below the airplane's 95 knot minimum for flaps up in icing conditions. A witness saw the airplane come out of the clouds and go straight into steam from the plant's stacks. The engine got louder and the nose came up, and the airplane struck a vent stack. The pilot was killed.",
      },
      {
        type: "paragraph",
        text: "ASI reports that a 2017 FAA study found the stacks penetrated the approach surface by up to 61 feet, yet the FAA issued a no-hazard determination. The NTSB report confirms the February 2017 no-hazard determination and says it required the stacks to be painted white and aviation orange and lit. On the day of the accident they had not been painted that way. ASI also reports that a notice about the stacks went out only after the crash. Its video calls it a NOTAM, and its video notes correct that: it is a Letter to Airmen issued through the FAA NOTAM system, and it may not appear in every app that pulls NOTAMs.",
      },
      {
        type: "paragraph",
        text: "The NTSB found the probable cause to be the pilot's failure to maintain altitude during the approach, which led to a descent below the approach path and impact with the stack. Also causal was the plant's failure to paint the stacks as the FAA had required. Contributing was the likely distraction, illusion or obscuration from the plant's steam, which at times hid the runway.",
      },
      {
        type: "heading",
        text: "The stack, by category",
      },
      {
        type: "paragraph",
        text: "Sorted the way a flight risk assessment sorts them (pilot, aircraft, environment and external pressures), the risks on this flight look like this:",
      },
      {
        type: "list",
        items: [
          "Pilot: single pilot, flying a second approach in instrument conditions right after a low pass and missed approach.",
          "Aircraft: less margin on the second approach, flown at about 85 knots near the end, below the 95 knot flaps-up minimum in icing conditions. ASI points out that warm plume air can also cost lift, the way high density altitude does.",
          "Environment: low ceilings and visibility in light snow and mist; a steep 3.75 degree glide path; stacks under the approach close to the threshold that were not painted to the FAA standard; steam from the stacks on a cold day. ASI adds a destination forecast VFR, an MDA about 400 feet above the ground and no stippled visual segment.",
          "External pressures: a cargo run to complete, and a divert on the same run the day before.",
        ],
      },
      {
        type: "paragraph",
        text: "None of these is rare. Pilots fly approaches to minimums, fly single pilot and fly cargo schedules every day. The point of the case study is the combination.",
      },
      {
        type: "heading",
        text: "Smoke stacks and cooling towers",
      },
      {
        type: "paragraph",
        text: "The AIM tells pilots to avoid flying near exhaust plumes from smoke stacks and cooling towers (AIM 7-6-16). Plumes can bring turbulence, low visibility, icing, and engine or control problems. The NTSB notes that this stack sat directly under the approach course, so flying over it was expected. Before you fly an approach, read the destination NOTAMs, any Letters to Airmen, and every note on the chart. The absence of something on a chart, like a stippled visual segment, is information too.",
      },
      {
        type: "heading",
        text: "See the stack while you can still act on it",
      },
      {
        type: "paragraph",
        text: "In hindsight, the stack is easy to see. In the moment, each item arrives one at a time, and each one looks small. The habit that helps is a running count. Name each risk as it shows up, sort it into pilot, aircraft, environment or external pressure, and notice when the count reaches three. Many pilots set a personal rule, such as stopping to rethink the plan when three risks are elevated.",
      },
      {
        type: "list",
        items: [
          "Before departure: count what you already know, including pressure you carry over from yesterday's flight.",
          "En route: when the weather or plan changes, add it to the count instead of replacing an old item.",
          "Before a second approach: count again. A missed approach is new information, not a reset.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Without a dispatcher or a second pilot, nobody else is keeping the tally for you. Writing the count down before departure makes the stack visible while you still have options. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["FRAT", "GO / NO-GO"],
      toolOrHabit:
        "The PlaneWX FRAT highlights risks as they stack up. As you fill it in within 4 hours of departure, it counts the elevated self\u2011rates and named concerns across Pilot, Aircraft, enVironment and External pressure, including external pressure chips and get\u2011there\u2011itis. When three or more stack on the flight, it shows a Risks are stacking banner that lists them. It does not make the call and does not change the WX Score. You record your own GO\u00A0/\u00A0NO\u2011GO decision. The FRAT cannot see a chart note or a NOTAM for you, so read those for the destination too.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Risk Stacking (video)",
        url: "https://www.youtube.com/watch?v=QdbR3Jba7A4",
        publisher: "AOPA ASI",
      },
      {
        label: "AIM 7-6-16: Avoid Flight in the Vicinity of Exhaust Plumes (Smoke Stacks and Cooling Towers)",
        url: "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap7_section_6.html",
        publisher: "FAA",
      },
      {
        label: "NTSB Aviation Investigation Final Report WPR22FA151 (N928JP)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/104938/pdf",
        publisher: "NTSB",
      },
    ],
  },
]

/** Tips as archived from each Weekly PIREP. Prepend newest first when adding. */
export const TIPS_OF_THE_WEEK: TipOfTheWeek[] = [
  {
    slug: "count-your-risks-out-loud",
    title: "Count your risks out loud",
    issueNumber: 2,
    date: "October 5, 2026",
    isoDate: "2026-10-05",
    draft: true,
    summary:
      "No single risk has to be dangerous for the flight to be. Keep a running count across pilot, aircraft, environment and external pressure, and stop to rethink at three.",
    body: [
      {
        type: "paragraph",
        text: "AOPA's Air Safety Institute just put out a case study on risk stacking: a single-pilot Caravan, a destination forecast VFR that wasn't, a steep approach with an MDA about 400 feet above the ground, smoke stacks on the centerline and a divert on the same run the day before. No single item was the problem. The stack was. So keep a count. Name each risk as it shows up, sort it into pilot, aircraft, environment or external pressure, and when you reach three, stop and pick a different plan if you need one. A missed approach adds to the count. It doesn't reset it. The PlaneWX FRAT highlights the risks as they stack up, and the call stays yours as PIC.",
      },
      {
        type: "paragraph",
        text: "Watch the ASI case study: https://www.youtube.com/watch?v=QdbR3Jba7A4. Read more in the Learning Center: https://www.planewx.ai/learn/risk-stacking",
      },
    ],
  },
  {
    slug: "what-the-wx-score-actually-is",
    title: "What the WX Score actually is",
    issueNumber: 1,
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    summary:
      "The WX Score is your own personal minimums, applied the same way every time, against the forecast for your route, altitude, and departure time.",
    body: [
      {
        type: "paragraph",
        text: "The WX Score is not PlaneWX's opinion of what is safe to fly. It is your own personal minimums, applied the same way every time, against the forecast for your route, cruise altitude, and departure time. The score starts at 100% and points come off for each weather factor that approaches or exceeds the limits you set, so two pilots can get different scores for the same flight. A low score does not mean don't fly. It means don't fly without asking why the number is what it is: open the breakdown and make your GO\u00A0/\u00A0NO\u2011GO call as PIC. It is advisory support, not a flight authorization.",
      },
      {
        type: "paragraph",
        text: "More in the WX Score guide: https://app.planewx.ai/help/wx-score",
      },
    ],
  },
]

export const LEARN_DISCLAIMER =
  "PlaneWX complements FAA and Flight Service weather products. PlaneWX is decision support. It is not a substitute for your full preflight briefing (for example a standard briefing through Flight Service or your EFB)."

export const LEARN_DRAFT_BANNER = "DRAFT: facts pending source review"

export const TIPS_EMPTY_LINE =
  "New tips arrive with each Weekly PIREP."

/**
 * Live Aviation Weather hub pages (deep routes under /learn/aviation-weather/).
 * Listed on the Learning Center index; not [slug] articles. Keep in sync with
 * each aviation-weather page.tsx.
 */
export type AviationWeatherHubPage = {
  href: string
  title: string
  summary: string
  lastReviewed: string
}

export const AVIATION_WEATHER_HUB_PAGES: readonly AviationWeatherHubPage[] = [
  {
    href: "/learn/aviation-weather/taf",
    title: "What Is a TAF? How to Read a Terminal Aerodrome Forecast",
    summary:
      "A TAF is a coded airport forecast. Learn to read wind, visibility, clouds, FM, TEMPO, and PROB30, and where the TAF fits in a disciplined weather decision.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/metar",
    title: "What Is a METAR? How to Read an Airport Weather Report",
    summary:
      "A METAR is the coded weather observation for an airport. Learn to read every group, what AUTO and AO2 mean, when a SPECI is issued, and where METARs fit a disciplined weather decision.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/airmet-sigmet",
    title: "AIRMET, SIGMET, and CWA: In-Flight Weather Advisories Explained",
    summary:
      "How to read AIRMETs, G-AIRMETs, SIGMETs, Convective SIGMETs, and Center Weather Advisories: criteria, valid times, decoded Handbook examples, and where advisories fit a disciplined weather decision.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/pirep",
    title: "What Is a PIREP? How to Read and Give a Pilot Weather Report",
    summary:
      "A PIREP is a pilot weather report. Learn the UA and UUA format, how to decode each field, the official icing and turbulence intensity scales, and how to give a PIREP that helps.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/winds-aloft",
    title: "Winds and Temperatures Aloft: How to Read an FB Forecast",
    summary:
      "How to decode the FB winds and temperatures aloft forecast, including winds over 100 knots and missing low levels, with a worked decode of the FAA Handbook sample.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/icing",
    title: "Icing Forecasts: CIP, FIP, Freezing Level, and Icing Intensity",
    summary:
      "What the CIP and FIP icing products show, how to find the freezing level, what trace, light, moderate, heavy, and severe icing mean, and where icing forecasts fall short.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/turbulence",
    title: "Turbulence Forecasts: GTG, GTG-N, and the Intensity Scale",
    summary:
      "How the GTG turbulence forecast and GTG-N nowcast work, what EDR means, the official light to extreme intensity scale, and which turbulence GTG does not forecast.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/weather-radar",
    title: "Weather Radar for Pilots: NEXRAD, TDWR, Reflectivity, and Datalink Delay",
    summary:
      "How to read NEXRAD and TDWR radar, what dBZ and composite reflectivity mean, where radar misses weather, and why cockpit radar mosaics are older than their time stamp.",
    lastReviewed: "2026-09-29",
  },
  {
    href: "/learn/aviation-weather/density-altitude",
    title:
      "Density Altitude Calculator and Guide: What It Is and How to Calculate It",
    summary:
      "What density altitude is, how to calculate it by hand and with the NWS formula, a worked example, the Koch chart, and why hot, high, and humid days catch pilots out.",
    lastReviewed: "2026-09-30",
  },
  {
    href: "/learn/aviation-weather/thunderstorms",
    title: "Thunderstorms for Pilots: Hazards, Avoidance, Outlooks, and Watches",
    summary:
      "Why the FAA treats every thunderstorm as hazardous, the 20-mile avoidance rule, how lightning is reported, and what convective outlooks, TCF, ECFP, and watches tell you.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/ceiling-visibility",
    title: "Ceiling, Visibility, and Flight Categories: VFR, MVFR, IFR, and LIFR",
    summary:
      "What legally counts as a ceiling, how prevailing visibility is measured, the four flight categories, and why a green VFR dot is not the same as the 14 CFR 91.155 VFR minimums.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/fog",
    title: "Fog for Pilots: Radiation, Advection, Upslope, and Freezing Fog",
    summary:
      "How each type of fog forms and clears, what the temperature-dewpoint spread tells you, how fog is coded in METARs and TAFs, and what the FAA and NTSB say to do about it.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/wind-shear-microburst",
    title: "Low-Level Wind Shear and Microbursts: Recognition, Reports, and Escape",
    summary:
      "What low-level wind shear and microbursts are, the signs to look for, how LLWAS, TDWR, and ATIS alerts reach you, how to report wind shear, and what the FAA says about recovery.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/mountain-wave",
    title: "Mountain Wave and Mountain Weather: Lee Waves, Rotors, and Downslope Winds",
    summary:
      "When mountain waves form, how propagating and trapped lee waves differ, the clouds that mark them, rotor and downslope wind hazards, and how to plan a mountain crossing.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/weather-briefings",
    title: "Weather Briefing Types: Standard, Abbreviated, Outlook, and Self-Briefing",
    summary:
      "The three FAA briefing types and when to get each, what a standard briefing contains and in what order, what “VFR flight not recommended” means, and how self-briefing fits in.",
    lastReviewed: "2026-10-01",
  },
  {
    href: "/learn/aviation-weather/weather-risk",
    title: "Weather Risk and Personal Minimums: FAA Definitions and Where to Go Next",
    summary:
      "How the FAA defines hazard, risk, personal minimums, and PAVE, the NTSB lessons on compounding weather risk, and links to PlaneWX guides for setting and using your own limits.",
    lastReviewed: "2026-10-01",
  },
]

/**
 * Live Decision-Making hub pages (Learning Center root, not under
 * aviation-weather). Listed on the Learning Center index.
 */
export const DECISION_MAKING_HUB_PAGES: readonly AviationWeatherHubPage[] = [
  {
    href: "/learn/flight-risk-assessment-tool",
    title:
      "Flight Risk Assessment Tool (FRAT): What It Is and How to Use One Honestly",
    summary:
      "What a flight risk assessment tool is, where the FAA FRAT comes from, how green, yellow, and red scores work, and how to fill one out without fooling yourself.",
    lastReviewed: "2026-09-30",
  },
]

/**
 * Deep learn routes that are live in this build (beyond /learn/[slug] articles).
 * Hub pages are registered so MOS/NBM can cross-link to the TAF decode page
 * without a hardcoded 404.
 */
export type LiveLearnRoute = {
  href: string
  title: string
}

/** Lookup key for the TAF decode hub. */
export const LEARN_TAF_DECODE_HREF = "/learn/aviation-weather/taf" as const

/** Live deep routes (href + title) for cross-link gates. */
export const LIVE_LEARN_ROUTES: readonly LiveLearnRoute[] = [
  ...AVIATION_WEATHER_HUB_PAGES.map((p) => ({ href: p.href, title: p.title })),
  ...DECISION_MAKING_HUB_PAGES.map((p) => ({ href: p.href, title: p.title })),
]

export function getLiveLearnRoute(
  href: string,
  routes: readonly LiveLearnRoute[] = LIVE_LEARN_ROUTES
): LiveLearnRoute | undefined {
  return routes.find((r) => r.href === href)
}

/** Cross-link for MOS/NBM: only when the TAF decode page is registered as live. */
export function getTafDecodeCrossLink(
  routes: readonly LiveLearnRoute[] = LIVE_LEARN_ROUTES
): { href: string; label: string } | null {
  const route = getLiveLearnRoute(LEARN_TAF_DECODE_HREF, routes)
  if (!route) return null
  return { href: route.href, label: route.title }
}

/**
 * Inserts the gated TAF decode sentence after the first body paragraph when the
 * TAF hub is live. No-op when the route is unregistered.
 */
export function withOptionalTafDecodeLink(
  blocks: LearnBodyBlock[],
  routes: readonly LiveLearnRoute[] = LIVE_LEARN_ROUTES
): LearnBodyBlock[] {
  const link = getTafDecodeCrossLink(routes)
  if (!link) return blocks
  const decodeBlock: LearnBodyBlock = {
    type: "paragraph",
    text: `For a group-by-group decode of a TAF, see [${link.label}](${link.href}).`,
  }
  const insertAt = blocks.findIndex((b) => b.type === "paragraph")
  if (insertAt === -1) return [...blocks, decodeBlock]
  return [
    ...blocks.slice(0, insertAt + 1),
    decodeBlock,
    ...blocks.slice(insertAt + 1),
  ]
}

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug)
}

/** Hub list: drafts stay visible so editorial review can walk the slots. */
export function getLearnArticlesForHub(): LearnArticle[] {
  return LEARN_ARTICLES
}

export function getArticlesBySection(section: LearnSection): LearnArticle[] {
  return LEARN_ARTICLES.filter((a) => a.section === section)
}

export function getPublishedTips(): TipOfTheWeek[] {
  return TIPS_OF_THE_WEEK.filter((t) => !t.draft)
}

export function isIndexableLearnArticleSlug(slug: string): boolean {
  return (INDEXABLE_LEARN_ARTICLE_SLUGS as readonly string[]).includes(slug)
}

/**
 * Sitemap + indexing for [slug] articles: public center, not draft, and on the
 * allow list. Excluded articles (tcf-vs-ecfp) stay reachable but noindex.
 * Pass isPublic to simulate LEARN_PUBLIC false (rollback) in tests.
 */
export function getIndexableLearnArticles(
  isPublic: boolean = LEARN_PUBLIC
): LearnArticle[] {
  if (!isPublic) return []
  return LEARN_ARTICLES.filter(
    (a) => !a.draft && isIndexableLearnArticleSlug(a.slug)
  )
}

/** Hub HTML pages that ship indexable under LEARN_PUBLIC. */
export function getIndexableLearnHubPages(
  isPublic: boolean = LEARN_PUBLIC
): AviationWeatherHubPage[] {
  if (!isPublic) return []
  return [...AVIATION_WEATHER_HUB_PAGES, ...DECISION_MAKING_HUB_PAGES]
}

export function shouldIndexLearnHub(isPublic: boolean = LEARN_PUBLIC): boolean {
  return isPublic
}

/**
 * robots for shipped hub HTML pages. Same gate as /learn index: flipping
 * LEARN_PUBLIC to false noindexes every hub page.
 */
export function hubPageRobots(isPublic: boolean = LEARN_PUBLIC): {
  index: boolean
  follow: boolean
} {
  return shouldIndexLearnHub(isPublic)
    ? { index: true, follow: true }
    : { index: false, follow: false }
}

/** Hub JSON-LD only while the Learning Center is public. */
export function shouldEmitHubJsonLd(isPublic: boolean = LEARN_PUBLIC): boolean {
  return shouldIndexLearnHub(isPublic)
}

/**
 * Sitemap learn URLs for the hub index, hub HTML pages, and allowlisted
 * [slug] articles. Empty when LEARN_PUBLIC is false.
 */
export function getLearnSitemapPaths(
  isPublic: boolean = LEARN_PUBLIC
): string[] {
  if (!shouldIndexLearnHub(isPublic)) return []
  return [
    "/learn",
    ...getIndexableLearnHubPages(isPublic).map((p) => p.href),
    ...getIndexableLearnArticles(isPublic).map((a) => `/learn/${a.slug}`),
  ]
}

export function shouldIndexLearnArticle(
  article: LearnArticle,
  isPublic: boolean = LEARN_PUBLIC
): boolean {
  return isPublic && !article.draft && isIndexableLearnArticleSlug(article.slug)
}

/** Article JSON-LD only for allowlisted, non-draft articles when public. */
export function shouldEmitArticleJsonLd(
  article: LearnArticle,
  isPublic: boolean = LEARN_PUBLIC
): boolean {
  return shouldIndexLearnArticle(article, isPublic)
}
