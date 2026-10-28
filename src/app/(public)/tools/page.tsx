import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { TAGLISH_TWINS, twinLanguages } from '@/lib/taglishTwins';
import { Toolbox } from './Toolbox';

const PATH = '/tools';
// The search result says what the tools are for; the page says "Tools for
// hard moments".
const TITLE = 'Free tools for anxiety, stress and overthinking';
const DESCRIPTION =
  'Free tools for anxiety, overthinking and low days: slow breathing, 5-4-3-2-1 grounding, worry time and games, plus prayer and Hope AI. English or Taglish.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'tools for anxiety',
    'breathing exercise',
    '5-4-3-2-1 grounding',
    'worry time',
    'how to stop overthinking',
    'coping tools',
    'Hope AI',
    'prayer request',
    'Prayer War Room',
    'Daily Hope',
    'HopeCasts',
  ],
  languages: twinLanguages(TAGLISH_TWINS.tools),
});

export default function ToolsPage() {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb="Tools"
      />
      <Toolbox />
    </>
  );
}
