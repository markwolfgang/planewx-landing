# Build notes: /blog/personal-minimums-weather-planning (expanded in place)

Built September 30, 2026 (CT) with `_build/build.py personal-minimums-weather-planning` from `_build/personal-minimums-weather-planning.src.html`, `.meta.json` and `.quotes.json`. The slug, URL and title are unchanged.

## Files
- `personal-minimums-weather-planning.html`: the article body in Soro HTML (only `p, h2, h3, a[href], strong, em, ul, ol, li`).
- `personal-minimums-weather-planning.md`: a Markdown version of the same body.
- `personal-minimums-weather-planning.faq.jsonld.json`: FAQPage JSON-LD with 6 questions.
- `_verify/personal-minimums-weather-planning.preview.html`: a local preview.

## Word count
Before: 1,587. After: 4,479. Both counts come from build.py's counter.

## What was added or fixed
- **Visible "Last reviewed: September 30, 2026" line** at the top, plus a scope intro.
- **New H2: Legal VFR and IFR minimums vs personal minimums.**
  - Opens with the RMH "do not cover every situation" quote and the PHAK legal vs smart quote.
  - **H3 Basic VFR weather minimums (14 CFR 91.155):** the full 91.155(a) table as 7 stacked airspace cards (a bold label plus a ul each), not a table. It includes the 91.155(b)(2) night pattern exception.
  - **H3 Other legal VFR limits:** 91.155(c) ceiling of 1,000 ft in surface areas; 91.155(d) 3 SM ground visibility; 91.157 Special VFR; 91.151 VFR fuel.
  - **How to remember VFR minimums:** the common pattern (3 SM and 500/1,000/2,000) with a "3-152" memory aid, then the exceptions.
  - **MVFR is not a legal minimum** (AWH 28B).
  - **H3 Legal IFR weather limits (Part 91):** 91.169(b) when an alternate is required; 91.169(c) standard alternate minimums of 600-2 and 800-2; 91.175(c) operating below DA/MDA; 91.167 IFR fuel; takeoff, where 91.175(f) applies only to Parts 121, 125, 129 and 135.
  - **H3 Legal minimum vs a sample personal minimum:** 5 split cards (day VFR, night VFR, IFR, wind, fuel). Each shows the legal floor, the FAA RMH sample pilot's numbers, and a blank "Your personal minimum: ___" line.
- **New H2: The FAA Personal Minimums Checklist.** Names FAA-P-8740-56 (FAA Safety Team, AFS-810) as the source and notes it is also AIH FAA-H-8083-9 Appendix D. It includes:
  - the FAA's how-to-use quotes;
  - all four PAVE sections, laid out as the FAA does (Pilot: experience/recency and physical condition; Aircraft: fuel reserves, experience in type, performance, equipment; Environment: airport conditions, weather, VFR weather, IFR weather; External pressures: trip planning, personal equipment, importance of trip);
  - the two FAA rules, "two or more risk factors/categories, don't go!" and "never make your minimums less restrictive when you are planning a specific flight".
- **New H2: How the FAA says to build your numbers.** Covers:
  - the RMH six steps (paraphrased, because the RMH step headings use em dashes);
  - the Figure 2-9 adjustment margins and the night cross-country worked example;
  - the three cautions;
  - "Professional pilots live by the numbers".
- **New H2: IFR personal minimums.** Answers "What are good IFR personal minimums?" with the FAA checklist structure, the RMH sample of 800/1 by day and 999/3 at night, five self-questions, and the PHAK mountain terrain quote.
- **Fixed the PAVE letters.** The old copy said the "E" was weather and the "V" was pressure. It now reads "V" (enVironment) = weather pattern and "E" (External pressures) = announcing the trip too early.
- **Converted all " - " dashes** to colons or commas: "operational layer:", "planning layer:", "the familiar scan:", and "judgment, and it is how".
- **"Keep your minimums honest":** added the FAA checklist rule on only making minimums more restrictive, never less, without a significant positive event.
- **New H2: Frequently asked questions** (6): the basic VFR weather minimums; what weather you need to fly VFR; how to remember VFR minimums; what a personal minimums checklist is; good IFR personal minimums; whether MVFR is a legal minimum.
- **Mission-and-loop section: "Where your minimums meet the briefing".** This merges the old "Personal minimums only work if the briefing uses them" section with the product paragraph from "Build your minimums around decision points". It covers:
  - PlaneWX as the decision support system for GA; Fly or Stay stays with the PIC; it is not a replacement for a complete briefing;
  - Comfort/Max limits per factor, airport-specific limits for up to 25 airports, and aircraft limits when more restrictive;
  - WX Score bands, advisory;
  - Synoptic Intelligence and AFDs; National, Regional and Corridor Watch VFR probability calibrated with NBM for days 1 to 3;
  - FRAT (4 hours, PAVE plus IMSAFE); mentors and Need Help Now (2 hours); Self Debrief (Labs, Pro Plus); the risk loop;
  - Learning Center links: METAR, TAF, icing, turbulence, winds aloft.
- **Product copy corrected.** The old line was "AFDs across the route, calibrated with NBM probabilities and tied to your ratings, aircraft, and personal minimums, gives you a WX Score". It now describes NBM calibration of Regional and Corridor VFR probability separately from the WX Score against minimums and aircraft, per /help.

