import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/daily-hope';
const TITLE = 'Daily Hope: 21 days of encouragement by email';
const DESCRIPTION =
  'A short, encouraging email every day for 21 days, for when you feel anxious, low or tired. Free.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'Daily Hope',
    'daily encouragement email',
    'daily devotional by email',
    '21 days of hope',
    'encouragement for anxiety',
    'words of hope',
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
        crumb="Daily Hope"
      />
      {children}
    </>
  );
}
