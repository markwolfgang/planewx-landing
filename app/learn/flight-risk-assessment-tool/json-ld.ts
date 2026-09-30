export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Flight Risk Assessment Tool (FRAT): What It Is and How to Use One Honestly",
  "description": "What a flight risk assessment tool is, where the FAA FRAT comes from, how green, yellow, and red scores work, and how to fill one out without fooling yourself.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/flight-risk-assessment-tool",
  "dateModified": "2026-09-30",
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
    "Flight risk assessment tool",
    "Aeronautical decision making",
    "Risk management",
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
      "name": "What is a FRAT in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A flight risk assessment tool: a form, spreadsheet, or app for recording the hazards of a planned flight and the risk they add up to. \"The form used to record each hazard is known as a Flight Risk Assessment Tool (FRAT).\" It is the pilot's chance to sit down and do an honest assessment, considering all factors in the PAVE framework."
      }
    },
    {
      "@type": "Question",
      "name": "What does FRAT stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flight Risk Assessment Tool."
      }
    },
    {
      "@type": "Question",
      "name": "Is a FRAT required by the FAA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "None of the FAA documents on this page makes a FRAT mandatory for personal Part 91 flying. The FAA Safety Team says a FRAT ought to be part of every flight's planning, and the Risk Management Handbook says a FRAT is appropriate for any flight but may not be necessary for less complex ones. Operators with a safety management system may use FRATs as part of it."
      }
    },
    {
      "@type": "Question",
      "name": "Does a green FRAT mean I should fly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. \"The Flight Risk Assessment Tool (FRAT) is not designed to make the go/no-go decision for you; it serves as a tool to assist in planning your flight and considering a broader spectrum of hazards and risks.\" Even a high green score should prompt a closer look. The decision stays with the pilot in command."
      }
    },
    {
      "@type": "Question",
      "name": "How is PlaneWX FRAT different from a paper FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is built on PAVE like the FAA forms, but it opens within 4 hours of departure, pre-fills facts it already knows as hints, shows the WX Score breakdown as a weather hint, and flags stacked risks. Your ratings drive the result, and PlaneWX never recommends GO or NO-GO."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I get the FAA FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The FAA Safety Team FRAT page links to an online version of the FAASTeam FRAT. The Risk Management Handbook also shows a sample numerical FRAT and a narrative PAVE form."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between PAVE and a FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PAVE is the checklist for finding hazards: pilot, aircraft, environment, and external pressures. A FRAT is where you record them and assess the risk."
      }
    },
    {
      "@type": "Question",
      "name": "How should I set FRAT score thresholds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Realistically. The FAA's original FRAT guidance warns that \"If every flight is within the acceptable range under any condition, it is likely that the thresholds have not been set correctly.\""
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
  "name": "Flight risk assessment glossary",
  "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-imsafe",
      "name": "IMSAFE",
      "description": "A personal fitness checklist that helps a pilot spot aeromedical hazards, the P in PAVE, before a flight.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-imsafe",
      "alternateName": "Illness, Medication, Stress, Alcohol, Fatigue, Emotion"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-pave",
      "name": "PAVE",
      "description": "The FAA risk checklist that sorts preflight hazards into four groups: the pilot, the aircraft, the environment, and external pressures.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-pave",
      "alternateName": "Pilot, Aircraft, enVironment, External pressures"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-sms",
      "name": "SMS",
      "description": "An organization-wide, preventive approach to safety with a safety policy, a positive safety culture, formal hazard and risk methods, and safety assurance.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-sms",
      "alternateName": "Safety management system"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-team",
      "name": "TEAM",
      "description": "The four ways to handle a risk once it is identified. Some FAA material orders it TEMA.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-team",
      "alternateName": "Transfer, Eliminate, Accept, Mitigate"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-vfr",
      "name": "VFR",
      "description": "Ceiling greater than 3,000 feet and visibility greater than 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/flight-risk-assessment-tool#glossary",
      "url": "https://www.planewx.ai/learn/flight-risk-assessment-tool#gl-vfr",
      "alternateName": "Visual flight rules"
    }
  ]
} as const
