'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Play } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { CalmDownNow } from '@/components/tools/CalmDownNow';
import { HeroMedia } from './HeroMedia';
import { dayOfPlan, useSavedPlan } from '@/lib/actionPlanStore';
import { PLAN_DAYS } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import { useLanguage } from '@/lib/languagePreference';
import { isGuidedTool, useLastTool, type GuidedTool } from '@/lib/myTool';
import {
  START_HASH,
  closeStartMenu,
  openStartMenu,
  subscribeToHash,
} from '@/lib/startMenu';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { analyticsService } from '@/services/analyticsService';

// Each answer opens the page written for that feeling, in the chosen language.
const feelings = [
  {
    id: 'anxious',
    en: {
      label: 'I feel anxious',
      href: '/how-to-calm-anxiety',
    },
    tl: {
      label: 'Kinakabahan ako',
      href: '/paano-mawala-ang-anxiety',
    },
  },
  {
    id: 'tired',
    en: {
      label: "I'm tired of everything",
      href: '/tired-of-everything',
    },
    tl: {
      label: 'Pagod na ako',
      href: '/pagod-na-ako',
    },
  },
  {
    id: 'alone',
    en: {
      label: 'I feel alone',
      href: '/i-feel-alone',
    },
    tl: {
      label: 'Wala akong kausap',
      href: '/wala-akong-kausap',
    },
  },
  {
    id: 'sleep',
    en: {
      label: "I can't sleep from overthinking",
      href: '/cant-sleep-overthinking',
    },
    tl: {
      label: 'Hindi ako makatulog sa kakaisip',
      href: '/hindi-makatulog-sa-kakaisip',
    },
  },
  {
    id: 'hopeless',
    en: {
      label: "I don't have hope",
      href: '/get-started',
    },
    tl: {
      label: 'Wala na akong pag-asa',
      href: '/get-started',
    },
  },
];

const notSure = {
  en: "I'm not sure what I feel",
  tl: 'Hindi ko alam kung ano ang nararamdaman ko',
};

const menuCopy = {
  en: {
    heading: 'How are you feeling right now?',
    back: 'Back',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `You're on day ${day} of your plan.`,
    planSaved: 'Your plan is saved on this phone.',
    afterSaved: 'Your Hope Card and monthly check-in are here.',
    openPlan: 'Open my plan',
    startMy: { breathe: 'Start my breathing', ground: 'Start my 5-4-3-2-1' },
    ecoachTitle: 'I Want Someone to Journey With Me',
    ecoachText: 'Chat with a real person on Messenger.',
    moreWays: 'Also here:',
    donate: 'Here to donate instead?',
  },
  tl: {
    heading: 'Ano ang nararamdaman mo ngayon?',
    back: 'Bumalik',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `Day ${day} mo na sa plano mo.`,
    planSaved: 'Naka-save ang plano mo sa phone na ito.',
    afterSaved: 'Nandito ang Hope Card at monthly check-in mo.',
    openPlan: 'Buksan ang plano ko',
    startMy: {
      breathe: 'Simulan ang paghinga ko',
      ground: 'Simulan ang 5-4-3-2-1 ko',
    },
    ecoachTitle: 'Gusto ko ng kasama sa pinagdadaanan ko',
    ecoachText: 'Mag-chat sa totoong tao sa Messenger.',
    moreWays: 'Nandito rin:',
    donate: 'Gusto mo bang mag-donate?',
  },
};

const morePaths = [
  { title: { en: 'Prayer', tl: 'Dasal' }, href: '/prayers' },
  { title: { en: 'Hope AI', tl: 'Hope AI' }, href: '/hope-ai' },
  { title: { en: 'HopeCasts', tl: 'HopeCasts' }, href: '/hopecasts' },
  { title: { en: 'Daily Hope', tl: 'Daily Hope' }, href: '/daily-hope' },
];

const heroSecondaryClass =
  'inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/70 px-5 font-poppins font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50';

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

