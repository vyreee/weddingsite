import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from('admin_settings')
      .select('setting_value')
      .eq('setting_key', 'admin_password_hash')
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, data.setting_value);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');

    return NextResponse.json({ 
      success: true,
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
