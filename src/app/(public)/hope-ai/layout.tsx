import { hreflang } from '@/lib/hreflang';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/hope-ai';
const TITLE = 'Talk to Hope AI, any time';
const DESCRIPTION =
  'Chat with Hope AI, an AI assistant, when you need to talk it through, day or night. Prefer a real person? Message an e-coach on Messenger.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'Hope AI',
    'someone to talk to',
    'talk to someone now',
    'AI chat for anxiety',
    'e-coach on Messenger',
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
        crumb="Hope AI"
      />
      {children}
    </>
  );
}
