"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Lock, LogOut, Calendar, CheckCircle2, Clock, XCircle, Download } from "lucide-react";
import BrandButton from "@/components/BrandButton";
import { Booking } from "@/types/booking";
import Image from "next/image";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [authToken, setAuthToken] = React.useState<string | null>(null);
  
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Invalid password");
      }

      const data = await response.json();
      localStorage.setItem("admin_token", data.token);
      setAuthToken(data.token);
      setIsAuthenticated(true);
      setPassword("");
      fetchBookings();
    } catch {
      setLoginError("Invalid password. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setBookings([]);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    if (!authToken) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      await fetchBookings();
      setSelectedBooking(null);
      alert(`Booking ${status} successfully!`);
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddDriveFolder = async (bookingId: string, url: string) => {
    if (!authToken || !url) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ driveFolderUrl: url }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      await fetchBookings();
      alert("Google Drive folder link added successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to add folder link");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportBooking = (booking: Booking, format: 'txt' | 'json' | 'md' = 'txt') => {
    const templateData = {
      bookingId: booking.id,
      template: booking.template,
      couple: {
        groomName: booking.groom_name,
        brideName: booking.bride_name,
        email: booking.email,
        phone: booking.phone,
      },
      wedding: {
        date: booking.wedding_date,
        launchDate: booking.launch_date,
        siteEndDate: booking.site_end_date,
      },
      hero: {
        tagline: booking.hero_tagline || "",
        subtitle: booking.hero_subtitle || "",
      },
      story: {
        overview: booking.couple_story,
        howWeMet: booking.how_we_met || "",
        proposal: booking.proposal_story || "",
        highlights: booking.relationship_highlights || "",
      },
      venue: {
        churchName: booking.church_venue_name || "",
        churchAddress: booking.church_venue_address || "",
        churchGoogleMapsLink: booking.church_google_maps_link || "",
        receptionName: booking.reception_venue_name,
        receptionAddress: booking.reception_venue_address,
        receptionGoogleMapsLink: booking.reception_google_maps_link || "",
        description: booking.venue_description || "",
        ceremonyTime: booking.ceremony_time,
        receptionTime: booking.reception_time,
        dresscode: booking.dresscode || "",
        dresscodeImageLink: booking.dresscode_image_link || "",
        directions: booking.directions_transport || "",
      },
      party: {
        groomsmen: booking.groomsmen || "",
        bridesmaids: booking.bridesmaids || "",
        parents: booking.parents || "",
      },
      details: {
        schedule: booking.schedule_of_events || "",
        rsvpDeadline: booking.rsvp_deadline || "",
        giftRegistryItems: booking.gift_registry_items || "",
        giftNotificationContact: booking.gift_notification_contact || "",
        accommodation: booking.accommodation_info || "",
      },
      admin: {
        status: booking.status,
        package: booking.package,
        driveFolderUrl: booking.drive_folder_url || "",
        specialRequests: booking.special_requests || "",
      }
    };

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(templateData, null, 2);
      filename = `booking-${booking.groom_name}-${booking.bride_name}.json`;
      mimeType = "application/json";
    } else if (format === 'md') {
      content = `# Wedding Website Data
## ${booking.groom_name} & ${booking.bride_name}

### Template
- **Selected Template:** Template ${booking.template}

### Couple Information
- **Groom:** ${booking.groom_name}
- **Bride:** ${booking.bride_name}
- **Email:** ${booking.email}
- **Phone:** ${booking.phone}

### Wedding Details
- **Wedding Date:** ${booking.wedding_date}
- **Launch Date:** ${booking.launch_date}
- **Site End Date:** ${booking.site_end_date}

### Hero Section
- **Tagline:** ${booking.hero_tagline || "Not provided"}
- **Subtitle:** ${booking.hero_subtitle || "Not provided"}

### Love Story
**Overview:**
${booking.couple_story}

**How We Met:**
${booking.how_we_met || "Not provided"}

**The Proposal:**
${booking.proposal_story || "Not provided"}

**Highlights:**
${booking.relationship_highlights || "Not provided"}

### Venue & Event
**Church/Ceremony Venue:**
- **Name:** ${booking.church_venue_name || "Not provided"}
- **Address:** ${booking.church_venue_address || "Not provided"}
- **Google Maps:** ${booking.church_google_maps_link || "Not provided"}

**Reception Venue:**
- **Name:** ${booking.reception_venue_name}
- **Address:** ${booking.reception_venue_address}
- **Google Maps:** ${booking.reception_google_maps_link || "Not provided"}

- **Ceremony Time:** ${booking.ceremony_time}
- **Reception Time:** ${booking.reception_time}
- **Dress Code:** ${booking.dresscode || "Not specified"}
- **Dress Code Inspiration:** ${booking.dresscode_image_link || "Not provided"}

**Venue Description:**
${booking.venue_description || "Not provided"}

**Directions & Transportation:**
${booking.directions_transport || "Not provided"}

### Wedding Party
**Groomsmen:**
${booking.groomsmen || "Not provided"}

**Bridesmaids:**
${booking.bridesmaids || "Not provided"}

**Parents & Sponsors:**
${booking.parents || "Not provided"}

### Additional Details
**Schedule of Events:**
${booking.schedule_of_events || "Not provided"}

**RSVP Deadline:** ${booking.rsvp_deadline || "Not set"}

**Gift Registry Items:**
${booking.gift_registry_items || "Not provided"}

**Gift Notification Contact:**
${booking.gift_notification_contact || "Not provided"}

**Accommodation:**
${booking.accommodation_info || "Not provided"}

### Admin Notes
- **Package:** ${booking.package}
- **Status:** ${booking.status}
- **Drive Folder:** ${booking.drive_folder_url || "Not set"}

**Special Requests:**
${booking.special_requests || "None"}

---
*Exported on ${new Date().toLocaleString()}*
`;
      filename = `booking-${booking.groom_name}-${booking.bride_name}.md`;
      mimeType = "text/markdown";
    } else {
      // TXT format (original)
      const exportData = {
        "Booking ID": booking.id,
        "Template": `Template ${booking.template}`,
        "Status": booking.status.toUpperCase(),
        "Package": booking.package,
        "Groom Name": booking.groom_name,
        "Bride Name": booking.bride_name,
        "Email": booking.email,
        "Phone": booking.phone,
        "Wedding Date": booking.wedding_date,
        "Launch Date": booking.launch_date,
        "Hero Tagline": booking.hero_tagline || "N/A",
        "Hero Subtitle": booking.hero_subtitle || "N/A",
        "Couple Story": booking.couple_story,
        "How We Met": booking.how_we_met || "N/A",
        "Proposal Story": booking.proposal_story || "N/A",
        "Church Venue": booking.church_venue_name || "N/A",
        "Church Address": booking.church_venue_address || "N/A",
        "Reception Venue": booking.reception_venue_name,
        "Reception Address": booking.reception_venue_address,
        "Ceremony Time": booking.ceremony_time,
        "Reception Time": booking.reception_time,
        "Gift Registry Items": booking.gift_registry_items || "N/A",
        "Gift Notification Contact": booking.gift_notification_contact || "N/A",
        "Drive Folder URL": booking.drive_folder_url || "Not set",
        "Special Requests": booking.special_requests || "None"
      };
      content = Object.entries(exportData).map(([key, value]) => `${key}: ${value}`).join("\n\n");
      filename = `booking-${booking.groom_name}-${booking.bride_name}.txt`;
      mimeType = "text/plain";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#98C1D9] via-[#6969B3] to-[#533A7B] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-powder/20 mb-4">
              <Lock className="size-8 text-brand-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-brand-primary mb-2">
              Admin Login
            </h1>
            <p className="text-brand-dark/70 text-sm">
              Enter your password to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                {loginError}
              </div>
            )}

            <BrandButton
              type="submit"
              disabled={isLoggingIn}
              className="w-full"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </BrandButton>
          </form>
        </motion.div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked": return "bg-green-100 text-green-800 border-green-300";
      case "reserved": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "booked": return <CheckCircle2 className="size-4" />;
      case "reserved": return <Clock className="size-4" />;
      case "cancelled": return <XCircle className="size-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="size-6 text-brand-primary" />
            <h1 className="text-xl font-semibold text-brand-primary">
              Admin Dashboard
            </h1>
          </div>
          <BrandButton
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="size-4" />
            Logout
          </BrandButton>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark">
              Booking Management
            </h2>
            <p className="text-brand-dark/70 text-sm mt-1">
              Total Bookings: {bookings.length}
            </p>
          </div>
          <BrandButton onClick={fetchBookings} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </BrandButton>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="size-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No bookings yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark">
                      {booking.groom_name} & {booking.bride_name}
                    </h3>
                    <p className="text-sm text-brand-dark/70">
                      {booking.email} • {booking.phone}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-brand-dark/60">Launch Date:</span>
                    <p className="font-medium text-brand-dark">
                      {new Date(booking.launch_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-brand-dark/60">Wedding Date:</span>
                    <p className="font-medium text-brand-dark">
                      {new Date(booking.wedding_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-brand-dark/60">Package:</span>
                    <p className="font-medium text-brand-dark">{booking.package}</p>
                  </div>
                  <div>
                    <span className="text-brand-dark/60">Booked:</span>
                    <p className="font-medium text-brand-dark">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <BrandButton
                    variant="ghost"
                    onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
                    className="text-sm"
                  >
                    {selectedBooking?.id === booking.id ? "Hide Details" : "View Details"}
                  </BrandButton>
                  
                  <div className="relative group">
                    <BrandButton
                      variant="ghost"
                      className="text-sm flex items-center gap-1"
                    >
                      <Download className="size-4" />
                      Export
                    </BrandButton>
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                      <button
                        onClick={() => handleExportBooking(booking, 'txt')}
                        className="block w-full text-left px-4 py-2 text-sm text-brand-dark hover:bg-brand-powder/10 rounded-t-lg"
                      >
                        Text (.txt)
                      </button>
                      <button
                        onClick={() => handleExportBooking(booking, 'json')}
                        className="block w-full text-left px-4 py-2 text-sm text-brand-dark hover:bg-brand-powder/10"
                      >
                        JSON (.json)
                      </button>
                      <button
                        onClick={() => handleExportBooking(booking, 'md')}
                        className="block w-full text-left px-4 py-2 text-sm text-brand-dark hover:bg-brand-powder/10 rounded-b-lg"
                      >
                        Markdown (.md)
                      </button>
                    </div>
                  </div>
                  
                  {booking.status === "reserved" && (
                    <BrandButton
                      variant="primary"
                      onClick={() => handleUpdateStatus(booking.id, "booked")}
                      disabled={actionLoading}
                      className="text-sm"
                    >
                      Confirm Payment
                    </BrandButton>
                  )}
                  
                  {booking.status !== "cancelled" && (
                    <BrandButton
                      variant="accent"
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel this booking?")) {
                          handleUpdateStatus(booking.id, "cancelled");
                        }
                      }}
                      disabled={actionLoading}
                      className="text-sm"
                    >
                      Cancel Booking
                    </BrandButton>
                  )}
                </div>

                {selectedBooking?.id === booking.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 pt-6 border-t border-gray-200 space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-dark mb-2">Venue Details</h4>
                        <div className="text-sm space-y-1">
                          {booking.church_venue_name && (
                            <p><strong>Church:</strong> {booking.church_venue_name}</p>
                          )}
                          <p><strong>Reception:</strong> {booking.reception_venue_name}</p>
                          <p><strong>Reception Address:</strong> {booking.reception_venue_address}</p>
                          <p><strong>Ceremony:</strong> {booking.ceremony_time}</p>
                          <p><strong>Reception Time:</strong> {booking.reception_time}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-brand-dark mb-2">Payment Info</h4>
                        {booking.gcash_receipt_url && (
                          <div className="mb-2">
                            <p className="text-sm mb-2"><strong>Receipt:</strong></p>
                            <div className="relative w-32 h-32">
                              <Image
                                src={booking.gcash_receipt_url}
                                alt="Payment receipt"
                                fill
                                className="object-cover rounded-lg border border-gray-200"
                              />
                            </div>
                          </div>
                        )}
                        {booking.payment_confirmed_at && (
                          <p className="text-sm text-green-600">
                            Confirmed: {new Date(booking.payment_confirmed_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-dark mb-2">Love Story</h4>
                      <p className="text-sm text-brand-dark/80 whitespace-pre-wrap">
                        {booking.couple_story}
                      </p>
                    </div>

                    {booking.special_requests && (
                      <div>
                        <h4 className="font-semibold text-brand-dark mb-2">Special Requests</h4>
                        <p className="text-sm text-brand-dark/80 whitespace-pre-wrap">
                          {booking.special_requests}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-brand-dark mb-2">Google Drive Folder</h4>
                      {booking.drive_folder_url ? (
                        <a
                          href={booking.drive_folder_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-primary hover:underline"
                        >
                          {booking.drive_folder_url}
                        </a>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="Enter Google Drive folder URL"
                            id={`drive-${booking.id}`}
                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                          />
                          <BrandButton
                            variant="secondary"
                            onClick={() => {
                              const input = document.getElementById(`drive-${booking.id}`) as HTMLInputElement;
                              handleAddDriveFolder(booking.id, input.value);
                            }}
                            disabled={actionLoading}
                            className="text-sm"
                          >
                            Add Link
                          </BrandButton>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
