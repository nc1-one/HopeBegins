import { fetchWithAuth } from './api';
import { config } from '@/config';
import { currentLanguage } from '@/lib/pageLanguage';

/**
 * Every count carries the language of the page it happened on, after two
 * underscores ("visit_tools__fr"), so the dashboard can show each language.
 * Only the language is sent, never anything about the person.
 */
const withLanguage = (linkName: string) =>
  `${linkName.slice(0, 76)}__${currentLanguage()}`;

/**
 * Where a tool was opened: a feeling page (stage 1), the menu or the home
 * page's "Start my breathing" for returning visitors (2), the plan (3), or
 * a tool's own page, such as the game at /laro-muna.
 */
export type ToolSource =
  | 'feeling'
  | 'menu'
  | 'home'
  | 'plan'
  | 'page'
  | 'checkin';

export const analyticsService = {
  recordClick: async (linkName: string): Promise<void> => {
    try {
      await fetchWithAuth(`${config.API_URL}/analytics/click/`, {
        method: 'POST',
        body: JSON.stringify({ link_name: withLanguage(linkName) }),
      });
    } catch (error) {
      console.error(`Failed to record click for ${linkName}:`, error);
    }
  },
  /**
   * Counts a page visit once per browser session, with no cookies or IDs:
   * a reload or coming back to the page in the same session isn't counted
   * again.
   */
  recordVisit: (page: string) => {
    const key = `hopebegins.visited.${page}.${currentLanguage()}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // Storage blocked: count it anyway.
    }
    analyticsService.recordClick(`visit_${page}`);
  },
};
