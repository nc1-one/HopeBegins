import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Daily Hope: 21 days of encouragement by email',
  'Get a Daily Hope Drop in your inbox every day for 21 days. Free.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
