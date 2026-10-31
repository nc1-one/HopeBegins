import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import { FeelingPageView } from '@/components/feelings/FeelingPageView';
import { feelingPages, getFeelingPage } from '@/lib/feelingPages';
import { INTL_LANGS, isIntlLang } from '@/lib/i18n';
import { hreflang, intlPageMetadata } from '@/lib/intlMetadata';
import { pageMetadata } from '@/lib/pageMetadata';
import { HomeAbout } from '../components/HomeAbout';
import { LookingForHope } from '../components/LookingForHope';

// Only the phrases in feelingPages exist; any other root path is a 404.
export const dynamicParams = false;

// The same segment holds the home page in each new language: /fr, /de,
// /es and /ko. Their other pages live in the folders beside this file.
export function generateStaticParams() {
  return [
    ...feelingPages.map((page) => ({ slug: page.slug })),
    ...INTL_LANGS.map((lang) => ({ slug: lang })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isIntlLang(slug)) return intlPageMetadata('/')({ params });
  const page = getFeelingPage(slug);
  if (!page) return {};
  const english = page.lang === 'en' ? page : getFeelingPage(page.pair);
  const path = `/${page.slug}`;
  return {
    ...pageMetadata(path, page.metaTitle, page.metaDescription, {
      image: { url: `/og/feelings/${page.slug}.jpg`, alt: page.heading },
      keywords: page.keywords,
      lang: page.lang,
    }),
    // The page in each language; anyone else gets the English page.
    alternates: {
      canonical: path,
      languages: hreflang(`/${english?.slug ?? page.slug}`),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isIntlLang(slug)) {
    return (
      <>
        <IntlPageJsonLd lang={slug} page="/" />
        <LookingForHope about={<HomeAbout lang={slug} />} />
      </>
    );
  }
  const page = getFeelingPage(slug);
  if (!page) notFound();
  return <FeelingPageView page={page} />;
}
