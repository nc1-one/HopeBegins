'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { feelingSlugs } from '@/lib/feelingPages';
import { BLOG_PATH, storySlugAt } from '@/lib/blog/meta';
import { englishPathOf } from '@/lib/intlRoutes';
import { analyticsService } from '@/services/analyticsService';

// Pages whose visits show on the admin dashboard, by the name they are
// counted under. The same page in another language counts under its
// English page's name; the language goes with the count (analyticsService).
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
  '/check-in': 'check_in',
  '/help': 'help',
  [BLOG_PATH]: 'blog',
  ...Object.fromEntries(
    feelingSlugs.map((path) => [path, `feeling_${path.slice(1)}`])
  ),
};

/** Counts one visit per page per browser session. Nothing personal is sent. */
export function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const english = englishPathOf(pathname ?? '/');
    const story = storySlugAt(english);
    const page = TRACKED[english] ?? (story && `story_${story}`);
    if (page) analyticsService.recordVisit(page);
  }, [pathname]);

  return null;
}
