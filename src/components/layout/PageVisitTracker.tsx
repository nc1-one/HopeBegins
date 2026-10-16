'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { feelingSlugs } from '@/lib/feelingPages';
import { analyticsService } from '@/services/analyticsService';

// Pages whose visits show on the admin dashboard, by the name they are
// counted under.
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
  ...Object.fromEntries(
    feelingSlugs.map((path) => [path, `feeling_${path.slice(1)}`])
  ),
};

/** Counts one visit per page per browser session. Nothing personal is sent. */
export function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const page = TRACKED[pathname];
    if (page) analyticsService.recordVisit(page);
  }, [pathname]);

  return null;
}
