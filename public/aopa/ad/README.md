# PlaneWX × AOPA.org HTML5 expandable ad

**Unit:** 300×250 Medium Rectangle, expandable to 600×250  
**Tagline:** Fly like it's your job.  
**Click URL (clickTag default):** https://www.planewx.ai/?variant=a&ref=AOPA-DISPLAY-OCT26&utm_source=aopa&utm_medium=display&utm_campaign=oct2026  

**Creative:** Both faces are the approved static JPEGs (no hand-built HTML/CSS text, logos, or stripes).  
**Backup image:** `backup.jpg` (collapsed 300×250 JPEG)  
**Send to:** pilot.ads@aopa.org (at least 5 business days before launch)  
**Booking:** AOPA.org ROS · Oct-Dec 2026 · see `../ads/SPECS.txt`

## Files

| File | Role |
|------|------|
| `index.html` | GAM HTML5 creative (inline CSS/JS; faces via relative JPEG paths + srcset) |
| `assets/collapsed.jpg` | Collapsed face 300×250 (1x) |
| `assets/collapsed@2x.jpg` | Collapsed face @2x |
| `assets/expanded.jpg` | Expanded face 600×250 (1x) |
| `assets/expanded@2x.jpg` | Expanded face @2x |
| `backup.jpg` | Non-HTML5 / backup image (same as collapsed 300×250) |
| `single-file.html` | Embed copy: same HTML with absolute `https://www.planewx.ai/aopa/ads/...` image URLs |

Rebuild the zip and single-file HTML from the repo root:

```bash
npm run build:aopa-ad
```

Output zip (index.html at zip root, JPEGs bundled with relative paths): `/aopa/planewx-aopa-html5-300x250-expand-600x250.zip`

## Expand behavior

- **Direction: right.** Expands rightward from a left-anchored 300×250 to 600×250. The `#ad` container grows from 300 to 600 wide with `overflow: hidden`; the expanded JPEG sits at x=0 and is revealed in place (its left 300px lines up with the collapsed art). A short collapsed-face fade (under 150 ms) runs at full width so no intermediate re-layout appears.
- **Preload:** Both faces (1x and @2x) preload before expand is enabled.
- **User-initiated:** expands on hover (desktop) or via click/tap when hosted with `?demo=1`. The whole unit click fires `clickTag` via `window.open(clickTag)`.
- **Close control:** small × in the top-right of the expanded unit (navy corner of the 5X5 half), clear of lettering; collapses without firing `clickTag`.
- **Collapsed size never exceeds 300×250** (`overflow: hidden` on `#ad`).
- **z-index:** collapsed `100` (within 0-4,999); expanded `50000` (within 5,000-1,999,999).

## GAM / AOPA notes (needs publisher confirm)

Expanding beyond the reserved 300×250 slot **typically requires AOPA/GAM to enable an expandable / pushdown / custom creative template** that allows the creative to paint outside the original iframe bounds (or to use a Friendly IFrame / expanding API).

If expansion is not enabled:

- Serve this creative as a **collapsed-only 300×250**, or
- Use `backup.jpg` as the static backup, or
- Ask AOPA whether they can build the expand from the static JPG pair in `../ads/`.

Confirm with AOPA:

1. Expandable template / multi-size / custom creative support for 300 to 600 right expand  
2. Whether Friendly IFrame or Expanding API is required  
3. Final click tracking wrapper (they may rewrite `clickTag`)

## Spec checklist (AOPA Sep 15 / GAM HTML5)

- [x] `<meta name="ad.size" content="width=300,height=250">`
- [x] `var clickTag = "https://www.planewx.ai/?variant=a&ref=AOPA-DISPLAY-OCT26&utm_source=aopa&utm_medium=display&utm_campaign=oct2026"` + `window.open(clickTag)` on unit click
- [x] 300×250 expandable to 600×250, user-initiated, visible close
- [x] Collapsed never exceeds 300×250
- [x] Faces are approved static JPEGs with srcset (1x, 2x); no hand-built face art
- [x] Animation ≤ 15s then stops (width transition ~220 ms; fade ≤120 ms)
- [x] z-index bands as above
- [x] No audio
- [x] 1px `#BFDBFE` border on all edges (both states)
- [x] Backup image `backup.jpg` (collapsed JPEG)
- [x] No external network requests in the GAM zip (relative assets; system fonts only)
- [x] Initial load target under 150KB (see build script size report)

## Demo query params (planewx.ai host only)

| Param | Effect |
|-------|--------|
| `?demo=1` | Click/tap expands instead of navigating; used by `/aopa/ad-kit` iframe |

## Contact

pilot.ads@aopa.org · mark@planewx.ai
