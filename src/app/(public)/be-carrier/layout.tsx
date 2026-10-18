import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/be-carrier',
  'Become a Hope Carrier',
  'Give your heart and time: volunteer to pray for the people who send prayer requests to HopeBegins.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
