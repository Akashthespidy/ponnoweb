"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export interface ContactUsHandle {
  open: () => void;
  close: () => void;
}

const ContactUs = forwardRef<ContactUsHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const { email, message } = Object.fromEntries(formData);

    if (!email || !message) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setIsComplete(false);
      setError(null);
    },
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isComplete ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Contact Sales</h2>
            <p className="text-gray-600 mb-6">
              Have questions? Our team is here to help.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  placeholder="Tell us about your needs..."
                  required
                  className="h-24"
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white hover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Message sent!
            </h3>
            <p className="text-gray-500 mb-6">
              We'll get back to you as soon as possible.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full text-white hover:text-white"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

ContactUs.displayName = "ContactUs";

export default ContactUs;
