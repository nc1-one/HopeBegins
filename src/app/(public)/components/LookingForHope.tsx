'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from '@/components/ui/LocalLink';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { CalmDownNow } from '@/components/tools/CalmDownNow';
import { CheckInTeaser } from '@/components/checkin/CheckInTeaser';
import { HeroMedia } from './HeroMedia';
import { dayOfPlan, useSavedPlan } from '@/lib/actionPlanStore';
import { useCheckIns } from '@/lib/checkIns';
import { localDay } from '@/lib/toolNotes';
import { PLAN_DAYS } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import type { PerLang } from '@/lib/i18n';
import { useLanguage } from '@/lib/languagePreference';
import { isGuidedTool, useLastTool, type GuidedTool } from '@/lib/myTool';
import { type PhotoId } from '@/lib/photos';
import { FadeImage } from '@/components/ui/FadeImage';
import { usePhotoPicker } from '@/components/ui/PhotoTurn';
import {
  START_HASH,
  closeStartMenu,
  openStartMenu,
  subscribeToHash,
} from '@/lib/startMenu';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { analyticsService } from '@/services/analyticsService';
import { CrisisSentence } from '@/components/help/Crisis';

// Each answer opens the page written for that feeling, in the chosen language.
// French, German, Spanish and Korean link to the English page's address,
// and the link takes the reader to the page in their language when it has one.
const feelings: ({ id: string; photo: PhotoId } & PerLang<{
  label: string;
  href: string;
}>)[] = [
  {
    id: 'anxious',
    photo: 'anxious' as PhotoId,
    en: {
      label: 'I feel anxious',
      href: '/how-to-calm-anxiety',
    },
    tl: {
      label: 'Kinakabahan ako',
      href: '/paano-mawala-ang-anxiety',
    },
    fr: {
      label: 'J’angoisse',
      href: '/how-to-calm-anxiety',
    },
    de: {
      label: 'Ich habe Angst',
      href: '/how-to-calm-anxiety',
    },
    es: {
      label: 'Tengo ansiedad',
      href: '/how-to-calm-anxiety',
    },
    ko: {
      label: '불안해요',
      href: '/how-to-calm-anxiety',
    },
  },
  {
    id: 'tired',
    photo: 'tired' as PhotoId,
    en: {
      label: "I'm tired of everything",
      href: '/tired-of-everything',
    },
    tl: {
      label: 'Pagod na ako',
      href: '/pagod-na-ako',
    },
    fr: {
      label: 'Tout me fatigue',
      href: '/tired-of-everything',
    },
    de: {
      label: 'Ich bin müde von allem',
      href: '/tired-of-everything',
    },
    es: {
      label: 'Ya me cansé de todo',
      href: '/tired-of-everything',
    },
    ko: {
      label: '모든 것에 지쳤어요',
      href: '/tired-of-everything',
    },
  },
  {
    id: 'alone',
    photo: 'alone' as PhotoId,
    en: {
      label: 'I feel alone',
      href: '/i-feel-alone',
    },
    tl: {
      label: 'Wala akong kausap',
      href: '/wala-akong-kausap',
    },
    fr: {
      label: 'La solitude me pèse',
      href: '/i-feel-alone',
    },
    de: {
      label: 'Ich fühle mich allein',
      href: '/i-feel-alone',
    },
    es: {
      label: 'Siento que no tengo a nadie',
      href: '/i-feel-alone',
    },
    ko: {
      label: '외로워요',
      href: '/i-feel-alone',
    },
  },
  {
    id: 'sleep',
    photo: 'sleep' as PhotoId,
    en: {
      label: "I can't sleep from overthinking",
      href: '/cant-sleep-overthinking',
    },
    tl: {
      label: 'Hindi ako makatulog sa kakaisip',
      href: '/hindi-makatulog-sa-kakaisip',
    },
    fr: {
      label: 'Mes pensées m’empêchent de dormir',
      href: '/cant-sleep-overthinking',
    },
    de: {
      label: 'Ich kann vor lauter Grübeln nicht schlafen',
      href: '/cant-sleep-overthinking',
    },
    es: {
      label: 'No puedo dormir de tanto pensar',
      href: '/cant-sleep-overthinking',
    },
    ko: {
      label: '생각이 많아서 잠이 안 와요',
      href: '/cant-sleep-overthinking',
    },
  },
  {
    id: 'hopeless',
    photo: 'hope' as PhotoId,
    en: {
      label: "I don't have hope",
      href: '/get-started',
    },
    tl: {
      label: 'Wala na akong pag-asa',
      href: '/get-started',
    },
    fr: {
      label: 'Je n’ai plus d’espoir',
      href: '/get-started',
    },
    de: {
      label: 'Ich habe keine Hoffnung mehr',
      href: '/get-started',
    },
    es: {
      label: 'Ya no tengo esperanza',
      href: '/get-started',
    },
    ko: {
      label: '희망이 없어요',
      href: '/get-started',
    },
  },
];

