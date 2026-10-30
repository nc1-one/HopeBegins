'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
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
import { CallCrisisButton, CrisisSentence } from '@/components/help/Crisis';

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
        text: 'You said you have had thoughts of ending your life or hurting yourself. Please call a crisis line now. They are free and they answer day and night.',
      },
    },
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
        text: 'Sinabi mong naiisip mong tapusin ang buhay mo o saktan ang sarili mo. Tumawag ngayon sa isang crisis line. Libre ito at may sumasagot araw at gabi.',
      },
    },
    ecoach: 'Kausapin ang e-coach',
    openCard: 'Buksan ang Hope Card ko',
    yourTool: 'Ang tool mo',
    restart: 'Magsimula ng panibagong 4 na linggo',
    fullCheckIn: 'Sagutan ang buong check-in at gumawa ng safety plan',
    toPlan: 'Bumalik sa plano ko',
  },
  fr: {
    title: 'Bilan d’une minute',
    questionOf: (n: number, total: number) => `Question ${n} sur ${total}`,
    previous: 'Précédent',
    warningPrompt:
      'As-tu remarqué tes signaux d’alerte ces 2 dernières semaines ?',
    yourSigns: 'Les tiens :',
    warningOptions: {
      no: 'Pas du tout',
      little: 'Un peu',
      often: 'Oui, souvent',
    },
    scores: (mood: number, worry: number) =>
      `Moral bas ${mood} sur 6 · Inquiétude ${worry} sur 6`,
    lastTime: (mood: number, worry: number) =>
      `La dernière fois : moral bas ${mood}, inquiétude ${worry}.`,
    results: {
      steady: {
        title: 'Tu tiens bon.',
        text: 'Garde ton outil pour les jours où tu en as besoin. On refera le point le mois prochain.',
      },
      watch: {
        title: 'Quelques signes apparaissent.',
        text: 'C’est le moment de reprendre ton outil, avant que ça devienne plus lourd. Essaie-le chaque jour cette semaine.',
      },
      returning: {
        title: 'On dirait que ça revient.',
        text: 'Tu as déjà traversé ça, et tu sais ce qui a marché pour toi. Repars pour 4 semaines avec ton outil, parles-en à l’une de tes deux personnes et appelle une ligne d’écoute gratuite cette semaine. Si tes scores restent élevés, va voir un psy.',
      },
      safety: {
        title: 'Parle à quelqu’un maintenant.',
        text: 'Tu as dit avoir pensé à mettre fin à ta vie ou à te faire du mal. Appelle une ligne de crise maintenant, s’il te plaît. C’est gratuit, et quelqu’un répond jour et nuit.',
      },
    },
    ecoach: 'Parler à quelqu’un',
    openCard: 'Ouvrir ma carte d’espoir',
    yourTool: 'Ton outil',
    restart: 'Repartir pour 4 semaines',
    fullCheckIn: 'Faire le bilan complet et un plan de sécurité',
    toPlan: 'Retour à mon plan',
  },
  de: {
    title: '1-Minuten-Check-in',
    questionOf: (n: number, total: number) => `Frage ${n} von ${total}`,
    previous: 'Zurück',
    warningPrompt: 'Hast du in den letzten 2 Wochen deine Warnzeichen bemerkt?',
    yourSigns: 'Deine:',
    warningOptions: {
      no: 'Gar nicht',
      little: 'Ein bisschen',
      often: 'Ja, oft',
    },
    scores: (mood: number, worry: number) =>
      `Gedrückte Stimmung ${mood} von 6 · Sorgen ${worry} von 6`,
    lastTime: (mood: number, worry: number) =>
      `Letztes Mal: gedrückte Stimmung ${mood}, Sorgen ${worry}.`,
    results: {
      steady: {
        title: 'Es geht dir stabil.',
        text: 'Behalte deine Übung für die Tage, an denen du sie brauchst. Nächsten Monat schauen wir wieder, wie es dir geht.',
      },
      watch: {
        title: 'Ein paar Anzeichen zeigen sich.',
        text: 'Jetzt ist die Zeit, deine Übung wieder zu machen, bevor es schwerer wird. Mach sie diese Woche jeden Tag.',
      },
      returning: {
        title: 'Es sieht so aus, als käme es zurück.',
        text: 'Du hast das schon einmal geschafft, und du weißt, was geholfen hat. Starte noch einmal 4 Wochen mit deiner Übung, erzähl einem deiner beiden Menschen davon und ruf diese Woche bei einer kostenlosen Telefonberatung an. Wenn deine Werte hoch bleiben, hol dir psychologische Hilfe.',
      },
      safety: {
        title: 'Bitte sprich jetzt mit jemandem.',
        text: 'Du hast gesagt, dass du daran gedacht hast, dir das Leben zu nehmen oder dich zu verletzen. Bitte ruf jetzt ein Krisentelefon an. Es ist kostenlos, und Tag und Nacht geht jemand ran.',
      },
    },
    ecoach: 'Mit jemandem reden',
    openCard: 'Meine Hoffnungskarte öffnen',
    yourTool: 'Deine Übung',
    restart: 'Noch einmal 4 Wochen starten',
    fullCheckIn:
      'Den ganzen Check-in machen und einen Sicherheitsplan erstellen',
    toPlan: 'Zurück zu meinem Plan',
  },
  es: {
    title: 'Check-in de 1 minuto',
    questionOf: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    previous: 'Anterior',
    warningPrompt:
      '¿Has notado tus señales de alerta en las últimas 2 semanas?',
    yourSigns: 'Las tuyas:',
    warningOptions: {
      no: 'Para nada',
      little: 'Un poco',
      often: 'Sí, a menudo',
    },
    scores: (mood: number, worry: number) =>
      `Ánimo bajo ${mood} de 6 · Preocupación ${worry} de 6`,
    lastTime: (mood: number, worry: number) =>
      `La vez anterior: ánimo bajo ${mood}, preocupación ${worry}.`,
    results: {
      steady: {
        title: 'Te mantienes estable.',
        text: 'Guarda tu herramienta para los días en que la necesites. Volveremos a preguntarte el próximo mes.',
      },
      watch: {
        title: 'Aparecen algunas señales.',
        text: 'Es momento de volver a usar tu herramienta, antes de que se ponga más pesado. Úsala todos los días esta semana.',
      },
      returning: {
        title: 'Parece que está regresando.',
        text: 'Ya has salido de esto antes y sabes qué te ayudó. Empieza otras 4 semanas con tu herramienta, cuéntale a una de tus dos personas y habla esta semana con alguien de una línea de ayuda gratuita. Si tus puntajes siguen altos, busca a un psicólogo.',
      },
      safety: {
        title: 'Por favor, habla con alguien ahora.',
        text: 'Dijiste que has pensado en quitarte la vida o en hacerte daño. Por favor, llama ahora a una línea de crisis. Es gratis y contestan de día y de noche.',
      },
    },
    ecoach: 'Hablar con alguien',
    openCard: 'Abrir mi tarjeta de esperanza',
    yourTool: 'Tu herramienta',
    restart: 'Empezar otras 4 semanas',
    fullCheckIn: 'Hacer el check-in completo y un plan de seguridad',
    toPlan: 'Volver a mi plan',
  },
  ko: {
    title: '1분 체크인',
    questionOf: (n: number, total: number) => `질문 ${n}/${total}`,
    previous: '이전',
    warningPrompt: '지난 2주 동안 내 경고 신호를 알아차린 적이 있나요?',
    yourSigns: '내 경고 신호:',
    warningOptions: {
      no: '전혀 없었어요',
      little: '조금 있었어요',
      often: '네, 자주 있었어요',
    },
    scores: (mood: number, worry: number) =>
      `가라앉은 기분 ${mood}/6 · 걱정 ${worry}/6`,
    lastTime: (mood: number, worry: number) =>
      `지난번: 가라앉은 기분 ${mood}, 걱정 ${worry}.`,
    results: {
      steady: {
        title: '잘 버티고 있어요.',
        text: '필요한 날을 위해 내 도구를 계속 챙겨 두세요. 다음 달에 다시 확인해요.',
      },
      watch: {
        title: '몇 가지 신호가 보여요.',
        text: '더 무거워지기 전에 내 도구를 다시 쓸 때예요. 이번 주에는 매일 해 보세요.',
      },
      returning: {
        title: '다시 시작되는 것 같아요.',
        text: '전에도 이겨 낸 적이 있고, 무엇이 도움이 됐는지도 알고 있어요. 내 도구로 4주를 다시 시작하고, 정해 둔 두 사람 중 한 명에게 이야기하고, 이번 주에 무료 상담 전화로 이야기해 보세요. 점수가 계속 높으면 상담사를 만나 보세요.',
      },
      safety: {
        title: '지금 누군가와 이야기해 주세요.',
        text: '스스로 목숨을 끊거나 자신을 해치는 생각을 했다고 답했어요. 지금 위기 상담 전화에 연락해 주세요. 무료이고, 밤낮으로 전화를 받아요.',
      },
    },
    ecoach: '누군가와 이야기하기',
    openCard: '내 희망 카드 열기',
    yourTool: '내 도구',
    restart: '4주 다시 시작하기',
    fullCheckIn: '전체 체크인을 하고 안전 계획 세우기',
    toPlan: '내 계획으로 돌아가기',
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
          {result === 'safety' && (
            <p className="mt-3 leading-relaxed">
              <CrisisSentence lang={lang} />
            </p>
          )}
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
            <CallCrisisButton lang={lang} className={primaryClass} />
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
