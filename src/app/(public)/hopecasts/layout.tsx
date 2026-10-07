import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'HopeCasts: listen to messages of hope',
  'Listen to HopeCasts on anxiety, healing, family, grief and faith, whenever you need to hear hope.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
