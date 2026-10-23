'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { ToolExercise, type ToolKind } from '@/components/tools/ToolExercise';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { WAR_ROOM_URL } from '@/lib/actionPlan';
import { useSavedPlan } from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';
import { type PhotoId } from '@/lib/photos';
import { usePhotoPicker } from '@/components/ui/PhotoTurn';

/**
 * Every tool in one place, grouped by what is happening right now. Each one
 * opens and runs right on this page. What people type stays on the phone;
 * the tools count only that they were started and finished. Under them, the
 * rest of HopeBegins (Hope AI, prayer, Daily Hope, HopeCasts and the plan),
 * each on its own page.
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

const GROUPS: {
  id: string;
  /** The words under the photo you pick. */
  label: Text;
  photo: PhotoId;
  title: Text;
  tools: ToolKind[];
}[] = [
  {
    id: 'tight',
    label: { en: 'Chest is tight', tl: 'Masikip ang dibdib' },
    photo: 'anxious',
    title: {
      en: "When your chest is tight or you're panicking",
      tl: 'Kapag masikip ang dibdib mo o nagpa-panic ka',
    },
    tools: ['breathe', 'ground'],
  },
  {
    id: 'loop',
    label: { en: "Thoughts won't stop", tl: 'Ayaw tumigil ng isip' },
    photo: 'sleep',
    title: {
      en: "When your thoughts won't stop",
      tl: 'Kapag ayaw tumigil ng isip mo',
    },
    tools: ['unhook', 'worry-time', 'worry-note'],
  },
  {
    id: 'break',
    label: { en: 'Need a break', tl: 'Kailangan ng pahinga' },
    photo: 'morning',
    title: {
      en: 'When you need a break from your head',
      tl: 'Kapag kailangan mo ng pahinga sa kakaisip',
    },
    tools: ['game', 'kite'],
  },
  {
    id: 'stuck',
    label: { en: "Can't get going", tl: 'Walang ganang kumilos' },
    photo: 'tired',
    title: {
      en: "When you can't get going",
      tl: 'Kapag wala kang ganang kumilos',
    },
    tools: ['one-thing', 'trip'],
  },
  {
    id: 'alone',
    label: { en: 'Feel alone', tl: 'Parang mag-isa' },
    photo: 'alone',
    title: {
      en: 'When you feel alone',
      tl: 'Kapag pakiramdam mo mag-isa ka',
    },
    tools: ['message'],
  },
  {
    id: 'reason',
    label: { en: 'Need a reason', tl: 'Kailangan ng dahilan' },
    photo: 'hope',
    title: {
      en: 'When you need a reason to keep going',
      tl: 'Kapag kailangan mo ng dahilan para magpatuloy',
    },
    tools: ['reasons'],
  },
];

interface MoreLink {
  /** A plain string is a name, kept in English on Taglish pages too. */
  title: Text | string;
  text: Text;
  to:
    | { page: string; tlPage?: string }
    | { ecoach: string }
    | { site: string; linkName: string };
}

