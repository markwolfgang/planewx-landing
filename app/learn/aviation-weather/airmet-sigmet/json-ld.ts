export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "AIRMET, SIGMET, and CWA: In-Flight Weather Advisories Explained",
  "description": "How to read AIRMETs, G-AIRMETs, SIGMETs, Convective SIGMETs, and Center Weather Advisories: criteria, valid times, decoded Handbook examples, and where advisories fit a disciplined weather decision.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet",
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
    "AIRMET",
    "G-AIRMET",
    "SIGMET",
    "Convective SIGMET",
    "Center Weather Advisory",
    "NWS Instruction 10-811",
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
      "name": "What's the difference between an AIRMET and a SIGMET?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Intensity. A SIGMET covers hazards such as severe turbulence, severe icing, widespread dust storms or sandstorms, and volcanic ash. An AIRMET covers weather that may affect safety at intensities that do not meet SIGMET criteria, such as moderate turbulence, moderate icing, IFR conditions, and mountain obscuration."
      }
    },
    {
      "@type": "Question",
      "name": "What is a G-AIRMET?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The graphical AIRMET, issued by the Aviation Weather Center for the CONUS for the same criteria as AIRMETs. It is valid at snapshots 3 hours apart out to 12 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Is there still a text AIRMET for the lower 48?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The September 2, 2025 revision of NWS Instruction 10-811 lists \"Removed CONUS AIRMET\" among its changes, and its CONUS schedule covers only G-AIRMETs. Alaska and Hawaii still get text AIRMETs."
      }
    },
    {
      "@type": "Question",
      "name": "How long is a SIGMET valid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Up to four hours in the CONUS. Outside the CONUS, SIGMETs for volcanic ash and tropical cyclones can run up to six hours."
      }
    },
    {
      "@type": "Question",
      "name": "How often are Convective SIGMETs issued?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hourly at 55 minutes past the hour for each of three regions, East, Central, and West. Each is valid for two hours or until superseded, and a region with nothing to report gets \"CONVECTIVE SIGMET...NONE\"."
      }
    },
    {
      "@type": "Question",
      "name": "What does a Convective SIGMET imply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Severe or greater turbulence, severe icing, and low-level wind shear, even if the text doesn't say so."
      }
    },
    {
      "@type": "Question",
      "name": "What are AIRMET Sierra, Tango, and Zulu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sierra covers IFR and mountain obscuration, Tango covers moderate turbulence, strong surface winds, and low-level wind shear, and Zulu covers moderate icing and freezing levels."
      }
    },
    {
      "@type": "Question",
      "name": "What is a CWA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Center Weather Advisory, issued by the Center Weather Service Unit at an air route traffic control center for weather that meets or approaches advisory criteria. It is valid for up to two hours and, because of its short lead time, is not a flight planning product."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use AIRMETs and SIGMETs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Advisories that intersect your route corridor and cruise altitude appear in the briefing. Active SIGMETs and Convective SIGMETs along the route reduce the WX Score, and an on-route IFR G-AIRMET is a hard stop for a VFR trip, with a narrow arrival exception. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
  "name": "AIRMET, SIGMET, and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-airmet",
      "name": "AIRMET",
      "description": "An en route advisory for weather that may affect aircraft safety at intensities below SIGMET criteria, such as IFR conditions, mountain obscuration, moderate turbulence or icing, and strong surface winds.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-airmet",
      "alternateName": "Airmen’s Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-sierra",
      "name": "AIRMET Sierra",
      "description": "The AIRMET series for IFR conditions and extensive mountain obscuration.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-sierra"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-tango",
      "name": "AIRMET Tango",
      "description": "The AIRMET series for moderate turbulence, strong sustained surface winds, and non-convective low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-tango"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-zulu",
      "name": "AIRMET Zulu",
      "description": "The AIRMET series for moderate icing; it also gives freezing level heights.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-zulu"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-awc",
      "name": "AWC",
      "description": "The NWS center in Kansas City that issues national aviation forecasts such as AIRMETs, SIGMETs, and Convective SIGMETs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-awc",
      "alternateName": "Aviation Weather Center"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-csigmet",
      "name": "Convective SIGMET",
      "description": "The SIGMET issued for thunderstorms over the contiguous U.S. It implies severe or greater turbulence, severe icing, and low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-csigmet"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-cwa",
      "name": "CWA",
      "description": "A short-term advisory from a Center Weather Service Unit for weather that meets or approaches AIRMET or SIGMET criteria, valid for up to 2 hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-cwa",
      "alternateName": "Center Weather Advisory"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-cwsu",
      "name": "CWSU",
      "description": "A unit of NWS meteorologists stationed at an FAA air route traffic control center; it issues CWAs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-cwsu",
      "alternateName": "Center Weather Service Unit"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-gairmet",
      "name": "G-AIRMET",
      "description": "The graphical form of the AIRMET, issued by the Aviation Weather Center for the contiguous U.S. as snapshots 3 hours apart out to 12 hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-gairmet",
      "alternateName": "Graphical AIRMET"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-ifr",
      "name": "IFR",
      "description": "Ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-ifr",
      "alternateName": "Instrument flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-mwo",
      "name": "MWO",
      "description": "An office that issues SIGMETs and AIRMETs. The U.S. has three: the Aviation Weather Center, the Alaska Aviation Weather Unit, and WFO Honolulu.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-mwo",
      "alternateName": "Meteorological Watch Office"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-sigmet",
      "name": "SIGMET",
      "description": "An unscheduled warning of en route weather that may affect the safety of aircraft operations, such as severe icing, severe turbulence, widespread dust storms or sandstorms, and volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-sigmet",
      "alternateName": "Significant Meteorological Information"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-taf",
      "name": "TAF",
      "description": "A coded forecast of the weather expected within 5 statute miles of the center of an airport’s runway complex for a set time period.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/airmet-sigmet#gl-taf",
      "alternateName": "Terminal Aerodrome Forecast"
    }
  ]
} as const
