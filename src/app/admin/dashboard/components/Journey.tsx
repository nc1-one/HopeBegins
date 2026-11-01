import type { ReactNode } from 'react';
import { buildPlan } from '@/lib/actionPlan';
import { feelingPages } from '@/lib/feelingPages';
import type { LanguageFilter } from '@/lib/clickLanguages';
import type { ClickAnalytics } from '@/types/admin';
import {
  METRICS,
  bySlug,
  count,
  hasEcoach,
  share,
  slugLabel,
  startingWith,
  sumWhere,
  toolCount,
  withDetails,
  type Totals,
} from '../metrics';
import { BarList, Loading, NumberTable, type TableRow } from './parts';

/*
 * The visitor journey, stage by stage, from the site's anonymous counts.
 * No cookies or personal details are behind these numbers: a visit counts
 * once per browser session, and each tool counts where it was used.
 */

// Every plan tool's English name, for the per-tool counts.
const TOOL_TITLES: Record<string, string> = Object.fromEntries(
  buildPlan({}, 'en').allTools.map((tool) => [tool.id, tool.title])
);

// The English feeling pages' names; other languages count under them.
const FEELING_LABELS: Record<string, string> = Object.fromEntries(
  feelingPages
    .filter((page) => page.lang === 'en')
    .map((page) => [page.slug, page.label])
);

const MENU_LABELS: Record<string, string> = {
  anxious: 'I feel anxious',
  tired: "I'm tired of everything",
  alone: 'I feel alone',
  sleep: "I can't sleep from overthinking",
  hopeless: "I don't have hope",
  unsure: "I'm not sure what I feel",
};

function Stage({
  stage,
  title,
  question,
  summary,
  open,
  children,
}: {
  stage: number;
  title: string;
  question: string;
  summary: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={open}
      className="report-block group rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Stage {stage} · {question}
          </span>
          <span className="mt-0.5 block text-lg font-black">{title}</span>
          <span className="mt-0.5 block text-sm font-medium text-zinc-500">
            {summary}
          </span>
        </span>
        <span
          aria-hidden
          className="mt-1 text-sm font-bold text-zinc-500 transition-transform group-open:rotate-180 print:hidden"
        >
          ▾
        </span>
      </summary>
      <div className="space-y-6 border-t border-zinc-100 p-5 dark:border-zinc-800">
        {children}
      </div>
    </details>
  );
}

