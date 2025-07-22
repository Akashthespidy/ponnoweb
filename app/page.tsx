"use client";

import AccessUser, { AccessUserHandle } from "@/components/AccessUser";
import ContactUs, { ContactUsHandle } from "@/components/ContactUs";
import { Button } from "@/components/ui/button";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
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

type Feature = {
  title: string;
  icon: string;
  color: string;
  image: string;
};

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const accessUserRef = useRef<AccessUserHandle>(null);
  const contactUsRef = useRef<ContactUsHandle>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

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

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0140] to-[#11002b]">
      {/* Bubble Background */}
      <div className="fixed inset-0 -z-50">
        <BubbleBackground interactive className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}

        <header className="sticky top-0 z-[100] flex flex-col md:flex-row items-center justify-between border-b border-white/10 px-4 sm:px-6 md:px-10 py-3 backdrop-blur-md bg-transparent gap-2 md:gap-0">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="size-5"></div>
            <span className="text-white text-lg font-extrabold">Ponno</span>
          </div>
          <div className="relative w-full md:w-auto flex justify-center my-2 md:my-0">
            <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
              🚀 Launching Soon
            </span>
          </div>
          <nav className="flex w-full md:w-auto justify-end">
            <Button
              onClick={() => accessUserRef.current?.open()}
              className="h-10 px-4 w-full md:w-auto bg-white text-black text-sm font-bold hover:bg-white/90 transition-all"
            >
              Get started
            </Button>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative py-20 md:py-32 px-2 sm:px-4 text-center overflow-hidden">
          {/* Spotlight Background (MATCHES CTA section) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[35vw] max-w-3xl max-h-[400px] rounded-full bg-gradient-to-br from-black/80 via-purple-900/70 to-blue-900/80 blur-3xl opacity-90 pointer-events-none -z-10"
            aria-hidden="true"
          />

          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-2xl">
            Business Operations,
            <br />
            <span className="inline-block w-full md:w-auto">
              <RotatingText text={["Simplified", "Automated", "Optimized"]} />
            </span>
          </h1>

          <p className="text-white/90 text-lg sm:text-2xl md:text-3xl font-light max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
            Ponno streamlines your workflow with intuitive tools that unify
            sales, operations, and customer management in one powerful platform.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              accessUserRef.current?.open();
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 h-12 sm:h-14 px-4 sm:px-6 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all w-full"
            />
            <Button
              type="submit"
              className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-white text-black text-base sm:text-lg font-bold hover:bg-white/90 transition-all w-full sm:w-auto"
            >
              Join WaitList
            </Button>
          </form>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 px-2 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-8 drop-shadow-lg">
                Powerful Features
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-medium mb-8">
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
                    className="flex flex-col items-center justify-start h-full p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all text-white shadow-2xl cursor-pointer group min-h-[420px] sm:min-h-[520px]"
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View feature: ${feature.title}`}
                  >
                    {/* Image section */}
                    <div className="relative w-full flex-1 mb-8 rounded-3xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-center leading-snug mt-4 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-16 md:py-24 px-2 sm:px-4 text-center overflow-hidden">
          {/* Darker Spotlight Effect */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[35vw] max-w-3xl max-h-[400px] rounded-full bg-gradient-to-br from-black/80 via-purple-900/70 to-blue-900/80 blur-3xl opacity-90 pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white text-3xl sm:text-5xl font-bold mb-6 sm:mb-10 tracking-tight drop-shadow-lg">
              Ready to transform your business?
            </h2>
            <p className="text-white/80 text-lg sm:text-2xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Join forward-thinking companies using Ponno to simplify operations
              and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={() => accessUserRef.current?.open()}
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-white text-black text-base sm:text-lg font-bold hover:bg-white/90 transition-all w-full sm:w-auto"
              >
                Get started
              </Button>
              <Button
                onClick={() => contactUsRef.current?.open()}
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl border border-white/20 bg-transparent text-white text-base sm:text-lg font-medium hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Contact sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-2 sm:px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/60 text-base sm:text-lg">
              © {new Date().getFullYear()} Ponno. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Modals */}
        <AccessUser ref={accessUserRef} />
        <ContactUs ref={contactUsRef} />
      </div>
    </div>
  );
}
