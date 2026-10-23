import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/hopecasts';
const TITLE = 'HopeCasts: listen to messages of hope';
const DESCRIPTION =
  'Listen to HopeCasts on anxiety, healing, family, grief and faith, whenever you need to hear hope.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'HopeCasts',
    'messages of hope',
    'Christian podcast',
    'podcast for anxiety',
    'healing',
    'grief',
    'faith',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="HopeCasts"
      />
      {children}
    </>
  );
}
