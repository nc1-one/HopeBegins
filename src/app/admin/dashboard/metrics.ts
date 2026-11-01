import { TAGLISH_TO_ENGLISH } from '@/lib/intlRoutes.generated';

/*
 * Every number on the dashboard and in the PDF report, defined once, from
 * the site's anonymous counts (analyticsService says how each is recorded).
 * Each works on one language's counts or on every language's, with the
 * language already taken out of the names (clickLanguages).
 */

export type Totals = Record<string, number>;

export const count = (t: Totals, name: string) => t[name] ?? 0;

export const sumWhere = (t: Totals, test: (name: string) => boolean) =>
  Object.entries(t).reduce(
    (total, [name, n]) => (test(name) ? total + n : total),
    0
  );

export const startingWith = (t: Totals, prefix: string) =>
  sumWhere(t, (name) => name.startsWith(prefix));

/**
 * A count recorded first on its own, then with a detail on the end:
 * "plan_tool_add", later "plan_tool_add_breathe".
 */
export const withDetails = (t: Totals, base: string) =>
  count(t, base) + startingWith(t, `${base}_`);

export const percent = (part: number, whole: number) =>
  whole ? `${Math.round((part / whole) * 100)}%` : '–';

/** A share, or "2 of 5" while there are too few for a percentage to mean much. */
export const share = (part: number, whole: number) =>
  whole >= 10 ? percent(part, whole) : whole ? `${part} of ${whole}` : '–';

/** The calming tools, by the name their counts use. */
export const TOOLS = [
  { kind: 'breathe', label: 'Slow breathing' },
  { kind: 'ground', label: '5-4-3-2-1 grounding' },
  { kind: 'one-thing', label: 'One small thing' },
  { kind: 'worry-time', label: 'Worry time' },
  { kind: 'unhook', label: 'Unhook from a heavy thought' },
  { kind: 'thought-check', label: 'Thought check' },
  { kind: 'reasons', label: 'Reasons to keep going' },
] as const;

export const GAMES = [
  { kind: 'game', label: 'Find the pair' },
  { kind: 'kite', label: 'Saranggola (the kite game)' },
  { kind: 'mission', label: 'The trip' },
] as const;

/** Where a tool was opened, as its counts end ("tool_breathe_start_menu"). */
export const TOOL_SOURCES = [
  { source: 'feeling', label: 'A feeling page' },
  { source: 'menu', label: '"Calm down now" in the menu' },
  { source: 'home', label: 'Home page, returning visitors' },
  { source: 'plan', label: 'The plan' },
  { source: 'checkin', label: 'The daily check-in' },
  { source: 'page', label: 'Tools page and game pages' },
] as const;

/**
 * A tool's count from one place, or from everywhere when source is left
 * out, including the first days before tools noted where they were used.
 */
export const toolCount = (
  t: Totals,
  kind: string,
  step: 'start' | 'done' | 'stop' | 'checked' | 'short' | 'later' | 'add',
  source?: string
) =>
  source
    ? count(t, `tool_${kind}_${step}_${source}`)
    : withDetails(t, `tool_${kind}_${step}`);

const allTools = (t: Totals, step: 'start' | 'done', source?: string) =>
  TOOLS.reduce((sum, tool) => sum + toolCount(t, tool.kind, step, source), 0);

export interface Metric {
  label: string;
  /** What it counts, in a line, when the label isn't enough. */
  help?: string;
  value: (t: Totals) => number;
  /** Languages whose pages have it; elsewhere it shows as –, not 0. */
  onlyIn?: readonly string[];
}

