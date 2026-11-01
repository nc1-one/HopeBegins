import { useEffect, useState } from 'react';
import { STORY_META, THEME_IDS, THEMES } from '@/lib/blog/meta';
import type { LanguageFilter } from '@/lib/clickLanguages';
import type { ClickAnalytics } from '@/types/admin';
import {
  PAGES,
  bySlug,
  count,
  hasEcoach,
  slugLabel,
  startingWith,
} from '../metrics';
import { BarList, Loading, NumberTable, Panel } from './parts';

/**
 * Each story's English title. They live with the stories' text, so they
 * load after the rest of the dashboard; until then, the address stands in.
 */
function useStoryTitles() {
  const [titles, setTitles] = useState<Record<string, string>>({});
  useEffect(() => {
    let live = true;
    import('@/lib/blog').then(({ stories }) => {
      if (!live) return;
      setTitles(
        Object.fromEntries(
          stories
            .filter((story) => story.lang === 'en')
            .map((story) => [story.slug, story.title])
        )
      );
    });
    return () => {
      live = false;
    };
  }, []);
  return titles;
}

/** Which pages people open, what they read, and how they reach out. */
export function Pages({
  clicks,
  language,
}: {
  clicks: ClickAnalytics | undefined;
  language: LanguageFilter;
}) {
  const titles = useStoryTitles();
  if (!clicks) return <Loading height={320} />;
  const t = clicks.totals;
  const n = (name: string) => count(t, name);
  const stories = bySlug(t, 'visit_story_');
  const readsIn = (theme: string) =>
    Object.entries(stories).reduce(
      (sum, [slug, reads]) =>
        STORY_META[slug]?.theme === theme ? sum + reads : sum,
      0
    );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel
        title="Page visits"
        note="Each page once per visit; a page in any language counts as that page."
      >
        <BarList
          rows={PAGES.map((page) => ({
            label: page.label,
            value: page.value(t),
          }))}
        />
      </Panel>

      <div className="space-y-6">
        <Panel title="Reaching out">
          <NumberTable
            columns={['Tap', 'Count']}
            rows={[
              {
                label: 'Crisis button in the header',
                values: [n('header_crisis_call')],
              },
              { label: 'Call on a crisis card', values: [n('crisis_call')] },
              {
                label: 'Call from the Help page',
                values: [n('help_call')],
              },
              hasEcoach(language) && {
                label: 'Any e-coach link',
                help: 'English and Taglish pages only.',
                values: [startingWith(t, 'ecoach_')],
              },
              { label: 'Opened Prayer War Room', values: [n('war_room')] },
              {
                label: 'Tapped "That\'s me" on the blog or a story',
                values: [n('story_thats_me')],
              },
            ]}
          />
        </Panel>
        <Panel title="Give Hope">
          <NumberTable
            columns={['Tap', 'Count']}
            rows={[
              {
                label: 'Give Hope page visits',
                values: [n('visit_give_hope')],
              },
              {
                label: 'Chose a way to give',
                values: [startingWith(t, 'give_way_')],
              },
              { label: 'Shared HopeBegins', values: [n('give_share')] },
            ]}
          />
        </Panel>
      </div>

      <Panel
        title="Blog stories by theme"
        note="Filter taps on the blog page, and reads of that theme's stories."
      >
        <NumberTable
          columns={['Theme', 'Filter taps', 'Story reads']}
          rows={THEME_IDS.map((theme) => ({
            label: THEMES.en[theme],
            values: [n(`blog_theme_${theme}`), readsIn(theme)],
          }))}
        />
      </Panel>

      <Panel
        title="Most-read blog stories"
        note="The top 10, each story in any language counted as one."
      >
        <BarList
          limit={10}
          rows={Object.entries(stories).map(([slug, value]) => ({
            label: titles[slug] ?? slugLabel(slug),
            value,
          }))}
        />
      </Panel>
    </div>
  );
}
