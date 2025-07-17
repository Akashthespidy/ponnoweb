// Landing page for Ponno using animated UI components
"use client";

import { HighlightText } from "@/components/animate-ui/text/highlight";
import { RollingText } from "@/components/animate-ui/text/rolling";
import { SplittingText } from "@/components/animate-ui/text/splitting";
import { motion } from "framer-motion";
import {
  InputButtonProvider,
  InputButtonInput,
  InputButtonSubmit,
} from "@/components/animate-ui/buttons/input";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import * as LucideIcons from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ShimmeringText } from "@/components/animate-ui/text/shimmering";
import { Button } from "@/components/ui/button";
import AccessUser, { AccessUserHandle } from "@/components/AccessUser";
import ContactUs, { ContactUsHandle } from "@/components/ContactUs";
import { WritingText } from "@/components/animate-ui/text/writing";
import ShinyText from "@/components/ShinyText/ShinyText";
import { RotatingText } from "@/components/animate-ui/text/rotating";

type Feature = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  useEffect(() => {
    import("../data/data.json").then((mod) => {
      setFeatures(mod.features || []);
    });
  }, []);

  const accessUserRef = useRef<AccessUserHandle>(null);
  const contactUsRef = useRef<ContactUsHandle>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] dark:bg-background px-4 py-12">
      {/* Modals (hidden by default, controlled by refs) */}
      <AccessUser ref={accessUserRef} />
      <ContactUs ref={contactUsRef} />

      {/* Coming Soon badge */}
      <div className="mb-6">
        <HighlightText
          text="🚀 Launching Soon"
          className="text-sm font-semibold px-4 py-1 bg-blue-100 rounded-full border border-blue-300 shadow-sm animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
        />
      </div>
      <div className="mb-8 text-center">
        <ShinyText
          text="Ponno"
          className="text-5xl md:text-6xl text-blue-600 font-bold mb-2"
        />
        <RotatingText
          text={["Smart Solution", "Smart Business"]}
          className="text-2xl md:text-3xl font-semibold text-gray-700"
        />
      </div>

      {/* Main headline with entrance animation */}
      <MotionEffect fade slide={{ direction: "up", offset: 40 }}>
        <div className="relative inline-block">
          {/* Surprise Square */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1.2, opacity: 0.2, rotate: 45 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-500 rounded-lg -translate-x-1/2 -translate-y-1/2 z-0"
          />

          {/* Headline on top */}
          <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-center mb-2 leading-tight">
            <RollingText text="Your Business," className="block" />
            <span className="block text-primary mt-2">
              <RollingText text="Simplified" className="block text-blue-600" />
            </span>
          </h1>
        </div>
      </MotionEffect>

      <MotionEffect fade slide={{ direction: "up", offset: 40 }} delay={0.1}>
        <div className="text-xl md:text-2xl text-center text-muted-foreground font-medium mb-8 max-w-2xl whitespace-pre-wrap">
          <div className="mb-2 whitespace-normal">
            <ShimmeringText
              text="Ponno combines social commerce, inventory management, POS, and marketing into one powerful platform."
              className="inline-block"
            />
          </div>
          <WritingText
            text="No tech skills required."
            className="text-blue-600 text-xl md:text-2xl font-semibold inline-block whitespace-nowrap"
          />
        </div>
      </MotionEffect>

      {/* Email waitlist form (always visible, animated) */}
      <form
        className="mb-10 flex justify-center w-full max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          accessUserRef.current?.open();
        }}
      >
        <Button
          type="submit"
          className="h-14 px-8 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md flex items-center gap-2"
        >
          <SplittingText
            text="Join Waitlist"
            type="words"
            className="animate-pulse"
          />
          <span>😃</span>
        </Button>
      </form>

      {/* Features (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl text-center">
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
            ✓
          </span>

          <span className="font-medium">
            Save 10+ hours per week on manual tasks
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
            ✓
          </span>
          <span className="font-medium">
            Increase sales by 40% with unified commerce
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
            ✓
          </span>
          <span className="font-medium">Reduce cart abandonment by 60%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
            ✓
          </span>
          <span className="font-medium">Automate 80% of customer support</span>
        </div>
      </div>

      {/* Features Section 2 (unchanged) */}
      <section className="w-full max-w-6xl mx-auto mt-24 px-2 md:px-0">
        <MotionEffect fade slide={{ direction: "up", offset: 40 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Everything you need to grow your business
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop juggling multiple tools. Ponno brings all your business
            operations into one intuitive platform.
          </p>
        </MotionEffect>
        <MotionHighlight>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                Loading features...
              </div>
            ) : (
              features.map((feature, idx) => {
                const Icon =
                  (LucideIcons as any)[feature.icon] || LucideIcons.Circle;
                return (
                  <MotionEffect
                    key={feature.title}
                    fade
                    slide={{ direction: "up", offset: 40 }}
                    delay={idx * 0.08}
                  >
                    <div
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3 items-start hover:shadow-lg transition relative group"
                      data-value={feature.title}
                      data-highlight="true"
                    >
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-lg mb-2"
                        style={{ background: feature.color }}
                      >
                        <Icon className="w-6 h-6 text-gray-700" />
                      </span>
                      <h3 className="font-semibold text-m mb-1">
                        <WritingText text={feature.title} />
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </MotionEffect>
                );
              })
            )}
          </div>
        </MotionHighlight>
      </section>

      {/* Animated Call-to-Action Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-24 mt-24 flex flex-col items-center justify-center">
        <MotionEffect fade zoom slide={{ direction: "up", offset: 40 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
            Ready to transform your business?
          </h2>
          <p className="text-center text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of business owners who are waiting to experience the
            future of commerce management.
          </p>

          {/* Email form */}
          <form
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl mx-auto mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              accessUserRef.current?.open();
            }}
          >
            <Button
              type="submit"
              className="h-14 px-8 text-lg font-semibold bg-white text-blue-700 rounded-md hover:bg-blue-100 transition shadow-md flex items-center gap-2 active:scale-95"
            >
              <HighlightText
                text="Get Early Access"
                className="text-m font-semibold px-4 py-1 bg-blue-100   animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
              />
              <span className="animate-bounce">⚡</span>
            </Button>
          </form>
        </MotionEffect>
      </section>

      <footer className="w-full bg-gray-900 text-white py-10 flex flex-col items-center gap-4">
        <div className="w-full max-w-xl flex justify-center">
          <Button
            type="button"
            onClick={() => contactUsRef.current?.open()}
            className="h-12 px-6 text-lg font-semibold border border-white text-white bg-white/10 hover:bg-white/20 transition shadow-md rounded-full flex items-center gap-2 animate-pulse"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-semibold">
              📩 Contact Us
            </span>
          </Button>
        </div>

        {/* Branding */}
        <div className="text-2xl font-bold">Ponno</div>
        <div className="text-lg text-gray-300">Your business, simplified.</div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Ponno. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
