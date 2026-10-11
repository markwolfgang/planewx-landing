export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The IMSAFE Checklist: How to Know You Are Fit to Fly Today",
  "description": "Use the IMSAFE checklist before every flight: illness, medication, stress, alcohol, fatigue, emotion. FAA rules, NTSB lessons and a printable card.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/imsafe-checklist",
  "datePublished": "2026-10-11",
  "dateModified": "2026-10-11",
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
    "IMSAFE checklist",
    "Pilot fitness to fly",
    "Medications and flying",
    "Aeronautical decision making",
    "General aviation safety"
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
      "name": "What is the IMSAFE self-assessment checklist used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is used to decide whether you are fit to fly before each flight. IMSAFE walks through Illness, Medication, Stress, Alcohol, Fatigue and Emotion so you catch a pilot problem before it meets a weather or aircraft problem. It is a self assessment, and 14 CFR 61.53 puts the responsibility on the pilot."
      }
    },
    {
      "@type": "Question",
      "name": "What is an IMSAFE checklist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An IMSAFE checklist is a personal fitness check pilots run before every flight. The letters stand for Illness, Medication, Stress, Alcohol, Fatigue and Emotion, and some sources use Eating for the second E. The FAA Risk Management Handbook presents it as a way to spot aeromedical hazards, the Pilot part of PAVE."
      }
    },
    {
      "@type": "Question",
      "name": "What does the IMSAFE checklist include in terms of medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The M asks whether any prescription or over the counter drug could affect your faculties. 14 CFR 91.17 prohibits flying on such a drug. The FAA MedGuide lists allowed medications, usually with a 48 hour wait after starting one, and the FAA Do Not Fly guidance sets a wait of 5 maximum half-lives, or 5 maximum dosing intervals only when half-life information is not available."
      }
    },
    {
      "@type": "Question",
      "name": "What is the PAVE checklist used for in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PAVE is used to sort the hazards of a planned flight into four groups: Pilot, Aircraft, enVironment and External pressures. IMSAFE is how you check the Pilot group. Pilots often record PAVE hazards in a FRAT to see how the risk adds up. See the PAVE guide."
      }
    },
    {
      "@type": "Question",
      "name": "What are the five safety checks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no single FAA list called \"the five safety checks.\" Pilots often mean the 5P check from the FAA Pilot's Handbook of Aeronautical Knowledge: Plan, Plane, Pilot, Passengers and Programming. The Pilot check is where IMSAFE fits, alongside PAVE and the FRAT, which cover the rest of the flight's hazards."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
  "name": "IMSAFE checklist glossary",
  "url": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/imsafe-checklist#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
      "url": "https://www.planewx.ai/learn/imsafe-checklist#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/imsafe-checklist#gl-imsafe",
      "name": "IMSAFE",
      "description": "A personal fitness checklist that helps a pilot spot aeromedical hazards, the P in PAVE, before a flight.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
      "url": "https://www.planewx.ai/learn/imsafe-checklist#gl-imsafe",
      "alternateName": "Illness, Medication, Stress, Alcohol, Fatigue, Emotion"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/imsafe-checklist#gl-pave",
      "name": "PAVE",
      "description": "The FAA risk checklist that sorts preflight hazards into four groups: the pilot, the aircraft, the environment, and external pressures.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
      "url": "https://www.planewx.ai/learn/imsafe-checklist#gl-pave",
      "alternateName": "Pilot, Aircraft, enVironment, External pressures"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/imsafe-checklist#gl-persmins",
      "name": "Personal minimums",
      "description": "A pilot’s own set of rules and criteria for deciding whether, and under what conditions, to fly or keep flying.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/imsafe-checklist#glossary",
      "url": "https://www.planewx.ai/learn/imsafe-checklist#gl-persmins"
    }
  ]
} as const
