'use client';

import { useEffect, useRef, useState } from 'react';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import type { FeelingLang } from '@/lib/feelingPages';
import { rememberTool } from '@/lib/myTool';
import { ToolFinish } from './ToolFinish';

const BREATHE_IN = 4;
const BREATHE_OUT = 6;
const ROUNDS = 12; // 12 x 10 seconds = 2 minutes
const SHORT_ROUNDS = 6; // 1 minute, for a bad moment
const CYCLE = BREATHE_IN + BREATHE_OUT;

const copy = {
  en: {
    label: 'Slow breathing',
    breatheIn: 'Breathe in',
    breatheOut: 'Breathe out',
    round: (round: number, rounds: number) =>
      `Round ${round} of ${rounds}. In through your nose, out through your mouth.`,
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
    shorter: 'Make it 1 minute',
    buzz: 'Vibrate with each breath',
    buzzHint: 'Close your eyes if you like, and follow the buzz.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS ? '1 minute done.' : '2 minutes done.',
    doneText: 'Notice how your body feels now compared to when you started.',
  },
  tl: {
    label: 'Dahan-dahang paghinga',
    breatheIn: 'Hinga papasok',
    breatheOut: 'Hinga palabas',
    round: (round: number, rounds: number) =>
      `Round ${round} ng ${rounds}. Papasok sa ilong, palabas sa bibig.`,
    pause: 'I-pause',
    resume: 'Ituloy',
    stop: 'Itigil',
    shorter: 'Gawing 1 minuto',
    buzz: 'Mag-vibrate sa bawat hinga',
    buzzHint: 'Puwede kang pumikit at sundan ang vibrate.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS
        ? 'Tapos na ang 1 minuto.'
        : 'Tapos na ang 2 minuto.',
    doneText:
      'Pansinin ang pakiramdam ng katawan mo ngayon kumpara noong nagsimula ka.',
  },
  fr: {
    label: 'Respiration lente',
    breatheIn: 'Inspire',
    breatheOut: 'Expire',
    round: (round: number, rounds: number) =>
      `Cycle ${round} sur ${rounds}. Inspire par le nez, expire par la bouche.`,
    pause: 'Pause',
    resume: 'Reprendre',
    stop: 'Arrêter',
    shorter: 'Réduire à 1 minute',
    buzz: 'Vibrer à chaque respiration',
    buzzHint: 'Ferme les yeux si tu veux, et suis les vibrations.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS ? '1 minute terminée.' : '2 minutes terminées.',
    doneText:
      'Observe ce que tu ressens dans ton corps maintenant, par rapport au début.',
  },
  de: {
    label: 'Langsames Atmen',
    breatheIn: 'Einatmen',
    breatheOut: 'Ausatmen',
    round: (round: number, rounds: number) =>
      `Runde ${round} von ${rounds}. Atme durch die Nase ein und durch den Mund aus.`,
    pause: 'Pause',
    resume: 'Weiter',
    stop: 'Beenden',
    shorter: 'Auf 1 Minute kürzen',
    buzz: 'Bei jedem Atemzug vibrieren',
    buzzHint: 'Schließ die Augen, wenn du magst, und folge dem Vibrieren.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS ? '1 Minute geschafft.' : '2 Minuten geschafft.',
    doneText:
      'Spür mal, wie sich dein Körper jetzt anfühlt, verglichen mit vorhin.',
  },
  es: {
    label: 'Respiración lenta',
    breatheIn: 'Inhala',
    breatheOut: 'Exhala',
    round: (round: number, rounds: number) =>
      `Ronda ${round} de ${rounds}. Inhala por la nariz y exhala por la boca.`,
    pause: 'Pausar',
    resume: 'Continuar',
    stop: 'Detener',
    shorter: 'Reducir a 1 minuto',
    buzz: 'Vibrar con cada respiración',
    buzzHint: 'Cierra los ojos si quieres y sigue la vibración.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS
        ? 'Completaste 1 minuto.'
        : 'Completaste 2 minutos.',
    doneText:
      'Fíjate en cómo se siente tu cuerpo ahora, comparado con cuando empezaste.',
  },
  ko: {
    label: '천천히 숨쉬기',
    breatheIn: '들이마셔요',
    breatheOut: '내쉬어요',
    round: (round: number, rounds: number) =>
      `${rounds}번 중 ${round}번째예요. 코로 들이마시고 입으로 내쉬어요.`,
    pause: '일시정지',
    resume: '계속하기',
    stop: '그만하기',
    shorter: '1분으로 줄이기',
    buzz: '숨 쉴 때마다 진동하기',
    buzzHint: '원하면 눈을 감고 진동을 따라가 보세요.',
    doneTitle: (rounds: number) =>
      rounds === SHORT_ROUNDS ? '1분 끝났어요' : '2분 끝났어요',
    doneText: '처음과 비교해서 지금 몸이 어떻게 느껴지는지 살펴보세요.',
  },
};

