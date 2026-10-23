import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';
import { Toolbox } from './Toolbox';

const PATH = '/tools';
const TITLE = 'Tools for hard moments';
const DESCRIPTION =
  'Free tools for anxiety, overthinking and low days: slow breathing, 5-4-3-2-1, worry time and a quick game, in English or Taglish. Nothing you type leaves your phone.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'tools for anxiety',
    'breathing exercise',
    '5-4-3-2-1 grounding',
    'worry time',
    'how to stop overthinking',
    'coping tools',
    'Prayer War Room',
  ],
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
