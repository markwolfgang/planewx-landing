// Last updated: 2026-08-17
// Replica (sync 07:24 UTC): 2,066 active · 3,550,417 hrs · 70% IR · 194 jets · 153 types · 174 ATP · avg 1,909
// Prod active pilots at write: 2,085
// Do not cite a max-hours marketing claim; use "ATP captains" without an hour total.
export const STATS = {
  totalPilots: "2,200+",
  countries: "35",
  cumulativeHours: "3.5M+",
  instrumentRated: "70%",
  jetAircraft: "194",
  aircraftTypes: "153",
  maxPilotHours: "",
  maxPilotHoursPhrase: "",
  atpPilots: "174",
  avgHours: "1,900+",
}

/**
 * Staged How It Works copy (easy to swap after CoS audit).
 * Badges must not say "No AI". Any "can't raise the score" line starts with
 * "Within 12 hours of departure".
 */
export const HOW_IT_WORKS_STEPS: {
  title: string
  badge?: string
  body: string
}[] = [
  {
    title: "Retrieve",
    badge: "Code",
    body: "Every METAR, TAF, PIREP, advisory, model product and NOTAM along your route is fetched, decoded and filtered by code.",
  },
  {
    title: "Personalize",
    badge: "Rule-based within 12 hours of departure",
    body: "Within 12 hours of departure, your personal minimums and aircraft limits are checked by rule-based code. If you're outside them, the server drives the WX Score to 0, not the AI. Further out, AI helps weigh some limits, like icing and turbulence.",
  },
  {
    title: "Synthesize",
    badge: "AI",
    body: "AI reads the forecasters' written discussions and regional summaries, then writes the plain-language briefing for your route: the big picture, the hazard summary, and most section ratings. It also proposes a starting WX Score and deductions, such as for convection, and code bounds them. Ceiling and visibility are always scored by code. Within 12 hours of departure, the AI can't raise your WX Score above the rule-based score.",
  },
  {
    title: "Inform",
    body: "You get your WX Score, the reasons behind it, and the hazards along your route, so you can make your GO / NO‑GO call as PIC. For monitored flights, the briefing keeps updating as the forecast changes.",
  },
]

export const HOW_IT_WORKS_WHY =
  "Weather data is handled by code, and close to departure so are your limits, the same way every time. AI turns it into a plain-language briefing. You make the call."

export const TESTIMONIALS = [
  {
    quote: "I've been beta testing this product for a few weeks now and I'm really enjoying it. It does a very good job of synthesizing multiple weather products and highlighting the key factors to be aware of. It links everything back to the source data so you can verify if anything looks amiss.",
    name: "Adam",
    cert: "Private",
  },
  {
    quote: "This tool has a great flow to it, and tells me what I want to know. I'm by no means a weather geek. I'm looking to assess risk. This looks promising.",
    name: "Vas",
    cert: "Instrument Rated",
  },
  {
    quote: "I just signed up a couple of days ago and super impressed. This is way better than other solutions I use mainly because it interprets the weather and gives me conclusions.",
    name: "Sukumar",
    cert: "Commercial",
  },
  {
    quote: "Very impressive and helpful. Great use of A.I. I can relate to your comments about going to many different websites piecing things together.",
    name: "Forrest",
    cert: "ATP",
  },
  {
    quote: "I've been using this for several weeks. For big trips that are a week away it helps me stay aware of the outlook and sometimes highlights things that I'm not seeing. I like it.",
    name: "Roy",
    cert: "Instrument Rated",
  },
  {
    quote: "I fly an SF50 and own a business that operates in multiple states. I also have 9 years experience as a Nav on C130s in the Marine Corps. This is the best product for long range weather planning. Executive time is valuable — schedules are tight. Having weather outlook 2 weeks out helps drive internal conversations if plans need to change early. It's certainly worth a try!",
    name: "Clark",
    cert: "ATP · SF50",
    featured: true,
  },
]

/** Plain text, or a link segment for in-answer anchors. */
export type FaqSegment = string | { href: string; label: string }

/** Single-paragraph string, or multi-paragraph rich answer (array of segment arrays). */
export type FaqAnswer = string | FaqSegment[][]

/** Flatten rich FAQ answers to plain text for FAQPage JSON-LD. */
export function faqAnswerToPlainText(answer: FaqAnswer): string {
  if (typeof answer === "string") return answer
  return answer
    .map((paragraph) =>
      paragraph.map((segment) => (typeof segment === "string" ? segment : segment.label)).join("")
    )
    .join(" ")
}

