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
      template: body.template,
      hero_tagline: body.heroTagline,
      hero_subtitle: body.heroSubtitle,
      leave_hero_to_vows: body.leaveHeroToVows || false,
      couple_story: body.coupleStory || (body.leaveLoveStoryToVows ? "To be created by Vows team" : ""),
      how_we_met: body.howWeMet || null,
      proposal_story: body.proposalStory || null,
      relationship_highlights: body.relationshipHighlights || null,
      leave_love_story_to_vows: body.leaveLoveStoryToVows || false,
      church_venue_name: body.churchVenueName || null,
      church_venue_address: body.churchVenueAddress || null,
      church_google_maps_link: body.churchGoogleMapsLink || null,
      reception_venue_name: body.receptionVenueName || (body.leaveVenueToVows ? "To be determined" : ""),
      reception_venue_address: body.receptionVenueAddress || (body.leaveVenueToVows ? "To be determined" : ""),
      reception_google_maps_link: body.receptionGoogleMapsLink || null,
      ceremony_time: body.ceremonyTime || (body.leaveVenueToVows ? "TBD" : ""),
      reception_time: body.receptionTime || (body.leaveVenueToVows ? "TBD" : ""),
      venue_description: body.venueDescription,
      dresscode: body.dresscode,
      dresscode_image_link: body.dresscodeImageLink,
      directions_transport: body.directionsTransport,
      leave_venue_to_vows: body.leaveVenueToVows || false,
      groomsmen: body.groomsmen,
      bridesmaids: body.bridesmaids,
      parents: body.parents,
      leave_wedding_party_to_vows: body.leaveWeddingPartyToVows || false,
      schedule_of_events: body.scheduleOfEvents,
      rsvp_deadline: body.rsvpDeadline,
      leave_rsvp_to_vows: body.leaveRsvpToVows || false,
      gift_registry_items: body.giftRegistryItems,
      gift_notification_contact: body.giftNotificationContact,
      leave_gift_registry_to_vows: body.leaveGiftRegistryToVows || false,
      accommodation_info: body.accommodationInfo,
      leave_additional_to_vows: body.leaveAdditionalToVows || false,
      image_requirements_acknowledged: body.imageRequirementsAcknowledged || false,
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