export function LookingForHope() {
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
  const lastTool = useLastTool();
  // A returning visitor's own tool: the guided one in their plan or on
  // their Hope Card, else the last one they finished on this phone.
  const myTool: GuidedTool | null =
    Object.keys(savedPlan?.commitments ?? {}).find(isGuidedTool) ??
    (isGuidedTool(savedPlan?.hopeCard?.toolId)
      ? savedPlan.hopeCard.toolId
      : null) ??
    lastTool;
  const [autoOpen, setAutoOpen] = useState<GuidedTool | undefined>();
  const pathsHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!showPaths) return;
    window.scrollTo({ top: 0 });
    pathsHeadingRef.current?.focus({ preventScroll: true });
  }, [showPaths]);

  const handleStart = () => {
    analyticsService.recordClick('looking_for_hope');
    setAutoOpen(undefined);
    openStartMenu();
  };

  // Straight to their tool, opened at the top of the menu.
  const startMyTool = () => {
    if (!myTool) return;
    analyticsService.recordClick(`home_my_tool_${myTool}`);
    setAutoOpen(myTool);
    openStartMenu();
  };

  if (!showPaths) {
    return (
      <section
        aria-labelledby="looking-for-hope-title"
        className="relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden bg-black"
      >
        <HeroMedia />

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
            className="group mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 font-poppins text-lg font-bold text-[#6E5F47] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-reduce:hover:translate-y-0"
          >
            That&apos;s me
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </button>

          {(myTool || savedPlan) && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <p lang={lang} className="font-poppins text-white">
                {t.welcomeBack}
                {savedPlan?.name ? `, ${savedPlan.name}` : ''}.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {myTool && (
                  <button
                    type="button"
                    onClick={startMyTool}
                    className={heroSecondaryClass}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    <span lang={lang}>{t.startMy[myTool]}</span>
                  </button>
                )}
                {savedPlan && (
                  <TrackedLink
                    href="/action-plan"
                    linkName="home_open_plan"
                    className={heroSecondaryClass}
                  >
                    <span lang={lang}>{t.openPlan}</span>
                  </TrackedLink>
                )}
              </div>
            </div>
          )}

          <Link
            href="/give-hope"
            lang={lang}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none"
          >
            {t.donate}
          </Link>
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-28 text-center md:pb-8">
          <CrisisLine lang={lang} className="text-white/80" />
        </div>
      </section>
    );
  }

  const calmDown = (
    <CalmDownNow key={autoOpen ?? 'menu'} lang={lang} autoOpen={autoOpen} />
  );

  return (
    <section
      aria-labelledby="paths-title"
      lang={lang}
      className="px-6 pt-8 pb-20 md:pt-12 hb-step-in"
    >
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={closeStartMenu}
              className="inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </button>
            <LanguageSwitch />
          </div>

          {savedPlan && (
            <TrackedLink
              href="/action-plan"
              linkName="menu_welcome_back_plan"
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#EFF3E7] px-5 py-4 text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              <span>
                <span className="font-poppins font-bold">
                  {t.welcomeBack}
                  {savedPlan.name ? `, ${savedPlan.name}` : ''}.
                </span>{' '}
                {savedPlan.hopeCard && planDay >= PLAN_DAYS
                  ? t.afterSaved
                  : planDay <= PLAN_DAYS
                    ? t.planDay(planDay)
                    : t.planSaved}
              </span>
              <span className="shrink-0 font-poppins font-bold underline underline-offset-4">
                {t.openPlan}
              </span>
            </TrackedLink>
          )}

          <h1
            id="paths-title"
            ref={pathsHeadingRef}
            tabIndex={-1}
            className="mt-6 font-playfair text-4xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
          >
            {t.heading}
          </h1>

          {/* Their own tool, when they came from "Start my breathing". */}
          {autoOpen && <div className="mt-6">{calmDown}</div>}

          <ul className={`mt-6 ${groupClass}`}>
            {feelings.map((feeling) => (
              <li key={feeling.id}>
                <TrackedLink
                  href={feeling[lang].href}
                  linkName={`menu_feeling_${feeling.id}`}
                  className={rowClass}
                >
                  <span className="flex-1 font-poppins text-lg font-bold text-[#6E5F47]">
                    {feeling[lang].label}
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
                </TrackedLink>
              </li>
            ))}
            <li>
              <TrackedLink
                href="/action-plan"
                linkName="menu_feeling_unsure"
                className={rowClass}
              >
                <span className="flex-1 font-poppins text-lg font-bold text-[#6E5F47]">
                  {notSure[lang]}
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
              </TrackedLink>
            </li>
          </ul>

          {!autoOpen && <div className="mt-6">{calmDown}</div>}

          <EcoachLink
            linkName="ecoach_menu"
            className="group mt-8 flex items-center gap-4 rounded-2xl bg-[#6E5F47] px-5 py-4 text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            <span className="flex-1">
              <span className="block font-poppins text-lg font-bold">
                {t.ecoachTitle}
              </span>
              <span className="block text-white/85">{t.ecoachText}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-white/70" />
          </EcoachLink>

          <p className="mt-6 text-[#6E5F47]">
            <span className="font-bold">{t.moreWays}</span>{' '}
            {morePaths.map((path, index) => (
              <span key={path.href}>
                {index > 0 && <span aria-hidden> · </span>}
                <Link
                  href={path.href}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-[#5c4f3b]"
                >
                  {path.title[lang]}
                </Link>
              </span>
            ))}
          </p>

          <CrisisLine
            lang={lang}
            className="mt-6 border-t border-[#E2DFDA] pt-6 text-[#6E5F47]"
          />
        </div>
      </div>
    </section>
  );
}
