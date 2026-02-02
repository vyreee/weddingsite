"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrandButton from "@/components/BrandButton";
import StepSelectDate from "./StepSelectDate";
import StepBasicInfo from "./StepBasicInfo";
import StepContentDetails from "./StepContentDetails";
import StepReview from "./StepReview";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import { BookingFormData, Booking } from "@/types/booking";

interface BookingWizardProps {
  bookings: Booking[];
}

const INITIAL_FORM_DATA: BookingFormData = {
  launchDate: "",
  groomName: "",
  brideName: "",
  email: "",
  phone: "",
  weddingDate: "",
  package: "Elegant",
  coupleStory: "",
  venueName: "",
  venueAddress: "",
  ceremonyTime: "",
  receptionTime: "",
  imageSections: {
    couplePhotos: "",
    venuePhotos: "",
    entouragePhotos: "",
    extraPhotos: "",
  },
  specialRequests: "",
};

export default function BookingWizard({ bookings }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<BookingFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingId, setBookingId] = React.useState<string>();

  const steps = [
    { title: "Select Date", component: StepSelectDate },
    { title: "Basic Info", component: StepBasicInfo },
    { title: "Content Details", component: StepContentDetails },
    { title: "Review", component: StepReview },
    { title: "Payment", component: StepPayment },
    { title: "Confirmation", component: StepConfirmation },
  ];

  const handleUpdate = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.launchDate;
      case 1:
        return !!(
          formData.groomName &&
          formData.brideName &&
          formData.email &&
          formData.phone &&
          formData.weddingDate &&
          formData.package
        );
      case 2:
        return !!(
          formData.coupleStory &&
          formData.venueName &&
          formData.venueAddress &&
          formData.ceremonyTime &&
          formData.receptionTime
        );
      case 3:
        return true;
      case 4:
        return !!formData.gcashReceiptUrl;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep === 4) {
      await handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create booking");

      const data = await response.json();
      setBookingId(data.booking.id);
      setCurrentStep(5);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.slice(0, -1).map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index === currentStep
                        ? "bg-brand-primary text-white"
                        : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      index === currentStep
                        ? "text-brand-primary"
                        : index < currentStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      index < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            formData={formData}
            onUpdate={handleUpdate}
            bookings={bookings}
            bookingId={bookingId}
          />
        </motion.div>
      </AnimatePresence>

      {currentStep < 5 && (
        <div className="flex gap-3 justify-between mt-8">
          <BrandButton
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="size-4" />
            Back
          </BrandButton>

          <BrandButton
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : currentStep === 4 ? (
              "Complete Booking"
            ) : (
              <>
                Next
                <ChevronRight className="size-4" />
              </>
            )}
          </BrandButton>
        </div>
      )}
    </div>
  );
}
