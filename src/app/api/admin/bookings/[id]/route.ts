import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData: Record<string, unknown> = {};
    
    if (body.status) updateData.status = body.status;
    if (body.paymentNotes) updateData.payment_notes = body.paymentNotes;
    if (body.driveFolderUrl) updateData.drive_folder_url = body.driveFolderUrl;
    
    if (body.status === 'booked' && !body.paymentConfirmedAt) {
      updateData.payment_confirmed_at = new Date().toISOString();
    }

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
