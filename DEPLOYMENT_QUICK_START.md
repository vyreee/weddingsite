# 🚀 Quick Start: Deploy to Vercel

## Before You Deploy

### 1. Set Up Supabase (5 minutes)
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Wait for project to initialize
3. Go to SQL Editor → Run the contents of `SUPABASE_SCHEMA.sql`
4. Go to Project Settings → API → Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key

### 2. Generate Admin Password (1 minute)
1. Go to [bcrypt-generator.com](https://bcrypt-generator.com/)
2. Enter your password (or use default: `admin123`)
3. Set rounds to **10**
4. Copy the hash

---

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/wedding-site.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com/new)
   - Import your GitHub repository
   - Add environment variables (see below)
   - Click Deploy

3. **Add Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
   SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
   ADMIN_PASSWORD_HASH = your_bcrypt_hash
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables when prompted
# Or add them in the Vercel dashboard after deployment
```

---

## After Deployment

1. **Visit your site**: `https://your-project.vercel.app`
2. **Test booking flow**: `/book`
3. **Test admin dashboard**: `/admin` (password: what you set)
4. **Test calendar**: `/book/calendar`

---

## Add Your GCash QR Code (Optional)

1. Save your QR code as `public/gcash-qr.png`
2. Push to GitHub:
   ```bash
   git add public/gcash-qr.png
   git commit -m "Add GCash QR code"
   git push
   ```
3. Vercel will auto-deploy

---

## Update Your Site

Every time you push to GitHub, Vercel automatically rebuilds:

```bash
git add .
git commit -m "Your changes"
git push
```

---

## Important URLs

- **Your Site**: https://your-project.vercel.app
- **Admin Dashboard**: https://your-project.vercel.app/admin
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## Need More Help?

See `VERCEL_DEPLOYMENT.md` for detailed troubleshooting and advanced configuration.
