import { config } from '@/config';
import {
  BLOG_NAME,
  BLOG_PATH,
  stories,
  storyPath,
  THEMES,
} from '@/lib/hopeUnfiltered';

// The feed only changes when the stories do, so it is built once.
export const dynamic = 'force-static';

const escape = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** An RSS feed of Hope Unfiltered, for feed readers and search engines. */
export function GET() {
  const url = (path: string) => `${config.BASE_URL}${path}`;
  const items = [...stories]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map(
      (story) => `    <item>
      <title>${escape(story.title)}</title>
      <link>${url(storyPath(story))}</link>
      <guid isPermaLink="true">${url(storyPath(story))}</guid>
      <description>${escape(story.metaDescription)}</description>
      <category>${escape(THEMES[story.lang][story.theme])}</category>
      <pubDate>${new Date(`${story.published}T08:00:00+08:00`).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BLOG_NAME} | HopeBegins</title>
    <link>${url(BLOG_PATH)}</link>
    <atom:link href="${url(`${BLOG_PATH}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <description>Honest stories about hard seasons, and the small things that helped people through them.</description>
    <language>en-PH</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
