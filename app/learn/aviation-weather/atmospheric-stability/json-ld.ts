export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Atmospheric Stability for Pilots: Lapse Rates, Inversions, and Convection",
  "description": "What absolute, conditional, and neutral stability mean, how lapse rates and lifting shape clouds and turbulence, what inversions do, and how LI and CAPE show up in convective planning.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability",
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
    "Atmospheric stability",
    "Lapse rates",
    "Inversions",
    "CAPE",
    "Lifted Index",
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
      "name": "What is atmospheric stability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Atmospheric stability is the property of the ambient air that either enhances or suppresses vertical motion of air parcels and determines which type of clouds and precipitation a pilot will encounter.”"
      }
    },
    {
      "@type": "Question",
      "name": "How do you evaluate stability with a parcel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lift a parcel from a chosen altitude and compare its temperature to the surrounding air. Colder than the environment means it sinks back (stable); warmer means it keeps rising (unstable); equal means neutral."
      }
    },
    {
      "@type": "Question",
      "name": "What are the four stability types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolute stability, neutral stability, absolute instability, and conditional instability, classified by how the column’s lapse rate compares to the dry and moist adiabatic rates."
      }
    },
    {
      "@type": "Question",
      "name": "What are the dry and moist adiabatic lapse rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An unsaturated rising parcel cools at the dry adiabatic lapse rate, about 3 degrees C per 1,000 ft. After saturation, cooling follows the moist adiabatic lapse rate; Handbook examples use 2 degrees C per 1,000 ft."
      }
    },
    {
      "@type": "Question",
      "name": "What is an inversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A temperature inversion, or simply inversion, is a layer in which the temperature increases with altitude.” “The principal characteristic of an inversion layer is its marked stability, so that very little turbulence can occur within it.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is the Lifted Index?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LI is the temperature difference between a lifted parcel and the environment at a pressure level (often 500 mb). “A positive value indicates a stable column of air (at the respective pressure), a negative value indicates an unstable column of air, and a value of zero indicates a neutrally stable column of air.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is CAPE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“CAPE is the maximum amount of energy available to an ascending air parcel for convection.” Units are J/kg. “Any value greater than 0 J/kg indicates instability and the possibility of thunderstorms.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is the LFC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The LFC is the level at which a parcel of saturated air becomes warmer than the surrounding air and begins to rise freely.” It is a defining feature of conditional instability."
      }
    },
    {
      "@type": "Question",
      "name": "What is popcorn convection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Popcorn convection is a term often used for showers and thunderstorms that form on a scattered basis with little or no apparent organization, usually during the afternoon in response to diurnal heating.” Individual cells are small, short-lived, and rarely severe."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX tell me to GO or NO-GO based on CAPE or LI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“PlaneWX never recommends GO or NO-GO. You make the call as PIC.” It extracts CAPE, Lifted Index, and related indices from model soundings for the WX Score."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
  "name": "Atmospheric stability glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-absinstab",
      "name": "Absolute instability",
      "description": "A column with a superadiabatic lapse rate greater than the dry adiabatic rate, so a displaced parcel accelerates in the direction of the displacement.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-absinstab"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-absstability",
      "name": "Absolute stability",
      "description": "A column whose temperature lapse rate is less than the moist adiabatic lapse rate, so a lifted parcel stays colder than its surroundings and sinks back.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-absstability"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-parcel",
      "name": "Air parcel",
      "description": "A sample of air treated as a unit when comparing its temperature to the surrounding air to judge whether it will rise, sink, or stay put.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-parcel"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-atmstability",
      "name": "Atmospheric stability",
      "description": "The property of the ambient air that either enhances or suppresses vertical motion of air parcels, which decides whether clouds are convective or stratiform.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-atmstability"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-condinstab",
      "name": "Conditional instability",
      "description": "An unsaturated column whose lapse rate sits between the dry and moist adiabatic rates; a parcel is stable until lifted past its LCL to the LFC.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-condinstab"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-cape",
      "name": "Convective Available Potential Energy",
      "description": "The maximum energy available to an ascending air parcel for convection, in joules per kilogram.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-cape",
      "alternateName": "CAPE"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-dryadiabatic",
      "name": "Dry adiabatic lapse rate",
      "description": "The rate at which an unsaturated rising air parcel cools: about 3 degrees C per 1,000 ft in the Aviation Weather Handbook.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-dryadiabatic"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-lfc",
      "name": "Level of Free Convection",
      "description": "The level where a saturated parcel becomes warmer than the surrounding air and begins to rise freely.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-lfc",
      "alternateName": "LFC"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-lcl",
      "name": "Lifted Condensation Level",
      "description": "The level where a moist air parcel lifted dry adiabatically becomes saturated.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-lcl",
      "alternateName": "LCL"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-liftedindex",
      "name": "Lifted Index",
      "description": "The temperature difference between a lifted air parcel and the environment at a given pressure (often 500 mb); positive means stable, negative means unstable.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-liftedindex",
      "alternateName": "LI"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-moistadiabatic",
      "name": "Moist adiabatic lapse rate",
      "description": "The rate at which a saturated rising air parcel cools; Handbook examples use 2 degrees C per 1,000 ft.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-moistadiabatic"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-neutstability",
      "name": "Neutral stability",
      "description": "A column where a displaced parcel always matches the surrounding temperature, so it neither accelerates up nor down.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-neutstability"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-inversion",
      "name": "Temperature inversion",
      "description": "A layer where temperature increases with altitude; marked stability, with little turbulence inside the layer.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/atmospheric-stability#gl-inversion"
    }
  ]
} as const
