import { hreflang } from '@/lib/hreflang';
import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BLOG_FEED, BLOG_NAME, BLOG_PATH } from '@/lib/blog';
import { pageMetadata } from '@/lib/pageMetadata';

const TITLE = 'Stories of Hope: the HopeBegins blog';
const DESCRIPTION =
  'The HopeBegins blog: stories of anxiety, burnout, grief and faith, and the small things that helped Filipinos through hard seasons. In English and Taglish.';
const OG_IMAGE = '/og/blog.jpg';

const base = pageMetadata(BLOG_PATH, TITLE, DESCRIPTION, {
  image: { url: OG_IMAGE, alt: BLOG_NAME },
  keywords: [
    'Stories of Hope',
    'HopeBegins blog',
    'stories of hope',
    'mental health stories Philippines',
    'anxiety',
    'burnout',
    'grief',
    'faith',
    'Mga Kuwento ng Pag-asa',
    'kuwento ng pag-asa',
  ],
  languages: hreflang(BLOG_PATH),
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, types: BLOG_FEED },
};

export default function BlogPage() {
  return (
    <BlogIndex
      path={BLOG_PATH}
      name={BLOG_NAME}
      description={DESCRIPTION}
      image={OG_IMAGE}
    />
  );
}
