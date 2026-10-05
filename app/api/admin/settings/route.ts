import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('admin_settings')
      .select('*');

    if (error) {
      console.error('Database error:', error);
      // Return default settings if table doesn't exist
      if (error.code === 'PGRST205') {
        return NextResponse.json({
          settings: {
            notification_email: 'ungoneofficial@gmail.com',
            notifications_enabled: 'true',
          },
          warning: 'Using default settings - admin_settings table not found in database'
        });
      }
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    const settingsMap: Record<string, string> = {};
    data?.forEach(setting => {
      settingsMap[setting.key] = setting.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('admin_settings')
      .upsert({ key, value })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      if (error.code === 'PGRST205') {
        return NextResponse.json(
          { error: 'admin_settings table not found. Please run the schema migration.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to update setting' },
        { status: 500 }
      );
    }

    return NextResponse.json({ setting: data });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
