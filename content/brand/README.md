# Brand content (Sara-facing marketing SoT)

This is the Sara-facing marketing source of truth for PlaneWX tone, story, terminology, and product framing.

**Edit these files when messaging changes.** The Brand Portal at `/brand` (password-gated, `noindex`) renders from this folder. Changes deploy from `main`.

| File | Portal page |
|------|-------------|
| `overview.md` | `/brand` |
| `why.md` | `/brand/why` |
| `voice.md` | `/brand/voice` |
| `terminology.md` | `/brand/terminology` |
| `social.md` | `/brand/social` |
| `assets.md` | `/brand/assets` |

## How to edit

1. Open the relevant `.md` file.
2. Update YAML frontmatter fields (headlines, body copy, lists, tables).
3. Keep layout/design in `app/brand/*` — only prose and structured messaging live here.
4. Use `{{stats.totalPilots}}` (and other `STATS` keys) when you need live community numbers.
5. Open a PR; Mark reviews via the preview URL.

## What this is not

- **Not Notion.** Do not maintain a parallel brand bible elsewhere.
- **Not the app repo docs.** Files like `PLANEWX-MASTER-REFERENCE.md` / `FOUNDER-NARRATIVE.md` in the product app may still exist for engineering/product context. They are **not** the Sara-facing marketing SoT. Prefer updating `content/brand/` here when messaging changes.

## Brand locks (Mark, 2026-09-20)

- Never name specific EFB brands in marketing prose. Say **your EFB** / **Flight Service**.
- PlaneWX **complements**, does not replace, existing tools.
- **PIC owns** the go/no-go decision.
- Prefer no em dashes in newly rewritten marketing prose.
