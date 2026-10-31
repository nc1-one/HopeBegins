'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, Globe } from 'lucide-react';
import {
  LANG_INFO,
  LANGS,
  withLocale,
  isIntlLang,
  type Lang,
} from '@/lib/i18n';
import { languageVersions } from '@/lib/intlRoutes';
import { setLanguage } from '@/lib/languagePreference';
import { usePageLanguage } from '@/lib/pageLanguage';
import { analyticsService } from '@/services/analyticsService';

const label: Record<Lang, string> = {
  en: 'Language',
  tl: 'Wika',
  fr: 'Langue',
  de: 'Sprache',
  es: 'Idioma',
  ko: '언어',
};

/**
 * The globe in the header: every language the site speaks, each going to
 * this page in that language (or that language's home page when this page
 * has no version in it). The choice is remembered on this phone.
 */
export function LanguagePicker() {
  const pathname = usePathname() ?? '/';
  const lang = usePageLanguage();
  const versions = languageVersions(pathname);
  // Open on the page it was opened on, so going to another page closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;
  const setIsOpen = (open: boolean) => setOpenOn(open ? pathname : null);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Closes on Escape or a tap outside.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen]);

  const hrefFor = (option: Lang) =>
    versions[option] ?? (isIntlLang(option) ? withLocale(option, '/') : '/');

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={`${label[lang]}${lang === 'fr' ? '\u00a0:' : ':'} ${LANG_INFO[lang].name}`}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 font-poppins text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] aria-expanded:bg-[#EFF3E7]"
      >
        <Globe className="h-5 w-5 shrink-0" aria-hidden />
        <span className="hidden sm:inline" aria-hidden>
          {LANG_INFO[lang].short}
        </span>
      </button>
      <div
        id={menuId}
        hidden={!isOpen}
        className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-[#E2DFDA] bg-[#FCFDFA] p-2 shadow-[0_12px_32px_-16px_rgba(110,95,71,0.35)]"
      >
        <p className="px-3 pb-1 pt-2 text-xs font-medium text-[#6E5F47]/80">
          {label[lang]}
        </p>
        <ul>
          {LANGS.map((option) => (
            <li key={option}>
              <Link
                href={hrefFor(option)}
                hrefLang={LANG_INFO[option].hreflang}
                lang={LANG_INFO[option].htmlLang}
                aria-current={option === lang ? 'true' : undefined}
                onClick={() => {
                  setLanguage(option);
                  analyticsService.recordClick(`language_pick_${option}`);
                  setIsOpen(false);
                }}
                className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 font-poppins text-[15px] font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] aria-[current=true]:font-bold"
              >
                {LANG_INFO[option].name}
                {option === lang && (
                  <Check className="h-4 w-4 text-[#91AFAA]" aria-hidden />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
