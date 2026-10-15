'use client';

import { usePathname } from 'next/navigation';
import { getFeelingPage, type FeelingLang } from './feelingPages';
import { useLanguage } from './languagePreference';

/**
 * The language for shared parts of the page: a feeling page's own language,
 * otherwise the visitor's English/Taglish choice.
 */
export function usePageLanguage(): FeelingLang {
  const pathname = usePathname();
  const preferred = useLanguage();
  return getFeelingPage(pathname?.slice(1) ?? '')?.lang ?? preferred;
}
