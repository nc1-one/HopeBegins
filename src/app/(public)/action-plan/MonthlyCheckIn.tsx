'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import {
  checkInScores,
  getQuestions,
  type Answers,
  type PlanItem,
  type PlanLang,
  type QuestionKey,
} from '@/lib/actionPlan';
import {
  restartFourWeeks,
  updatePlan,
  type SavedPlan,
} from '@/lib/actionPlanStore';
import { analyticsService } from '@/services/analyticsService';
import { UseMyTool } from './UseMyTool';

/**
 * After the 4 weeks: a 1-minute check-in once a month. Mood, worry, their
 * own warning signs and safety, then one clear next step. Answers and
 * scores stay on the device.
 */

type Result = 'steady' | 'watch' | 'returning' | 'safety';
type Warning = 'no' | 'little' | 'often';

const copy = {
  en: {
    title: '1-minute check-in',
    questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
    previous: 'Previous',
    warningPrompt: 'Have you noticed your warning signs in the last 2 weeks?',
    yourSigns: 'Yours:',
    warningOptions: {
      no: 'Not at all',
      little: 'A little',
      often: 'Yes, often',
    },
    scores: (mood: number, worry: number) =>
      `Low mood ${mood} of 6 · Worry ${worry} of 6`,
    lastTime: (mood: number, worry: number) =>
      `Last time: low mood ${mood}, worry ${worry}.`,
    results: {
      steady: {
        title: "You're holding steady.",
        text: "Keep your tool for the days you need it. We'll check in again next month.",
      },
      watch: {
        title: 'Some signs are showing.',
        text: 'This is the time to use your tool again, before it gets heavier. Try it every day this week.',
      },
      returning: {
        title: "It looks like it's coming back.",
        text: "You've got through this before, and you know what helped. Start another 4 weeks with your tool, tell one of your people, and talk to an e-coach this week. If your scores stay high, see a counselor.",
      },
      safety: {
        title: 'Please talk to someone now.',
        text: 'You said you have had thoughts of ending your life or hurting yourself. Call the NCMH Crisis Hotline now: 1553 or 0917 899 8727. If you are in immediate danger, call 911.',
      },
    },
    call: 'Call 1553',
    ecoach: 'Talk to an e-coach',
    openCard: 'Open my Hope Card',
    yourTool: 'Your tool',
    restart: 'Start another 4 weeks',
    fullCheckIn: 'Take the full check-in and make a safety plan',
    toPlan: 'Back to my plan',
  },
  tl: {
    title: '1-minute check-in',
    questionOf: (n: number, total: number) => `Tanong ${n} sa ${total}`,
    previous: 'Bumalik',
    warningPrompt:
      'Napansin mo ba ang mga warning sign mo sa nakaraang 2 linggo?',
    yourSigns: 'Ang sa iyo:',
    warningOptions: { no: 'Hindi', little: 'Kaunti', often: 'Oo, madalas' },
    scores: (mood: number, worry: number) =>
      `Mababang mood ${mood} sa 6 · Pag-aalala ${worry} sa 6`,
    lastTime: (mood: number, worry: number) =>
      `Noong huli: mababang mood ${mood}, pag-aalala ${worry}.`,
    results: {
      steady: {
        title: 'Steady ka.',
        text: 'Ituloy ang tool mo sa mga araw na kailangan mo. Magche-check in ulit tayo sa susunod na buwan.',
      },
      watch: {
        title: 'Mukhang may mga senyales na.',
        text: 'Ngayon ang tamang oras para gamitin ulit ang tool mo, bago pa ito bumigat. Subukan ito araw-araw ngayong linggo.',
      },
      returning: {
        title: 'Mukhang bumabalik ito.',
        text: 'Nalampasan mo na ito dati, at alam mo kung ano ang nakatulong. Magsimula ulit ng 4 na linggo gamit ang tool mo, sabihan ang isa sa mga tao mo, at kumausap ng e-coach ngayong linggo. Kung mataas pa rin ang scores mo, magpatingin sa counselor.',
      },
      safety: {
        title: 'Kumausap ng isang tao ngayon.',
        text: 'Sinabi mong naiisip mong tapusin ang buhay mo o saktan ang sarili mo. Tumawag ngayon sa NCMH Crisis Hotline: 1553 o 0917 899 8727. Kung nasa panganib ka ngayon, tumawag sa 911.',
      },
    },
    call: 'Tumawag sa 1553',
    ecoach: 'Kausapin ang e-coach',
    openCard: 'Buksan ang Hope Card ko',
    yourTool: 'Ang tool mo',
    restart: 'Magsimula ng panibagong 4 na linggo',
    fullCheckIn: 'Sagutan ang buong check-in at gumawa ng safety plan',
    toPlan: 'Bumalik sa plano ko',
  },
};

const MOOD_KEYS: QuestionKey[] = ['down', 'interest', 'nervous', 'worry'];

const optionClass =
  'w-full min-h-11 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left font-poppins font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';
const primaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#6E5F47] px-5 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

function resultFor(
  mood: number,
  anxiety: number,
  safety: number,
  warning: Warning
): Result {
  if (safety > 0) return 'safety';
  if (mood >= 3 || anxiety >= 3 || warning === 'often') return 'returning';
  if (mood >= 2 || anxiety >= 2 || warning === 'little') return 'watch';
  return 'steady';
}