const notSure: PerLang<string> = {
  en: "I'm not sure what I feel",
  tl: 'Hindi ko alam kung ano ang nararamdaman ko',
  fr: 'Je ne sais pas trop ce que je ressens',
  de: 'Ich weiß nicht genau, was ich fühle',
  es: 'No sé bien qué siento',
  ko: '제 마음이 어떤지 잘 모르겠어요',
};

interface MenuCopy {
  /** "Not okay today?", with "today" set apart. */
  notOkay: { before: string; today: string; after: string };
  thatsMe: string;
  heading: string;
  back: string;
  welcomeBack: string;
  planDay: (day: number) => string;
  planSaved: string;
  afterSaved: string;
  openPlan: string;
  checkIn: string;
  myCheckIns: string;
  startMy: Record<GuidedTool, string>;
  ecoachTitle: string;
  ecoachText: string;
  ecoachButton: string;
  moreWays: string;
  donate: string;
}

const menuCopy: PerLang<MenuCopy> = {
  en: {
    notOkay: { before: 'Not okay ', today: 'today', after: '?' },
    thatsMe: "That's me",
    heading: 'How are you feeling right now?',
    back: 'Back',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `You're on day ${day} of your plan.`,
    planSaved: 'Your plan is saved on this phone.',
    afterSaved: 'Your Hope Card and monthly check-in are here.',
    openPlan: 'Open my plan',
    checkIn: 'Check in today',
    myCheckIns: 'My check-ins',
    startMy: { breathe: 'Start my breathing', ground: 'Start my 5-4-3-2-1' },
    ecoachTitle: 'I Want Someone to Journey With Me',
    ecoachText:
      'Chat with a real person, an e-coach from Himala Everyday, on Messenger.',
    ecoachButton: 'Talk to an e-coach',
    moreWays: 'Also here:',
    donate: 'Here to donate instead?',
  },
  tl: {
    // The first screen stays in English on the Taglish home, as before.
    notOkay: { before: 'Not okay ', today: 'today', after: '?' },
    thatsMe: "That's me",
    heading: 'Ano ang nararamdaman mo ngayon?',
    back: 'Bumalik',
    welcomeBack: 'Welcome back',
    planDay: (day: number) => `Day ${day} mo na sa plano mo.`,
    planSaved: 'Naka-save ang plano mo sa phone na ito.',
    afterSaved: 'Nandito ang Hope Card at monthly check-in mo.',
    openPlan: 'Buksan ang plano ko',
    checkIn: 'Mag-check in ngayon',
    myCheckIns: 'Mga check-in ko',
    startMy: {
      breathe: 'Simulan ang paghinga ko',
      ground: 'Simulan ang 5-4-3-2-1 ko',
    },
    ecoachTitle: 'Gusto ko ng kasama sa pinagdadaanan ko',
    ecoachText:
      'Mag-chat sa isang totoong tao, e-coach ng Himala Everyday, sa Messenger.',
    ecoachButton: 'Kausapin ang e-coach',
    moreWays: 'Nandito rin:',
    donate: 'Gusto mo bang mag-donate?',
  },
  // No e-coaches in these languages: the button goes to free helplines.
  fr: {
    notOkay: {
      before: 'Ça ne va pas ',
      today: 'aujourd’hui',
      after: ' ?',
    },
    thatsMe: 'C’est moi',
    heading: 'Comment te sens-tu en ce moment ?',
    back: 'Retour',
    welcomeBack: 'Te revoilà',
    planDay: (day: number) => `Tu en es au jour ${day} de ton plan.`,
    planSaved: 'Ton plan est enregistré sur ce téléphone.',
    afterSaved: 'Ta carte d’espoir et ton bilan du mois t’attendent ici.',
    openPlan: 'Ouvrir mon plan',
    checkIn: 'Faire mon bilan du jour',
    myCheckIns: 'Mes bilans',
    startMy: {
      breathe: 'Commencer ma respiration lente',
      ground: 'Commencer mon ancrage 5-4-3-2-1',
    },
    ecoachTitle: 'Je veux quelqu’un pour m’accompagner',
    ecoachText:
      'Parle à une vraie personne, sur une ligne d’écoute gratuite là où tu vis.',
    ecoachButton: 'Parler à quelqu’un',
    moreWays: 'Et aussi :',
    donate: 'Tu es là pour faire un don ?',
  },
  de: {
    notOkay: { before: '', today: 'Heute', after: ' nicht okay?' },
    thatsMe: 'Das bin ich',
    heading: 'Wie fühlst du dich gerade?',
    back: 'Zurück',
    welcomeBack: 'Schön, dass du wieder da bist',
    planDay: (day: number) => `Heute ist Tag ${day} deines Plans.`,
    planSaved: 'Dein Plan ist auf diesem Handy gespeichert.',
    afterSaved:
      'Deine Hoffnungskarte und dein monatlicher Check-in warten hier auf dich.',
    openPlan: 'Meinen Plan öffnen',
    checkIn: 'Heute einchecken',
    myCheckIns: 'Meine Check-ins',
    startMy: {
      breathe: 'Meine Atemübung starten',
      ground: 'Meine 5-4-3-2-1-Übung starten',
    },
    ecoachTitle: 'Ich möchte, dass mich jemand begleitet',
    ecoachText:
      'Bei einem kostenlosen Hilfetelefon in deinem Land hört dir ein echter Mensch zu.',
    ecoachButton: 'Mit jemandem reden',
    moreWays: 'Außerdem:',
    donate: 'Möchtest du lieber spenden?',
  },
  es: {
    notOkay: { before: '¿No estás bien ', today: 'hoy', after: '?' },
    thatsMe: 'Así me siento',
    heading: '¿Cómo te sientes en este momento?',
    back: 'Volver',
    welcomeBack: 'Qué bueno verte de nuevo',
    planDay: (day: number) => `Vas en el día ${day} de tu plan.`,
    planSaved: 'Tu plan está guardado en este celular.',
    afterSaved: 'Tu tarjeta de esperanza y tu check-in mensual están aquí.',
    openPlan: 'Abrir mi plan',
    checkIn: 'Hacer el check-in de hoy',
    myCheckIns: 'Mis check-ins',
    startMy: {
      breathe: 'Empezar mi respiración lenta',
      ground: 'Empezar mi ejercicio 5-4-3-2-1',
    },
    ecoachTitle: 'Quiero que alguien me acompañe',
    ecoachText:
      'Habla con una persona real en una línea de ayuda gratuita de tu país.',
    ecoachButton: 'Hablar con alguien',
    moreWays: 'Además:',
    donate: '¿Vienes a donar?',
  },
  ko: {
    notOkay: { before: '', today: '오늘', after: ' 괜찮지 않나요?' },
    thatsMe: '제 얘기예요',
    heading: '지금 마음이 어때요?',
    back: '뒤로',
    welcomeBack: '다시 만나서 반가워요',
    planDay: (day: number) => `계획 ${day}일째예요.`,
    planSaved: '계획은 이 휴대폰에 저장되어 있어요.',
    afterSaved: '희망 카드와 월간 체크인이 여기 있어요.',
    openPlan: '내 계획 열기',
    checkIn: '오늘 체크인하기',
    myCheckIns: '내 체크인',
    startMy: {
      breathe: '천천히 숨쉬기 시작하기',
      ground: '5-4-3-2-1 그라운딩 시작하기',
    },
    ecoachTitle: '누군가 곁에 있어 주면 좋겠어요',
    ecoachText:
      '지금 있는 곳의 무료 상담 전화에서 실제 사람과 이야기할 수 있어요.',
    ecoachButton: '누군가와 이야기하기',
    moreWays: '이런 것도 있어요:',
    donate: '후원하러 오셨나요?',
  },
};

