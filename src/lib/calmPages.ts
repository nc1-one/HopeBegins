import { feelingSlugs } from './feelingPages';

/**
 * Pages for people who are struggling right now: the door and menu, the
 * feeling pages, the plan, the journey, prayer, Hope AI, the tools and the
 * games. They stay free of pop-ups and the floating chat bubble so nothing
 * covers the help, and the chat widget's third-party script never loads on
 * them.
 */
const CALM_PAGES = new Set([
  '/',
  '/action-plan',
  '/tools',
  '/laro-muna',
  '/get-started',
  '/prayers',
  '/hope-ai',
  ...feelingSlugs,
]);

export const isCalmPage = (pathname: string | null) =>
  pathname !== null && CALM_PAGES.has(pathname);
