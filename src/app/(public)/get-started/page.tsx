'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from '@/components/ui/LocalLink';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { CrisisList } from '@/components/help/Crisis';
import {
  primaryClass,
  quietClass,
  secondaryClass,
} from '@/components/tools/toolStyles';
import { isIntlLang, noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { cn } from '@/lib/utils';
import { dailyHopeService } from '@/services/dailyHopeService';
import {
  JourneyPageContent,
  siteSettingsService,
} from '@/services/siteSettingsService';
import {
  getDefaultJourneyPageContent,
  getIntlJourneyPageContent,
  JourneyCrisisSection,
  JourneyDevotionalSection,
  JourneyNextStepsSection,
  JourneyPrayerSection,
  JourneyStepKey,
  JourneyWelcomeSection,
  JourneyWordSection,
} from '@/lib/journeyPageContent';

type Step = JourneyStepKey;

// The words around the page's own content. In French, German, Spanish and
// Korean the person link goes to the help page's free lines, not to an
// e-coach (see EcoachLink).
const ui: PerLangNoTl<{
  steps: string;
  stepOf: (step: number, count: number, label: string) => string;
  stepLabel: (step: number, label: string) => string;
  /** Read after a prayer step's number: "1 of 5". */
  of: (count: number) => string;
  quote: (text: string) => string;
  person: string;
  plan: string;
}> = {
  en: {
    steps: 'Steps',
    stepOf: (step, count, label) => `Step ${step} of ${count}: ${label}`,
    stepLabel: (step, label) => `Step ${step}: ${label}`,
    of: (count) => ` of ${count}`,
    quote: (text) => `“${text}”`,
    person: 'Talk to a real person',
    plan: 'Make your free plan',
  },
  fr: {
    steps: 'Étapes',
    stepOf: (step, count, label) =>
      `Étape ${step} sur ${count}\u00a0: ${label}`,
    stepLabel: (step, label) => `Étape ${step}\u00a0: ${label}`,
    of: (count) => ` sur ${count}`,
    quote: (text) => `«\u00a0${text}\u00a0»`,
    person: 'Parler à quelqu’un sur une ligne d’écoute gratuite',
    plan: 'Faire ton plan gratuit',
  },
  de: {
    steps: 'Schritte',
    stepOf: (step, count, label) => `Schritt ${step} von ${count}: ${label}`,
    stepLabel: (step, label) => `Schritt ${step}: ${label}`,
    of: (count) => ` von ${count}`,
    quote: (text) => `„${text}“`,
    person: 'Kostenlos mit jemandem am Telefon reden',
    plan: 'Deinen kostenlosen Plan machen',
  },
  es: {
    steps: 'Pasos',
    stepOf: (step, count, label) => `Paso ${step} de ${count}: ${label}`,
    stepLabel: (step, label) => `Paso ${step}: ${label}`,
    of: (count) => ` de ${count}`,
    quote: (text) => `“${text}”`,
    person: 'Hablar con alguien en una línea de ayuda gratuita',
    plan: 'Haz tu plan gratis',
  },
  ko: {
    steps: '단계',
    stepOf: (step, count, label) => `${count}단계 중 ${step}단계: ${label}`,
    stepLabel: (step, label) => `${step}단계: ${label}`,
    of: (count) => `번째 (총 ${count}개)`,
    quote: (text) => `“${text}”`,
    person: '무료 상담 전화로 누군가와 이야기하기',
    plan: '무료로 나만의 계획 만들기',
  },
};

const h2Class =
  'text-balance font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const h3Class =
  'font-playfair text-2xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const bodyClass = 'text-lg leading-relaxed text-[#6E5F47]';
// Every step's buttons share one height.
const stepButton = 'min-h-12';
const nextLinkClass =
  'inline-flex min-h-12 items-center font-poppins text-lg font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';

function renderMultilineText(text: string) {
  const lines = text.split('\n');

  return lines.map((line, idx) => (
    <Fragment key={idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </Fragment>
  ));
}

export default function GetStartedPage() {
  const lang = usePageLanguage();
  const t = noTl(ui, lang);
  // The admin edits this page in English, so French, German, Spanish and
  // Korean keep their own words instead of the saved ones.
  const ownWords = isIntlLang(lang);
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [prayerSubStep, setPrayerSubStep] = useState(1);
  const [pageContent, setPageContent] = useState<JourneyPageContent>(() =>
    isIntlLang(lang)
      ? getIntlJourneyPageContent(lang)
      : getDefaultJourneyPageContent()
  );

  useEffect(() => {
    if (ownWords) return;
    const fetchContent = async () => {
      try {
        const data = await siteSettingsService.getJourneyPageContent();
        setPageContent(data);
      } catch (error) {
        console.error('Failed to fetch journey content:', error);
      }
    };

    fetchContent();
  }, [ownWords]);

  const steps = pageContent.steps.map((step) => ({
    id: step.key,
    label: step.label,
  }));

  const stepOrder = pageContent.steps.map((step) => step.key);
  const prayerStepCount = pageContent.prayer_section.steps.length;

  const getStepStatus = (stepId: Step) => {
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  const handleNext = () => {
    if (currentStep === 'prayer' && prayerSubStep < prayerStepCount) {
      setPrayerSubStep(prayerSubStep + 1);
    } else if (currentStep === 'prayer' && prayerSubStep === prayerStepCount) {
      setCurrentStep('devotional');
    } else if (currentStep === 'devotional') {
      setCurrentStep('next-steps');
      dailyHopeService.completeHopefulBeginning().catch(console.error);
    } else if (currentStep === 'welcome') {
      setCurrentStep('word');
    } else if (currentStep === 'word') {
      setCurrentStep('prayer');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'prayer' && prayerSubStep > 1) {
      setPrayerSubStep(prayerSubStep - 1);
    } else if (currentStep === 'prayer' && prayerSubStep === 1) {
      setCurrentStep('word');
    } else if (currentStep === 'devotional') {
      setCurrentStep('prayer');
      setPrayerSubStep(prayerStepCount);
    } else if (currentStep === 'next-steps') {
      setCurrentStep('devotional');
    } else if (currentStep === 'word') {
      setCurrentStep('welcome');
    }
  };

  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="mb-6">
            <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {pageContent.page_title}
            </h1>
            <p className="mt-3 font-poppins text-lg text-[#6E5F47] tracking-[-0.022em]">
              {pageContent.page_subtitle}
            </p>
          </div>

          {/* Where they are in the five steps; finished steps can be revisited. */}
          <nav aria-label={t.steps} className="mb-8">
            <p className="font-poppins text-sm font-medium text-[#6E5F47]">
              {t.stepOf(
                stepOrder.indexOf(currentStep) + 1,
                steps.length,
                steps.find((step) => step.id === currentStep)?.label ?? ''
              )}
            </p>
            <ol className="mt-3 flex gap-1.5">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                const canOpen = index <= stepOrder.indexOf(currentStep);
                return (
                  <li key={step.id} className="flex-1">
                    <button
                      type="button"
                      disabled={!canOpen}
                      aria-current={status === 'active' ? 'step' : undefined}
                      aria-label={t.stepLabel(index + 1, step.label)}
                      onClick={() => setCurrentStep(step.id)}
                      className="flex h-11 w-full items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] rounded-md disabled:cursor-default"
                    >
                      <span
                        className={cn(
                          'h-1.5 w-full rounded-full',
                          status === 'upcoming'
                            ? 'bg-[#E2DFDA]'
                            : 'bg-[#AEC488]',
                          status === 'active' && 'bg-[#6E5F47]'
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  currentStep + (currentStep === 'prayer' ? prayerSubStep : '')
                }
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentStep === 'welcome' && (
                  <WelcomeStep
                    content={pageContent.welcome_section}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 'word' && (
                  <WordStep
                    lang={lang}
                    content={pageContent.word_section}
                    onBack={handlePrevious}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 'prayer' && (
                  <PrayerStep
                    lang={lang}
                    content={pageContent.prayer_section}
                    subStep={prayerSubStep}
                    onBack={handlePrevious}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 'devotional' && (
                  <DevotionalStep
                    lang={lang}
                    content={pageContent.devotional_section}
                    onBack={handlePrevious}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 'next-steps' && (
                  <NextStepsStep
                    lang={lang}
                    content={pageContent.next_steps_section}
                    crisis={pageContent.crisis_section}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepButtons({
  backText,
  nextText,
  onBack,
  onNext,
}: {
  backText?: string;
  nextText: string;
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={cn(secondaryClass, stepButton)}
        >
          {backText}
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        className={cn(primaryClass, stepButton)}
      >
        {nextText}
      </button>
    </div>
  );
}

function StepIntro({ title, text }: { title: string; text?: string }) {
  return (
    <div className="space-y-3">
      <h2 className={h2Class}>{title}</h2>
      {text && <p className={bodyClass}>{text}</p>}
    </div>
  );
}

function Verse({
  lang,
  text,
  reference,
}: {
  lang: Lang;
  text: string;
  reference: string;
}) {
  // No verse text, no quote: in French, German, Spanish and Korean a verse
  // shows only once verses.ts has it in that language.
  if (!text) return null;
  return (
    <figure>
      <blockquote className="font-playfair text-2xl italic leading-[1.25] tracking-[-0.02em] text-[#6E5F47]">
        {noTl(ui, lang).quote(text)}
      </blockquote>
      <figcaption className="mt-2 text-sm text-[#6E5F47]/85">
        {reference}
      </figcaption>
    </figure>
  );
}

function WelcomeStep({
  content,
  onNext,
}: {
  content: JourneyWelcomeSection;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className={h2Class}>{content.title}</h2>
        <p className={bodyClass}>{renderMultilineText(content.body)}</p>
      </div>

      <div>
        <h3 className="font-poppins font-medium text-[#6E5F47]">
          {content.expectations_title}
        </h3>
        <ol className="mt-3 list-decimal pl-5 space-y-2 text-[#6E5F47]">
          {content.expectations.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>

      <StepButtons nextText={content.button_text} onNext={onNext} />
    </div>
  );
}

function WordStep({
  lang,
  content,
  onNext,
  onBack,
}: {
  lang: Lang;
  content: JourneyWordSection;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8">
      <StepIntro title={content.title} text={content.description} />

      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#EFF3E7]">
        <iframe
          width="100%"
          height="100%"
          src={content.video_embed_url}
          title={content.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <Verse
        lang={lang}
        text={content.verse_text}
        reference={content.verse_reference}
      />

      <StepButtons
        backText={content.previous_button_text}
        nextText={content.next_button_text}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}

function PrayerStep({
  lang,
  content,
  subStep,
  onNext,
  onBack,
}: {
  lang: Lang;
  content: JourneyPrayerSection;
  subStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const current = content.steps[subStep - 1] || content.steps[0];

  return (
    <div className="space-y-8">
      <StepIntro title={content.title} text={content.description} />

      <div className="flex gap-4">
        <p className="w-8 shrink-0 font-playfair text-3xl leading-[0.95] text-[#6E5F47]/85">
          {subStep}
          <span className="sr-only">
            {noTl(ui, lang).of(content.steps.length)}
          </span>
        </p>
        <div className="space-y-3">
          <h3 className={h3Class}>{current.title}</h3>
          <p className={bodyClass}>{current.text}</p>
        </div>
      </div>

      <StepButtons
        backText={content.back_button_text}
        nextText={
          subStep === content.steps.length
            ? content.final_button_text
            : content.next_button_text
        }
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}

function DevotionalStep({
  lang,
  content,
  onNext,
  onBack,
}: {
  lang: Lang;
  content: JourneyDevotionalSection;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8">
      <StepIntro title={content.title} text={content.subtitle} />

      <div className={cn('space-y-4', bodyClass)}>
        {content.content_cards.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <Verse
        lang={lang}
        text={content.verse_text}
        reference={content.verse_reference}
      />

      <div className="space-y-3">
        <h3 className={h3Class}>{content.good_news_title}</h3>
        <p className={bodyClass}>{content.good_news_body}</p>
      </div>

      <div>
        <p className="font-poppins font-medium text-[#6E5F47]">
          {content.reflection_title}
        </p>
        <p className={cn('mt-1', bodyClass)}>{content.reflection_prompt}</p>
      </div>

      <StepButtons
        backText={content.previous_button_text}
        nextText={content.next_button_text}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}

function NextStepsStep({
  lang,
  content,
  crisis,
}: {
  lang: Lang;
  content: JourneyNextStepsSection;
  crisis: JourneyCrisisSection;
}) {
  const t = noTl(ui, lang);
  return (
    <div className="space-y-8">
      <StepIntro title={content.title} text={content.description} />

      <ul className="space-y-1">
        {/* Always a person and a plan first, whatever the editable steps say. */}
        <li className="hb-step-in">
          <EcoachLink linkName="ecoach_get_started" className={nextLinkClass}>
            {t.person}
          </EcoachLink>
        </li>
        <li className="hb-step-in" style={{ animationDelay: '60ms' }}>
          <Link href="/action-plan" className={nextLinkClass}>
            {t.plan}
          </Link>
        </li>
        {content.actions.map((action, idx) => (
          <li
            key={idx}
            className="hb-step-in"
            style={{ animationDelay: `${Math.min(idx + 2, 7) * 60}ms` }}
          >
            <Link href={action.href} className={nextLinkClass}>
              {action.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Every line the admin lists, more than the band under the page. */}
      <section className="rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
        <h2 className="font-playfair text-2xl leading-[0.95] tracking-[-0.04em]">
          {crisis.heading}
        </h2>
        {isIntlLang(lang) ? (
          // The admin's lines are the Philippines'; these are the lines of
          // the country the visitor is in.
          <p className="mt-4 leading-relaxed">
            <CrisisList lang={lang} className="block space-y-2" />
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {crisis.contacts.map((contact, index) => (
              <li key={index}>
                <p className="font-poppins font-medium">{contact.title}</p>
                {contact.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="mt-1">
                    {line.label}{' '}
                    <span className="font-bold tabular-nums">{line.value}</span>
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </section>

      <Link href="/" className={cn(quietClass, '-ml-5')}>
        {content.home_link_text}
      </Link>
    </div>
  );
}
