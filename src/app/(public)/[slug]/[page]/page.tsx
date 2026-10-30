import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeelingPageView } from '@/components/feelings/FeelingPageView';
import { GuidePage } from '@/components/guides/GuidePage';
import { isIntlLang, withLocale } from '@/lib/i18n';
import { getIntlPage, intlFeelingPages, intlGuides } from '@/lib/intl';
import { hreflang } from '@/lib/intlMetadata';
import { pageMetadata } from '@/lib/pageMetadata';

interface Params {
  params: Promise<{ slug: string; page: string }>;
}

// The feeling pages and guides in French, German, Spanish and Korean, such
// as /fr/<slug>. Only the pages in lib/intl exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...intlFeelingPages, ...intlGuides].map((page) => ({
    slug: page.lang,
    page: page.slug,
  }));
}

async function pageAt({ params }: Params) {
  const { slug, page } = await params;
  return isIntlLang(slug) ? getIntlPage(slug, page) : undefined;
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const page = await pageAt(props);
  if (!page || !isIntlLang(page.lang)) return {};
  return pageMetadata(
    withLocale(page.lang, `/${page.slug}`),
    page.metaTitle,
    page.metaDescription,
    {
      keywords: page.keywords,
      lang: page.lang,
      languages: hreflang(`/${page.pair}`),
    }
  );
}

export default async function Page(props: Params) {
  const page = await pageAt(props);
  if (!page) notFound();
  return 'sections' in page ? (
    <GuidePage guide={page} />
  ) : (
    <FeelingPageView page={page} />
  );
}
