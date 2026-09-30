# Build notes: /blog/pave-risk-assessment-weather (expanded in place)

Built September 30, 2026 (CT) with `_build/build.py pave-risk-assessment-weather` from `_build/pave-risk-assessment-weather.src.html`, `.meta.json` and `.quotes.json`. Slug, URL and title are unchanged.

## Files
- `pave-risk-assessment-weather.html`: the article body, using only Soro tags (`p, h2, h3, a[href], strong, em, ul, ol, li`).
- `pave-risk-assessment-weather.md`: a Markdown twin of the body.
- `pave-risk-assessment-weather.faq.jsonld.json`: FAQPage JSON-LD with 6 questions.
- `_verify/pave-risk-assessment-weather.preview.html`: local preview.

## Word count
Before: 2,261. After: 3,664, counted with build.py's word counter.

## What was added or fixed
- **Visible "Last reviewed: September 30, 2026"** line at the top, plus a one-paragraph scope intro.
- **Removed the in-body `<h1>PAVE Risk Assessment Weather for Real Trips</h1>`.** The page template already renders the title as the H1, so the live page had two H1s.
- **Fixed the broken PAVE table.** Soro renders Markdown tables as literal pipes inside a `<p>`. The section is retitled "What does PAVE stand for in aviation?" and rebuilt as four stacked h3 + ul cards: P: Pilot in command (PIC), A, V, E. The original prompts are kept word for word, and a PHAK citation is added.
- **New H2: The IMSAFE checklist: are you fit to fly today?** Six cards, one per letter, using the FAA's own questions from PHAK Ch 2 and RMH Ch 3:
  - Alcohol card: 14 CFR 91.17 limits (8 hours, under the influence, 0.04), plus the RMH note that aftereffects can last beyond 8 hours.
  - E card: the Eating variant, per the RMH.
  - A closing paragraph on running the checklist twice.
- **"PAVE checklist for a real cross-country" expanded into a full printable checklist.** It keeps all the original items and adds, for each letter:
  - Pilot: an IMSAFE line and the PHAK "Am I ready for this trip?" question.
  - Aircraft: the PHAK Aircraft questions (right aircraft, familiarity, equipment, runways, load, altitudes, fuel reserves, fuel delivered vs ordered).
  - enVironment: the PHAK items (thunderstorms, icing, temperature/dew point spread, safe descent, crosswind, mountain winds aloft, safe altitudes, lighting, NOTAMs, TFRs, and "weather may be different than forecast").
  - External pressures: the PHAK list of pressures, the personal SOPs, and the "single most important key" quote.
  - Also removed the stale sentence "When a fuller PAVE checklist hub ships on planewx.ai…", since this page now is that checklist.
- **"PAVE vs IMSAFE"**: added the RMH citation for the Eating variant and one sentence saying IMSAFE is the heart of the P.
- **"What pilots get wrong"**: added the FAA "fictional flights" practice quote.
- **New H2: Frequently asked questions** (6 questions): what PAVE stands for; what the IMSAFE checklist is; IMSAFE vs PAVE; pilot alcohol rules; "Is PAVE only for flight reviews?" (the original H2 moved here, lightly trimmed: "The point of this page is that" became "Weather risk assessment inside PAVE starts…"); and FRAT vs PAVE.
- **Mission-and-loop section.** "From PAVE worksheet to a living FRAT" merges the old "Turning weather data into an earlier decision" and "From PAVE worksheet to a living FRAT" sections. It adds:
  - FAA Fly Safe FRAT and FAA blog quotes;
  - PlaneWX as the decision support system for GA, framed as Fly or Stay, never making the call;
  - Synoptic Intelligence and AFDs, Regional and Corridor Watch;
  - the WX Score against your minimums (Favorable, Marginal, Unfavorable);
  - the FRAT: 4 hours, PAVE plus IMSAFE, pre-fills vs self-rates, TEAM, "Risks are stacking", and GO/NO-GO/Postpone/Modify recorded by the pilot;
  - mentors (Need Help Now, 2 hours, volunteer peers) and Self Debrief;
  - the "not a substitute for a complete briefing" line;
  - Learning Center links (AIRMET/SIGMET, icing, turbulence, winds aloft, weather radar).
  - The original good lines are kept ("complements Flight Service and your EFB", "good or bad for a specific pilot", "just go look", the options paragraph).
- **Product copy corrected.** The old line said Synoptic Intelligence "calibrates it against NBM probabilities, and turns that into a personalized WX Score based on your ratings, experience, aircraft, and limits". It was rewritten to match /help: NBM calibrates Regional and Corridor Watch VFR probability, and the WX Score scores against minimums and aircraft. Also removed the stale "When a dedicated PAVE checklist hub goes live…" sentence.
- **One " - " dash** became a colon ("five years ago: your current limits"). "48-96 hours" became "48 to 96 hours".

