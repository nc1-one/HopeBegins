'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BatteryLow,
  ChevronRight,
  HeartPulse,
  ClipboardList,
  Heart,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  Moon,
  Play,
  Radio,
  Sunrise,
  UserRound,
} from 'lucide-react';
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
      hint: 'A short video, a prayer and a Bible reading',
      href: '/get-started',
    },
    tl: {
      label: 'Wala na akong pag-asa',
      hint: 'Video, dasal at Bible reading (English)',
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
    hint: 'Sagutin ang 9 na mabilis na tanong at kunin ang libreng plano mo',
  },
};

const menuCopy = {
  en: {
    heading: 'How are you feeling right now?',
    back: 'Back',
    subtitle: 'Pick the one closest to how you feel.',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `You're on day ${day} of your plan.`,
    planSaved: 'Your plan is saved on this phone.',
    afterSaved: 'Your Hope Card and monthly check-in are here.',
    openPlan: 'Open my plan',
    startMy: { breathe: 'Start my breathing', ground: 'Start my 5-4-3-2-1' },
    ecoachTitle: 'I Want Someone to Journey With Me',
    ecoachText:
      'Chat with a real person, an e-coach from Himala Everyday, on Messenger.',
    ecoachButton: 'Talk to an e-coach',
    moreWays: 'More ways we can help',
    privacy:
      'Only the people helping you see what you share. Your plan stays on your phone.',
    privacyLink: 'Read our privacy policy',
    donate: 'Here to donate instead?',
  },
  tl: {
    heading: 'Ano ang nararamdaman mo ngayon?',
    subtitle: 'Piliin ang pinakamalapit sa nararamdaman mo.',
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
    ecoachText:
      'Mag-chat sa isang totoong tao, e-coach ng Himala Everyday, sa Messenger.',
    ecoachButton: 'Kausapin ang e-coach',
    moreWays: 'Iba pa naming maitutulong sa iyo',
    privacy:
      'Ang mga tumutulong lang sa iyo ang nakakakita ng ibinabahagi mo. Sa phone mo lang naka-save ang plano mo.',
    privacyLink: 'Basahin ang privacy policy namin',
    donate: 'Gusto mo bang mag-donate?',
  },
};

const morePaths = [
  {
    title: { en: 'I need someone to pray for me', tl: 'Ipagdasal ninyo ako' },
    icon: Heart,
    href: '/prayers',
  },
  {
    title: {
      en: 'I need to talk to Hope AI',
      tl: 'Gusto kong kausapin si Hope AI',
    },
    icon: MessageSquare,
    href: '/hope-ai',
  },
  {
    title: {
      en: 'I need to hear hope today',
      tl: 'Makinig ng mensahe ng pag-asa',
    },
    icon: Radio,
    href: '/hopecasts',
  },
  {
    title: {
      en: 'Send me Daily Hope by email',
      tl: 'Padalhan ako ng Daily Hope sa email (English)',
    },
    icon: Mail,
    href: '/daily-hope',
  },
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
          <p className="mt-3 text-lg text-[#6E5F47]">{t.subtitle}</p>

          {/* Their own tool, when they came from "Start my breathing". */}
          {autoOpen && <div className="mt-6">{calmDown}</div>}

          <ul className={`mt-6 ${groupClass}`}>
            {feelings.map((feeling) => {
              const option = feeling[lang];
              return (
                <li key={feeling.id}>
                  <TrackedLink
                    href={option.href}
                    linkName={`menu_feeling_${feeling.id}`}
                    className={rowClass}
                  >
                    <feeling.icon className="h-5 w-5 shrink-0 text-[#91AFAA]" />
                    <span className="flex-1">
                      <span className="block font-poppins font-bold text-[#6E5F47]">
                        {option.label}
                      </span>
                      <span className="block text-sm text-[#6E5F47]/85">
                        {option.hint}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
                  </TrackedLink>
                </li>
              );
            })}
            <li>
              <TrackedLink
                href="/action-plan"
                linkName="menu_feeling_unsure"
                className={`${rowClass} bg-[#F5F8EF]`}
              >
                <ClipboardList className="h-5 w-5 shrink-0 text-[#91AFAA]" />
                <span className="flex-1">
                  <span className="block font-poppins font-bold text-[#6E5F47]">
                    {notSure[lang].label}
                  </span>
                  <span className="block text-sm text-[#6E5F47]/85">
                    {notSure[lang].hint}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
              </TrackedLink>
            </li>
          </ul>

          {!autoOpen && <div className="mt-6">{calmDown}</div>}

          <EcoachLink
            linkName="ecoach_menu"
            className="group mt-6 block rounded-2xl bg-[#6E5F47] px-5 py-5 text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50 md:px-6"
          >
            <span className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[#DFE7CF]" />
              <span className="flex-1">
                <span className="block font-poppins text-lg font-bold">
                  {t.ecoachTitle}
                </span>
                <span className="mt-1 block text-white/85 leading-relaxed">
                  {t.ecoachText}
                </span>
                <span className="mt-3 inline-flex items-center font-poppins font-bold underline underline-offset-4">
                  {t.ecoachButton}
                </span>
              </span>
            </span>
          </EcoachLink>

          <h2 className="mt-10 font-poppins text-lg font-bold text-[#6E5F47]">
            {t.moreWays}
          </h2>
          <ul className={`mt-3 ${groupClass}`}>
            {morePaths.map((path) => (
              <li key={path.href}>
                <Link href={path.href} className={rowClass}>
                  <path.icon className="h-5 w-5 shrink-0 text-[#91AFAA]" />
                  <span className="flex-1 font-poppins font-bold text-[#6E5F47]">
                    {path.title[lang]}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
                </Link>
              </li>
            ))}
          </ul>

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

          <CrisisLine
            lang={lang}
            className="mt-8 border-t border-[#E2DFDA] pt-6 text-[#6E5F47]"
          />
        </div>
      </div>
    </section>
  );
}
