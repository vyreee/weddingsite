"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CreditCard, Upload, CheckCircle2 } from "lucide-react";
import { BookingFormData } from "@/types/booking";
import Image from "next/image";

interface StepPaymentProps {
  formData: BookingFormData;
  onUpdate: (data: Partial<BookingFormData>) => void;
}

export default function StepPayment({ formData, onUpdate }: StepPaymentProps) {
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setReceiptFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onUpdate({ gcashReceiptUrl: reader.result as string });
    setUploading(false);
  };

  const packagePrice = formData.package === "Elegant" ? "$100 / ₱4,999" : "Custom Quote";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-powder/20 mb-4">
          <CreditCard className="size-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Payment
        </h2>
        <p className="text-brand-dark/70">
          Complete your payment via GCash and upload your receipt
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-secondary/30 p-6 shadow-lg space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-brand-primary mb-2">
            Package: {formData.package}
          </h3>
          <p className="text-3xl font-bold text-brand-primary">{packagePrice}</p>
        </div>

        <div className="border-t border-brand-secondary/30 pt-6">
          <h4 className="font-semibold text-brand-dark mb-4">Step 1: Scan GCash QR Code</h4>
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 bg-white rounded-lg shadow-md overflow-hidden mb-4 mx-auto">
              <Image
                src="/images/gcash-qr.jpg"
                alt="GCash QR Code for Payment"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <p className="text-sm text-brand-dark/70 text-center">
              Scan this QR code with your GCash app to complete payment
            </p>
          </div>
        </div>

        <div className="border-t border-brand-secondary/30 pt-6">
          <h4 className="font-semibold text-brand-dark mb-4">Step 2: Upload Payment Receipt *</h4>
          
          {!receiptPreview ? (
            <div className="border-2 border-dashed border-brand-secondary/30 rounded-lg p-8 text-center hover:border-brand-primary/50 transition-colors">
              <input
                type="file"
                id="receipt"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="receipt"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <Upload className="size-12 text-brand-primary" />
                <div>
                  <p className="font-medium text-brand-dark">
                    Click to upload receipt
                  </p>
                  <p className="text-sm text-brand-dark/60 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative border border-brand-secondary/30 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={receiptPreview}
                      alt="Receipt preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span className="font-medium text-brand-dark">
                        Receipt uploaded successfully
                      </span>
                    </div>
                    <p className="text-sm text-brand-dark/70 mb-3">
                      {receiptFile?.name}
                    </p>
                    <button
                      onClick={() => {
                        setReceiptFile(null);
                        setReceiptPreview(null);
                        onUpdate({ gcashReceiptUrl: undefined });
                      }}
                      className="text-sm text-brand-primary hover:text-brand-accent transition-colors"
                    >
                      Change receipt
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>✓ Receipt uploaded!</strong> You can now proceed to complete your booking.
                </p>
              </div>
            </div>
          )}

          {uploading && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-brand-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-primary border-t-transparent" />
                Uploading receipt...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Your booking will be marked as &quot;Reserved&quot; until we confirm your payment. 
          Once confirmed, you&apos;ll receive an email with next steps and a Google Drive folder link for photo uploads.
        </p>
      </div>
    </motion.div>
  );
}
