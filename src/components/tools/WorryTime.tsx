'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import {
  MAX_NOTE_LENGTH,
  MAX_WORRIES,
  saveWorries,
  useWorries,
} from '@/lib/toolNotes';
import { WORRY_TOPICS } from '@/lib/thoughts';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  chipClass,
  inputClass,
  panelClass,
  primaryClass,
  quietClass,
  secondaryClass,
} from './toolStyles';

/**
 * Worry time: save worries as they come, by tapping a common one or writing
 * it, then in a set 15 minutes ask of each one whether there is a step to
 * take. Worries are kept only on this
 * phone until they are dealt with; the steps aren't kept at all.
 */

const copy = {
  en: {
    label: 'Worry time',
    intro:
      'Write worries down when they come. Then deal with them in your worry time, 15 minutes at the same time each day.',
    topicsLabel: "What's on your mind? Tap to save it.",
    addLabel: 'Or write your own',
    add: 'Save it for worry time',
    count: (n: number) =>
      n === 0
        ? 'No worries saved yet.'
        : `${n} ${n === 1 ? 'worry' : 'worries'} saved for your worry time.`,
    privacy: 'Saved only on this phone.',
    start: 'Start my worry time',
    clear: 'Clear the list',
    close: 'Close',
    reviewOf: (i: number, n: number) => `Worry ${i} of ${n}`,
    ask: 'Can you do something about this?',
    yes: 'Yes',
    no: 'No, let it go for today',
    stepLabel: 'One small step you can take',
    stepIdeas: [
      'Write down the first step',
      'Ask someone for help',
      'Find out one fact',
      'Pick a time to deal with it',
      'Pray about it',
    ],
    saveStep: 'Next',
    doneTitle: 'Worry time done.',
    doneText:
      "When new worries come, write them here and leave them until tomorrow's worry time.",
    stepsTitle: 'Your steps',
    nextTime: 'worry keeps coming back during the day',
  },
  tl: {
    label: 'Worry time',
    intro:
      'Isulat ang mga pag-aalala kapag dumating. Tapos harapin ang mga ito sa worry time mo, 15 minuto sa parehong oras araw-araw.',
    topicsLabel: 'Ano ang nasa isip mo? I-tap para itabi.',
    addLabel: 'O isulat ang sa iyo',
    add: 'Itabi para sa worry time',
    count: (n: number) =>
      n === 0
        ? 'Wala pang naitabing pag-aalala.'
        : `${n} na pag-aalala ang nakatabi para sa worry time mo.`,
    privacy: 'Naka-save lang sa phone na ito.',
    start: 'Simulan ang worry time ko',
    clear: 'Burahin ang listahan',
    close: 'Isara',
    reviewOf: (i: number, n: number) => `Pag-aalala ${i} sa ${n}`,
    ask: 'May magagawa ka ba tungkol dito?',
    yes: 'Oo',
    no: 'Wala, bibitawan ko muna ngayong araw',
    stepLabel: 'Isang maliit na hakbang na kaya mong gawin',
    stepIdeas: [
      'Isulat ang unang hakbang',
      'Humingi ng tulong sa isang tao',
      'Alamin ang isang detalye',
      'Pumili ng oras para harapin ito',
      'Ipagdasal ito',
    ],
    saveStep: 'Susunod',
    doneTitle: 'Tapos na ang worry time.',
    doneText:
      'Kapag may bagong pag-aalala, isulat dito at iwan muna hanggang sa worry time bukas.',
    stepsTitle: 'Ang mga hakbang mo',
    nextTime: 'paulit-ulit na bumabalik ang pag-aalala sa maghapon',
  },
  fr: {
    label: 'Le moment pour s’inquiéter',
    intro:
      'Note tes soucis quand ils arrivent. Ensuite, occupe-t’en pendant le moment pour s’inquiéter : 15 minutes, à la même heure chaque jour.',
    topicsLabel: 'Qu’est-ce qui te tracasse ? Touche pour le garder.',
    addLabel: 'Ou écris avec tes mots',
    add: 'Le garder pour le moment prévu',
    count: (n: number) =>
      n === 0
        ? 'Aucun souci gardé pour l’instant.'
        : `${n} ${n === 1 ? 'souci' : 'soucis'} en attente de ton moment pour t’inquiéter.`,
    privacy: 'Tout reste sur ce téléphone.',
    start: 'Commencer mon moment pour m’inquiéter',
    clear: 'Vider la liste',
    close: 'Fermer',
    reviewOf: (i: number, n: number) => `Souci ${i} sur ${n}`,
    ask: 'Est-ce que tu peux y faire quelque chose ?',
    yes: 'Oui',
    no: 'Non, je laisse tomber pour aujourd’hui',
    stepLabel: 'Un petit pas que tu peux faire',
    stepIdeas: [
      'Noter la première étape',
      'Demander de l’aide à quelqu’un',
      'Vérifier une information',
      'Choisir un moment pour s’en occuper',
      'Prier pour ça',
    ],
    saveStep: 'Suivant',
    doneTitle: 'Le moment pour s’inquiéter est terminé.',
    doneText:
      'Quand de nouveaux soucis arrivent, note-les ici et laisse-les attendre jusqu’au moment pour s’inquiéter de demain.',
    stepsTitle: 'Tes prochains pas',
    nextTime: 'l’inquiétude revient sans cesse dans la journée',
  },
  de: {
    label: 'Sorgenzeit',
    intro:
      'Schreib Sorgen auf, wenn sie kommen. Kümmere dich dann in deiner Sorgenzeit darum, jeden Tag 15 Minuten zur gleichen Uhrzeit.',
    topicsLabel: 'Was beschäftigt dich? Tippe an, um es zu speichern.',
    addLabel: 'Oder schreib selbst etwas',
    add: 'Für die Sorgenzeit speichern',
    count: (n: number) =>
      n === 0
        ? 'Noch keine Sorgen gespeichert.'
        : `${n} ${n === 1 ? 'Sorge' : 'Sorgen'} für deine Sorgenzeit gespeichert.`,
    privacy: 'Nur auf diesem Handy gespeichert.',
    start: 'Meine Sorgenzeit starten',
    clear: 'Liste leeren',
    close: 'Schließen',
    reviewOf: (i: number, n: number) => `Sorge ${i} von ${n}`,
    ask: 'Kannst du etwas daran ändern?',
    yes: 'Ja',
    no: 'Nein, für heute loslassen',
    stepLabel: 'Ein kleiner Schritt, den du gehen kannst',
    stepIdeas: [
      'Den ersten Schritt aufschreiben',
      'Jemanden um Hilfe bitten',
      'Eine Sache herausfinden',
      'Eine Zeit festlegen, um es anzugehen',
      'Darüber beten',
    ],
    saveStep: 'Weiter',
    doneTitle: 'Die Sorgenzeit ist vorbei.',
    doneText:
      'Wenn neue Sorgen kommen, schreib sie hier auf und lass sie bis zur Sorgenzeit morgen liegen.',
    stepsTitle: 'Deine Schritte',
    nextTime: 'die Sorgen tagsüber immer wiederkommen',
  },
  es: {
    label: 'Tiempo para preocuparte',
    intro:
      'Escribe tus preocupaciones cuando lleguen. Luego atiéndelas en tu tiempo para preocuparte: 15 minutos, a la misma hora cada día.',
    topicsLabel: '¿Qué te preocupa? Tócalo para guardarlo.',
    addLabel: 'O escribe con tus palabras',
    add: 'Guardar para ese momento',
    count: (n: number) =>
      n === 0
        ? 'Todavía no hay preocupaciones guardadas.'
        : `${n} ${n === 1 ? 'preocupación espera' : 'preocupaciones esperan'} tu tiempo para preocuparte.`,
    privacy: 'Se guarda solo en este celular.',
    start: 'Empezar mi tiempo para preocuparme',
    clear: 'Borrar la lista',
    close: 'Cerrar',
    reviewOf: (i: number, n: number) => `Preocupación ${i} de ${n}`,
    ask: '¿Puedes hacer algo al respecto?',
    yes: 'Sí',
    no: 'No, soltarlo por hoy',
    stepLabel: 'Un pasito que puedes dar',
    stepIdeas: [
      'Escribir el primer paso',
      'Pedirle ayuda a alguien',
      'Averiguar un dato',
      'Elegir un momento para resolverlo',
      'Orar por esto',
    ],
    saveStep: 'Siguiente',
    doneTitle: 'Terminó tu tiempo para preocuparte.',
    doneText:
      'Cuando lleguen nuevas preocupaciones, escríbelas aquí y déjalas para tu tiempo para preocuparte de mañana.',
    stepsTitle: 'Tus pasos',
    nextTime: 'la preocupación vuelva una y otra vez durante el día',
  },
  ko: {
    label: '걱정 시간',
    intro:
      '걱정이 떠오르면 적어 두세요. 그리고 매일 같은 시간에 15분 동안, 걱정 시간에 다뤄요.',
    topicsLabel: '무슨 걱정이 있나요? 누르면 저장돼요.',
    addLabel: '아니면 직접 적어 보세요',
    add: '걱정 시간까지 저장하기',
    count: (n: number) =>
      n === 0
        ? '아직 저장한 걱정이 없어요.'
        : `걱정 시간을 위해 걱정 ${n}개를 저장했어요.`,
    privacy: '이 휴대폰에만 저장돼요.',
    start: '걱정 시간 시작하기',
    clear: '목록 지우기',
    close: '닫기',
    reviewOf: (i: number, n: number) => `걱정 ${n}개 중 ${i}번째`,
    ask: '이 걱정에 대해 할 수 있는 일이 있나요?',
    yes: '네',
    no: '아니요, 오늘은 내려놓을래요',
    stepLabel: '내가 할 수 있는 작은 한 걸음',
    stepIdeas: [
      '첫 단계 적어 보기',
      '누군가에게 도움 청하기',
      '사실 하나 알아보기',
      '해결할 시간 정하기',
      '이 일을 두고 기도하기',
    ],
    saveStep: '다음',
    doneTitle: '걱정 시간이 끝났어요.',
    doneText:
      '새로운 걱정이 생기면 여기에 적고, 내일 걱정 시간까지 놓아두세요.',
    stepsTitle: '해 볼 일',
    nextTime: '낮 동안 걱정이 자꾸 되돌아올 때',
  },
};