export const FAQS: {
  q: string
  a: FaqAnswer
  /** When set, render the approved 5X5 disclosure after the answer, linked to /privacy. */
  fiveX5SeesNote?: boolean
}[] = [
  {
    q: "How is PlaneWX different from my EFB or aviationweather.gov?",
    a: [
      [
        "Your EFB is excellent for charts, filing, and day-of flying. Aviationweather.gov and Flight Service (including 1800WXBRIEF) give you official weather products. PlaneWX sits beside those tools. It does not replace them.",
      ],
      [
        "What PlaneWX adds is decision support days out: a ",
        {
          href: "https://www.planewx.ai/blog/wx-score-planning-tool-review",
          label: "WX Score matched to your aircraft and personal minimums",
        },
        ", a dynamic ",
        {
          href: "https://app.planewx.ai/help/frat",
          label: "FRAT on the FAA PAVE framework",
        },
        ", and mentors who see the same briefing you see. ",
        {
          href: "https://app.planewx.ai/help/route-paste",
          label: "You can also share a flight plan into PlaneWX from a supported EFB.",
        },
      ],
      ["You stay PIC. Charts, filing, and official sources stay where they belong."],
    ],
  },
  {
    q: "Is the briefing accurate?",
    a: "Your briefing uses the same official observations and forecasts every pilot relies on: METARs, TAFs, PIREPs, SIGMETs and model guidance. It can only be as accurate as those forecasts, and every forecast carries some uncertainty. Every weather briefing, from any provider, also has the same built-in limit. It describes one departure time, one route, one altitude and one arrival time. Real flights change. You leave late, get rerouted, or get assigned a different altitude, and each change puts you in weather the briefing didn't look at. That's why PlaneWX can keep updating your briefing for monitored flights as the forecast changes, and why your decision-making continues in the air.",
  },
  {
    q: "How can I make my briefing more accurate?",
    a: "Enter the flight the way you'll really fly it: a realistic departure time, the route you expect to file or be cleared, your planned altitude, and the right aircraft profile. If any of those change, update the trip and brief again. Check again close to departure, when the forecasts are freshest.",
  },
  {
    q: "Does PlaneWX use AI?",
    a: "Yes, in specific places. Weather reports, forecasts, model data and NOTAMs are fetched and decoded by code. AI reads forecaster discussions and writes the plain-language briefing, the hazard summary and most section ratings. It also proposes a starting WX Score and some deductions, such as for convection. Ceiling and visibility are always scored by code. Within 12 hours of departure, your personal minimums and aircraft limits are checked by rule-based code: if you're outside them the server drives the WX Score to 0, and the AI can't raise the score above the rule-based score. Further out, AI also helps weigh icing and turbulence against your limits. You always make the final call.",
  },
  {
    q: "What is the WX Score?",
    a: "The WX Score is a 0-100% metric calculated against YOUR personal minimums and your specific aircraft, not generic VFR/IFR categories. It tells you, in a single number, how well conditions are expected to match your standards. Every deduction is transparent and explained.",
  },
  {
    q: "What is the PAVE framework?",
    a: [
      [
        "PAVE is the FAA risk framework: Pilot, Aircraft, enVironment, and External pressures. It is the structure behind a serious preflight risk assessment, not a weather product by itself.",
      ],
      [
        "We walk through it in plain language in our ",
        {
          href: "https://www.planewx.ai/blog/pave-risk-assessment-weather",
          label: "PAVE risk assessment guide",
        },
        ". PlaneWX FRAT uses that same framework as a living sit-down assessment near departure. See ",
        {
          href: "https://app.planewx.ai/help/frat",
          label: "how PlaneWX FRAT works",
        },
        ", including how the briefing and airport context feed the enVironment side.",
      ],
    ],
  },
  {
    q: "How far in advance can PlaneWX forecast weather?",
    a: "PlaneWX provides weather intelligence from 14 days out through departure. Confidence improves as your flight approaches. We are transparent about uncertainty at every time horizon.",
  },
  {
    q: "What is the mentor system?",
    a: "PlaneWX connects you with experienced pilots who can review your full briefing (WX Score, aircraft profile, personal minimums) and offer a second set of eyes grounded in shared data, not guesswork. Mentor sits alongside the risk-management loop when you want it.",
  },
  {
    q: "Is there a free plan?",
    a: [
      [
        "Yes. Free forever includes full-quality briefings. We limit how much you can use PlaneWX, not how good the analysis is. Details on plans and what each tier includes are in ",
        {
          href: "https://app.planewx.ai/help/plans",
          label: "PlaneWX Plans help",
        },
        ".",
      ],
    ],
  },
  {
    q: "What's the difference between Casual, Pro, and Pro Plus?",
    a: [
      [
        "Casual is for pilots who fly a few times a month and want auto-monitoring. Pro raises limits and automation. Pro Plus adds Ground Protection, Auto-Brief, Pre-Flight Text, briefed fuel stops, and Labs. Compare current limits and features in ",
        {
          href: "https://app.planewx.ai/help/plans",
          label: "Plans help",
        },
        ", or start from the pricing section on this page.",
      ],
      [
        "Personal minimums still drive the WX Score on every plan. If you are setting those for the first time, see ",
        {
          href: "https://www.planewx.ai/blog/personal-minimums-weather-planning",
          label: "personal minimums for weather planning",
        },
        ".",
      ],
    ],
  },
  {
    q: "What happens after the 14-day free trial?",
    a: [
      [
        "You keep access on Free, or choose Casual, Pro, or Pro Plus. No card is required to start the trial. Plan details stay in ",
        {
          href: "https://app.planewx.ai/help/plans",
          label: "Plans help",
        },
        ".",
      ],
    ],
  },
]
