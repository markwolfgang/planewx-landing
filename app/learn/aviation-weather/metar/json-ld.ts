export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is a METAR? How to Read an Airport Weather Report",
  "description": "A METAR is the coded weather observation for an airport. Learn to read every group, what AUTO and AO2 mean, when a SPECI is issued, and where METARs fit a disciplined weather decision.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/metar",
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
    "METAR",
    "SPECI",
    "Aviation Routine Weather Report",
    "Surface weather observation",
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
      "name": "What does METAR stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aviation Routine Weather Report. It is the code form used in the U.S. for scheduled surface weather observations."
      }
    },
    {
      "@type": "Question",
      "name": "How often are METARs issued?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Routine METARs are made near the top of each hour, which is why they are often called hourly reports. SPECIs are added between them when criteria are met, and AWOS stations generate a METAR every 20 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between a METAR and a SPECI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A METAR is scheduled. A SPECI is an unscheduled report taken when Table 24-2 criteria are observed between hourly reports, and it contains every element of a METAR."
      }
    },
    {
      "@type": "Question",
      "name": "What does AUTO mean in a METAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The report is fully automated, with no human intervention or oversight. Augmented reports don't carry AUTO, and a corrected report shows COR in its place."
      }
    },
    {
      "@type": "Question",
      "name": "What do AO1 and AO2 mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both mark automated stations. AO2 stations have a precipitation discriminator; AO1 stations don't."
      }
    },
    {
      "@type": "Question",
      "name": "Is METAR wind true or magnetic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "True. METAR wind direction is coded relative to true north. ASOS broadcasts on local radio and telephone give magnetic direction."
      }
    },
    {
      "@type": "Question",
      "name": "Why does the ASOS broadcast differ from the METAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The broadcast is the ASOS one-minute observation, which can differ from the METAR you see online or on FIS-B."
      }
    },
    {
      "@type": "Question",
      "name": "Does AWOS issue SPECIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. AWOS generates a METAR every 20 minutes and does not report SPECIs. The exception is the FAA's AWOS-C, which is modified to report METAR and SPECI data like ASOS."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use METARs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Near departure, a fresh METAR (within about 90 minutes) can drive ceiling and visibility in the WX Score; otherwise PlaneWX uses the covering TAF or a labeled proxy station. METARs are also scanned for thunderstorms and used for density altitude. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
  "name": "METAR and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-airmet",
      "name": "AIRMET",
      "description": "An en route advisory for weather that may affect aircraft safety at intensities below SIGMET criteria, such as IFR conditions, mountain obscuration, moderate turbulence or icing, and strong surface winds.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-airmet",
      "alternateName": "Airmen\u2019s Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-alt",
      "name": "Altimeter group",
      "description": "Coded as A plus four digits in inches of mercury without the decimal point, so A2992 is an altimeter setting of 29.92 inHg.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-alt"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ao2",
      "name": "AO2",
      "description": "Remark for an automated station that has a precipitation discriminator, a sensor that can identify the type of precipitation. AO1 means the station has none.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ao2"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-asos",
      "name": "ASOS",
      "description": "The automated weather station network that is the nation\u2019s primary source of surface observations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-asos",
      "alternateName": "Automated Surface Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-auto",
      "name": "AUTO",
      "description": "Marks a METAR or SPECI produced entirely by automated equipment with no human observer checking it. Augmented reports leave it out.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-auto",
      "alternateName": "Automated report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-awc",
      "name": "AWC",
      "description": "The NWS center in Kansas City that issues national aviation forecasts such as AIRMETs, SIGMETs, and Convective SIGMETs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-awc",
      "alternateName": "Aviation Weather Center"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-awos",
      "name": "AWOS",
      "description": "An automated weather station similar to ASOS that generally reports fewer elements.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-awos",
      "alternateName": "Automated Weather Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ceiling",
      "name": "Ceiling",
      "description": "The lowest broken or overcast layer, or the vertical visibility into an obscuration. VV008, BKN008, and OVC008 all mean an 800 ft ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ceiling"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-clr",
      "name": "CLR",
      "description": "A METAR code from automated stations meaning no clouds detected below 12,000 feet; it is not used in TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-clr",
      "alternateName": "Clear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-dewpoint",
      "name": "Dewpoint",
      "description": "The temperature to which air must be cooled, at constant pressure and moisture content, to become saturated.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-dewpoint"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-g",
      "name": "G",
      "description": "Follows the mean wind speed and gives the peak gust, for example 16015G25KT is 15 knots gusting to 25.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-g",
      "alternateName": "Gust"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ifr",
      "name": "IFR",
      "description": "Ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ifr",
      "alternateName": "Instrument flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-lifr",
      "name": "LIFR",
      "description": "Ceiling below 500 feet and/or visibility below 1 mile.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-lifr",
      "alternateName": "Low IFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-mvfr",
      "name": "MVFR",
      "description": "Ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-mvfr",
      "alternateName": "Marginal VFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-rmk",
      "name": "RMK",
      "description": "Separates the body of a METAR from its remarks, which add detail such as the station type, storm information, and sea level pressure.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-rmk",
      "alternateName": "Remarks"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-rvr",
      "name": "RVR",
      "description": "An instrument-derived value for how far a pilot can see down the runway, reported in feet, for example R17L/2600FT.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-rvr",
      "alternateName": "Runway visual range"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-sigmet",
      "name": "SIGMET",
      "description": "An unscheduled warning of en route weather that may affect the safety of aircraft operations, such as severe icing, severe turbulence, widespread dust storms or sandstorms, and volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-sigmet",
      "alternateName": "Significant Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-slp",
      "name": "SLP",
      "description": "Remark giving the pressure reduced to sea level in tenths of a millibar with the leading 9 or 10 dropped, so SLP132 is 1013.2 mb.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-slp",
      "alternateName": "Sea level pressure"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-speci",
      "name": "SPECI",
      "description": "An unscheduled weather report issued between hourly METARs when conditions change significantly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-speci",
      "alternateName": "Aviation Selected Special Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-taf",
      "name": "TAF",
      "description": "A coded forecast of the weather expected within 5 statute miles of the center of an airport\u2019s runway complex for a set time period.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-taf",
      "alternateName": "Terminal Aerodrome Forecast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ts",
      "name": "TS",
      "description": "A local storm produced by a cumulonimbus cloud and always accompanied by lightning and thunder.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-ts",
      "alternateName": "Thunderstorm"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/metar#gl-vfr",
      "name": "VFR",
      "description": "Ceiling greater than 3,000 feet and visibility greater than 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/metar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/metar#gl-vfr",
      "alternateName": "Visual flight rules"
    }
  ]
} as const