/** The numbers the dashboard leads with, and the rows of By language. */
export const METRICS = {
  visits: {
    label: 'Visits',
    help: 'One per visit (a browser session), counted since 31 October 2026.',
    value: (t) => startingWith(t, 'country_'),
  },
  pagesViewed: {
    label: 'Pages viewed',
    help: 'Each page counts once per visit.',
    value: (t) => startingWith(t, 'visit_'),
  },
  homeVisits: {
    label: 'Home page visits',
    value: (t) => count(t, 'visit_home'),
  },
  feelingVisits: {
    label: 'Feeling page visits',
    help: 'Pages people find by searching how they feel.',
    value: (t) => startingWith(t, 'visit_feeling_'),
  },
  storyReads: {
    label: 'Blog stories read',
    value: (t) => startingWith(t, 'visit_story_'),
  },
  thatsMe: {
    label: 'Tapped "That\'s me"',
    help: '"Not okay today?" on the home page.',
    value: (t) => count(t, 'looking_for_hope'),
  },
  toolsStarted: {
    label: 'Calming tools started',
    value: (t) => allTools(t, 'start'),
  },
  toolsFinished: {
    label: 'Calming tools finished',
    value: (t) => allTools(t, 'done'),
  },
  gamesPlayed: {
    label: 'Games played',
    value: (t) =>
      GAMES.reduce((sum, game) => sum + toolCount(t, game.kind, 'start'), 0),
  },
  checkins: {
    label: 'Daily check-ins done',
    value: (t) => count(t, 'checkin_done'),
  },
  crisisTaps: {
    label: 'Crisis line taps',
    help: 'Calls started from the crisis button in the header, a crisis card or the Help page.',
    value: (t) =>
      count(t, 'header_crisis_call') +
      count(t, 'crisis_call') +
      count(t, 'help_call'),
  },
  helpVisits: {
    label: 'Help page visits',
    value: (t) => count(t, 'visit_help'),
  },
  ecoach: {
    label: 'E-coach taps',
    help: 'English and Taglish pages only.',
    value: (t) => startingWith(t, 'ecoach_'),
    onlyIn: ['en', 'tl', 'before'],
  },
  warRoom: {
    label: 'Opened Prayer War Room',
    value: (t) => count(t, 'war_room'),
  },
  planStarted: {
    label: 'Plan check-ins started',
    help: 'The 9 questions that make a plan.',
    value: (t) => count(t, 'plan_start'),
  },
  plansMade: {
    label: 'Plans made',
    value: (t) => count(t, 'plan_done'),
  },
  plansEmailed: {
    label: 'Plans emailed',
    value: (t) => count(t, 'plan_email'),
  },
  checkInEmails: {
    label: 'Asked for check-in emails',
    value: (t) => count(t, 'plan_check_in'),
  },
  daysTicked: {
    label: 'Plan days ticked',
    help: '"Done today" or a day on the 4-week grid.',
    value: (t) =>
      withDetails(t, 'plan_today_done') + startingWith(t, 'plan_grid_tick_'),
  },
  weeklyCheckIns: {
    label: 'Weekly check-ins',
    help: 'Took the plan check-in again.',
    value: (t) => count(t, 'plan_check_in_again'),
  },
  fourWeeks: {
    label: 'Reached the end of 4 weeks',
    value: (t) => count(t, 'plan_finish_start'),
  },
  hopeCards: {
    label: 'Hope Cards made',
    value: (t) => count(t, 'plan_hope_card_made'),
  },
  monthly: {
    label: 'Monthly check-ins',
    value: (t) => count(t, 'plan_monthly_start'),
  },
  neededHelp: {
    label: 'Needed more help at a monthly check-in',
    help: 'Results "coming back" and "safety".',
    value: (t) =>
      count(t, 'plan_monthly_result_returning') +
      count(t, 'plan_monthly_result_safety'),
  },
} satisfies Record<string, Metric>;

export type MetricId = keyof typeof METRICS;

/** Whether pages in this language ('all' for every one) link to the e-coach. */
export const hasEcoach = (language: string) =>
  language === 'all' || METRICS.ecoach.onlyIn.includes(language);

export interface Rate {
  label: string;
  part: (t: Totals) => number;
  whole: (t: Totals) => number;
}

/** Shares that compare languages fairly, whatever their size. */
export const RATES = {
  thatsMe: {
    label: 'Home page visits that tapped "That\'s me"',
    part: METRICS.thatsMe.value,
    whole: METRICS.homeVisits.value,
  },
  toolsFinished: {
    label: 'Calming tools finished, of those started',
    part: METRICS.toolsFinished.value,
    whole: METRICS.toolsStarted.value,
  },
  plansMade: {
    label: 'Plan check-ins that ended with a plan',
    part: METRICS.plansMade.value,
    whole: METRICS.planStarted.value,
  },
} satisfies Record<string, Rate>;

/** The site's pages, by the name their visits count under. */
export const PAGES: { label: string; value: (t: Totals) => number }[] = [
  ['home', 'Home'],
  ['tools', 'Tools'],
  ['check_in', 'Daily check-in'],
  ['action_plan', 'Plan'],
  ['get_started', 'Five steps (get started)'],
  ['help', 'Help'],
  ['prayers', 'Prayers'],
  ['hope_ai', 'Hope AI'],
  ['daily_hope', 'Daily Hope'],
  ['hopecasts', 'HopeCasts'],
  ['laro_muna', 'Laro muna (games)'],
  ['our_approach', 'Our approach'],
  ['give_hope', 'Give Hope'],
].map(([page, label]) => ({ label, value: (t) => count(t, `visit_${page}`) }));

PAGES.push(
  {
    label: 'Blog',
    // Counted as hope_unfiltered before the blog was renamed.
    value: (t) => count(t, 'visit_blog') + count(t, 'visit_hope_unfiltered'),
  },
  { label: 'Blog stories, all together', value: METRICS.storyReads.value },
  { label: 'Feeling pages, all together', value: METRICS.feelingVisits.value }
);

/**
 * Counts per page, by the page's English address: Taglish and other
 * languages count under it, and so do Taglish addresses from before that.
 */
export function bySlug(t: Totals, prefix: string) {
  const counts: Record<string, number> = {};
  for (const [name, n] of Object.entries(t)) {
    if (!name.startsWith(prefix)) continue;
    const slug = name.slice(prefix.length);
    const english = TAGLISH_TO_ENGLISH[slug] ?? slug;
    counts[english] = (counts[english] ?? 0) + n;
  }
  return counts;
}

/** "stop-overthinking-at-night" as "Stop overthinking at night". */
export const slugLabel = (slug: string) =>
  slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
