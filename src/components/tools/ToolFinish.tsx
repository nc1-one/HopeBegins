'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, Plus } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { buildPlan } from '@/lib/actionPlan';
import { updatePlan, useSavedPlan } from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { pathIn } from '@/lib/taglishTwins';
import { recordToolCheck, type Felt } from '@/lib/toolChecks';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { CallCrisisButton } from '@/components/help/Crisis';

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
    close: 'Isara',
  },
  fr: {
    question: 'Par rapport à avant, comment te sens-tu ?',
    felt: {
      calmer: 'Plus calme',
      same: 'À peu près pareil',
      worse: 'Moins bien',
    },
    when: {
      breathe: 'ta poitrine se serre ou que tes pensées s’emballent',
      ground: 'l’inquiétude ou la panique commence à monter',
    },
    calmer: (when: string) =>
      `Bien. La prochaine fois, reviens-y quand ${when}.`,
    same: 'Ça arrive. Les outils marchent souvent mieux après quelques jours d’entraînement. Réessaie plus tard dans la journée.',
    worse:
      'Merci de nous le dire. Arrête-toi pour l’instant et fais quelque chose de doux. Si c’est trop lourd, parle à quelqu’un.',
    keep: 'Ajouter à mes 4 semaines',
    kept: 'Ajouté à tes 4 semaines.',
    makePlan: 'Faire un plan gratuit avec cet outil',
    ecoach: 'Parler à quelqu’un',
    close: 'Fermer',
  },
  de: {
    question: 'Wie fühlst du dich im Vergleich zu vorher?',
    felt: { calmer: 'Ruhiger', same: 'Ungefähr gleich', worse: 'Schlechter' },
    when: {
      breathe: 'dir die Brust eng wird oder deine Gedanken rasen',
      ground: 'Sorgen oder Panik in dir aufsteigen',
    },
    calmer: (when: string) =>
      `Gut. Komm beim nächsten Mal wieder darauf zurück, wenn ${when}.`,
    same: 'Das kommt vor. Übungen wirken oft besser, wenn du sie ein paar Tage lang machst. Versuch es heute später noch einmal.',
    worse:
      'Danke, dass du es uns sagst. Hör erst einmal auf und mach etwas, das dir guttut. Wenn es zu viel wird, sprich mit jemandem.',
    keep: 'Zu meinen 4 Wochen hinzufügen',
    kept: 'Zu deinen 4 Wochen hinzugefügt.',
    makePlan: 'Mit dieser Übung einen kostenlosen Plan machen',
    ecoach: 'Mit jemandem reden',
    close: 'Schließen',
  },
  es: {
    question: 'Comparado con antes de empezar, ¿cómo te sientes?',
    felt: { calmer: 'Con más calma', same: 'Más o menos igual', worse: 'Peor' },
    when: {
      breathe: 'sientas el pecho apretado o se te acelere la mente',
      ground: 'la preocupación o el pánico empiecen a crecer',
    },
    calmer: (when: string) => `Qué bien. Vuelve a esto cada vez que ${when}.`,
    same: 'Eso pasa. Las herramientas suelen funcionar mejor después de unos días de práctica. Vuelve a intentarlo más tarde hoy.',
    worse:
      'Gracias por decírnoslo. Detente por ahora y haz algo tranquilo. Si sientes que es demasiado, habla con alguien.',
    keep: 'Agregar a mis 4 semanas',
    kept: 'Agregado a tus 4 semanas.',
    makePlan: 'Haz un plan gratuito con esta herramienta',
    ecoach: 'Hablar con alguien',
    close: 'Cerrar',
  },
  ko: {
    question: '시작하기 전과 비교해서 기분이 어때요?',
    felt: { calmer: '더 차분해요', same: '비슷해요', worse: '더 안 좋아요' },
    when: {
      breathe: '가슴이 답답하거나 생각이 꼬리에 꼬리를 물 때',
      ground: '걱정이나 공황이 밀려오기 시작할 때',
    },
    calmer: (when: string) => `좋아요. 다음에 ${when} 다시 해 보세요.`,
    same: '그럴 수 있어요. 도구는 며칠 연습하고 나면 더 잘 듣는 경우가 많아요. 오늘 이따가 다시 해 보세요.',
    worse:
      '말해 줘서 고마워요. 지금은 멈추고 편안한 일을 해 보세요. 너무 버겁게 느껴지면 누군가와 이야기해 보세요.',
    keep: '내 4주 계획에 추가하기',
    kept: '4주 계획에 추가했어요.',
    makePlan: '이 도구로 무료 계획 만들기',
    ecoach: '누군가와 이야기하기',
    close: '닫기',
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
  children,
  onClose,
}: {
  /** The tool's id, which is also its id in the plan. */
  kind: string;
  lang: FeelingLang;
  source: ToolSource;
  title: string;
  text: string;
  doneNote?: string;
  /**
   * "Come back to it next time …", for tools other than breathing and
   * grounding. It goes after "quand" in French, after "wenn" in German (so
   * the verb comes last), after "cada vez que" in Spanish, and in Korean it
   * ends with 때.
   */
  nextTime?: string;
  /** Ask how they feel. Off for tools that are about writing, not relief. */
  ask?: boolean;
  /** Anything the tool adds under its own text, like the thought it found. */
  children?: React.ReactNode;
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
      {children}

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
              href={pathIn('/action-plan', lang)}
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
              <CallCrisisButton lang={lang} className={secondaryClass} />
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
