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
  coupleStory: string;
  venueName: string;
  venueAddress: string;
  ceremonyTime: string;
  receptionTime: string;
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
  couple_story: string;
  venue_name: string;
  venue_address: string;
  ceremony_time: string;
  reception_time: string;
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
  bookingId?: string;
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
