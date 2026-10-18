import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/get-started',
  'Hopeful Beginning: five short steps when you feel hopeless',
  'Feeling hopeless? Take five short steps: a welcome, a word for you, a guided prayer, a devotional and next steps.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
