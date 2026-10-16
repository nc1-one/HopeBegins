'use client';

import { useCallback, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { BreathingExercise } from '@/components/tools/BreathingExercise';
import { GroundingExercise } from '@/components/tools/GroundingExercise';
import { PLAN_DAYS, type PlanItem, type PlanLang } from '@/lib/actionPlan';
import {
  dayOfPlan,
  markTodayDone,
  type SavedPlan,
} from '@/lib/actionPlanStore';
import { analyticsService } from '@/services/analyticsService';

/**
 * Their tool, ready to use wherever it is named: the Today card, the Hope
 * Card, after the 4 weeks and the monthly check-in. Guided tools open right
 * here; other tools show their steps. Finishing a guided tool ticks today.
 */

const copy = {
  en: {
    useNow: 'Use my tool now',
    showHow: 'Show me how',
    hideHow: 'Hide the steps',
    ticked: 'Ticked for today in your 4 weeks.',
  },
  tl: {
    useNow: 'Gamitin ang tool ko ngayon',
    showHow: 'Ipakita kung paano',
    hideHow: 'Itago ang mga hakbang',
    ticked: 'Na-tick na ito para sa araw na ito sa 4 na linggo mo.',
  },
};

export const toolButtonClass =
  'inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#AEC488] bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

/** True when finishing this tool today would tick a day in the 4 weeks. */
export function canTickToday(saved: SavedPlan | null, toolId: string) {
  if (!saved?.commitments[toolId]) return false;
  const day = dayOfPlan(saved.startedAt);
  return day >= 0 && day < PLAN_DAYS && saved.checks[toolId]?.[day] !== true;
}

export function UseMyTool({
  tool,
  saved,
  lang,
  label,
  buttonClassName = toolButtonClass,
}: {
  tool: PlanItem;
  saved: SavedPlan | null;
  lang: PlanLang;
  /** The button text. Defaults to "Use my tool now". */
  label?: string;
  buttonClassName?: string;
}) {
  const t = copy[lang];
  const [isOpen, setIsOpen] = useState(false);
  // Decided when the tool opens, so the note matches what finishing does.
  const [willTick, setWillTick] = useState(false);

  const handleFinish = useCallback(() => {
    if (markTodayDone(tool.id)) {
      analyticsService.recordClick(`plan_today_done_${tool.id}`);
    }
  }, [tool.id]);

  const open = () => {
    setWillTick(canTickToday(saved, tool.id));
    setIsOpen(true);
  };

  if (!tool.exercise) {
    return (
      <div>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className={buttonClassName}
        >
          <ChevronDown
            className={`mr-2 h-4 w-4 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
          />
          {isOpen ? t.hideHow : (label ?? t.showHow)}
        </button>
        {isOpen && (
          <div className="mt-3 rounded-2xl bg-[#EFF3E7] p-5 text-[#6E5F47]">
            <p className="font-poppins font-bold">{tool.title}</p>
            <p className="mt-1 leading-relaxed">{tool.detail}</p>
            {tool.steps && (
              <ol className="mt-2 list-decimal space-y-1 pl-5 marker:font-bold marker:text-[#91AFAA]">
                {tool.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {!isOpen && (
        <button type="button" onClick={open} className={buttonClassName}>
          <Play className="mr-2 h-4 w-4" />
          {label ?? t.useNow}
        </button>
      )}
      {isOpen && tool.exercise === 'breathe' && (
        <BreathingExercise
          lang={lang}
          source="plan"
          onClose={() => setIsOpen(false)}
          onFinish={handleFinish}
          doneNote={willTick ? t.ticked : undefined}
        />
      )}
      {isOpen && tool.exercise === 'ground' && (
        <GroundingExercise
          lang={lang}
          source="plan"
          onClose={() => setIsOpen(false)}
          onFinish={handleFinish}
          doneNote={willTick ? t.ticked : undefined}
        />
      )}
    </div>
  );
}
