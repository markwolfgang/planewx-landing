# Brand content CHANGE log

## 2026-09-25 - Loop step rename: GO / NO-GO

- Locked rename: the loop step formerly called "Fly or Stay" is now **GO / NO-GO** (caps, spaces around the slash). The loop reads: WX Score briefing, FRAT, GO / NO-GO, Self Debrief (Mentor stays an optional layer).
- Updated `overview.md` loop title and PlaneWX-authored fly-or-stay prose to go / no-go; partner one-pager HTML/PDF regenerated. GO / NO-GO body: "Staying is legitimate. PlaneWX never recommends go or no-go. The pilot makes the call." Trademark tagline unchanged.
- Added `whitespace-nowrap` / `white-space: nowrap` on the loop step titles so **GO / NO-GO** does not wrap on /brand or the one-pager.
- Kept the approved debrief/FRAT association line ("Pilots who debrief a flight are about twice as likely to run a FRAT on the next one.") and the Avoid parenthetical "(the debrief/FRAT link is an association)".
- Locked proof labels: 8.7 is "how likely pilots are to recommend PlaneWX (1,724 responses)" (not NPS; not "average briefing feedback"); 5X5 is value "Up to 10%" + label "off 5X5 insurance with Pro Plus". Self Debrief body ends with "for that trip."
- Partner one-pager PDF/HTML public under middleware allowlist only (`/brand/planewx-partner-messaging.pdf` and `/brand/partner-one-pager/`); other `/brand` routes stay password-protected.

## 2026-09-24 - Avoid rule: habit compounds over time

- Rewrote the Say/Avoid habit bullet so it no longer contradicts the locked "instills professional-grade habits" line. New avoid text: Claiming the habit compounds over time, or causal stats (the debrief/FRAT link is an association). Updated overview.md and the partner one-pager HTML/PDF. Mission box unchanged.

## 2026-09-24 - Locked What is PlaneWX? line

- Replaced the /brand hero subtitle with Mark's locked line: PlaneWX is the decision support system for general aviation. It gives pilots professional-grade tools and instills professional-grade habits that make flying safer.
- Added the same line under the tagline on the partner one-pager and regenerated planewx-partner-messaging.pdf.

## 2026-09-24 - /brand hero subtitle + tools and habits

- Replaced the two /brand hero subtitles with one line: Professional-grade tools and habits for general aviation.
- Confirmed mission and one-pager already say professional-grade tools and habits (no PDF re-render needed).

## 2026-09-24 - One-pager download at top of /brand

- Moved the partner one-pager PDF download into the /brand page header so it is visible without scrolling on desktop and phone. Kept the lower download CTA under structural minimums.

## 2026-09-24 - Partner messaging sheet + brand overview

- Replaced the old three-part framing on `/brand` with the four-part Loop (Weather Briefing, FRAT, GO / NO-GO, Self Debrief) and Mentor as an optional layer alongside the loop.
- Updated tagline, positioning, mission, vision, structural minimums, public proof points, and Say/Avoid from the partner one-pager.
- Added download CTA for `/brand/planewx-partner-messaging.pdf`.
- Dropped the one-pager association line about debrief correlating with later FRAT use (hard rule: do not claim debrief feeds the next FRAT).
- Removed draft markings from the partner one-pager before publishing the PDF.


## 2026-09-20 - Content SoT migration

### Moved from `app/brand/*` (hardcoded TSX → `content/brand/`)

- Overview / positioning, product framing, mission/vision, problem-solution, pricing copy, safety stats framing, testimonials, founder blurb, audience hooks, key messaging, partner notes, social handles → `overview.md`
- Origin story, three problems, emotional reality, philosophy quotes, without/with table, mentoring origin, audience profiles → `why.md`
- We are / are not, voice attributes, tone by context, do/don't, quality checklist → `voice.md`
- Proprietary terms, terms to avoid, elevator pitches → `terminology.md`
- Social content themes, platforms, creator guide, FAQs, proof, never-say, community vision, enterprise use cases → `social.md`
- Color/typography labels, logo usage rules, image guidelines, brand format strings → `assets.md`

### Intentional brand-safe rewrites (Mark locks 2026-09-20)

Where the portal named ForeFlight / Garmin in competitive or "bash vs complement" framing, copy now uses **your EFB** / **Flight Service**. Complement-not-replace and PIC-owns-the-call framing preserved or clarified. Em dashes avoided in those rewritten passages only; existing story facts were not invented or changed.

### App docs deltas

Attempted to pull useful deltas from `markwolfgang/v0-planewx-v0` (`docs/PLANEWX-MASTER-REFERENCE.md`, `FOUNDER-NARRATIVE.md`, etc.) via `gh`. **Not accessible from this environment** (private repo / 404 for the agent token). No narrative facts were added from app docs. Follow-up: Sara or Mark can paste any missing locks into these files when reviewing the preview.

### 2026-09-20 - Mark preview copy locks

- Replaced stay-decision stat framing that used "confidence" with courage-to-stay wording (keep 90/80). Trademark tagline unchanged.
- Removed Traction paid-subscriber headcount card from public brand materials. No paid/paying subscriber counts on /brand.
- Expanded Founder on `/brand` (bio, Synoptic origin why, feedback cadence) plus Pilot Mark personal YouTube CTA. Full origin stays on `/brand/why`. Personal channel is Founder-only, not listed as an official PlaneWX account.
