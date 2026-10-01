export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fog for Pilots: Radiation, Advection, Upslope, and Freezing Fog",
  "description": "How each type of fog forms and clears, what the temperature-dewpoint spread tells you, how fog is coded in METARs and TAFs, and what the FAA and NTSB say to do about it.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/fog",
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
    "Fog",
    "Radiation fog",
    "Advection fog",
    "Temperature-dewpoint spread",
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
      "name": "What is fog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Fog is a visible aggregate of minute water droplets that are based at the Earth’s surface, and it reduces horizontal visibility to less than 5/8 SM (1 km); unlike drizzle, it does not fall to the ground.”"
      }
    },
    {
      "@type": "Question",
      "name": "What temperature-dewpoint spread means fog is likely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Handbook says “Fog seldom forms when the temperature-dewpoint spread is greater than 2°C (4°F).” AC 91‑92 tells pilots to be especially cautious when the spread is 3°C or less. A small spread is a warning, not a forecast."
      }
    },
    {
      "@type": "Question",
      "name": "When does radiation fog burn off?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ground fog usually burns off rather rapidly after sunrise, and other radiation fog generally clears before noon unless clouds move in over it."
      }
    },
    {
      "@type": "Question",
      "name": "Why is advection fog harder to plan around than radiation fog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is usually more extensive and much more persistent, and it “can move in rapidly regardless of the time of day or night.”"
      }
    },
    {
      "@type": "Question",
      "name": "Does wind clear fog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the type. Winds up to about 5 kt tend to deepen radiation fog; stronger wind disperses it or lifts it into stratus. Advection fog deepens as wind increases up to about 15 kt."
      }
    },
    {
      "@type": "Question",
      "name": "Do AWOS stations report fog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often not. “Fog/mist/haze is not included in METARs/SPECIs from most AWOS, nor most AWOS broadcasts, depending on the type of AWOS.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between mist and fog in a METAR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visibility. FG is reported below 5/8 SM; mist (BR) covers less than 7 SM down to 5/8 SM."
      }
    },
    {
      "@type": "Question",
      "name": "What is flat light?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Flat light occurs when the sky is overcast, especially over snow-covered terrain and large bodies of water.” No shadows are cast, so depth and altitude are hard to judge."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaneWX score fog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its help center says forecast visibility below your hard limit is scored, and freezing fog (FZFG) is always unfavorable. The temperature-dewpoint spread and fog risk alone are awareness only, and nearby-airport fog reports appear as “Not scored” lines. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
  "name": "Fog and visibility glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-advfog",
      "name": "Advection fog",
      "description": "Fog that forms when moist air moves over a colder surface and cools below its dewpoint; common along coasts.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-advfog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-br",
      "name": "BR",
      "description": "Fog that restricts visibility to between 5/8 and 6 statute miles; below 5/8 SM it is coded FG.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-br",
      "alternateName": "Mist"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-fg",
      "name": "FG",
      "description": "A visible aggregate of tiny water droplets based at the surface that reduces visibility to less than 5/8 statute mile.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-fg",
      "alternateName": "Fog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-flatlight",
      "name": "Flat light",
      "description": "Diffuse light under an overcast, especially over snow or water, that removes depth cues and the horizon.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-flatlight"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-fzfg",
      "name": "FZFG",
      "description": "Fog at a temperature of 0°C or below, whose droplets can freeze on contact with surfaces.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-fzfg",
      "alternateName": "Freezing fog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-groundfog",
      "name": "Ground fog",
      "description": "A form of radiation fog confined to a thin layer near the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-groundfog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-icefog",
      "name": "Ice fog",
      "description": "Fog made of tiny ice crystals that forms when supercooled droplets freeze directly; rare warmer than about minus 30°C.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-icefog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-imc",
      "name": "IMC",
      "description": "Visibility, distance from cloud, and ceiling below the minimums set for visual meteorological conditions.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-imc",
      "alternateName": "Instrument meteorological conditions"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-mifg",
      "name": "MIFG",
      "description": "A METAR code for a thin layer of fog near the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-mifg",
      "alternateName": "Shallow fog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-radfog",
      "name": "Radiation fog",
      "description": "Shallow fog that forms over land on clear nights with light winds as the ground cools the air to its dewpoint.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-radfog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-steamfog",
      "name": "Steam fog",
      "description": "Fog that forms when cold air moves over much warmer water; it sits in unstable air, so expect convective turbulence in it.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-steamfog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-spread",
      "name": "Temperature-dewpoint spread",
      "description": "The difference between air temperature and dewpoint; fog seldom forms when it is greater than 2°C, or 4°F.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-spread"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-upfog",
      "name": "Upslope fog",
      "description": "Fog that forms as moist, stable air cools while it is pushed up rising terrain; often dense and deep.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-upfog"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-vv",
      "name": "VV",
      "description": "How far up you can see into a surface-based obscuration such as fog, in hundreds of feet; it counts as the ceiling.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-vv",
      "alternateName": "Vertical visibility"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/fog#gl-whiteout",
      "name": "Whiteout",
      "description": "Blowing snow lofted to about 50 ft that hides the sky and cuts surface visibility to near zero.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/fog#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/fog#gl-whiteout"
    }
  ]
} as const
