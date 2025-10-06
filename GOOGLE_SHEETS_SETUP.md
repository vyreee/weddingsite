# Google Sheets Form Integration Setup

This guide will help you connect the contact form to Google Sheets **securely**.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding Site Inquiries" (or any name you prefer)
4. **IMPORTANT - Keep it PRIVATE**: Do NOT share this sheet with anyone. Only you should have access.
5. Create the following column headers in Row 1:
   - `Timestamp`
   - `Name`
   - `Email`
   - `Phone`
   - `Wedding Date`
   - `Package`
   - `Message`

### 🔒 Security Note
Your Google Sheet will remain **completely private**. Only the Apps Script has permission to write to it. Nobody can view or access your sheet unless you explicitly share it with them.

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Security: Only accept POST requests
    if (!e || !e.postData) {
      throw new Error('Invalid request');
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Basic validation - ensure required fields are present
    if (!data.name || !data.email) {
      throw new Error('Missing required fields');
    }
    
    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }
    
    // Sanitize data to prevent injection
    const sanitize = (text) => {
      if (!text) return '';
      return String(text).trim().substring(0, 1000); // Limit length
    };
    
    // Create a new row with sanitized data
    const timestamp = new Date(data.timestamp || new Date());
    const row = [
      timestamp,
      sanitize(data.name),
      sanitize(data.email),
      sanitize(data.phone),
      sanitize(data.weddingDate),
      sanitize(data.package),
      sanitize(data.message)
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Optional: Send email notification to yourself
    // Uncomment and replace with your email
    /*
    MailApp.sendEmail({
      to: 'YOUR_EMAIL@example.com',
      subject: `New Wedding Inquiry from ${sanitize(data.name)}`,
      body: `
New inquiry received:

Name: ${sanitize(data.name)}
Email: ${sanitize(data.email)}
Phone: ${sanitize(data.phone)}
Wedding Date: ${sanitize(data.weddingDate)}
Package: ${sanitize(data.package)}
Message: ${sanitize(data.message)}

Submitted: ${timestamp}
      `
    });
    */
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);
    
    // Return error response (don't expose internal details)
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': 'Submission failed' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function testDoPost() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    phone: '+63 912 345 6789',
    weddingDate: '2025-06-15',
    package: 'Luxury',
    message: 'This is a test inquiry'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

4. Click the **Save** icon (💾) and name your project "Wedding Form Handler"

## Step 3: Deploy the Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Wedding form submission handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Review permissions and click **Authorize access**
7. Sign in with your Google account
8. Click **Advanced** > **Go to [Project Name] (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/XXXXX/exec`)

## Step 4: Update Your React Component

1. Open `src/components/sections/ContactFormSection.tsx`
2. Find this line:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web App URL
4. Save the file

## Step 5: Test the Form

1. Run your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your Google Sheet - a new row should appear with the submitted data

## 🔒 Security Features Implemented

### Client-Side Protection (React Form)
1. **Honeypot Field**: Hidden field that only bots will fill out
2. **Time-Based Validation**: Prevents instant form submissions (< 3 seconds)
3. **Form Validation**: Required fields and email format validation

### Server-Side Protection (Apps Script)
1. **Request Validation**: Only accepts valid POST requests
2. **Email Validation**: Regex check for valid email format
3. **Data Sanitization**: Trims and limits input length (max 1000 chars)
4. **Error Handling**: Doesn't expose internal errors to users
5. **Private Sheet**: Your Google Sheet remains completely private

### Privacy & Data Security
- ✅ Google Sheet is **not** publicly accessible
- ✅ Only your Apps Script can write to the sheet
- ✅ No one can read or view the sheet without your permission
- ✅ All form data is validated and sanitized
- ✅ Bot submissions are blocked automatically

## Troubleshooting

### Form doesn't submit
- Make sure the Web App URL is correct
- Check that the Web App is set to "Anyone" can access
- Look at browser console for errors

### Data not appearing in sheet
- Run the `testDoPost()` function in Apps Script to test
- Check Apps Script execution logs (View > Logs)
- Make sure column headers match exactly

### CORS errors
- The form uses `mode: "no-cors"` to bypass CORS issues
- This is normal for Google Apps Script web apps

## Email Notifications (Optional)

To receive instant email notifications when someone submits the form:

1. In your Apps Script code, find the commented section that starts with `// Optional: Send email notification`
2. Uncomment the `MailApp.sendEmail` block
3. Replace `'YOUR_EMAIL@example.com'` with your actual email address
4. Save and redeploy the Apps Script

You'll now receive an email every time someone fills out the contact form!

## Your Workflow After Form Submission

When a client submits the form, here's your process:

1. ✅ **Check Google Sheet** - New inquiry appears automatically
2. 📧 **Contact Client** - Reach out within 24 hours via email/phone
3. 📁 **Send Google Drive Folder** - For them to upload wedding photos
4. 📋 **Send Details Form** - Collect website copy, colors, preferences
5. 🎨 **Create Demo Site** - Build their wedding website
6. 💰 **Send Payment Info** - After demo approval
7. 🚀 **Launch Site** - Once payment is confirmed

The success message on the form already explains this workflow to clients!

## Alternative: Using SheetDB (Easier but Paid)

If you prefer a simpler solution:

1. Go to [SheetDB.io](https://sheetdb.io)
2. Connect your Google Sheet
3. Get your API endpoint
4. Update the form to use SheetDB's API instead

## Need Help?

- Google Apps Script Documentation: https://developers.google.com/apps-script
- SheetDB Documentation: https://docs.sheetdb.io
