export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Icing Forecasts: CIP, FIP, Freezing Level, and Icing Intensity",
  "description": "What the CIP and FIP icing products show, how to find the freezing level, what trace, light, moderate, heavy, and severe icing mean, and where icing forecasts fall short.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/icing",
  "dateModified": "2026-09-29",
  "author": {
    "@type": "Organization",
    "name": "PlaneWX",
    "url": "https://www.planewx.ai"
  },
  "publisher": {
    "@id": "https://www.planewx.ai/#organization"
  },
  "about": [
    "Aircraft icing",
    "Current Icing Product",
    "Forecast Icing Product",
    "Freezing level",
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
      "name": "What is the difference between CIP and FIP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CIP is an hourly diagnosis of icing built from satellite, radar, METARs, PIREPs, and model data. The FIP is its forecast counterpart, based on computer models, out to 18 hours. Both are automated, with no forecaster changes."
      }
    },
    {
      "@type": "Question",
      "name": "Does the CIP show current icing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not exactly. Despite the name, the Handbook says it shows the computer's expected conditions at the product's valid time, and \"This valid time can be an hour old or more depending on when it is received by the user.\""
      }
    },
    {
      "@type": "Question",
      "name": "What does heavy icing mean on the FIP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "\"Heavy icing is defined as the accretion of ¼ inch of ice on the airfoil in < 15 minutes.\" The Handbook calls it a relative value that depends on the airframe and its ice protection."
      }
    },
    {
      "@type": "Question",
      "name": "Is FIP heavy icing the same as severe icing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. CIP and FIP categories are a broad indication of ice accumulation rate, not of aircraft performance. The AIM's severe icing is defined by what happens to the aircraft: ice protection can't keep up and immediate exit is required."
      }
    },
    {
      "@type": "Question",
      "name": "What is the freezing level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "\"The freezing level is the lowest altitude in the atmosphere over a given location at which the air temperature reaches 0°C.\" There can be more than one."
      }
    },
    {
      "@type": "Question",
      "name": "Where do I find the freezing level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The freezing level analysis and forecast graphics, updated hourly; AIRMET Zulu; PIREP temperatures; and the temperatures in the winds aloft forecast."
      }
    },
    {
      "@type": "Question",
      "name": "What are supercooled large drops?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Liquid drops larger than 50 micrometers, 0.05 mm, below 0°C, such as freezing drizzle and freezing rain. They can freeze behind the protected areas."
      }
    },
    {
      "@type": "Question",
      "name": "Can a report of no icing be trusted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only for that time and place. The AIM notes that a report of no icing can't assure the absence of icing later. Negative icing PIREPs still help forecasters."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use CIP and FIP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On CONUS flights within 18 hours, the help center says PlaneWX layers the CIP nowcast and the DAFS Icing Forecast Integration, which it describes as the successor to FIP, over multi-model icing soundings. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
  "name": "Icing and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-zulu",
      "name": "AIRMET Zulu",
      "description": "The AIRMET series for moderate icing; it also gives freezing level heights.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-zulu"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-cip",
      "name": "CIP",
      "description": "An hourly, automated 3D diagnosis of icing probability, severity, and supercooled large drop threat, built from satellite, radar, METARs, PIREPs, and model data.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-cip",
      "alternateName": "Current Icing Product"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-csigmet",
      "name": "Convective SIGMET",
      "description": "The SIGMET issued for thunderstorms over the contiguous U.S. It implies severe or greater turbulence, severe icing, and low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-csigmet"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-cwa",
      "name": "CWA",
      "description": "A short-term advisory from a Center Weather Service Unit for weather that meets or approaches AIRMET or SIGMET criteria, valid for up to 2 hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-cwa",
      "alternateName": "Center Weather Advisory"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-fip",
      "name": "FIP",
      "description": "The automated forecast counterpart of the CIP: icing probability, severity, and supercooled large drop threat out to 18 hours, from computer model output.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-fip",
      "alternateName": "Forecast Icing Product"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-frzlvl",
      "name": "Freezing level",
      "description": "The lowest altitude over a place where the air temperature reaches 0°C. There can be more than one.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-frzlvl"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-sigmet",
      "name": "SIGMET",
      "description": "An unscheduled warning of en route weather that may affect the safety of aircraft operations, such as severe icing, severe turbulence, widespread dust storms or sandstorms, and volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-sigmet",
      "alternateName": "Significant Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/icing#gl-sld",
      "name": "SLD",
      "description": "Liquid water drops larger than 50 micrometers, such as freezing drizzle and freezing rain, that stay unfrozen below 0°C and can freeze behind ice protection.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/icing#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/icing#gl-sld",
      "alternateName": "Supercooled large drops"
    }
  ]
} as const
