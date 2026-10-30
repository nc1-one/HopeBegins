import type { Metadata } from 'next';
import { INTL_LANGS, isIntlLang, withLocale, type IntlLang } from './i18n';
import { INTL_META, type IntlMetaPage } from './intlMeta';
import { pageMetadata } from './pageMetadata';
import { hreflang } from './hreflang';

export { hreflang };

export interface IntlParams {
  params: Promise<{ slug: string }>;
}

/** Every /xx address of a core page, for generateStaticParams. */
export const intlParams = () => INTL_LANGS.map((slug) => ({ slug }));

/** The language of a /xx address. Only /fr, /de, /es and /ko are built. */
export async function intlLang({ params }: IntlParams): Promise<IntlLang> {
  const { slug } = await params;
  if (!isIntlLang(slug)) throw new Error(`Not a language: ${slug}`);
  return slug;
}

/** Title, description, keywords and hreflang for a core page at /xx. */
export function intlPageMetadata(page: IntlMetaPage) {
  return async (props: IntlParams): Promise<Metadata> => {
    const lang = await intlLang(props);
    const meta = INTL_META[page][lang];
    return pageMetadata(withLocale(lang, page), meta.title, meta.description, {
      lang,
      keywords: meta.keywords,
      languages: hreflang(page),
    });
  };
}
