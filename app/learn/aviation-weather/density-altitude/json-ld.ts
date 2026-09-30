export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Density Altitude Calculator and Guide: What It Is and How to Calculate It",
  "description": "What density altitude is, how to calculate it by hand and with the NWS formula, a worked example, the Koch chart, and why hot, high, and humid days catch pilots out.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/density-altitude",
  "dateModified": "2026-09-30",
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
    "Density altitude",
    "Pressure altitude",
    "Aircraft performance",
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
      "name": "What is density altitude?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Density altitude is pressure altitude corrected for nonstandard temperature. \"Regardless of the actual altitude of the aircraft, it will perform as though it were operating at an altitude equal to the existing density altitude.\""
      }
    },
    {
      "@type": "Question",
      "name": "How do you calculate density altitude?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Find pressure altitude (set 29.92 on the altimeter, or correct field elevation for the altimeter setting), work out the standard temperature for that altitude (15 \u00b0C minus 2 \u00b0C per 1,000 ft), then add about 120 ft for every degree Celsius the air is warmer than standard. A flight computer, a density altitude chart, or the NWS formula gives a closer answer."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 120 in the density altitude formula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the FAA Instrument Flying Handbook rule of thumb: \"If a chart is not available, the density altitude can be estimated by adding 120 feet for every degree Celsius above the ISA.\" It is an estimate, not the exact physics, and it ignores humidity."
      }
    },
    {
      "@type": "Question",
      "name": "What effect does high density altitude have on aircraft performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It reduces engine power, propeller thrust, and wing lift. The FAA lists the results as increased takeoff distance, reduced rate of climb, higher true airspeed on approach and landing at the same indicated airspeed, and a longer landing roll."
      }
    },
    {
      "@type": "Question",
      "name": "Does humidity affect density altitude?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a little. Moist air is less dense than dry air, so humidity raises density altitude. In a PHAK example at 8,000 ft and 80 degrees, humidity added almost 500 ft. The FAA density altitude pamphlet advises adding 10 percent to computed takeoff distance when humidity is high."
      }
    },
    {
      "@type": "Question",
      "name": "Is density altitude the same as pressure altitude?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only at standard temperature. Pressure altitude is the altitude on an altimeter set to 29.92. Density altitude corrects it for temperature, so on a hot day density altitude is higher than pressure altitude."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Koch chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An FAA chart that estimates the percentage to add to takeoff distance and to subtract from climb rate for a given temperature and airport pressure altitude. The FAA says to use it when the AFM or POH is not available, and that it shows typical values, not exact ones."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a density altitude calculator instead of my POH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A calculator tells you how thin the air is. Only the takeoff and landing performance data for your airplane tell you whether the runway and climb gradient are enough. Federal rules require you to know that data before the flight."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX calculate density altitude?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The help center says PlaneWX shows density altitude at departure and arrival, with the temperature and altimeter inputs it used, and a red or yellow caution when it is elevated. It does not deduct WX Score points for density altitude alone, and it does not replace your POH performance check."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
  "name": "Density altitude glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-afm",
      "name": "AFM",
      "description": "The manufacturer\u2019s FAA-approved document for a specific make and model, containing its operating procedures and limitations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-afm",
      "alternateName": "Airplane Flight Manual"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-alt",
      "name": "Altimeter group",
      "description": "Coded as A plus four digits in inches of mercury without the decimal point, so A2992 is an altimeter setting of 29.92 inHg.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-alt"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-asos",
      "name": "ASOS",
      "description": "The automated weather station network that is the nation\u2019s primary source of surface observations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-asos",
      "alternateName": "Automated Surface Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-awos",
      "name": "AWOS",
      "description": "An automated weather station similar to ASOS that generally reports fewer elements.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-awos",
      "alternateName": "Automated Weather Observing System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-da",
      "name": "Density altitude",
      "description": "Pressure altitude corrected for nonstandard temperature. An airplane performs as though it were at this altitude, whatever the field elevation.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-da"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-dewpoint",
      "name": "Dewpoint",
      "description": "The temperature to which air must be cooled, at constant pressure and moisture content, to become saturated.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-dewpoint"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-frat",
      "name": "FRAT",
      "description": "A form or checklist for recording flight hazards and the risk they add up to before you fly.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-frat",
      "alternateName": "Flight Risk Assessment Tool"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-isa",
      "name": "ISA",
      "description": "The reference atmosphere that aircraft performance and instruments are based on: 15 \u00b0C and 29.92 inches of mercury at sea level, cooling about 2 \u00b0C per 1,000 feet.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-isa",
      "alternateName": "International Standard Atmosphere"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-koch",
      "name": "Koch chart",
      "description": "An FAA chart that estimates how much to add to takeoff distance and subtract from climb rate for a given temperature and airport pressure altitude, for use when AFM or POH data are not available.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-koch"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-metar",
      "name": "METAR",
      "description": "The standard coded report of the surface weather actually observed at an airport.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-metar",
      "alternateName": "Aviation Routine Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-pa",
      "name": "Pressure altitude",
      "description": "Height above the standard datum plane, where the atmosphere weighs 29.92 inches of mercury. It is what the altimeter reads when set to 29.92.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-pa"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-tas",
      "name": "TAS",
      "description": "The speed of the aircraft through the air mass it is flying in. In thin air it is higher than indicated airspeed.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/density-altitude#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/density-altitude#gl-tas",
      "alternateName": "True airspeed"
    }
  ]
} as const
