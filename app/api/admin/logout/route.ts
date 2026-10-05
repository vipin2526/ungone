import { NextResponse } from 'next/server';
import { clearAdminAuth } from '@/lib/admin-auth';

export async function POST() {
  try {
    await clearAdminAuth();

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
