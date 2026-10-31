'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LANG_INFO, isIntlLang, localeAt } from '@/lib/i18n';
import { localizeHref } from '@/lib/intlRoutes';
import { chosenLanguage } from '@/lib/languagePreference';
import { usePageLanguage } from '@/lib/pageLanguage';

/**
 * Someone whose phone is in French, German, Spanish or Korean (or who chose
 * one with the globe) and opens an English address goes to the same page in
 * their language. An address that names its language (/fr/...) is never
 * redirected, so shared links and search results open as they were sent.
 * Also keeps the page's lang attribute right for screen readers.
 */
export function LanguageRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = usePageLanguage();

  useEffect(() => {
    document.documentElement.lang = LANG_INFO[lang].htmlLang;
  }, [lang]);

  useEffect(() => {
    if (!pathname || localeAt(pathname)) return;
    const chosen = chosenLanguage();
    if (!isIntlLang(chosen)) return;
    const { search, hash } = window.location;
    const target = localizeHref(`${pathname}${search}${hash}`, chosen);
    if (target !== `${pathname}${search}${hash}`) router.replace(target);
  }, [pathname, router]);

  return null;
}
