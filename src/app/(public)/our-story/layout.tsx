import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Our Story',
  'Why HopeBegins exists, who it is for, and the H.O.P.E. framework behind it.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
