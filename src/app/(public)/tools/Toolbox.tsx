'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { ToolExercise, type ToolKind } from '@/components/tools/ToolExercise';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { useSavedPlan } from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';

/**
 * Every tool in one place, grouped by what is happening right now. Each one
 * opens and runs right on this page. What people type stays on the phone;
 * the tools count only that they were started and finished.
 */

type Text = Record<FeelingLang, string>;

interface Tool {
  minutes: Text;
  title: Text;
  text: Text;
  why: Text;
}

const TOOLS: Record<ToolKind, Tool> = {
  breathe: {
    minutes: { en: '1 to 2 min', tl: '1 hanggang 2 min' },
    title: { en: 'Slow breathing', tl: 'Dahan-dahang paghinga' },
    text: {
      en: 'Breathe in for 4 and out for 6, following a circle.',
      tl: 'Inhale nang 4, exhale nang 6, habang sinusundan ang bilog.',
    },
    why: {
      en: 'A longer breath out slows your heart and helps your body settle.',
      tl: 'Kapag mas mahaba ang exhale, bumabagal ang tibok ng puso at kumakalma ang katawan.',
    },
  },
  ground: {
    minutes: { en: '2 min', tl: '2 min' },
    title: {
      en: 'Use your 5 senses (5-4-3-2-1)',
      tl: 'Gamitin ang 5 senses mo (5-4-3-2-1)',
    },
    text: {
      en: 'Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell and 1 you taste.',
      tl: 'Pansinin ang 5 nakikita mo, 4 na nahahawakan, 3 na naririnig, 2 na naaamoy at 1 na nalalasahan.',
    },
    why: {
      en: 'Your senses bring your attention back to where you are, away from the worry.',
      tl: 'Ibinabalik ng senses mo ang atensyon mo sa paligid, palayo sa inaalala mo.',
    },
  },
  game: {
    minutes: { en: '2 min', tl: '2 min' },
    title: { en: 'Find the pair', tl: 'Hanapin ang kapares' },
    text: {
      en: 'Match jeepneys, mangoes and parols. No timer.',
      tl: 'Ipares ang mga dyip, mangga at parol. Walang timer.',
    },
    why: {
      en: 'Keeping a few cards in mind leaves less room for the thoughts going round.',
      tl: 'Kapag may ilang card kang tinatandaan, nababawasan ang puwang ng paulit-ulit na isip.',
    },
  },
  kite: {
    minutes: { en: '1 min', tl: '1 min' },
    title: { en: 'Saranggola', tl: 'Saranggola' },
    text: {
      en: 'Fly a kite from morning to sunset and catch the stars. Hold to lift, let go to glide.',
      tl: 'Paliparin ang saranggola mula umaga hanggang paglubog ng araw at hulihin ang mga bituin. I-hold para tumaas, bitawan para dumausdos.',
    },
    why: {
      en: 'Following something that moves, and breathing with it, gives a busy mind somewhere to rest.',
      tl: 'Kapag may sinusundan kang gumagalaw at sinasabayan mo ng hinga, may mapagpapahingahan ang abalang isip.',
    },
  },
  unhook: {
    minutes: { en: '2 min', tl: '2 min' },
    title: {
      en: 'Step back from a heavy thought',
      tl: 'Lumayo nang kaunti sa mabigat na isip',
    },
    text: {
      en: 'Write the thought in a few words, read it back in a new way, then return to what you were doing.',
      tl: 'Isulat ang isip sa ilang salita, basahin ito sa bagong paraan, tapos bumalik sa ginagawa mo.',
    },
    why: {
      en: 'Noticing a thought as a thought puts a little space between you and it. Nothing you type is saved.',
      tl: 'Kapag napansin mong isip lang ito, nagkakaroon ng kaunting distansya. Walang naka-save sa itina-type mo.',
    },
  },
  'worry-time': {
    minutes: { en: '15 min a day', tl: '15 min araw-araw' },
    title: { en: 'Worry time', tl: 'Worry time' },
    text: {
      en: 'Save worries as they come, then deal with them in 15 minutes at the same time each day.',
      tl: 'Itabi ang mga pag-aalala habang dumarating, tapos harapin sa loob ng 15 minuto sa parehong oras araw-araw.',
    },
    why: {
      en: 'Giving worry its own time makes it easier to set it down for the rest of the day.',
      tl: 'Kapag may sariling oras ang pag-aalala, mas madali itong bitawan sa natitirang oras ng araw.',
    },
  },
  'worry-note': {
    minutes: { en: '2 min, at night', tl: '2 min, sa gabi' },
    title: { en: 'Worry note', tl: 'Worry note' },
    text: {
      en: "Write down what's keeping you up, then set it aside until morning.",
      tl: 'Isulat ang dahilan kung bakit gising ka pa, tapos itabi muna hanggang umaga.',
    },
    why: {
      en: "Getting it out of your head and onto the page can make it easier to rest. It isn't saved or sent anywhere.",
      tl: 'Kapag nailabas mo sa isip at naisulat, mas madaling makapagpahinga. Hindi ito naka-save o ipinapadala kahit saan.',
    },
  },
  'one-thing': {
    minutes: { en: '10 min', tl: '10 min' },
    title: { en: 'One small thing', tl: 'Isang maliit na bagay' },
    text: {
      en: 'Pick one thing you can finish in 10 minutes, like a shower, a meal or a short walk.',
      tl: 'Pumili ng isang bagay na matatapos mo sa 10 minuto, gaya ng pagligo, pagkain o maikling lakad.',
    },
    why: {
      en: 'When you feel low, the energy often comes after you start, rarely before.',
      tl: 'Kapag malungkot ka, kadalasang dumarating ang gana pagkatapos mong magsimula, bihira bago.',
    },
  },
  trip: {
    minutes: { en: '1 to 5 min each', tl: '1 hanggang 5 min bawat isa' },
    title: { en: 'The trip', tl: 'Biyahe' },
    text: {
      en: 'Tiny real-life missions, like a glass of water or 2 minutes outside, drive a jeepney from home to the sea.',
      tl: 'Maliliit na misyon, gaya ng isang basong tubig o 2 minuto sa labas, ang magdadala sa dyip mula bahay hanggang dagat.',
    },
    why: {
      en: 'On low days, small real steps tend to lift your mood more than waiting until you feel ready.',
      tl: 'Sa mabibigat na araw, mas nakakagaan ang maliliit na totoong hakbang kaysa hintaying maging handa ka.',
    },
  },
  message: {
    minutes: { en: '1 min', tl: '1 min' },
    title: { en: 'Message someone', tl: 'Mag-message sa isang tao' },
    text: {
      en: 'A short message you can copy and send to someone you trust.',
      tl: 'Isang maikling mensahe na puwede mong kopyahin at ipadala sa taong pinagkakatiwalaan mo.',
    },
    why: {
      en: 'One message is easier to send than starting a whole conversation.',
      tl: 'Mas madaling magpadala ng isang mensahe kaysa magsimula ng mahabang usapan.',
    },
  },
  reasons: {
    minutes: { en: '5 min', tl: '5 min' },
    title: {
      en: 'My reasons to keep going',
      tl: 'Ang mga dahilan ko para magpatuloy',
    },
    text: {
      en: 'Write down the people, plans and small things that matter to you, to read on hard days.',
      tl: 'Isulat ang mga tao, plano at maliliit na bagay na mahalaga sa iyo, para basahin sa mabibigat na araw.',
    },
    why: {
      en: 'Your own reasons, in your own words, are there when it is hard to think of any.',
      tl: 'Nandiyan ang sarili mong mga dahilan, sa sarili mong salita, kapag mahirap mag-isip ng kahit isa.',
    },
  },
};

