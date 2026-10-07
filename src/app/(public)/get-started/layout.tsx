import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Hopeful Beginning: a guided journey when you feel hopeless',
  'Feeling hopeless? Take a guided journey in five steps: a welcome, a word for you, a guided prayer, a devotional and gentle next steps.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
