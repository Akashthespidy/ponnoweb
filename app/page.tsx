// Landing page for Ponno using animated UI components
'use client';

import { HighlightText } from '@/components/animate-ui/text/highlight';
import { RollingText } from '@/components/animate-ui/text/rolling';
import { SplittingText } from '@/components/animate-ui/text/splitting';
import {
  InputButtonProvider,
  InputButtonInput,
  InputButtonSubmit,
} from '@/components/animate-ui/buttons/input';
import { MotionEffect } from '@/components/animate-ui/effects/motion-effect';
import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight';
import * as LucideIcons from 'lucide-react';
import featuresData from '../components.json';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] dark:bg-background px-4 py-12">
      {/* Coming Soon badge */}
      <div className="mb-6">
        <HighlightText text="Coming Soon" className="text-sm font-semibold px-4 py-1" />
      </div>

      {/* Main headline */}
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-2 leading-tight">
        <RollingText text="Your Business," className="block" />
        <span className="block text-primary mt-2">
          <RollingText text="Simplified" className="block text-blue-600" />
        </span>
      </h1>

      {/* Subheadline */}
      <div className="text-xl md:text-2xl text-center text-muted-foreground font-medium mb-8 max-w-2xl">
        <SplittingText
          text="Ponno combines social commerce, inventory management, POS, and marketing into one powerful platform. No tech skills required."
          type="words"
        />
      </div>

      <InputButtonProvider className="mb-10 w-full max-w-xl">
  <form className="flex w-full gap-2 flex-col sm:flex-row" onSubmit={(e) => e.preventDefault()}>
    <InputButtonInput
      type="email"
      placeholder="Enter your email"
      required
      className="text-lg h-14 px-4 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <InputButtonSubmit className="h-14 px-6 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
      Join Waitlist
    </InputButtonSubmit>
  </form>
</InputButtonProvider>



      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl text-center">
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
  ✓
</span>

          <span className="font-medium">Save 10+ hours per week on manual tasks</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-xl mb-2 shadow">
  ✓
</span>
          <span className="font-medium">Increase sales by 40% with unified commerce</span>
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

      {/* Features Section 2 */}
      <section className="w-full max-w-6xl mx-auto mt-24 px-2 md:px-0">
        <MotionEffect fade slide={{ direction: 'up', offset: 40 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Everything you need to grow your business
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop juggling multiple tools. Ponno brings all your business operations into one intuitive platform.
          </p>
        </MotionEffect>
        <MotionHighlight>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuresData.features.map((feature, idx) => {
              const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Circle;
              return (
                <MotionEffect
                  key={feature.title}
                  fade
                  slide={{ direction: 'up', offset: 40 }}
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
                    <h3 className="font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </MotionEffect>
              );
            })}
          </div>
        </MotionHighlight>
      </section>
    </main>
  );
}
