# Build notes: /blog/vfr-weather-go-no-go (expanded in place)

Built September 30, 2026 (CT) with `_build/build.py vfr-weather-go-no-go` from `_build/vfr-weather-go-no-go.src.html`, `.meta.json` and `.quotes.json`. The slug, URL and H1 title are unchanged.

## Files
- `vfr-weather-go-no-go.html`: the article body as Soro HTML, meaning only the tags the Soro embed API emits today (`p, h2, h3, a[href], strong, em, ul, ol, li`), with no tables, classes, ids or scripts. This is the file to paste or import.
- `vfr-weather-go-no-go.md`: a Markdown twin of the same body, for use if the Soro editor takes Markdown.
- `vfr-weather-go-no-go.faq.jsonld.json`: FAQPage JSON-LD. Its text matches the visible FAQ with the [n] cite markers removed.
- `_verify/vfr-weather-go-no-go.preview.html`: a local preview. It is the live page with scripts stripped and live CSS, and the draft swapped into `[itemProp=articleBody]`.

## Word count
Before: 1,474. After: 4,726. That includes the FAQ and the 17-item Sources list. Both counts come from the same counter in build.py.

## What was added
- **Visible "Last reviewed: September 30, 2026" line** as the first paragraph, plus a one-paragraph scope intro.
- **New H2: VFR into IMC: what the accident data says.** Sources:
  - The FAA 2014 to 2023 NTSB analysis: 180 accidents, a fatality rate above 82%, 268 lives lost, 29 seriously injured. Also SD in nearly 50%, more than 40% intentional, more than a quarter briefed, and about 55% without an instrument rating.
  - AOPA ASI McSpadden Figure 1.7.2: VFR into IMC in 2023 and 2022.
  - FAA 2025 GA Safety Fact Sheet: "Accidental Flight Into Bad Weather" is number 5.
  - A scope note explaining why the FAA and AOPA figures are not comparable.
  - H3 "Inadvertent IMC vs intentional flight into IMC", using the AFH definition.
- **New H2: Marginal VFR: what MVFR means, and what it doesn't.**
  - AWH 28B flight-category cards (VFR, MVFR, IFR, LIFR) as stacked h3 + ul, with no table. States that there are no Part 91 MVFR minimums.
  - H3 "Can a private pilot fly in marginal VFR?", covering 91.155 examples and 91.155(c), with the RMH legal-vs-smart quote and a link to the personal minimums post.
  - A Special VFR paragraph (91.157).
- **New H2: Scud running: the slow way into IMC.** Draws on AC 61-134 para 8, PHAK Fig 2-15 and AIM 7-6-7 escape route, plus a turnaround-point practice note.
- **New H2: Spatial disorientation and the graveyard spiral.** Draws on AFH inner ear, AIM 8-1-5 (illusions, the leans, graveyard spiral) and FAA Fly Safe prevention. Includes the AFH "about 10 minutes" statistic.
- **New H2: Caught in IMC: what FAA guidance says to do.** Five steps:
  1. Accept the emergency (AFH).
  2. Fly the instruments; use the autopilot or wing leveler (AFH).
  3. Make a gentle 180 (FAA P-8740-52 and AIM 7-6-14), with bank at or below 10° (AFH).
  4. Avoid combined maneuvers; descend at no more than 500 fpm (AFH).
  5. ATC and declaring an emergency (AOPA ASI, 14 CFR 91.3(b)), and asking the controller to slow down (AFH).
  - Also: a note on the bank-angle conflict (standard-rate vs 10°), the FAA advice for instrument-rated pilots ("rapid escape", "file before you are in the clouds"), and the AOPA line on diverting early.
- **New H2: Frequently asked questions**, with 7 questions: VFR into IMC, inadvertent IMC, VFR vs MVFR, can a private pilot fly MVFR, scud running, what to do in inadvertent IMC, and graveyard spiral recovery. It maps to the PAA questions from the research.
- **Mission-and-loop section.** "Where decision support fits in the loop" replaces "Where decision support actually helps"; the original opening and closing paragraphs are kept. It covers:
  - PlaneWX as the decision support system for GA, framed as Fly or Stay. It never makes the call, and it is not a substitute for a complete briefing.
  - Synoptic Intelligence and AFDs from 123 offices; Regional and Corridor Watch.
  - The WX Score against minimums with its bands, the VFR default minimums tied to the MVFR boundary, and Switch to IFR.
  - FRAT (4 hours, PAVE plus IMSAFE, the "Risks are stacking" banner); mentors (2 hours, volunteer peers); Self Debrief (Labs, Pro Plus); the risk loop.
  - Learning Center links: METAR, TAF, AIRMET/SIGMET, PIREP, weather radar.
