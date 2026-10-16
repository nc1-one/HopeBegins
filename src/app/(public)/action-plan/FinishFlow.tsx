'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Download, Lock, MessageCircle } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PLAN_DAYS, type PlanItem, type PlanLang } from '@/lib/actionPlan';
import {
  restartFourWeeks,
  updatePlan,
  type SavedPlan,
} from '@/lib/actionPlanStore';
import { drawHopeCard } from '@/lib/hopeCardImage';
import { analyticsService } from '@/services/analyticsService';
import { UseMyTool } from './UseMyTool';
import { calmerCount, useToolChecks } from '@/lib/toolChecks';

/**
 * The end of the 4 weeks: see what changed, pick the tool that helped most,
 * and keep it on a Hope Card with warning signs, two people and the crisis
 * line. Everything here stays on the device.
 */

export type FinishStep = 'tool' | 'card' | 'view';

const copy = {
  en: {
    locale: 'en-US',
    doneHeading: (name: string) => `You did 4 weeks${name ? `, ${name}` : ''}.`,
    doneIntro: 'Here is what changed, and what you kept doing.',
    daysTitle: 'Days you did each tool',
    daysOf: (n: number) => `${n} of ${PLAN_DAYS} days`,
    calmerOf: (calmer: number, total: number) =>
      `Calmer after it ${calmer} of ${total} ${total === 1 ? 'time' : 'times'}`,
    pickTitle: 'Which tool helped you most?',
    pickHint: 'You will keep this one on your Hope Card.',
    next: 'Next: make my Hope Card',
    cardTitle: 'Make your Hope Card',
    cardIntro:
      'A small card for the days that get hard again. It stays on this phone. HopeBegins never sees it.',
    signsLabel: "What tells you it's coming back?",
    signsHint:
      'Your warning signs, like not sleeping, skipping meals or staying away from people.',
    peopleLabel: 'Two people you can reach out to',
    peopleHint: 'First names are enough.',
    person: (n: number) => `Person ${n}`,
    make: 'Make my Hope Card',
    back: 'Back',
    yourCard: 'Your Hope Card',
    cardName: 'My Hope Card',
    toolHeading: 'My tool',
    signsHeading: 'When it comes back, I notice',
    reasonsHeading: 'My reasons to keep going',
    peopleHeading: 'People I can reach out to',
    crisisHeading: 'If it gets dark',
    crisisLine: 'NCMH Crisis Hotline, 24/7: 1553 or 0917 899 8727',
    ecoachLine: 'E-coach on Messenger: facebook.com/Mayhimalaeveryday',
    call: 'Call 1553',
    ecoach: 'Message an e-coach',
    saveImage: 'Save as an image',
    making: 'Making your image...',
    download: 'Download the image',
    imageHint:
      'On iPhone, press and hold the picture, then tap Save to Photos. If other people see your lock screen, use it as your home screen wallpaper instead.',
    imageAlt: 'Your Hope Card as a phone wallpaper',
    comesBackTitle: 'If it comes back',
    comesBack: [
      'Use your tool every day again, starting today.',
      'Tell one of your two people.',
      'Take the check-in. If your scores stay high for two weeks, talk to a counselor or an e-coach.',
      'If you think about ending your life, call 1553 now.',
    ],
    restart: 'Start another 4 weeks with this tool',
    edit: 'Edit my Hope Card',
    toPlan: 'Back to my plan',
    privacy:
      'Your Hope Card is saved only on this phone, with your plan. It is in your backup file too.',
  },
  tl: {
    locale: 'fil-PH',
    doneHeading: (name: string) =>
      `Natapos mo ang 4 na linggo${name ? `, ${name}` : ''}.`,
    doneIntro: 'Ito ang nagbago, at ang mga tuloy-tuloy mong ginawa.',
    daysTitle: 'Ilang araw mo ginawa ang bawat tool',
    daysOf: (n: number) => `${n} sa ${PLAN_DAYS} araw`,
    calmerOf: (calmer: number, total: number) =>
      `Mas kumalma ${calmer} sa ${total} beses`,
    pickTitle: 'Aling tool ang pinakanakatulong sa iyo?',
    pickHint: 'Ito ang ilalagay mo sa Hope Card mo.',
    next: 'Susunod: gawin ang Hope Card ko',
    cardTitle: 'Gawin ang Hope Card mo',
    cardIntro:
      'Isang maliit na card para sa mga araw na bumigat ulit. Mananatili ito sa phone na ito. Hindi ito nakikita ng HopeBegins.',
    signsLabel: 'Ano ang palatandaan na bumabalik ito?',
    signsHint:
      'Mga warning sign mo, gaya ng hindi makatulog, hindi kumakain, o umiiwas sa mga tao.',
    peopleLabel: 'Dalawang taong puwede mong lapitan',
    peopleHint: 'Pangalan lang, okay na.',
    person: (n: number) => (n === 1 ? 'Unang tao' : 'Ikalawang tao'),
    make: 'Gawin ang Hope Card ko',
    back: 'Bumalik',
    yourCard: 'Ang Hope Card mo',
    cardName: 'Ang Hope Card ko',
    toolHeading: 'Ang tool ko',
    signsHeading: 'Kapag bumabalik ito, napapansin ko',
    reasonsHeading: 'Ang mga dahilan ko para magpatuloy',
    peopleHeading: 'Mga taong malalapitan ko',
    crisisHeading: 'Kapag sobrang bigat na',
    crisisLine: 'NCMH Crisis Hotline, 24/7: 1553 o 0917 899 8727',
    ecoachLine: 'E-coach sa Messenger: facebook.com/Mayhimalaeveryday',
    call: 'Tumawag sa 1553',
    ecoach: 'Mag-message sa e-coach',
    saveImage: 'I-save bilang larawan',
    making: 'Ginagawa ang larawan mo...',
    download: 'I-download ang larawan',
    imageHint:
      'Sa iPhone, pindutin nang matagal ang larawan, tapos i-tap ang Save to Photos. Kung may ibang nakakakita ng lock screen mo, gamitin ito bilang home screen wallpaper.',
    imageAlt: 'Ang Hope Card mo bilang phone wallpaper',
    comesBackTitle: 'Kapag bumalik ito',
    comesBack: [
      'Gamitin ulit ang tool mo araw-araw, simula ngayon.',
      'Sabihan ang isa sa dalawang taong napili mo.',
      'Sagutan ang check-in. Kung mataas pa rin ang scores mo pagkalipas ng dalawang linggo, kumausap ng counselor o e-coach.',
      'Kung naiisip mong tapusin ang buhay mo, tumawag agad sa 1553.',
    ],
    restart: 'Magsimula ng panibagong 4 na linggo gamit ang tool na ito',
    edit: 'Baguhin ang Hope Card ko',
    toPlan: 'Bumalik sa plano ko',
    privacy:
      'Naka-save lang ang Hope Card mo sa phone na ito, kasama ng plano mo. Kasama rin ito sa backup file mo.',
  },
};

