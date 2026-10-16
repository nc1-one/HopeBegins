'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, Plus } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { buildPlan } from '@/lib/actionPlan';
import { updatePlan, useSavedPlan } from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { recordToolCheck, type Felt } from '@/lib/toolChecks';
import { analyticsService, type ToolSource } from '@/services/analyticsService';

/**
 * The end of a guided tool: did it help, when to use it next, and a way to
 * keep it. The answer stays on this device; only the fact that someone
 * answered is counted, never what they said.
 */

const copy = {
  en: {
    question: 'Compared to before you started, how do you feel?',
    felt: { calmer: 'Calmer', same: 'About the same', worse: 'Worse' },
    when: {
      breathe: 'your chest feels tight or your thoughts race',
      ground: 'worry or panic starts to build',
    },
    calmer: (when: string) => `Good. Come back to it next time ${when}.`,
    same: 'That happens. Tools often work better after a few days of practice. Try it again later today.',
    worse:
      'Thank you for telling us. Stop for now and do something gentle. If it feels like too much, talk to someone.',
    keep: 'Add to my 4 weeks',
    kept: 'Added to your 4 weeks.',
    makePlan: 'Make a free plan with this tool',
    ecoach: 'Talk to an e-coach',
    call: 'Call 1553',
    close: 'Close',
  },
  tl: {
    question: 'Kumpara bago ka nagsimula, kumusta ang pakiramdam mo?',
    felt: { calmer: 'Mas kalmado', same: 'Ganoon pa rin', worse: 'Mas malala' },
    when: {
      breathe: 'sumikip ang dibdib mo o bumilis ang isip mo',
      ground: 'nagsisimula ang kaba o panic',
    },
    calmer: (when: string) => `Mabuti. Balikan ito sa susunod na ${when}.`,
    same: 'Nangyayari iyan. Mas gumagana ang mga tool pagkatapos ng ilang araw na pagsasanay. Subukan ulit mamaya.',
    worse:
      'Salamat sa pagsabi. Itigil muna at gumawa ng isang bagay na magaan. Kung sobra na, kumausap ng isang tao.',
    keep: 'Idagdag sa 4 na linggo ko',
    kept: 'Naidagdag na sa 4 na linggo mo.',
    makePlan: 'Gumawa ng libreng plano gamit ang tool na ito',
    ecoach: 'Kausapin ang e-coach',
    call: 'Tumawag sa 1553',
    close: 'Isara',
  },
};

const primaryClass =
  'rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

export function ToolFinish({
  kind,
  lang,
  source,
  title,
  text,
  doneNote,
  nextTime,
  ask = true,
  onClose,
}: {
  /** The tool's id, which is also its id in the plan. */
  kind: string;
  lang: FeelingLang;
  source: ToolSource;
  title: string;
  text: string;
  doneNote?: string;
  /** "Come back to it next time …", for tools other than breathing and grounding. */
  nextTime?: string;
  /** Ask how they feel. Off for tools that are about writing, not relief. */
  ask?: boolean;
  onClose: () => void;
}) {
  const t = copy[lang];
  const saved = useSavedPlan();
  const [felt, setFelt] = useState<Felt | null>(null);
  const [isKept, setIsKept] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const isInWeeks = Boolean(saved?.commitments[kind]);

  // Screen readers land on the finish.
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    titleRef.current?.scrollIntoView({ block: 'nearest' });
  }, []);

  const answer = (value: Felt) => {
    analyticsService.recordClick(`tool_${kind}_checked_${source}`);
    recordToolCheck(kind, value);
    setFelt(value);
  };

  const keep = () => {
    if (!saved) return;
    const tool = buildPlan(saved.answers, lang).allTools.find(
      (item) => item.id === kind
    );
    analyticsService.recordClick(`plan_tool_add_${kind}`);
    updatePlan((plan) => ({
      ...plan,
      commitments: {
        ...plan.commitments,
        [kind]: plan.commitments[kind] ?? tool?.defaultTime ?? 'morning',
      },
    }));
    setIsKept(true);
  };

  return (
    <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center hb-step-in">
      <p
        ref={titleRef}
        tabIndex={-1}
        className="font-poppins font-bold text-lg text-[#6E5F47] focus:outline-none"
      >
        {title}
      </p>
      <p className="mt-1 text-[#6E5F47]">{text}</p>
      {doneNote && (
        <p className="mt-2 text-sm font-bold text-[#6E5F47]">{doneNote}</p>
      )}

      {!ask ? null : felt === null ? (
        <fieldset className="mt-5">
          <legend className="mx-auto font-poppins font-bold text-[#6E5F47]">
            {t.question}
          </legend>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {(['calmer', 'same', 'worse'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => answer(value)}
                className={secondaryClass}
              >
                {t.felt[value]}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <div className="mt-5 space-y-4" aria-live="polite">
          <p className="text-[#6E5F47]">
            {felt === 'calmer'
              ? t.calmer(
                  nextTime ??
                    (kind === 'ground' ? t.when.ground : t.when.breathe)
                )
              : felt === 'same'
                ? t.same
                : t.worse}
          </p>
          {felt === 'calmer' && saved && !isInWeeks && !isKept && (
            <button type="button" onClick={keep} className={secondaryClass}>
              <Plus className="h-4 w-4" />
              {t.keep}
            </button>
          )}
          {isKept && (
            <p className="text-sm font-bold text-[#6E5F47]">{t.kept}</p>
          )}
          {felt === 'calmer' && !saved && (
            <TrackedLink
              href={lang === 'tl' ? '/action-plan?lang=tl' : '/action-plan'}
              linkName={`tool_make_plan_${kind}`}
              className={secondaryClass}
            >
              {t.makePlan}
            </TrackedLink>
          )}
          {felt === 'worse' && (
            <div className="flex flex-wrap justify-center gap-2">
              <EcoachLink
                linkName={`ecoach_tool_worse_${kind}`}
                className={secondaryClass}
              >
                <MessageCircle className="h-4 w-4" />
                {t.ecoach}
              </EcoachLink>
              <a href="tel:1553" className={secondaryClass}>
                <Phone className="h-4 w-4" />
                {t.call}
              </a>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        className={`mt-5 ${primaryClass}`}
      >
        {t.close}
      </button>
    </div>
  );
}
