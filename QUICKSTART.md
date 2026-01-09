# Quick Start Guide

## 1. Install Dependencies

```bash
cd /Users/mwolfgang/PlaneWX-latest/planewx-landing
npm install
```

## 2. Set Up Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Supabase credentials from your main PlaneWX app:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Run Database Migration

The waitlist table needs to be created in your Supabase database. The migration file is in your main app:

**Location:** `v0-planewx-v0-1/supabase/migrations/create_waitlist_table.sql`

**To apply:**
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `create_waitlist_table.sql`
4. Run the query

## 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 5. Deploy to Vercel

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

4. Configure domain:
   - In Vercel project settings → Domains
   - Add `www.planewx.ai` (or your preferred domain)

## Project Structure

```
planewx-landing/
├── app/
│   ├── api/waitlist/join/    # Waitlist API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page route
├── components/
│   ├── landing-page.tsx       # Main landing component
│   └── ui/                    # Reusable UI components
└── lib/
    └── utils.ts               # Utility functions
```

## Notes

- This app uses the **same Supabase database** as your main PlaneWX app
- The waitlist table stores signups that can be managed from your main app's admin panel
- The landing page is completely independent and can be deployed separately



