'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  MessageCircle,
  Play,
  Plus,
  Printer,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Answers,
  PlanItem,
  TIME_LABELS,
  TimeOfDay,
  buildPlan,
  questions,
} from '@/lib/actionPlan';
import {
  SavedPlan,
  clearPlan,
  dayOfWeek,
  savePlan,
  updatePlan,
  useSavedPlan,
} from '@/lib/actionPlanStore';
import { actionPlanService } from '@/services/actionPlanService';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { BreathingExercise } from './components/BreathingExercise';
import { GroundingExercise } from './components/GroundingExercise';

type EmailStatus = 'idle' | 'sending' | 'sent' | 'error';

const planIncludes = [
  'Calming tools you can try right on the page',
  "A step for this week, based on what's weighing on you",
  'A 7-day tracker to keep you going',
  'An e-coach on Messenger if you want someone to talk it through with',
];

const linkClass =
  'mt-3 inline-flex items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none print:hidden';

const chipClass =
  'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

const commitmentSentence = (item: PlanItem, time: TimeOfDay) =>
  `${TIME_LABELS[time]}, I will ${item.action}.`;

function ECoachCard() {
  return (
    <Card className="py-0 bg-[#6E5F47] border-none text-white">
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 className="font-poppins font-bold text-xl">
            Want someone to journey with you?
          </h2>
          <p className="mt-2 text-white/85 leading-relaxed">
            E-coaches from Himala Everyday can help you choose where to start.
          </p>
        </div>
        <EcoachLink
          linkName="ecoach_plan"
          className="inline-flex w-full shrink-0 items-center justify-center rounded-2xl bg-white px-5 py-4 text-center font-poppins font-bold leading-snug text-[#6E5F47] md:w-auto md:px-6 shadow-lg transition-all duration-300 hover:bg-zinc-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 print:hidden"
        >
          <MessageCircle className="mr-2 w-5 h-5 shrink-0" />
          <span>Talk to an e-coach on Messenger</span>
        </EcoachLink>
      </CardContent>
    </Card>
  );
}

