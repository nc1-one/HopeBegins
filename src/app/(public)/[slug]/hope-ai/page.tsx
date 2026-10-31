import { IntlPageJsonLd } from '@/components/layout/IntlPageJsonLd';
import {
  intlLang,
  intlPageMetadata,
  intlParams,
  type IntlParams,
} from '@/lib/intlMetadata';
import { HopeAi } from '../../hope-ai/HopeAi';

// /hope-ai in French, German, Spanish and Korean: /fr/hope-ai and so on.
export const dynamicParams = false;
export const generateStaticParams = intlParams;
export const generateMetadata = intlPageMetadata('/hope-ai');

export default async function Page(props: IntlParams) {
  const lang = await intlLang(props);
  return (
    <>
      <IntlPageJsonLd lang={lang} page="/hope-ai" />
      <HopeAi lang={lang} />
    </>
  );
}
