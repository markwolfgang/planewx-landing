# Build notes: ifr-personal-minimums-low-time-instrument-pilots (new post)

Built Oct 1, 2026 with `blog-new/_build/build.py` (a copy of the expands build with extra sources, a typography pass and extra banned patterns). Nothing pushed, published or messaged.

## Proposal
- **Slug:** `/blog/ifr-personal-minimums-low-time-instrument-pilots`
- **Title (H1/meta title):** IFR Personal Minimums for Low-Time Instrument Pilots
- **Meta description (156 chars):** How a newly rated instrument pilot sets IFR personal minimums above the legal ones for ceiling, approach type, wind, ice and storms, and when to lower them.
- **Primary query:** IFR personal minimums for new / low-time instrument pilots. Secondary: legal vs personal IFR minimums, precision vs non-precision personal minimums, IFR currency vs proficiency, when to lower personal minimums.

## Structure
Last reviewed line; answer paragraph; short-answer list; legal vs personal (legal Part 91 baseline list); why low time changes the numbers; how to set each minimum (h3s: ceiling/visibility, approach type, takeoff, alternates and fuel, wind, ice, thunderstorms, currency); FAA-method example worksheet; stepping down; using them on the day; mission-and-loop section; FAQ (6); Sources (11). Soro-safe tags only (p, h2, h3, ul, ol, li, strong, em, a).

## Numbers and the example worksheet
No invented numbers. Every number is regulatory (61.57, 91.167, 91.169, 91.175) or an FAA sample:
- Baseline 800 ft / 1 mile day, 999 ft / 3 miles night, LIFR left blank: RMH FAA-H-8083-2A Figure 2-4.
- Wind 10 kt / 5 kt gust / 7 kt crosswind (SE column): RMH Figure 2-6, labeled "one sample pilot's numbers, not a recommendation".
- Adjustments (+500 ft ceiling, +1/2 mile, +500 ft runway, -5 kt wind): RMH Figure 2-9.
- Night cross-country to unfamiliar airport after a full workday: +1,000 ft, +1 mile, +1,000 ft runway: RMH text after Figure 2-9. The 999 ft + 1,000 ft = 1,999 ft and 3 + 1 = 4 miles is plain arithmetic on those FAA values, shown as Step 3.
- +500 ft for a pilot four months past her last proficiency event: RMH Chapter 5 case study.
- Stabilized height 1,000 ft above airport/TDZE in IMC: AC 61-134 paragraph 9.
- 20 mile thunderstorm avoidance: AWH 22.8.2.
- Blank worksheet lines (______) are for the reader's own values.
- "Significant positive event" examples are labeled "In our reading"; the checklist does not define the term.

## Legal vs personal
Kept separate throughout: the legal baseline is its own h3 list; every personal value is framed as above it. 91.175(f) is described accurately (applies to Parts 121/125/129/135), so "Part 91 sets no takeoff minimums for most private IFR flights".

## Sources (all Tier 1)
1. FAA-P-8740-56 Personal Minimums Checklist. 2. RMH FAA-H-8083-2A (Ch 2, 3, 5). 3. IFH FAA-H-8083-15B (Intro, Ch 10). 4. IPH FAA-H-8083-16B (Ch 4). 5. 14 CFR 61.57(c)/(d), fetched from eCFR today into `library/docs/ecfr-14-cfr-part-61/text/61-57-recent-flight-experience-pic.txt`. 6. 14 CFR 91.169. 7. 14 CFR 91.167. 8. 14 CFR 91.175. 9. AC 61-134 para 9. 10. AWH FAA-H-8083-28B 22.8.2. 11. 14 CFR 91.3. All URLs return 200.
Quote registry: `_build/ifr-personal-minimums-low-time-instrument-pilots.quotes.json`, 85 entries, 85/85 verified against the saved source text; 37 quoted spans in the body, all in the registry.

## Cannibalization
- Parent `personal-minimums-weather-planning` already has an "IFR personal minimums" subsection and ranks for the general term. This post avoids the generic phrase as a title; title/meta/H2s target the low-time / newly rated intent, approach-type splits, currency vs proficiency, and stepping down. It links up to the parent in paragraph 2 and leaves the VFR table and full checklist walkthrough to it. Suggest adding a reciprocal link from the parent's IFR subsection (one sentence; not done, parent was out of scope for this ask).
- Checked live titles: `weather-workflow-for-instrument-pilots`, `what-weather-trends-matter-for-ifr-departures`, `single-pilot-ifr-planning-example`, `how-to-set-weather-based-flight-thresholds`, `how-to-customize-pilot-weather-thresholds`. None targets IFR personal minimums for new instrument pilots; the first two are linked as next reads.

## Internal links
Blog: personal-minimums-weather-planning, weather-workflow-for-instrument-pilots, what-weather-trends-matter-for-ifr-departures (all 200). Help: personal-minimums, wx-score, switch-to-ifr, frat, mentors, self-debrief (all 200). Learning Center: /learn/aviation-weather/taf, /icing, /weather-radar. These 3 return 404 today, same as in the three expands (they go live with the hub pages); drop them if the post ships first.

## Product claims (help snapshot Oct 1, 2026, `_src/help/`)
Comfort (soft) / Max (hard) for icing, turbulence, crosswind, ceiling, visibility, storm avoidance; airport-specific ceiling/visibility/crosswind for up to 25 airports; more restrictive of aircraft/personal used; WX Score bands 75+/50-74/<50, 0% on hard limit, advisory; Switch to IFR re-scores under IFR minimums, ice/turbulence/convection still count, asterisk = PlaneWX assumes instrument currency and does not check; FRAT within 4 hours, IMSAFE, instrument currency needs confirm (holds not logged); Need Help Now within 2 hours, mentor sees same briefing/WX Score/minimums; Self Debrief is Labs on Pro Plus. Fly or Stay stays the pilot's; PIC stays PIC (91.3 quoted).

## Typography
U+2011 in all FAA doc numbers (FAA‑P‑8740‑56, FAA‑H‑8083‑2A/15B/16B/28B, AC 61‑134), `AC&nbsp;61&#8209;134`, `14&nbsp;CFR&nbsp;…`, nbsp in number+unit pairs (ft, miles, statute miles, knots, hour(s), minutes, mph, percent). Done by `typo()` in build.py on text outside tags, so hrefs are untouched. "Figure 2-4"/"2-9" keep a normal hyphen (figure numbers, inside verified quotes).

## Checks
- build.py: 0 problems (dash, "vias", banned patterns incl. WX Score casing, "Favourable", doc number without U+2011, 14 CFR without nbsp, number+unit without nbsp; Soro tags; every source cited; Last reviewed; no straight quotes).
- No U+2013/U+2014 in .html/.md/.faq.jsonld.json; 0 straight quotes or apostrophes in visible text; "go/no-go" not used.
- Words: 3,495 total (3,372 without the Sources list). FAQ: 6.
- layout_check_blog.py at 390/620/768/1280: 0 problems (0 overflow, 0 clipped of 135, 0 cite line starts).

## Build fix found while building (affects all blog builds)
build.py collapsed every `>\s+<`, which deleted the space in `</strong> <a …>` ("A look back.Self Debrief"). Now only whitespace containing a newline is collapsed. The same bug was live in the PAVE and personal-minimums expands; fixed in `blog-expands/_build/build.py` too (see their r11 notes).