export function BreathingExercise({
  onClose,
  lang = 'en',
  source,
  onFinish,
  doneNote,
}: {
  onClose: () => void;
  lang?: FeelingLang;
  /** Where it was opened, so the dashboard can count tools per journey stage. */
  source: ToolSource;
  /** Called once when the exercise is finished. */
  onFinish?: () => void;
  /** An extra line on the finish screen, such as "Ticked for today". */
  doneNote?: string;
}) {
  const t = copy[lang];
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rounds, setRounds] = useState(ROUNDS);
  const [buzz, setBuzz] = useState(false);
  // Android phones can buzz on each breath; iPhones and computers can't.
  const canBuzz = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const isDone = elapsed >= CYCLE * rounds;
  const counted = useRef({ start: false, done: false });
  const boxRef = useRef<HTMLDivElement>(null);

  // Screen readers land in the exercise when it opens. The finish screen
  // takes focus itself.
  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, []);

  useEffect(() => {
    if (counted.current.start) return;
    counted.current.start = true;
    analyticsService.recordClick(`tool_breathe_start_${source}`);
  }, [source]);

  useEffect(() => {
    if (!isDone || counted.current.done) return;
    counted.current.done = true;
    analyticsService.recordClick(`tool_breathe_done_${source}`);
    rememberTool('breathe');
    onFinish?.();
  }, [isDone, source, onFinish]);
  const inCycle = elapsed % CYCLE;
  const isBreathingIn = inCycle < BREATHE_IN;

  // One short buzz to breathe in, a softer double buzz to breathe out.
  useEffect(() => {
    if (!buzz || isPaused || isDone) return;
    navigator.vibrate(isBreathingIn ? 120 : [40, 80, 40]);
  }, [buzz, isBreathingIn, isPaused, isDone]);
  const count = isBreathingIn ? BREATHE_IN - inCycle : CYCLE - inCycle;
  const round = Math.min(Math.floor(elapsed / CYCLE) + 1, rounds);
  // Offered in the first minute, while switching still means stopping sooner.
  const canShorten = rounds === ROUNDS && elapsed < CYCLE * SHORT_ROUNDS;

  // Pause when they switch apps, so the count and the circle stay together.
  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setIsPaused(true);
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () =>
      document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  useEffect(() => {
    if (isPaused || isDone) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [isPaused, isDone]);

  if (isDone) {
    return (
      <ToolFinish
        kind="breathe"
        lang={lang}
        source={source}
        title={t.doneTitle(rounds)}
        text={t.doneText}
        doneNote={doneNote}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 focus:outline-none hb-panel-in"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex h-44 w-44 items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-[#AEC488] bg-white animate-[hb-breathe_10s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          />
          <div className="relative text-center">
            <p
              className="font-poppins font-bold text-lg text-[#6E5F47]"
              aria-live="polite"
            >
              {isBreathingIn ? t.breatheIn : t.breatheOut}
            </p>
            <p
              aria-hidden
              className="font-playfair text-4xl text-[#6E5F47] tabular-nums"
            >
              {count}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#6E5F47]">{t.round(round, rounds)}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="rounded-2xl border border-[#AEC488] bg-white px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {isPaused ? t.resume : t.pause}
          </button>
          <button
            type="button"
            onClick={() => {
              analyticsService.recordClick(`tool_breathe_stop_${source}`);
              onClose();
            }}
            className="rounded-2xl px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {t.stop}
          </button>
        </div>
        {canBuzz && (
          <div className="mt-3 flex flex-col items-center">
            <button
              type="button"
              aria-pressed={buzz}
              onClick={() => setBuzz((on) => !on)}
              className="min-h-11 rounded-xl px-3 text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:bg-[#DFE7CF] aria-pressed:bg-[#DFE7CF] aria-pressed:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {t.buzz}
            </button>
            {buzz && (
              <p className="mt-1 text-sm text-[#6E5F47]">{t.buzzHint}</p>
            )}
          </div>
        )}
        {canShorten && (
          <button
            type="button"
            onClick={() => {
              analyticsService.recordClick(`tool_breathe_short_${source}`);
              setRounds(SHORT_ROUNDS);
            }}
            className="mt-3 min-h-11 rounded-xl px-3 text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {t.shorter}
          </button>
        )}
      </div>
    </div>
  );
}
