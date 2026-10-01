export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Thunderstorms for Pilots: Hazards, Avoidance, Outlooks, and Watches",
  "description": "Why the FAA treats every thunderstorm as hazardous, the 20-mile avoidance rule, how lightning is reported, and what convective outlooks, TCF, ECFP, and watches tell you.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/thunderstorms",
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
    "Thunderstorms",
    "Convective outlook",
    "Lightning",
    "Severe weather watches",
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
      "name": "How far should you stay from a thunderstorm?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Handbook says to avoid by at least 20 miles any thunderstorm identified as severe or giving an intense, heavy, or extreme radar echo, and to keep such echoes at least 40 miles apart before flying between them. The AIM says severe turbulence can be expected up to 20 miles from severe thunderstorms."
      }
    },
    {
      "@type": "Question",
      "name": "Is a thunderstorm with light radar echoes safe to fly near?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. “Never regard any thunderstorm lightly, even when radar observers report the echoes are of light intensity. Avoiding thunderstorms is the best policy.”"
      }
    },
    {
      "@type": "Question",
      "name": "What makes a thunderstorm severe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A thunderstorm that produces hail with a diameter of one inch (U.S. quarter size) or larger, convective winds of 50 kt (58 mph) or greater, and/or tornadoes.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a watch and a warning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A ‘watch’ means severe weather is possible during the watch valid time, while a ‘warning’ means that severe weather has been observed or is expected within the hour.” The SPC issues watches; local NWS offices issue warnings."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use datalink radar in the cockpit to pick a path through storms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Handbook and AIM say not to use data-linked NEXRAD mosaic imagery as the sole means of getting through a thunderstorm area. It “shows where the weather was, not where the weather is”, and it may be 15 to 20 minutes older than the age shown. Use it to plan a route that avoids storms entirely."
      }
    },
    {
      "@type": "Question",
      "name": "Does ATC radar show turbulence and hail?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. “ATC radar systems depict only precipitation.” Controllers can’t use it to warn of turbulence, icing, or other hazards, though heavy precipitation implies them."
      }
    },
    {
      "@type": "Question",
      "name": "How is lightning reported in a METAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At automated stations, lightning within 5 NM is reported as TS, from 5 to 10 NM as VCTS, and from 10 to 30 NM as LTG DSNT in the remarks."
      }
    },
    {
      "@type": "Question",
      "name": "Does a Slight Risk on the convective outlook mean storms will be weak?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The SPC says “It is important not to rigidly associate the type of risk area (e.g., 2-SLGT-yellow) with the severe potential for any given thunderstorm in the risk area.”"
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX handle thunderstorms in a briefing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its help center lists thunderstorms, vicinity thunderstorms, hail, and squalls among conditions that are “always unfavorable regardless of your score math”, and it also scores convective SIGMETs, model instability, and live radar along the route. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
  "name": "Thunderstorm and convective weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-aww",
      "name": "AWW",
      "description": "A local NWS warning for ground operations at selected airports, for hazards such as nearby cloud-to-ground lightning.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-aww",
      "alternateName": "Airport Weather Warning"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-cb",
      "name": "CB",
      "description": "Thunderstorm cloud. It is the only cloud type a TAF includes, added to the cloud layer whenever thunderstorms are forecast, even in the vicinity.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-cb",
      "alternateName": "Cumulonimbus"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-convoutlook",
      "name": "Convective Outlook",
      "description": "An SPC forecast, in text and graphics, of the potential for severe and general thunderstorms over the next several days.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-convoutlook"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-csigmet",
      "name": "Convective SIGMET",
      "description": "The SIGMET issued for thunderstorms over the contiguous U.S. It implies severe or greater turbulence, severe icing, and low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-csigmet"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-downburst",
      "name": "Downburst",
      "description": "An intense downdraft from a shower or thunderstorm cell that creates strong, often damaging winds and wind shear near the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-downburst"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-ecfp",
      "name": "ECFP",
      "description": "A planning graphic of the forecast probability of thunderstorms out to 72 hours over the CONUS.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-ecfp",
      "alternateName": "Extended Convective Forecast Product"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-gustfront",
      "name": "Gust front",
      "description": "The leading edge of gusty surface winds pushed out ahead of thunderstorm downdrafts, sometimes marked by a shelf or roll cloud.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-gustfront"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-lightning",
      "name": "Lightning",
      "description": "A visible electrical discharge from a thunderstorm; every thunderstorm produces it.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-lightning"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-ltgdsnt",
      "name": "LTG DSNT",
      "description": "An automated METAR remark for lightning more than 10 NM but less than 30 NM from the airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-ltgdsnt",
      "alternateName": "Lightning distant"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-microburst",
      "name": "Microburst",
      "description": "A small downburst whose damaging outflow extends 2.5 miles or less and spreads in all directions when it reaches the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-microburst"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-saw",
      "name": "SAW",
      "description": "The aviation version of an SPC severe thunderstorm or tornado watch, giving an approximate watch area and expected hazards.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-saw",
      "alternateName": "Aviation Watch Notification Message"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-severets",
      "name": "Severe thunderstorm",
      "description": "A thunderstorm that produces hail one inch across or larger, convective winds of 50 kt or more, or a tornado.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-severets"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-spc",
      "name": "SPC",
      "description": "The NWS center in Norman, Oklahoma, that issues tornado and severe thunderstorm watches and convective outlooks for the CONUS.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-spc",
      "alternateName": "Storm Prediction Center"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-squallline",
      "name": "Squall line",
      "description": "A narrow band of thunderstorms that can stretch for hundreds of miles and is the hardest storm type to get around.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-squallline"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-supercell",
      "name": "Supercell",
      "description": "A long-lived, often dangerous thunderstorm built around a single rotating updraft; nearly all produce severe weather.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-supercell"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-tcf",
      "name": "TCF",
      "description": "A high-confidence graphic of forecast convection that meets set thresholds for coverage, intensity, and echo top height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-tcf",
      "alternateName": "Traffic Flow Management Convective Forecast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-vc",
      "name": "VC",
      "description": "In U.S. TAFs, the ring between 5 and 10 statute miles from the center of the runway complex; used only as VCFG, VCSH, or VCTS.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-vc",
      "alternateName": "Vicinity"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-watch",
      "name": "Watch",
      "description": "A notice that severe weather is possible during the valid time; a warning means it has been observed or is expected within the hour.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-watch"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-z",
      "name": "Z",
      "description": "Letter added to TAF times to show they are in Coordinated Universal Time, not local time.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/thunderstorms#gl-z",
      "alternateName": "Zulu, UTC"
    }
  ]
} as const
