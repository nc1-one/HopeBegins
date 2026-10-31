import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/be-carrier';
const TITLE = 'Become a Hope Carrier';
const DESCRIPTION =
  'Volunteer as a Hope Carrier and pray for the people who send prayer requests to HopeBegins.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'Hope Carrier',
    'prayer volunteer',
    'volunteer to pray for others',
    'prayer ministry volunteer',
    'volunteer Philippines',
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
        crumb="Become a Hope Carrier"
      />
      {children}
    </>
  );
}
