export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Weather Briefing Types: Standard, Abbreviated, Outlook, and Self-Briefing",
  "description": "The three FAA briefing types and when to get each, what a standard briefing contains and in what order, what “VFR flight not recommended” means, and how self-briefing fits in.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/weather-briefings",
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
    "Preflight weather briefing",
    "Flight Service",
    "14 CFR 91.103",
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
      "name": "What are the three types of weather briefings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard, abbreviated, and outlook. “Pilots should specify to the briefer the type of briefing they want, along with their appropriate background information.”"
      }
    },
    {
      "@type": "Question",
      "name": "When should I get an outlook briefing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“An outlook briefing may be requested when a planned departure is six or more hours away.” It is for planning, and a follow-up standard or abbreviated briefing before departure is advisable."
      }
    },
    {
      "@type": "Question",
      "name": "When should I get a standard briefing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you are planning a flight and haven’t had a previous briefing or preliminary information online. AC 91‑92 says to get it “as close to your departure time as possible.”"
      }
    },
    {
      "@type": "Question",
      "name": "When should I get an abbreviated briefing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To update an earlier briefing or get specific items. AC 91‑92: “Obtain an abbreviated briefing just before takeoff if your standard briefing is 1 hour or more old or if the weather is questionable.”"
      }
    },
    {
      "@type": "Question",
      "name": "What does “VFR flight not recommended” mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The briefer judges that VFR flight is doubtful. “This recommendation is advisory in nature. The final decision as to whether the flight can be conducted safely rests solely with the pilot.”"
      }
    },
    {
      "@type": "Question",
      "name": "Can I brief myself online instead of calling Flight Service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. “The FAA considers that a self-briefing may be compliant with current Federal aviation regulations.” The Handbook encourages a self-briefing even if you plan to call."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Flight Service phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For the CONUS, Hawaii, and Puerto Rico, 1-800-WX-BRIEF (1-800-992-7433). For Alaska, 1-833-AK-BRIEF (1-833-252-7433)."
      }
    },
    {
      "@type": "Question",
      "name": "Can a Flight Service briefer forecast the weather?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. “They are not authorized to make original forecasts”; they translate and interpret the available weather information for your route."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX meet 14 CFR 91.103?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The PlaneWX FAQ says it “provides weather information from federal regulatory agencies (NOAA, NWS, FAA) to help pilots meet the requirement to obtain all available information before a flight.” It adds: “There is no regulatory requirement to obtain a briefing from any specific source; FAA Advisory Circular 91-92 endorses pilot self-briefing.” You remain PIC and make the final decision."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
  "name": "Weather briefing glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-abbrbrief",
      "name": "Abbreviated briefing",
      "description": "A shortened briefing to update an earlier one or to supply only the items a pilot asks for.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-abbrbrief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-fss",
      "name": "FSS",
      "description": "The FAA flight service that provides preflight and in-flight briefings and flight plan filing to pilots.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-fss",
      "alternateName": "Flight Service Station"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-outlookbrief",
      "name": "Outlook briefing",
      "description": "A general planning briefing for a departure six or more hours away, to be followed by a standard briefing.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-outlookbrief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-selfbrief",
      "name": "Self-briefing",
      "description": "A preflight briefing a pilot builds from all available sources, including automation, without a briefer.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-selfbrief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-stdbrief",
      "name": "Standard briefing",
      "description": "The most complete and detailed preflight briefing, for a flight departing within about six hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-stdbrief"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-vnr",
      "name": "VNR",
      "description": "A briefer’s advisory that conditions make VFR flight questionable; the decision stays with the pilot.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/weather-briefings#gl-vnr",
      "alternateName": "VFR flight not recommended"
    }
  ]
} as const
