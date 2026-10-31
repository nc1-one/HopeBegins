import { hreflang } from '@/lib/hreflang';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/guidelines';
const TITLE = 'Volunteer code of conduct';
const DESCRIPTION =
  'How HopeBegins volunteers care for people, keep what they share confidential, and respond to a crisis.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'Hope Carrier code of conduct',
    'volunteer guidelines',
    'prayer volunteer confidentiality',
    'crisis response',
  ],
  languages: hreflang(PATH),
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="Volunteer code of conduct"
      />
      {children}
    </>
  );
}
