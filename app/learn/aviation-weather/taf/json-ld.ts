export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is a TAF? How to Read a Terminal Aerodrome Forecast",
  "description": "A TAF is a coded airport forecast. Learn to read wind, visibility, clouds, FM, TEMPO, and PROB30, and where the TAF fits in a disciplined weather decision.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/taf",
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
    "Terminal Aerodrome Forecast",
    "TAF",
    "NWS Instruction 10-813",
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
      "name": "What does TAF stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Terminal Aerodrome Forecast. It is a forecast for the area within 5 SM of the center of an airport's runway complex."
      }
    },
    {
      "@type": "Question",
      "name": "How often are TAFs issued?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scheduled TAFs are typically issued four times a day, every six hours, for 0000, 0600, 1200, and 1800 UTC. Forecasters amend them whenever amendment criteria are expected or have occurred. Some offices add routine amendments three hours after each issuance, and the FAA Core 30 airports get scheduled amendments every three hours."
      }
    },
    {
      "@type": "Question",
      "name": "How far ahead does a TAF forecast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ordinarily 24 hours. FAA-specified international airports get 30-hour TAFs, listed in Appendix F of NWS Instruction 10-813."
      }
    },
    {
      "@type": "Question",
      "name": "What area does a TAF cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The area within 5 statute miles of the center of the airport's runway complex. The ring from 5 to 10 SM is the vicinity, coded VC."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between a TAF and a METAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A METAR reports the surface weather observed at an airport; a TAF forecasts the conditions expected there. TAFs use the same weather codes found in METARs."
      }
    },
    {
      "@type": "Question",
      "name": "What does TEMPO mean in a TAF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Temporary fluctuations with a greater than 50% chance, each lasting one hour or less and together covering less than half the stated period. A TEMPO group never exceeds four hours."
      }
    },
    {
      "@type": "Question",
      "name": "What does PROB30 mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 30% chance of a thunderstorm or precipitation event, with its related wind, visibility, and sky conditions, during a period of six hours or less. It is the only PROB group NWS TAFs use."
      }
    },
    {
      "@type": "Question",
      "name": "Do U.S. TAFs use BECMG or PROB40?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NWS TAFs use neither. You may see BECMG in TAFs for some joint civil and military airports, and PROB40 in U.S. military and international TAFs."
      }
    },
    {
      "@type": "Question",
      "name": "Are TAF times local or Zulu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UTC. The issue time ends in a \"Z\" for Zulu."
      }
    },
    {
      "@type": "Question",
      "name": "What should I use if my airport has no TAF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Look at the nearest TAF sites with terrain in mind, read the forecaster's reasoning in the Aviation Forecast Discussion, and check model guidance such as LAMP, MOS, and NBM."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use the TAF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inside 12 hours of departure, a server-side pre-flight check runs against TAF data, including PROB30 and TEMPO periods. Beyond 12 hours, the WX Score leans on TAF, then MOS, then NBM, then model data. Airports without a TAF get a terrain-aware proxy TAF you can change. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
  "name": "TAF and aviation weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-intensity",
      "name": "- / +",
      "description": "A minus sign means light and a plus sign means heavy; no sign means moderate. In TAFs the sign refers to the precipitation, not the thunderstorm.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-intensity",
      "alternateName": "Light / heavy"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-afd",
      "name": "AFD",
      "description": "A plain-language text product in which NWS forecasters describe the weather for an area and explain what the TAF code cannot hold, such as the reasoning behind the forecast.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-afd",
      "alternateName": "Aviation Forecast Discussion"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-agl",
      "name": "AGL",
      "description": "Height above the airport surface. TAF cloud heights are in hundreds of feet AGL.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-agl",
      "alternateName": "Above ground level"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-amd",
      "name": "AMD",
      "description": "TAF AMD marks a TAF the forecaster changed before the next scheduled issuance. It replaces the previous TAF immediately.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-amd",
      "alternateName": "Amended TAF"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-amdnotsked",
      "name": "AMD NOT SKED",
      "description": "The TAF is valid, but the forecaster will not issue amendments, usually because observations are missing or incomplete.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-amdnotsked",
      "alternateName": "Amendment not scheduled"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-asos",
      "name": "ASOS",
      "description": "The automated weather station network that is the nation’s primary source of surface observations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-asos",
      "alternateName": "Automated Surface Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-awc",
      "name": "AWC",
      "description": "The NWS center in Kansas City that issues national aviation forecasts such as AIRMETs, SIGMETs, and Convective SIGMETs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-awc",
      "alternateName": "Aviation Weather Center"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-awos",
      "name": "AWOS",
      "description": "An automated weather station similar to ASOS that generally reports fewer elements.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-awos",
      "alternateName": "Automated Weather Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-becmg",
      "name": "BECMG",
      "description": "A gradual change expected sometime between the two stated times. NWS TAFs do not use it; some joint civil/military, military, and international TAFs do.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-becmg",
      "alternateName": "Becoming"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-bkn",
      "name": "BKN",
      "description": "Clouds covering 5 to 7 eighths of the sky; the lowest broken layer is the ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-bkn",
      "alternateName": "Broken"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-br",
      "name": "BR",
      "description": "Fog that restricts visibility to between 5/8 and 6 statute miles; below 5/8 SM it is coded FG.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-br",
      "alternateName": "Mist"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cavok",
      "name": "CAVOK",
      "description": "An international shorthand for good visibility, no low clouds, and no significant weather. NWS U.S. domestic TAFs do not use it.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cavok",
      "alternateName": "Ceiling and visibility OK"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cb",
      "name": "CB",
      "description": "Thunderstorm cloud. It is the only cloud type a TAF includes, added to the cloud layer whenever thunderstorms are forecast, even in the vicinity.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cb",
      "alternateName": "Cumulonimbus"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ceiling",
      "name": "Ceiling",
      "description": "The lowest broken or overcast layer, or the vertical visibility into an obscuration. VV008, BKN008, and OVC008 all mean an 800 ft ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ceiling"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-clr",
      "name": "CLR",
      "description": "A METAR code from automated stations meaning no clouds detected below 12,000 feet; it is not used in TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-clr",
      "alternateName": "Clear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cor",
      "name": "COR",
      "description": "TAF COR marks a TAF reissued to fix a mistake, such as a typo, an incorrect time, or a formatting error.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-cor",
      "alternateName": "Corrected TAF"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-faa",
      "name": "FAA",
      "description": "The U.S. agency that sets the requirements for aviation weather reports and forecasts.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-faa",
      "alternateName": "Federal Aviation Administration"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-few",
      "name": "FEW",
      "description": "Clouds covering more than 0 up to 2 eighths (oktas) of the sky.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-few",
      "alternateName": "Few"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-fg",
      "name": "FG",
      "description": "A visible aggregate of tiny water droplets based at the surface that reduces visibility to less than 5/8 statute mile.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-fg",
      "alternateName": "Fog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-fm",
      "name": "FM",
      "description": "Marks a rapid change to a new set of prevailing conditions starting at the stated day and time; everything before it is replaced.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-fm",
      "alternateName": "From"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-g",
      "name": "G",
      "description": "Follows the mean wind speed and gives the peak gust, for example 16015G25KT is 15 knots gusting to 25.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-g",
      "alternateName": "Gust"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-hz",
      "name": "HZ",
      "description": "Extremely small particles, invisible to the naked eye, suspended in the air in numbers large enough to give it an opalescent look and reduce visibility.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-hz",
      "alternateName": "Haze"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-icao",
      "name": "ICAO identifier",
      "description": "The four-letter airport code at the start of each TAF; U.S. mainland codes begin with K.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-icao",
      "alternateName": "ICAO location identifier"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ifr",
      "name": "IFR",
      "description": "Ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ifr",
      "alternateName": "Instrument flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-kt",
      "name": "KT",
      "description": "The wind speed unit used in TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-kt",
      "alternateName": "Knots"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-lamp",
      "name": "LAMP",
      "description": "NWS computer-generated statistical forecast guidance, updated hourly for over 2,000 locations, that refreshes MOS with the latest observations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-lamp",
      "alternateName": "Localized Aviation MOS Program"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-lifr",
      "name": "LIFR",
      "description": "Ceiling below 500 feet and/or visibility below 1 mile.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-lifr",
      "alternateName": "Low IFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-llws",
      "name": "LLWS",
      "description": "A change in wind speed or direction close to the ground; the TAF WS group covers non-convective wind shear from the surface up to 2,000 ft AGL.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-llws",
      "alternateName": "Low-level wind shear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-mos",
      "name": "MOS",
      "description": "A statistical technique that improves computer weather model forecasts by relating model output to observed weather; the NWS uses it to make point forecast guidance.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-mos",
      "alternateName": "Model Output Statistics"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-mvfr",
      "name": "MVFR",
      "description": "Ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-mvfr",
      "alternateName": "Marginal VFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nbm",
      "name": "NBM",
      "description": "NWS forecast guidance built by blending many NWS and non-NWS computer models into one calibrated set of forecasts.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nbm",
      "alternateName": "National Blend of Models"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nil",
      "name": "NIL TAF",
      "description": "A TAF that is not issued, used only as a last resort when observations have been missing for an extended period and a forecast cannot be built.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nil"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nsw",
      "name": "NSW",
      "description": "Used in a TEMPO group to show that significant weather is expected to end.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nsw",
      "alternateName": "No significant weather"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nws",
      "name": "NWS",
      "description": "The U.S. government weather agency that issues weather data, forecasts, and warnings, including TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-nws",
      "alternateName": "National Weather Service"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ovc",
      "name": "OVC",
      "description": "Clouds covering the whole sky (8 oktas); an overcast layer below any broken layer is the ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ovc",
      "alternateName": "Overcast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-p6sm",
      "name": "P6SM",
      "description": "Visibility forecast to be greater than 6 statute miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-p6sm",
      "alternateName": "Plus 6 statute miles"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-prob30",
      "name": "PROB30",
      "description": "A 30% chance of a thunderstorm or precipitation event, with its related wind, visibility, and clouds, during a period of six hours or less. It is the only PROB group in NWS TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-prob30",
      "alternateName": "30 percent probability group"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-prob40",
      "name": "PROB40",
      "description": "A 40% chance group that NWS TAFs do not use, but U.S. military and international TAFs may.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-prob40",
      "alternateName": "40 percent probability group"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-sct",
      "name": "SCT",
      "description": "Clouds covering 3 to 4 eighths (oktas) of the sky.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-sct",
      "alternateName": "Scattered"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-shra",
      "name": "SHRA",
      "description": "Showery rain, coded as the SH (shower) descriptor plus RA (rain); -SHRA is light and +SHRA is heavy.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-shra",
      "alternateName": "Rain showers"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-skc",
      "name": "SKC",
      "description": "No clouds forecast (0 oktas). TAFs use SKC; the METAR code CLR is not used in TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-skc",
      "alternateName": "Sky clear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-sm",
      "name": "SM",
      "description": "Visibility unit in U.S. TAFs.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-sm",
      "alternateName": "Statute miles"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-speci",
      "name": "SPECI",
      "description": "An unscheduled weather report issued between hourly METARs when conditions change significantly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-speci",
      "alternateName": "Aviation Selected Special Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-taf",
      "name": "TAF",
      "description": "A coded forecast of the weather expected within 5 statute miles of the center of an airport’s runway complex for a set time period.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-taf",
      "alternateName": "Terminal Aerodrome Forecast"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-tempo",
      "name": "TEMPO",
      "description": "Temporary fluctuations with a better than 50% chance, each lasting one hour or less and covering less than half of the stated period; a TEMPO group never exceeds four hours.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-tempo",
      "alternateName": "Temporarily"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ts",
      "name": "TS",
      "description": "A local storm produced by a cumulonimbus cloud and always accompanied by lightning and thunder.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ts",
      "alternateName": "Thunderstorm"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-tsra",
      "name": "TSRA",
      "description": "A thunderstorm with moderate rain (add - for light or + for heavy rain).",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-tsra",
      "alternateName": "Thunderstorm with rain"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-utc",
      "name": "UTC",
      "description": "The time standard used for all TAF times, shown with a Z.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-utc",
      "alternateName": "Coordinated Universal Time"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vc",
      "name": "VC",
      "description": "In U.S. TAFs, the ring between 5 and 10 statute miles from the center of the runway complex; used only as VCFG, VCSH, or VCTS.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vc",
      "alternateName": "Vicinity"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vfr",
      "name": "VFR",
      "description": "Ceiling greater than 3,000 feet and visibility greater than 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vfr",
      "alternateName": "Visual flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vrb",
      "name": "VRB",
      "description": "Used when no single wind direction can be forecast, typically very light winds (1 to 6 knots) or near thunderstorms.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vrb",
      "alternateName": "Variable wind direction"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vv",
      "name": "VV",
      "description": "How far up you can see into a surface-based obscuration such as fog, in hundreds of feet; it counts as the ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-vv",
      "alternateName": "Vertical visibility"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-wfo",
      "name": "WFO",
      "description": "One of 122 local NWS offices; WFOs write the TAFs for their area.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-wfo",
      "alternateName": "Weather Forecast Office"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ws",
      "name": "WS",
      "description": "Low-level wind shear (not from thunderstorms) from the surface up to the stated height, with the wind at the top of that layer, for example WS020/27055KT.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-ws",
      "alternateName": "Non-convective low-level wind shear group"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/taf#gl-z",
      "name": "Z",
      "description": "Letter added to TAF times to show they are in Coordinated Universal Time, not local time.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/taf#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/taf#gl-z",
      "alternateName": "Zulu, UTC"
    }
  ]
} as const
