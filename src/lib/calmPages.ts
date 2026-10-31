import { feelingSlugs } from './feelingPages';
import { guideSlugs } from './guidePages';
import { englishPathOf } from './intlRoutes';

/**
 * Pages for people who are struggling right now: the door and menu, the
 * daily check-in, the feeling pages and guides, the plan, the journey,
 * prayer, Hope AI, the tools and the games. Also the pages where someone is giving, signing up or signing in.
 * They stay free of pop-ups and the floating chat bubble so nothing covers
 * the help or the form, and the chat widget's third-party script never loads
 * on them.
 */
const CALM_PAGES = new Set([
  '/',
  '/check-in',
  '/action-plan',
  '/tools',
  '/laro-muna',
  '/get-started',
  '/prayers',
  '/hope-ai',
  '/daily-hope',
  '/give-hope',
  '/give-hope/success',
  '/help',
  '/be-carrier',
  '/login/carrier',
  '/forgot-password',
  '/reset-password',
  ...feelingSlugs,
  ...guideSlugs,
]);

export const isCalmPage = (pathname: string | null) =>
  // The same page in any language: /fr/tools and /mga-tool-para-kumalma
  // are /tools.
  pathname !== null && CALM_PAGES.has(englishPathOf(pathname));
