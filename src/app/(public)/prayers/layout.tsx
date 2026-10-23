import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/prayers';
const TITLE = 'Ask someone to pray for you';
const DESCRIPTION =
  'Send a prayer request and a HopeBegins Hope Carrier will pray for you. Share as much or as little as you like.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'prayer request',
    'pray for me',
    'ask someone to pray for you',
    'free online prayer request',
    'prayer for anxiety',
    'Hope Carriers',
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
        crumb="Prayer requests"
      />
      {children}
    </>
  );
}