- **New H2: Sources**, a numbered list matching the [n] cite links.

## Existing content changes (kept otherwise verbatim)
- Two " - " dashes became colons ("matters most: good enough for whom"; "the usual stack: METARs").
- "Start with the mission": added one sentence tying external pressure to the FAA's 40% intentional-IMC figure.
- "A practical no-go trigger": added one sentence on an in-flight turnaround trigger.
- The product paragraph was rewritten for accuracy. The old text said Synoptic Intelligence "calibrates it against probabilistic guidance like NBM, then turns that into a personalized WX Score based on your ratings, experience, minimums, and aircraft". Per /help, NBM calibrates the VFR probability shown in Regional and Corridor Watch; the WX Score scores the trip against your minimums and aircraft. The new copy describes those separately.
- Sections were reordered so the new safety material comes right after "Why VFR weather go no go calls are harder than they look". All original sections are still present.

## Keyword targets (from research/2026-09-30-safety-keywords.md/.csv)
- Primary: marginal vfr (720), scud running (590), vfr into imc (170), what is marginal vfr (170), inadvertent imc (70).
- Secondary: spatial disorientation aviation (880), what is spatial disorientation (880), graveyard spiral (1,900), low ceilings (90), special vfr minimums (320, one paragraph only).
- Skipped: "178 seconds to live" (210). There is no Tier 1 source for it, so it is not mentioned.
- Optional title and meta idea for Mark, not applied since the title comes from Soro: "VFR Weather Go/No-Go: Marginal VFR, VFR Into IMC and the 180 Turn".

## Sources (Tier 1). New saves are in /workspace/library/ga-safety/ (see SOURCES.md there)
1. FAA Cleared for Takeoff blog, "Silver Linings, Silver Bullets, and Other Fictions", last updated July 1, 2026 (new save).
2. AOPA ASI McSpadden Report, Figure 1.7.2, 2022 and 2023 data. This is the public data feed behind the figure, saved as JSON (new save).
3. FAA GA Safety Fact Sheet, May 1, 2025 (new save).
4. AWH FAA-H-8083-28B, sections 3.4.2.14 and 3.4.2.15.
5. 14 CFR 91.155 (the table was extracted from eCFR XML dated 2026-09-15 into ga-safety/text/cfr-91-155-table.txt).
6. RMH FAA-H-8083-2A, Ch 2.
7. AC 61-134, para 8 (the URL is the AC_61-134_Editorial_Update.pdf; the plain AC_61-134.pdf returns 404).
8. PHAK FAA-H-8083-25C, Ch 2, Fig 2-15.
9. AIM 7-6-7, 7-6-14 (Basic with Changes 1 to 3, 7/9/26).
10. AIM 8-1-5.
11. FAA Fly Safe, Spatial Disorientation (AFS-850 16-05).
12. AFH FAA-H-8083-3C, Ch 18, pp. 18-17 to 18-21.
13. FAA P-8740-52, "Tips for Survival", FAASafety.gov (new save).
14. AOPA ASI VFR into IMC Safety Syllabus, 2022 (new save).
15. IFH FAA-H-8083-15B, Ch 7 (standard rate bank rule of thumb).
16. 14 CFR 91.3.
17. 14 CFR 91.157.

## Source conflicts and handling
- **Bank angle for the 180.** AOPA ASI says "a 180-degree, standard-rate turn". The IFH rule of thumb puts standard rate at about 15° of bank at 100 kt. The AFH says no more than 10° for the untrained pilot. The page follows the AFH and says so in a visible note, advising the reader to agree the technique with a CFI.
- **Scope of the statistics.** The FAA figure (180 IMC-related GA accidents, 2014 to 2023, above 82% fatal) is not comparable with AOPA's (VFR into IMC, non-commercial fixed-wing, 10 of 10 fatal in 2022 and in 2023). A visible note says so.
- **FAA blog wording.** It says "over several years, the majority of accident pilots were instrument-rated" and also "the decade's average was about 55% lacking an instrument rating". The page quotes only the decade average.
- **Fact sheet cause names.** The research md paraphrased cause #5 as "unintended flight into IMC". The page uses the exact fact sheet wording, "Accidental Flight Into Bad Weather".
- **Where the AIM 180 guidance sits.** The AIM's "Execute a 180 degree turnaround" is in 7-6-14, the flat light, brown out and white out paragraph, and applies when all visual references are lost. The page says "when all visual references are lost". The general inadvertent-IMC 180 guidance is cited to FAA P-8740-52.
- **MVFR status.** FAA Fly Safe "Personal Minimums" (2015) calls MVFR a sub-category of VFR defined by regulation. AWH 28B (2026) says there are no Part 91 MVFR minimums and that categories are for situational awareness. The page follows the AWH.
- **Tier question.** Library aviation-weather/SOURCES.md classes AOPA ASI and FAASTeam as Tier 2. The request lists AOPA ASI as Tier 1, so this page follows the request.
- **Dash rule vs sources.** Several source sentences contain em dashes (AFH wings-level and bank guidance, the Fly Safe SD intro) or a minus sign (AIM 7-6-14(c)). These were paraphrased, not quoted.

