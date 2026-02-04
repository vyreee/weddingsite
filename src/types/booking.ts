export type BookingStatus = "reserved" | "booked" | "cancelled";

export type PackageType = "Elegant" | "Custom";
export type TemplateType = "1" | "2" | "3" | "4" | "5";

export interface ImageSection {
  sectionName: string;
  description: string;
  minImages: number;
  maxImages: number;
}

export interface BookingFormData {
  launchDate: string;
  groomName: string;
  brideName: string;
  email: string;
  phone: string;
  weddingDate: string;
  package: PackageType;
  template: TemplateType;
  
  // Hero Section
  heroTagline?: string;
  heroSubtitle?: string;
  leaveHeroToVows?: boolean;
  
  // About/Love Story Section
  coupleStory: string;
  howWeMet?: string;
  proposalStory?: string;
  relationshipHighlights?: string;
  leaveLoveStoryToVows?: boolean;
  
  // Venue & Event Details
  churchVenueName?: string;
  churchVenueAddress?: string;
  churchGoogleMapsLink?: string;
  receptionVenueName: string;
  receptionVenueAddress: string;
  receptionGoogleMapsLink?: string;
  ceremonyTime: string;
  receptionTime: string;
  venueDescription?: string;
  dresscode?: string;
  dresscodeImageLink?: string;
  leaveVenueToVows?: boolean;
  
  // Wedding Party
  groomsmen?: string;
  bridesmaids?: string;
  parents?: string;
  leaveWeddingPartyToVows?: boolean;
  
  // RSVP
  rsvpDeadline?: string;
  leaveRsvpToVows?: boolean;

  // Gift Registry (Separate Section)
  giftRegistryItems?: string;
  giftNotificationContact?: string;
  leaveGiftRegistryToVows?: boolean;
  
  // Additional Sections
  scheduleOfEvents?: string;
  accommodationInfo?: string;
  directionsTransport?: string;
  leaveAdditionalToVows?: boolean;
  
  // Image requirements - no upload, just notification
  imageRequirementsAcknowledged: boolean;
  
  driveFolderUrl?: string;
  gcashReceiptUrl?: string;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  created_at: string;
  status: BookingStatus;
  launch_date: string;
  site_end_date: string;
  groom_name: string;
  bride_name: string;
  email: string;
  phone: string;
  wedding_date: string;
  package: PackageType;
  template: TemplateType;
  
  // Content fields
  hero_tagline?: string;
  hero_subtitle?: string;
  leave_hero_to_vows?: boolean;
  
  couple_story: string;
  how_we_met?: string;
  proposal_story?: string;
  relationship_highlights?: string;
  leave_love_story_to_vows?: boolean;
  
  church_venue_name?: string;
  church_venue_address?: string;
  church_google_maps_link?: string;
  reception_venue_name: string;
  reception_venue_address: string;
  reception_google_maps_link?: string;
  ceremony_time: string;
  reception_time: string;
  venue_description?: string;
  dresscode?: string;
  dresscode_image_link?: string;
  leave_venue_to_vows?: boolean;

  groomsmen?: string;
  bridesmaids?: string;
  parents?: string;
  leave_wedding_party_to_vows?: boolean;

  rsvp_deadline?: string;
  leave_rsvp_to_vows?: boolean;

  gift_registry_items?: string;
  gift_notification_contact?: string;
  leave_gift_registry_to_vows?: boolean;
  
  schedule_of_events?: string;
  accommodation_info?: string;
  directions_transport?: string;
  leave_additional_to_vows?: boolean;
  
  image_requirements_acknowledged: boolean;
  drive_folder_url?: string;
  gcash_receipt_url?: string;
  payment_confirmed_at?: string;
  payment_notes?: string;
  special_requests?: string;
}

export interface CalendarDate {
  date: Date;
  status: "available" | "reserved" | "booked" | "unavailable";
  bookings?: Array<{
    id: string;
    groomName: string;
    brideName: string;
    status: BookingStatus;
  }>;
}

export const IMAGE_SECTIONS: ImageSection[] = [
  {
    sectionName: "Couple Photos",
    description: "Main photos of the couple for hero section and about page (3-5 photos recommended)",
    minImages: 3,
    maxImages: 5,
  },
  {
    sectionName: "Venue Photos",
    description: "Ceremony and reception venue photos (2-3 photos recommended)",
    minImages: 2,
    maxImages: 3,
  },
  {
    sectionName: "Entourage Photos",
    description: "Bridesmaids, groomsmen, and wedding party photos (optional)",
    minImages: 0,
    maxImages: 10,
  },
  {
    sectionName: "Extra Photos",
    description: "Additional photos for gallery and other sections (unlimited)",
    minImages: 0,
    maxImages: 999,
  },
];
