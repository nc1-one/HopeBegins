import { BlogIndex } from '@/components/blog/BlogIndex';
import { withLocale } from '@/lib/i18n';
import { INTL_META } from '@/lib/intlMeta';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';

// The blog in French, German, Spanish and Korean: /fr/blog and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/blog');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  const meta = INTL_META['/blog'][lang];
  return (
    <BlogIndex
      path={withLocale(lang, '/blog')}
      name={meta.crumb}
      description={meta.description}
      image="/og/blog.jpg"
      lang={lang}
    />
  );
}