## Keyword targets
- imsafe checklist (3,600, KD 0), pave checklist (1,900), imsafe (1,300), pave acronym aviation (880), pave aviation (480), pave model (GSC: 6 impressions, position 14.2; the existing H2 "PAVE model: …" is kept).
- PAA questions covered in the FAQ: "What is the difference between IMSAFE and PAVE?", "What is the IMSAFE checklist?", "What does IMSAFE mean in aviation?" (answered inside the IMSAFE FAQ and the H2).
- Optional title idea for Mark, not applied: "PAVE Checklist and IMSAFE Checklist: Weather Risk Assessment for Real Trips".

## Sources (Tier 1)
1. PHAK FAA-H-8083-25C, Ch 2 (IMSAFE, PAVE checklist, Figure 2-7, external pressures, personal SOPs).
2. RMH FAA-H-8083-2A, Ch 3 (pilot hazards, IMSAFE, Figure 3-3, Eating note).
3. 14 CFR 91.17.
4. FAA Fly Safe, Flight Risk Assessment Tools (SE 42, AFS-850 16_12). Text saved as gajsc/flysafe/Flight_Risk_Assessment_Tools.flow.txt.
5. FAA Cleared for Takeoff blog, "Silver Linings, Silver Bullets…" (FRAT and fictional-flights quotes).

## Source conflicts and handling
- **IMSAFE "E".** The PHAK and RMH Figure 3-3 use Emotion. The RMH notes that some publications use Eating. The page gives both and cites the RMH.
- **IMSAFE wording differs between the PHAK and RMH.** For example, Illness is "Am I sick?" in the PHAK and "Do I have any symptoms?" in RMH Fig 3-3. The page quotes the PHAK questions and adds RMH text where it goes further.
- **Dash rule.** The PHAK and RMH print each item as the letter label, then an em or en dash, then the question (for example Illness, dash, "Am I sick?"). Only the question text is quoted; the letter labels are separate headings.
- **PAVE's P.** The PHAK writes it as "Pilot in Command (PIC)", while PlaneWX help writes "Pilot". The card uses "Pilot in command (PIC)", and body copy keeps the original "Pilot" wording.
- **Help's alcohol wording.** The FRAT help IMSAFE line "Have I consumed alcohol in the last 8 hours?" matches 91.17's 8-hour rule; the page cites the CFR directly.

## Help-center checks
Every product claim in this post was checked against /help (frat, wx-score, mentors, self-debrief, risk-loop, forecast-office, regional-weather, corridor-watch):
- FRAT pre-fills (weather snapshot, day or night, airport complexity) and the rule that "Your LOW / MEDIUM / HIGH self-rates feed the FRAT category scores";
- TEAM appearing when risk is MEDIUM or HIGH;
- "Risks are stacking" at 3 or more elevated factors;
- decision options GO, NO-GO, Postpone and Modify;
- "PlaneWX never recommends GO or NO-GO".

"Fly or Stay" is used only as framing.

## Port note for the Principal Software Engineer
1. **Replace the body in Soro.** Soro article f794de9a-a93c-4ca1-8915-6993aabd49d0 gets `pave-risk-assessment-weather.html` (or the .md twin). The old body started with an `<h1>`; the new one does not, so do not re-add it.
2. **Invisible characters.** Same as the VFR post: `&nbsp;` before each cite, and U+2060 between adjacent cites. Confirm they survive the Soro import.
3. **FAQ JSON-LD.** Inject `pave-risk-assessment-weather.faq.jsonld.json` through the slug→FAQ map in page.tsx (see the VFR note). Add `dateModified: 2026-09-30` to the BlogPosting.
4. **Learning Center links are not live.** `/learn/aviation-weather/{airmet-sigmet,icing,turbulence,winds-aloft,weather-radar}` return 404 today; LC v1 is `/learn/[slug]`, noindex. Ship the hubs first, redirect, or drop that paragraph.
5. **Cache.** Revalidate ISR tag `soro-article-content:f794de9a-a93c-4ca1-8915-6993aabd49d0`.
6. **Soro and tables.** Soro does not render Markdown tables (the old PAVE table showed as pipes). Keep that in mind for any other post with a table; the stacked-card pattern here avoids the problem.

## Verification
- build.py rules: 0 problems. That covers banned characters and phrases, Soro-only tags, all 5 sources cited, "Last reviewed" present, and smart quotes throughout.
- Quotes and facts: 45 of 45 registry entries were verified against the saved source text. Every quoted span in the body is either in the registry or an original-post or whitelisted scare quote.
- Layout at 390, 620, 768 and 1280: no overflow; 0 clipped elements of 151; 0 cite line starts (36 groups, 38 cite elements); 0 cite breaks; 0 cite groups too wide.
