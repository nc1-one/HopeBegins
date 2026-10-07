import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Free Hopeful Beginning Plan for anxiety and low mood',
  'Answer 9 quick questions and get a free, personal plan with calming tools and small daily steps. Your answers stay on your phone.',
  {
    url: '/og/hopeful-beginning-plan.jpg',
    alt: 'Get your free Hopeful Beginning Plan',
  }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
