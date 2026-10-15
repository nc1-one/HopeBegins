import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/give-hope',
  'Give Hope: support HopeBegins',
  'Plant a Hope Seed and help HopeBegins reach more people who feel anxious, low or alone.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
