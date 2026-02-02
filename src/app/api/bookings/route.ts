import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { calculateSiteEndDate, parseDate } from '@/lib/calendar-utils';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('launch_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const launchDate = parseDate(body.launchDate);
    const siteEndDate = calculateSiteEndDate(launchDate);
    
    const bookingData = {
      launch_date: body.launchDate,
      site_end_date: siteEndDate.toISOString().split('T')[0],
      groom_name: body.groomName,
      bride_name: body.brideName,
      email: body.email,
      phone: body.phone,
      wedding_date: body.weddingDate,
      package: body.package,
      couple_story: body.coupleStory,
      venue_name: body.venueName,
      venue_address: body.venueAddress,
      ceremony_time: body.ceremonyTime,
      reception_time: body.receptionTime,
      image_sections_notes: JSON.stringify(body.imageSections),
      gcash_receipt_url: body.gcashReceiptUrl,
      special_requests: body.specialRequests,
      status: 'reserved',
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
