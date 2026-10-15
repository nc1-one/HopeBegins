'use client';

import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';

const languages: { value: FeelingLang; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'tl', label: 'Taglish' },
];

/** English or Taglish, remembered in this browser. */
export function LanguageSwitch() {
  const lang = useLanguage();
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex shrink-0 rounded-xl border border-[#DFE7CF] bg-white p-1 print:hidden"
    >
      {languages.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => setLanguage(option.value)}
          className="min-h-11 rounded-lg px-4 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] aria-pressed:bg-[#6E5F47] aria-pressed:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
