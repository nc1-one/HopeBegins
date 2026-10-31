import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';
import { Privacy } from '../../privacy/Privacy';

// /privacy in French, German, Spanish and Korean: /fr/privacy and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/privacy');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  return (
    <>
      <IntlPageJsonLd lang={lang} page="/privacy" />
      <Privacy lang={lang} />
    </>
  );
}
