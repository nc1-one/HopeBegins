import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { TAGLISH_TWINS, twinLanguages } from '@/lib/taglishTwins';
import { Toolbox } from './Toolbox';

const PATH = '/tools';
const TITLE = 'Tools for hard moments';
const DESCRIPTION =
  'Free tools for anxiety, overthinking and low days: slow breathing, 5-4-3-2-1, worry time and games, plus Hope AI, prayer, Daily Hope and HopeCasts. In English or Taglish.';

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
