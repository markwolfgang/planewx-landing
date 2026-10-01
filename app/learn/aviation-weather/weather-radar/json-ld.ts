export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Weather Radar for Pilots: NEXRAD, TDWR, Reflectivity, and Datalink Delay",
  "description": "How to read NEXRAD and TDWR radar, what dBZ and composite reflectivity mean, where radar misses weather, and why cockpit radar mosaics are older than their time stamp.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/weather-radar",
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
    "Weather radar",
    "NEXRAD",
    "Terminal Doppler Weather Radar",
    "Datalink weather latency",
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
      "name": "What is NEXRAD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The WSR-88D Doppler weather radar network: 160 radars operated by the NWS, FAA, and Department of Defense. Its data feeds the radar images in apps and avionics."
      }
    },
    {
      "@type": "Question",
      "name": "How old is the radar picture in my cockpit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Older than it says. The age indicator shows the age of the mosaic, not of the weather. The FAA says to assume at least 7 to 8 minutes older than the time stamp, and the AIM says it may be 15 to 20 minutes older."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use datalink radar to pick a way through thunderstorms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The AIM says not to use datalinked NEXRAD mosaic imagery as the sole means of negotiating a path through a thunderstorm area, and to use it for route selection to avoid thunderstorms entirely."
      }
    },
    {
      "@type": "Question",
      "name": "What does dBZ mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the unit of radar reflectivity, the power returned by a target. Higher values generally mean heavier precipitation. About 15 dBZ marks light precipitation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between composite and base reflectivity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Base reflectivity is the lowest scan only. Composite reflectivity is the strongest return in the whole column, and it is what avionics NEXRAD mosaics use."
      }
    },
    {
      "@type": "Question",
      "name": "Does a clear radar mean clear weather?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. \"A clear radar display (no echoes) does not mean that there is no significant weather within the coverage of the radar site. Clouds and fog are not detected by the radar.\""
      }
    },
    {
      "@type": "Question",
      "name": "What is TDWR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Terminal Doppler Weather Radar, an FAA radar near major airports built mainly to detect hazardous wind shear. It updates about every 5 minutes in monitor mode and every minute in hazardous weather mode."
      }
    },
    {
      "@type": "Question",
      "name": "Can radar show turbulence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not directly. \"ATC radar is not able to detect turbulence.\" Turbulence generally increases with precipitation intensity, and it can be severe within 20 miles of thunderstorms."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use radar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The help center says PlaneWX samples NOAA's MRMS radar mosaic along your route for near-term flights, and radar can only reduce a model thunderstorm deduction, never add one or override a hard limit. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
  "name": "Weather radar and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-baseref",
      "name": "Base reflectivity",
      "description": "Radar returns from the lowest scan only, 0.5° above the horizon. It arrives sooner than composite but can miss heavier precipitation higher up.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-baseref"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-compref",
      "name": "Composite reflectivity",
      "description": "The strongest radar return found anywhere in the vertical column above each point. Avionics NEXRAD mosaics use it.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-compref"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-dbz",
      "name": "dBZ",
      "description": "The unit radar uses for reflectivity, the power returned from a target. Higher values generally mean heavier precipitation.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-dbz",
      "alternateName": "Decibels of reflectivity"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-echotops",
      "name": "Echo tops",
      "description": "An estimate of the top of the precipitation, from the height of the 18 dBZ radar echo above sea level. Cloud tops are higher.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-echotops"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-fisb",
      "name": "FIS-B",
      "description": "The free FAA broadcast of weather and aeronautical information to ADS-B In receivers over the 978 MHz UAT link.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-fisb",
      "alternateName": "Flight Information Service-Broadcast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-nexrad",
      "name": "NEXRAD",
      "description": "The network of 160 NWS, FAA, and military Doppler weather radars whose data feeds the radar images pilots see.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-nexrad",
      "alternateName": "Next Generation Weather Radar, the WSR-88D"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-mosaic",
      "name": "Radar mosaic",
      "description": "Many single-site radar images stitched into one regional or national picture. Its time stamp is the mosaic’s age, not the weather’s.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-mosaic"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-tdwr",
      "name": "TDWR",
      "description": "An FAA Doppler radar near major airports, built mainly to detect hazardous wind shear, that updates as often as once a minute in hazardous weather mode.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-radar#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-radar#gl-tdwr",
      "alternateName": "Terminal Doppler Weather Radar"
    }
  ]
} as const
