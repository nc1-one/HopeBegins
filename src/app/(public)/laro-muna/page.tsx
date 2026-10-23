import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { LaroMuna } from './LaroMuna';

const PATH = '/laro-muna';
const TITLE = 'Laro muna: quick games for a busy mind';
const DESCRIPTION =
  'Free short games for when your thoughts keep looping: match jeepneys and mangoes, fly a kite at sunset, or drive a jeepney to the sea. No sign-up.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'laro muna',
    'games for anxiety',
    'calming games',
    'games for overthinking',
    'quick games for stress',
    'free games no sign-up',
  ],
});

export default function LaroMunaPage() {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="Laro muna"
      />
      <LaroMuna />
    </>
  );
}
