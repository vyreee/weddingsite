export type BookingStatus = "reserved" | "booked" | "cancelled";

export type PackageType = "Elegant" | "Custom";

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
  
  // Hero Section
  heroTagline?: string;
  heroSubtitle?: string;
  
  // About/Love Story Section
  coupleStory: string;
  howWeMet?: string;
  proposalStory?: string;
  relationshipHighlights?: string;
  
  // Venue & Event Details
  venueName: string;
  venueAddress: string;
  ceremonyTime: string;
  receptionTime: string;
  venueDescription?: string;
  dresscode?: string;
  
  // Wedding Party
  groomsmen?: string;
  bridesmaids?: string;
  parents?: string;
  
  // RSVP & Registry
  rsvpDeadline?: string;
  giftRegistryInfo?: string;
  
  // Additional Sections
  scheduleOfEvents?: string;
  accommodationInfo?: string;
  directionsTransport?: string;
  
  // Leave it to Vows option
  leaveContentToVows: boolean;
  
  imageSections: {
    couplePhotos: string;
    venuePhotos: string;
    entouragePhotos: string;
    extraPhotos: string;
  };
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
  
  // Content fields
  hero_tagline?: string;
  hero_subtitle?: string;
  couple_story: string;
  how_we_met?: string;
  proposal_story?: string;
  relationship_highlights?: string;
  venue_name: string;
  venue_address: string;
  ceremony_time: string;
  reception_time: string;
  venue_description?: string;
  dresscode?: string;
  groomsmen?: string;
  bridesmaids?: string;
  parents?: string;
  rsvp_deadline?: string;
  gift_registry_info?: string;
  schedule_of_events?: string;
  accommodation_info?: string;
  directions_transport?: string;
  leave_content_to_vows: boolean;
  
  image_sections_notes: string;
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
