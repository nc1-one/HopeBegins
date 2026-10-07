import type { Metadata } from 'next';

const DEFAULT_IMAGE = {
  url: '/og/hopebegins.jpg',
  alt: 'Not okay today? HopeBegins',
};

/**
 * Title, description and link preview for a page. A page's openGraph and
 * twitter settings replace the root ones entirely, so every page sets its
 * image here instead of relying on the root layout.
 */
export function pageMetadata(
  title: string,
  description: string,
  image: { url: string; alt: string } = DEFAULT_IMAGE
): Metadata {
  const shareTitle = `${title} | HopeBegins`;
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'HopeBegins',
      locale: 'en_PH',
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
