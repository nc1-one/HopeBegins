import { HelpPage } from '@/components/help/HelpPage';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { hreflang } from '@/lib/intlMetadata';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/help';
const TITLE = 'Free helplines: someone to talk to now';
const DESCRIPTION =
  'Free crisis and listening lines in your country, most open day and night, plus Hope AI and prayer. Pick your country to see its numbers.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'free helpline',
    'crisis hotline',
    'someone to talk to',
    'suicide prevention hotline',
    'free counseling hotline',
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
        crumb="Helplines"
      />
      <HelpPage lang="en" />
    </>
  );
}
