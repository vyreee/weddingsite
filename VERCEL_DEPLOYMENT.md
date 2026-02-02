# Vercel Deployment Guide

This guide will help you deploy your wedding booking system to Vercel.

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:
- [ ] Supabase project created and schema run
- [ ] Admin password hash generated
- [ ] GCash QR code ready (optional, can add later)
- [ ] All environment variables ready

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Wedding booking system"
```

2. **Push to GitHub** (or GitLab/Bitbucket):
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/wedding-site.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js - keep the default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

Before deploying, add your environment variables in Vercel:

1. In the project setup screen, expand **"Environment Variables"**
2. Add each variable (one at a time):

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_anon_key_here

SUPABASE_SERVICE_ROLE_KEY
Value: your_service_role_key_here

ADMIN_PASSWORD_HASH
Value: your_bcrypt_hash_here
```

3. Make sure all variables are set for **Production**, **Preview**, and **Development** environments

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

---

## 🧪 Post-Deployment Testing

After deployment, test everything:

### Test the Main Site
1. Visit your Vercel URL
2. Check that the homepage loads correctly
3. Click **"Book Your Date"** and **"View Calendar"**

### Test the Booking Flow
1. Go to `/book`
2. Complete a test booking:
   - Select a date
   - Fill in all information
   - Upload a test receipt
   - Submit the booking
3. Verify you see the confirmation screen

### Test the Admin Dashboard
1. Go to `/admin`
2. Login with your admin password
3. Verify you can see the test booking
4. Try confirming the payment
5. Add a Google Drive folder link

### Test the Calendar
1. Go to `/book/calendar`
2. Verify your test booking shows as booked (🟢)
3. Check that dates are blocked correctly

---

## 🔧 Common Deployment Issues

### Build Fails with TypeScript Errors
- Check that all TypeScript errors are resolved locally first
- Run `npm run build` locally to catch errors before deploying

### Environment Variables Not Working
- Make sure you added them in Vercel dashboard
- Check for typos in variable names
- Redeploy after adding/updating variables

### Supabase Connection Fails
- Verify your Supabase URL and keys are correct
- Check that your Supabase project is active
- Make sure RLS policies are enabled (from schema)

### Images Not Loading
- Ensure images are in the `public` folder
- Check that image paths are correct (e.g., `/gcash-qr.png`)
- Vercel serves files from `public` at the root URL

---

## 🎨 Custom Domain (Optional)

To use your own domain:

1. In Vercel dashboard, go to **Settings > Domains**
2. Add your domain (e.g., `weddingsite.com`)
3. Follow Vercel's instructions to update your DNS settings
4. Wait for DNS propagation (~24 hours)

---

## 🔄 Updating Your Site

After deployment, to push updates:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically rebuild and redeploy your site.

---

## 📊 Monitoring

### View Logs
1. Go to your project in Vercel dashboard
2. Click **"Deployments"**
3. Click on a deployment to see build logs
4. Click **"Functions"** to see API route logs

### Check Analytics
- Vercel provides basic analytics in the dashboard
- Monitor page views, performance, and errors

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to Git (already in `.gitignore`)
2. **Rotate your admin password** periodically
3. **Monitor your Supabase usage** to avoid hitting free tier limits
4. **Keep dependencies updated**: `npm audit` and `npm update`
5. **Use Vercel's preview deployments** to test changes before production

---

## 💰 Cost Considerations

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics

### Supabase Free Tier Includes:
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth

**Both should be sufficient for a wedding booking site!**

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### API routes returning 500 errors
- Check Vercel function logs
- Verify environment variables are set
- Test API routes locally first

### Database connection issues
- Check Supabase project status
- Verify service role key is correct
- Check if you've hit free tier limits

---

## ✅ Final Checklist

Before going live:
- [ ] All environment variables added to Vercel
- [ ] Test booking completed successfully
- [ ] Admin dashboard accessible and working
- [ ] Calendar showing dates correctly
- [ ] Payment receipt upload working
- [ ] GCash QR code added (or placeholder noted)
- [ ] Admin password changed from default
- [ ] Email template prepared for customer communication
- [ ] Test on mobile devices
- [ ] Share the URL with a friend to test

---

## 🎉 You're Live!

Once everything is tested and working:
1. Share your booking site URL with potential customers
2. Monitor bookings in the admin dashboard
3. Send manual confirmation emails when payments are verified
4. Create Google Drive folders for each booking

**Your wedding booking system is now live on Vercel! 🚀**

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Bcrypt Generator**: https://bcrypt-generator.com/
- **Your Site**: https://your-project.vercel.app
- **Admin Dashboard**: https://your-project.vercel.app/admin

---

**Need help?** Check the Vercel documentation or Supabase docs for more detailed troubleshooting.
