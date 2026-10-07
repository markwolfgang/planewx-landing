export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "FAA FRAT: What the Flight Risk Assessment Tool Is and How to Use One",
  "description": "FAA FRAT means Flight Risk Assessment Tool. How the FAA form, checklist, and online tool work, what green, yellow, and red mean, and how an eFRAT fits.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/flight-risk-assessment-tool",
  "dateModified": "2026-10-06",
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
    "FAA FRAT",
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
      "name": "What is an FAA FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FAA FRAT means Flight Risk Assessment Tool: the FAA's name for a form that records the hazards of a planned flight and the risk they add up to. \"The form used to record each hazard is known as a Flight Risk Assessment Tool (FRAT).\" The FAA publishes FRAT guidance on the FAA Safety Team FRAT page, sample forms in the Risk Management Handbook and InFO 07015, and an online FAASTeam FRAT."
      }
    },
    {
      "@type": "Question",
      "name": "What is a FRAT in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A flight risk assessment tool: a form, spreadsheet, or app for recording the hazards of a planned flight and the risk they add up to. \"The form used to record each hazard is known as a Flight Risk Assessment Tool (FRAT).\" It is the pilot's chance to sit down and do an honest assessment, considering all factors in the PAVE checklist."
      }
    },
    {
      "@type": "Question",
      "name": "What does FRAT stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flight Risk Assessment Tool. In FAA and GA use, people also search for \"FAA FRAT,\" \"FRAT tool,\" \"FRAT form,\" and \"FRAT checklist\"; those phrases all point at the same idea."
      }
    },
    {
      "@type": "Question",
      "name": "What is a FRAT form?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The written record of the hazards and risk for one planned flight. The Risk Management Handbook defines the FRAT as that form: \"The form used to record each hazard is known as a Flight Risk Assessment Tool (FRAT).\" It can be a paper sheet, a spreadsheet, or an app. The FAA's original sample form is attached to InFO 07015."
      }
    },
    {
      "@type": "Question",
      "name": "What is a FRAT checklist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilots often say \"FRAT checklist\" when they mean the PAVE checklist that feeds a FRAT. PAVE is how you find hazards (Pilot, Aircraft, enVironment, External pressures). A FRAT is where you record them and assess the risk. The Pilot section usually includes IMSAFE. See the PAVE guide."
      }
    },
    {
      "@type": "Question",
      "name": "What is a FRAT tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any form, spreadsheet, or app that records flight hazards and risk. The FAA Safety Team publishes guidance and links to an online FAASTeam FRAT. The Risk Management Handbook also shows numerical and narrative sample tools. A FRAT tool assists planning; it does not make the go/no-go decision for you."
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
      "name": "How does PlaneWX's electronic FRAT (eFRAT) use the WX Score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PlaneWX's eFRAT is built on PAVE like the FAA forms. The WX Score rates the weather against your minimums as Favorable, Marginal, or Unfavorable and appears as a hint in the enVironment section. Your LOW / MEDIUM / HIGH self-rates drive the FRAT; rating weather more optimistically than the hint needs a short note. The eFRAT opens within 4 hours of departure, flags stacked risks, and never recommends GO or NO-GO. You make the GO / NO-GO call as PIC."
      }
    },
    {
      "@type": "Question",
      "name": "How is PlaneWX FRAT different from a paper FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is an eFRAT built on PAVE like the FAA forms, but it opens within 4 hours of departure, pre-fills facts it already knows as hints, shows the WX Score breakdown as a weather hint, and flags stacked risks. Your ratings drive the result, and PlaneWX never recommends GO or NO-GO."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I get the FAA FRAT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start on the FAA Safety Team FRAT page, which links to an online version of the FAASTeam FRAT. The Risk Management Handbook also shows a sample numerical FRAT and a narrative PAVE form. InFO 07015 includes the original sample form for operators."
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
