export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is a PIREP? How to Read and Give a Pilot Weather Report",
  "description": "A PIREP is a pilot weather report. Learn the UA and UUA format, how to decode each field, the official icing and turbulence intensity scales, and how to give a PIREP that helps.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/pirep",
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
    "PIREP",
    "Pilot Weather Report",
    "Turbulence reporting",
    "Icing reporting",
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
      "name": "What does PIREP stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilot Weather Report. The PIREP format is used only in the U.S.; the worldwide format is the AIREP."
      }
    },
    {
      "@type": "Question",
      "name": "What must every PIREP include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Message type, location, time, altitude or flight level, aircraft type, and at least one weather element."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between UA and UUA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UA is a routine PIREP. UUA is urgent, for tornadoes, funnel clouds, or waterspouts; severe or extreme turbulence, including clear air turbulence; severe icing; hail; low-level wind shear; volcanic ash; or other hazards."
      }
    },
    {
      "@type": "Question",
      "name": "Are PIREP altitudes MSL or AGL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MSL, unless noted otherwise. Visibility is in statute miles; other distances are nautical miles; time is UTC."
      }
    },
    {
      "@type": "Question",
      "name": "Is PIREP wind true or magnetic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Magnetic. PIREP wind direction is relative to magnetic north, unlike METAR wind, which is relative to true north."
      }
    },
    {
      "@type": "Question",
      "name": "Who do I give a PIREP to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ground facility you are talking to: Flight Service, a center, or terminal ATC. If you can't report by radio, report after landing to the nearest FSS or Weather Forecast Office."
      }
    },
    {
      "@type": "Question",
      "name": "Should I report smooth air or good weather?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The NTSB says PIREPs of null and light conditions, and of conditions as forecast, are as important as reports of hazardous weather, and the FAA order for flight service calls good-weather PIREPs valuable."
      }
    },
    {
      "@type": "Question",
      "name": "How is turbulence intensity defined?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By aircraft reaction, on the AIM scale of light, moderate, severe, and extreme, with duration as occasional (less than 1/3 of the time), intermittent (1/3 to 2/3), or continuous (more than 2/3)."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use PIREPs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It includes PIREPs from the last 2 hours within a route corridor and within 4,000 ft of your cruise altitude, normalizes turbulence reports for aircraft weight, and treats PIREPs as the only observed source of cloud tops in the Altitude Advisor. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
  "name": "PIREP and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-cat",
      "name": "CAT",
      "description": "High-level turbulence, normally above 15,000 feet, that is not associated with cumuliform clouds, including thunderstorms.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-cat",
      "alternateName": "Clear air turbulence"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-chop",
      "name": "Chop",
      "description": "Slight, rapid, somewhat rhythmic bumpiness without appreciable changes in altitude or attitude; reported as light or moderate chop.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-chop"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-clearice",
      "name": "Clear ice",
      "description": "Glossy, clear, or translucent ice formed when large supercooled water droplets freeze relatively slowly; also called glaze ice.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-clearice"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-gairmet",
      "name": "G-AIRMET",
      "description": "The graphical form of the AIRMET, issued by the Aviation Weather Center for the contiguous U.S. as snapshots 3 hours apart out to 12 hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-gairmet",
      "alternateName": "Graphical AIRMET"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-mixedice",
      "name": "Mixed ice",
      "description": "Ice showing rime and clear, or glaze, characteristics at the same time.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-mixedice"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-msl",
      "name": "MSL",
      "description": "The altitude reference used in PIREPs unless another is stated. METAR and TAF cloud heights are above ground level instead.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-msl",
      "alternateName": "Mean sea level"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-rime",
      "name": "Rime ice",
      "description": "Rough, milky, opaque ice formed when small supercooled water droplets freeze instantly on contact.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-rime"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-sigmet",
      "name": "SIGMET",
      "description": "An unscheduled warning of en route weather that may affect the safety of aircraft operations, such as severe icing, severe turbulence, widespread dust storms or sandstorms, and volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-sigmet",
      "alternateName": "Significant Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-taf",
      "name": "TAF",
      "description": "A coded forecast of the weather expected within 5 statute miles of the center of an airport\u2019s runway complex for a set time period.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-taf",
      "alternateName": "Terminal Aerodrome Forecast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-ua",
      "name": "UA",
      "description": "A pilot weather report that contains no urgent information.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-ua",
      "alternateName": "Routine PIREP"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-uua",
      "name": "UUA",
      "description": "A pilot weather report of a hazard such as a tornado, severe or extreme turbulence, severe icing, hail, low-level wind shear, or volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/pirep#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/pirep#gl-uua",
      "alternateName": "Urgent PIREP"
    }
  ]
} as const
