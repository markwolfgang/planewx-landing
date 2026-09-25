// PlaneWX Learning Center: weather product explainers, concepts, and ADM.
// To add an article: prepend a new object to LEARN_ARTICLES (or append within section order).
// To add a tip: prepend to TIPS_OF_THE_WEEK (newest first), starting at Weekly PIREP issue #2.
//
// Indexing safety: keep LEARN_PUBLIC false until at least LEARN_PUBLIC_MIN_ARTICLES
// real, sourced (non-draft) articles exist. Draft articles stay reachable by URL
// for review, but robots noindex and stay out of the sitemap.

export const LEARN_PUBLIC = false

/** Flip LEARN_PUBLIC only after this many non-draft, sourced articles ship. */
export const LEARN_PUBLIC_MIN_ARTICLES = 3

export type LearnSection =
  | "Weather Products"
  | "Weather Knowledge"
  | "Decision-Making"

export type LearnPublisher = "FAA" | "NWS" | "AWC" | "MDL"

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
 * Empty until issue #2. Hub shows a standing empty-state line until then.
 */
export interface TipOfTheWeek {
  slug: string
  title: string
  summary: string
  /** Human-readable, e.g. "September 25, 2026" */
  date: string
  /** ISO date, e.g. "2026-09-25" */
  isoDate: string
  /** Weekly PIREP issue number (tips start at #2) */
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
    title: "How to Read a TAF, and How It Differs From MOS, LAMP and NBM",
    section: "Weather Products",
    summary:
      "What a TAF covers, how MOS, LAMP and NBM guidance differ, and why many small airports never get a forecaster-written TAF.",
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
        text: "MOS, LAMP and NBM are forecast guidance that forecasters use as input. The TAF remains the official NWS terminal forecast. PlaneWX complements FAA and Flight Service weather products. It does not replace an official briefing.",
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
        "Without a dispatcher, you have to know whether you are reading an official forecaster TAF or automated guidance. That matters most at airports with no TAF, where MOS, LAMP or NBM may be what you have. Knowing which product you are looking at keeps the go/no-go call grounded in what the product actually is.",
      loopStage: ["Weather Briefing"],
      toolOrHabit:
        "PlaneWX Weather Briefing and WX Score weigh forecast conditions against your own personal minimums. You still make the go/no-go call.",
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
      "How the TFM Convective Forecast and Extended Convective Forecast Product help traffic managers and airline dispatch plan around storms, and how a GA pilot can read them as context (not as a go/no-go product).",
    lastReviewed: "2026-09-25",
    draft: false,
    body: [
      {
        type: "paragraph",
        text: "TCF and ECFP are products built for traffic flow managers and airline dispatch, not as a pilot's go/no-go product. They help a GA pilot see where the airline system expects storm trouble. They are not a substitute for SIGMETs, Convective SIGMETs, TAFs, radar or a Flight Service briefing.",
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
        "Without a dispatcher, looking at what airline dispatchers and traffic managers are planning around gives useful context days out. It is context for your own go/no-go decision, not a verdict. PlaneWX never recommends go or no-go. The pilot makes the call.",
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
]

/** Tips start with Weekly PIREP issue #2. Prepend newest first when adding. */
export const TIPS_OF_THE_WEEK: TipOfTheWeek[] = []

export const LEARN_DISCLAIMER =
  "PlaneWX complements FAA and Flight Service weather products. It does not replace an official briefing."

export const LEARN_DRAFT_BANNER = "DRAFT: facts pending source review"

export const TIPS_EMPTY_LINE =
  "Tips start with Weekly PIREP issue #2."

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

/** Sitemap + indexing: only when the center is public and the article is not draft. */
export function getIndexableLearnArticles(): LearnArticle[] {
  if (!LEARN_PUBLIC) return []
  return LEARN_ARTICLES.filter((a) => !a.draft)
}

export function shouldIndexLearnHub(): boolean {
  return LEARN_PUBLIC
}

export function shouldIndexLearnArticle(article: LearnArticle): boolean {
  return LEARN_PUBLIC && !article.draft
}

/** Article JSON-LD only when not draft and the center is public. */
export function shouldEmitArticleJsonLd(article: LearnArticle): boolean {
  return LEARN_PUBLIC && !article.draft
}
