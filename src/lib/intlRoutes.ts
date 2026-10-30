import { BLOG_PATH } from './blog/meta';
import {
  isIntlLang,
  isIntlPage,
  LANGS,
  localeAt,
  stripLocale,
  withLocale,
  type Lang,
} from './i18n';
import {
  INTL_PAGE_SLUGS,
  INTL_STORY_SLUGS,
  TAGLISH_TO_ENGLISH,
} from './intlRoutes.generated';
import { englishPath, pathIn } from './taglishTwins';

/*
 * Where each page is in each language. The lists live in
 * intlRoutes.generated.ts, without the pages' text, so every page's links
 * can use them.
 */

const ENGLISH_TO_TAGLISH = Object.fromEntries(
  Object.entries(TAGLISH_TO_ENGLISH).map(([tl, en]) => [en, tl])
);

const slugFor = (map: Record<string, string>, slug: string) =>
  Object.keys(map).find((english) => map[english] === slug);

/**
 * The English address of a page in any language, so one page counts and
 * links as one: '/fr/tools' and '/mga-tool-para-kumalma' are '/tools'.
 */
export function englishPathOf(pathname: string): string {
  const locale = localeAt(pathname);
  const path = stripLocale(pathname);
  const story = path.startsWith(`${BLOG_PATH}/`)
    ? path.slice(BLOG_PATH.length + 1)
    : undefined;
  if (locale) {
    const english = story
      ? slugFor(INTL_STORY_SLUGS[locale], story)
      : slugFor(INTL_PAGE_SLUGS[locale], path.slice(1));
    if (!english) return path;
    return story ? `${BLOG_PATH}/${english}` : `/${english}`;
  }
  const twin = englishPath(path);
  if (twin !== path) return twin;
  const english = TAGLISH_TO_ENGLISH[story ?? path.slice(1)];
  if (!english) return path;
  return story ? `${BLOG_PATH}/${english}` : `/${english}`;
}

/**
 * Where an English page is in a language, or undefined when it has no
 * version in that language. English and Taglish share the core pages, which
 * switch language in place unless they have a Taglish address.
 */
export function pathInLang(english: string, lang: Lang): string | undefined {
  const story = english.startsWith(`${BLOG_PATH}/`)
    ? english.slice(BLOG_PATH.length + 1)
    : undefined;
  if (lang === 'en') return english;
  if (lang === 'tl') {
    const taglish = ENGLISH_TO_TAGLISH[story ?? english.slice(1)];
    if (taglish) return story ? `${BLOG_PATH}/${taglish}` : `/${taglish}`;
    return pathIn(english, 'tl');
  }
  if (english === '/' || isIntlPage(english)) return withLocale(lang, english);
  const local = story
    ? INTL_STORY_SLUGS[lang][story]
    : INTL_PAGE_SLUGS[lang][english.slice(1)];
  if (!local) return undefined;
  return withLocale(lang, story ? `${BLOG_PATH}/${local}` : `/${local}`);
}

/** The page at this address in every language it exists in. */
export function languageVersions(pathname: string) {
  const english = englishPathOf(pathname);
  return Object.fromEntries(
    LANGS.map((lang) => [lang, pathInLang(english, lang)])
  ) as Record<Lang, string | undefined>;
}

/**
 * A link on a French, German, Spanish or Korean page goes to the same page
 * in that language when there is one: '/tools' becomes '/fr/tools'. Links
 * on English and Taglish pages stay as written.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (!isIntlLang(lang) || !href.startsWith('/') || href.startsWith('//'))
    return href;
  const [, path, rest] = href.match(/^([^?#]*)(.*)$/) ?? ['', href, ''];
  if (localeAt(path)) return href;
  const local = pathInLang(englishPathOf(path || '/'), lang);
  return local ? `${local}${rest}` : href;
}
