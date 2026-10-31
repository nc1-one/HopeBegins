import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';
import { Guidelines } from '../../guidelines/Guidelines';

// /guidelines in French, German, Spanish and Korean: /fr/guidelines and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/guidelines');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  return (
    <>
      <IntlPageJsonLd lang={lang} page="/guidelines" />
      <Guidelines lang={lang} />
    </>
  );
}
