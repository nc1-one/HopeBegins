import { isIntlLang } from '@/lib/i18n';
import { intlFeelingPages } from '@/lib/intl';
import { FooterContent, type FooterFeeling } from './FooterContent';

/*
 * Kept short on purpose: a few main links, then every feeling page in one
 * quiet row. Those links are on every page so search engines keep finding
 * them; the sitemap lists everything else.
 *
 * The text follows the page's language, so it lives in FooterContent, in
 * the browser. The French, German, Spanish and Korean feeling pages stay
 * on the server: only their addresses and short labels are passed on.
 */
export function Footer() {
  const intlFeelings: FooterFeeling[] = intlFeelingPages.flatMap((page) =>
    isIntlLang(page.lang)
      ? [{ lang: page.lang, slug: page.slug, label: page.label }]
      : []
  );
  return <FooterContent intlFeelings={intlFeelings} />;
}
