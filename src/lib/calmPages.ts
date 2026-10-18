import { feelingSlugs } from './feelingPages';

/**
 * Pages for people who are struggling right now: the door and menu, the
 * feeling pages, the plan, the journey, prayer, Hope AI, the tools and the
 * games. Also the pages where someone is giving, signing up or signing in.
 * They stay free of pop-ups and the floating chat bubble so nothing covers
 * the help or the form, and the chat widget's third-party script never loads
 * on them.
 */
const CALM_PAGES = new Set([
  '/',
  '/action-plan',
  '/tools',
  '/laro-muna',
  '/get-started',
  '/prayers',
  '/hope-ai',
  '/daily-hope',
  '/give-hope',
  '/give-hope/success',
  '/be-carrier',
  '/login/carrier',
  '/forgot-password',
  '/reset-password',
  ...feelingSlugs,
]);

export const isCalmPage = (pathname: string | null) =>
  pathname !== null && CALM_PAGES.has(pathname);
