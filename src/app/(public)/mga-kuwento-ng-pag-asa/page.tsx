import type { Metadata } from 'next';
import { BLOG_COPY, BlogIndex } from '@/components/blog/BlogIndex';
import { BLOG_FEED } from '@/lib/blog';
import { twinMetadata } from '@/lib/pageMetadata';
import { TAGLISH_TWINS } from '@/lib/taglishTwins';

// The blog's list in Taglish. Its search lines are in taglishTwins.ts.
const TWIN = TAGLISH_TWINS.blog;
// The page's own heading, shown in the tab until the search lines are in.
const HEADING = {
  title: BLOG_COPY.tl.title,
  description: BLOG_COPY.tl.intro,
};
const OG_IMAGE = '/og/blog.jpg';

const base = twinMetadata(TWIN, HEADING, {
  url: OG_IMAGE,
  alt: HEADING.title,
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, types: BLOG_FEED },
};

export default function MgaKuwentoPage() {
  return (
    <BlogIndex
      path={TWIN.tl}
      name={HEADING.title}
      description={TWIN.description ?? HEADING.description}
      image={OG_IMAGE}
      lang="tl"
    />
  );
}
