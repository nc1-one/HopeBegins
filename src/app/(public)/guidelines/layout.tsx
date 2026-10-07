import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Volunteer Code of Conduct',
  'How HopeBegins volunteers care for people, keep what they share confidential, and respond to a crisis.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
