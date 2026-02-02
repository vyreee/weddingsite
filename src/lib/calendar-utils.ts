import { Booking, CalendarDate } from '@/types/booking';

const BUFFER_DAYS = 5;
const SITE_DURATION_DAYS = 45;

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDate(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

export function isDateAvailable(
  date: Date,
  bookings: Booking[]
): { available: boolean; reason?: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  const minBookingDate = addDays(today, BUFFER_DAYS);
  
  if (checkDate < minBookingDate) {
    return {
      available: false,
      reason: `Must be at least ${BUFFER_DAYS} days from today`,
    };
  }
  
  return { available: true };
}

export function getBookingsForDate(date: Date, bookings: Booking[]): Booking[] {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return bookings.filter(booking => {
    if (booking.status === 'cancelled') return false;
    const launchDate = parseDate(booking.launch_date);
    launchDate.setHours(0, 0, 0, 0);
    return launchDate.getTime() === checkDate.getTime();
  });
}

export function calculateSiteEndDate(launchDate: Date): Date {
  return addDays(launchDate, SITE_DURATION_DAYS);
}

export function getCalendarDates(
  year: number,
  month: number,
  bookings: Booking[]
): CalendarDate[] {
  const dates: CalendarDate[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateCheck = isDateAvailable(currentDate, bookings);
    const dateBookings = getBookingsForDate(currentDate, bookings);
    
    let status: CalendarDate['status'] = 'available';
    
    if (!dateCheck.available) {
      status = 'unavailable';
    } else if (dateBookings.length > 0) {
      const hasBooked = dateBookings.some(b => b.status === 'booked');
      status = hasBooked ? 'booked' : 'reserved';
    }
    
    dates.push({
      date: new Date(currentDate),
      status,
      bookings: dateBookings.map(b => ({
        id: b.id,
        groomName: b.groom_name,
        brideName: b.bride_name,
        status: b.status,
      })),
    });
    
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
}

export function getMinBookingDate(): string {
  const today = new Date();
  const minDate = addDays(today, BUFFER_DAYS);
  return formatDate(minDate);
}

export function isValidLaunchDate(launchDate: string, bookings: Booking[]): boolean {
  const date = parseDate(launchDate);
  const check = isDateAvailable(date, bookings);
  return check.available;
}
