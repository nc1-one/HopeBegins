import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Talk to Hope AI, any time',
  'Chat with Hope, an AI assistant, when you need to talk it through, day or night. Prefer a real person? Message an e-coach on Messenger.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
