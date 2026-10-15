'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BatteryLow,
  HeartPulse,
  ClipboardList,
  HandHeart,
  Heart,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  Moon,
  Radio,
  Sunrise,
  UserRound,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { CalmDownNow } from '@/components/tools/CalmDownNow';
import { dayOfPlan, useSavedPlan } from '@/lib/actionPlanStore';
import { PLAN_DAYS } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import { useLanguage } from '@/lib/languagePreference';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { analyticsService } from '@/services/analyticsService';

// The second step lives at /#start so the browser back button returns to the
// question, and other pages can link straight past it.
const START_HASH = '#start';

// Each answer opens the page written for that feeling, in the chosen language.
const feelings = [
  {
    id: 'anxious',
    icon: HeartPulse,
    en: {
      label: 'I feel anxious',
      hint: 'A 2-minute exercise to calm your body',
      href: '/how-to-calm-anxiety',
    },
    tl: {
      label: 'Kinakabahan ako',
      hint: '2-minute na exercise para kumalma',
      href: '/paano-mawala-ang-anxiety',
    },
  },
  {
    id: 'tired',
    icon: BatteryLow,
    en: {
      label: "I'm tired of everything",
      hint: 'One small step for today',
      href: '/tired-of-everything',
    },
    tl: {
      label: 'Pagod na ako',
      hint: 'Isang maliit na hakbang para ngayong araw',
      href: '/pagod-na-ako',
    },
  },
  {
    id: 'alone',
    icon: UserRound,
    en: {
      label: 'I feel alone',
      hint: 'Someone you can talk to today',
      href: '/i-feel-alone',
    },
    tl: {
      label: 'Wala akong kausap',
      hint: 'May makakausap ka ngayon',
      href: '/wala-akong-kausap',
    },
  },
  {
    id: 'sleep',
    icon: Moon,
    en: {
      label: "I can't sleep from overthinking",
      hint: 'What to do tonight',
      href: '/cant-sleep-overthinking',
    },
    tl: {
      label: 'Hindi ako makatulog sa kakaisip',
      hint: 'Ano ang gagawin ngayong gabi',
      href: '/hindi-makatulog-sa-kakaisip',
    },
  },
  {
    id: 'hopeless',
    icon: Sunrise,
    en: {
      label: "I don't have hope",
      hint: 'A guided journey in five steps',
      href: '/get-started',
    },
    tl: {
      label: 'Wala na akong pag-asa',
      hint: 'Gabay sa limang hakbang, nasa English',
      href: '/get-started',
    },
  },
];

const notSure = {
  en: {
    label: "I'm not sure what I feel",
    hint: 'Answer 9 quick questions and get a free plan made for you',
  },
  tl: {
    label: 'Hindi ko alam kung ano ang nararamdaman ko',
    hint: 'Sagutin ang 9 na tanong at makakuha ng libreng plano. Nasa English.',
  },
};

const menuCopy = {
  en: {
    heading: 'How are you feeling right now?',
    subtitle: 'Pick the one closest to how you feel.',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `You're on day ${day} of your plan.`,
    planSaved: 'Your plan is saved on this phone.',
    openPlan: 'Open my plan',
    ecoachTitle: 'I Want Someone to Journey With Me',
    ecoachText: 'Talk to an e-coach from Himala Everyday on Messenger.',
    ecoachButton: 'Talk to an e-coach',
    moreWays: 'More ways we can help',
    privacy: 'What you share is kept private and confidential.',
    privacyLink: 'Read our privacy policy',
    donate: 'Here to donate instead?',
  },
  tl: {
    heading: 'Ano ang nararamdaman mo ngayon?',
    subtitle: 'Piliin ang pinakamalapit sa nararamdaman mo.',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `Day ${day} mo na sa plano mo.`,
    planSaved: 'Naka-save ang plano mo sa phone na ito.',
    openPlan: 'Buksan ang plano ko',
    ecoachTitle: 'Gusto ko ng kasama sa pinagdadaanan ko',
    ecoachText: 'Kausapin ang isang e-coach ng Himala Everyday sa Messenger.',
    ecoachButton: 'Kausapin ang e-coach',
    moreWays: 'Iba pang paraan para makatulong',
    privacy: 'Pribado at kumpidensyal ang lahat ng ibinabahagi mo.',
    privacyLink: 'Basahin ang privacy policy namin',
    donate: 'Gusto mo bang mag-donate?',
  },
};

const morePaths = [
  {
    title: { en: 'I Need Someone to Pray for Me', tl: 'Ipagdasal ninyo ako' },
    icon: Heart,
    href: '/prayers',
  },
  {
    title: {
      en: 'I Need to Talk to Hope AI',
      tl: 'Gusto kong kausapin si Hope AI',
    },
    icon: MessageSquare,
    href: '/hope-ai',
  },
  {
    title: {
      en: 'I Need to Hear Hope Today',
      tl: 'Gusto kong makarinig ng pag-asa ngayon',
    },
    icon: Radio,
    href: '/hopecasts',
  },
  {
    title: { en: 'I Need Daily Hope', tl: 'Gusto ko ng Daily Hope' },
    icon: Mail,
    href: '/daily-hope',
  },
];

const feelingCardClass =
  'group flex h-full items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

const crisisCopy = {
  en: {
    lead: 'In crisis or thinking of ending your life? Call the NCMH Crisis Hotline, 24/7:',
    or: 'or',
  },
  tl: {
    lead: 'Nasa crisis ka ba o naiisip mong tapusin ang buhay mo? Tumawag sa NCMH Crisis Hotline, 24/7:',
    or: 'o',
  },
};

