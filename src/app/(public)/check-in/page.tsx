import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { CheckInPage } from './CheckInPage';

const PATH = '/check-in';
const TITLE = 'Daily check-in: how are you today?';
const DESCRIPTION =
  'A 20-second daily check-in in English or Taglish. Tap how you feel, get one small thing to try, and grow a sampaguita each day you come back. Free, and it stays on your phone.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'daily mood check-in',
    'mood tracker',
    'kumusta ka ngayon',
    'mental health check-in',
    'CBT thought check',
  ],
});

export default function DailyCheckInPage() {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="Daily check-in"
      />
      <CheckInPage />
    </>
  );
}
