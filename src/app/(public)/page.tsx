import type { Metadata } from 'next';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HopeStoriesSection } from '@/components/sections/HopeStoriesSection';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Reveal } from '@/components/ui/Reveal';
import { LookingForHope } from './components/LookingForHope';

// Set here, not in the root layout, which every page would inherit.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/** A phone with a prayer list, two prayers answered. Drawn, not a screenshot. */
function PrayerListPhone() {
  const rows = [true, false, true, false];
  return (
    <svg
      viewBox="0 0 200 360"
      aria-hidden
      className="hidden h-auto w-40 shrink-0 sm:block md:w-48"
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="340"
        rx="30"
        fill="rgb(255 255 255 / 0.08)"
        stroke="rgb(255 255 255 / 0.35)"
        strokeWidth="2"
      />
      <rect
        x="80"
        y="24"
        width="40"
        height="7"
        rx="3.5"
        fill="rgb(255 255 255 / 0.35)"
      />
      <rect
        x="30"
        y="52"
        width="96"
        height="11"
        rx="5.5"
        fill="rgb(255 255 255 / 0.75)"
      />
      <rect
        x="30"
        y="70"
        width="64"
        height="7"
        rx="3.5"
        fill="rgb(255 255 255 / 0.35)"
      />
      {rows.map((answered, index) => {
        const y = 94 + index * 60;
        return (
          <g key={index}>
            <rect
              x="26"
              y={y}
              width="148"
              height="48"
              rx="14"
              fill="rgb(255 255 255 / 0.1)"
            />
            <circle
              cx="50"
              cy={y + 24}
              r="11"
              fill={answered ? '#AEC488' : 'none'}
              stroke={answered ? 'none' : 'rgb(255 255 255 / 0.45)'}
              strokeWidth="2"
            />
            {answered && (
              <path
                d={`M44.5 ${y + 24}l4 4 7-8`}
                stroke="#3F3729"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
            <rect
              x="70"
              y={y + 15}
              width="84"
              height="7"
              rx="3.5"
              fill="rgb(255 255 255 / 0.7)"
            />
            <rect
              x="70"
              y={y + 28}
              width="52"
              height="6"
              rx="3"
              fill="rgb(255 255 255 / 0.3)"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function LandingPage() {
  return (
    <LookingForHope>
      {/* War Room Section */}
      <section className="px-6 pb-24">
        <Reveal className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-[#6b634d] to-zinc-900 border-none overflow-hidden shadow-2xl relative group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors duration-700"></div>

            <CardContent className="p-8 md:p-14 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-2">
                  <Smartphone className="w-4 h-4" />
                  Free app
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins leading-tight">
                  Prayer War Room <br />
                  <span className="text-zinc-400 text-2xl md:text-3xl font-medium">
                    by HopeBegins
                  </span>
                </h2>
                <p className="text-lg text-zinc-300 max-w-xl leading-relaxed">
                  A free prayer app. Follow a guided prayer time, keep a private
                  journal, and share answered prayers with family and friends.
                </p>
                <div className="pt-4">
                  <TrackedLink
                    href="https://warroom.hopebegins.today"
                    target="_blank"
                    rel="noopener noreferrer"
                    linkName="war_room"
                    className="inline-flex items-center justify-center bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-200 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn"
                  >
                    Open Prayer War Room
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </TrackedLink>
                </div>
              </div>
              <PrayerListPhone />
            </CardContent>
          </Card>
        </Reveal>
      </section>

      {/* Testimonials Section */}
      <Reveal>
        <HopeStoriesSection />
      </Reveal>
    </LookingForHope>
  );
}
