# PlaneWX Landing Page

A standalone Next.js landing page for PlaneWX with waitlist signup functionality.

## Brand Portal (Sara-facing marketing SoT)

The password-gated Brand Portal at `/brand` is the **Sara-facing marketing source of truth** for tone, story, terminology, and product framing. Prose lives in `content/brand/` and deploys from `main`.

App-repo docs (for example `PLANEWX-MASTER-REFERENCE.md` in the product app) may still exist for engineering/product context. **They are not the Sara-facing marketing SoT.** Edit `content/brand/` here when messaging changes. See `content/brand/README.md`.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

3. **Run the database migration:**
   
   Apply the waitlist table migration from the main PlaneWX app:
   - File: `supabase/migrations/create_waitlist_table.sql`
   - Apply it via Supabase Dashboard → SQL Editor

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Deployment

### Vercel

1. Push this repository to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The landing page will be available at your configured domain (e.g., `www.planewx.ai`).


## Blog (Soro) revalidation

Blog posts are fetched from Soro (`lib/soro.ts`) with ISR (`revalidate = 3600`).

After publishing a new Soro article, purge caches so the slug page cannot keep a sticky 404:

```bash
# Set REVALIDATE_SECRET in Vercel (falls back to WAITLIST_ADMIN_SECRET if unset)
curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"slug":"your-new-slug"}' \
  https://www.planewx.ai/api/revalidate
```

Slug pages also refetch the Soro list with `cache: "no-store"` when a slug is missing from the hour-long list cache, and confirmed misses are not ISR-cached for an hour.

## Features

- Beautiful landing page with PlaneWX branding
- Waitlist signup form
- Email validation
- Optional home airport and flight frequency collection
- Success/error state handling
- Responsive design
- Dark mode support

## Database

This app uses the same Supabase database as the main PlaneWX app. The waitlist table stores:
- Email (required, unique)
- Home airport (optional, ICAO code)
- Cross-country flights per week (optional)
- Timestamps for created_at, approved_at, signed_up_at

## Project Structure

```
planewx-landing/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── join/          # Waitlist signup API
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── landing-page.tsx       # Main landing page component
│   └── ui/                    # Reusable UI components
└── lib/
    └── utils.ts               # Utility functions
```



