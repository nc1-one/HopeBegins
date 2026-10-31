import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';
import HopecastsPage from '../../hopecasts/page';

// /hopecasts in French, German, Spanish and Korean: /fr/hopecasts and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/hopecasts');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  return (
    <>
      <IntlPageJsonLd lang={lang} page="/hopecasts" />
      <HopecastsPage />
    </>
  );
}