const GROUPS: { id: string; chip: Text; title: Text; tools: ToolKind[] }[] = [
  {
    id: 'tight',
    chip: { en: 'Chest is tight', tl: 'Masikip ang dibdib' },
    title: {
      en: "When your chest is tight or you're panicking",
      tl: 'Kapag masikip ang dibdib mo o nagpa-panic ka',
    },
    tools: ['breathe', 'ground'],
  },
  {
    id: 'loop',
    chip: { en: "Thoughts won't stop", tl: 'Ayaw tumigil ng isip' },
    title: {
      en: "When your thoughts won't stop",
      tl: 'Kapag ayaw tumigil ng isip mo',
    },
    tools: ['unhook', 'worry-time', 'worry-note'],
  },
  {
    id: 'break',
    chip: { en: 'Need a break', tl: 'Kailangan ng pahinga' },
    title: {
      en: 'When you need a break from your head',
      tl: 'Kapag kailangan mo ng pahinga sa kakaisip',
    },
    tools: ['game', 'kite'],
  },
  {
    id: 'stuck',
    chip: { en: "Can't get going", tl: 'Walang ganang kumilos' },
    title: {
      en: "When you can't get going",
      tl: 'Kapag wala kang ganang kumilos',
    },
    tools: ['one-thing', 'trip'],
  },
  {
    id: 'alone',
    chip: { en: 'Feel alone', tl: 'Parang mag-isa' },
    title: {
      en: 'When you feel alone',
      tl: 'Kapag pakiramdam mo mag-isa ka',
    },
    tools: ['message'],
  },
  {
    id: 'reason',
    chip: { en: 'Need a reason', tl: 'Kailangan ng dahilan' },
    title: {
      en: 'When you need a reason to keep going',
      tl: 'Kapag kailangan mo ng dahilan para magpatuloy',
    },
    tools: ['reasons'],
  },
];

