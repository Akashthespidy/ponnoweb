"use client";

import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";
import { Swiper, SwiperSlide } from "swiper/react";
import { RotatingText } from "@/components/animate-ui/text/rotating";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ContactUs, { ContactUsHandle } from "@/components/ContactUs";
import MultiStepForm, {
  MultiStepFormHandle,
} from "@/components/ui/multi-step-form";
import Logomarquee from "@/components/logomarquee";
import SocialCommerceHub from "@/components/nexusorb";

type Feature = {
  title: string;
  icon: string;
  color: string;
  image: string;
};

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const multiStepFormRef = useRef<MultiStepFormHandle>(null);
  const contactUsRef = useRef<ContactUsHandle>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const joinWaitlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("../data/data.json").then((mod) => {
      setFeatures(mod.features || []);
    });
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay?.start();
    }
  }, [features]);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    multiStepFormRef.current?.open({ email });
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#e8e4f2] via-[#f3f1fa] to-[#fcfbff]">
      {/* Bubble Background */}
      <div className="fixed inset-0 -z-50">
        <BubbleBackground interactive className="w-full h-full opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-[100] flex flex-col md:flex-row items-center justify-between border-b border-black/10 px-4 sm:px-6 md:px-10 py-3 backdrop-blur-md bg-transparent gap-2 md:gap-0">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="size-5" />
            <span className="text-black text-lg font-extrabold">Ponno</span>
          </div>
          <div className="relative w-full md:w-auto flex justify-center my-2 md:my-0">
            <span className="inline-flex items-center bg-black text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium shadow-md">
              🚀 Launching Soon
            </span>
          </div>
          <Button
            onClick={() => {
              joinWaitlistRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="h-10 px-6 rounded-xl bg-black text-white text-base font-bold hover:bg-neutral-900 transition-all w-full md:w-auto"
          >
            Get Started
          </Button>
        </header>

        {/* Hero Section (Join Waitlist) */}
        <section
          ref={joinWaitlistRef}
          className="relative py-20 md:py-32 px-2 sm:px-4 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_0%,_transparent_100%)] blur-[160px] -z-10" />

          <h1 className="text-black text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow">
            Business Operations,
            <br />
            <span className="inline-block w-full md:w-auto">
              <RotatingText text={["Simplified", "Automated", "Optimized"]} />
            </span>
          </h1>

          <p className="text-black/90 text-lg sm:text-2xl md:text-3xl font-light max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
            Ponno streamlines your workflow with intuitive tools that unify
            sales, operations, and customer management in one powerful platform.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-lg mx-auto"
            onSubmit={handleJoinWaitlist}
          >
            <div className="w-full relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(""); // Clear error when typing
                }}
                placeholder="Enter your email"
                className={`flex-1 h-12 sm:h-14 px-4 sm:px-6 rounded-xl border ${
                  emailError ? "border-red-500" : "border-black/30"
                } bg-white/80 text-black placeholder-black/50 focus:outline-none focus:ring-2 ${
                  emailError ? "focus:ring-red-500" : "focus:ring-black/30"
                } transition-all w-full backdrop-blur-sm`}
              />
              {emailError && (
                <p className="absolute -bottom-5 left-0 text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-black text-white text-base sm:text-lg font-bold hover:bg-neutral-900 transition-all w-full sm:w-auto"
            >
              Join Waitlist
            </Button>
          </form>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 px-2 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-black text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-8 drop-shadow">
                Powerful Features
              </h2>
              <p className="text-black/70 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-medium mb-8">
                Everything you need to manage and grow your business efficiently
              </p>
            </div>

            <Swiper
              key={features.length}
              className="feature-carousel px-2 sm:px-0"
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 2,
                slideShadows: false,
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index} className="!w-[420px] sm:!w-[520px]">
                  <div
                    className="flex flex-col items-center justify-start h-full p-8 rounded-3xl border border-black/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all text-black shadow-2xl cursor-pointer group min-h-[420px] sm:min-h-[520px]"
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View feature: ${feature.title}`}
                  >
                    <div className="relative w-full flex-1 mb-8 rounded-3xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-center leading-snug mt-4 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <SocialCommerceHub />
        {/* CTA Section */}
        <section className="relative py-16 md:py-24 px-2 sm:px-4 text-center overflow-hidden bg-gradient-to-br from-purple-80 via-[#f4f4f6] to-blue-80">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,244,255,0.10)_0%,_rgba(233,234,254,0.05)_30%,_transparent_120%)] blur-[100px] -z-10"
            aria-hidden="true"
          />

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-gray-900 text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 tracking-tight drop-shadow-md">
              Ready to transform your business?
            </h2>

            <p className="text-gray-800 text-lg sm:text-2xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Join forward-thinking companies using Ponno to simplify operations
              and drive growth.
            </p>

            <div>
              <form
                className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-lg mx-auto"
                onSubmit={handleJoinWaitlist}
              >
                <div className="w-full relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(""); // Clear error when typing
                    }}
                    placeholder="Enter your email"
                    className={`flex-1 h-12 sm:h-14 px-4 sm:px-6 rounded-xl border ${
                      emailError ? "border-red-500" : "border-black/30"
                    } bg-white/80 text-black placeholder-black/50 focus:outline-none focus:ring-2 ${
                      emailError ? "focus:ring-red-500" : "focus:ring-black/30"
                    } transition-all w-full backdrop-blur-sm`}
                  />
                  {emailError && (
                    <p className="absolute -bottom-5 left-0 text-red-500 text-xs mt-1">
                      {emailError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-black text-white text-base sm:text-lg font-bold hover:bg-neutral-900 transition-all w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </form>
              <Button
                onClick={() => contactUsRef.current?.open()}
                className="mt-4 h-12 sm:h-14 px-6 sm:px-8 rounded-xl border border-black/10 bg-white/30 backdrop-blur-sm text-black text-base sm:text-lg font-medium hover:bg-white/50 transition-all w-full sm:w-auto"
              >
                Contact sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-2 sm:px-4 border-t border-black/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-black/60 text-base sm:text-lg">
              © {new Date().getFullYear()} Ponno. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Modals */}
        <MultiStepForm ref={multiStepFormRef} />
        <ContactUs ref={contactUsRef} />
      </div>
    </div>
  );
}
