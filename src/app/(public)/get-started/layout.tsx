import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/get-started';
const TITLE = 'Hopeful Beginning: five short steps when you feel hopeless';
const DESCRIPTION =
  'Feeling hopeless? Take five short steps: a welcome, a word for you, a guided prayer, a devotional and next steps.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'feeling hopeless',
    'what to do when you feel hopeless',
    'guided prayer',
    'devotional for hope',
    'Christian encouragement',
    'Hopeful Beginning',
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
        crumb="Hopeful Beginning"
      />
      {children}
    </>
  );
}
