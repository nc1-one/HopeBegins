import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/give-hope',
  'Give Hope: support HopeBegins',
  'Give a gift, or your heart and time as a Hope Carrier, to keep HopeBegins free for the next person who feels anxious, low or alone.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