const copy = {
  en: {
    title: 'Tools for hard moments',
    subtitle:
      "Pick what's happening right now. Each tool takes a few minutes and works right here. Nothing you type leaves this phone.",
    jump: "What's happening?",
    needsPlan: 'Your reasons are kept with your plan on this phone.',
    makePlan: 'Make your free plan first',
    crisis:
      "If you're thinking of ending your life, call the NCMH Crisis Hotline now, open 24/7:",
    or: 'or',
    ecoach: 'Or talk to an e-coach on Messenger',
    planTitle: 'Want these in a plan made for you?',
    planText:
      'Answer 9 quick questions and get the tools that fit how you have been, with a 4-week tracker.',
    planButton: 'Make my free plan',
    close: 'Close',
  },
  tl: {
    title: 'Mga tool para sa mabibigat na sandali',
    subtitle:
      'Piliin kung ano ang nangyayari ngayon. Ilang minuto lang ang bawat tool at dito mo mismo gagawin. Hindi lumalabas sa phone na ito ang anumang i-type mo.',
    jump: 'Ano ang nangyayari?',
    needsPlan:
      'Naka-save ang mga dahilan mo kasama ng plano mo sa phone na ito.',
    makePlan: 'Gumawa muna ng libreng plano',
    crisis:
      'Kung naiisip mong tapusin ang buhay mo, tumawag ngayon sa NCMH Crisis Hotline, bukas 24/7:',
    or: 'o',
    ecoach: 'O kausapin ang isang e-coach sa Messenger',
    planTitle: 'Gusto mo bang nasa isang plano ang mga ito?',
    planText:
      'Sagutin ang 9 na mabilis na tanong at makuha ang mga tool na bagay sa pinagdadaanan mo, may 4-week tracker.',
    planButton: 'Gumawa ng libreng plano ko',
    close: 'Isara',
  },
};

