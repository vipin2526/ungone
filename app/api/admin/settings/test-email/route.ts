import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Resend not configured' },
        { status: 500 }
      );
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch notification email from settings
    const { data: settings, error } = await supabase
      .from('admin_settings')
      .select('key, value')
      .eq('key', 'notification_email')
      .single();

    let notificationEmail = 'ungoneofficial@gmail.com';
    if (error) {
      if (error.code === 'PGRST205') {
        console.log('admin_settings table not found, using default email');
      } else {
        console.error('Error fetching settings:', error);
      }
    } else {
      notificationEmail = settings?.value || 'ungoneofficial@gmail.com';
    }

    await resend.emails.send({
      from: 'UnGone <onboarding@resend.dev>',
      to: notificationEmail,
      subject: '📧 Test Email from UnGone Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Test Email</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Email notifications are working! 🎉</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="color: #555; line-height: 1.6;">
              This is a test email to verify that your email notification settings are configured correctly.
            </p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="http://localhost:3000/admin/settings" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Back to Settings
              </a>
            </div>

            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              This test email was sent from UnGone Admin Panel
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
