import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Become a Hope Carrier',
  'Volunteer to pray for people who send prayer requests to HopeBegins.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
