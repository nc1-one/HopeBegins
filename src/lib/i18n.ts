/**
 * The languages HopeBegins speaks. English and Taglish live at the site's
 * own addresses (some Taglish pages have Tagalog addresses of their own).
 * French, German, Spanish and Korean live under /fr, /de, /es and /ko, so
 * search engines find each language at its own address.
 *
 * Spanish is neutral Latin American Spanish (tú, ustedes). Every language
 * uses the warm, informal you: tu, du, tú and Korean 해요체.
 */
export const LANGS = ['en', 'tl', 'fr', 'de', 'es', 'ko'] as const;
export type Lang = (typeof LANGS)[number];

/** The languages with their own /xx addresses. */
export const INTL_LANGS = ['fr', 'de', 'es', 'ko'] as const;
export type IntlLang = (typeof INTL_LANGS)[number];

export const isLang = (value: unknown): value is Lang =>
  LANGS.includes(value as Lang);
export const isIntlLang = (value: unknown): value is IntlLang =>
  INTL_LANGS.includes(value as IntlLang);

export interface LangInfo {
  /** The language's name in itself, for the language picker. */
  name: string;
  /** Two letters for the picker button. */
  short: string;
  /** For the html lang attribute. */
  htmlLang: string;
  /** For hreflang links and the sitemap. */
  hreflang: string;
  /** For link previews (og:locale). */
  ogLocale: string;
  /** For dates and numbers. */
  locale: string;
  /** Whose crisis line shows until the phone says where it is. */
  country: string;
}

export const LANG_INFO: Record<Lang, LangInfo> = {
  en: {
    name: 'English',
    short: 'EN',
    htmlLang: 'en-PH',
    hreflang: 'en-PH',
    ogLocale: 'en_PH',
    locale: 'en-PH',
    country: 'PH',
  },
  tl: {
    name: 'Taglish',
    short: 'TL',
    htmlLang: 'tl-PH',
    hreflang: 'tl-PH',
    ogLocale: 'tl_PH',
    locale: 'fil-PH',
    country: 'PH',
  },
  fr: {
    name: 'Français',
    short: 'FR',
    htmlLang: 'fr',
    hreflang: 'fr',
    ogLocale: 'fr_FR',
    locale: 'fr-FR',
    country: 'FR',
  },
  de: {
    name: 'Deutsch',
    short: 'DE',
    htmlLang: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    locale: 'de-DE',
    country: 'DE',
  },
  es: {
    name: 'Español',
    short: 'ES',
    htmlLang: 'es-419',
    hreflang: 'es',
    ogLocale: 'es_LA',
    locale: 'es-419',
    country: 'MX',
  },
  ko: {
    name: '한국어',
    short: 'KO',
    htmlLang: 'ko',
    hreflang: 'ko',
    ogLocale: 'ko_KR',
    locale: 'ko-KR',
    country: 'KR',
  },
};

/**
 * Core pages that exist in every language: /tools in English and Taglish,
 * /fr/tools in French, and so on.
 */
export const INTL_PAGES = [
  '/tools',
  '/check-in',
  '/action-plan',
  '/blog',
  '/help',
  '/our-approach',
  '/privacy',
  '/guidelines',
  '/hope-ai',
  '/prayers',
  '/get-started',
  '/daily-hope',
  '/hopecasts',
  '/give-hope',
  '/laro-muna',
] as const;
export type IntlPage = (typeof INTL_PAGES)[number];

export const isIntlPage = (path: string): path is IntlPage =>
  INTL_PAGES.includes(path as IntlPage);

/** The /xx language a path is in, if any: '/fr/tools' is French. */
export function localeAt(
  pathname: string | null | undefined
): IntlLang | undefined {
  const first = pathname?.split('/')[1];
  return isIntlLang(first) ? first : undefined;
}

/** A path without its /xx: '/fr/tools' becomes '/tools', '/fr' becomes '/'. */
export function stripLocale(pathname: string): string;
export function stripLocale(pathname: string | null): string | null;
export function stripLocale(pathname: string | null) {
  const locale = localeAt(pathname);
  if (!pathname || !locale) return pathname;
  return pathname.slice(locale.length + 1) || '/';
}

/** A root path at its /xx address: '/tools' in French is '/fr/tools'. */
export const withLocale = (lang: IntlLang, path: string) =>
  path === '/' ? `/${lang}` : `/${lang}${path}`;

/** Lists one value per language, for text written in every language. */
export type PerLang<T> = Record<Lang, T>;

/**
 * Text written for English and the four new languages only: Taglish
 * readers get the English, as they did before these pages had any other
 * language.
 */
export type PerLangNoTl<T> = Record<Exclude<Lang, 'tl'>, T>;
export const noTl = <T>(copy: PerLangNoTl<T>, lang: Lang): T =>
  copy[lang === 'tl' ? 'en' : lang];
