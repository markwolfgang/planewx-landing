export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Turbulence Forecasts: GTG, GTG-N, and the Intensity Scale",
  "description": "How the GTG turbulence forecast and GTG-N nowcast work, what EDR means, the official light to extreme intensity scale, and which turbulence GTG does not forecast.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/turbulence",
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
    "Turbulence",
    "Graphical Turbulence Guidance",
    "Eddy dissipation rate",
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
      "name": "What is GTG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Graphical Turbulence Guidance, the NWS automated turbulence forecast. It blends more than 10 turbulence algorithms, weighted by how well each matches PIREPs and automated aircraft reports, with no forecaster changes."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between GTG and GTG-N?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GTG is a forecast, issued every hour out to 18 hours. GTG-N is a nowcast of current turbulence over the contiguous U.S., updated every 15 minutes by blending the latest one-hour GTG forecast with recent turbulence observations."
      }
    },
    {
      "@type": "Question",
      "name": "Does GTG forecast thunderstorm turbulence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. \"GTG does not specifically predict turbulence associated with convective clouds or small-scale local terrain features, but it does predict turbulence associated with upper-level clear and mountain wave sources.\""
      }
    },
    {
      "@type": "Question",
      "name": "What is EDR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eddy dissipation rate. \"EDR is the ICAO standard dimension for automated turbulence reporting.\" It measures the atmosphere, not the aircraft, so it does not depend on aircraft type."
      }
    },
    {
      "@type": "Question",
      "name": "Which GTG weight class should a light airplane use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Light, under 15,500 lb. GTG forecasts are scaled to three ICAO weight classes: light below 15,500 lb, heavy above 300,000 lb, and medium in between."
      }
    },
    {
      "@type": "Question",
      "name": "Can ATC see turbulence on radar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. \"ATC radar is not able to detect turbulence.\" Turbulence generally increases with precipitation intensity, and it should be expected near convective activity, even in clear air."
      }
    },
    {
      "@type": "Question",
      "name": "How far should I stay from thunderstorms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AIM says operation within 20 miles of thunderstorms should be approached with great caution, and to avoid by at least 20 miles any thunderstorm identified as severe or giving an intense radar echo."
      }
    },
    {
      "@type": "Question",
      "name": "What is the official turbulence intensity scale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Light, moderate, severe, and extreme, defined by aircraft reaction, with duration reported as occasional, intermittent, or continuous. The full table is in the PIREP guide."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use GTG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The help center says PlaneWX uses the GTG-N nowcast for imminent departures and the DAFS GTG forecast out to 18 hours, adds model wind shear analysis, and normalizes turbulence PIREPs by aircraft weight. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
  "name": "Turbulence and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-tango",
      "name": "AIRMET Tango",
      "description": "The AIRMET series for moderate turbulence, strong sustained surface winds, and non-convective low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-tango"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-amdar",
      "name": "AMDAR",
      "description": "The system that sends automated weather and turbulence reports from commercial aircraft sensors to the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-amdar",
      "alternateName": "Aircraft Meteorological Data Relay"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-cat",
      "name": "CAT",
      "description": "High-level turbulence, normally above 15,000 feet, that is not associated with cumuliform clouds, including thunderstorms.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-cat",
      "alternateName": "Clear air turbulence"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-csigmet",
      "name": "Convective SIGMET",
      "description": "The SIGMET issued for thunderstorms over the contiguous U.S. It implies severe or greater turbulence, severe icing, and low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-csigmet"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-cwa",
      "name": "CWA",
      "description": "A short-term advisory from a Center Weather Service Unit for weather that meets or approaches AIRMET or SIGMET criteria, valid for up to 2 hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-cwa",
      "alternateName": "Center Weather Advisory"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-edr",
      "name": "EDR",
      "description": "The ICAO standard measure for automated turbulence reports. It describes the atmosphere rather than one aircraft, so it does not depend on aircraft type.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-edr",
      "alternateName": "Eddy dissipation rate"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-gtg",
      "name": "GTG",
      "description": "The NWS automated turbulence forecast for clear air and mountain wave turbulence, issued hourly out to 18 hours and scaled to aircraft weight class.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-gtg",
      "alternateName": "Graphical Turbulence Guidance"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-gtgn",
      "name": "GTG-N",
      "description": "A near real-time turbulence nowcast for the contiguous U.S., updated every 15 minutes by blending the latest GTG forecast with recent turbulence observations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-gtgn",
      "alternateName": "Graphical Turbulence Guidance Nowcast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-nexrad",
      "name": "NEXRAD",
      "description": "The network of 160 NWS, FAA, and military Doppler weather radars whose data feeds the radar images pilots see.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-nexrad",
      "alternateName": "Next Generation Weather Radar, the WSR-88D"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-sigmet",
      "name": "SIGMET",
      "description": "An unscheduled warning of en route weather that may affect the safety of aircraft operations, such as severe icing, severe turbulence, widespread dust storms or sandstorms, and volcanic ash.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/turbulence#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/turbulence#gl-sigmet",
      "alternateName": "Significant Meteorological Information"
    }
  ]
} as const