const morePaths: { title: PerLang<string>; href: string }[] = [
  {
    title: {
      en: 'Daily check-in',
      tl: 'Daily check-in',
      fr: 'Bilan du jour',
      de: 'Täglicher Check-in',
      es: 'Check-in diario',
      ko: '오늘의 체크인',
    },
    href: '/check-in',
  },
  {
    title: {
      en: 'Prayer',
      tl: 'Dasal',
      fr: 'Prière',
      de: 'Gebet',
      es: 'Oración',
      ko: '기도',
    },
    href: '/prayers',
  },
  {
    title: {
      en: 'Hope AI',
      tl: 'Hope AI',
      fr: 'Hope AI',
      de: 'Hope AI',
      es: 'Hope AI',
      ko: 'Hope AI',
    },
    href: '/hope-ai',
  },
  {
    title: {
      en: 'HopeCasts',
      tl: 'HopeCasts',
      fr: 'HopeCasts',
      de: 'HopeCasts',
      es: 'HopeCasts',
      ko: 'HopeCasts',
    },
    href: '/hopecasts',
  },
  {
    title: {
      en: 'Daily Hope',
      tl: 'Daily Hope',
      fr: 'Daily Hope',
      de: 'Daily Hope',
      es: 'Daily Hope',
      ko: 'Daily Hope',
    },
    href: '/daily-hope',
  },
];

const heroSecondaryClass =
  'inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/70 px-5 font-poppins font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50';

function CrisisLine({
  className,
  lang = 'en',
}: {
  className?: string;
  lang?: FeelingLang;
}) {
  return (
    <p className={`text-sm leading-relaxed ${className ?? ''}`}>
      <CrisisSentence lang={lang} lead danger={false} />
    </p>
  );
}