/** The rest of HopeBegins. These open their own page, or another app. */
const MORE: { id: string; title: Text; links: MoreLink[] }[] = [
  {
    id: 'talk',
    title: {
      en: 'When you want to talk to someone',
      tl: 'Kapag gusto mong may makausap',
    },
    links: [
      {
        title: { en: 'Talk to Hope AI', tl: 'Kausapin si Hope AI' },
        text: {
          en: 'An AI assistant you can talk to any hour, day or night.',
          tl: 'Isang AI assistant na puwede mong kausapin anumang oras, araw man o gabi.',
        },
        to: { page: '/hope-ai' },
      },
      {
        title: { en: 'Talk to an e-coach', tl: 'Kausapin ang isang e-coach' },
        text: {
          en: 'A real person from Himala Everyday, on Messenger.',
          tl: 'Isang totoong tao mula sa Himala Everyday, sa Messenger.',
        },
        to: { ecoach: 'ecoach_tools_talk' },
      },
    ],
  },
  {
    id: 'pray',
    title: { en: 'When you want to pray', tl: 'Kapag gusto mong magdasal' },
    links: [
      {
        title: { en: 'Ask for prayer', tl: 'Magpadasal' },
        text: {
          en: 'Send a prayer request and a Hope Carrier will pray for you.',
          tl: 'Ipadala ang prayer request mo at ipagdadasal ka ng isang Hope Carrier.',
        },
        to: { page: '/prayers' },
      },
      {
        title: 'Prayer War Room',
        text: {
          en: 'A free prayer app for a guided prayer time. Opens in a new tab.',
          tl: 'Libreng prayer app para sa guided prayer time. Magbubukas sa bagong tab.',
        },
        to: { site: WAR_ROOM_URL, linkName: 'war_room' },
      },
    ],
  },
  {
    id: 'every-day',
    title: { en: 'For every day', tl: 'Para sa araw-araw' },
    links: [
      {
        title: 'Daily Hope',
        text: {
          en: 'A short, encouraging email every day for 21 days. Free.',
          tl: 'Isang maikling email na pampalakas-loob araw-araw, sa loob ng 21 araw. Libre.',
        },
        to: { page: '/daily-hope' },
      },
      {
        title: 'HopeCasts',
        text: {
          en: 'Short audio messages of hope to listen to.',
          tl: 'Maiikling audio na mensahe ng pag-asa na puwede mong pakinggan.',
        },
        to: { page: '/hopecasts' },
      },
      {
        title: 'Hopeful Beginning Plan',
        text: {
          en: 'A free plan for hard days that stays on your phone.',
          tl: 'Libreng plano para sa mabibigat na araw. Sa phone mo lang ito naka-save.',
        },
        to: { page: '/action-plan', tlPage: '/action-plan?lang=tl' },
      },
      {
        title: {
          en: 'Five steps for hopeless days',
          tl: 'Limang hakbang kapag parang wala nang pag-asa',
        },
        text: {
          en: 'A video, a prayer and a Bible reading.',
          tl: 'Isang video, isang dasal at isang Bible reading.',
        },
        to: { page: '/get-started' },
      },
    ],
  },
];

const copy = {
  en: {
    title: 'Tools for hard moments',
    subtitle: 'What you type here stays on your phone.',
    pick: "What's happening?",
    needsPlan: 'Your reasons are kept with your plan on this phone.',
    makePlan: 'Make your free plan first',
    crisis:
      "If you're thinking of ending your life, call the NCMH Crisis Hotline now, open 24/7:",
    or: 'or',
    ecoach: 'Or talk to an e-coach on Messenger',
    close: 'Close',
  },
  tl: {
    title: 'Mga tool para sa mabibigat na sandali',
    subtitle: 'Sa phone mo lang naiiwan ang anumang i-type mo dito.',
    pick: 'Ano ang nangyayari?',
    needsPlan:
      'Naka-save ang mga dahilan mo kasama ng plano mo sa phone na ito.',
    makePlan: 'Gumawa muna ng libreng plano',
    crisis:
      'Kung naiisip mong tapusin ang buhay mo, tumawag ngayon sa NCMH Crisis Hotline, bukas 24/7:',
    or: 'o',
    ecoach: 'O kausapin ang isang e-coach sa Messenger',
    close: 'Isara',
  },
};

function MoreRow({ link, lang }: { link: MoreLink; lang: FeelingLang }) {
  const { to } = link;
  const icon = 'h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]';
  const body = (
    <>
      <span className="min-w-0 flex-1">
        {typeof link.title === 'string' ? (
          <span
            lang="en"
            className="block font-poppins font-bold text-[#6E5F47]"
          >
            {link.title}
          </span>
        ) : (
          <span className="block font-poppins font-bold text-[#6E5F47]">
            {link.title[lang]}
          </span>
        )}
        <span className="mt-0.5 block text-sm text-[#6E5F47]/75">
          {link.text[lang]}
        </span>
      </span>
      {'page' in to ? (
        <ChevronRight aria-hidden className={icon} />
      ) : (
        <ArrowUpRight aria-hidden className={icon} />
      )}
    </>
  );

  if ('ecoach' in to) {
    return (
      <EcoachLink linkName={to.ecoach} className={rowClass}>
        {body}
      </EcoachLink>
    );
  }
  if ('site' in to) {
    return (
      <TrackedLink
        href={to.site}
        linkName={to.linkName}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {body}
      </TrackedLink>
    );
  }
  return (
    <Link
      href={lang === 'tl' && to.tlPage ? to.tlPage : to.page}
      className={rowClass}
    >
      {body}
    </Link>
  );
}

