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
  <form className="flex w-full relative" onSubmit={(e) => e.preventDefault()}>
    <InputButtonInput
      type="email"
      placeholder="Enter your email"
      required
      className="text-lg h-14 w-full px-4"
    />
    <InputButtonSubmit className="absolute right-1 top-1 h-12 px-6 text-lg font-semibold">
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
          <span className="text-green-500 text-2xl mb-2">✓</span>
          <span className="font-medium">Increase sales by 40% with unified commerce</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-2xl mb-2">✓</span>
          <span className="font-medium">Reduce cart abandonment by 60%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-2xl mb-2">✓</span>
          <span className="font-medium">Automate 80% of customer support</span>
        </div>
      </div>
    </main>
  );
}
