'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EcoachLink } from '@/components/ui/EcoachLink';
import type { FeelingLang } from '@/lib/feelingPages';
import { usePageLanguage } from '@/lib/pageLanguage';

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
    title: { en: 'Get your free plan', tl: 'Kunin ang libreng plano mo' },
    href: '/action-plan',
  },
  ecoach: {
    title: { en: 'Talk to an e-coach', tl: 'Kausapin ang isang e-coach' },
  },
  prayers: {
    title: { en: 'Ask for prayer', tl: 'Magpadasal' },
    href: '/prayers',
  },
  hopeAi: {
    title: { en: 'Talk to Hope AI', tl: 'Kausapin si Hope AI' },
    href: '/hope-ai',
  },
  hopecasts: {
    title: { en: 'Listen to a HopeCast', tl: 'Makinig sa isang HopeCast' },
    href: '/hopecasts',
  },
  dailyHope: {
    title: { en: 'Get Daily Hope', tl: 'Kumuha ng Daily Hope' },
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
  const keys = nextSteps[pathname];
  if (!keys) return null;

  return (
    <section lang={lang} className="px-6 pb-12 print:hidden">
      <div className="max-w-5xl mx-auto border-t border-[#E2DFDA] pt-6">
        <p className="max-w-2xl leading-loose text-[#6E5F47]">
          {lang === 'tl' ? 'Nandito rin:' : 'Also here:'}
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
                      href={
                        // The plan opens in the page's language.
                        key === 'plan' && lang === 'tl'
                          ? `${option.href}?lang=tl`
                          : (option.href ?? '/')
                      }
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
