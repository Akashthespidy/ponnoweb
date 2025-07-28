"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";

const businessCategories = [
  "Retail",
  "Restaurant",
  "E-commerce",
  "Services",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Other",
];

export interface MultiStepFormHandle {
  open: (initialData?: { email?: string }) => void;
  close: () => void;
}

interface MultiStepFormProps {
  className?: string;
}

const MultiStepForm = forwardRef<MultiStepFormHandle, MultiStepFormProps>(
  ({ className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const steps = [
      {
        id: "business",
        title: "Business Information",
        description: "Tell us about your business",
        fields: [
          {
            name: "businessName",
            label: "Business Name",
            type: "text",
            placeholder: "Acme Inc.",
            required: true,
          },
          {
            name: "businessCategory",
            label: "Business Category",
            type: "select",
            options: businessCategories,
            placeholder: "Select category",
            required: true,
          },
          {
            name: "businessAddress",
            label: "Business Address",
            type: "text",
            placeholder: "123 Business St, City",
            required: false,
          },
        ],
      },
      {
        id: "personal",
        title: "Your Information",
        description: "Tell us how we can contact you",
        fields: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "John",
            required: true,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Doe",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john.doe@example.com",
            required: true,
          },
          {
            name: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "+1 (555) 123-4567",
            required: false,
          },
        ],
      },
    ];

    const progress = ((step + 1) / steps.length) * 100;

    const saveFormData = async (data: any) => {
      try {
        if (!data.email) {
          throw new Error("Email is required");
        }

        const allowedFields = [
          "businessName",
          "businessCategory",
          "businessAddress",
          "firstName",
          "lastName",
          "email",
          "phone",
        ];
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([k]) => allowedFields.includes(k))
        );

        const response = await fetch("/api/access-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredData),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        return await response.json();
      } catch (error) {
        console.error("Error saving form data:", error);
        throw error;
      }
    };

    const handleNextStep = async (data: any) => {
      const currentStepFields = steps[step].fields;
      const stepRequiredErrors = currentStepFields
        .filter((field) => field.required && !data[field.name])
        .map((field) => `${field.label} is required`);

      if (stepRequiredErrors.length > 0) {
        setError(stepRequiredErrors.join(", "));
        return;
      }

      const updatedData = { ...formData, ...data };
      setFormData(updatedData);
      setError(null); // Clear previous errors

      try {
        await saveFormData(updatedData); // Save partial or full data
        if (step < steps.length - 1) {
          setStep(step + 1);
        } else {
          setIsComplete(true);
        }
      } catch (err: any) {
        setError(err.message || "Failed to save form data");
      }
    };

    const handlePrevStep = () => {
      if (step > 0) {
        setStep(step - 1);
      }
    };

    const variants = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      handleNextStep(data);
    };

    useImperativeHandle(ref, () => ({
      open: (initialData = {}) => {
        setFormData(initialData);
        setStep(0);
        setIsComplete(false);
        setError(null);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <div
          className={cn(
            "bg-black/80 backdrop-blur-lg mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl border border-white/10",
            className
          )}
        >
          {!isComplete ? (
            <>
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-white">
                  <span className="text-sm font-medium">
                    Step {step + 1} of {steps.length}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>

              <div className="mb-8 flex justify-between">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                        i < step
                          ? "bg-white text-black"
                          : i === step
                          ? "bg-white text-black ring-white/30 ring-2"
                          : "bg-white/20 text-white"
                      )}
                    >
                      {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className="mt-1 hidden text-xs sm:block text-white">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">
                      {steps[step].title}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {steps[step].description}
                    </p>
                  </div>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                    autoComplete="off"
                  >
                    {steps[step].fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-white">
                          {field.label}
                          {field.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </Label>
                        {field.type === "select" && "options" in field ? (
                          <select
                            id={field.name}
                            name={field.name}
                            defaultValue={formData[field.name] || ""}
                            className="flex h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-white placeholder-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                            required={field.required}
                          >
                            <option value="" disabled className="text-black">
                              {field.placeholder}
                            </option>
                            {field.options?.map((option: string) => (
                              <option
                                key={option}
                                value={option}
                                className="text-black"
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            defaultValue={formData[field.name] || ""}
                            required={field.required}
                            className="flex h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-white placeholder-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                          />
                        )}
                      </div>
                    ))}

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={step === 0}
                        className={cn(
                          step === 0 && "invisible",
                          "text-white border-white/30 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black hover:bg-white/90 hover:text-black"
                      >
                        {step === steps.length - 1 ? (
                          isSubmitting ? (
                            "Submitting..."
                          ) : (
                            "Join Waitlist"
                          )
                        ) : (
                          <>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-10 text-center"
            >
              <div className="bg-white/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle2 className="text-white h-8 w-8" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                You're on the waitlist!
              </h2>
              <p className="text-white/70 mb-6">
                Thank you for joining. We'll notify you when we launch.
              </p>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-white text-black hover:bg-white/90 hover:text-black"
              >
                Close
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export default MultiStepForm;
