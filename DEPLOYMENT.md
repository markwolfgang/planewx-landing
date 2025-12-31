# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository:
   - Name: `planewx-landing` (or your preferred name)
   - Description: "Landing page for PlaneWX with waitlist signup"
   - Visibility: Private (recommended) or Public
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in the `planewx-landing` directory:

```bash
cd /Users/mwolfgang/PlaneWX-latest/planewx-landing

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/planewx-landing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`planewx-landing`)
4. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (recommended)
6. Click "Deploy"

## Step 4: Configure Domain

1. In Vercel project settings → Domains
2. Add your domain: `www.planewx.ai` (or your preferred domain)
3. Follow Vercel's DNS configuration instructions
4. Update your DNS records as instructed

## Step 5: Verify Database Migration

Make sure the waitlist table exists in your Supabase database:

1. Go to Supabase Dashboard → SQL Editor
2. Run the migration from: `v0-planewx-v0-1/supabase/migrations/create_waitlist_table.sql`
3. Or run the fix script: `fix-waitlist-rls.sql` if you prefer using anon key

## Testing

After deployment:
1. Visit your domain (e.g., `www.planewx.ai`)
2. Test the waitlist form
3. Check Supabase Dashboard → Table Editor → `waitlist` to see entries

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Recommended (for waitlist API)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Troubleshooting

### RLS Policy Errors
- If you see RLS errors, use the service role key (recommended)
- Or run `fix-waitlist-rls.sql` in Supabase SQL Editor

### Build Errors
- Make sure all dependencies are in `package.json`
- Check that TypeScript compiles: `npm run build`

### Domain Issues
- DNS changes can take up to 48 hours to propagate
- Use Vercel's domain verification tool

