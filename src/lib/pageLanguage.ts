'use client';

import { usePathname } from 'next/navigation';
import { getFeelingPage } from './feelingPages';
import { STORY_META, storySlugAt } from './blog/meta';
import { localeAt, type Lang } from './i18n';
import { chosenLanguage, useLanguage } from './languagePreference';
import { isTaglishTwin } from './taglishTwins';

/**
 * The language of the page at an address, or undefined when the page
 * follows the visitor's choice: a /fr, /de, /es or /ko address is in that
 * language, and a feeling page's, story's or Taglish address in its own.
 */
function languageAt(pathname: string | null): Lang | undefined {
  const locale = localeAt(pathname);
  if (locale) return locale;
  if (isTaglishTwin(pathname)) return 'tl';
  const story = storySlugAt(pathname);
  return (
    getFeelingPage(pathname?.slice(1) ?? '')?.lang ??
    (story ? STORY_META[story].lang : undefined)
  );
}

/**
 * The language for shared parts of the page: the page's own language if it
 * has one, otherwise the visitor's English/Taglish choice.
 */
export function usePageLanguage(): Lang {
  const pathname = usePathname();
  const preferred = useLanguage();
  return languageAt(pathname) ?? preferred;
}

/** The same, outside React: for counting visits and taps per language. */
export function currentLanguage(): Lang {
  const chosen = chosenLanguage();
  return (
    languageAt(window.location.pathname) ?? (chosen === 'tl' ? 'tl' : 'en')
  );
}
