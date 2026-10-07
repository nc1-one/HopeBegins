import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Give Hope: support HopeBegins',
  'Plant a Hope Seed and help HopeBegins reach more people who feel anxious, low or alone.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
