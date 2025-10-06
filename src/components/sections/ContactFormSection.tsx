"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import BrandButton from "@/components/BrandButton";

export default function ContactFormSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    package: "Luxury",
    message: "",
    // Honeypot field for bot protection
    website: ""
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [submitTime, setSubmitTime] = React.useState<number>(0);

  // Track when form is first interacted with (bot detection)
  React.useEffect(() => {
    setSubmitTime(Date.now());
  }, []);

  // Replace this URL with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygSs7MWUfq4jNQqenY0bKOo1QN2c34BPillWUqcOcI7TSsDFk8-_9z7UP1yNaiF4F7EA/exec";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Bot protection checks
    // 1. Honeypot field check - if filled, it's a bot
    if (formData.website) {
      setStatus("error");
      setErrorMessage("Spam detected. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    // 2. Time-based check - if submitted too quickly (< 3 seconds), likely a bot
    const timeElapsed = Date.now() - submitTime;
    if (timeElapsed < 3000) {
      setStatus("error");
      setErrorMessage("Please take a moment to fill out the form properly.");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    try {
      // Don't send honeypot field to the server
      const { website: _website, ...dataToSend } = formData;
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dataToSend,
          timestamp: new Date().toISOString()
        })
      });

      // Note: no-cors mode doesn't allow reading the response
      // We'll assume success if no error is thrown
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        weddingDate: "",
        package: "Luxury",
        message: "",
        website: ""
      });

      // Keep success message visible longer
      setTimeout(() => setStatus("idle"), 10000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Failed to submit form. Please try again or contact us directly.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-16 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-brand-primary text-center mb-3">
          Get Started Today
        </h2>
        <p className="text-center text-brand-dark/70 mb-10">
          Tell us about your special day and we&apos;ll get back to you within 24 hours
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-brand-secondary/30 p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
                placeholder="+63 912 345 6789"
              />
            </div>

            {/* Wedding Date */}
            <div>
              <label htmlFor="weddingDate" className="block text-sm font-medium text-brand-dark mb-2">
                Wedding Date
              </label>
              <input
                type="date"
                id="weddingDate"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors"
              />
            </div>

            {/* Package Selection */}
            <div className="md:col-span-2">
              <label htmlFor="package" className="block text-sm font-medium text-brand-dark mb-2">
                Interested Package *
              </label>
              <select
                id="package"
                name="package"
                required
                value={formData.package}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors bg-white"
              >
                <option value="Luxury">Luxury - $45 / ₱2,499</option>
                <option value="Elegant">Elegant - $100 / ₱4,999</option>
                <option value="Prestige">Prestige - Custom</option>
                <option value="Just Browsing">Just Browsing / Questions</option>
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-colors resize-none"
                placeholder="Tell us about your wedding vision, any questions, or special requirements..."
              />
            </div>

            {/* Honeypot field - hidden from real users, only bots will fill it */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-green-800"
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="size-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-base mb-2">
                    Thank you! We&apos;ve received your inquiry.
                  </p>
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Here&apos;s what happens next:</p>
                    <ol className="list-decimal list-inside space-y-1.5 ml-2">
                      <li>We&apos;ll contact you within 24 hours via email or phone</li>
                      <li>We&apos;ll send you a Google Drive folder to upload your wedding photos</li>
                      <li>You&apos;ll receive a form to confirm website content, copy, and color preferences</li>
                      <li>We&apos;ll create a demo website for your review</li>
                      <li>Once approved, we&apos;ll send payment details</li>
                      <li>After payment confirmation, your beautiful wedding site goes live! 🎉</li>
                    </ol>
                    <p className="mt-3 text-xs opacity-80">
                      Check your email (including spam folder) for our response.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800"
            >
              <AlertCircle className="size-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <BrandButton
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Inquiry
                </>
              )}
            </BrandButton>
          </div>

          <p className="mt-4 text-xs text-center text-brand-dark/60">
            By submitting this form, you agree to be contacted about our services.
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
}
