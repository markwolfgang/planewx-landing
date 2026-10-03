export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Surface Analysis and Prog Charts for Pilots: Reading the Weather Map",
  "description": "How to read the surface analysis chart and short-range surface prog charts: fronts, highs and lows, troughs, drylines, precip symbols, issuance times, and how they fit a briefing.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts",
  "dateModified": "2026-10-03",
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
    "Surface analysis chart",
    "Prog charts",
    "Station plot",
    "Fronts",
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
      "name": "What is a surface analysis chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A surface chart (also called surface map or sea level pressure chart) is an analyzed chart of surface weather observations.” It shows sea level pressure with isobars, plus highs, lows, ridges, troughs, fronts, and boundaries such as drylines."
      }
    },
    {
      "@type": "Question",
      "name": "How often is the surface analysis chart issued?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The WPC issues surface analysis charts for North America eight times daily, valid at 00, 03, 06, 09, 12, 15, 18, and 21 UTC.”"
      }
    },
    {
      "@type": "Question",
      "name": "What do the front symbols mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The symbols on the front indicate the type of front and point in the direction toward which the front is moving.” Two short lines across a front mark a change in front type. Feature weather (warm/cold/stationary/occluded, troughs, drylines) is covered on the fronts, troughs, and drylines page."
      }
    },
    {
      "@type": "Question",
      "name": "What is a station plot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plotted surface observations on the chart are called station models. They summarize temperature, dewpoint, wind, weather, pressure, sky cover, and related elements at that station."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Unified Surface Analysis Chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The NWS Unified Surface Analysis Chart is a surface analysis product produced collectively and collaboratively by the NWS WPC, the OPC, the NHC, and WFO Honolulu.” “The Unified Surface Analysis Chart is issued four times daily for valid times 00, 06, 12, and 18 UTC.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is a short-range surface prog chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The NWS WPC provides Short-Range Surface Prog Charts (see Figure 27-24) of surface pressure systems, fronts, and precipitation for a multiday period.” “Each chart depicts a ‘snapshot’ of weather elements expected at the specified valid time.”"
      }
    },
    {
      "@type": "Question",
      "name": "What precipitation does the prog chart show?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NDFD rain, snow, mix, ice, and thunderstorm areas as chance (25 to less than 55 percent) or likely (55 percent or greater) of measurable precipitation (or thunderstorms) at the valid time."
      }
    },
    {
      "@type": "Question",
      "name": "What else is on the prog chart besides precip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pressure centers, troughs, isobars, drylines, tropical waves, tropical storms, and hurricanes; fronts; and squall lines, using standard symbols."
      }
    },
    {
      "@type": "Question",
      "name": "How should pilots use analysis and prog together?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the surface analysis for the current analyzed pattern (where the fronts and pressure systems are now). Use the short-range surface prog for forecast snapshots at selected valid times over a multiday period. Pair both with the TAF, Area Forecast Discussion, and radar, not as a standalone go/no-go."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX tell me to GO or NO-GO from a prog chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“PlaneWX never recommends GO or NO-GO. You make the call as PIC.” Briefings can quote the Area Forecast Discussion and analyze WPC discussions for convective language; Visual mode can show live NOAA/AWC forecast charts."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
  "name": "Surface analysis and prog charts glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-dryline",
      "name": "Dryline",
      "description": "A low-level boundary, hundreds of miles long, separating moist air from dry air; a common trigger for severe storms on the High Plains.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-dryline"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-front",
      "name": "Front",
      "description": "A boundary or transition zone between two air masses, where most weather happens.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-front"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-isobar",
      "name": "Isobar",
      "description": "A line on a chart connecting points of equal pressure.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-isobar"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-ridge",
      "name": "Ridge",
      "description": "An elongated area of relatively high atmospheric pressure or height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-ridge"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-progchart",
      "name": "Short-range surface prog chart",
      "description": "A WPC forecast chart of surface pressure systems, fronts, and precipitation for selected valid times over a multiday period.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-progchart"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-stationplot",
      "name": "Station plot",
      "description": "A plotted surface observation on the analysis chart showing temperature, dewpoint, wind, weather, pressure, sky cover, and related elements at that station.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-stationplot"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-surfacechart",
      "name": "Surface analysis chart",
      "description": "An analyzed chart of surface weather observations showing sea level pressure with isobars, plus highs, lows, ridges, troughs, fronts, and boundaries such as drylines.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-surfacechart"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-trough",
      "name": "Trough",
      "description": "An elongated area of relatively low atmospheric pressure or height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/surface-analysis-prog-charts#gl-trough"
    }
  ]
} as const