## Help-center checks (product copy vs https://app.planewx.ai/help, fetched Sep 30, 2026)
Every product claim is backed by a /help page:
- WX Score bands and advisory status (wx-score).
- VFR defaults of 3,000 ft / 5 SM and "Your saved minimums always win" (wx-score).
- Switch to IFR (switch-to-ifr).
- FRAT opening 4 hours out, PAVE plus IMSAFE, and "Risks are stacking" at three or more factors (frat).
- "PlaneWX never recommends GO or NO-GO" (frat, risk-loop).
- Need Help Now within 2 hours; mentors are volunteer peers, not flight instructors, and see the same briefing (mentors).
- Self Debrief is Labs on Pro Plus (risk-loop).
- 123 AFD offices (forecast-office).
- VFR probability in Regional and Corridor Watch (regional-weather, corridor-watch).
- Not a substitute for an independent briefing (risk-loop).

"Fly or Stay" appears nowhere in /help, so it is used only as framing ("the one we think of as Fly or Stay"), never as a UI label. Standing Mentors is "coming soon" and is not claimed. Help-center inaccuracies are listed in the final report and in the PM build notes.

## Port note for the Principal Software Engineer
1. **Content lives in Soro, not the repo.** Article cc417c6d-d10f-4621-b305-387f0d4bf37c renders through `app/blog/[slug]/page.tsx` via `lib/soro.ts`. Replace the article body in Soro with `vfr-weather-go-no-go.html`, or the .md twin if the editor needs Markdown. Keep the slug and title.
2. **Invisible characters.** The HTML uses `&nbsp;` before each [n] cite, and U+2060 WORD JOINER between adjacent cites (for example [5]⁠[6]), so cites never start a line. Confirm Soro keeps both through paste and import. If it strips them, cites may wrap to the start of a line at 390 px.
3. **FAQ JSON-LD.** page.tsx emits BlogPosting only. Add a slug→FAQ map, for example `lib/blog-faq.ts` keyed by slug and loading `<slug>.faq.jsonld.json`. Render it as a second `<script type="application/ld+json">` only for slugs present in the map. The text must stay in sync with the visible FAQ.
4. **dateModified.** page.tsx has no dateModified. Add `dateModified: 2026-09-30`, or Soro's updatedAt if the API exposes it, to the BlogPosting JSON-LD. The visible "Last reviewed" line sits in the body copy.
5. **Learning Center links are not live.** `/learn/aviation-weather/{metar,taf,airmet-sigmet,pirep,weather-radar}` return 404 today. LC v1 (#113) routes `/learn/[slug]` (noindex; slugs mos-vs-nbm-vs-taf, tcf-vs-ecfp, what-the-wx-score-actually-is). Either ship the hub routes before publishing, add redirects, or remove the Learning Center paragraph in the mission section.
6. **Cache.** After updating Soro, revalidate the cached article; ISR uses tags `soro-article-content:<id>`.
7. **External links.** Cite links point straight to FAA, eCFR and AOPA URLs; all returned 200 from the box on Sep 30, except eCFR, which bot-gates the box (302 to unblock.federalregister.gov) and is a standard eCFR section URL. If the template adds rel/target to external links, nothing in the copy depends on it.
8. **No other code changes needed.** The body uses only tags the existing prose styles already handle.

## Verification
- build.py rule checks: 0 problems. The checks cover:
  - no U+2013, U+2014, U+2212, U+2012 or U+2015; no spaced-hyphen dashes;
  - none of the banned words or phrases from the request (the misspelled "via" plural, the old score name, and the briefing-certification phrasing);
  - Soro-only tags and attributes;
  - every source cited;
  - "Last reviewed" present;
  - no straight quotes left.
- Quotes and facts: every entry in the registry checks out against the saved source text (case-sensitive, whitespace and quote-style normalized). Every quoted span in the body is either in the registry or an original-post or whitelisted scare quote ("feel", "about 3.", "good enough," and so on).
- Layout (`_verify/layout_check_blog.py`, adapted from drafts/src/verify/layout_check.py, scoped to [itemprop=articleBody]) at 390, 620, 768 and 1280: no horizontal overflow, 0 clipped elements of 146, 0 cite groups at line start (52 groups, 55 cite elements), 0 cites breaking inside, 0 cite groups wider than their container. Raw results are in `_verify/layout-results.json`.
