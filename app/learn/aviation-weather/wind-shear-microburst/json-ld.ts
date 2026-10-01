export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Low-Level Wind Shear and Microbursts: Recognition, Reports, and Escape",
  "description": "What low-level wind shear and microbursts are, the signs to look for, how LLWAS, TDWR, and ATIS alerts reach you, how to report wind shear, and what the FAA says about recovery.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst",
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
    "Wind shear",
    "Low-level wind shear",
    "Microburst",
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
      "name": "What is wind shear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Wind shear is the sudden, drastic change in wind speed and/or direction over a small area, from one level or point to another, usually in the vertical”. It can happen at any altitude, but near the ground there is little room to recover."
      }
    },
    {
      "@type": "Question",
      "name": "What is non-convective low-level wind shear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“Non-convective LLWS is defined as a wind shear of 10 kt or more per 100 ft in a layer more than 200 ft thick that occurs within 2,000 ft of the surface.”"
      }
    },
    {
      "@type": "Question",
      "name": "What causes low-level wind shear without thunderstorms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Handbook says it “is commonly associated with passing frontal systems, temperature inversions, and strong upper-level winds (greater than 25 kt).”"
      }
    },
    {
      "@type": "Question",
      "name": "How big is a microburst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AIM says the downdraft is typically less than 1 mile in diameter, and the outflow near the ground can extend to about 2 1/2 miles. Downdrafts can reach 6,000 feet per minute, and surface winds of 45 knots can produce a 90 knot shear across it."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a microburst last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AIM: “An individual microburst will seldom last longer than 15 minutes from the time it strikes the ground until dissipation.” It intensifies for about 5 minutes after it strikes the ground."
      }
    },
    {
      "@type": "Question",
      "name": "What are the signs of a microburst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An intense rain shaft, virga at the cloud base, or a ring of blowing dust, which “is sometimes the only visible clue”. The AIM notes microbursts can come from benign looking cells with little rain."
      }
    },
    {
      "@type": "Question",
      "name": "How long is wind shear kept on the ATIS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "“A statement is included on the ATIS for 20 minutes following the last report or indication of the wind shear/microburst.”"
      }
    },
    {
      "@type": "Question",
      "name": "Is there an FAA advisory circular on wind shear for GA pilots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not a current one. AC 00‑54, Pilot Windshear Guide, is cancelled. AC 120‑50A covers wind shear training programs for certain operators, not general aviation pilots. This page relies on the FAA Aviation Weather Handbook and the AIM instead."
      }
    },
    {
      "@type": "Question",
      "name": "How does PlaneWX handle wind shear?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its help center says wind shear is scored against the wind shear limits in your personal minimums, with a graduated deduction, and a TAF wind shear group over your limit can matter even more than 12 hours out. PlaneWX never recommends GO or NO-GO; you make the call as PIC."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
  "name": "Wind shear and microburst glossary",
  "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-tango",
      "name": "AIRMET Tango",
      "description": "The AIRMET series for moderate turbulence, strong sustained surface winds, and non-convective low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-tango"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-csigmet",
      "name": "Convective SIGMET",
      "description": "The SIGMET issued for thunderstorms over the contiguous U.S. It implies severe or greater turbulence, severe icing, and low-level wind shear.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-csigmet"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-llwas",
      "name": "LLWAS",
      "description": "A network of airport wind sensors whose software detects hazardous wind shear and microbursts near the runways.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-llwas",
      "alternateName": "Low Level Wind Shear Alert System"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-llws",
      "name": "LLWS",
      "description": "A change in wind speed or direction close to the ground; the TAF WS group covers non-convective wind shear from the surface up to 2,000 ft AGL.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-llws",
      "alternateName": "Low-level wind shear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-microburst",
      "name": "Microburst",
      "description": "A small downburst whose damaging outflow extends 2.5 miles or less and spreads in all directions when it reaches the ground.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-microburst"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-pirep",
      "name": "PIREP",
      "description": "A report of weather a pilot actually encountered in flight, shared to help other pilots and forecasters.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-pirep",
      "alternateName": "Pilot Weather Report"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-tdwr",
      "name": "TDWR",
      "description": "An FAA Doppler radar near major airports, built mainly to detect hazardous wind shear, that updates as often as once a minute in hazardous weather mode.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-tdwr",
      "alternateName": "Terminal Doppler Weather Radar"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-windshear",
      "name": "Wind shear",
      "description": "A sudden, large change in wind speed or direction over a short distance, usually with height.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-windshear"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-wsescape",
      "name": "Wind shear escape",
      "description": "An unplanned abort, flown at maximum thrust in a climb, until wind shear conditions are no longer detected.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#glossary",
      "url": "https://www.planewx.ai/learn/aviation-weather/wind-shear-microburst#gl-wsescape"
    }
  ]
} as const