function ItemBody({ item }: { item: PlanItem }) {
  const href = item.href;
  const opensNewTab = href?.startsWith('http');

  return (
    <>
      <p className="mt-1 text-[#6E5F47] leading-relaxed">{item.detail}</p>
      {item.steps && (
        <ol className="mt-3 space-y-1.5 list-decimal pl-5 marker:font-bold marker:text-[#91AFAA]">
          {item.steps.map((step) => (
            <li key={step} className="text-[#6E5F47] leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      )}
      {href &&
        (href.startsWith('/') ? (
          <Link href={href} className={linkClass}>
            {item.linkLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        ) : (
          <a
            href={href}
            target={opensNewTab ? '_blank' : undefined}
            rel={opensNewTab ? 'noopener noreferrer' : undefined}
            className={linkClass}
          >
            {item.linkLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        ))}
    </>
  );
}

function PlanItemCard({
  item,
  emphasis,
}: {
  item: PlanItem;
  emphasis?: boolean;
}) {
  return (
    <Card
      className={
        emphasis
          ? 'py-0 bg-[#EFF3E7] border-[#AEC488]'
          : 'py-0 bg-white border-zinc-100'
      }
    >
      <CardContent className="p-6">
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />
      </CardContent>
    </Card>
  );
}

function ToolCard({
  item,
  isFirst,
  time,
}: {
  item: PlanItem;
  isFirst: boolean;
  time?: TimeOfDay;
}) {
  const [isTrying, setIsTrying] = useState(false);
  const isInWeek = time !== undefined;

  const toggleWeek = () =>
    updatePlan((plan) => {
      const commitments = { ...plan.commitments };
      if (commitments[item.id]) {
        delete commitments[item.id];
      } else {
        commitments[item.id] = item.defaultTime ?? 'morning';
      }
      return { ...plan, commitments };
    });

  const setTime = (next: TimeOfDay) =>
    updatePlan((plan) => ({
      ...plan,
      commitments: { ...plan.commitments, [item.id]: next },
    }));

  return (
    <Card
      className={
        isFirst
          ? 'py-0 bg-white border-[#AEC488] shadow-md'
          : 'py-0 bg-white border-zinc-100'
      }
    >
      <CardContent className="p-6">
        {isFirst && (
          <p className="mb-2 inline-flex rounded-full bg-[#EFF3E7] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#6E5F47]">
            Start here
          </p>
        )}
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />

        {isTrying && item.exercise === 'breathe' && (
          <BreathingExercise onClose={() => setIsTrying(false)} />
        )}
        {isTrying && item.exercise === 'ground' && (
          <GroundingExercise onClose={() => setIsTrying(false)} />
        )}

        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          {item.exercise && !isTrying && (
            <button
              type="button"
              onClick={() => setIsTrying(true)}
              className="inline-flex items-center rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              <Play className="mr-2 w-4 h-4" />
              Try it now
            </button>
          )}
          {item.action && (
            <button
              type="button"
              onClick={toggleWeek}
              aria-pressed={isInWeek}
              className={`inline-flex items-center rounded-2xl border px-5 py-2.5 font-poppins font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 ${
                isInWeek
                  ? 'border-[#AEC488] bg-[#EFF3E7] text-[#6E5F47]'
                  : 'border-zinc-200 bg-white text-[#6E5F47] hover:bg-[#EFF3E7]'
              }`}
            >
              {isInWeek ? (
                <Check className="mr-2 w-4 h-4" />
              ) : (
                <Plus className="mr-2 w-4 h-4" />
              )}
              {isInWeek ? 'In my week' : 'Add to my week'}
            </button>
          )}
        </div>

        {isInWeek && time && (
          <div className="mt-4 rounded-2xl bg-[#EFF3E7] p-4 print:bg-transparent print:p-0">
            <p className="text-sm text-[#6E5F47] print:hidden">
              When will you do it?
            </p>
            <div className="mt-2 flex flex-wrap gap-2 print:hidden">
              {(Object.keys(TIME_LABELS) as TimeOfDay[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTime(option)}
                  aria-pressed={time === option}
                  className={`${chipClass} ${
                    time === option
                      ? 'border-[#6E5F47] bg-[#6E5F47] text-white'
                      : 'border-[#C5BFB5] bg-white text-[#6E5F47] hover:bg-[#DFE7CF]'
                  }`}
                >
                  {TIME_LABELS[option]}
                </button>
              ))}
            </div>
            <p className="mt-3 font-poppins font-bold text-[#6E5F47]">
              {commitmentSentence(item, time)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WeekTracker({
  saved,
  tools,
}: {
  saved: SavedPlan;
  tools: PlanItem[];
}) {
  const today = dayOfWeek(saved.startedAt);
  const start = new Date(saved.startedAt);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  const committed = tools.filter((tool) => saved.commitments[tool.id]);

  const toggleDay = (toolId: string, day: number) =>
    updatePlan((plan) => {
      const checks = [...(plan.checks[toolId] ?? Array(7).fill(false))];
      checks[day] = !checks[day];
      return { ...plan, checks: { ...plan.checks, [toolId]: checks } };
    });

  return (
    <section className="mt-12">
      <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
        Your week
      </h2>
      <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
        Tick a day each time you do it. Your progress is saved on this device.
      </p>

      {committed.length === 0 ? (
        <Card className="mt-5 py-0 border-dashed border-[#C5BFB5] bg-transparent shadow-none">
          <CardContent className="p-6 text-[#6E5F47]">
            Choose &quot;Add to my week&quot; on 1 or 2 tools above. They will
            show up here so you can tick them off each day.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-5 space-y-3">
          {committed.map((tool) => {
            const time = saved.commitments[tool.id];
            const checks = saved.checks[tool.id] ?? [];
            const doneCount = checks.filter(Boolean).length;
            return (
              <Card key={tool.id} className="py-0 bg-white border-zinc-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-poppins font-bold text-[#6E5F47]">
                      {commitmentSentence(tool, time)}
                    </p>
                    <p className="shrink-0 font-poppins font-bold text-[#91AFAA] tabular-nums">
                      {doneCount}/7
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
                    {days.map((label, day) => {
                      const isDone = Boolean(checks[day]);
                      const isToday = day === today;
                      const isFuture = day > today;
                      return (
                        <button
                          key={label + day}
                          type="button"
                          disabled={isFuture}
                          onClick={() => toggleDay(tool.id, day)}
                          aria-pressed={isDone}
                          aria-label={`${label}, day ${day + 1}${isDone ? ', done' : ''}`}
                          className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] disabled:cursor-not-allowed disabled:opacity-40 ${
                            isDone
                              ? 'border-[#AEC488] bg-[#AEC488] text-white'
                              : isToday
                                ? 'border-[#6E5F47] bg-white text-[#6E5F47]'
                                : 'border-zinc-200 bg-white text-[#6E5F47] hover:bg-[#EFF3E7]'
                          }`}
                        >
                          <span>{label}</span>
                          <span className="flex h-5 w-5 items-center justify-center">
                            {isDone && <Check className="w-4 h-4" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function ActionPlanPage() {
  const saved = useSavedPlan();
  const [isRetaking, setIsRetaking] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  const [emailName, setEmailName] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [website, setWebsite] = useState('');
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const showPlan = saved !== null && !isRetaking;
  const showQuestions = !showPlan && (hasStarted || isRetaking);
  const question = questions[current];

  useEffect(() => {
    if (!showPlan && !showQuestions) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [showPlan, showQuestions, current]);

  const handleAnswer = (value: string) => {
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    window.scrollTo({ top: 0 });
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      return;
    }
    savePlan({
      name: name.trim(),
      answers: nextAnswers,
      startedAt: new Date().toISOString(),
      commitments: {},
      checks: {},
    });
    setIsRetaking(false);
    setEmailStatus('idle');
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else if (isRetaking) {
      setIsRetaking(false);
    } else {
      setHasStarted(false);
    }
  };

  const handleRetake = () => {
    setName(saved?.name ?? '');
    setAnswers({});
    setCurrent(0);
    setIsRetaking(true);
    window.scrollTo({ top: 0 });
  };

  const handleDelete = () => {
    if (!window.confirm('Delete your plan and progress from this device?')) {
      return;
    }
    clearPlan();
    setAnswers({});
    setCurrent(0);
    setName('');
    setHasStarted(false);
    window.scrollTo({ top: 0 });
  };

  if (!showPlan && !showQuestions) {
    return (
      <div className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-balance font-playfair text-5xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              Get your free Hopeful Beginning Plan
            </h1>
            <p className="mt-6 font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em]">
              Answer 9 quick questions about how you have been. You will get a
              personal plan with simple steps to manage anxiety, low mood and
              stress, starting today.
            </p>

            <ul className="mt-8 space-y-3">
              {planIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#6E5F47]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFF3E7]">
                    <Check className="w-4 h-4 text-[#91AFAA]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <form
              className="mt-10"
              onSubmit={(event) => {
                event.preventDefault();
                setHasStarted(true);
              }}
            >
              <Label htmlFor="plan-name" className="text-[#6E5F47]">
                What should we call you? (optional)
              </Label>
              <Input
                id="plan-name"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 max-w-xs bg-white"
              />
              <button
                type="submit"
                className="group mt-6 inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-10 py-4 font-poppins text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5c4f3b] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50 motion-reduce:hover:translate-y-0"
              >
                Start my plan
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </button>
            </form>

            <p className="mt-6 text-sm text-[#6E5F47]">
              About 2 minutes. Free. Your answers stay on this device.
            </p>
            <p className="mt-10 border-t border-[#E2DFDA] pt-6 text-sm text-[#6E5F47] leading-relaxed">
              Built on proven self-help methods from cognitive behavioural
              therapy (CBT) and the World Health Organization&apos;s stress
              guide. This check-in is not a diagnosis and does not replace
              professional care.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showQuestions) {
    return (
      <div className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <Card className="py-0 bg-white border-zinc-100">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 text-sm text-[#6E5F47]">
                  <span>
                    Question {current + 1} of {questions.length}
                  </span>
                  <div
                    className="h-1.5 w-32 rounded-full bg-[#EFF3E7]"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-valuenow={current + 1}
                    aria-label="Progress"
                  >
                    <div
                      className="h-full rounded-full bg-[#AEC488] transition-[width] duration-300 motion-reduce:transition-none"
                      style={{
                        width: `${((current + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {question.stem && (
                  <p className="mt-6 text-sm text-[#6E5F47]">{question.stem}</p>
                )}
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className={`${question.stem ? 'mt-2' : 'mt-6'} font-poppins font-bold text-xl md:text-2xl text-[#6E5F47] focus:outline-none`}
                >
                  {question.prompt}
                </h1>
                {question.note && (
                  <p className="mt-2 text-sm text-[#6E5F47]">{question.note}</p>
                )}

                <div className="mt-6 grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      aria-pressed={answers[question.key] === option.value}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left font-poppins font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 aria-pressed:border-[#AEC488] aria-pressed:bg-[#EFF3E7]"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handlePrevious}
                  className="mt-6 inline-flex items-center gap-2 -ml-3 rounded-xl px-3 py-2 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!saved) return null;

  const plan = buildPlan(saved.answers);
  const tools =
    plan.sections.find((section) => section.id === 'tools')?.items ?? [];
  const otherSections = plan.sections.filter(
    (section) => section.id !== 'tools' && section.id !== 'safety'
  );
  const safety = plan.sections.find((section) => section.id === 'safety');
  const day = dayOfWeek(saved.startedAt);
  const madeOn = new Date(saved.startedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const weekSentences = tools
    .filter((tool) => saved.commitments[tool.id])
    .map((tool) => commitmentSentence(tool, saved.commitments[tool.id]));

  const handleEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailStatus('sending');
    try {
      await actionPlanService.emailPlan(
        email,
        (emailName ?? saved.name).trim(),
        plan,
        weekSentences,
        { website, startTime: formStartedAt ?? 0 }
      );
      setEmailStatus('sent');
    } catch {
      setEmailStatus('error');
    }
  };

  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div id="action-plan">
            {day >= 1 && day <= 6 && (
              <p className="mb-6 rounded-2xl bg-[#EFF3E7] px-5 py-3 font-poppins text-[#6E5F47] print:hidden">
                Welcome back{saved.name ? `, ${saved.name}` : ''}. This is day{' '}
                {day + 1} of your week.
              </p>
            )}
            {day >= 7 && (
              <div className="mb-6 rounded-2xl bg-[#EFF3E7] px-5 py-4 text-[#6E5F47] print:hidden">
                <p className="font-poppins font-bold">
                  Your first week is done
                  {saved.name ? `, ${saved.name}` : ''}.
                </p>
                <p className="mt-1">
                  Take the check-in again to see what has changed.
                </p>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="mt-3 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                >
                  Take the check-in again
                </button>
              </div>
            )}

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
            >
              {saved.name
                ? `${saved.name}'s Hopeful Beginning Plan`
                : 'Your Hopeful Beginning Plan'}
            </h1>
            <p className="mt-4 font-poppins text-[#6E5F47] tracking-[-0.022em]">
              Made for you on {madeOn}.{' '}
              {plan.needsSafetyPlan
                ? 'Start with your safety plan today.'
                : 'Pick 1 or 2 daily tools, add them to your week, then tick them off each day.'}
            </p>

            <Card className="mt-8 py-0 bg-white border-zinc-100">
              <CardContent className="p-6">
                <h2 className="font-poppins font-bold text-lg text-[#6E5F47]">
                  What your answers show
                </h2>
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-[#AEC488]">
                  {plan.summary.map((line) => (
                    <li key={line} className="text-[#6E5F47]">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[#6E5F47]">
                  This is not a diagnosis. It is a starting point.
                </p>
              </CardContent>
            </Card>

            {safety && (
              <section className="mt-12">
                <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                  {safety.heading}
                </h2>
                {safety.intro && (
                  <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                    {safety.intro}
                  </p>
                )}
                <div className="mt-5 space-y-3">
                  {safety.items.map((item) => (
                    <PlanItemCard key={item.id} item={item} emphasis />
                  ))}
                </div>
              </section>
            )}

            <div className="mt-6">
              <ECoachCard />
            </div>

            <section className="mt-12">
              <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                Your daily tools
              </h2>
              <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                Try one now. Then add 1 or 2 to your week and pick a time.
              </p>
              <div className="mt-5 space-y-3">
                {tools.map((item, idx) => (
                  <ToolCard
                    key={item.id}
                    item={item}
                    isFirst={idx === 0}
                    time={saved.commitments[item.id]}
                  />
                ))}
              </div>
            </section>

            <WeekTracker saved={saved} tools={tools} />

            {otherSections.map((section) => (
              <section key={section.id} className="mt-12">
                <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                  {section.heading}
                </h2>
                {section.intro && (
                  <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                    {section.intro}
                  </p>
                )}
                <div className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <PlanItemCard
                      key={item.id}
                      item={item}
                      emphasis={item.id === 'professional'}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Card className="mt-12 py-0 bg-white border-zinc-100 print:hidden">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-poppins font-bold text-xl text-[#6E5F47]">
                Get your plan by email
              </h2>
              <p className="mt-2 text-[#6E5F47]">
                Keep it in your inbox, with your week and every link, so you can
                come back to it anywhere.
              </p>

              {emailStatus === 'sent' ? (
                <p className="mt-4 text-[#6E5F47]" role="status">
                  Sent to {email}. Check your inbox, and your spam folder if you
                  don&apos;t see it.
                </p>
              ) : (
                <form
                  onSubmit={handleEmail}
                  onFocus={() => setFormStartedAt((t) => t ?? Date.now())}
                  className="mt-6 space-y-5"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="hidden"
                  />
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="plan-first-name"
                        className="text-[#6E5F47]"
                      >
                        First name (optional)
                      </Label>
                      <Input
                        id="plan-first-name"
                        autoComplete="given-name"
                        value={emailName ?? saved.name}
                        onChange={(e) => setEmailName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plan-email" className="text-[#6E5F47]">
                        Email
                      </Label>
                      <Input
                        id="plan-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-[#6E5F47]">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#6E5F47]"
                    />
                    <span>
                      Send this plan to my email. HopeBegins will use my email
                      only to send this plan. See our{' '}
                      <Link
                        href="/privacy"
                        className="font-bold underline underline-offset-4"
                      >
                        privacy policy
                      </Link>
                      .
                    </span>
                  </label>

                  {emailStatus === 'error' && (
                    <p className="text-sm text-red-700" role="alert">
                      We couldn&apos;t send your plan. Check the email address
                      and try again, or print the plan instead.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={emailStatus === 'sending'}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-8 py-4 font-poppins font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#5c4f3b] hover:shadow-xl disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                  >
                    {emailStatus === 'sending' && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Email my plan
                  </button>
                </form>
              )}

              <p className="mt-6 flex items-start gap-2 text-sm text-[#6E5F47]">
                <Lock className="mt-0.5 w-4 h-4 shrink-0 text-[#91AFAA]" />
                Your answers and progress are saved only on this device. If you
                ask us to email your plan, we use your email only to send it.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              <Printer className="w-4 h-4" />
              Print or save as PDF
            </button>
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              Retake the check-in
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-poppins font-medium text-sm text-[#6E5F47] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              Delete my plan from this device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
