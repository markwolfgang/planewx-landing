# Build notes: leave-early-or-wait-out-weather-vfr-cross-country (new post)

Built Oct 1, 2026 with `blog-new/_build/build.py`. Nothing pushed, published or messaged.

## Proposal
- **Slug:** `/blog/leave-early-or-wait-out-weather-vfr-cross-country`
- **Title (H1/meta title):** Leave Early or Wait Out the Weather on a VFR Cross-Country?
- **Meta description (152 chars):** Should you depart ahead of weather or wait for it to pass on a VFR cross-country? How to weigh TAF timing, fronts, fog, daylight, fuel and your way out.
- **Primary query:** "should I leave early or wait for weather on a VFR cross-country". Secondary: beat the weather / wait out a front, flying after a cold front passes, how long does a front take to pass, dawn departure fog, TEMPO/PROB30 timing.

## Structure
Last reviewed; answer paragraph; short answer (two h3 lists: leave early / wait); what each choice bets on; reading timing (h3: TAF, GFA, trend vs forecast); weather cases (h3: cold front, warm front, morning fog/stratus, afternoon convection, stationary front); constraints (h3: daylight, fuel, you); get-there-itis; building an out; side-by-side check (two h3 lists); mission-and-loop; FAQ (6); Sources (7). Soro-safe tags only.

## Numbers
All from sources, none invented: front speeds (AWH 11.3.1/11.3.2: warm 10-25 mph, cold 25-30 mph, extreme up to 60 mph); TAF 5 SM scope and 24/30-hour periods (AWH 27.4/27.4.1); TEMPO >50%, ≤1 hour each, < half the period (AWH 27.4.2.10.2); PROB30 = 30% (27.4.2.10.3); 91.151 30/45 minutes; "up to two days" for the warm front (PHAK Ch 12 example); +500 ft ceiling for fatigue (RMH Figure 2-9); Flight Window Explorer ±1/2/3 h and 75% threshold (help). The "1, 2 and 3 hours" and "7 AM vs 10 AM" are product behavior / a generic illustration, not statistics.

## Sources (all Tier 1)
1. AWH FAA-H-8083-28B (Ch 11 fronts, 13.6.4 popcorn convection, Ch 18 fog/stratus, 27.4 TAF, 28.2 GFA). 2. PHAK FAA-H-8083-25C (Ch 2 ADM/operational pitfalls, Ch 12 flights toward warm and cold fronts, Ch 13 outlook briefing). 3. AFH FAA-H-8083-3C (Ch 2 risk assessment/mitigation, Ch 11 night, Ch 18 precautionary landing). 4. RMH FAA-H-8083-2A (Ch 2, 3, 5, 8). 5. 14 CFR 91.103. 6. 14 CFR 91.151. 7. 14 CFR 91.3. All URLs return 200.
- AC 00-45 not cited: AC 00-45H is cancelled and its content moved into the AWH (FAA-H-8083-28B), which is cited instead. The build bans citing cancelled ACs.
- Quote registry: `_build/leave-early-or-wait-out-weather-vfr-cross-country.quotes.json`, 72 entries, 72/72 verified against saved source text; 40 quoted spans, all in the registry.

## Overlap with weather-windows-for-small-aircraft (flagged as asked)
That post is about finding a usable window days ahead: what a window is, mission first, trend before details, how far ahead you can plan, and National/Regional/Corridor Watch. This post is the same-day "leave now or wait" decision: which way the weather is moving relative to you, TAF change groups, how each weather type behaves before and after it passes, daylight/fuel/fatigue cost of waiting, get-there-itis, and building an out. Shared ground is small: both say to read the trend and both mention PlaneWX. To keep them apart, this post links to weather-windows in paragraph 2 for multi-day planning, does not mention National/Regional/Corridor Watch, and uses Flight Window Explorer (same-day departure slots) as its product example. No shared H2s. Also checked live: `signs-a-trip-needs-rescheduling`, `cross-country-dispatch-decisions`, `how-to-plan-alternate-airports-early`, `guide-to-forecast-updates-before-departure`. All are pre-departure planning or rescheduling posts with a different intent; no title or meta overlap with "leave early or wait".

## Internal links
Blog: weather-windows-for-small-aircraft, personal-minimums-weather-planning (200). Help: flight-window-explorer, wx-score, personal-minimums, frat, mentors, self-debrief (200). Learning Center: /learn/aviation-weather/taf, /metar, /airmet-sigmet, /weather-radar (404 today, same set as the expands; drop them if the post ships before the hubs). Suggested reciprocal: one sentence in weather-windows-for-small-aircraft ("When the day comes and you are deciding whether to go now or wait, see …").

## Product claims (help snapshot Oct 1, 2026)
Flight Window Explorer: Beta, all plans; appears when the briefing scores below 75%; 7 departure-time slots (planned ±1/2/3 h) and 7 altitude slots; Favorable/Marginal/Unfavorable colors are deterministic estimates; generate a full briefing for the real WX Score; Update Trip to this time. WX Score bands and 0%; FRAT within 4 hours with an explicit get-there-itis item in External; Need Help Now within 2 hours; Self Debrief Labs on Pro Plus. Fly or Stay stays the pilot's; PIC quoted from 91.3. "Go/no-go" not used.

## Typography and checks
Same typography pass as the IFR post (U+2011 doc numbers, `14&nbsp;CFR`, nbsp in number+unit including mph, SM, percent). build.py 0 problems; no U+2013/2014; 0 straight quotes in visible text; no "vias". Words 3,489 total (3,369 without Sources). FAQ 6. layout_check_blog.py 390/620/768/1280: 0 problems (0 clipped of 126, 0 cite line starts).