export function Journey({
  clicks,
  language,
  open = false,
}: {
  clicks: ClickAnalytics | undefined;
  /** E-coach rows show only for languages that have one. */
  language: LanguageFilter;
  /** Every stage opened, as in the PDF. */
  open?: boolean;
}) {
  if (!clicks) return <Loading height={360} />;

  const t: Totals = clicks.totals;
  const ecoach = hasEcoach(language);
  const n = (name: string) => count(t, name);
  const tool = (kind: string, step: 'start' | 'done', source: string) =>
    toolCount(t, kind, step, source);
  const startFinish = (label: string, kind: string, source: string) => ({
    label,
    values: [tool(kind, 'start', source), tool(kind, 'done', source)],
  });
  const breathingAndGrounding = (source: string) => [
    startFinish('Slow breathing', 'breathe', source),
    startFinish('5-4-3-2-1 grounding', 'ground', source),
  ];

  const feelingVisits = METRICS.feelingVisits.value(t);
  const homeVisits = METRICS.homeVisits.value(t);
  const thatsMe = METRICS.thatsMe.value(t);
  const menuFeelings = startingWith(t, 'menu_feeling_');
  const planStarted = METRICS.planStarted.value(t);
  const planDone = METRICS.plansMade.value(t);
  const todayTicks = withDetails(t, 'plan_today_done');
  const gridTicks = startingWith(t, 'plan_grid_tick_');
  const perTool = (base: string, id: string) => n(`${base}_${id}`);
  const toolIds = Object.keys(TOOL_TITLES).filter(
    (id) =>
      perTool('plan_tool_add', id) +
        perTool('plan_today_done', id) +
        perTool('plan_grid_tick', id) >
      0
  );
  const feelingTopics = bySlug(t, 'visit_feeling_');

  const stages = [
    {
      title: 'The moment they realize',
      value: feelingVisits,
      label: 'feeling page visits',
      next: `${METRICS.storyReads.value(t).toLocaleString()} blog stories read`,
    },
    {
      title: 'First contact',
      value: homeVisits,
      label: 'home page visits',
      next: `${thatsMe.toLocaleString()} tapped "That's me" (${share(thatsMe, homeVisits)})`,
    },
    {
      title: 'The first hour',
      value: planDone,
      label: 'plans made',
      next: `of ${planStarted.toLocaleString()} check-ins started${planStarted >= 10 ? ` (${share(planDone, planStarted)})` : ''}`,
    },
    {
      title: 'The weeks after',
      value: todayTicks + gridTicks,
      label: 'plan days ticked',
      next: `${n('plan_check_in_again').toLocaleString()} weekly check-ins`,
    },
    {
      title: 'Getting through it',
      value: n('plan_finish_start'),
      label: 'reached the end of 4 weeks',
      next: `${n('plan_hope_card_made').toLocaleString()} Hope Cards made`,
    },
    {
      title: 'Afterwards',
      value: n('plan_monthly_start'),
      label: 'monthly check-ins',
      next: `${METRICS.neededHelp.value(t).toLocaleString()} needed more help`,
    },
  ];

  const stepsTable = (rows: (TableRow | false)[]) => (
    <NumberTable columns={['Step', 'Count']} rows={rows} />
  );

  return (
    <div className="space-y-6">
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 print:grid-cols-3">
        {stages.map((stage, i) => (
          <li
            key={stage.title}
            className="report-block flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Stage {i + 1}
            </span>
            <span className="mt-0.5 text-sm font-bold">{stage.title}</span>
            <span className="mt-3 text-3xl font-black tabular-nums">
              {stage.value.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
              {stage.label}
            </span>
            <span className="mt-1 text-xs font-medium text-zinc-500">
              {stage.next}
            </span>
          </li>
        ))}
      </ol>

      <div className="space-y-3">
        <Stage
          stage={1}
          title="The moment they realize"
          question="Searching how they feel"
          summary={`${feelingVisits.toLocaleString()} feeling page visits`}
          open={open}
        >
          <div>
            <h4 className="mb-3 text-sm font-bold">Feeling pages, by topic</h4>
            <BarList
              rows={Object.entries(feelingTopics).map(([slug, value]) => ({
                label: FEELING_LABELS[slug] ?? slugLabel(slug),
                value,
              }))}
            />
          </div>
          <NumberTable
            columns={['Used on a feeling page', 'Started', 'Finished']}
            rows={[
              ...breathingAndGrounding('feeling'),
              startFinish('Find the pair game', 'game', 'feeling'),
              startFinish('One small thing', 'one-thing', 'feeling'),
              {
                label: 'Message to someone, copied',
                values: [n('tool_message_copy'), '–'],
              },
              {
                label: 'Worry note, set aside',
                values: [n('tool_worry_note'), '–'],
              },
              ecoach && {
                label: 'Tapped an e-coach link',
                values: [startingWith(t, 'ecoach_feeling_'), '–'],
              },
            ]}
          />
        </Stage>

        <Stage
          stage={2}
          title="First contact"
          question="The home page and the menu"
          summary={`${homeVisits.toLocaleString()} home page visits, ${thatsMe.toLocaleString()} tapped "That's me"`}
          open={open}
        >
          <NumberTable
            columns={['Step', 'Count', 'Share']}
            rows={[
              { label: 'Home page visits', values: [homeVisits, '–'] },
              {
                label: 'Tapped "That\'s me"',
                help: 'Share: of home page visits.',
                values: [thatsMe, share(thatsMe, homeVisits)],
              },
              {
                label: 'Chose a feeling in the menu',
                help: 'Share: of "That\'s me" taps.',
                values: [menuFeelings, share(menuFeelings, thatsMe)],
              },
              ecoach && {
                label: 'E-coach from the menu',
                values: [n('ecoach_menu'), '–'],
              },
              {
                label: '"Welcome back" to their plan',
                values: [
                  n('menu_welcome_back_plan') + n('home_open_plan'),
                  '–',
                ],
              },
              {
                label: 'Returning: "Start my breathing" on the home page',
                values: [startingWith(t, 'home_my_tool_'), '–'],
              },
              {
                label: 'Five steps (get started) page visits',
                values: [n('visit_get_started'), '–'],
              },
            ]}
          />
          <div>
            <h4 className="mb-3 text-sm font-bold">
              Feelings chosen in the menu
            </h4>
            <BarList
              rows={Object.entries(MENU_LABELS).map(([id, label]) => ({
                label,
                value: n(`menu_feeling_${id}`),
              }))}
            />
          </div>
          <NumberTable
            columns={[
              '"Calm down now" in the menu',
              'Opened',
              'Started',
              'Finished',
            ]}
            rows={(
              [
                ['Slow breathing', 'breathe'],
                ['5-4-3-2-1 grounding', 'ground'],
                ['Find the pair game', 'game'],
              ] as const
            ).map(([label, kind]) => ({
              label,
              values: [
                n(`menu_calm_${kind}`),
                tool(kind, 'start', 'menu'),
                tool(kind, 'done', 'menu'),
              ],
            }))}
          />
          <NumberTable
            columns={[
              'Their own tool, from the home page',
              'Started',
              'Finished',
            ]}
            rows={breathingAndGrounding('home')}
          />
        </Stage>

        <Stage
          stage={3}
          title="The first hour"
          question="The check-in and the plan it makes"
          summary={`${planDone.toLocaleString()} plans made of ${planStarted.toLocaleString()} started`}
          open={open}
        >
          <NumberTable
            columns={['Step', 'Count', 'Of started']}
            rows={[
              {
                label: 'Visited the plan page',
                values: [n('visit_action_plan'), '–'],
              },
              { label: 'Started the check-in', values: [planStarted, '–'] },
              {
                label: 'Finished it and got a plan',
                values: [planDone, share(planDone, planStarted)],
              },
              {
                label: 'Added a tool to their 4 weeks',
                values: [withDetails(t, 'plan_tool_add'), '–'],
              },
              {
                label: 'Added a phone reminder',
                values: [
                  n('plan_reminder_google') + n('plan_reminder_ics'),
                  '–',
                ],
              },
              {
                label: 'Asked for check-in emails',
                values: [n('plan_check_in'), '–'],
              },
              { label: 'Emailed their plan', values: [n('plan_email'), '–'] },
              {
                label: 'Downloaded a backup',
                values: [n('plan_backup_download'), '–'],
              },
              {
                label: 'Added HopeBegins to their home screen',
                values: [n('plan_install_prompt'), '–'],
              },
              ecoach && {
                label: 'E-coach from the plan',
                values: [n('ecoach_plan'), '–'],
              },
            ]}
          />
          <NumberTable
            columns={['Tried on the plan', 'Started', 'Finished']}
            rows={breathingAndGrounding('plan')}
          />
        </Stage>

        <Stage
          stage={4}
          title="The weeks after"
          question="Coming back to practise and check in"
          summary={`${(todayTicks + gridTicks).toLocaleString()} plan days ticked, ${n('checkin_done').toLocaleString()} daily check-ins`}
          open={open}
        >
          {stepsTable([
            {
              label: 'Ticked "Done today" or finished the tool',
              values: [todayTicks],
            },
            { label: 'Ticked a day on the 4-week grid', values: [gridTicks] },
            {
              label: 'Took the weekly check-in again',
              values: [n('plan_check_in_again')],
            },
            {
              label: 'Restored a plan from a backup',
              values: [n('plan_backup_restore')],
            },
          ])}
          {toolIds.length > 0 && (
            <NumberTable
              columns={['Plan tool', 'Added', 'Days ticked']}
              rows={toolIds.map((id) => ({
                label: TOOL_TITLES[id],
                values: [
                  perTool('plan_tool_add', id),
                  perTool('plan_today_done', id) +
                    perTool('plan_grid_tick', id),
                ],
              }))}
            />
          )}
          <NumberTable
            columns={['Daily check-in', 'Count']}
            rows={[
              {
                label: 'Visits to the check-in page',
                values: [n('visit_check_in')],
              },
              {
                label: 'Opened it from the home page or menu',
                values: [n('home_checkin') + n('menu_checkin')],
              },
              { label: 'Check-ins done', values: [n('checkin_done')] },
              {
                label: 'Came back on another day and checked in',
                values: [n('checkin_return')],
              },
              ...[3, 7, 14, 21, 30].map((days) => ({
                label: `Reached ${days} days of check-ins`,
                values: [n(`checkin_milestone_${days}`)],
              })),
              {
                label: 'Reached 60 days or more',
                values: [
                  sumWhere(
                    t,
                    (name) =>
                      name.startsWith('checkin_milestone_') &&
                      Number(name.slice('checkin_milestone_'.length)) > 30
                  ),
                ],
              },
              {
                label: 'Opened a tool from the check-in',
                values: [
                  sumWhere(
                    t,
                    (name) =>
                      name.startsWith('tool_') &&
                      name.endsWith('_start_checkin')
                  ),
                ],
              },
              ecoach && {
                label: 'E-coach from the check-in',
                values: [n('ecoach_checkin')],
              },
            ]}
          />
        </Stage>

        <Stage
          stage={5}
          title="Getting through it"
          question="Finishing the 4 weeks"
          summary={`${n('plan_finish_start').toLocaleString()} reached the end of 4 weeks, ${n('plan_hope_card_made').toLocaleString()} Hope Cards made`}
          open={open}
        >
          {stepsTable([
            {
              label: 'Reached the end of the 4 weeks',
              values: [n('plan_finish_start')],
            },
            { label: 'Made a Hope Card', values: [n('plan_hope_card_made')] },
            {
              label: 'Saved it as an image',
              values: [n('plan_hope_card_image')],
            },
            {
              label: 'Started another 4 weeks',
              values: [n('plan_restart_4_weeks')],
            },
            ecoach && {
              label: 'E-coach from the Hope Card',
              values: [n('ecoach_hope_card')],
            },
          ])}
        </Stage>

        <Stage
          stage={6}
          title="Afterwards"
          question="The monthly check-in and the open door back"
          summary={`${n('plan_monthly_start').toLocaleString()} monthly check-ins`}
          open={open}
        >
          {stepsTable([
            {
              label: 'Took a monthly check-in',
              values: [n('plan_monthly_start')],
            },
            {
              label: 'Result: holding steady',
              values: [n('plan_monthly_result_steady')],
            },
            {
              label: 'Result: some signs',
              values: [n('plan_monthly_result_watch')],
            },
            {
              label: 'Result: coming back',
              values: [n('plan_monthly_result_returning')],
            },
            {
              label: 'Result: safety, shown the crisis line',
              values: [n('plan_monthly_result_safety')],
            },
            {
              label: 'Added a monthly reminder',
              values: [
                n('plan_monthly_reminder_google') +
                  n('plan_monthly_reminder_ics'),
              ],
            },
            ecoach && {
              label: 'E-coach after the 4 weeks',
              values: [
                n('ecoach_afterwards') + startingWith(t, 'ecoach_monthly_'),
              ],
            },
            { label: 'Shared HopeBegins', values: [n('plan_after_share')] },
            {
              label: 'Opened "Become a Hope Carrier"',
              values: [n('plan_after_carrier')],
            },
          ])}
        </Stage>
      </div>
    </div>
  );
}
