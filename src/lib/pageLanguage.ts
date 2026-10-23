'use client';

import { usePathname } from 'next/navigation';
import { getFeelingPage, type FeelingLang } from './feelingPages';
import { STORY_META, storySlugAt } from './blog/meta';
import { useLanguage } from './languagePreference';
import { isTaglishTwin } from './taglishTwins';

/**
 * The language for shared parts of the page: a feeling page's or story's
 * own language, Taglish on a core page's Taglish address, otherwise the
 * visitor's English/Taglish choice.
 */
export function usePageLanguage(): FeelingLang {
  const pathname = usePathname();
  const preferred = useLanguage();
  const story = storySlugAt(pathname);
  if (isTaglishTwin(pathname)) return 'tl';
  return (
    getFeelingPage(pathname?.slice(1) ?? '')?.lang ??
    (story ? STORY_META[story].lang : preferred)
  );
}
