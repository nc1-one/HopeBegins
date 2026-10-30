import { hreflang } from '@/lib/hreflang';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { OurApproach } from './OurApproach';

const PATH = '/our-approach';

const TITLE = 'Our approach';

const DESCRIPTION =
  'How HopeBegins helps, from the moment something feels wrong to months later: why we exist, what we aim for, the six steps and every free tool.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'how HopeBegins helps',
    'faith-driven mental health support',
    'Christian mental health support Philippines',
    'free mental health support Philippines',
    'hope stories',
    'e-coaching',
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
        crumb={TITLE}
      />
      <OurApproach lang="en" />
    </>
  );
}