function ToolCard({
  kind,
  lang,
  isOpen,
  onOpen,
  onClose,
}: {
  kind: ToolKind;
  lang: FeelingLang;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const tool = TOOLS[kind];
  const t = copy[lang];
  const rowRef = useRef<HTMLButtonElement>(null);
  const plan = useSavedPlan();
  const needsPlan = kind === 'reasons' && !plan;

  // Back to the row once the tool closes.
  const close = () => {
    onClose();
    requestAnimationFrame(() => rowRef.current?.focus());
  };

  return (
    <li>
      {/* One row per tool: tap it and the tool opens right under it. */}
      <button
        ref={rowRef}
        type="button"
        aria-expanded={isOpen}
        onClick={isOpen ? close : onOpen}
        className={`${rowClass} w-full text-left`}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-poppins font-bold text-[#6E5F47]">
              {tool.title[lang]}
            </span>
            <span className="text-sm text-[#6E5F47]/75">
              {tool.minutes[lang]}
            </span>
          </span>
          <span className="block text-sm text-[#6E5F47]/85 leading-relaxed">
            {tool.text[lang]}
          </span>
        </span>
        <ChevronRight
          className={`h-4 w-4 shrink-0 text-[#C5BFB5] transition-transform duration-[var(--hb-quick)] group-hover:text-[#6E5F47] ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-4 sm:px-5">
          <p className="px-2 text-sm text-[#6E5F47] leading-relaxed sm:px-0">
            {tool.why[lang]}
          </p>
          {needsPlan ? (
            <p className="mt-3 px-2 text-sm text-[#6E5F47] sm:px-0">
              {t.needsPlan}{' '}
              <Link
                href={lang === 'tl' ? '/action-plan?lang=tl' : '/action-plan'}
                className="inline-flex min-h-11 items-center font-bold underline underline-offset-4"
              >
                {t.makePlan}
              </Link>
            </p>
          ) : (
            <>
              <ToolExercise
                kind={kind}
                lang={lang}
                source="page"
                onClose={close}
              />
              {/* These two have no close button of their own. */}
              {(kind === 'message' || kind === 'worry-note') && (
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                >
                  {t.close}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}

export function Toolbox() {
  const lang = useLanguage();
  const t = copy[lang];
  const [open, setOpen] = useState<ToolKind | null>(null);

  // Links from Taglish pages open the tools in Taglish (?lang=tl).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'tl' || requested === 'en') setLanguage(requested);
  }, []);

  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="mb-6 flex justify-end">
            <LanguageSwitch />
          </div>
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          <nav aria-label={t.jump} className="mt-8">
            <p className="font-poppins text-sm font-bold text-[#6E5F47]">
              {t.jump}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {GROUPS.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-[#DFE7CF] bg-white px-4 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                  >
                    {group.chip[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="mt-12 scroll-mt-28"
            >
              <h2
                id={`${group.id}-title`}
                className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[1.05] tracking-[-0.03em]"
              >
                {group.title[lang]}
              </h2>
              {group.id === 'reason' && (
                <div className="mt-4 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
                  <p>
                    {t.crisis}{' '}
                    <a
                      href="tel:1553"
                      className="font-bold underline underline-offset-4"
                    >
                      1553
                    </a>{' '}
                    {t.or}{' '}
                    <a
                      href="tel:+639178998727"
                      className="whitespace-nowrap font-bold underline underline-offset-4"
                    >
                      0917 899 8727
                    </a>
                  </p>
                  <EcoachLink
                    linkName="ecoach_tools_reason"
                    className="mt-2 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
                  >
                    {t.ecoach}
                  </EcoachLink>
                </div>
              )}
              <ul className={`mt-4 ${groupClass}`}>
                {group.tools.map((kind) => (
                  <ToolCard
                    key={kind}
                    kind={kind}
                    lang={lang}
                    isOpen={open === kind}
                    onOpen={() => setOpen(kind)}
                    onClose={() => setOpen(null)}
                  />
                ))}
              </ul>
            </section>
          ))}

          <section className="mt-14 rounded-2xl bg-[#6E5F47] p-6 text-white md:p-8">
            <h2 className="font-poppins text-xl font-bold">{t.planTitle}</h2>
            <p className="mt-2 text-white/85 leading-relaxed">{t.planText}</p>
            <Link
              href={lang === 'tl' ? '/action-plan?lang=tl' : '/action-plan'}
              className="mt-4 inline-flex min-h-11 items-center rounded-2xl bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {t.planButton}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
