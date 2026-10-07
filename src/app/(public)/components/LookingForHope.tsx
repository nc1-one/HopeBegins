'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  HandHeart,
  Heart,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  Radio,
  Sunrise,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ECOACH_URL } from '@/lib/actionPlan';
import { analyticsService } from '@/services/analyticsService';

// The second step lives at /#start so the browser back button returns to the
// question, and other pages can link straight past it.
const START_HASH = '#start';

const featuredPaths = [
  {
    title: "I Don't Have Hope",
    description: 'Start Hopeful Beginning, a guided journey in five steps.',
    cta: 'Start the journey',
    icon: Sunrise,
    href: '/get-started',
  },
  {
    title: 'I Need a Plan',
    description:
      'Answer 9 quick questions. Get a free, personal plan with steps to manage anxiety, low mood and stress.',
    cta: 'Get my free plan',
    icon: ClipboardList,
    href: '/action-plan',
  },
];

const paths = [
  {
    title: 'I Need Someone to Pray for Me',
    description: 'Send a prayer request. A Hope Carrier will pray for you.',
    icon: Heart,
    href: '/prayers',
  },
  {
    title: 'I Need to Talk to Hope AI',
    description: 'Chat with Hope, our AI assistant. Open 24/7.',
    icon: MessageSquare,
    href: '/hope-ai',
  },
  {
    title: 'I Need to Hear Hope Today',
    description:
      'Listen to HopeCasts on topics like anxiety, family and healing.',
    icon: Radio,
    href: '/hopecasts',
  },
  {
    title: 'I Need Daily Hope',
    description: 'Get a Daily Hope Drop in your email every day for 21 days.',
    icon: Mail,
    href: '/daily-hope',
  },
];

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

function CrisisLine({ className }: { className?: string }) {
  return (
    <p className={`text-sm leading-relaxed ${className ?? ''}`}>
      In crisis or thinking of ending your life? Call the NCMH Crisis Hotline,
      24/7:{' '}
      <a
        href="tel:1553"
        className="font-bold underline underline-offset-4 whitespace-nowrap"
      >
        1553
      </a>{' '}
      or{' '}
      <a
        href="tel:+639178998727"
        className="font-bold underline underline-offset-4 whitespace-nowrap"
      >
        0917 899 8727
      </a>
    </p>
  );
}

export function LookingForHope({ children }: { children?: React.ReactNode }) {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => ''
  );
  const showPaths = hash === START_HASH;
  const pathsHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!showPaths) return;
    window.scrollTo({ top: 0 });
    pathsHeadingRef.current?.focus({ preventScroll: true });
  }, [showPaths]);

  const handleStart = () => {
    analyticsService.recordClick('looking_for_hope');
    window.location.hash = START_HASH;
  };

  if (!showPaths) {
    return (
      <section
        aria-labelledby="looking-for-hope-title"
        className="relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden bg-black"
      >
        {/* Background Video Container */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/hero-poster.jpg"
            className="w-full h-full object-cover object-top"
          >
            <source
              src="/assets/video/Hero-video-banner.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/75" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <h1
            id="looking-for-hope-title"
            className="text-balance font-playfair text-5xl md:text-8xl text-white leading-[0.95] tracking-[-0.04em] drop-shadow-2xl"
          >
            Not okay <em className="text-[#EFF3E7]">today</em>?
          </h1>

          <button
            type="button"
            onClick={handleStart}
            className="group mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 font-poppins text-lg font-bold text-[#6E5F47] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-reduce:hover:translate-y-0"
          >
            That&apos;s me
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </button>

          <Link
            href="/give-hope"
            className="mt-6 text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none"
          >
            Here to donate instead?
          </Link>
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-28 text-center md:pb-8">
          <CrisisLine className="text-white/80" />
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        aria-labelledby="paths-title"
        className="px-6 pt-10 pb-24 md:pt-14 animate-in fade-in duration-500 motion-reduce:animate-none"
      >
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 -ml-3 rounded-xl px-3 py-2 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2
            id="paths-title"
            ref={pathsHeadingRef}
            tabIndex={-1}
            className="mt-6 font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
          >
            What do you need right now?
          </h2>

          <div className="mt-10 space-y-4">
            {featuredPaths.map((path) => (
              <Link key={path.href} href={path.href} className="group block">
                <Card className="border-[#DFE7CF] bg-[#EFF3E7] transition-all duration-500 hover:border-[#C6D6AC] hover:shadow-xl hover:shadow-[#6E5F47]/5 group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/40">
                  <CardContent className="p-6 md:px-10 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="self-start md:self-auto p-4 rounded-2xl bg-white text-[#91AFAA] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none">
                      <path.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-bold text-2xl text-[#6E5F47]">
                        {path.title}
                      </h3>
                      <p className="mt-1 max-w-xl text-base text-[#6E5F47] leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center font-poppins font-bold text-[#6E5F47]">
                      {path.cta}
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <TrackedLink
              href={ECOACH_URL}
              target="_blank"
              rel="noopener noreferrer"
              linkName="ecoach_menu"
              className="group block"
            >
              <Card className="border-none bg-[#6E5F47] text-white transition-all duration-500 hover:shadow-xl hover:shadow-[#6E5F47]/20 group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/40">
                <CardContent className="p-6 md:px-10 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="self-start md:self-auto p-4 rounded-2xl bg-white text-[#6E5F47] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-bold text-2xl">
                      I Want Someone to Journey With Me
                    </h3>
                    <p className="mt-1 max-w-xl text-base text-white/85 leading-relaxed">
                      Talk to an e-coach from Himala Everyday on Messenger.
                    </p>
                  </div>
                  <span className="inline-flex items-center font-poppins font-bold">
                    Talk to an e-coach
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </CardContent>
              </Card>
            </TrackedLink>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {paths.map((path) => (
              <Link key={path.href} href={path.href} className="group">
                <Card className="h-full bg-white border-zinc-100 transition-all duration-500 hover:border-[#DFE7CF] hover:shadow-xl hover:shadow-[#6E5F47]/5 group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/40">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-[#E9EFEE] text-[#91AFAA] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none">
                      <path.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
                        {path.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#6E5F47] leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 shrink-0 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-[#6E5F47]">
            <Lock className="mt-0.5 w-4 h-4 shrink-0 text-[#91AFAA]" />
            <span>
              What you share is kept private and confidential.{' '}
              <Link
                href="/privacy"
                className="font-bold underline underline-offset-4"
              >
                Read our privacy policy
              </Link>
            </span>
          </p>

          <div className="mt-10 pt-8 border-t border-[#E2DFDA] flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <Link
              href="/give-hope"
              className="inline-flex items-center gap-3 text-[#6E5F47] hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none"
            >
              <HandHeart className="w-5 h-5 text-[#91AFAA]" />
              <span className="font-bold">Here to donate instead?</span>
            </Link>
            <CrisisLine className="max-w-md text-[#6E5F47] md:text-right" />
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
