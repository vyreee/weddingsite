# Wedding Site Booking System - Setup Guide

This guide will help you set up the complete booking system with Supabase, Resend email notifications, and admin dashboard.

## 🎯 Features Implemented

### Customer-Facing Features
- ✅ **Multi-step booking wizard** (6 steps: Date Selection → Basic Info → Content Details → Review → Payment → Confirmation)
- ✅ **Interactive calendar** showing available, reserved, and booked dates
- ✅ **5-day minimum buffer** from booking date to launch date
- ✅ **45-day site duration** per booking
- ✅ **GCash payment** with receipt upload
- ✅ **Image upload instructions** for couple photos, venue photos, entourage, and extras
- ✅ **Google Drive integration** for photo uploads (manual folder sharing)

### Admin Features
- ✅ **Password-protected admin dashboard** at `/admin`
- ✅ **View all bookings** with detailed information
- ✅ **Change booking status** (Reserved → Booked → Cancelled)
- ✅ **View payment receipts**
- ✅ **Add Google Drive folder links** for each booking
- ✅ **Customer contact information** for manual email follow-up

---

## 📋 Prerequisites

Before you begin, make sure you have:
1. A Supabase account ([supabase.com](https://supabase.com))
2. Node.js and npm installed
3. This project cloned and dependencies installed

---

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name**: Wedding Site Bookings
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your location
4. Click **"Create new project"** and wait for it to initialize (~2 minutes)

### Step 2: Run Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `SUPABASE_SCHEMA.sql` in this project
4. Copy the entire contents and paste into the SQL Editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - this is correct!

### Step 3: Get Supabase API Keys

1. In Supabase, go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** → You'll use this as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → You'll use this as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → You'll use this as `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### Step 4: Create Environment Variables

1. In your project root, create a file named `.env.local`
2. Add the following (replace with your actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin Password (bcrypt hash)
# Default password is "admin123" - CHANGE THIS IN PRODUCTION!
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

### Step 5: Generate Admin Password Hash

The default password is `admin123`. To change it:

1. Go to [bcrypt-generator.com](https://bcrypt-generator.com/)
2. Enter your desired password
3. Set rounds to **10**
4. Click **"Generate"**
5. Copy the hash and replace `ADMIN_PASSWORD_HASH` in `.env.local`

### Step 6: Update GCash QR Code (Optional)

The payment step currently shows a placeholder. To add your real GCash QR code:

1. Save your GCash QR code image to `public/gcash-qr.png`
2. Open `src/components/booking/StepPayment.tsx`
3. Find the placeholder section (around line 85)
4. Replace the placeholder div with:
```tsx
<Image
  src="/gcash-qr.png"
  alt="GCash QR Code"
  width={256}
  height={256}
  className="rounded-lg shadow-md"
/>
```

---

## 🧪 Testing the System

### Test the Booking Flow

1. Start your development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000`
3. Click **"Book Your Date"**
4. Complete the booking wizard:
   - Select a date (must be 5+ days from today)
   - Fill in couple information
   - Add content details
   - Review your booking
   - Upload a test payment receipt
   - Submit the booking

### Test the Admin Dashboard

1. Visit `http://localhost:3000/admin`
2. Login with your admin password (default: `admin123`)
3. You should see your test booking with status "Reserved"
4. Click **"Confirm Payment"** to change status to "Booked"
5. Add a Google Drive folder link
6. View the payment receipt
7. Copy customer email to send manual confirmation

### Test the Calendar

1. Visit `http://localhost:3000/book/calendar`
2. You should see your booked date marked with 🟢
3. The entire 45-day period should be blocked

---

## 📧 Manual Email Workflow

When you confirm a booking in the admin dashboard, you'll need to manually email the customer. Here's what to include:

**Email Template:**
```
Subject: 🎉 Payment Confirmed - Your Wedding Website is Coming!

Dear [Groom Name] and [Bride Name],

Great news! We've confirmed your payment and are excited to start working on your beautiful wedding website.

What's Next?
• Timeline: Your website will be ready within 3 days
• Launch Date: [Launch Date]
• Site Duration: 45 days (until [End Date])

Image Upload Instructions:
Please upload your photos to this Google Drive folder: [Drive Link]

We need:
• Couple Photos: 3-5 photos for hero and about sections
• Venue Photos: 2-3 photos of ceremony and reception venues
• Entourage Photos: Optional wedding party photos
• Extra Photos: Any additional photos for the gallery

Thank you for choosing us to create your wedding website! 💍

Best regards,
LureDesigns Team

Questions? Contact us on Instagram @luredexigns or Facebook @luredexigns
```

**Tip**: You can copy the customer's email directly from the admin dashboard booking details.

---

## 🎨 Customization

### Change Buffer Days
Edit `src/lib/calendar-utils.ts`:
```typescript
const BUFFER_DAYS = 5; // Change to your preferred number
```

### Change Site Duration
Edit `src/lib/calendar-utils.ts`:
```typescript
const SITE_DURATION_DAYS = 45; // Change to your preferred number
```

### Modify Image Sections
Edit `src/types/booking.ts` and update the `IMAGE_SECTIONS` array.

### Customize Email Template
Edit `src/app/api/send-confirmation/route.ts` and modify the `emailHtml` variable.

---

## 🔒 Security Notes

1. **Never commit `.env.local`** to version control (it's already in `.gitignore`)
2. **Change the default admin password** before going live
3. **Use a strong database password** in Supabase
4. **Keep your service role key secret** - never expose it in client-side code
5. **Enable Row Level Security (RLS)** in Supabase (already configured in schema)

---

## 🚀 Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables in your hosting platform's settings
2. Change the admin password hash
3. Test the entire flow in production
4. Set up your email templates for manual customer communication

---

## 📊 Database Structure

### Bookings Table
- `id` - Unique booking ID
- `status` - reserved | booked | cancelled
- `launch_date` - When the site goes live
- `site_end_date` - When the site expires (launch + 45 days)
- `groom_name`, `bride_name` - Couple names
- `email`, `phone` - Contact information
- `wedding_date` - Actual wedding date
- `package` - Elegant or Custom
- `couple_story` - Their love story
- `venue_name`, `venue_address` - Venue details
- `ceremony_time`, `reception_time` - Event times
- `gcash_receipt_url` - Payment receipt image
- `drive_folder_url` - Google Drive folder for photos
- `payment_confirmed_at` - When payment was confirmed
- `special_requests` - Additional notes

---

## 🆘 Troubleshooting

### "Failed to fetch bookings"
- Check that your Supabase URL and anon key are correct in `.env.local`
- Make sure the database schema was run successfully
- Check browser console for detailed errors

### "Invalid password" in admin login
- Make sure your password hash is correct in `.env.local`
- Verify you're using bcrypt with 10 rounds
- Try the default password `admin123` to test

### Calendar not showing dates correctly
- Check that bookings are being fetched successfully
- Verify the date calculations in `calendar-utils.ts`
- Make sure your system date/time is correct

### Payment receipt not uploading
- Check that the image is under 5MB
- Verify the image format is supported (PNG, JPG, etc.)
- Check browser console for errors

---

## 📞 Support

For issues or questions:
- Check the browser console for errors
- Review the API route logs
- Check Supabase logs in the dashboard
- Verify all environment variables are set correctly

---

## ✅ Checklist

Before going live, make sure:
- [ ] Supabase project created and schema run
- [ ] All environment variables set in `.env.local`
- [ ] Admin password changed from default
- [ ] GCash QR code image added
- [ ] Test booking completed successfully
- [ ] Admin dashboard accessible and functional
- [ ] Email template prepared for manual customer communication
- [ ] Calendar showing dates correctly
- [ ] All environment variables added to hosting platform

---

**Congratulations! Your booking system is ready to use! 🎉**
