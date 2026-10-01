export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ceiling, Visibility, and Flight Categories: VFR, MVFR, IFR, and LIFR",
  "description": "What legally counts as a ceiling, how prevailing visibility is measured, the four flight categories, and why a green VFR dot is not the same as the 14 CFR 91.155 VFR minimums.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility",
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
    "Ceiling",
    "Visibility",
    "Flight categories",
    "VFR weather minimums",
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
      "name": "What counts as a ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The lowest layer reported as broken or overcast, or the vertical visibility into a surface-based obscuration. The Pilot/Controller Glossary defines it as “The heights above the earth’s surface of the lowest layer of clouds or obscuring phenomena that is reported as ‘broken,’ ‘overcast,’ or ‘obscuration,’ and not classified as ‘thin’ or ‘partial.’”"
      }
    },
    {
      "@type": "Question",
      "name": "Is a scattered layer a ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Only broken, overcast, or an obscuration counts. A scattered layer can still block your path, so read every layer."
      }
    },
    {
      "@type": "Question",
      "name": "Are ceilings above ground level or sea level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Above ground. The AIM: “(‘Ceiling’ heights are always above ground level.)” Cloud heights in an area forecast can be MSL, and pilot reports are usually MSL."
      }
    },
    {
      "@type": "Question",
      "name": "What is prevailing visibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Prevailing visibility is the greatest visibility equaled or exceeded throughout at least one half of the horizon circle, not necessarily contiguous.” The rest of the circle can be worse."
      }
    },
    {
      "@type": "Question",
      "name": "What are the ceiling and visibility limits for MVFR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles, inclusive. The Handbook notes “there are no 14 CFR part 91 MVFR weather minimums”."
      }
    },
    {
      "@type": "Question",
      "name": "Is a VFR flight category the same as VFR weather minimums?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Handbook says the VFR category “is not to be confused with the basic VFR weather minimums given in 14 CFR § 91.155. Weather Flight Categories are only intended for situational awareness.”"
      }
    },
    {
      "@type": "Question",
      "name": "What does M1/4SM mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“U.S. automated stations use an M to indicate ‘less than.’” M1/4SM is less than a quarter mile."
      }
    },
    {
      "@type": "Question",
      "name": "Why does CLR not mean the sky is clear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“CLR is used by automated stations to indicate no layers are detected at or below 12,000 ft.” There can be clouds above that."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX use my ceiling and visibility minimums?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its help center says a forecast ceiling or visibility below your hard limit at departure or arrival is a deduction of up to 40 points each, and within 500 ft or 1 SM of a limit is a smaller caution. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
  "name": "Ceiling, visibility, and flight category glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-sierra",
      "name": "AIRMET Sierra",
      "description": "The AIRMET series for IFR conditions and extensive mountain obscuration.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-sierra"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-ceiling",
      "name": "Ceiling",
      "description": "The lowest broken or overcast layer, or the vertical visibility into an obscuration. VV008, BKN008, and OVC008 all mean an 800 ft ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-ceiling"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-flightcat",
      "name": "Flight category",
      "description": "A color-coded label of VFR, MVFR, IFR or LIFR that summarizes ceiling and visibility for situational awareness only.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-flightcat"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-ifr",
      "name": "IFR",
      "description": "Ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-ifr",
      "alternateName": "Instrument flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-indefceil",
      "name": "Indefinite ceiling",
      "description": "A ceiling reported as vertical visibility into a surface-based obscuration, such as fog, coded VV in a METAR.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-indefceil"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-lifr",
      "name": "LIFR",
      "description": "Ceiling below 500 feet and/or visibility below 1 mile.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-lifr",
      "alternateName": "Low IFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-mtnobsc",
      "name": "Mountain obscuration",
      "description": "A condition in which mountains or ridges are hidden by clouds, precipitation, smoke, or other obscurations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-mtnobsc"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-mvfr",
      "name": "MVFR",
      "description": "Ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-mvfr",
      "alternateName": "Marginal VFR"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-pvis",
      "name": "Prevailing visibility",
      "description": "The greatest distance that can be seen throughout at least half of the horizon circle, not necessarily in one continuous sector.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-pvis"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-vfr",
      "name": "VFR",
      "description": "Ceiling greater than 3,000 feet and visibility greater than 5 miles.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-vfr",
      "alternateName": "Visual flight rules"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-visibility",
      "name": "Visibility",
      "description": "The greatest horizontal distance at which selected objects can be seen and identified, or its instrument equivalent.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-visibility"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-vv",
      "name": "VV",
      "description": "How far up you can see into a surface-based obscuration such as fog, in hundreds of feet; it counts as the ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/ceiling-visibility#gl-vv",
      "alternateName": "Vertical visibility"
    }
  ]
} as const
