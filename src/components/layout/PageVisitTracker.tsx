'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { feelingSlugs } from '@/lib/feelingPages';
import { BLOG_PATH, storySlugAt } from '@/lib/blog/meta';
import { englishPath } from '@/lib/taglishTwins';
import { analyticsService } from '@/services/analyticsService';

// Pages whose visits show on the admin dashboard, by the name they are
// counted under. A Taglish address counts with its English page.
const TRACKED: Record<string, string> = {
  '/': 'home',
  '/action-plan': 'action_plan',
  '/get-started': 'get_started',
  '/prayers': 'prayers',
  '/hope-ai': 'hope_ai',
  '/hopecasts': 'hopecasts',
  '/daily-hope': 'daily_hope',
  '/give-hope': 'give_hope',
  '/our-approach': 'our_approach',
  '/laro-muna': 'laro_muna',
  '/tools': 'tools',
  [BLOG_PATH]: 'blog',
  ...Object.fromEntries(
    feelingSlugs.map((path) => [path, `feeling_${path.slice(1)}`])
  ),
};

/** Counts one visit per page per browser session. Nothing personal is sent. */
export function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const story = storySlugAt(pathname);
    const page = TRACKED[englishPath(pathname)] ?? (story && `story_${story}`);
    if (page) analyticsService.recordVisit(page);
  }, [pathname]);

  return null;
}