export function WorryTime({
  onClose,
  lang = 'en',
  source,
  onFinish,
  doneNote,
}: {
  onClose: () => void;
  lang?: FeelingLang;
  source: ToolSource;
  onFinish?: () => void;
  doneNote?: string;
}) {
  const t = copy[lang];
  const worries = useWorries();
  const [draft, setDraft] = useState('');
  // The worries being gone through, fixed when worry time starts.
  const [review, setReview] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlanning, setIsPlanning] = useState(false);
  const [step, setStep] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_worry-time_start_${source}`);
  }, [source]);

  const add = (text = draft.trim()) => {
    if (!text || worries.length >= MAX_WORRIES || worries.includes(text)) {
      return;
    }
    analyticsService.recordClick(`tool_worry-time_add_${source}`);
    saveWorries([...worries, text]);
    setDraft('');
  };

  // Each worry is dealt with: off the list, with or without a step.
  const next = (newStep?: string) => {
    if (!review) return;
    const current = review[index];
    saveWorries(worries.filter((worry) => worry !== current));
    if (newStep) setSteps((list) => [...list, newStep]);
    setIsPlanning(false);
    setStep('');
    if (index + 1 < review.length) {
      setIndex(index + 1);
      return;
    }
    analyticsService.recordClick(`tool_worry-time_done_${source}`);
    onFinish?.();
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div>
        {steps.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#DFE7CF] bg-white p-5 text-[#6E5F47]">
            <p className="font-poppins font-bold">{t.stepsTitle}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-[#AEC488]">
              {steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <ToolFinish
          kind="worry-time"
          lang={lang}
          source={source}
          title={t.doneTitle}
          text={t.doneText}
          doneNote={doneNote}
          nextTime={t.nextTime}
          onClose={onClose}
        />
      </div>
    );
  }

  if (review) {
    const worry = review[index];
    return (
      <div
        ref={boxRef}
        tabIndex={-1}
        role="group"
        aria-label={t.label}
        className={panelClass}
      >
        <p className="text-sm">{t.reviewOf(index + 1, review.length)}</p>
        <p className="mt-1 font-poppins font-bold text-lg" aria-live="polite">
          {worry}
        </p>
        {isPlanning ? (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              next(step.trim() || undefined);
            }}
          >
            <p className="text-sm font-bold">{t.stepLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {t.stepIdeas.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => next(idea)}
                  className={chipClass}
                >
                  {idea}
                </button>
              ))}
            </div>
            <label htmlFor="worry-step" className="mt-4 block text-sm">
              {t.addLabel}
            </label>
            <input
              id="worry-step"
              value={step}
              maxLength={MAX_NOTE_LENGTH}
              onChange={(event) => setStep(event.target.value)}
              className={`mt-2 ${inputClass}`}
            />
            <button type="submit" className={`mt-3 ${primaryClass}`}>
              {t.saveStep}
            </button>
          </form>
        ) : (
          <>
            <p className="mt-4">{t.ask}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsPlanning(true)}
                className={secondaryClass}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => next()}
                className={secondaryClass}
              >
                {t.no}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className={panelClass}
    >
      <p className="leading-relaxed">{t.intro}</p>
      <p className="mt-4 text-sm font-bold">{t.topicsLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {WORRY_TOPICS.map((topic) => {
          const isSaved = worries.includes(topic[lang]);
          return (
            <button
              key={topic.en}
              type="button"
              aria-pressed={isSaved}
              disabled={isSaved || worries.length >= MAX_WORRIES}
              onClick={() => add(topic[lang])}
              className={`${chipClass} disabled:cursor-default`}
            >
              {topic[lang]}
            </button>
          );
        })}
      </div>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <label htmlFor="worry-new" className="text-sm">
          {t.addLabel}
        </label>
        <input
          id="worry-new"
          autoComplete="off"
          value={draft}
          maxLength={MAX_NOTE_LENGTH}
          onChange={(event) => setDraft(event.target.value)}
          className={`mt-2 ${inputClass}`}
        />
        <button
          type="submit"
          disabled={!draft.trim() || worries.length >= MAX_WORRIES}
          className={`mt-2 ${secondaryClass}`}
        >
          {t.add}
        </button>
      </form>
      <p className="mt-4 text-sm" aria-live="polite">
        {t.count(worries.length)} {worries.length > 0 && t.privacy}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={worries.length === 0}
          onClick={() => {
            setReview(worries);
            setIndex(0);
          }}
          className={primaryClass}
        >
          {t.start}
        </button>
        {worries.length > 0 && (
          <button
            type="button"
            onClick={() => saveWorries([])}
            className={quietClass}
          >
            {t.clear}
          </button>
        )}
        <button type="button" onClick={onClose} className={quietClass}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
