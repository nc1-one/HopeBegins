import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryView } from '@/components/blog/StoryView';
import { getStory, stories } from '@/lib/blog';
import { storyMetadata } from '@/lib/blog/storyMetadata';

// Only the stories in lib/blog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return storyMetadata(getStory((await params).slug));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  return <StoryView story={story} />;
}
