import type { FeelingLang } from './feelingPages';

/**
 * Core pages that switch between English and Taglish in place also have a
 * Taglish address, so search engines can find the Taglish copy. The English
 * address works as before and follows the visitor's choice; the Taglish
 * address is always Taglish and makes Taglish the visitor's choice, as the
 * old ?lang=tl links did.
 *
 * For the team: write each page's Taglish search lines below. Until a page
 * has its title and description, it stays out of search results (noindex,
 * no sitemap entry, no hreflang), and the tab shows the page's own heading.
 */
export interface TaglishTwin {
  en: string;
  tl: string;
  /** Search result and tab title in Taglish, under 60 characters. */
  title: string | null;
  /** About 150 characters in Taglish: what the reader gets on the page. */
  description: string | null;
  /** About 5, the way people search in Taglish. */
  keywords: string[];
}

export const TAGLISH_TWINS: Record<'tools' | 'plan' | 'blog', TaglishTwin> = {
  tools: {
    en: '/tools',
    tl: '/mga-tool-para-kumalma',
    title: null,
    description: null,
    keywords: [],
  },
  plan: {
    en: '/action-plan',
    tl: '/libreng-plano',
    title: null,
    description: null,
    keywords: [],
  },
  blog: {
    en: '/blog',
    tl: '/mga-kuwento-ng-pag-asa',
    title: null,
    description: null,
    keywords: [],
  },
};

const twins: TaglishTwin[] = Object.values(TAGLISH_TWINS);

/** Whether the team has written the page's search lines yet. */
export const isTwinReady = (twin: TaglishTwin) =>
  Boolean(twin.title && twin.description);

/**
 * The English page a Taglish address stands for, or the path itself, so
 * lists of pages (crisis band, visit counts, pop-up rules) cover both.
 */
export function englishPath(pathname: string): string;
export function englishPath(pathname: string | null): string | null;
export function englishPath(pathname: string | null) {
  return twins.find((twin) => twin.tl === pathname)?.en ?? pathname;
}

/** Whether this is one of the Taglish addresses. */
export const isTaglishTwin = (pathname: string | null) =>
  twins.some((twin) => twin.tl === pathname);

/** Where to link for a page in a language: its Taglish address if it has one. */
export const pathIn = (path: string, lang: FeelingLang) =>
  (lang === 'tl' && twins.find((twin) => twin.en === path)?.tl) || path;

/** Both addresses, for a language switch that links between them. */
export const twinLinks = (twin: TaglishTwin): Record<FeelingLang, string> => ({
  en: twin.en,
  tl: twin.tl,
});

/** The pair for hreflang, once the Taglish page may be indexed. */
export const twinLanguages = (twin: TaglishTwin) =>
  isTwinReady(twin)
    ? { 'tl-PH': twin.tl, 'en-PH': twin.en, 'x-default': twin.en }
    : undefined;
