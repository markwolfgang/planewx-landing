export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Weather Risk and Personal Minimums: FAA Definitions and Where to Go Next",
  "description": "How the FAA defines hazard, risk, personal minimums, and PAVE, the NTSB lessons on compounding weather risk, and links to PlaneWX guides for setting and using your own limits.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/weather-risk",
  "dateModified": "2026-10-01",
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
  "about": [
    "Personal minimums",
    "Aviation risk management",
    "PAVE",
    "Aviation weather"
  ],
  "isPartOf": {
    "@type": "CollectionPage",
    "name": "Aviation Weather",
    "url": "https://www.planewx.ai/learn/aviation-weather"
  }
} as const

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between a hazard and a risk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A hazard is a condition that could cause an accident; risk is the composite of how likely an outcome is and how severe it would be."
      }
    },
    {
      "@type": "Question",
      "name": "What are personal minimums?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A pilot’s set of procedures, rules, criteria, and guidelines that help the pilot decide whether and under what conditions to operate or continue operating in the NAS.”"
      }
    },
    {
      "@type": "Question",
      "name": "Do personal minimums change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. “Personal minimums may change with pilot experience, proficiency, currency, and other factors.” The Risk Management Handbook says to change them one variable at a time, with training and an instructor, never to complete a specific flight."
      }
    },
    {
      "@type": "Question",
      "name": "What does PAVE stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilot in command, Aircraft, enVironment, and External pressures. AC 91‑92 says using PAVE is part of the risk management process."
      }
    },
    {
      "@type": "Question",
      "name": "How do small weather risks cause accidents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NTSB says accidents can result “when several risks of marginal severity are not identified or are ineffectively managed by the pilot and compound into a dangerous situation.”"
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX set my personal minimums?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You set a comfort limit and a max limit for each weather category, and PlaneWX scores the briefing against them. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
  "name": "Weather risk glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-hazard",
      "name": "Hazard",
      "description": "A present condition, event, object, or circumstance that could lead to or contribute to an accident.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-hazard"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-pave",
      "name": "PAVE",
      "description": "The FAA risk checklist that sorts preflight hazards into four groups: the pilot, the aircraft, the environment, and external pressures.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-pave",
      "alternateName": "Pilot, Aircraft, enVironment, External pressures"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-persmins",
      "name": "Personal minimums",
      "description": "A pilot’s own set of rules and criteria for deciding whether, and under what conditions, to fly or keep flying.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-persmins"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-risk",
      "name": "Risk",
      "description": "The combination of how likely an outcome is and how severe its consequences would be.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-risk#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-risk#gl-risk"
    }
  ]
} as const
