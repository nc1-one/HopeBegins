import { hreflang } from '@/lib/hreflang';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { Privacy } from './Privacy';

const PATH = '/privacy';

const TITLE = 'Privacy and confidentiality';

const DESCRIPTION =
  'What HopeBegins collects, who can see it, how we protect it, and your rights. Your plan, answers and Hope Card stay on your phone.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'HopeBegins privacy',
    'privacy policy',
    'confidentiality',
    'data privacy Philippines',
  ],
  languages: hreflang(PATH),
});

export default function Page() {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="Privacy"
      />
      <Privacy lang="en" />
    </>
  );
}
