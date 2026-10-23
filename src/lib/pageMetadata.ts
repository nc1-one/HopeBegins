import type { Metadata } from 'next';
import type { FeelingLang } from './feelingPages';

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
 * than one. `lang` is the language the page is written in, for the preview.
 */
export function pageMetadata(
  path: string,
  title: string,
  description: string,
  {
    image = DEFAULT_IMAGE,
    keywords,
    lang = 'en',
  }: {
    image?: { url: string; alt: string };
    /** Words people search for that the page answers. */
    keywords?: string[];
    lang?: FeelingLang;
  } = {}
): Metadata {
  const shareTitle = `${title} | HopeBegins`;
  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'HopeBegins',
      locale: lang === 'tl' ? 'tl_PH' : 'en_PH',
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
