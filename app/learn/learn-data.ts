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
 * Shipped now: mos-vs-nbm-vs-taf, risk-stacking.
 * Still gated: tcf-vs-ecfp, tip what-the-wx-score-actually-is, Tips archive.
 */
export const INDEXABLE_LEARN_ARTICLE_SLUGS = [
  "mos-vs-nbm-vs-taf",
  "risk-stacking",
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
  /** Click-to-load YouTube embed (nocookie, loads only on play). */
  | { type: "youtube"; videoId: string; title: string; caption?: string }
  /** Boxed PlaneWX callout (sidebar style). Text supports [label](href) links. */
  | { type: "callout"; title: string; text: string }

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
    draft: false,
    body: [
      {
        type: "paragraph",
        text: "Most pilots can handle one problem at a time: marginal weather, a tired day, an unfamiliar approach or a schedule to keep. Trouble starts when several show up on the same flight. Each one looks manageable on its own, so none of them feels like a reason to stop. Together they can use up all the margin you have. That is risk stacking.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) walks through a clear example in its video \"Accident Case Study: Risk Stacking,\" which you can watch below. The summary that follows is ours. ASI's video came out before the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/104938/pdf) (WPR22FA151). Where the two differ, we use the NTSB report, which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "QdbR3Jba7A4",
        title: "AOPA Air Safety Institute: Accident Case Study: Risk Stacking",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Risk Stacking.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "The PlaneWX FRAT highlights the risks as they stack up. It counts elevated items across Pilot, Aircraft, enVironment and External pressure, and when three or more stack on one flight it shows a Risks are stacking banner that lists them. It does not make the call and does not change the WX Score. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [See how the FRAT works](/learn/flight-risk-assessment-tool)",
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
        text: "ASI reports that en route the Burley METAR showed 6 SM in light snow with a broken layer at 2,600. The NTSB report lists 1 mile in light snow and mist with a broken ceiling at 2,300 feet around the first approach, improving to 2.5 miles and a broken ceiling at 3,000 feet by the second.",
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
        text: "The NTSB determined the probable cause to be: “The pilot’s failure to maintain altitude during an instrument approach, which resulted in a descent below the approach path and impact with a vent stack. Also causal was the failure of the processing plant to correctly paint the vent stacks, which had been determined by the FAA to be a hazard to navigation due to their proximity to the landing approach path. Contributing to the accident was the likely distraction/illusion/obscuration created by steam from the processing plant, which intermittently obscured the runway.”",
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
  {
    slug: "fair-weather-flier",
    title: "Fair Weather Flier: When the Briefer Says VFR Is Not Recommended",
    section: "Decision-Making",
    summary:
      "A noninstrument-rated Bonanza pilot heard \u201cVFR flight not recommended\u201d and left anyway, a day early, to beat worse weather. A case study from the AOPA Air Safety Institute and the NTSB final report on what self-induced pressure looks like from the inside.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Most VFR-into-IMC accidents don't start with a pilot ignoring the weather. They start with a pilot who checked it, heard the warnings, and found a reason the warnings didn't quite apply to this flight. This one is a clear example, because the whole weather briefing is on tape.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates the flight in its video \"Accident Case Study: Fair Weather Flier,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/101696/pdf) (ERA20LA262), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "oZ_Rhy1X6PA",
        title: "AOPA Air Safety Institute: Accident Case Study: Fair Weather Flier",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Fair Weather Flier.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "Set your personal minimums for ceiling, visibility and storm avoidance while you're calm, before a trip is on the line. PlaneWX scores every briefing against them (Favorable, Marginal or Unfavorable) and flags anything at or past your max limit. Convective Watch shows up in the briefing when thunderstorm activity is detected along your route. The FRAT, which opens 4 hours before departure, asks about external pressure and get\u2011there\u2011itis. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How personal minimums work](https://app.planewx.ai/help/personal-minimums)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On July 28, 2020, a 64-year-old private pilot with about 946 hours and no instrument rating planned to fly his Beech F33A Bonanza home from Gulf Shores, Alabama (JKA) to Muscle Shoals (MSL), about 267 NM. His wife was aboard. Family members told the NTSB the original plan was to fly home on July 29 or 30, depending on weather. He had a business meeting on July 29.",
      },
      {
        type: "paragraph",
        text: "At 4:15 that afternoon he called flight service. The briefer told him the next day didn't look good: thunderstorms, rain showers, low ceilings and reduced visibility, and VFR flight not recommended. For that afternoon the news wasn't much better. Thunderstorms and rain showers were already in the area, a convective SIGMET was in effect, weather was building along and on both sides of the route, and the briefer again said VFR flight was not recommended.",
      },
      {
        type: "paragraph",
        text: "The pilot said he'd probably go that afternoon, because tomorrow would be worse, and that his own look at the weather showed \u201ceverything is VFR as we speak.\u201d The briefer agreed the surface reports were VFR but said cloud layers were \u201cgetting pretty close\u201d and that rain showers could drop parts of the route to instrument conditions. The briefer then offered a recent observation from Mobile, about 25 miles west of the route: 1.5 miles in heavy rain and mist. The pilot said he could avoid the precipitation unless he hit a solid line of storms.",
      },
      {
        type: "paragraph",
        text: "He departed VFR with flight following. About 15 minutes after takeoff, as the rain showers increased, the Bonanza made a decreasing radius 360\u00b0 turn. Over the next two minutes the track became erratic, the altitude dropped from 5,000 feet to about 1,275 feet, and the groundspeed swung between 150 and 34 knots. The airplane struck trees and hit a field near Malbis, Alabama. Both people aboard were killed. An airport 18 miles away was reporting a 1,200-foot overcast and half a mile in heavy rain at the time.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe noninstrument-rated pilot\u2019s decision to depart in deteriorating weather conditions, which led to restricted visibility and the pilot\u2019s loss of airplane control due to spatial disorientation. Contributing to the pilot\u2019s poor decision-making was self-induced pressure.\u201d",
      },
      {
        type: "heading",
        text: "What self-induced pressure sounds like",
      },
      {
        type: "paragraph",
        text: "Nobody told this pilot he had to go. The pressure came from his own plan: a meeting the next day and a forecast that would only get worse. Listen to how it shows up in the briefing.",
      },
      {
        type: "list",
        items: [
          "\u201cTomorrow is worse, so today is the day.\u201d A worse forecast tomorrow doesn't make today good. It can mean neither day works.",
          "\u201cEverything is VFR as we speak.\u201d Surface observations describe right now at the airport. The flight happens later, between airports.",
          "\u201cI can avoid the precipitation unless it's a solid line.\u201d That plan depends on seeing the weather, in the weather.",
          "\u201cI haven't heard anything to tell me that.\u201d He had. Twice, the briefer said VFR flight was not recommended.",
        ],
      },
      {
        type: "paragraph",
        text: "The airplane had a glass panel with synthetic vision. It didn't help. Equipment can't stand in for an instrument rating once the visibility goes.",
      },
      {
        type: "heading",
        text: "Decide before the pressure shows up",
      },
      {
        type: "list",
        items: [
          "Write your VFR limits down at home, and treat \u201cVFR not recommended\u201d from a briefer as a reason to stop and rethink, not a reason to argue.",
          "Plan the trip with a spare day built in. If the only way home is today, the meeting is making the call.",
          "Name the pressure out loud. A meeting, a forecast that's getting worse, or a passenger who wants to get home all count as external pressure.",
          "If you do go, decide ahead of time what makes you turn around, and make it something you can see before you're in it.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Without a dispatcher, nobody can tell you no. The limits you set when you're calm are the only check on the reasoning you'll do when a trip is on the line. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "Personal minimums in PlaneWX set a comfort limit and a max limit for ceiling, visibility, storm avoidance and more. The WX Score runs every briefing against them, yours or the defaults until you set your own, and flags anything at or past your max. The FRAT opens 4 hours before departure and asks about external pressure and get\u2011there\u2011itis, so the pressure is written down next to the weather. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Fair Weather Flier (video)",
        url: "https://www.youtube.com/watch?v=oZ_Rhy1X6PA",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report ERA20LA262 (N3156W)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/101696/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "trapped-in-ice",
    title: "Trapped in Ice: The Cost of a 10-Hour-Old Briefing",
    section: "Decision-Making",
    summary:
      "An instrument-rated Cirrus pilot briefed the night before, departed into forecast icing in an airplane not equipped for it, and lost control on a diversion. A case study from the AOPA Air Safety Institute and the NTSB final report on why a briefing has a shelf life.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "A weather briefing is a snapshot. The forecast you read the night before was the best information at the time, but AIRMETs expire, new ones get issued, and icing forecasts update every hour. If you don't look again before you go, you're flying on old news.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: Trapped in Ice,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/97066/pdf) (CEN18FA144), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "7rryvSQhK7k",
        title: "AOPA Air Safety Institute: Accident Case Study: Trapped in Ice",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Trapped in Ice.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "PlaneWX regenerates your briefing as new weather products publish: automatically for monitored flights on Casual, Pro and Pro Plus, and with the Check Updates button in the final hour on Free. Its icing analysis compares several weather models along your route and altitude and, for US routes within 18 hours of departure, layers in the FAA's Current Icing Product and icing forecast, including SLD potential. Icing is one of the categories you set personal minimums for. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How briefings stay current](https://app.planewx.ai/help/auto-refresh)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On April 19, 2018, a 65-year-old instrument-rated private pilot with about 496 hours, 245 of them in type, departed Lancaster, Pennsylvania (LNS) in a Cirrus SR22 on an IFR flight plan to South Bend, Indiana (SBN). One passenger was aboard. The airplane had no anti-icing or deicing system, so it was not equipped for flight into known icing.",
      },
      {
        type: "paragraph",
        text: "The pilot got his weather briefing through an app on his mobile device about 10 hours before the flight. It showed cloud cover, snow showers and IFR conditions. The AIRMET in that briefing expired at 0500, before he departed. In the hours between, a new AIRMET was issued for moderate icing, IFR and mountain obscuration, and low-level turbulence, valid until 1100. The NTSB found no record that the pilot got any other weather before or during the flight.",
      },
      {
        type: "paragraph",
        text: "According to the NTSB, the airplane likely entered the clouds about 500 feet above the ground on climbout and stayed in IMC and icing conditions for the rest of the flight. To get above it, the airplane would have needed to climb above 10,400 feet. Before departure, the icing forecast showed light to moderate icing near the accident site, and the current icing product showed supercooled large droplets (SLD) nearby.",
      },
      {
        type: "paragraph",
        text: "About 55 minutes after takeoff, at about 5,400 feet, the pilot told Johnstown Approach the airplane was accumulating ice and asked to divert. Johnstown was reporting a 200-foot overcast and Altoona a 500-foot overcast, so he chose the ILS at Altoona. During the descent he flew through the localizer and didn't notice until the controller told him. On the turn back to intercept, the airplane began to descend, the airspeed increased, and the left turn tightened into a spiral. It struck the ground near Williamsburg, Pennsylvania, and both people aboard were killed.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe pilot\u2019s failure to obtain an updated weather briefing before the flight and his subsequent loss of airplane control due to spatial disorientation while maneuvering in instrument meteorological conditions during a diversion to an alternate airport after encountering forecast icing conditions.\u201d",
      },
      {
        type: "heading",
        text: "Why the update matters",
      },
      {
        type: "paragraph",
        text: "The NTSB said the pilot had enough forecast information available before departure to have known about the icing along the route, but it couldn't determine whether he saw all of it. That gap is the lesson. The night-before briefing showed IFR weather. The morning picture added moderate icing, SLD potential and tops above 10,000 feet, in an airplane with no ice protection. Those are different flights.",
      },
      {
        type: "list",
        items: [
          "Check the valid time on every advisory. An AIRMET that expires before you depart tells you nothing about your flight.",
          "Get a fresh look as close to departure as you can, and again before you take the runway if anything has changed.",
          "In an airplane without ice protection, \u201cforecast icing along the route with tops above my ceiling\u201d is the question, not \u201cIFR conditions.\u201d",
          "Know your outs before you need them. Here, both nearby airports were reporting low overcasts by the time the ice showed up.",
        ],
      },
      {
        type: "paragraph",
        text: "The NTSB also found two impairing medications, diphenhydramine and clonazepam, in toxicology testing, and couldn't determine whether they contributed. It's a reminder to include medications in your personal checklist before any flight.",
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "There's no dispatcher watching the weather for you between the night before and engine start. Whatever you looked at last is what you're flying on. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "PlaneWX keeps a briefing current as new weather publishes: automatic background refreshes for monitored flights on Casual, Pro and Pro Plus, and a Check Updates button in the final hour on Free. The icing analysis shows model agreement, cloud layers and SLD potential along your route and altitude, and the WX Score runs against your icing limits. The FRAT, which opens 4 hours before departure, asks how you feel, which is the place to count medications. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Trapped in Ice (video)",
        url: "https://www.youtube.com/watch?v=7rryvSQhK7k",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report CEN18FA144 (N451TD)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/97066/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "blind-over-bakersfield",
    title: "Blind Over Bakersfield: Forecast IMC and a Party to Get To",
    section: "Decision-Making",
    summary:
      "A low-time, noninstrument-rated pilot launched with his family into forecast storms, climbed to nearly 20,000 feet to stay on top, then accepted an IFR clearance. A case study from the AOPA Air Safety Institute and the NTSB final report on how one decision keeps leading to the next.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Some accidents come down to one bad moment. This one is a chain of decisions, each one made to save the one before it. The pilot had the forecast. He had his family aboard and a surprise party that night. Every time the weather closed a door, he found another one.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates the flight in its video \"Accident Case Study: Blind Over Bakersfield,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/92471/pdf) (WPR16FA041), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "ROCUheRin9U",
        title: "AOPA Air Safety Institute: Accident Case Study: Blind Over Bakersfield",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Blind Over Bakersfield.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "The PlaneWX FRAT puts the pressure on paper next to the weather. It opens 4 hours before departure, counts elevated items across Pilot, Aircraft, enVironment and External pressure, including get\u2011there\u2011itis, and shows a Risks are stacking banner when three or more stack on one flight. Your WX Score runs the briefing against your own minimums. It does not make the call. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [See how the FRAT works](/learn/flight-risk-assessment-tool)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On December 19, 2015, a 42-year-old private pilot with about 270 hours and no instrument rating departed Reid-Hillview Airport in San Jose, California (RHV) in a Piper PA-32RT-300T Turbo Lance II, bound for Henderson Executive Airport near Las Vegas (HND). His wife and their three children were aboard. They were going on vacation and were due at a surprise party that night.",
      },
      {
        type: "paragraph",
        text: "He had downloaded official weather briefings to his tablet the night before and again that morning. According to the NTSB, the forecast was not suitable for VFR: a series of storms crossing the route, with IMC, high cloud tops, and the potential for icing and mountain obscuration.",
      },
      {
        type: "paragraph",
        text: "Shortly after takeoff the flight met the forecast weather. The pilot deviated again and again to stay out of the clouds, and controllers kept reporting bands of precipitation and the potential for airframe icing ahead. The tops kept rising, and he kept climbing to stay above them, until he was near the airplane's 20,000-foot ceiling and close to Class A airspace. The airplane had supplemental oxygen for three people. There were five aboard.",
      },
      {
        type: "paragraph",
        text: "When the airplane began to descend and likely entered the clouds, a controller offered an IFR clearance, and the pilot accepted. Shortly after, likely while he was setting up the avionics, the flightpath became erratic. He made two mayday calls. The airplane broke up in flight near Bakersfield, and all five people aboard were killed. Because of the deviations, the flight was only about halfway to Henderson, with about 30 minutes left before sunset.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe noninstrument-rated pilot's decision to conduct and continue the flight despite forecast and en route instrument meteorological conditions (IMC), which were not conducive to safe operation under visual flight rules. Also causal to the accident was the pilot's decision to accept an instrument flight rules clearance and fly into IMC during cruise flight, which led to his spatial disorientation and a resultant loss of control and an in-flight breakup. Contributing to the accident was the pilot's self-induced pressure to arrive at the destination for a party that night.\u201d",
      },
      {
        type: "heading",
        text: "The chain, one link at a time",
      },
      {
        type: "list",
        items: [
          "Departing: the forecast already ruled out VFR. The trip was planned around the party, not around the weather.",
          "Deviating: each turn around a cloud cost time and fuel and pushed the arrival closer to sunset.",
          "Climbing on top: every thousand feet bought a few more minutes, while the tops kept rising and the oxygen ran short for the family.",
          "Accepting the clearance: it sounded like help, but it put a noninstrument-rated pilot in the clouds, hand-flying and heads-down on avionics.",
        ],
      },
      {
        type: "paragraph",
        text: "The NTSB noted that, without an instrument rating or enough oxygen for his family, the pilot may have been reluctant to declare an emergency and climb into Class A airspace, which likely would have put him above the clouds. He accepted an IFR clearance at a lower altitude instead. That's the hidden cost of a chain like this: by the end, every option left has a downside, so it's easy to pick none of them.",
      },
      {
        type: "heading",
        text: "Break the chain early",
      },
      {
        type: "list",
        items: [
          "Decide on the ground. If the forecast doesn't support VFR, the trip doesn't start VFR, party or not.",
          "Set a turnaround trigger before you go, like \u201cif I have to climb above X to stay clear, I turn back,\u201d and keep it.",
          "Count deviations as risk. Each one is the weather telling you something.",
          "Declare an emergency early. ATC can help most when they know what you need.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "With family aboard and an event waiting, the pressure is real and it's yours. Without a dispatcher, the only way to see it clearly is to write it down before you leave. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["FRAT", "GO / NO-GO"],
      toolOrHabit:
        "The PlaneWX FRAT opens 4 hours before departure and counts the elevated self\u2011rates and named concerns across Pilot, Aircraft, enVironment and External pressure, including external pressure chips and get\u2011there\u2011itis. When three or more stack on one flight, it shows a Risks are stacking banner that lists them. The WX Score runs the briefing against your own minimums. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Blind Over Bakersfield (video)",
        url: "https://www.youtube.com/watch?v=ROCUheRin9U",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report WPR16FA041 (N36402)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/92471/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "delayed-reaction",
    title: "Delayed Reaction: Severe Icing and the Minutes That Matter",
    section: "Decision-Making",
    summary:
      "An instrument-rated TBM 700 pilot climbed into icing he'd been warned about and asked for a higher altitude instead of declaring. About two minutes later the airplane came apart. A case study from the AOPA Air Safety Institute and the NTSB final report on using your command authority early.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Ice protection buys time. It doesn't buy permission to stay. When ice builds faster than the airplane can handle, the only fix is to leave, and the longer you wait for a routine clearance, the less airplane you have left to leave with.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: Delayed Reaction,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/82544/pdf) (ERA12FA115), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "0JkLR_xgayM",
        title: "AOPA Air Safety Institute: Accident Case Study: Delayed Reaction",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Delayed Reaction.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "No forecast catches every encounter, and the NTSB found this severe icing wasn't forecast. What a briefing can do is show you the icing that is forecast before you commit. PlaneWX's icing analysis compares several weather models along your route and altitude and, for US routes within 18 hours of departure, adds the FAA's Current Icing Product and icing forecast. Icing is one of the categories you set personal minimums for, and the WX Score runs against them. The exit plan is yours to decide on the ground. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How icing analysis works](https://app.planewx.ai/help/icing-analysis)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On December 20, 2011, a 45-year-old instrument-rated private pilot with about 1,400 hours departed Teterboro, New Jersey (TEB) in a Socata TBM 700 on an IFR flight plan to Atlanta (PDK), planning to cruise at FL260. Four passengers were aboard. He had filed his flight plan online at 0700, but the NTSB found no record that he got a weather briefing, and no weather was requested or issued on the ground at Teterboro. An AIRMET for moderate icing from the freezing level to FL200 was issued at 0945. The flight departed about 0950.",
      },
      {
        type: "paragraph",
        text: "On the climb, the controller warned of moderate rime icing from 15,000 to 17,000 feet, with light rime at 14,000, and asked the pilot to report if it got worse. The pilot said they'd let him know and that if they could go straight through, \u201cit\u2019s no problem for us.\u201d He entered the clouds climbing through about 12,800 feet.",
      },
      {
        type: "paragraph",
        text: "At 10:02, level near 16,800 feet, the pilot told the controller \u201clight icing has been present for a little while and a higher altitude would be great.\u201d The airplane's groundspeed was about 101 knots. Seventeen seconds later he reported \u201ca little rattle\u201d and asked to climb as soon as possible. The controller coordinated and cleared him to FL200 about 25 seconds later. Just over a minute after that, the airplane peaked at 17,800 feet, turned sharply left and descended. Passing 17,400 feet the pilot transmitted \u201cand N731CA\u2019s declaring\u2026\u201d and nothing more. The outboard right wing separated in flight and struck the tail. The airplane hit Interstate 287 near Morristown, and all five people aboard were killed.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe airplane\u2019s encounter with unforecasted severe icing conditions that were characterized by high ice accretion rates and the pilot's failure to use his command authority to depart the icing conditions in an expeditious manner, which resulted in a loss of airplane control.\u201d",
      },
      {
        type: "heading",
        text: "Why the delay matters",
      },
      {
        type: "paragraph",
        text: "Pilots in the area that morning reported icing, and at least three crews called it severe. The airplane's handbook warned that it wasn't certificated for severe icing and told pilots who meet it to request priority handling and change altitude or route immediately. The NTSB said the pilot likely either didn't recognize how bad the icing was or was reluctant to use his command authority to get out right away.",
      },
      {
        type: "list",
        items: [
          "Treat a controller's icing report as a reason to plan your exit before you enter the clouds, not after.",
          "Watch the airspeed. A steady drop at the same power setting is the airplane telling you how much ice it's carrying.",
          "Declare early. \u201cRequest higher\u201d puts you in line. An emergency puts you first.",
          "Know your airplane's limits cold. Ice protection certified for known icing is not certified for severe icing.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "As pilot in command, you can take the altitude or heading you need and sort out the paperwork later. That authority only helps if you use it while there's still time. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "Brief every flight, even a short hop out of a busy airport. PlaneWX's icing analysis shows model agreement, cloud layers and SLD potential along your route and altitude, and the WX Score checks it against your own icing limits. Use the FRAT, which opens 4 hours before departure, to write down your plan if the ice is worse than forecast. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Delayed Reaction (video)",
        url: "https://www.youtube.com/watch?v=0JkLR_xgayM",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report ERA12FA115 (N731CA)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/82544/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "hazardous-attitudes",
    title: "Hazardous Attitudes: A 10,000-Hour Pilot Departs VFR Into a Warning",
    section: "Decision-Making",
    summary:
      "A 75-year-old instrument-rated commercial pilot left Fullerton VFR with no briefing on record, after the tower warned of deteriorating weather ahead. Six minutes later his Cessna 414 broke up over Yorba Linda. A case study from the AOPA Air Safety Institute and the NTSB final report on the five hazardous attitudes.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Experience is supposed to protect you. Sometimes it does the opposite: it gives you a long record of getting away with things. The FAA teaches five hazardous attitudes because they show up in pilots of every experience level, and they're hardest to see in yourself.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: Hazardous Attitudes,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/98938/pdf) (WPR19FA079), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "MBL1iy0V9VM",
        title: "AOPA Air Safety Institute: Accident Case Study: Hazardous Attitudes",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Hazardous Attitudes.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "Every PlaneWX briefing pulls in METARs, TAFs, AIRMETs, SIGMETs and more for your route, and Convective Watch shows up when convective activity is detected along it. The WX Score runs that weather against your own personal minimums, so the comparison happens before an attitude has a chance to talk you out of it. The FRAT, which opens 4 hours before departure, asks you to rate yourself honestly and name any pressure to go. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How personal minimums work](https://app.planewx.ai/help/personal-minimums)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On February 3, 2019, a 75-year-old commercial pilot with an instrument rating and about 10,235 hours departed Fullerton Municipal Airport (FUL) in Southern California in a Cessna 414, headed VFR to Minden, Nevada (MEV). He filed no flight plan, and the NTSB found no evidence that he got a weather briefing. AIRMETs for moderate turbulence below 12,000 feet and mountain obscuration were in effect for the area.",
      },
      {
        type: "paragraph",
        text: "The weather at Fullerton was VFR. With the takeoff clearance, the tower controller cautioned the pilot about deteriorating weather about 4 miles east of the airport. He departed about 1339 and made a climbing left turn to the east, into an area where conditions had turned to IMC with rain showers and a microburst.",
      },
      {
        type: "paragraph",
        text: "About 5\u00bd minutes after takeoff, the airplane was about 7,800 feet above the ground when it entered a rapid descending right turn. Data from a portable ADS-B receiver aboard showed that in the last 15 seconds the pitch swung between 45\u00b0 nose down and 75\u00b0 nose up, and the bank between 170\u00b0 left and 150\u00b0 right. Witnesses saw the airplane come out of the clouds and break apart. Pieces of the airplane came down on a street and a house in Yorba Linda, and the house burned. The pilot and four people on the ground were killed, and two more on the ground were seriously injured.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe pilot\u2019s failure to maintain airplane control after entering instrument meteorological conditions (IMC) while climbing due to spatial disorientation, which resulted in the exceedance of the airplane\u2019s design stress limits and subsequent in-flight break-up. Contributing to accident was the pilot's improper decision to conduct the flight under visual flight rules and to continue the flight when conditions deteriorated.\u201d",
      },
      {
        type: "heading",
        text: "The five hazardous attitudes",
      },
      {
        type: "paragraph",
        text: "The NTSB report doesn't name an attitude, and we won't guess at what this pilot was thinking. ASI's video covers how hazardous attitudes can betray pilots who don't heed warnings. Here are the five the FAA teaches, with the antidote for each, and a question this flight raises.",
      },
      {
        type: "list",
        items: [
          "Anti-authority (\u201cDon't tell me.\u201d) Antidote: Follow the rules. They are usually right. Question: when a controller warns you about weather ahead, do you treat it as information or as an opinion?",
          "Impulsivity (\u201cDo it quickly.\u201d) Antidote: Not so fast. Think first. Question: did you get a briefing for this flight, or just look out the window?",
          "Invulnerability (\u201cIt won't happen to me.\u201d) Antidote: It could happen to me. Question: would you let a student make this departure?",
          "Macho (\u201cI can do it.\u201d) Antidote: Taking chances is foolish. Question: why go VFR toward weather when you hold an instrument rating and the airplane is IFR equipped?",
          "Resignation (\u201cWhat's the use?\u201d) Antidote: I'm not helpless. I can make a difference. Question: once you're in it, do you still believe a turn back or a call to ATC can change the outcome?",
        ],
      },
      {
        type: "paragraph",
        text: "An instrument rating only protects you when you use it. Flying VFR into weather means flying without a clearance, an altitude assignment or a plan for the clouds, which is exactly when an instrument pilot is easiest to catch off guard.",
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Hazardous attitudes are hard to spot from the inside, and there's no second pilot to call them out. A short, honest routine before every flight gives you a chance to catch one. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "Brief every flight, short or long. PlaneWX runs the briefing against your own personal minimums, so the weather is measured against the limits you set when you were calm. The FRAT opens 4 hours before departure and asks for honest Pilot, Aircraft, enVironment and External self-rates, including pressure to go. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Hazardous Attitudes (video)",
        url: "https://www.youtube.com/watch?v=MBL1iy0V9VM",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report WPR19FA079 (N414RS)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/98938/pdf",
        publisher: "NTSB",
      },
      {
        label: "FAA Pilot's Handbook of Aeronautical Knowledge (FAA-H-8083-25), Chapter 2: Aeronautical Decision-Making",
        url: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak",
        publisher: "FAA",
      },
    ],
  },
  {
    slug: "night-falls-on-final",
    title: "Night Falls on Final: Currency, Avionics and a Dark Approach",
    section: "Decision-Making",
    summary:
      "An experienced pilot, out of instrument and night currency, struggled with his GPS and autopilot after a runway change at Raleigh-Durham, then descended into trees a mile short. A case study from the AOPA Air Safety Institute and the NTSB final report on what recency really protects.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Currency rules can feel like paperwork. Three approaches, three night landings, check the box. But the skills they protect are perishable: programming a change in the box quickly, catching the autopilot when it drops off, and flying a stable path to a runway you can barely see. This accident shows what happens when those skills go stale on the same night.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: Night Falls on Final,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/100457/pdf) (ERA20FA014), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "rItYoEwFZ3I",
        title: "AOPA Air Safety Institute: Accident Case Study: Night Falls on Final",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Night Falls on Final.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "The PlaneWX FRAT knows when a flight lands after dark. It pre-fills day or night, and it pulls your night and instrument currency from your pilot profile, with an override if your logbook says otherwise. It opens 4 hours before departure, when you can honestly rate how you feel, including after a long day. Your WX Score runs the destination weather against your own minimums. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [See how the FRAT works](/learn/flight-risk-assessment-tool)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On October 20, 2019, a 72-year-old instrument-rated private pilot with about 2,956 hours departed Columbus, Georgia (CSG) at 4:05 p.m. in a Piper PA-32-301 Saratoga on an IFR flight plan to Raleigh-Durham (RDU). One passenger was aboard. According to his logbook, his last instrument experience was three approaches in November 2018, and his last night flight was half an hour that same month. He did not meet the recent instrument or night requirements to carry a passenger at night in IMC.",
      },
      {
        type: "paragraph",
        text: "Sunset at Raleigh was 6:31 p.m., and civil twilight ended at 6:57. At 6:25 the pilot checked in with approach and asked for the RNAV GPS runway 5R approach. The controller told him to expect runway 32 instead. He said he was set up for 5R but would change.",
      },
      {
        type: "paragraph",
        text: "Over the next half hour the flight came apart in small pieces. He told the tower his GPS approach \u201cjust shut off\u201d and that he needed to climb, confirmed he was in IMC, and said he was having trouble with his heading. A few minutes later he reported his autopilot had shut off. He drifted off assigned altitudes, asked the controller to spell a fix so he could enter it, and missed it. Controllers vectored him back around.",
      },
      {
        type: "paragraph",
        text: "At 7:17 he broke out of the clouds about 9 miles from the runway, but had trouble finding the runway lights, so the controller turned up their intensity. He got two low altitude alerts on final. His last transmission said he had the runway in sight. A pilot who had just landed watched the airplane descend into the trees of a dark state park just over a mile short of runway 32, with its landing light off. Both people aboard were killed. The 6:51 weather at RDU was 1,000 feet broken and 10 miles visibility.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe pilot\u2019s failure to maintain a safe glidepath during final approach to the runway, which resulted in a collision with trees and terrain. Contributing was the pilot\u2019s lack of recent instrument flight experience.\u201d",
      },
      {
        type: "heading",
        text: "What recency really protects",
      },
      {
        type: "paragraph",
        text: "The NTSB said his trouble with the GPS and autopilot was likely due to a lack of recent instrument practice. None of the individual problems was catastrophic. Together, at night, at the end of a long flight, they used up his attention, and he had nothing left for the last mile.",
      },
      {
        type: "list",
        items: [
          "Check your own currency before you plan a flight that ends at night or in IMC, and be honest about proficiency, which is a higher bar than currency.",
          "Expect the runway change. Brief the other likely approaches before you leave, so a switch is a button press, not a rebuild.",
          "When the automation drops off, fly the airplane first. Ask for a hold or a block of airspace to sort out the box.",
          "On a dark final over unlit terrain, use the approach guidance all the way down, even after you see the runway.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "Nobody checks your logbook before you start the engine. If you aren't current or proficient for the flight you're planning, you're the only one who can know it in time. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["FRAT", "GO / NO-GO", "Self Debrief"],
      toolOrHabit:
        "The PlaneWX FRAT opens 4 hours before departure, pre-fills day or night for the flight, and carries your night and instrument currency from your pilot profile, with an override. After you land, a Self Debrief is a good place to note what took longer than it should have, like reprogramming an approach, so you know what to practice. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Night Falls on Final (video)",
        url: "https://www.youtube.com/watch?v=rItYoEwFZ3I",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report ERA20FA014 (N534Z)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/100457/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "in-too-deep",
    title: "In Too Deep: A VFR Pilot Turns Away From a Cleared Runway",
    section: "Decision-Making",
    summary:
      "A 207-hour private pilot without an instrument rating found his destination gone IFR, was cleared to land anyway, and turned away to avoid getting stuck. Minutes later his Cirrus SR20 spiraled into the ground near Crystal Lake, Illinois. A case study from the AOPA Air Safety Institute and the NTSB final report on taking the out you're given.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Weather that was fine when you planned can be gone by the time you arrive. When that happens, the safest runway is usually the one in front of you, even if landing there wrecks the rest of the day.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: In Too Deep,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/82388/pdf) (CEN12FA083), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "W0lWsqAwYwY",
        title: "AOPA Air Safety Institute: Accident Case Study: In Too Deep",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: In Too Deep.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "The forecast here called for VFR on arrival, and the destination went IFR about an hour before the accident. PlaneWX scores ceiling and visibility against the personal minimums you set, and on paid plans it refreshes monitored flights in the background before departure so the briefing you rely on isn't the one from last night. It doesn't fly the airplane with you, and the decision in the air is still yours. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How personal minimums work](https://app.planewx.ai/help/personal-minimums)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On November 26, 2011, a private pilot with about 207 hours and no instrument rating left Marion, Indiana in a Cirrus SR20 with three passengers, headed for DuPage Airport (DPA) west of Chicago. He flew VFR with no flight plan. Before departure he told the line service representative he was aware of the weather west of Chicago and that conditions were forecast to be VFR when they arrived.",
      },
      {
        type: "paragraph",
        text: "They weren't. DuPage had been marginal VFR and dropped to IFR about an hour before the accident, with an overcast around 900 feet and visibility falling in light rain and mist. The pilot called the DuPage tower and was told the airport was IFR. About 30 seconds later he said he had flown over the airport by mistake. The controller cleared him to reverse course and land, and he acknowledged.",
      },
      {
        type: "paragraph",
        text: "Then he lost sight of the airport and asked about another field with better visibility because he didn't \u201cwant to get in there and get stuck all day.\u201d He told the controller he was \u201cin and out of the clouds,\u201d and when asked if he was IFR qualified, he said he was in \u201cIFR training and I've let this get around me.\u201d Chicago approach gave him nearby airports reporting VFR, and he said he'd go to Chicago Executive. About seven minutes later he changed his mind, saying he didn't \u201cwant to mess with the weather\u201d and didn't \u201cwant to get stuck in here.\u201d",
      },
      {
        type: "paragraph",
        text: "Radar showed a gentle right turn that tightened into a steep spiral. Witnesses heard what sounded like aerobatics in the clouds, then saw the airplane come out steeply nose down before it hit the ground near Crystal Lake. All four people aboard were killed. The examination found nothing wrong with the airplane.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201cThe noninstrument-rated pilot's decision to continue flight in instrument meteorological conditions, which resulted in the pilot\u2019s spatial disorientation and loss of control of the airplane.\u201d",
      },
      {
        type: "heading",
        text: "Why turning away matters",
      },
      {
        type: "paragraph",
        text: "This pilot had a runway and a landing clearance, then a VFR airport and a controller helping him get there. Each time, the worry about being stuck on the ground won out over the risk of staying in the clouds. Being weathered in is an inconvenience. Staying in IMC without the training for it is the thing that kills.",
      },
      {
        type: "list",
        items: [
          "\u201cIn and out of the clouds\u201d means you are already in instrument conditions. Act on it then.",
          "Take the out you're given. A cleared runway or a VFR alternate beats a better plan you haven't reached yet.",
          "Decide before you leave what you'll do if the destination goes IFR, and where you'll go instead.",
          "Tell ATC plainly that you're a VFR pilot in the clouds and need help. Controllers can only work with what you tell them.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "A forecast is a starting point, not a promise, and arrival weather can change while you're on the way. Planning your alternate on the ground makes it easier to take it in the air. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "Set ceiling and visibility personal minimums that match your rating and experience, and let the WX Score check every briefing against them. Use the FRAT, which opens 4 hours before departure, to name your alternate and to be honest about external pressure to get there. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: In Too Deep (video)",
        url: "https://www.youtube.com/watch?v=W0lWsqAwYwY",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report CEN12FA083 (N223CD)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/82388/pdf",
        publisher: "NTSB",
      },
    ],
  },
  {
    slug: "cross-country-crisis",
    title: "Cross-Country Crisis: No Briefing, Six Aboard and Snow on Arrival",
    section: "Decision-Making",
    summary:
      "A private pilot without an instrument rating set out VFR from the Chicago area to Raleigh in January with no flight plan, no record of a weather briefing and an airplane over its weight and balance limits. Low on fuel in heavy snow, his Seneca crashed near Huntington, West Virginia. A case study from the AOPA Air Safety Institute and the NTSB final report on planning the whole route.",
    lastReviewed: "2026-10-02",
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Good weather at both ends of a trip says little about the middle. A long cross-country in winter crosses whatever is sitting between you and your destination, and the planning has to cover all of it.",
      },
      {
        type: "paragraph",
        text: "The AOPA Air Safety Institute (ASI) re-creates this flight in its video \"Accident Case Study: Cross-Country Crisis,\" which you can watch below. The summary that follows is ours and is based on the [NTSB final report](https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/73295/pdf) (ERA09FA145), which also gives the official probable cause. Watch the full case study for ASI's own analysis.",
      },
      {
        type: "youtube",
        videoId: "_wsa3vhnowk",
        title: "AOPA Air Safety Institute: Accident Case Study: Cross-Country Crisis",
        caption: "Video: AOPA Air Safety Institute, Accident Case Study: Cross-Country Crisis.",
      },
      {
        type: "callout",
        title: "Where PlaneWX fits",
        text: "Raleigh was forecast VFR. The trouble was snow and instrument conditions along the way. A PlaneWX briefing looks at the whole route, pulling from 15+ weather products including METARs, TAFs, winds aloft, AIRMETs and SIGMETs, and the WX Score checks ceiling, visibility and icing against your personal minimums. The FRAT asks about the pressure to get somewhere. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call. [How the FRAT works](https://app.planewx.ai/help/frat)",
      },
      {
        type: "heading",
        text: "The flight, in short",
      },
      {
        type: "paragraph",
        text: "On January 30, 2009, a private pilot with single and multiengine ratings but no instrument rating took off from Lake in the Hills, Illinois in a Piper PA-34-200T Seneca, bound for Raleigh-Durham, North Carolina, about 580 nautical miles away. He had reported 2,200 hours on his last medical application. Five passengers were aboard, one more than planned.",
      },
      {
        type: "paragraph",
        text: "A friend at the airport noticed the extra passenger and asked about weight and balance. He also urged the pilot to get a weather briefing and file a flight plan. The pilot said he would do both from his cell phone, but no flight plan was filed and the NTSB found no record of a briefing. The NTSB later calculated the airplane weighed about 4,902 pounds at takeoff, over its 4,570 pound maximum, with the center of gravity behind the aft limit. Raleigh was VFR for the expected arrival time, but snow was forecast and instrument conditions were observed along the route before, during and after the flight.",
      },
      {
        type: "paragraph",
        text: "Hours into the flight, the pilot called Huntington tower with a mayday: \u201cI'm flying v-f-r...low on fuel, and need a place to land.\u201d The airport was IFR in light snow. Asked if he was capable of IFR flight, he said yes, though he wasn't instrument rated. Asked later how much fuel he had, he said \u201cnot much.\u201d For several minutes he reported ground contact and then lost it. Controllers worked him onto a surveillance radar approach to runway 30, but about 3 miles out the airplane turned about 80 degrees off course, then turned back too far, and descended below the minimum altitude he'd been given. Witnesses described the snow as heavy. The airplane struck power lines and terrain about 4 miles from the airport, and all six people aboard were killed.",
      },
      {
        type: "paragraph",
        text: "The NTSB determined the probable cause to be: \u201c(1) The pilot\u2019s failure to perform adequate preflight planning and to use available in flight resources in a timely manner and (2) his decision to continue visual-flight-rules flight in instrument meteorological conditions despite his lack of an instrument rating and proficiency in instrument flying, which resulted in spatial disorientation and impact with terrain.\u201d",
      },
      {
        type: "heading",
        text: "Why the whole route matters",
      },
      {
        type: "paragraph",
        text: "The NTSB noted the pilot didn't ask for weather help or ATC help in flight until things had already gone wrong. By then he was low on fuel, in snow, over mountainous terrain and flying an overloaded airplane on instruments he wasn't trained to use. Each of those problems was easier to fix on the ground in Illinois.",
      },
      {
        type: "list",
        items: [
          "Brief the route, not just the endpoints. VFR at the destination doesn't mean VFR on the way there.",
          "Run weight and balance with the people and bags actually getting in the airplane, every time the load changes.",
          "Ask for help early. Flight Service and ATC can help with weather and options long before an emergency.",
          "Tell controllers the truth about your rating and fuel. They plan around what you say.",
        ],
      },
    ],
    puttingItIntoPractice: {
      whyItMatters:
        "The pressure to make a trip happen is strongest before you leave and hardest to undo once you're airborne. Writing down the weather, the load and your own limits before departure gives you a clear moment to change the plan. PlaneWX never recommends GO or NO\u2011GO. The pilot makes the call.",
      loopStage: ["Weather Briefing", "FRAT", "GO / NO-GO"],
      toolOrHabit:
        "Brief the full route in PlaneWX and check the WX Score against personal minimums that match your rating. Use the FRAT, which opens 4 hours before departure, to be honest about external pressure and get-there-itis, and if risks are stacking, take that seriously. You record your own GO\u00A0/\u00A0NO\u2011GO decision.",
    },
    sources: [
      {
        label: "AOPA Air Safety Institute: Accident Case Study: Cross-Country Crisis (video)",
        url: "https://www.youtube.com/watch?v=_wsa3vhnowk",
        publisher: "AOPA ASI",
      },
      {
        label: "NTSB Aviation Investigation Final Report ERA09FA145 (N8047C)",
        url: "https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/73295/pdf",
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
    draft: false,
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
