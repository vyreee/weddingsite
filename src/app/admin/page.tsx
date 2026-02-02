"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Lock, LogOut, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
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
                          <p><strong>Venue:</strong> {booking.venue_name}</p>
                          <p><strong>Address:</strong> {booking.venue_address}</p>
                          <p><strong>Ceremony:</strong> {booking.ceremony_time}</p>
                          <p><strong>Reception:</strong> {booking.reception_time}</p>
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
