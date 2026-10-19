import { pageMetadata } from '@/lib/pageMetadata';
import { Toolbox } from './Toolbox';

export const metadata = pageMetadata(
  '/tools',
  'Tools for hard moments',
  'Free tools for anxiety, overthinking and low days: slow breathing, 5-4-3-2-1, worry time and a quick game, in English or Taglish. Nothing you type leaves your phone.'
);

export default function ToolsPage() {
  return <Toolbox />;
}
