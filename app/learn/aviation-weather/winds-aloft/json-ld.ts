export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Winds and Temperatures Aloft: How to Read an FB Forecast",
  "description": "How to decode the FB winds and temperatures aloft forecast, including winds over 100 knots and missing low levels, with a worked decode of the FAA Handbook sample.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/winds-aloft",
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
    "Winds and temperatures aloft forecast",
    "FB winds",
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
      "name": "What does FB stand for in FB winds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FB is the data type designator in the bulletin heading, for example FBUS31 KWNO for the contiguous U.S. 6-hour forecast. The Handbook notes the forecasts were long known as FD winds before they became FB winds."
      }
    },
    {
      "@type": "Question",
      "name": "Are winds aloft true or magnetic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "True. FB wind direction is given in tens of degrees with reference to true north. PIREP winds, by contrast, are magnetic (PIREP guide)."
      }
    },
    {
      "@type": "Question",
      "name": "How do you decode a winds aloft group over 100 knots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the first two digits are more than 36, subtract 50 from them for the direction and add 100 to the speed. 7545 is 250° at 145 knots, and 7799 means 199 knots or more."
      }
    },
    {
      "@type": "Question",
      "name": "Why is the 3,000 ft level sometimes blank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wind is not forecast within 1,500 ft of the station elevation, and temperature is not forecast within 2,500 ft. At high stations the first few columns stay empty."
      }
    },
    {
      "@type": "Question",
      "name": "How often are FB winds issued?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Four times a day, by the NWS National Centers for Environmental Prediction. Amendments are not issued."
      }
    },
    {
      "@type": "Question",
      "name": "What if the new FB forecast is late?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NWS Instruction 10-812 says to keep using the valid forecast based on data 6 hours earlier until the new one arrives."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get the freezing level from winds aloft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An approximate one. The FAA icing guide says \"Winds aloft forecasts also provide information to determine the approximate freezing level.\" Look for where the temperatures change sign between levels. See the icing guide for the freezing level products."
      }
    },
    {
      "@type": "Question",
      "name": "Are model winds better than FB winds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They are more frequent and more detailed. The Handbook compares FB winds, updated four times a day at stations 100 to 150 miles apart, with Rapid Refresh model winds updated every hour on a grid as fine as 9 statute miles. Different models still disagree with each other."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX use FB winds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For the Winds Aloft card, PlaneWX uses model-derived winds sampled along your route and averaged across models. The Altitude Advisor, a PlaneWX Labs feature, samples FB bulletins from stations along the route. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
  "name": "Winds aloft and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-fb",
      "name": "FB winds",
      "description": "The NWS coded text forecast of wind direction, wind speed, and temperature at set altitudes for listed locations, issued four times a day.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-fb",
      "alternateName": "Wind and Temperature Aloft Forecast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-fisb",
      "name": "FIS-B",
      "description": "The free FAA broadcast of weather and aeronautical information to ADS-B In receivers over the 978 MHz UAT link.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-fisb",
      "alternateName": "Flight Information Service-Broadcast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-frzlvl",
      "name": "Freezing level",
      "description": "The lowest altitude over a place where the air temperature reaches 0°C. There can be more than one.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-frzlvl"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-kt",
      "name": "KT",
      "description": "The wind speed unit used in TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-kt",
      "alternateName": "Knots"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-msl",
      "name": "MSL",
      "description": "The altitude reference used in PIREPs unless another is stated. METAR and TAF cloud heights are above ground level instead.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-msl",
      "alternateName": "Mean sea level"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-nwp",
      "name": "NWP",
      "description": "Computer weather models. Each one forecasts wind, temperature, and other elements on its own grid and schedule, so their answers differ.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-nwp",
      "alternateName": "Numerical weather prediction"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-utc",
      "name": "UTC",
      "description": "The time standard used for all TAF times, shown with a Z.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/winds-aloft#gl-utc",
      "alternateName": "Coordinated Universal Time"
    }
  ]
} as const
