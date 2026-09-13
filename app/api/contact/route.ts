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
        await resend.emails.send({
          from: 'UnGone <onboarding@resend.dev>',
          to: 'your-email@example.com', // Replace with your email
          subject: `New ${validatedData.leadType === 'audit_request' ? 'Growth Audit Request' : 'Contact Form Submission'}`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${validatedData.company || 'Not provided'}</p>
            <p><strong>Service Interested:</strong> ${validatedData.service || 'Not specified'}</p>
            <p><strong>Type:</strong> ${validatedData.leadType}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
          `,
        });
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
