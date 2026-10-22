'use client';

import { usePathname } from 'next/navigation';
import { getFeelingPage, type FeelingLang } from './feelingPages';
import { STORY_LANGS, storySlugAt } from './hopeUnfiltered/meta';
import { useLanguage } from './languagePreference';

/**
 * The language for shared parts of the page: a feeling page's or story's
 * own language, otherwise the visitor's English/Taglish choice.
 */
export function usePageLanguage(): FeelingLang {
  const pathname = usePathname();
  const preferred = useLanguage();
  const story = storySlugAt(pathname);
  return (
    getFeelingPage(pathname?.slice(1) ?? '')?.lang ??
    (story ? STORY_LANGS[story] : preferred)
  );
}
