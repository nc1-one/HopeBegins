'use client';

import Link from 'next/link';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';

const languages: { value: FeelingLang; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'tl', label: 'Taglish' },
];

const optionClass =
  'inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] aria-pressed:bg-[#6E5F47] aria-pressed:text-white aria-[current=page]:bg-[#6E5F47] aria-[current=page]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

/**
 * English or Taglish, remembered in this browser. On a page with an
 * address for each language, `links` makes each choice go to that address,
 * and `current` is the language of the page being shown.
 */
export function LanguageSwitch({
  links,
  current,
}: {
  links?: Record<FeelingLang, string>;
  current?: FeelingLang;
} = {}) {
  const preferred = useLanguage();
  const lang = current ?? preferred;
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex shrink-0 rounded-xl border border-[#DFE7CF] bg-white p-1 print:hidden"
    >
      {languages.map((option) =>
        links ? (
          <Link
            key={option.value}
            href={links[option.value]}
            hrefLang={option.value}
            lang={option.value}
            aria-current={lang === option.value ? 'page' : undefined}
            onClick={() => setLanguage(option.value)}
            className={optionClass}
          >
            {option.label}
          </Link>
        ) : (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={lang === option.value}
            onClick={() => setLanguage(option.value)}
            className={optionClass}
          >
            {option.label}
          </button>
        )
      )}
    </div>
  );
}
