import type { Metadata } from 'next';
import type { FeelingLang } from './feelingPages';
import { LANG_INFO } from './i18n';
import { hreflang } from './hreflang';
import { isTwinReady, type TaglishTwin } from './taglishTwins';

const DEFAULT_IMAGE = {
  url: '/og/hopebegins.jpg',
  alt: 'Not okay today? HopeBegins',
};

/**
 * Title, description, keywords, canonical address and link preview for a
 * page. A page's openGraph and twitter settings replace the root ones
 * entirely, so every page sets its image here instead of relying on the
 * root layout. `path` is the page's own address, such as '/action-plan'; it
 * tells Google which URL is the main one when the page is reachable at more
 * than one. `lang` is the language the page is written in, for the preview,
 * and `languages` names the page's versions in each language (hreflang).
 */
export function pageMetadata(
  path: string,
  title: string,
  description: string,
  {
    image = DEFAULT_IMAGE,
    keywords,
    lang = 'en',
    languages,
  }: {
    image?: { url: string; alt: string };
    /** Words people search for that the page answers. */
    keywords?: string[];
    lang?: FeelingLang;
    languages?: Record<string, string>;
  } = {}
): Metadata {
  const shareTitle = `${title} | HopeBegins`;
  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path, ...(languages && { languages }) },
    openGraph: {
      type: 'website',
      siteName: 'HopeBegins',
      locale: LANG_INFO[lang].ogLocale,
      url: path,
      title: shareTitle,
      description,
      images: [{ ...image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image.url],
    },
  };
}

/**
 * Metadata for a core page's Taglish address. Until the team writes its
 * search lines in taglishTwins.ts, the tab shows the page's own Taglish
 * heading and the page stays out of search results.
 */
export function twinMetadata(
  twin: TaglishTwin,
  heading: { title: string; description: string },
  image?: { url: string; alt: string }
): Metadata {
  return {
    ...pageMetadata(
      twin.tl,
      twin.title ?? heading.title,
      twin.description ?? heading.description,
      {
        image,
        keywords: twin.keywords.length ? twin.keywords : undefined,
        lang: 'tl',
        languages: hreflang(twin.en),
      }
    ),
    ...(!isTwinReady(twin) && { robots: { index: false } }),
  };
}
