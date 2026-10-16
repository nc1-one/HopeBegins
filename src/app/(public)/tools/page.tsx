import { pageMetadata } from '@/lib/pageMetadata';
import { Toolbox } from './Toolbox';

export const metadata = pageMetadata(
  '/tools',
  'Tools for hard moments',
  'Free guided tools for anxiety, overthinking and low days: slow breathing, 5-4-3-2-1, a quick game, worry time and more, in English or Taglish. Nothing you type leaves your phone.'
);

export default function ToolsPage() {
  return <Toolbox />;
}
