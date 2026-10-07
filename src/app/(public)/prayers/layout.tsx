import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Ask someone to pray for you',
  'Send a prayer request and a HopeBegins Hope Carrier will pray for you. Share as much or as little as you like.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