## Keyword targets
- vfr weather minimums (4,400), vfr minimums (1,300), personal minimums checklist (880), basic vfr wx minimums (480), personal minimums (390), aopa personal minimums (390, see note), ifr personal minimums (170), vfr personal minimums (110), personal minimums worksheet (50).
- The page ranks at position 5.6. The PAA questions covered are "What are good IFR personal minimums?", "What weather do you need to fly in VFR?" and "How to remember VFR minimums?"
- Note on "aopa personal minimums": no AOPA source is cited, because the FAA checklist is the primary document the request named. If Mark wants that term covered, AOPA ASI's personal minimums material would need to be saved and verified first.
- Optional title idea for Mark (not applied): "VFR Weather Minimums vs Personal Minimums: FAA Checklist and Planning Guide".

## Sources (Tier 1)
1. FAA-P-8740-56, Personal Minimums Checklist (FAASTeam, AFS-810). New save.
2. AIH FAA-H-8083-9, Appendix D. New save.
3. 14 CFR 91.155. The table text was extracted from eCFR XML dated 2026-09-15 to ga-safety/text/cfr-91-155-table.txt.
4. 14 CFR 91.157.
5. 14 CFR 91.151.
6. 14 CFR 91.167.
7. 14 CFR 91.169.
8. 14 CFR 91.175.
9. RMH FAA-H-8083-2A, Ch 2.
10. PHAK FAA-H-8083-25C, Ch 2.
11. AWH FAA-H-8083-28B, 3.4.2.14 and 3.4.2.15.

## Source conflicts and handling
- **MVFR's status.** FAA Fly Safe "Personal Minimums" (Feb 2015) describes flight categories as defined by the regulations and calls MVFR a sub-category of VFR. AWH 28B (2026) says there are no Part 91 MVFR minimums and that categories are for situational awareness only. The page follows the newer AWH and does not cite the 2015 fact sheet.
- **RMH Figure 2-9 layout.** It is a two-column layout in which situations and adjustments are not paired row by row. The page lists the four adjustments and the four situation types separately, as the RMH text does, and gives the RMH's own worked example.
- **Crosswind units.** The RMH sample crosswind component value (7) appears in a wind table whose other rows are in knots. The page states 7 knots.
- **Checklist edition.** FAA-P-8740-56 is the 1996-era AFS-810 pamphlet. The same content is in the current AIH Appendix D. Both are cited.
- **Dash rule.** The RMH step headings and the FAA checklist panel title (which ends in an em dash) use em dashes. They are paraphrased, not quoted.

## Help-center inaccuracies found (for the owner of app.planewx.ai/help; not changed here)
1. **/help/personal-minimums** says "The FAA, AOPA, and every flight safety organization recommends that pilots set personal minimums above regulatory minimums". "Every flight safety organization" cannot be supported. Suggest naming the FAA sources (the FAA-P-8740-56 checklist and the RMH Ch 2).
2. **/help/personal-minimums** says "The AIM recommends at least 20 NM from severe thunderstorms." AIM 7-1 says "Do avoid by at least 20 miles any thunderstorm identified as severe or giving an intense radar echo". The AIM says "miles", not specifically NM. Suggest quoting the AIM wording.
3. **Label reuse on /help/personal-minimums.** It uses Favorable, Marginal and Unfavorable for per-factor comfort/max states, while /help/wx-score uses the same words for percentage bands (75%+, 50 to 74%, under 50%). The page itself says "That flag is not a score band", but reusing the labels invites confusion.
4. **Region count on /help/regional-weather.** It says "23 Custom Aviation Regions" in three places, but National Watch is described as "synthesizing all 22 regional summaries". One number is wrong.
5. **"Fly or Stay" is not used anywhere in /help.** The drafts use it only as framing, never as a UI label. If it is meant to be product language, /help should adopt it.
6. The old blog copy in all three posts overstated how NBM feeds the WX Score. That is fixed in the drafts; /help is accurate on this point.

## Port note for the Principal Software Engineer
1. **Soro.** Replace the body of article ac6b9286-fc4f-48fa-9509-fd683dc835da in Soro with `personal-minimums-weather-planning.html` (or the .md). Keep the slug and title.
2. **Special characters.** `&nbsp;` appears before cites and U+2060 between adjacent cites. Confirm both survive the Soro import.
3. **FAQ JSON-LD.** Inject `personal-minimums-weather-planning.faq.jsonld.json` via the slug→FAQ map in `app/blog/[slug]/page.tsx`, and add `dateModified: 2026-09-30` to BlogPosting. The same change covers all three posts.
4. **Learning Center links are not live.** `/learn/aviation-weather/{metar,taf,icing,turbulence,winds-aloft}` currently return 404. LC v1 is `/learn/[slug]` and noindex. Ship the hubs, add redirects, or drop that paragraph before publishing.
5. **Cache.** Revalidate the ISR tag `soro-article-content:ac6b9286-fc4f-48fa-9509-fd683dc835da`.
6. **Layout.** The 91.155 and legal-vs-personal content is built from stacked cards (a bold label with a ul) on purpose, because Soro does not render tables. Do not convert it back to a table.

## Verification
- **build.py rules:** 0 problems. No banned characters or phrases, Soro-only tags, all 11 sources cited, "Last reviewed" present, smart quotes.
- **Quotes and facts:** 45 of 45 registry entries verified against the saved text. That covers every CFR number on the page (checked against the eCFR text and the 91.155 table extract), the RMH sample numbers and adjustments, and the FAA checklist quotes. Every quoted span in the body is either in the registry or an original-post or whitelisted phrase.
- **Layout** at 390, 620, 768 and 1280: no overflow; 0 clipped elements of 199; 0 cite line starts (32 groups, 37 cite elements); 0 cite breaks; 0 groups too wide.
