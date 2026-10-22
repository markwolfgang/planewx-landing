export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Brief, Assess, Decide, Debrief: A Risk Management Loop for General Aviation",
  "name": "Brief, Assess, Decide, Debrief: GA Risk Management Loop",
  "description": "Brief, Assess, Decide, Debrief: a four-step risk management loop for general aviation pilots, built on FAA PAVE, IMSAFE, 3P, and FRAT guidance.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/risk-management-loop",
  "url": "https://www.planewx.ai/learn/risk-management-loop",
  "dateModified": "2026-10-21",
  "datePublished": "2026-10-21",
  "author": {
    "@type": "Organization",
    "name": "PlaneWX",
    "url": "https://www.planewx.ai"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PlaneWX",
    "url": "https://www.planewx.ai"
  },
  "about": {
    "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-risk-management-loop"
  },
  "citation": [
    "https://www.faa.gov/sites/faa.gov/files/2022-06/risk_management_handbook_2A.pdf",
    "https://www.faa.gov/sites/faa.gov/files/04_phak_ch2.pdf",
    "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-B/section-91.103",
    "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-A/section-91.3",
    "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-92_Ed_Upd_(3-19-25).pdf",
    "https://www.faa.gov/general/flight-risk-assessment-tool-frat-faa-safety-team"
  ],
  "isPartOf": {
    "@type": "CollectionPage",
    "name": "PlaneWX Learning Center",
    "url": "https://www.planewx.ai/learn"
  }
} as const

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Brief, Assess, Decide, Debrief mean in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a four-step risk management loop for general aviation pilots: the pilot briefs the flight, assesses the risk with PAVE and a FRAT, makes their own GO / NO-GO call, then debriefs what actually happened so the next flight starts with better information."
      }
    },
    {
      "@type": "Question",
      "name": "Is Brief, Assess, Decide, Debrief an FAA term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The name is PlaneWX's. The steps come from FAA guidance: the Risk Management Handbook (FAA-H-8083-2A), PAVE, IMSAFE, the FRAT, personal minimums, and the 3P and DECIDE models in the Pilot's Handbook of Aeronautical Knowledge."
      }
    },
    {
      "@type": "Question",
      "name": "How is it different from the 3P model or DECIDE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3P and DECIDE describe how a pilot thinks through hazards at any moment, including in flight. Brief, Assess, Decide, Debrief is the trip-level sequence those models fit inside, from the first look days out to the review after landing, with a deliberate debrief that feeds the next flight."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX make the GO / NO-GO decision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. PlaneWX never recommends GO or NO-GO. The WX Score, the FRAT, and an optional volunteer mentor support the pilot's call as PIC, and pilots also weigh NOTAMs, ATIS, PIREPs, an official weather briefing, and their own judgment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between WX Score points and FRAT points?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WX Score points are deductions from 100% for forecast weather against the pilot's aircraft and personal minimums. FRAT points are the risk points the FRAT adds for PAVE factors such as recent flying and night currency. They are separate numbers, and neither one makes the call."
      }
    },
    {
      "@type": "Question",
      "name": "Is the full loop available on the Free plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. WX Score, the PAVE-based FRAT, Flight Window Explorer, and Self Debrief are on every plan, and the Free plan is completely free."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/risk-management-loop#glossary",
  "name": "Brief, Assess, Decide, Debrief: risk management loop glossary",
  "url": "https://www.planewx.ai/learn/risk-management-loop#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-risk-management-loop",
      "name": "Brief, Assess, Decide, Debrief",
      "description": "Brief, Assess, Decide, Debrief is a four-step risk management loop for general aviation pilots: the pilot briefs the flight, assesses the risk with PAVE and a FRAT, makes their own GO / NO-GO call, then debriefs what actually happened so the next flight starts with better information.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-risk-management-loop",
      "alternateName": [
        "risk management loop for general aviation",
        "GA risk management loop",
        "Brief Assess Decide Debrief"
      ]
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-brief",
      "name": "Brief",
      "description": "The first step of the loop: gathering the weather, NOTAMs, aircraft status, and trip facts a flight needs, from days out through the day of the flight.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-brief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-assess",
      "name": "Assess",
      "description": "The second step of the loop: naming the hazards of a planned flight with PAVE and IMSAFE and recording the risk they add up to, often in a FRAT.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-assess"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-decide",
      "name": "Decide",
      "description": "The third step of the loop: the pilot in command's own GO / NO-GO call, including a delay or a changed plan.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-decide"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-debrief",
      "name": "Debrief",
      "description": "The fourth step of the loop: comparing what was planned with what happened after a flight, or after a flight that did not happen, so the lessons carry into the next Brief.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-debrief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-pave",
      "name": "PAVE",
      "description": "The FAA risk checklist that sorts preflight hazards into four groups: the pilot, the aircraft, the environment, and external pressures.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-pave",
      "alternateName": "Pilot, Aircraft, enVironment, External pressures"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-imsafe",
      "name": "IMSAFE",
      "description": "A personal fitness checklist that helps a pilot spot aeromedical hazards, the P in PAVE, before a flight.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-imsafe",
      "alternateName": "Illness, Medication, Stress, Alcohol, Fatigue, Emotion"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording the hazards of a planned flight and the risk they add up to before the flight.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-team",
      "name": "TEAM",
      "description": "The four ways to handle a risk once it is identified. Some FAA material orders it TEMA.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-team",
      "alternateName": "Transfer, Eliminate, Accept, Mitigate"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-persmins",
      "name": "Personal minimums",
      "description": "A pilot's own set of rules and criteria for deciding whether, and under what conditions, to fly or keep flying.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-persmins"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-3p",
      "name": "3P",
      "description": "An FAA decision model in which the pilot perceives hazards, processes what they mean, and performs a course of action, then starts again.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-3p",
      "alternateName": "Perceive, Process, Perform"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/risk-management-loop#gl-decide-model",
      "name": "DECIDE",
      "description": "A six-step FAA decision model that the Pilot's Handbook of Aeronautical Knowledge calls a continuous loop process.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/risk-management-loop#glossary",
      "url": "https://www.planewx.ai/learn/risk-management-loop#gl-decide-model",
      "alternateName": "Detect, Estimate, Choose, Identify, Do, Evaluate"
    }
  ]
} as const

export const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Learning Center",
      "item": "https://www.planewx.ai/learn"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Brief, Assess, Decide, Debrief",
      "item": "https://www.planewx.ai/learn/risk-management-loop"
    }
  ]
} as const
