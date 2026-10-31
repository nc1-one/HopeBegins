import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryView } from '@/components/blog/StoryView';
import { storyMetadata } from '@/lib/blog/storyMetadata';
import { isIntlLang } from '@/lib/i18n';
import { getIntlStory, intlStories } from '@/lib/intl';

interface Params {
  params: Promise<{ slug: string; story: string }>;
}

// The stories adapted for French, German, Spanish and Korean readers, such
// as /fr/blog/<slug>. Only the stories in lib/intl exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return intlStories.map((story) => ({ slug: story.lang, story: story.slug }));
}

async function storyAt({ params }: Params) {
  const { slug, story } = await params;
  return isIntlLang(slug) ? getIntlStory(slug, story) : undefined;
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  return storyMetadata(await storyAt(props));
}

export default async function Page(props: Params) {
  const story = await storyAt(props);
  if (!story) notFound();
  return <StoryView story={story} />;
}
