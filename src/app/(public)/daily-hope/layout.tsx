import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/daily-hope',
  'Daily Hope: 21 days of encouragement by email',
  'A short, encouraging email every day for 21 days, for when you feel anxious, low or tired. Free.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