const headingClass =
  'text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none';
const primaryClass =
  'inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';
const backClass =
  'inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

const daysDone = (saved: SavedPlan, toolId: string) =>
  (saved.checks[toolId] ?? []).filter(Boolean).length;

export function FinishFlow({
  saved,
  tools,
  lang,
  progress,
  start,
  onClose,
}: {
  saved: SavedPlan;
  /** Every tool the visitor could pick, the ones in their 4 weeks first. */
  tools: PlanItem[];
  lang: PlanLang;
  /** The "What has changed" card, drawn by the plan page. */
  progress: React.ReactNode;
  start: FinishStep;
  onClose: () => void;
}) {
  const t = copy[lang];
  const toolChecks = useToolChecks();
  const committed = tools.filter((tool) => saved.commitments[tool.id]);
  const mostDone = [...committed].sort(
    (a, b) => daysDone(saved, b.id) - daysDone(saved, a.id)
  )[0];
  const [step, setStep] = useState<FinishStep>(start);
  const [toolId, setToolId] = useState(
    saved.hopeCard?.toolId ?? mostDone?.id ?? tools[0]?.id ?? ''
  );
  const [signs, setSigns] = useState(saved.hopeCard?.warningSigns ?? '');
  const [people, setPeople] = useState([
    saved.hopeCard?.people[0] ?? '',
    saved.hopeCard?.people[1] ?? '',
  ]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isMaking, setIsMaking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  // Let go of the old picture when a new one is made or the page closes.
  useEffect(
    () => () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    },
    [imageUrl]
  );

  const card = saved.hopeCard;
  const cardTool = tools.find((tool) => tool.id === (card?.toolId ?? toolId));
  // The how-to first, so the card works on its own months later.
  const toolLines = cardTool
    ? [
        cardTool.title,
        cardTool.detail,
        ...(cardTool.steps?.map((stepText, i) => `${i + 1}. ${stepText}`) ??
          []),
      ]
    : [];
  // Only shown once the card exists.
  const madeOn = card
    ? new Date(card.madeAt).toLocaleDateString(t.locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const saveCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    analyticsService.recordClick('plan_hope_card_made');
    updatePlan((plan) => ({
      ...plan,
      hopeCard: {
        toolId,
        warningSigns: signs.trim(),
        people: people.map((person) => person.trim()).filter(Boolean),
        madeAt: new Date().toISOString(),
      },
    }));
    setImageUrl(null);
    setStep('view');
  };

  const makeImage = async () => {
    if (!card) return;
    setIsMaking(true);
    analyticsService.recordClick('plan_hope_card_image');
    const sections = [{ heading: t.toolHeading, lines: toolLines }];
    if (saved.reasons?.length) {
      sections.push({ heading: t.reasonsHeading, lines: saved.reasons });
    }
    if (card.warningSigns) {
      sections.push({ heading: t.signsHeading, lines: [card.warningSigns] });
    }
    if (card.people.length) {
      sections.push({ heading: t.peopleHeading, lines: card.people });
    }
    const blob = await drawHopeCard({
      brand: 'HopeBegins',
      title: t.cardName,
      subtitle: saved.name ? `${saved.name} · ${madeOn}` : madeOn,
      sections,
      crisisHeading: t.crisisHeading,
      crisisLines: [t.crisisLine, t.ecoachLine],
      footer: 'hopebegins.today',
    });
    setIsMaking(false);
    if (blob) setImageUrl(URL.createObjectURL(blob));
  };

  const restart = () => {
    const tool = tools.find((item) => item.id === (card?.toolId ?? toolId));
    if (!tool) return;
    analyticsService.recordClick('plan_restart_4_weeks');
    restartFourWeeks(tool.id, tool.defaultTime ?? 'morning');
    onClose();
  };

  if (step === 'tool') {
    return (
      <div className="space-y-8 hb-step-in">
        <h1 tabIndex={-1} className={headingClass}>
          {t.doneHeading(saved.name)}
        </h1>
        <p className="font-poppins text-lg text-[#6E5F47]">{t.doneIntro}</p>
        {progress}
        {committed.length > 0 && (
          <section className="rounded-2xl border border-zinc-100 bg-white p-6">
            <h2 className="font-poppins text-lg font-bold text-[#6E5F47]">
              {t.daysTitle}
            </h2>
            <ul className="mt-3 space-y-2 text-[#6E5F47]">
              {committed.map((tool) => (
                <li key={tool.id} className="flex justify-between gap-4">
                  <span>
                    {tool.title}
                    {calmerCount(toolChecks, tool.id).total > 0 && (
                      <span className="block text-sm">
                        {t.calmerOf(
                          calmerCount(toolChecks, tool.id).calmer,
                          calmerCount(toolChecks, tool.id).total
                        )}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-bold tabular-nums">
                    {t.daysOf(daysDone(saved, tool.id))}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <fieldset>
          <legend className="font-playfair text-3xl text-[#6E5F47] leading-tight">
            {t.pickTitle}
          </legend>
          <p className="mt-2 text-[#6E5F47]">{t.pickHint}</p>
          <div className="mt-4 grid gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                aria-pressed={toolId === tool.id}
                onClick={() => setToolId(tool.id)}
                className="flex min-h-11 w-full items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left font-poppins font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] hover:bg-[#EFF3E7] aria-pressed:border-[#AEC488] aria-pressed:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
              >
                {tool.title}
                {toolId === tool.id && <Check className="h-5 w-5 shrink-0" />}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!toolId}
            onClick={() => setStep('card')}
            className={primaryClass}
          >
            {t.next}
          </button>
          <button type="button" onClick={onClose} className={secondaryClass}>
            {t.toPlan}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'card') {
    return (
      <form onSubmit={saveCard} className="space-y-8 hb-step-in">
        <button
          type="button"
          onClick={() => setStep('tool')}
          className={backClass}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </button>
        <h1 tabIndex={-1} className={headingClass}>
          {t.cardTitle}
        </h1>
        <p className="font-poppins text-lg text-[#6E5F47]">{t.cardIntro}</p>
        <div className="space-y-2">
          <Label htmlFor="hope-card-signs" className="text-[#6E5F47]">
            {t.signsLabel}
          </Label>
          <p id="hope-card-signs-hint" className="text-sm text-[#6E5F47]">
            {t.signsHint}
          </p>
          <textarea
            id="hope-card-signs"
            aria-describedby="hope-card-signs-hint"
            value={signs}
            maxLength={200}
            rows={3}
            onChange={(e) => setSigns(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          />
        </div>
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-[#6E5F47]">
            {t.peopleLabel}
          </legend>
          <p className="text-sm text-[#6E5F47]">{t.peopleHint}</p>
          {[0, 1].map((index) => (
            <div key={index} className="space-y-1">
              <Label
                htmlFor={`hope-card-person-${index}`}
                className="text-sm text-[#6E5F47]"
              >
                {t.person(index + 1)}
              </Label>
              <Input
                id={`hope-card-person-${index}`}
                autoComplete="off"
                maxLength={40}
                value={people[index]}
                onChange={(e) =>
                  setPeople((list) =>
                    list.map((person, i) =>
                      i === index ? e.target.value : person
                    )
                  )
                }
                className="max-w-sm bg-white"
              />
            </div>
          ))}
        </fieldset>
        <p className="flex items-start gap-2 text-sm text-[#6E5F47]">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#91AFAA]" />
          {t.privacy}
        </p>
        <button type="submit" className={primaryClass}>
          {t.make}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-8 hb-step-in">
      <button type="button" onClick={onClose} className={backClass}>
        <ArrowLeft className="h-4 w-4" />
        {t.toPlan}
      </button>
      <h1 tabIndex={-1} className={headingClass}>
        {t.yourCard}
      </h1>

      {card && (
        <article
          aria-label={t.cardName}
          className="space-y-4 rounded-3xl border border-[#DFE7CF] bg-[#FCFDFA] p-5 md:p-8"
        >
          <div>
            <p className="font-poppins text-sm font-bold text-[#6E5F47]">
              HopeBegins
            </p>
            <h2 className="mt-1 font-playfair text-3xl text-[#6E5F47]">
              {t.cardName}
            </h2>
            <p className="text-sm text-[#6E5F47]">
              {saved.name ? `${saved.name} · ${madeOn}` : madeOn}
            </p>
          </div>
          <section className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
            <h3 className="font-poppins font-bold text-[#6E5F47]">
              {t.toolHeading}
            </h3>
            {cardTool && (
              <>
                <p className="mt-1 font-bold text-[#6E5F47]">
                  {cardTool.title}
                </p>
                <p className="mt-1 text-[#6E5F47]">{cardTool.detail}</p>
                {cardTool.steps && (
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#6E5F47] marker:font-bold marker:text-[#91AFAA]">
                    {cardTool.steps.map((stepText) => (
                      <li key={stepText}>{stepText}</li>
                    ))}
                  </ol>
                )}
                {cardTool.exercise && (
                  <div className="mt-4">
                    <UseMyTool tool={cardTool} saved={saved} lang={lang} />
                  </div>
                )}
              </>
            )}
          </section>
          {saved.reasons && saved.reasons.length > 0 && (
            <section className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
              <h3 className="font-poppins font-bold text-[#6E5F47]">
                {t.reasonsHeading}
              </h3>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[#6E5F47] marker:text-[#AEC488]">
                {saved.reasons.map((reason, i) => (
                  <li key={`${i}-${reason}`}>{reason}</li>
                ))}
              </ul>
            </section>
          )}
          {card.warningSigns && (
            <section className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
              <h3 className="font-poppins font-bold text-[#6E5F47]">
                {t.signsHeading}
              </h3>
              <p className="mt-1 whitespace-pre-line text-[#6E5F47]">
                {card.warningSigns}
              </p>
            </section>
          )}
          {card.people.length > 0 && (
            <section className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
              <h3 className="font-poppins font-bold text-[#6E5F47]">
                {t.peopleHeading}
              </h3>
              <ul className="mt-1 space-y-1 text-[#6E5F47]">
                {card.people.map((person) => (
                  <li key={person}>{person}</li>
                ))}
              </ul>
            </section>
          )}
          <section className="rounded-2xl bg-[#EFF3E7] p-5">
            <h3 className="font-poppins font-bold text-[#6E5F47]">
              {t.crisisHeading}
            </h3>
            <p className="mt-1 text-[#6E5F47]">{t.crisisLine}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="tel:1553" className={primaryClass}>
                {t.call}
              </a>
              <EcoachLink
                linkName="ecoach_hope_card"
                className={secondaryClass}
              >
                <MessageCircle className="h-4 w-4" />
                {t.ecoach}
              </EcoachLink>
            </div>
          </section>
        </article>
      )}

      <div className="space-y-3">
        {!imageUrl && (
          <button
            type="button"
            onClick={makeImage}
            disabled={isMaking}
            className={primaryClass}
          >
            <Download className="mr-2 h-4 w-4" />
            {isMaking ? t.making : t.saveImage}
          </button>
        )}
        {imageUrl && (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- a local blob made on this device */}
            <img
              src={imageUrl}
              alt={t.imageAlt}
              width={270}
              height={480}
              className="rounded-2xl border border-[#DFE7CF]"
            />
            <a
              href={imageUrl}
              download="hopebegins-hope-card.png"
              className={primaryClass}
            >
              <Download className="mr-2 h-4 w-4" />
              {t.download}
            </a>
            <p className="text-sm text-[#6E5F47]">{t.imageHint}</p>
          </div>
        )}
      </div>

      <section className="rounded-2xl border border-zinc-100 bg-white p-6">
        <h2 className="font-poppins text-lg font-bold text-[#6E5F47]">
          {t.comesBackTitle}
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[#6E5F47] marker:font-bold marker:text-[#91AFAA]">
          {t.comesBack.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={restart} className={primaryClass}>
          {t.restart}
        </button>
        <button
          type="button"
          onClick={() => setStep('tool')}
          className={secondaryClass}
        >
          {t.edit}
        </button>
      </div>
    </div>
  );
}
