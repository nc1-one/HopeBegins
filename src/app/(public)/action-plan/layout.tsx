import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { pageMetadata } from '@/lib/pageMetadata';

const PATH = '/action-plan';
const TITLE = 'Free Hopeful Beginning Plan for anxiety and low mood';
const DESCRIPTION =
  'Answer 9 quick questions and get a free, personal plan with calming tools and small daily steps. Your answers stay on your phone.';
const IMAGE = {
  url: '/og/hopeful-beginning-plan.jpg',
  alt: 'Get your free Hopeful Beginning Plan',
};

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  image: IMAGE,
  keywords: [
    'free mental health plan',
    'plan for anxiety',
    'plan for low mood',
    'coping plan',
    'self-care plan',
    'Hopeful Beginning Plan',
    'calming tools',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        image={IMAGE.url}
        crumb="Hopeful Beginning Plan"
      />
      {children}
    </>
  );
}
