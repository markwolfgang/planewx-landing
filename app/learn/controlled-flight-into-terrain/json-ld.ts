export const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Controlled Flight Into Terrain: Why It Happens and How to Prevent It",
  "description": "Controlled flight into terrain (CFIT) is when a working airplane is flown into the ground. Why it happens in GA, two NTSB cases and how to prevent it.",
  "mainEntityOfPage": "https://www.planewx.ai/learn/controlled-flight-into-terrain",
  "datePublished": "2026-10-11",
  "dateModified": "2026-10-11",
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
    "Controlled flight into terrain",
    "CFIT",
    "VFR into IMC",
    "Aeronautical decision making",
    "General aviation safety"
  ],
  "isPartOf": {
    "@type": "CollectionPage",
    "name": "PlaneWX Learning Center",
    "url": "https://www.planewx.ai/learn"
  }
} as const

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CFIT and why does it happen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CFIT is an accident in which a working airplane, under control, is flown into terrain, water or an obstacle. It usually happens because the pilot does not know where the terrain is: low ceilings, darkness, mountain obscuration, or a climb that cannot outrun rising ground, often after a decision to keep going."
      }
    },
    {
      "@type": "Question",
      "name": "What does the acronym CFIT stand for in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CFIT stands for controlled flight into terrain. \"Controlled\" is the key word: the airplane is airworthy and the pilot is flying it, unlike a loss of control accident. The FAA's general aviation guidance on the topic is AC 61-134, General Aviation Controlled Flight Into Terrain Awareness, from April 2003."
      }
    },
    {
      "@type": "Question",
      "name": "How to prevent CFIT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prevent CFIT by planning terrain clearance before takeoff. Get a full weather briefing, compare ceilings with the terrain and MEFs on the route, check darkness and climb performance, and pick a turnaround trigger and alternate. AC 61-134 also says to \"eliminate the pressure to complete the flight\"."
      }
    },
    {
      "@type": "Question",
      "name": "What is a loss of control in flight hazard?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A loss of control in flight hazard is anything that can lead to \"an unintended departure of an aircraft from controlled flight,\" in the FAA's words. That often means a stall or spin outside the normal flight envelope. Contributing factors the FAA lists include poor decision making, failure to maintain airspeed, and drugs or alcohol."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 5 P's of SRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 5 Ps of single pilot resource management are the Plan, the Plane, the Pilot, the Passengers and the Programming. The FAA Pilot's Handbook of Aeronautical Knowledge uses them to review a flight at key decision points, such as preflight, before takeoff, midway through the flight and before descent."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between an incident and an accident in aviation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An accident involves death or serious injury, or substantial damage to the aircraft. An incident is any other occurrence that affects or could affect the safety of operations. The NTSB definitions are in 49 CFR 830.2. Both cases on this page are accidents."
      }
    }
  ]
} as const

export const DEFINED_TERM_SET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://www.planewx.ai/learn/controlled-flight-into-terrain#glossary",
  "name": "Controlled flight into terrain glossary",
  "url": "https://www.planewx.ai/learn/controlled-flight-into-terrain#glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-imc",
      "name": "IMC",
      "description": "Visibility, distance from cloud, and ceiling below the minimums set for visual meteorological conditions.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/controlled-flight-into-terrain#glossary",
      "url": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-imc",
      "alternateName": "Instrument meteorological conditions"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-mtnobsc",
      "name": "Mountain obscuration",
      "description": "A condition in which mountains or ridges are hidden by clouds, precipitation, smoke, or other obscurations.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/controlled-flight-into-terrain#glossary",
      "url": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-mtnobsc"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-persmins",
      "name": "Personal minimums",
      "description": "A pilot’s own set of rules and criteria for deciding whether, and under what conditions, to fly or keep flying.",
      "inDefinedTermSet": "https://www.planewx.ai/learn/controlled-flight-into-terrain#glossary",
      "url": "https://www.planewx.ai/learn/controlled-flight-into-terrain#gl-persmins"
    }
  ]
} as const
