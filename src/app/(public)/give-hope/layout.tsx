import { hreflang } from '@/lib/hreflang';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/give-hope';
const TITLE = 'Give Hope: donate or volunteer';
const DESCRIPTION =
  'Give a gift to keep HopeBegins free for the next person who feels anxious, low or alone, or give your time as a Hope Carrier who prays for people.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'Give Hope',
    'donate to HopeBegins',
    'donate to mental health Philippines',
    'faith-based charity Philippines',
    'volunteer to pray',
    'Hope Carrier',
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
        crumb="Give Hope"
      />
      {children}
    </>
  );
}
