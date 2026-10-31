'use client';

import Link from '@/components/ui/LocalLink';
import { usePathname } from 'next/navigation';
import { EcoachLink } from '@/components/ui/EcoachLink';
import type { FeelingLang } from '@/lib/feelingPages';
import type { PerLang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { englishPath, pathIn } from '@/lib/taglishTwins';

const alsoHere: PerLang<string> = {
  en: 'Also here:',
  tl: 'Nandito rin:',
  fr: 'Et aussi :',
  de: 'Außerdem:',
  es: 'Además:',
  ko: '이런 것도 있어요:',
};

type OptionKey =
  | 'plan'
  | 'ecoach'
  | 'prayers'
  | 'hopeAi'
  | 'hopecasts'
  | 'dailyHope';

const options: Record<
  OptionKey,
  { title: Record<FeelingLang, string>; href?: string }
> = {
  plan: {
    title: {
      en: 'Get your free plan',
      tl: 'Kunin ang libreng plano mo',
      fr: 'Faire ton plan gratuit',
      de: 'Kostenlosen Plan erstellen',
      es: 'Obtén tu plan gratis',
      ko: '무료 계획 받기',
    },
    href: '/action-plan',
  },
  // In fr, de, es and ko this goes to free helplines: no e-coaches there.
  ecoach: {
    title: {
      en: 'Talk to an e-coach',
      tl: 'Kausapin ang isang e-coach',
      fr: 'Parler à quelqu’un',
      de: 'Mit jemandem reden',
      es: 'Hablar con alguien',
      ko: '누군가와 이야기하기',
    },
  },
  prayers: {
    title: {
      en: 'Ask for prayer',
      tl: 'Magpadasal',
      fr: 'Demander une prière',
      de: 'Um Gebet bitten',
      es: 'Pedir oración',
      ko: '기도 부탁하기',
    },
    href: '/prayers',
  },
  hopeAi: {
    title: {
      en: 'Talk to Hope AI',
      tl: 'Kausapin si Hope AI',
      fr: 'Parler à Hope AI',
      de: 'Mit Hope AI schreiben',
      es: 'Hablar con Hope AI',
      ko: 'Hope AI와 대화하기',
    },
    href: '/hope-ai',
  },
  hopecasts: {
    title: {
      en: 'Listen to a HopeCast',
      tl: 'Makinig sa isang HopeCast',
      fr: 'Écouter un HopeCast',
      de: 'Einen HopeCast hören',
      es: 'Escuchar un HopeCast',
      ko: 'HopeCast 듣기',
    },
    href: '/hopecasts',
  },
  dailyHope: {
    title: {
      en: 'Get Daily Hope',
      tl: 'Kumuha ng Daily Hope',
      fr: 'Recevoir Daily Hope',
      de: 'Daily Hope bekommen',
      es: 'Recibir Daily Hope',
      ko: 'Daily Hope 받기',
    },
    href: '/daily-hope',
  },
};

// What to suggest after each option page, most useful first.
const nextSteps: Record<string, OptionKey[]> = {
  '/prayers': ['plan', 'ecoach', 'hopecasts'],
  '/hope-ai': ['plan', 'prayers', 'hopecasts'],
  '/hopecasts': ['plan', 'ecoach', 'dailyHope'],
  '/daily-hope': ['plan', 'hopecasts', 'ecoach'],
  '/laro-muna': ['plan', 'ecoach', 'hopeAi'],
  '/tools': ['plan', 'ecoach', 'prayers'],
};

// Inline, with padding for a thumb, so a wrapped line keeps its spacing.
const linkClass = 'py-2.5 underline underline-offset-4 hover:text-[#5c4f3b]';

/** One quiet line under the page: where else to go, if they want to. */
export function WhatNext() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  const keys = nextSteps[englishPath(pathname)];
  if (!keys) return null;

  return (
    <section lang={lang} className="px-6 pb-12 print:hidden">
      <div className="max-w-5xl mx-auto border-t border-[#E2DFDA] pt-6">
        <p className="max-w-2xl leading-loose text-[#6E5F47]">
          {alsoHere[lang]}
          {keys.map((key, index) => {
            const option = options[key];
            return (
              <span key={key}>
                {' '}
                {/* The dot stays with the link after it. */}
                <span className="whitespace-nowrap">
                  {index > 0 && <span aria-hidden>· </span>}
                  {key === 'ecoach' ? (
                    <EcoachLink
                      linkName="ecoach_what_next"
                      className={linkClass}
                    >
                      {option.title[lang]}
                    </EcoachLink>
                  ) : (
                    <Link
                      // The plan opens in the page's language.
                      href={pathIn(option.href ?? '/', lang)}
                      className={linkClass}
                    >
                      {option.title[lang]}
                    </Link>
                  )}
                </span>
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
