import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

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
    
    // TODO: Send email notification (Resend/Postmark)
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
