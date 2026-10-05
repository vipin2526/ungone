import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  leadType: z.enum(['contact', 'audit_request']).default('contact'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // Store in database if configured
    if (supabase) {
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          service_interested: validatedData.service || null,
          message: validatedData.message,
          lead_type: validatedData.leadType,
          source_page: request.headers.get('referer') || '/',
          status: 'new',
        });

      if (dbError) {
        console.error('Database error:', dbError);
        return NextResponse.json(
          { 
            success: false, 
            message: 'Failed to save your information. Please try again.' 
          },
          { status: 500 }
        );
      }
    } else {
      console.log('Supabase not configured, skipping database storage');
    }
    
    // Send email notification if configured
    if (resend) {
      try {
        // Fetch notification settings from database
        const { data: settings } = await supabase!
          .from('admin_settings')
          .select('key, value')
          .in('key', ['notification_email', 'notifications_enabled']);

        const settingsMap = new Map(settings?.map(s => [s.key, s.value]) || []);
        const notificationsEnabled = settingsMap.get('notifications_enabled') === 'true';
        const notificationEmail = settingsMap.get('notification_email') || 'ungoneofficial@gmail.com';

        if (notificationsEnabled && notificationEmail) {
          const leadTypeLabel = validatedData.leadType === 'audit_request' ? 'Growth Audit Request' : 'Contact Form Submission';
          
          await resend.emails.send({
            from: 'UnGone <onboarding@resend.dev>',
            to: notificationEmail,
            subject: `🔔 New ${leadTypeLabel} from ${validatedData.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">New Lead Received</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">${leadTypeLabel}</p>
                </div>
                
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
                  <h2 style="color: #333; margin-top: 0;">Lead Information</h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold; width: 150px;">Name:</td>
                      <td style="padding: 12px 0; color: #333;">${validatedData.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold;">Email:</td>
                      <td style="padding: 12px 0; color: #333;">
                        <a href="mailto:${validatedData.email}" style="color: #667eea; text-decoration: none;">${validatedData.email}</a>
                      </td>
                    </tr>
                    ${validatedData.phone ? `
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold;">Phone:</td>
                      <td style="padding: 12px 0; color: #333;">${validatedData.phone}</td>
                    </tr>
                    ` : ''}
                    ${validatedData.company ? `
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold;">Company:</td>
                      <td style="padding: 12px 0; color: #333;">${validatedData.company}</td>
                    </tr>
                    ` : ''}
                    ${validatedData.service ? `
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold;">Service Interested:</td>
                      <td style="padding: 12px 0; color: #333;">${validatedData.service}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 12px 0; color: #666; font-weight: bold;">Type:</td>
                      <td style="padding: 12px 0;">
                        <span style="background: ${validatedData.leadType === 'audit_request' ? '#667eea' : '#764ba2'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                          ${validatedData.leadType === 'audit_request' ? 'AUDIT REQUEST' : 'CONTACT'}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <h3 style="color: #333; margin-top: 30px;">Message</h3>
                  <div style="background: white; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; margin-top: 10px;">
                    <p style="color: #555; line-height: 1.6; margin: 0;">${validatedData.message}</p>
                  </div>

                  <div style="margin-top: 30px; text-align: center;">
                    <a href="http://localhost:3000/admin/leads" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                      View in Admin Panel
                    </a>
                  </div>

                  <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                    This email was sent automatically from UnGone contact form
                  </p>
                </div>
              </div>
            `,
          });
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Resend not configured, skipping email notification');
    }
    
    console.log('Lead received:', validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll be in touch within 24 hours.' 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again.' 
      },
      { status: 500 }
    );
  }
}