export function MonthlyCheckIn({
  saved,
  tool,
  lang,
  onClose,
  onOpenCard,
  onFullCheckIn,
}: {
  saved: SavedPlan;
  /** The tool on their Hope Card. */
  tool?: PlanItem;
  lang: PlanLang;
  onClose: () => void;
  onOpenCard: () => void;
  onFullCheckIn: () => void;
}) {
  const t = copy[lang];
  const all = getQuestions(lang);
  const questions = [
    ...all.filter((q) => MOOD_KEYS.includes(q.key)),
    { key: 'warning' as const },
    ...all.filter((q) => q.key === 'safety'),
  ];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [warning, setWarning] = useState<Warning | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [scores, setScores] = useState({ mood: 0, anxiety: 0 });
  const headingRef = useRef<HTMLHeadingElement>(null);
  // The check-in before this one, kept from when it started; the new one is
  // added to the history when it finishes.
  const [previous] = useState(() => saved.history?.[saved.history.length - 1]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [current, result]);

  const finish = (nextAnswers: Answers, nextWarning: Warning) => {
    const { mood, anxiety } = checkInScores(nextAnswers);
    const outcome = resultFor(
      mood,
      anxiety,
      Number(nextAnswers.safety ?? 0),
      nextWarning
    );
    analyticsService.recordClick(`plan_monthly_result_${outcome}`);
    updatePlan((plan) => ({
      ...plan,
      history: [
        ...(plan.history ?? []),
        { date: new Date().toISOString(), mood, anxiety },
      ],
    }));
    setScores({ mood, anxiety });
    setResult(outcome);
  };

  const answer = (value: string) => {
    const question = questions[current];
    let nextAnswers = answers;
    let nextWarning = warning;
    if (question.key === 'warning') {
      nextWarning = value as Warning;
      setWarning(nextWarning);
    } else {
      nextAnswers = { ...answers, [question.key]: value };
      setAnswers(nextAnswers);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finish(nextAnswers, nextWarning ?? 'no');
    }
  };

  if (result) {
    const r = t.results[result];
    return (
      <div className="space-y-6 hb-step-in">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
        >
          {r.title}
        </h1>
        <div
          className={`rounded-2xl p-5 text-[#6E5F47] ${
            result === 'safety'
              ? 'border border-[#AEC488] bg-[#EFF3E7]'
              : 'border border-zinc-100 bg-white'
          }`}
        >
          <p className="leading-relaxed">{r.text}</p>
          {result !== 'safety' && (
            <p className="mt-3 text-sm">
              {t.scores(scores.mood, scores.anxiety)}
              {previous && (
                <> · {t.lastTime(previous.mood, previous.anxiety)}</>
              )}
            </p>
          )}
        </div>

        {(result === 'watch' || result === 'returning') && tool && (
          <div className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
            <p className="text-sm text-[#6E5F47]">{t.yourTool}</p>
            <p className="mt-1 font-poppins font-bold text-[#6E5F47]">
              {tool.title}
            </p>
            <div className="mt-3">
              <UseMyTool tool={tool} saved={saved} lang={lang} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {result === 'safety' && (
            <a href="tel:1553" className={primaryClass}>
              <Phone className="h-4 w-4" />
              {t.call}
            </a>
          )}
          {result !== 'steady' && (
            <EcoachLink
              linkName={`ecoach_monthly_${result}`}
              className={result === 'safety' ? secondaryClass : primaryClass}
            >
              <MessageCircle className="h-4 w-4" />
              {t.ecoach}
            </EcoachLink>
          )}
          {(result === 'watch' || result === 'returning') && tool && (
            <button
              type="button"
              onClick={() => {
                analyticsService.recordClick('plan_restart_4_weeks');
                restartFourWeeks(tool.id, tool.defaultTime ?? 'morning');
                onClose();
              }}
              className={secondaryClass}
            >
              {t.restart}
            </button>
          )}
          {result === 'safety' && (
            <button
              type="button"
              onClick={onFullCheckIn}
              className={secondaryClass}
            >
              {t.fullCheckIn}
            </button>
          )}
          {saved.hopeCard && result !== 'safety' && (
            <button
              type="button"
              onClick={onOpenCard}
              className={secondaryClass}
            >
              {t.openCard}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.toPlan}
        </button>
      </div>
    );
  }

  const question = questions[current];
  const isWarning = question.key === 'warning';
  const options = isWarning
    ? (['no', 'little', 'often'] as const).map((value) => ({
        value,
        label: t.warningOptions[value],
      }))
    : question.options;

  return (
    <div
      key={current}
      className="rounded-2xl border border-zinc-100 bg-white p-6 md:p-8 hb-step-in"
    >
      <div className="flex items-center justify-between gap-4 text-sm text-[#6E5F47]">
        <span className="font-poppins font-bold">{t.title}</span>
        <span>{t.questionOf(current + 1, questions.length)}</span>
      </div>
      {!isWarning && question.stem && (
        <p className="mt-6 text-sm text-[#6E5F47]">{question.stem}</p>
      )}
      <h1
        ref={headingRef}
        tabIndex={-1}
        className={`${!isWarning && question.stem ? 'mt-2' : 'mt-6'} font-poppins font-bold text-xl md:text-2xl text-[#6E5F47] focus:outline-none`}
      >
        {isWarning ? t.warningPrompt : question.prompt}
      </h1>
      {isWarning && saved.hopeCard?.warningSigns && (
        <p className="mt-2 text-sm text-[#6E5F47]">
          {t.yourSigns} {saved.hopeCard.warningSigns}
        </p>
      )}
      {!isWarning && question.note && (
        <p className="mt-2 text-sm text-[#6E5F47]">{question.note}</p>
      )}
      <div className="mt-6 grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => answer(option.value)}
            className={optionClass}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => (current > 0 ? setCurrent(current - 1) : onClose())}
        className="mt-6 inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7]"
      >
        <ArrowLeft className="h-4 w-4" />
        {current > 0 ? t.previous : t.toPlan}
      </button>
    </div>
  );
}