/**
 * `about` shows under the first screen only, so the menu stays quiet.
 */
export function LookingForHope({ about }: { about?: React.ReactNode }) {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => ''
  );
  const showPaths = hash === START_HASH;
  const lang = useLanguage();
  const t = menuCopy[lang];
  const pickPhoto = usePhotoPicker();
  const savedPlan = useSavedPlan();
  const planDay = savedPlan ? dayOfPlan(savedPlan.startedAt) + 1 : 0;
  const lastTool = useLastTool();
  const checkIns = useCheckIns();
  const hasCheckedIn = checkIns.length > 0;
  const isCheckedInToday = checkIns.some((entry) => entry.day === localDay());
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
      <>
        <section
          aria-labelledby="looking-for-hope-title"
          className="relative isolate flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden bg-black"
        >
          <HeroMedia />

          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <h1
              id="looking-for-hope-title"
              className="text-balance font-playfair text-5xl md:text-8xl text-white leading-[0.95] tracking-[-0.04em] drop-shadow-lg"
            >
              {t.notOkay.before}
              <em className="text-[#EFF3E7]">{t.notOkay.today}</em>
              {t.notOkay.after}
            </h1>

            <button
              type="button"
              onClick={handleStart}
              className="mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4 font-poppins text-lg font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {t.thatsMe}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            {(myTool || savedPlan || hasCheckedIn) && (
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
                      <span lang={lang}>{t.startMy[myTool]}</span>
                    </button>
                  )}
                  {hasCheckedIn && (
                    <TrackedLink
                      href="/check-in"
                      linkName="home_checkin"
                      className={heroSecondaryClass}
                    >
                      <span lang={lang}>
                        {isCheckedInToday ? t.myCheckIns : t.checkIn}
                      </span>
                    </TrackedLink>
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
        {about}
      </>
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
        <div>
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
              className="mt-6 flex max-w-2xl items-center justify-between gap-4 rounded-2xl bg-[#EFF3E7] px-5 py-4 text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
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

          <CheckInTeaser lang={lang} className={savedPlan ? 'mt-3' : 'mt-6'} />

          <h1
            id="paths-title"
            ref={pathsHeadingRef}
            tabIndex={-1}
            className="mt-6 font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
          >
            {t.heading}
          </h1>

          {/* Their own tool, when they came from "Start my breathing". */}
          {autoOpen && <div className="mt-6 max-w-2xl">{calmDown}</div>}

          {/* Each feeling is a real photo with its words under it. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
            {[
              ...feelings.map((feeling) => ({
                id: feeling.id,
                photo: feeling.photo,
                label: feeling[lang].label,
                href: feeling[lang].href,
              })),
              {
                id: 'unsure',
                photo: 'unsure' as PhotoId,
                label: notSure[lang],
                href: '/action-plan',
              },
            ].map((item) => (
              <li key={item.id}>
                <TrackedLink
                  href={item.href}
                  linkName={`menu_feeling_${item.id}`}
                  className="group block rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FCFDFA]"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[4/3]">
                    <FadeImage
                      src={pickPhoto(item.photo).src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 320px, 50vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-2 block font-poppins text-[15px] font-semibold leading-snug text-[#6E5F47] md:text-[17px]">
                    {item.label}
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>

          {!autoOpen && <div className="mt-8">{calmDown}</div>}

          <section
            aria-labelledby="ecoach-title"
            className="mt-10 grid gap-5 border-t border-[#E2DFDA] pt-10 md:grid-cols-2 md:items-center md:gap-8"
          >
            <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-[#EFF3E7]">
              <FadeImage
                src={pickPhoto('talk').src}
                alt=""
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </span>
            <div>
              <h2
                id="ecoach-title"
                className="text-balance font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
              >
                {t.ecoachTitle}
              </h2>
              <p className="mt-3 text-[#6E5F47] leading-relaxed md:text-lg">
                {t.ecoachText}
              </p>
              <EcoachLink
                linkName="ecoach_menu"
                className="mt-5 inline-flex min-h-12 items-center rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
              >
                {t.ecoachButton}
              </EcoachLink>
            </div>
          </section>

          <p className="mt-10 leading-loose text-[#6E5F47]">
            {t.moreWays}
            {morePaths.map((path, index) => (
              <span key={path.href}>
                {' '}
                {/* The dot stays with the link after it, never alone at a line end. */}
                <span className="whitespace-nowrap">
                  {index > 0 && <span aria-hidden>· </span>}
                  <Link
                    href={path.href}
                    className="py-2.5 underline underline-offset-4 hover:text-[#5c4f3b]"
                  >
                    {path.title[lang]}
                  </Link>
                </span>
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
