# Email Notifications Setup Guide

## What Was Implemented

I've successfully added email notification functionality to your admin panel. Here's what's included:

### ✅ Features Added

1. **Email Notifications for New Leads**
   - Automatic email alerts when someone submits the contact form
   - Beautiful HTML email templates with UnGone branding
   - Dynamic content based on lead type (Contact vs Audit Request)

2. **Admin Settings Page** (`/admin/settings`)
   - Toggle to enable/disable email notifications
   - Configurable notification email address
   - Test email functionality to verify setup

3. **Database Configuration**
   - New `admin_settings` table for storing preferences
   - Default notification email set to `ungoneofficial@gmail.com`
   - Notifications enabled by default

4. **Email Template Features**
   - Professional gradient header
   - Lead information formatted in a clean table
   - Direct link to admin panel
   - Responsive design
   - Branded with UnGone colors

## Setup Instructions

### 1. Configure Resend API Key

Add your Resend API key to your `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

**How to get a Resend API Key:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and add to `.env.local`

### 2. Apply Database Schema Changes

Run the following SQL in your Supabase SQL Editor (located in `supabase/schema.sql`):

```sql
-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow service role full access on admin_settings" 
ON admin_settings FOR ALL 
USING (true);

-- Insert default settings
INSERT INTO admin_settings (key, value) 
VALUES ('notification_email', 'ungoneofficial@gmail.com')
ON CONFLICT (key) DO NOTHING;

INSERT INTO admin_settings (key, value) 
VALUES ('notifications_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
```

### 3. Configure Sender Domain (Optional)

By default, emails are sent from `onboarding@resend.dev`. To use your own domain:

1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `ungone.com`)
3. Verify DNS records
4. Update the `from` field in `app/api/contact/route.ts`:
   ```typescript
   from: 'UnGone <notifications@ungone.com>',
   ```

### 4. Test the Setup

1. Restart your dev server: `npm run dev`
2. Navigate to `/admin/settings`
3. Click "Send Test Email"
4. Check `ungoneofficial@gmail.com` for the test email
5. If received, your setup is working!

### 5. Test with Real Lead

1. Go to your contact form page
2. Submit a test lead
3. Check your email for the notification
4. Verify the email contains all lead information
5. Click the "View in Admin Panel" link

## Email Template Preview

The email includes:
- **Header**: Gradient purple/blue with "New Lead Received"
- **Lead Type Badge**: "CONTACT" or "AUDIT REQUEST"
- **Lead Information Table**:
  - Name
  - Email (clickable mailto link)
  - Phone (if provided)
  - Company (if provided)
  - Service Interested (if provided)
- **Message Section**: Formatted in a highlighted box
- **CTA Button**: "View in Admin Panel" link
- **Footer**: Automated message notice

## Files Modified

### Database
- `supabase/schema.sql` - Added admin_settings table

### API Routes
- `app/api/contact/route.ts` - Enhanced email sending with settings
- `app/api/admin/settings/route.ts` - New: Settings CRUD API
- `app/api/admin/settings/test-email/route.ts` - New: Test email endpoint

### Admin Pages
- `app/admin/settings/page.tsx` - New: Settings UI
- `app/admin/components/Sidebar.tsx` - Added Settings link

## Configuration Options

### Available Settings

**notification_email**
- Default: `ungoneofficial@gmail.com`
- Purpose: Email address to receive lead notifications
- Can be changed in `/admin/settings`

**notifications_enabled**
- Default: `true`
- Purpose: Toggle email notifications on/off
- Can be changed in `/admin/settings`

## Troubleshooting

### Email Not Received

1. **Check Resend API Key**
   - Verify `RESEND_API_KEY` is set in `.env.local`
   - Restart dev server after adding the key

2. **Check Database Settings**
   - Run SQL to verify admin_settings table exists
   - Check notification_email value is correct

3. **Check Console Logs**
   - Look for "Email sending failed" errors
   - Verify Resend client is initialized

4. **Check Spam Folder**
   - Test emails might go to spam initially
   - Mark as not spam to improve deliverability

### API Key Issues

If you see "Resend not configured":
- Ensure `RESEND_API_KEY` is in `.env.local`
- The file should be in the project root
- Restart the dev server

### Database Errors

If settings don't save:
- Verify admin_settings table exists
- Check RLS policies are configured
- Ensure Supabase credentials are correct

## Next Steps

### Recommended Enhancements

1. **Custom Email Templates**
   - Add more email templates (welcome, follow-up, etc.)
   - Create email template management UI

2. **Email History**
   - Track sent emails in database
   - View email history in admin panel
   - Retry failed emails

3. **Multiple Recipients**
   - Support multiple notification emails
   - Different emails for different lead types

4. **Scheduling**
   - Digest emails (daily/weekly summaries)
   - Scheduled follow-up reminders

5. **Email Analytics**
   - Track open rates
   - Track click rates
   - Bounce handling

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep your Resend API key secure
- ⚠️ Use environment variables for all sensitive data
- ✅ API routes are protected with admin authentication
- ✅ Settings can only be changed by authenticated admins

## Testing Checklist

- [ ] Resend API key configured
- [ ] Database schema applied
- [ ] Dev server restarted
- [ ] Test email sent successfully
- [ ] Test email received in inbox
- [ ] Real lead submission triggers email
- [ ] Email contains correct information
- [ ] "View in Admin Panel" link works
- [ ] Settings can be toggled on/off
- [ ] Notification email can be changed

---

**Need Help?**
- Check the Resend documentation: https://resend.com/docs
- Review the code in `app/api/contact/route.ts`
- Check browser console for errors
- Verify database settings in Supabase

**Status**: ✅ Implementation Complete - Ready for Configuration
