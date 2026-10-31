import { withLocale, type IntlLang } from '@/lib/i18n';
import { INTL_META, type IntlMetaPage } from '@/lib/intlMeta';
import { PageJsonLd } from './PageJsonLd';

/** PageJsonLd for a core page at its /fr, /de, /es or /ko address. */
export function IntlPageJsonLd({
  lang,
  page,
}: {
  lang: IntlLang;
  page: IntlMetaPage;
}) {
  const meta = INTL_META[page][lang];
  return (
    <PageJsonLd
      path={withLocale(lang, page)}
      name={meta.title}
      description={meta.description}
      lang={lang}
      crumb={meta.crumb}
    />
  );
}
