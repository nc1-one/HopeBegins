import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';
import { OurApproach } from '../../our-approach/OurApproach';

// /our-approach in French, German, Spanish and Korean: /fr/our-approach and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/our-approach');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  return (
    <>
      <IntlPageJsonLd lang={lang} page="/our-approach" />
      <OurApproach lang={lang} />
    </>
  );
}
