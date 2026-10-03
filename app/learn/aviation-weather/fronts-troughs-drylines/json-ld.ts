export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fronts, Troughs, and Drylines for Pilots: Air Masses and the Weather Map",
  "description": "How air masses form, what to expect before, during, and after a warm or cold front, what troughs and ridges are, how a wave cyclone develops, and why the dryline matters for spring storms.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines",
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
    "Fronts",
    "Air masses",
    "Troughs",
    "Dryline",
    "Wave cyclone",
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
      "name": "What is an air mass?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“An air mass is a large body of air with generally uniform temperature and humidity.” It is named for the temperature and moisture of its source region."
      }
    },
    {
      "@type": "Question",
      "name": "What is a front?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A front is a boundary or transition zone between two air masses.” Most weather occurs along the periphery of air masses at those boundaries."
      }
    },
    {
      "@type": "Question",
      "name": "How do you detect a front at the surface?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Significant temperature gradients (especially on the cold-air side), converging winds, and pressure that typically decreases as the front approaches and increases after it passes. Fronts also slope over the colder, denser air mass."
      }
    },
    {
      "@type": "Question",
      "name": "How fast do warm and cold fronts move?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Warm fronts move slowly, typically 10 to 25 mph.” “Cold fronts move more rapidly than warm fronts, progressing at a rate of 25 to 30 mph.” Extreme cold fronts have been recorded moving at speeds of up to 60 mph."
      }
    },
    {
      "@type": "Question",
      "name": "What is a wave cyclone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A wave cyclone is a low-pressure circulation that forms and moves along a front.” Wave cyclones are the primary weather producers in the mid-latitudes. “A wave cyclone should not be confused with the alternative name for a tornado. They are quite different.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is a trough versus a ridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A trough is “An elongated area of relatively low atmospheric pressure or height.” A ridge is “An elongated area of relatively high atmospheric pressure or height.”"
      }
    },
    {
      "@type": "Question",
      "name": "Why do troughs matter for turbulence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“CAT is found most frequently at, and just upwind of, the base of the trough, especially just downwind of an area of strong temperature advection.” “Wind shift areas associated with pressure troughs and ridges are frequently turbulent.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is a dryline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A dryline is a low-level boundary, hundreds of miles long, and separating moist and dry air masses.” In the United States it typically lies north-south across the southern and central High Plains in spring and early summer."
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
      "name": "Does PlaneWX tell me to GO or NO-GO when a front is nearby?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“PlaneWX never recommends GO or NO-GO. You make the call as PIC.” It can quote the Area Forecast Discussion for your airport’s office and analyze WPC discussions for convective language."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
  "name": "Fronts, troughs, and drylines glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-airmass",
      "name": "Air mass",
      "description": "A large body of air with generally uniform temperature and humidity, named for the region where it formed.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-airmass"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-coldfront",
      "name": "Cold front",
      "description": "A front where cold, dense air advances and replaces warmer air, lifting it abruptly along a steep slope.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-coldfront"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-dryline",
      "name": "Dryline",
      "description": "A low-level boundary, hundreds of miles long, separating moist air from dry air; a common trigger for severe storms on the High Plains.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-dryline"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-front",
      "name": "Front",
      "description": "A boundary or transition zone between two air masses, where most weather happens.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-front"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-frontallift",
      "name": "Frontal lift",
      "description": "Rising air at a front, where cold air wedges under warm air or warm air rides up over cold air.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-frontallift"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-isobar",
      "name": "Isobar",
      "description": "A line on a chart connecting points of equal pressure.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-isobar"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-lakeeffect",
      "name": "Lake effect",
      "description": "The way a large lake changes the weather near its shore and downwind, including bands of lake effect snow.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-lakeeffect"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-occfront",
      "name": "Occluded front",
      "description": "The front that forms when a faster cold front catches up to a warm front and the two merge.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-occfront"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-ridge",
      "name": "Ridge",
      "description": "An elongated area of relatively high atmospheric pressure or height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-ridge"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-statfront",
      "name": "Stationary front",
      "description": "A front that barely moves because the two air masses are about equally matched; it can affect local weather for days.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-statfront"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-trough",
      "name": "Trough",
      "description": "An elongated area of relatively low atmospheric pressure or height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-trough"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-warmfront",
      "name": "Warm front",
      "description": "A front where warm air advances and replaces colder air, usually slowly and with widespread layered cloud and precipitation.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-warmfront"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-wavecyclone",
      "name": "Wave cyclone",
      "description": "A low-pressure circulation that forms and moves along a front; the main weather producer in the mid-latitudes. Not a tornado.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fronts-troughs-drylines#gl-wavecyclone"
    }
  ]
} as const
