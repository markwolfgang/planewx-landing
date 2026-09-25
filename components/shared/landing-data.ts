// Last updated: 2026-08-17
// Replica (sync 07:24 UTC): 2,066 active · 3,550,417 hrs · 70% IR · 194 jets · 153 types · 174 ATP · avg 1,909
// Prod active pilots at write: 2,085
// Do not cite a max-hours marketing claim; use "ATP captains" without an hour total.
export const STATS = {
  totalPilots: "2,200+",
  cumulativeHours: "3.5M+",
  instrumentRated: "70%",
  jetAircraft: "194",
  aircraftTypes: "153",
  maxPilotHours: "",
  maxPilotHoursPhrase: "",
  atpPilots: "174",
  avgHours: "1,900+",
}

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
