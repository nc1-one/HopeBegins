import type { LanguageFilter } from '@/lib/clickLanguages';
import type { ClickAnalytics } from '@/types/admin';
import {
  GAMES,
  TOOLS,
  TOOL_SOURCES,
  hasEcoach,
  share,
  startingWith,
  toolCount,
} from '../metrics';
import { Loading, NumberTable, Panel } from './parts';

/** Every calming tool and game: how often, how far, and where from. */
export function Tools({
  clicks,
  language,
}: {
  clicks: ClickAnalytics | undefined;
  language: LanguageFilter;
}) {
  if (!clicks) return <Loading height={320} />;
  const t = clicks.totals;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel
        title="Calming tools"
        note='"Said how they felt" is the question at the end of a tool.'
        className="lg:col-span-2"
      >
        <NumberTable
          minWidth={640}
          columns={[
            'Tool',
            'Started',
            'Finished',
            'Finish rate',
            'Stopped early',
            'Said how they felt',
          ]}
          rows={TOOLS.map(({ kind, label }) => {
            const started = toolCount(t, kind, 'start');
            const done = toolCount(t, kind, 'done');
            const canStop = kind === 'breathe' || kind === 'ground';
            return {
              label,
              values: [
                started,
                done,
                share(done, started),
                canStop ? toolCount(t, kind, 'stop') : '–',
                toolCount(t, kind, 'checked'),
              ],
            };
          })}
        />
      </Panel>

      <Panel
        title="Where tools were opened"
        note="Calming tools started and finished, by the place they were opened."
      >
        <NumberTable
          columns={['Opened from', 'Started', 'Finished']}
          rows={TOOL_SOURCES.map(({ source, label }) => ({
            label,
            values: [
              TOOLS.reduce(
                (sum, tool) => sum + toolCount(t, tool.kind, 'start', source),
                0
              ),
              TOOLS.reduce(
                (sum, tool) => sum + toolCount(t, tool.kind, 'done', source),
                0
              ),
            ],
          }))}
        />
      </Panel>

      <div className="space-y-6">
        <Panel title="Games">
          <NumberTable
            columns={['Game', 'Played', 'Finished']}
            rows={[
              ...GAMES.map(({ kind, label }) => ({
                label,
                values: [
                  toolCount(t, kind, 'start'),
                  toolCount(t, kind, 'done'),
                ],
              })),
              {
                label: 'The trip: reached the sea',
                values: [startingWith(t, 'tool_mission_trip_'), '–'],
              },
            ]}
          />
        </Panel>
        <Panel title="Smaller steps inside the tools">
          <NumberTable
            columns={['Step', 'Count']}
            rows={[
              {
                label: 'Breathing: chose 1 minute',
                values: [toolCount(t, 'breathe', 'short')],
              },
              {
                label: 'One small thing: saved for later',
                values: [toolCount(t, 'one-thing', 'later')],
              },
              {
                label: 'Worry time: wrote a worry down',
                values: [toolCount(t, 'worry-time', 'add')],
              },
              {
                label: 'Tapped "Make a free plan" after a tool',
                values: [startingWith(t, 'tool_make_plan_')],
              },
              hasEcoach(language) && {
                label: 'E-coach after a tool felt worse',
                values: [startingWith(t, 'ecoach_tool_worse_')],
              },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
