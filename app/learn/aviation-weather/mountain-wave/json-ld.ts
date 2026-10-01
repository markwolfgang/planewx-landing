export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Mountain Wave and Mountain Weather: Lee Waves, Rotors, and Downslope Winds",
  "description": "When mountain waves form, how propagating and trapped lee waves differ, the clouds that mark them, rotor and downslope wind hazards, and how to plan a mountain crossing.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/mountain-wave",
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
    "Mountain wave",
    "Rotor",
    "Lee wave",
    "Mountain flying",
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
      "name": "What is a mountain wave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Mountain waves are a form of mechanical turbulence that develop above and downwind of mountains.” They form when strong wind blows across a ridge into stable air."
      }
    },
    {
      "@type": "Question",
      "name": "What wind speed causes mountain wave turbulence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Handbook says strong-wind disturbances should be suspected “when flying downwind of rugged terrain, whenever the wind flow at ridge level exceeds about 20 kt.” It notes mountain flying literature often uses 20 kt at ridge level as the threshold for a strong wind."
      }
    },
    {
      "@type": "Question",
      "name": "When are mountain waves worst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“The most severe mountain wind events usually occur when the large-scale (or synoptic) winds are strongest, from late autumn to early spring.”"
      }
    },
    {
      "@type": "Question",
      "name": "Can there be mountain wave turbulence with no lenticular clouds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Lenticular clouds can be absent if the air is too dry, and “extremely severe wind events can occur with little or no visual warning of their presence.”"
      }
    },
    {
      "@type": "Question",
      "name": "What is a rotor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A rolling eddy that develops near or below ridge level on the downwind side, under a wave crest. It is “an area of potentially severe-to-extreme wind shear and turbulence.”"
      }
    },
    {
      "@type": "Question",
      "name": "Why are rotors so dangerous to light airplanes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They can produce rolling moments beyond the airplane’s roll authority, and “Rotors are especially dangerous at low altitudes, particularly during takeoff and landing as the aircraft is slowed and in a relatively high-drag configuration.”"
      }
    },
    {
      "@type": "Question",
      "name": "What happens to a light airplane in a mountain downdraft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Downdrafts can exceed its climb rate. The Handbook says downdrafts over forested areas may be strong enough to force aircraft into the trees even at the best rate-of-climb speed, and high density altitude makes it worse."
      }
    },
    {
      "@type": "Question",
      "name": "Why can a valley airport look fine when the mountains are not?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“For example, a weather station located in a valley could report a VFR cloud ceiling, while a hiker in the mountains sees fog.”"
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX flag mountain waves?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its help center describes a cross-barrier flow check against the terrain along your route, a marginal advisory at 15 kt or more of perpendicular flow over terrain with 2,000 ft or more of relief, and rotor detection. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
  "name": "Mountain wave and mountain weather glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-acsl",
      "name": "ACSL",
      "description": "A smooth, lens-shaped cloud that sits over or downwind of mountains and is visual proof of a mountain wave.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-acsl",
      "alternateName": "Altocumulus standing lenticular"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-sierra",
      "name": "AIRMET Sierra",
      "description": "The AIRMET series for IFR conditions and extensive mountain obscuration.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-sierra"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-mtnwave",
      "name": "Mountain wave",
      "description": "A form of mechanical turbulence that develops above and downwind of mountains when strong, stable flow crosses a ridge.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-mtnwave"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-rotor",
      "name": "Rotor",
      "description": "A rolling eddy near or below ridge level on the downwind side of a mountain, with potentially severe to extreme turbulence.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-rotor"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-leewave",
      "name": "Trapped lee wave",
      "description": "A mountain wave whose energy is held below a certain altitude, producing a train of waves downwind of the ridge.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/mountain-wave#gl-leewave"
    }
  ]
} as const