function ToolCard({
  kind,
  lang,
  isOpen,
  onOpen,
  onClose,
  delay,
}: {
  kind: ToolKind;
  lang: FeelingLang;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  /** Rows arrive one after another when a situation is picked. */
  delay: number;
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
    <li className="hb-step-in" style={{ animationDelay: `${delay}ms` }}>
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
            {tool.text[lang]} {tool.why[lang]}
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
  const [active, setActive] = useState(GROUPS[0].id);
  const pickPhoto = usePhotoPicker();
  const [open, setOpen] = useState<ToolKind | null>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const group = GROUPS.find((item) => item.id === active) ?? GROUPS[0];

  // Links from Taglish pages open the tools in Taglish (?lang=tl).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'tl' || requested === 'en') setLanguage(requested);
  }, []);

  const select = (id: string) => {
    setActive(id);
    setOpen(null);
  };

  // Arrow keys move between the photos, like any set of tabs.
  const onTabKey = (event: React.KeyboardEvent) => {
    const index = GROUPS.findIndex((item) => item.id === active);
    const last = GROUPS.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % GROUPS.length
        : event.key === 'ArrowLeft'
          ? (index + last) % GROUPS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    select(GROUPS[next].id);
    tabs.current[GROUPS[next].id]?.focus();
  };

  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          <div className="self-end md:self-auto">
            <LanguageSwitch />
          </div>
        </div>

        <p
          id="tools-pick"
          className="mt-10 font-poppins font-semibold text-[#6E5F47]"
        >
          {t.pick}
        </p>
        <div
          role="tablist"
          aria-labelledby="tools-pick"
          onKeyDown={onTabKey}
          className="-mx-6 mt-3 flex snap-x scroll-px-6 gap-4 overflow-x-auto px-6 pt-1 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {GROUPS.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[item.id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="tools-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(item.id)}
                className="group w-28 shrink-0 snap-start text-left focus-visible:outline-none md:w-auto"
              >
                <span
                  className={`relative block aspect-square overflow-hidden rounded-xl bg-[#EFF3E7] ring-offset-2 ring-offset-[#FCFDFA] transition-[transform,box-shadow] duration-[var(--hb-base)] ease-[var(--hb-ease-out)] group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/60 ${
                    isActive
                      ? 'ring-2 ring-[#6E5F47]'
                      : 'group-hover:-translate-y-0.5'
                  }`}
                >
                  <Image
                    src={pickPhoto(item.photo).src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 160px, 112px"
                    className={`object-cover transition-[filter,transform] duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                      isActive
                        ? 'scale-105'
                        : 'saturate-[0.8] group-hover:saturate-100'
                    }`}
                  />
                </span>
                <span className="mt-2 block font-poppins text-sm font-medium leading-snug text-[#6E5F47]">
                  {item.label[lang]}
                </span>
              </button>
            );
          })}
        </div>

        <section
          id="tools-panel"
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className="mt-8 border-t border-[#E2DFDA] pt-8 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
        >
          {/* The picked photo, large, crossfading from the last one: a
              second picture of the same moment, not the tab's own. */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-xl bg-[#EFF3E7] md:sticky md:top-28 md:block md:self-start">
            {GROUPS.map((item) => (
              <Image
                key={item.id}
                src={pickPhoto(item.photo, 1).src}
                alt=""
                fill
                sizes="400px"
                className={`object-cover transition-opacity duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                  item.id === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div key={group.id}>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] hb-step-in">
              {group.title[lang]}
            </h2>
            {group.id === 'reason' && (
              <div className="mt-5 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47] hb-step-in">
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
            <ul className={`mt-5 ${groupClass}`}>
              {group.tools.map((kind, index) => (
                <ToolCard
                  key={kind}
                  kind={kind}
                  lang={lang}
                  delay={80 + index * 70}
                  isOpen={open === kind}
                  onOpen={() => setOpen(kind)}
                  onClose={() => setOpen(null)}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* Hope AI, prayer, Daily Hope and the rest live here too, with
            the other things to do now. */}
        {MORE.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`more-${section.id}`}
            className="mt-12 border-t border-[#E2DFDA] pt-8"
          >
            <h2
              id={`more-${section.id}`}
              className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              {section.title[lang]}
            </h2>
            <ul className={`mt-5 max-w-2xl ${groupClass}`}>
              {section.links.map((link) => (
                <li
                  key={
                    typeof link.title === 'string' ? link.title : link.title.en
                  }
                >
                  <MoreRow link={link} lang={lang} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