function CrisisLine({
  className,
  lang = 'en',
}: {
  className?: string;
  lang?: FeelingLang;
}) {
  return (
    <p lang={lang} className={`text-sm leading-relaxed ${className ?? ''}`}>
      {crisisCopy[lang].lead}{' '}
      <a
        href="tel:1553"
        className="font-bold underline underline-offset-4 whitespace-nowrap"
      >
        1553
      </a>{' '}
      {crisisCopy[lang].or}{' '}
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
  const lang = useLanguage();
  const t = menuCopy[lang];
  const savedPlan = useSavedPlan();
  const planDay = savedPlan ? dayOfPlan(savedPlan.startedAt) + 1 : 0;
  const pathsHeadingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The hero video is 8 MB. Phones, data-saver and reduced-motion visitors
  // keep the poster image; larger screens play the video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!isLargeScreen || reduceMotion || connection?.saveData) return;
    video.play().catch(() => {});
  }, [showPaths]);

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
            ref={videoRef}
            preload="none"
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
        lang={lang}
        className="px-6 pt-10 pb-24 md:pt-14 animate-in fade-in duration-500 motion-reduce:animate-none"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <LanguageSwitch />
          </div>

          {savedPlan && (
            <TrackedLink
              href="/action-plan"
              linkName="menu_welcome_back_plan"
              className="group mt-6 flex flex-col gap-3 rounded-2xl bg-[#EFF3E7] p-5 text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 md:flex-row md:items-center md:px-8"
            >
              <span className="md:flex-1">
                <span className="font-poppins font-bold">
                  {t.welcomeBack}
                  {savedPlan.name ? `, ${savedPlan.name}` : ''}.
                </span>{' '}
                {planDay <= PLAN_DAYS ? t.planDay(planDay) : t.planSaved}
              </span>
              <span className="inline-flex items-center font-poppins font-bold">
                {t.openPlan}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </span>
            </TrackedLink>
          )}

          <h1
            id="paths-title"
            ref={pathsHeadingRef}
            tabIndex={-1}
            className="mt-6 font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
          >
            {t.heading}
          </h1>
          <p className="mt-3 text-lg text-[#6E5F47]">{t.subtitle}</p>

          <div className="mt-8">
            <CalmDownNow lang={lang} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {feelings.map((feeling) => {
              const option = feeling[lang];
              return (
                <TrackedLink
                  key={feeling.id}
                  href={option.href}
                  linkName={`menu_feeling_${feeling.id}`}
                  className={`${feelingCardClass} border-zinc-100 bg-white hover:border-[#DFE7CF]`}
                >
                  <span className="rounded-xl bg-[#E9EFEE] p-3 text-[#91AFAA]">
                    <feeling.icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-poppins text-lg font-bold text-[#6E5F47]">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-[#6E5F47]">
                      {option.hint}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
                </TrackedLink>
              );
            })}
            <TrackedLink
              href="/action-plan"
              linkName="menu_feeling_unsure"
              className={`${feelingCardClass} border-[#DFE7CF] bg-[#EFF3E7] hover:border-[#C6D6AC]`}
            >
              <span className="rounded-xl bg-white p-3 text-[#91AFAA]">
                <ClipboardList className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-poppins text-lg font-bold text-[#6E5F47]">
                  {notSure[lang].label}
                </span>
                <span className="mt-0.5 block text-sm text-[#6E5F47]">
                  {notSure[lang].hint}
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#6E5F47] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </TrackedLink>
          </div>

          <EcoachLink linkName="ecoach_menu" className="group mt-4 block">
            <Card className="border-none bg-[#6E5F47] text-white transition-all duration-500 hover:shadow-xl hover:shadow-[#6E5F47]/20 group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/40">
              <CardContent className="p-6 md:px-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="self-start md:self-auto p-4 rounded-2xl bg-white text-[#6E5F47] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 motion-reduce:transition-none">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2 className="font-poppins font-bold text-2xl">
                    {t.ecoachTitle}
                  </h2>
                  <p className="mt-1 max-w-xl text-base text-white/85 leading-relaxed">
                    {t.ecoachText}
                  </p>
                </div>
                <span className="inline-flex items-center font-poppins font-bold">
                  {t.ecoachButton}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </CardContent>
            </Card>
          </EcoachLink>

          <h2 className="mt-10 font-poppins text-sm font-bold uppercase tracking-widest text-[#6E5F47]">
            {t.moreWays}
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {morePaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white px-5 py-4 transition-all duration-300 hover:border-[#DFE7CF] hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
              >
                <path.icon className="h-5 w-5 shrink-0 text-[#91AFAA]" />
                <span className="flex-1 font-poppins font-bold text-[#6E5F47]">
                  {path.title[lang]}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
              </Link>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-[#6E5F47]">
            <Lock className="mt-0.5 w-4 h-4 shrink-0 text-[#91AFAA]" />
            <span>
              {t.privacy}{' '}
              <Link
                href="/privacy"
                className="font-bold underline underline-offset-4"
              >
                {t.privacyLink}
              </Link>
            </span>
          </p>

          <div className="mt-10 pt-8 border-t border-[#E2DFDA] flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <Link
              href="/give-hope"
              className="inline-flex items-center gap-3 text-[#6E5F47] hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none"
            >
              <HandHeart className="w-5 h-5 text-[#91AFAA]" />
              <span className="font-bold">{t.donate}</span>
            </Link>
            <CrisisLine
              lang={lang}
              className="max-w-md text-[#6E5F47] md:text-right"
            />
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
