'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useDashboard } from './hooks/useDashboard';
import { Controls } from './components/Controls';
import { AtAGlance } from './components/AtAGlance';
import { ByLanguage } from './components/ByLanguage';
import { Journey } from './components/Journey';
import { Tools } from './components/Tools';
import { Pages } from './components/Pages';
import { PrayerAndDailyHope } from './components/PrayerAndDailyHope';
import { AllTime } from './components/AllTime';
import { RecentPrayers } from './components/RecentPrayers';
import { AllEvents } from './components/AllEvents';
import { Section } from './components/parts';
import { LANGUAGE_NAMES } from '@/lib/clickLanguages';

const SECTIONS = [
  ['glance', 'At a glance'],
  ['languages', 'By language'],
  ['journey', 'Journey'],
  ['tools', 'Tools'],
  ['pages', 'Pages'],
  ['prayer', 'Prayer and Daily Hope'],
  ['all-time', 'All time'],
] as const;

export default function AdminDashboard() {
  const dashboard = useDashboard();
  const {
    stats,
    analytics,
    clicks,
    rawClicks,
    byLanguage,
    language,
    setLanguage,
    dateRange,
    isError,
    refetch,
  } = dashboard;
  const languageName =
    language === 'all' ? 'every language' : LANGUAGE_NAMES[language];

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-4 pb-16 sm:p-8 lg:p-12">
      <header>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">
          The Hope Desk
        </h1>
        <p className="mt-2 max-w-3xl text-sm font-medium text-zinc-500">
          The site&apos;s counts are anonymous: no cookies or personal details.
          Pick the dates and a language below; every section follows them,
          except By language, which shows every language side by side, and All
          time.
        </p>
      </header>

      <Controls {...dashboard} />

      <nav aria-label="Dashboard sections" className="-mt-4 overflow-x-auto">
        <ul className="flex gap-2 text-sm font-bold whitespace-nowrap">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-zinc-600 hover:bg-white hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isError && (
        <div
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          Some numbers didn&apos;t load. Check your connection and try again.
          <button
            type="button"
            onClick={refetch}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 font-bold text-red-800 dark:bg-zinc-900 dark:text-red-300"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      )}

      <Section
        id="glance"
        title="At a glance"
        intro={`The numbers to read first, for ${languageName}.`}
      >
        <AtAGlance
          clicks={clicks}
          analytics={analytics}
          startDate={dateRange.startDate}
        />
      </Section>

      <Section
        id="languages"
        title="By language"
        intro="Every key number with each language side by side, by the language of the page it happened on. Tap a language's name to see the whole dashboard for it."
      >
        <ByLanguage
          clicks={rawClicks}
          byLanguage={byLanguage}
          analytics={analytics}
          language={language}
          onPickLanguage={setLanguage}
        />
      </Section>

      <Section
        id="journey"
        title="The journey, stage by stage"
        intro={`From searching how they feel to the monthly check-in, for ${languageName}. Open a stage for every step in it.`}
      >
        <Journey clicks={clicks} language={language} />
      </Section>

      <Section
        id="tools"
        title="Tools and games"
        intro={`Every calming tool and game, for ${languageName}.`}
      >
        <Tools clicks={clicks} language={language} />
      </Section>

      <Section
        id="pages"
        title="Pages and reaching out"
        intro={`Visits to each page, blog reading, and taps to call or talk to someone, for ${languageName}.`}
      >
        <Pages clicks={clicks} language={language} />
      </Section>

      <Section
        id="prayer"
        title="Prayer, Daily Hope and HopeCasts"
        intro={
          language === 'all'
            ? 'Counted by the server for these dates.'
            : `Prayer requests and Daily Hope for ${languageName}; HopeCasts and the five steps for every language.`
        }
      >
        <PrayerAndDailyHope
          analytics={analytics}
          oneLanguage={language !== 'all'}
        />
      </Section>

      <Section
        id="all-time"
        title="All time"
        intro="Since HopeBegins began, for every language, whatever the dates."
      >
        <AllTime stats={stats} analytics={analytics} rawClicks={rawClicks} />
        <RecentPrayers prayers={stats?.recent_prayers} />
      </Section>

      <AllEvents clicks={clicks} />
    </div>
  );
}
