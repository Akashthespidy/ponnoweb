"use client";

import AccessUser, { AccessUserHandle } from "@/components/AccessUser";
import ContactUs, { ContactUsHandle } from "@/components/ContactUs";
import { Button } from "@/components/ui/button";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { useRef, useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
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
  description: string;
  icon: string;
  color: string;
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

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0140] to-[#11002b]">
      {/* Bubble Background */}
      <div className="fixed inset-0 -z-50">
        <BubbleBackground interactive className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <MotionHighlight>
          <header className="sticky top-0 z-[100] flex items-center justify-between border-b border-white/10 px-6 md:px-10 py-3 backdrop-blur-md bg-white/5">
            <div className="flex items-center gap-4">
              <div className="size-5"></div>
              <span className="text-white text-lg font-extrabold">Ponno</span>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                🚀 Launching Soon
              </span>
            </div>

            <nav className="flex justify-end">
              <Button
                onClick={() => accessUserRef.current?.open()}
                className="h-10 px-4 bg-white text-black text-sm font-bold hover:bg-white/90 transition-all"
              >
                Get started
              </Button>
            </nav>
          </header>
        </MotionHighlight>

        {/* Hero */}
        <MotionHighlight>
          <section className="relative py-24 px-4 text-center">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              Business Operations,
              <br />
              <span className="inline-block w-full md:w-auto">
                <RotatingText text={["Simplified", "Automated", "Optimized"]} />
              </span>
            </h1>

            <p className="text-white/80 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-8">
              Ponno streamlines your workflow with intuitive tools that unify
              sales, operations, and customer management in one powerful
              platform.
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
                className="flex-1 h-14 px-6 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <Button
                type="submit"
                className="h-14 px-8 rounded-xl bg-white text-black text-lg font-bold hover:bg-white/90 transition-all"
              >
                Get started
              </Button>
            </form>
          </section>
        </MotionHighlight>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-white text-5xl md:text-7xl font-extrabold">
                Powerful Features
              </h2>
              <p className="text-white/70 max-w-xl mx-auto">
                Everything you need to manage and grow your business efficiently
              </p>
            </div>

            <Swiper
              className="feature-carousel"
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
              {features.map((feature, index) => {
                const Icon =
                  (LucideIcons as any)[feature.icon] || LucideIcons.Circle;
                return (
                  <SwiperSlide key={index} className="!w-[300px]">
                    <div
                      className="aspect-square w-full flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all text-white shadow-lg"
                      onClick={() => swiperRef.current?.slideToLoop(index)}
                    >
                      <div className={`text-${feature.color}`}>
                        <Icon className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white text-4xl font-bold mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-white/70 text-xl mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies using Ponno to simplify operations
              and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => accessUserRef.current?.open()}
                className="h-14 px-8 rounded-xl bg-white text-black text-lg font-bold hover:bg-white/90 transition-all"
              >
                Get started
              </Button>
              <Button
                onClick={() => contactUsRef.current?.open()}
                className="h-14 px-8 rounded-xl border border-white/20 bg-transparent text-white text-lg font-medium hover:bg-white/10 transition-all"
              >
                Contact sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/50 text-sm">
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
