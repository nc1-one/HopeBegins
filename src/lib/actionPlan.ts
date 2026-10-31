import type { FeelingLang } from './feelingPages';
import type { PerLang } from './i18n';

/**
 * Hopeful Beginning Plan: the check-in questions and the rules that turn
 * answers into a personal self-help plan, in every language the site speaks.
 *
 * - Mood and anxiety use the PHQ-2 and GAD-2 screening items (free to use).
 *   A score of 3+ on either flags that a professional check-up is worth it.
 * - The safety item is PHQ-9 item 9. Any answer other than "Not at all" puts a
 *   Stanley-Brown style safety plan first.
 * - Tools come from CBT self-help (worry time, sleep), behavioural activation
 *   (small scheduled actions for low mood), WHO "Doing What Matters in Times
 *   of Stress" (grounding, unhooking, acting on values) and safety planning.
 * - The Taglish screening items follow the Filipino PHQ and GAD wording; the
 *   founder reviews any change to them. The French, German, Spanish and
 *   Korean items follow the published PHQ and GAD translations, in the
 *   informal you, with the same answer scale.
 *
 * Answers never leave the browser. Only the finished plan is sent, and only
 * when the visitor asks for it by email.
 */

export type PlanLang = FeelingLang;

// May Himala Everyday's Facebook page. Phones open the Messenger app through
// m.me; computers open the page's chat on facebook.com, where most people are
// already signed in (m.me on a computer lands on a separate messenger.com login).
export const ECOACH_PAGE_ID = '352008124672499';
export const ECOACH_APP_URL = `https://m.me/${ECOACH_PAGE_ID}`;
export const ECOACH_WEB_URL = `https://www.facebook.com/messages/t/${ECOACH_PAGE_ID}`;
export const WAR_ROOM_URL = 'https://warroom.hopebegins.today';

/** How long the habit tracker runs. */
export const PLAN_DAYS = 28;

export type QuestionKey =
  | 'down'
  | 'interest'
  | 'nervous'
  | 'worry'
  | 'sleep'
  | 'weight'
  | 'support'
  | 'faith'
  | 'safety';

export interface Question {
  key: QuestionKey;
  stem?: string;
  prompt: string;
  note?: string;
  options: { value: string; label: string }[];
}

export type Answers = Partial<Record<QuestionKey, string>>;

export type TimeOfDay = 'morning' | 'midday' | 'evening' | 'bedtime';

export const TIME_LABELS: Record<PlanLang, Record<TimeOfDay, string>> = {
  en: {
    morning: 'Every morning',
    midday: 'Every afternoon',
    evening: 'Every evening',
    bedtime: 'Before bed',
  },
  tl: {
    morning: 'Tuwing umaga',
    midday: 'Tuwing hapon',
    evening: 'Tuwing gabi',
    bedtime: 'Bago matulog',
  },
  fr: {
    morning: 'Chaque matin',
    midday: 'Chaque après-midi',
    evening: 'Chaque soir',
    bedtime: 'Avant de dormir',
  },
  de: {
    morning: 'Jeden Morgen',
    midday: 'Jeden Nachmittag',
    evening: 'Jeden Abend',
    bedtime: 'Vor dem Schlafengehen',
  },
  es: {
    morning: 'Cada mañana',
    midday: 'Cada tarde',
    evening: 'Cada noche',
    bedtime: 'Antes de dormir',
  },
  ko: {
    morning: '매일 아침',
    midday: '매일 오후',
    evening: '매일 저녁',
    bedtime: '자기 전에',
  },
};

/** The guided tools that can run right on the page. */
export type PlanExercise =
  | 'breathe'
  | 'ground'
  | 'one-thing'
  | 'worry-time'
  | 'unhook'
  | 'reasons'
  | 'message';

export interface PlanItem {
  id: string;
  title: string;
  detail: string;
  steps?: string[];
  href?: string;
  linkLabel?: string;
  /** Show the crisis lines for the visitor's country instead of the detail. */
  crisisLines?: boolean;
  /**
   * Daily tools: the commitment in the user's week. English reads after
   * "I will"; the other languages are the whole first-person clause that
   * follows the time (in German it starts with the verb).
   */
  action?: string;
  defaultTime?: TimeOfDay;
  /** Daily tools with a guided version on the page. */
  /** A guided version of the tool that runs on the page. */
  exercise?: PlanExercise;
}

export interface PlanSection {
  id: string;
  heading: string;
  intro?: string;
  items: PlanItem[];
}

export interface Plan {
  summary: string[];
  needsSafetyPlan: boolean;
  suggestProfessional: boolean;
  sections: PlanSection[];
  /**
   * Every daily tool, recommended or not, so a tool someone added to their
   * 4 weeks stays there after a new check-in stops recommending it.
   */
  allTools: PlanItem[];
}

/** "Every evening, I will plan one small thing for tomorrow." */
export function commitmentSentence(
  item: PlanItem,
  time: TimeOfDay,
  lang: PlanLang
) {
  const when = TIME_LABELS[lang][time];
  if (lang === 'en') return `${when}, I will ${item.action}.`;
  // "Jeden Abend plane ich …" and "매일 저녁 … 정할게요" take no comma.
  if (lang === 'de' || lang === 'ko') return `${when} ${item.action}.`;
  return `${when}, ${item.action}.`;
}

type Words = PerLang<string>;

const TWO_WEEKS: Words = {
  en: 'Over the last 2 weeks, how often have you been bothered by:',
  tl: 'Sa nakaraang 2 linggo, gaano kadalas mong naranasan ang:',
  fr: 'Au cours des 2 dernières semaines, à quelle fréquence as-tu vécu ceci :',
  de: 'Wie oft fühltest du dich im Verlauf der letzten 2 Wochen durch die folgenden Beschwerden beeinträchtigt?',
  es: 'Durante las últimas 2 semanas, ¿qué tan seguido has tenido molestias debido a los siguientes problemas?',
  ko: '지난 2주 동안 아래와 같은 일로 얼마나 자주 힘들었나요?',
};

const frequency: { value: string; label: Words }[] = [
  {
    value: '0',
    label: {
      en: 'Not at all',
      tl: 'Hindi kailanman',
      fr: 'Jamais',
      de: 'Überhaupt nicht',
      es: 'Ningún día',
      ko: '전혀 없었어요',
    },
  },
  {
    value: '1',
    label: {
      en: 'Several days',
      tl: 'Ilang araw',
      fr: 'Plusieurs jours',
      de: 'An einzelnen Tagen',
      es: 'Varios días',
      ko: '며칠 그랬어요',
    },
  },
  {
    value: '2',
    label: {
      en: 'More than half the days',
      tl: 'Higit sa kalahati ng mga araw',
      fr: 'Plus de la moitié des jours',
      de: 'An mehr als der Hälfte der Tage',
      es: 'Más de la mitad de los días',
      ko: '절반이 넘는 날 그랬어요',
    },
  },
  {
    value: '3',
    label: {
      en: 'Nearly every day',
      tl: 'Halos araw-araw',
      fr: 'Presque tous les jours',
      de: 'Beinahe jeden Tag',
      es: 'Casi todos los días',
      ko: '거의 매일 그랬어요',
    },
  },
];

const questionText: {
  key: QuestionKey;
  stem?: Words;
  prompt: Words;
  note?: Words;
  options: { value: string; label: Words }[];
}[] = [
  {
    key: 'down',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Feeling down, depressed or hopeless',
      tl: 'Pakiramdam na malungkot, depressed, o wala nang pag-asa',
      fr: 'Sentiment de tristesse, de déprime ou de désespoir',
      de: 'Niedergeschlagenheit, Schwermut oder Hoffnungslosigkeit',
      es: 'Desánimo, depresión o falta de esperanza',
      ko: '기분이 가라앉거나, 우울하거나, 희망이 없음',
    },
    options: frequency,
  },
  {
    key: 'interest',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Little interest or pleasure in doing things',
      tl: 'Kaunti o walang gana o saya sa paggawa ng mga bagay',
      fr: 'Peu d’intérêt ou de plaisir à faire les choses',
      de: 'Wenig Interesse oder Freude an deinen Tätigkeiten',
      es: 'Poco interés o placer en hacer cosas',
      ko: '일 또는 여가 활동을 하는 데 흥미나 즐거움을 느끼지 못함',
    },
    options: frequency,
  },
  {
    key: 'nervous',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Feeling nervous, anxious or on edge',
      tl: 'Kinakabahan, balisa, o hindi mapakali',
      fr: 'Sentiment de nervosité, d’anxiété ou de tension',
      de: 'Nervosität, Ängstlichkeit oder Anspannung',
      es: 'Nerviosismo, ansiedad o nervios de punta',
      ko: '초조하거나 불안하거나 조마조마하게 느낌',
    },
    options: frequency,
  },
  {
    key: 'worry',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Not being able to stop or control worrying',
      tl: 'Hindi mapigilan o makontrol ang pag-aalala',
      fr: 'Ne pas arriver à arrêter de t’inquiéter ni à contrôler tes inquiétudes',
      de: 'Nicht in der Lage sein, Sorgen zu stoppen oder zu kontrollieren',
      es: 'No poder dejar de preocuparte ni controlar tus preocupaciones',
      ko: '걱정하는 것을 멈추거나 조절할 수 없음',
    },
    options: frequency,
  },
  {
    key: 'sleep',
    prompt: {
      en: 'How have you been sleeping?',
      tl: 'Kumusta ang tulog mo nitong mga nakaraang araw?',
      fr: 'Comment dors-tu ces derniers temps ?',
      de: 'Wie schläfst du in letzter Zeit?',
      es: '¿Cómo has dormido últimamente?',
      ko: '요즘 잠은 어때요?',
    },
    options: [
      {
        value: 'fine',
        label: {
          en: 'Fine',
          tl: 'Okay naman',
          fr: 'Bien',
          de: 'Gut',
          es: 'Bien',
          ko: '괜찮아요',
        },
      },
      {
        value: 'little',
        label: {
          en: 'Hard to fall asleep or stay asleep',
          tl: 'Hirap makatulog o madalas magising',
          fr: 'J’ai du mal à m’endormir ou à dormir d’une traite',
          de: 'Ich schlafe schlecht ein oder nicht durch',
          es: 'Me cuesta dormirme o me despierto mucho',
          ko: '잠들기 어렵거나 자주 깨요',
        },
      },
      {
        value: 'much',
        label: {
          en: 'Sleeping too much',
          tl: 'Sobra ang tulog',
          fr: 'Je dors trop',
          de: 'Ich schlafe zu viel',
          es: 'Duermo demasiado',
          ko: '너무 많이 자요',
        },
      },
      {
        value: 'irregular',
        label: {
          en: 'Different every night',
          tl: 'Iba-iba gabi-gabi',
          fr: 'Ça change d’une nuit à l’autre',
          de: 'Jede Nacht anders',
          es: 'Cada noche es distinta',
          ko: '밤마다 달라요',
        },
      },
    ],
  },
  {
    key: 'weight',
    prompt: {
      en: "What's weighing on you most right now?",
      tl: 'Ano ang pinakamabigat sa loob mo ngayon?',
      fr: 'Qu’est-ce qui te pèse le plus en ce moment ?',
      de: 'Was belastet dich gerade am meisten?',
      es: '¿Qué es lo que más te pesa ahora mismo?',
      ko: '지금 가장 마음을 무겁게 하는 건 뭔가요?',
    },
    options: [
      {
        value: 'purpose',
        label: {
          en: 'Feeling lost or without purpose',
          tl: 'Pakiramdam na naliligaw o walang direksyon',
          fr: 'Ne plus savoir où aller ni pourquoi',
          de: 'Mich verloren oder ziellos fühlen',
          es: 'No encontrar rumbo ni propósito',
          ko: '방향이나 삶의 목적을 잃은 느낌',
        },
      },
      {
        value: 'family',
        label: {
          en: 'Family or relationships',
          tl: 'Pamilya o relasyon',
          fr: 'La famille ou les relations',
          de: 'Familie oder Beziehungen',
          es: 'La familia o las relaciones',
          ko: '가족이나 인간관계',
        },
      },
      {
        value: 'work',
        label: {
          en: 'Work or school',
          tl: 'Trabaho o school',
          fr: 'Le travail ou les études',
          de: 'Arbeit, Schule oder Studium',
          es: 'El trabajo o los estudios',
          ko: '일이나 학업',
        },
      },
      {
        value: 'money',
        label: {
          en: 'Money',
          tl: 'Pera',
          fr: 'L’argent',
          de: 'Geld',
          es: 'El dinero',
          ko: '돈 문제',
        },
      },
      {
        value: 'health',
        label: {
          en: 'My health',
          tl: 'Kalusugan ko',
          fr: 'Ma santé',
          de: 'Meine Gesundheit',
          es: 'Mi salud',
          ko: '내 건강',
        },
      },
      {
        value: 'grief',
        label: {
          en: 'Losing someone',
          tl: 'Pagkawala ng mahal sa buhay',
          fr: 'La perte d’un proche',
          de: 'Jemanden verloren haben',
          es: 'Perder a alguien',
          ko: '소중한 사람을 잃은 일',
        },
      },
      {
        value: 'lonely',
        label: {
          en: 'Feeling alone',
          tl: 'Pakiramdam na mag-isa',
          fr: 'La solitude',
          de: 'Mich allein fühlen',
          es: 'La soledad',
          ko: '외로움',
        },
      },
      {
        value: 'unsure',
        label: {
          en: "I'm not sure",
          tl: 'Hindi ako sigurado',
          fr: 'Je ne sais pas trop',
          de: 'Ich weiß nicht genau',
          es: 'No sé bien',
          ko: '잘 모르겠어요',
        },
      },
    ],
  },
  {
    key: 'support',
    prompt: {
      en: 'Is there someone you can talk to openly?',
      tl: 'May tao ka bang nakakausap nang bukas ang loob?',
      fr: 'As-tu quelqu’un à qui parler librement ?',
      de: 'Gibt es jemanden, mit dem du offen reden kannst?',
      es: '¿Tienes a alguien con quien hablar con confianza?',
      ko: '마음을 터놓고 이야기할 수 있는 사람이 있나요?',
    },
    options: [
      {
        value: 'yes',
        label: { en: 'Yes', tl: 'Oo', fr: 'Oui', de: 'Ja', es: 'Sí', ko: '네' },
      },
      {
        value: 'sometimes',
        label: {
          en: 'Sometimes',
          tl: 'Minsan',
          fr: 'Parfois',
          de: 'Manchmal',
          es: 'A veces',
          ko: '가끔요',
        },
      },
      {
        value: 'no',
        label: {
          en: 'Not really',
          tl: 'Wala talaga',
          fr: 'Pas vraiment',
          de: 'Eigentlich nicht',
          es: 'La verdad, no',
          ko: '딱히 없어요',
        },
      },
    ],
  },
  {
    key: 'faith',
    prompt: {
      en: 'Should faith be part of your plan?',
      tl: 'Gusto mo bang kasama ang faith sa plano mo?',
      fr: 'Veux-tu que la foi fasse partie de ton plan ?',
      de: 'Soll der Glaube Teil deines Plans sein?',
      es: '¿Quieres que la fe sea parte de tu plan?',
      ko: '계획에 신앙도 담을까요?',
    },
    options: [
      {
        value: 'yes',
        label: { en: 'Yes', tl: 'Oo', fr: 'Oui', de: 'Ja', es: 'Sí', ko: '네' },
      },
      {
        value: 'open',
        label: {
          en: "I'm open to it",
          tl: 'Bukas ako diyan',
          fr: 'Je veux bien',
          de: 'Ich bin offen dafür',
          es: 'Me interesa probar',
          ko: '마음은 열려 있어요',
        },
      },
      {
        value: 'no',
        label: {
          en: 'No, keep it general',
          tl: 'Hindi, general lang',
          fr: 'Non, plutôt un plan général',
          de: 'Nein, lieber allgemein',
          es: 'No, mejor algo general',
          ko: '아니요, 일반적인 내용으로 해 주세요',
        },
      },
    ],
  },
  {
    key: 'safety',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Thoughts that you would be better off dead, or of hurting yourself',
      tl: 'Mga isip na mas mabuti pang mamatay ka na, o saktan ang sarili mo',
      fr: 'Penser qu’il vaudrait mieux mourir, ou penser à te faire du mal',
      de: 'Gedanken, dass du lieber tot wärst oder dir Leid zufügen möchtest',
      es: 'Pensar que sería mejor morir, o pensar en hacerte daño',
      ko: '죽는 것이 더 낫겠다는 생각이나 자신을 해치는 생각',
    },
    note: {
      en: 'Your answer stays on this device. It tells us what to put first in your plan.',
      tl: 'Sa phone mo lang naka-save ang sagot mo. Ginagamit lang ito para malaman kung ano ang uunahin sa plano mo.',
      fr: 'Ta réponse reste sur cet appareil. Elle nous dit quoi mettre en premier dans ton plan.',
      de: 'Deine Antwort bleibt auf diesem Gerät. Sie zeigt uns, was in deinem Plan zuerst kommt.',
      es: 'Tu respuesta se queda en este dispositivo. Nos dice qué poner primero en tu plan.',
      ko: '답은 이 기기에만 남아요. 계획에서 무엇을 먼저 보여 줄지 정하는 데 쓰여요.',
    },
    options: frequency,
  },
];

export function getQuestions(lang: PlanLang): Question[] {
  return questionText.map((q) => ({
    key: q.key,
    stem: q.stem?.[lang],
    prompt: q.prompt[lang],
    note: q.note?.[lang],
    options: q.options.map((o) => ({ value: o.value, label: o.label[lang] })),
  }));
}

const score = (answers: Answers, ...keys: QuestionKey[]) =>
  keys.reduce((total, key) => total + Number(answers[key] ?? 0), 0);

/** PHQ-2 (low mood) and GAD-2 (worry) totals, each from 0 to 6. */
export function checkInScores(answers: Answers) {
  return {
    mood: score(answers, 'down', 'interest'),
    anxiety: score(answers, 'nervous', 'worry'),
  };
}

export function buildPlan(answers: Answers, lang: PlanLang = 'en'): Plan {
  const t = (text: Words) => text[lang];
  const { mood, anxiety } = checkInScores(answers);
  const needsSafetyPlan = score(answers, 'safety') > 0;
  const suggestProfessional = mood >= 3 || anxiety >= 3 || needsSafetyPlan;
  const lowMood = mood >= 2 || Number(answers.down ?? 0) >= 2;
  const anxious = anxiety >= 2;
  const hopeless =
    Number(answers.down ?? 0) >= 2 || answers.weight === 'purpose';
  const wantsFaith = answers.faith === 'yes' || answers.faith === 'open';

  const summary: string[] = [];
  if (mood >= 3) {
    summary.push(
      t({
        en: 'Low mood or loss of interest on many days.',
        tl: 'Malungkot o walang gana sa maraming araw.',
        fr: 'Beaucoup de jours avec le moral bas ou sans envie.',
        de: 'An vielen Tagen gedrückte Stimmung oder wenig Interesse.',
        es: 'Muchos días con el ánimo bajo o sin interés.',
        ko: '기분이 가라앉거나 흥미를 잃은 날이 많았어요.',
      })
    );
  } else if (mood > 0) {
    summary.push(
      t({
        en: 'Some days of low mood.',
        tl: 'May mga araw na mababa ang mood.',
        fr: 'Quelques jours avec le moral bas.',
        de: 'Einige Tage mit gedrückter Stimmung.',
        es: 'Algunos días con el ánimo bajo.',
        ko: '기분이 가라앉은 날이 며칠 있었어요.',
      })
    );
  }
  if (anxiety >= 3) {
    summary.push(
      t({
        en: 'Worry and nerves that are hard to control.',
        tl: 'Pag-aalala at kaba na mahirap kontrolin.',
        fr: 'Des inquiétudes et une nervosité difficiles à contrôler.',
        de: 'Sorgen und Nervosität, die schwer zu kontrollieren sind.',
        es: 'Preocupación y nervios difíciles de controlar.',
        ko: '조절하기 어려운 걱정과 긴장이 있었어요.',
      })
    );
  } else if (anxiety > 0) {
    summary.push(
      t({
        en: 'Some days of worry or nerves.',
        tl: 'May mga araw ng pag-aalala o kaba.',
        fr: 'Quelques jours d’inquiétude ou de nervosité.',
        de: 'Einige Tage mit Sorgen oder Nervosität.',
        es: 'Algunos días de preocupación o nervios.',
        ko: '걱정되거나 긴장된 날이 며칠 있었어요.',
      })
    );
  }
  if (answers.sleep && answers.sleep !== 'fine') {
    summary.push(
      t({
        en: 'Sleep that is off.',
        tl: 'Hindi maayos ang tulog.',
        fr: 'Un sommeil perturbé.',
        de: 'Dein Schlaf ist aus dem Takt.',
        es: 'Un sueño desajustado.',
        ko: '잠이 고르지 않아요.',
      })
    );
  }
  const weight = getQuestions(lang)
    .find((q) => q.key === 'weight')
    ?.options.find((o) => o.value === answers.weight)?.label;
  if (weight && answers.weight !== 'unsure') {
    summary.push(
      t({
        en: `Weighing on you most: ${weight.toLowerCase()}.`,
        tl: `Pinakamabigat sa loob mo: ${weight.toLowerCase()}.`,
        fr: `Ce qui te pèse le plus : ${weight.toLowerCase()}.`,
        // German nouns keep their capitals, so the answer is quoted as given.
        de: `Was dich gerade am meisten belastet: „${weight}“.`,
        es: `Lo que más te pesa ahora: ${weight.toLowerCase()}.`,
        ko: `지금 가장 마음을 무겁게 하는 것: ${weight}.`,
      })
    );
  }
  if (summary.length === 0) {
    summary.push(
      t({
        en: "You're doing okay most days. This plan helps keep it that way.",
        tl: "Kaya mo naman halos araw-araw. Makakatulong ang planong ito para tuloy-tuloy 'yan.",
        fr: 'La plupart des jours, ça va. Ce plan t’aide à garder le cap.',
        de: 'An den meisten Tagen geht es dir ganz gut. Dieser Plan hilft, dass es so bleibt.',
        es: 'La mayoría de los días estás bien. Este plan te ayuda a que siga así.',
        ko: '대부분의 날은 괜찮게 지내고 있어요. 이 계획이 계속 그렇게 지내도록 도와줄 거예요.',
      })
    );
  }

  const sections: PlanSection[] = [];

  if (needsSafetyPlan) {
    sections.push({
      id: 'safety',
      heading: t({
        en: 'Your safety plan',
        tl: 'Ang safety plan mo',
        fr: 'Ton plan de sécurité',
        de: 'Dein Sicherheitsplan',
        es: 'Tu plan de seguridad',
        ko: '내 안전 계획',
      }),
      intro: t({
        en: 'Do this first. Fill it in today, save it on your phone, and use it when it all feels too heavy.',
        tl: 'Unahin ito. Sagutan ngayong araw, i-save sa phone mo, at gamitin kapag sobrang bigat na.',
        fr: 'Commence par ça. Remplis-le aujourd’hui, garde-le sur ton téléphone et sers-t’en quand tout devient trop lourd.',
        de: 'Fang hiermit an. Füll ihn heute aus, speichere ihn auf deinem Handy und nutze ihn, wenn dir alles zu schwer wird.',
        es: 'Empieza por aquí. Llénalo hoy, guárdalo en tu celular y úsalo cuando todo se sienta demasiado pesado.',
        ko: '이것부터 해요. 오늘 채워서 휴대폰에 저장해 두고, 모든 게 너무 버겁게 느껴질 때 꺼내 보세요.',
      }),
      items: [
        {
          id: 'warning-signs',
          title: t({
            en: '1. Know your warning signs',
            tl: '1. Kilalanin ang warning signs mo',
            fr: '1. Connais tes signaux d’alerte',
            de: '1. Kenne deine Warnzeichen',
            es: '1. Conoce tus señales de alerta',
            ko: '1. 내 경고 신호 알기',
          }),
          detail: t({
            en: 'Write down the thoughts, feelings or situations that come before your worst moments.',
            tl: 'Isulat ang mga naiisip, pakiramdam, o sitwasyon na nauuna bago ang pinakamabibigat mong sandali.',
            fr: 'Note les pensées, les émotions ou les situations qui arrivent avant tes pires moments.',
            de: 'Schreib die Gedanken, Gefühle oder Situationen auf, die vor deinen schlimmsten Momenten kommen.',
            es: 'Escribe los pensamientos, sentimientos o situaciones que aparecen antes de tus peores momentos.',
            ko: '가장 힘든 순간이 오기 전에 드는 생각, 감정, 상황을 적어 보세요.',
          }),
        },
        {
          id: 'cope-alone',
          title: t({
            en: '2. Things that help you on your own',
            tl: '2. Mga bagay na nakakatulong kapag mag-isa ka',
            fr: '2. Ce que tu peux faire de ton côté',
            de: '2. Was dir allein hilft',
            es: '2. Lo que te ayuda cuando estás a solas',
            ko: '2. 혼자서도 도움이 되는 것',
          }),
          detail: t({
            en: 'List 3 things that take your mind off it for a while, like a walk, music, a shower or cleaning.',
            tl: 'Maglista ng 3 bagay na nakakalibang sa iyo sandali, gaya ng paglalakad, music, pagligo, o paglilinis.',
            fr: 'Liste 3 choses qui te changent les idées un moment, comme marcher, écouter de la musique, prendre une douche ou ranger.',
            de: 'Schreib 3 Dinge auf, die dich eine Weile ablenken, zum Beispiel ein Spaziergang, Musik, eine Dusche oder Aufräumen.',
            es: 'Anota 3 cosas que te distraigan un rato, como caminar, escuchar música, bañarte o hacer limpieza.',
            ko: '잠시 다른 데로 마음을 돌려 주는 것 3가지를 적어 보세요. 산책, 음악, 샤워, 청소 같은 것들이요.',
          }),
        },
        {
          id: 'be-around-people',
          title: t({
            en: '3. People and places that distract you',
            tl: '3. Mga tao at lugar na nakakatulong mag-distract',
            fr: '3. Des personnes et des lieux qui te changent les idées',
            de: '3. Menschen und Orte, die dich ablenken',
            es: '3. Personas y lugares que te distraen',
            ko: '3. 마음을 돌려 주는 사람과 장소',
          }),
          detail: t({
            en: 'Name a person you can sit with or a place you can go to be around others, even without talking about it.',
            tl: 'Isipin ang isang taong puwede mong samahan o lugar na may ibang tao, kahit hindi mo pag-usapan ang nararamdaman mo.',
            fr: 'Pense à une personne avec qui passer un moment, ou à un endroit où aller pour être avec d’autres, même sans en parler.',
            de: 'Nenne einen Menschen, zu dem du dich setzen kannst, oder einen Ort, an dem andere Menschen sind, auch ohne darüber zu reden.',
            es: 'Piensa en una persona con quien puedas pasar un rato o en un lugar adonde ir para estar con otras personas, aunque no hables de lo que sientes.',
            ko: '말하지 않아도 함께 있을 수 있는 사람이나, 다른 사람들 곁에 있을 수 있는 장소를 하나 떠올려 보세요.',
          }),
        },
        {
          id: 'ask-for-help',
          title: t({
            en: '4. People you can ask for help',
            tl: '4. Mga taong puwede mong hingan ng tulong',
            fr: '4. Les personnes à qui demander de l’aide',
            de: '4. Menschen, die du um Hilfe bitten kannst',
            es: '4. Personas a las que puedes pedir ayuda',
            ko: '4. 도움을 청할 수 있는 사람',
          }),
          detail: t({
            en: 'Write down 2 people you can call and tell how you feel. Save their numbers at the top of your contacts.',
            tl: 'Isulat ang 2 taong puwede mong tawagan at sabihan ng nararamdaman mo. I-save ang numero nila sa itaas ng contacts mo.',
            fr: 'Note 2 personnes que tu peux appeler pour leur dire ce que tu ressens. Mets leurs numéros en favoris dans tes contacts.',
            de: 'Schreib 2 Menschen auf, die du anrufen kannst, um ihnen zu sagen, wie es dir geht. Speichere ihre Nummern als Favoriten.',
            es: 'Escribe el nombre de 2 personas a las que puedas llamar para contarles cómo te sientes. Guarda sus números en favoritos.',
            ko: '전화해서 내 마음을 털어놓을 수 있는 사람 2명을 적어 보세요. 그 번호를 즐겨찾기에 저장해 두세요.',
          }),
        },
        {
          id: 'professionals',
          title: t({
            en: '5. Crisis lines, open 24/7',
            tl: '5. Crisis lines, bukas 24/7',
            fr: '5. Lignes de crise, 24h/24 et 7j/7',
            de: '5. Krisentelefone, rund um die Uhr',
            es: '5. Líneas de crisis, abiertas las 24 horas',
            ko: '5. 위기 상담 전화, 24시간',
          }),
          // Not shown on the page (see crisisLines below), but it goes out
          // in the emailed plan: the lines from the translation guide.
          detail: t({
            en: 'NCMH Crisis Hotline: 1553 from a landline or 0917 899 8727 from a mobile. Hopeline: (02) 8804-4673. If you are in immediate danger, call 911.',
            tl: 'NCMH Crisis Hotline: 1553 mula sa landline o 0917 899 8727 mula sa mobile. Hopeline: (02) 8804-4673. Kung nasa panganib ka ngayon, tumawag sa 911.',
            fr: 'Le 3114, numéro national de prévention du suicide, gratuit, 24h/24 et 7j/7. En cas de danger immédiat, appelle le 112 ou le 15. Hors de France, les numéros de ton pays sont sur hopebegins.today/fr/help.',
            de: 'TelefonSeelsorge, kostenlos und rund um die Uhr: 0800 111 0 111 oder 0800 111 0 222. In Österreich: 142, in der Schweiz: 143. Bei akuter Gefahr ruf die 112 an.',
            es: 'Llama a la línea de crisis de tu país. Encuentra la tuya en hopebegins.today/es/help. Si estás en peligro inmediato, llama al número de emergencias de tu país.',
            ko: '자살예방상담전화 109 (24시간, 무료). 정신건강위기상담전화 1577-0199. 지금 위험하다면 119나 112에 전화하세요.',
          }),
          // Shown as the visitor's own country's crisis lines.
          crisisLines: true,
        },
        {
          id: 'safe-space',
          title: t({
            en: '6. Make your space safer',
            tl: '6. Gawing mas ligtas ang paligid mo',
            fr: '6. Rends ton environnement plus sûr',
            de: '6. Mach deine Umgebung sicherer',
            es: '6. Haz tu entorno más seguro',
            ko: '6. 주변을 더 안전하게 하기',
          }),
          detail: t({
            en: 'Put away anything you might use to hurt yourself, or ask someone you trust to keep it for now.',
            tl: 'Itabi ang anumang bagay na puwede mong gamitin para saktan ang sarili mo, o ipatago muna ito sa taong pinagkakatiwalaan mo.',
            fr: 'Mets de côté tout ce qui pourrait te servir à te faire du mal, ou confie-le pour l’instant à une personne de confiance.',
            de: 'Räum alles weg, womit du dich verletzen könntest, oder bitte einen Menschen, dem du vertraust, es vorerst aufzubewahren.',
            es: 'Guarda lejos todo lo que podrías usar para hacerte daño, o pídele a alguien de confianza que lo guarde por ahora.',
            ko: '자신을 해치는 데 쓸 수 있는 물건은 치워 두거나, 믿을 수 있는 사람에게 당분간 맡겨 두세요.',
          }),
        },
      ],
    });
  }

  // Most important first: only the top 4 that apply make the plan.
  const sleepTrouble =
    answers.sleep === 'little' || answers.sleep === 'irregular';
  const toolCandidates: [boolean, PlanItem][] = [
    [
      lowMood,
      {
        id: 'one-thing',
        exercise: 'one-thing',
        action: t({
          en: 'plan one small thing for tomorrow',
          tl: 'magpaplano ako ng isang maliit na gagawin bukas',
          fr: 'je vais prévoir une petite chose à faire demain',
          de: 'plane ich eine kleine Sache für morgen',
          es: 'voy a planear una cosa pequeña para mañana',
          ko: '내일 할 작은 일 하나를 정할게요',
        }),
        defaultTime: 'evening',
        title: t({
          en: 'Plan one small thing each day',
          tl: 'Magplano ng isang maliit na gagawin bawat araw',
          fr: 'Prévois une petite chose chaque jour',
          de: 'Plane jeden Tag eine kleine Sache',
          es: 'Planea una cosa pequeña cada día',
          ko: '매일 작은 일 하나 계획하기',
        }),
        detail: t({
          en: "With low mood, waiting to feel like it doesn't work. Start small. The energy often comes after.",
          tl: 'Kapag malungkot ka, bihirang dumating ang gana kung hihintayin mo. Kumilos muna nang kaunti, madalas sumusunod ang gaan.',
          fr: 'Quand le moral est bas, attendre d’en avoir envie ne marche pas. Commence petit. L’élan vient souvent après.',
          de: 'Bei gedrückter Stimmung bringt es nichts, auf die Lust zu warten. Fang klein an. Der Antrieb kommt oft erst danach.',
          es: 'Con el ánimo bajo, esperar a tener ganas no funciona. Empieza con algo pequeño. El impulso suele llegar después.',
          ko: '기분이 가라앉아 있을 때는 하고 싶어질 때까지 기다려도 잘 안 돼요. 작게 시작해요. 의욕은 대개 하고 나서 생겨요.',
        }),
        steps: [
          t({
            en: 'Each evening, choose one thing for tomorrow: something you used to enjoy, or a small task you have been putting off.',
            tl: 'Tuwing gabi, pumili ng isang gagawin bukas: isang bagay na dati mong ine-enjoy, o isang maliit na gawaing matagal mo nang pinagpapaliban.',
            fr: 'Chaque soir, choisis une chose pour demain : quelque chose que tu aimais faire, ou une petite tâche que tu repousses depuis un moment.',
            de: 'Such dir jeden Abend eine Sache für morgen aus: etwas, das dir früher Freude gemacht hat, oder eine kleine Aufgabe, die du vor dir herschiebst.',
            es: 'Cada noche, elige una cosa para mañana: algo que antes disfrutabas o una tarea pequeña que has ido posponiendo.',
            ko: '매일 저녁 내일 할 일 하나를 골라요. 예전에 즐겨 하던 일이나 미뤄 둔 작은 일이면 돼요.',
          }),
          t({
            en: 'Make it small enough to finish in 10 minutes.',
            tl: 'Dapat maliit lang, kaya mong tapusin sa loob ng 10 minuto.',
            fr: 'Choisis-la assez petite pour la finir en 10 minutes.',
            de: 'Mach sie so klein, dass du sie in 10 Minuten schaffst.',
            es: 'Que sea tan pequeña que la termines en 10 minutos.',
            ko: '10분 안에 끝낼 수 있을 만큼 작게 정해요.',
          }),
          t({
            en: 'Do it even if you do not feel like it, then notice how you feel after.',
            tl: 'Gawin ito kahit wala kang gana, tapos pansinin ang pakiramdam mo pagkatapos.',
            fr: 'Fais-la même sans en avoir envie, puis remarque comment tu te sens après.',
            de: 'Mach sie, auch wenn du keine Lust hast, und achte danach darauf, wie du dich fühlst.',
            es: 'Hazla aunque no tengas ganas y luego fíjate en cómo te sientes.',
            ko: '하고 싶지 않아도 해 보고, 끝난 뒤 기분이 어떤지 살펴봐요.',
          }),
        ],
      },
    ],
    [
      hopeless || needsSafetyPlan,
      {
        id: 'reasons',
        exercise: 'reasons',
        action: t({
          en: 'read my reasons to keep going',
          tl: 'babasahin ko ang mga dahilan ko para magpatuloy',
          fr: 'je vais relire mes raisons de continuer',
          de: 'lese ich meine Gründe zum Weitermachen',
          es: 'voy a leer mis razones para seguir adelante',
          ko: '계속 나아갈 이유를 읽을게요',
        }),
        defaultTime: 'morning',
        title: t({
          en: 'Write your reasons to keep going',
          tl: 'Isulat ang mga dahilan mo para magpatuloy',
          fr: 'Écris tes raisons de continuer',
          de: 'Schreib deine Gründe zum Weitermachen auf',
          es: 'Escribe tus razones para seguir adelante',
          ko: '계속 나아갈 이유 적기',
        }),
        detail: t({
          en: 'List the people, plans and small things that matter to you. Keep the list on your phone and read it on hard days.',
          tl: 'Ilista ang mga tao, plano, at maliliit na bagay na mahalaga sa iyo. Itago ang listahan sa phone mo at basahin ito sa mabibigat na araw.',
          fr: 'Note les personnes, les projets et les petites choses qui comptent pour toi. Garde la liste sur ton téléphone et relis-la les jours difficiles.',
          de: 'Schreib die Menschen, Pläne und kleinen Dinge auf, die dir wichtig sind. Behalte die Liste auf deinem Handy und lies sie an schweren Tagen.',
          es: 'Anota las personas, los planes y las pequeñas cosas que te importan. Guarda la lista en tu celular y léela en los días difíciles.',
          ko: '나에게 소중한 사람, 계획, 작은 것들을 적어 보세요. 그 목록을 휴대폰에 두고 힘든 날에 읽어 보세요.',
        }),
      },
    ],
    [
      anxious,
      {
        id: 'breathe',
        action: t({
          en: 'slow my breathing for 2 minutes',
          tl: 'hihinga ako nang dahan-dahan nang 2 minuto',
          fr: 'je vais ralentir ma respiration pendant 2 minutes',
          de: 'atme ich 2 Minuten lang langsam',
          es: 'voy a respirar despacio durante 2 minutos',
          ko: '2분 동안 천천히 숨을 쉴게요',
        }),
        defaultTime: 'morning',
        exercise: 'breathe',
        title: t({
          en: 'Slow your breathing',
          tl: 'Dahan-dahang paghinga',
          fr: 'Ralentis ta respiration',
          de: 'Atme langsamer',
          es: 'Respira más despacio',
          ko: '천천히 숨쉬기',
        }),
        detail: t({
          en: 'Breathe in through your nose for 4 counts, then out through your mouth for 6. Keep going for 2 minutes. A longer out-breath slows your heart rate.',
          tl: 'Huminga papasok sa ilong nang 4 na bilang, palabas sa bibig nang 6. Ituloy nang 2 minuto. Kapag mas mahaba ang paghinga palabas, bumabagal ang tibok ng puso mo.',
          fr: 'Inspire par le nez en comptant jusqu’à 4, puis expire par la bouche en comptant jusqu’à 6. Continue pendant 2 minutes. Une expiration plus longue ralentit ton cœur.',
          de: 'Atme durch die Nase ein und zähl bis 4, dann durch den Mund aus und zähl bis 6. Mach das 2 Minuten lang. Längeres Ausatmen verlangsamt deinen Herzschlag.',
          es: 'Inhala por la nariz contando hasta 4 y exhala por la boca contando hasta 6. Sigue así durante 2 minutos. Exhalar más largo hace que tu corazón lata más despacio.',
          ko: '코로 넷을 세며 들이마시고, 입으로 여섯을 세며 내쉬어요. 2분 동안 계속해요. 숨을 길게 내쉬면 심장 박동이 느려져요.',
        }),
        steps: [
          t({
            en: 'Use it when you feel tense.',
            tl: 'Gamitin ito kapag tense ka.',
            fr: 'Utilise-la dans les moments de tension.',
            de: 'Mach die Übung, wenn du angespannt bist.',
            es: 'Úsala cuando sientas tensión.',
            ko: '긴장될 때 써 보세요.',
          }),
          t({
            en: 'Practise once a day when calm.',
            tl: 'Mag-practice isang beses araw-araw kahit kalmado ka.',
            fr: 'Entraîne-toi une fois par jour, quand tu es calme.',
            de: 'Üb sie einmal am Tag, wenn du ruhig bist.',
            es: 'Practícala una vez al día, cuando estés en calma.',
            ko: '차분할 때 하루 한 번 연습해요.',
          }),
        ],
      },
    ],
    [
      Number(answers.worry ?? 0) >= 2 || anxiety >= 3,
      {
        id: 'worry-time',
        exercise: 'worry-time',
        action: t({
          en: 'take my 15-minute worry time',
          tl: 'gagawin ko ang 15-minute worry time ko',
          fr: 'je vais prendre mes 15 minutes pour m’inquiéter',
          de: 'nehme ich mir meine 15 Minuten Sorgenzeit',
          es: 'voy a tomar mis 15 minutos de tiempo para preocuparme',
          ko: '15분 걱정 시간을 가질게요',
        }),
        defaultTime: 'evening',
        title: t({
          en: 'Give worry a time slot',
          tl: 'Bigyan ng oras ang pag-aalala',
          fr: 'Donne un créneau à tes inquiétudes',
          de: 'Gib deinen Sorgen eine feste Zeit',
          es: 'Dale un horario a la preocupación',
          ko: '걱정에 시간 정해 주기',
        }),
        detail: t({
          en: 'This puts worry on hold so it takes over less of your day.',
          tl: 'Naitatabi nito ang pag-aalala para hindi nito sakupin ang buong araw mo.',
          fr: 'Ça met tes inquiétudes en attente, pour qu’elles prennent moins de place dans ta journée.',
          de: 'So legst du Sorgen auf später, und sie nehmen weniger Raum in deinem Tag ein.',
          es: 'Así pones la preocupación en pausa y ocupa menos de tu día.',
          ko: '걱정을 잠시 미뤄 두면, 걱정이 하루를 덜 차지하게 돼요.',
        }),
        steps: [
          t({
            en: 'Pick 15 minutes at the same time each day.',
            tl: 'Pumili ng 15 minuto sa parehong oras araw-araw.',
            fr: 'Choisis 15 minutes, à la même heure chaque jour.',
            de: 'Nimm dir jeden Tag zur gleichen Zeit 15 Minuten.',
            es: 'Elige 15 minutos a la misma hora cada día.',
            ko: '매일 같은 시간에 15분을 정해요.',
          }),
          t({
            en: 'When a worry comes up at another time, write it down and save it for later.',
            tl: 'Kapag may pag-aalalang dumating sa ibang oras, isulat ito at itabi muna para mamaya.',
            fr: 'Quand une inquiétude arrive à un autre moment, note-la et garde-la pour plus tard.',
            de: 'Wenn zu einer anderen Zeit eine Sorge kommt, schreib sie auf und heb sie dir für später auf.',
            es: 'Cuando te llegue una preocupación en otro momento, anótala y guárdala para después.',
            ko: '다른 시간에 걱정이 떠오르면 적어 두고 나중으로 미뤄요.',
          }),
          t({
            en: 'In your worry time, ask of each one: can I do something about this? If yes, plan one step. If no, let it go for today.',
            tl: 'Sa worry time mo, tanungin ang sarili sa bawat isa: may magagawa ba ako dito? Kung oo, magplano ng isang hakbang. Kung wala, bitawan muna ito ngayong araw.',
            fr: 'Pendant ton moment pour t’inquiéter, demande-toi pour chacune : est-ce que je peux y faire quelque chose ? Si oui, prévois une étape. Si non, laisse-la de côté pour aujourd’hui.',
            de: 'Frag dich in deiner Sorgenzeit bei jeder Sorge: Kann ich etwas dagegen tun? Wenn ja, plane einen Schritt. Wenn nein, lass sie für heute los.',
            es: 'En tu tiempo para preocuparte, pregúntate con cada una: ¿puedo hacer algo con esto? Si la respuesta es sí, planea un paso. Si es no, déjala ir por hoy.',
            ko: '걱정 시간에는 걱정 하나하나에 물어봐요. ‘이건 내가 뭔가 할 수 있는 일일까?’ 할 수 있다면 한 걸음을 계획하고, 아니라면 오늘은 내려놓아요.',
          }),
        ],
      },
    ],
    [
      sleepTrouble,
      {
        id: 'sleep',
        action: t({
          en: 'wake up at my set time',
          tl: 'gigising ako sa oras na pinili ko',
          fr: 'je vais me réveiller à l’heure que j’ai choisie',
          de: 'wache ich zu meiner festen Zeit auf',
          es: 'voy a despertarme a la hora que elegí',
          ko: '정해 둔 시간에 일어날게요',
        }),
        defaultTime: 'morning',
        title: t({
          en: 'Reset your sleep',
          tl: 'Ayusin ang tulog mo',
          fr: 'Remets ton sommeil sur les rails',
          de: 'Bring deinen Schlaf wieder in den Takt',
          es: 'Reajusta tu sueño',
          ko: '수면 리듬 되찾기',
        }),
        detail: t({
          en: 'A steady rhythm helps your body know when to sleep.',
          tl: 'Kapag pare-pareho ang oras, natututo ang katawan mo kung kailan matutulog.',
          fr: 'Un rythme régulier aide ton corps à savoir quand dormir.',
          de: 'Mit einem festen Rhythmus weiß dein Körper, wann Schlafenszeit ist.',
          es: 'Un ritmo estable ayuda a tu cuerpo a saber cuándo dormir.',
          ko: '규칙적인 리듬이 있으면 몸이 언제 잘지 알게 돼요.',
        }),
        steps: [
          t({
            en: 'Wake up at the same time every day, weekends too.',
            tl: 'Gumising sa parehong oras araw-araw, kahit weekend.',
            fr: 'Réveille-toi à la même heure chaque jour, le week-end aussi.',
            de: 'Wach jeden Tag zur gleichen Zeit auf, auch am Wochenende.',
            es: 'Despiértate a la misma hora todos los días, también los fines de semana.',
            ko: '주말에도 매일 같은 시간에 일어나요.',
          }),
          t({
            en: 'Put screens away 30 minutes before bed.',
            tl: 'Itabi ang phone at iba pang screen 30 minuto bago matulog.',
            fr: 'Range les écrans 30 minutes avant de te coucher.',
            de: 'Leg Bildschirme 30 Minuten vor dem Schlafengehen weg.',
            es: 'Deja las pantallas 30 minutos antes de dormir.',
            ko: '자기 30분 전에는 화면을 멀리 둬요.',
          }),
          t({
            en: 'If you cannot sleep after about 20 minutes, get up and do something calm until you feel sleepy.',
            tl: 'Kung hindi ka makatulog pagkalipas ng mga 20 minuto, bumangon at gumawa ng tahimik na bagay hanggang antukin ka.',
            fr: 'Si tu n’arrives pas à dormir au bout d’environ 20 minutes, lève-toi et fais quelque chose de calme jusqu’à ce que le sommeil revienne.',
            de: 'Wenn du nach etwa 20 Minuten nicht einschlafen kannst, steh auf und mach etwas Ruhiges, bis du müde wirst.',
            es: 'Si no puedes dormirte después de unos 20 minutos, levántate y haz algo tranquilo hasta que te dé sueño.',
            ko: '20분쯤 지나도 잠이 안 오면 일어나서 졸릴 때까지 조용한 일을 해요.',
          }),
        ],
      },
    ],
    [
      answers.sleep === 'much',
      {
        id: 'sleep',
        action: t({
          en: 'get up with my alarm and get daylight',
          tl: 'babangon ako sa alarm at magpapaaraw',
          fr: 'je vais me lever dès mon réveil et prendre la lumière du jour',
          de: 'stehe ich mit dem Wecker auf und gehe raus ans Tageslicht',
          es: 'voy a levantarme con la alarma y salir a la luz del día',
          ko: '알람이 울리면 일어나서 햇빛을 쬘게요',
        }),
        defaultTime: 'morning',
        title: t({
          en: 'Wake up at the same time every day',
          tl: 'Gumising sa parehong oras araw-araw',
          fr: 'Réveille-toi à la même heure chaque jour',
          de: 'Wach jeden Tag zur gleichen Zeit auf',
          es: 'Despiértate a la misma hora todos los días',
          ko: '매일 같은 시간에 일어나기',
        }),
        detail: t({
          en: 'Set an alarm, get up when it rings, and get daylight within the first hour.',
          tl: 'Mag-set ng alarm, bumangon pagtunog nito, at magpaaraw sa loob ng unang oras.',
          fr: 'Mets un réveil, lève-toi dès qu’il sonne et va chercher la lumière du jour dans la première heure.',
          de: 'Stell dir einen Wecker, steh auf, wenn er klingelt, und geh in der ersten Stunde raus ans Tageslicht.',
          es: 'Pon una alarma, levántate cuando suene y sal a la luz del día en la primera hora.',
          ko: '알람을 맞추고, 울리면 바로 일어나서, 일어난 지 1시간 안에 햇빛을 쬐어요.',
        }),
      },
    ],
    [
      anxious || needsSafetyPlan || answers.weight === 'grief',
      {
        id: 'ground',
        action: t({
          en: 'ground myself with 5-4-3-2-1',
          tl: 'gagawin ko ang 5-4-3-2-1 grounding',
          fr: 'je vais faire l’ancrage 5-4-3-2-1',
          de: 'mache ich die 5-4-3-2-1-Übung',
          es: 'voy a hacer el ejercicio 5-4-3-2-1',
          ko: '5-4-3-2-1 그라운딩을 할게요',
        }),
        defaultTime: 'midday',
        exercise: 'ground',
        title: t({
          en: 'Use your 5 senses (5-4-3-2-1)',
          tl: 'Gamitin ang 5 senses mo (5-4-3-2-1)',
          fr: 'Utilise tes 5 sens (5-4-3-2-1)',
          de: 'Nutze deine 5 Sinne (5-4-3-2-1)',
          es: 'Usa tus 5 sentidos (5-4-3-2-1)',
          ko: '다섯 감각 쓰기 (5-4-3-2-1)',
        }),
        detail: t({
          en: 'When worry or panic builds, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell and 1 you can taste.',
          tl: 'Kapag lumalaki ang pag-aalala o panic, pangalanan ang 5 bagay na nakikita mo, 4 na nahahawakan mo, 3 na naririnig mo, 2 na naaamoy mo, at 1 na nalalasahan mo.',
          fr: 'Quand l’inquiétude ou la panique monte, nomme 5 choses que tu vois, 4 que tu peux toucher, 3 que tu entends, 2 que tu sens et 1 que tu goûtes.',
          de: 'Wenn Sorgen oder Panik stärker werden, nenne 5 Dinge, die du siehst, 4, die du anfassen kannst, 3, die du hörst, 2, die du riechst, und 1, das du schmeckst.',
          es: 'Cuando crezcan la preocupación o el pánico, nombra 5 cosas que ves, 4 que puedes tocar, 3 que oyes, 2 que hueles y 1 que saboreas.',
          ko: '걱정이나 공황이 커질 때, 보이는 것 5가지, 만질 수 있는 것 4가지, 들리는 것 3가지, 냄새 2가지, 맛 1가지를 하나씩 말해 보세요.',
        }),
      },
    ],
    [
      lowMood,
      {
        id: 'move',
        action: t({
          en: 'move for 10 minutes',
          tl: 'gagalaw ako nang 10 minuto',
          fr: 'je vais bouger pendant 10 minutes',
          de: 'bewege ich mich 10 Minuten lang',
          es: 'voy a moverme durante 10 minutos',
          ko: '10분 동안 몸을 움직일게요',
        }),
        defaultTime: 'midday',
        title: t({
          en: 'Move for 10 minutes a day',
          tl: 'Gumalaw nang 10 minuto araw-araw',
          fr: 'Bouge 10 minutes par jour',
          de: 'Beweg dich 10 Minuten am Tag',
          es: 'Muévete 10 minutos al día',
          ko: '하루 10분 몸 움직이기',
        }),
        detail: t({
          en: 'A walk outside counts. Daylight and movement both lift mood and help sleep.',
          tl: 'Pasok na ang paglalakad sa labas. Ang pagpapaaraw at paggalaw ay parehong nakakagaan ng mood at nakakatulong sa tulog.',
          fr: 'Une marche dehors, ça compte. La lumière du jour et le mouvement remontent le moral et aident à dormir.',
          de: 'Ein Spaziergang draußen zählt schon. Tageslicht und Bewegung heben die Stimmung und helfen beim Schlafen.',
          es: 'Una caminata afuera cuenta. La luz del día y el movimiento levantan el ánimo y ayudan a dormir.',
          ko: '밖에서 걷는 것도 좋아요. 햇빛과 움직임은 기분을 끌어올리고 잠도 도와줘요.',
        }),
      },
    ],
    [
      anxious || lowMood,
      {
        id: 'unhook',
        exercise: 'unhook',
        action: t({
          en: 'notice and name one heavy thought',
          tl: 'papansinin at papangalanan ko ang isang mabigat na isip',
          fr: 'je vais repérer et nommer une pensée lourde',
          de: 'bemerke ich einen schweren Gedanken und benenne ihn',
          es: 'voy a notar y nombrar un pensamiento pesado',
          ko: '무거운 생각 하나를 알아차리고 이름 붙일게요',
        }),
        defaultTime: 'midday',
        title: t({
          en: 'Step back from a heavy thought',
          tl: 'Lumayo nang kaunti sa mabigat na isip',
          fr: 'Prends du recul face à une pensée lourde',
          de: 'Geh auf Abstand zu einem schweren Gedanken',
          es: 'Toma distancia de un pensamiento pesado',
          ko: '무거운 생각에서 한 걸음 물러나기',
        }),
        detail: t({
          en: 'When a hard thought grabs you, name it: "I\'m having the thought that I\'m not good enough." Then bring your attention back to what you are doing.',
          tl: 'Kapag may mabigat na isip na kumapit sa iyo, pangalanan ito: "Napapansin kong iniisip ko na hindi ako sapat." Tapos ibalik ang atensyon mo sa ginagawa mo.',
          fr: 'Quand une pensée difficile t’accroche, nomme-la : « J’ai la pensée que je ne suis pas à la hauteur. » Puis ramène ton attention sur ce que tu fais.',
          de: 'Wenn dich ein schwerer Gedanke packt, benenne ihn: „Ich habe den Gedanken, dass ich nicht gut genug bin.“ Dann richte deine Aufmerksamkeit wieder auf das, was du gerade tust.',
          es: 'Cuando un pensamiento difícil te atrape, ponle nombre: “Estoy teniendo el pensamiento de que no soy suficiente”. Luego vuelve a poner tu atención en lo que estás haciendo.',
          ko: '힘든 생각이 나를 붙잡을 때 이름을 붙여 보세요. “나는 내가 부족하다는 생각을 하고 있구나.” 그런 다음 지금 하고 있는 일로 주의를 다시 가져와요.',
        }),
      },
    ],
    [
      true,
      {
        id: 'good-thing',
        action: t({
          en: 'write down one good thing',
          tl: 'isusulat ko ang isang magandang nangyari',
          fr: 'je vais noter une bonne chose',
          de: 'schreibe ich eine gute Sache auf',
          es: 'voy a escribir una cosa buena',
          ko: '좋았던 일 하나를 적을게요',
        }),
        defaultTime: 'bedtime',
        title: t({
          en: 'Write down one good thing each night',
          tl: 'Isulat ang isang magandang nangyari bawat gabi',
          fr: 'Note une bonne chose chaque soir',
          de: 'Schreib jeden Abend eine gute Sache auf',
          es: 'Escribe una cosa buena cada noche',
          ko: '매일 밤 좋았던 일 하나 적기',
        }),
        detail: t({
          en: 'Something that went okay or that you are thankful for, however small.',
          tl: 'Isang bagay na naging okay o ipinagpapasalamat mo, kahit gaano kaliit.',
          fr: 'Quelque chose qui s’est bien passé, ou un sujet de gratitude, même tout petit.',
          de: 'Etwas, das okay lief oder für das du dankbar bist, egal wie klein.',
          es: 'Algo que salió bien o por lo que sientes gratitud, por pequeño que sea.',
          ko: '괜찮게 흘러간 일이나 고마운 일이면 돼요. 아무리 작은 일이라도요.',
        }),
      },
    ],
  ];
  const applicable = toolCandidates
    .filter(([applies]) => applies)
    .map(([, item]) => item);
  // Two sleep tools share an id; keep the one that applies.
  const allTools = [
    ...applicable,
    ...toolCandidates.map(([, item]) => item),
  ].filter(
    (item, index, list) =>
      list.findIndex((other) => other.id === item.id) === index
  );
  // The fallback only fills in when fewer than 2 tools apply.
  const tools =
    applicable.length > 2
      ? applicable.filter((item) => item.id !== 'good-thing')
      : applicable;
  sections.push({
    id: 'tools',
    heading: t({
      en: 'Your daily tools',
      tl: 'Ang mga daily tool mo',
      fr: 'Tes outils du quotidien',
      de: 'Deine täglichen Übungen',
      es: 'Tus herramientas diarias',
      ko: '매일 쓰는 내 도구',
    }),
    intro: t({
      en: 'Start with one or two. Use them on most days for 4 weeks.',
      tl: 'Magsimula sa isa o dalawa. Gamitin ang mga ito sa karamihan ng araw sa loob ng 4 na linggo.',
      fr: 'Commence par un ou deux. Utilise-les la plupart des jours pendant 4 semaines.',
      de: 'Fang mit einer oder zwei an. Mach sie 4 Wochen lang an den meisten Tagen.',
      es: 'Empieza con una o dos. Úsalas la mayoría de los días durante 4 semanas.',
      ko: '한두 가지로 시작해요. 4주 동안 거의 매일 써 보세요.',
    }),
    items: tools.slice(0, 4),
  });

  const week: PlanItem[] = [];
  switch (answers.weight) {
    case 'work':
    case 'money':
      week.push({
        id: 'problem-solve',
        title: t({
          en: 'Break the problem into steps',
          tl: 'Hatiin ang problema sa maliliit na hakbang',
          fr: 'Découpe le problème en étapes',
          de: 'Zerleg das Problem in Schritte',
          es: 'Divide el problema en pasos',
          ko: '문제를 작은 단계로 나누기',
        }),
        detail:
          answers.weight === 'money'
            ? t({
                en: 'Money worries feel smaller once they are on paper.',
                tl: 'Mas lumiliit ang problema sa pera kapag nakasulat na.',
                fr: 'Les soucis d’argent paraissent plus petits une fois sur le papier.',
                de: 'Geldsorgen wirken kleiner, sobald sie auf Papier stehen.',
                es: 'Las preocupaciones por dinero se ven más pequeñas cuando están en papel.',
                ko: '돈 걱정도 종이에 적고 나면 더 작게 느껴져요.',
              })
            : t({
                en: 'A big problem is easier to face one step at a time.',
                tl: 'Mas madaling harapin ang malaking problema nang paisa-isang hakbang.',
                fr: 'Un gros problème est plus facile à affronter étape par étape.',
                de: 'Ein großes Problem lässt sich Schritt für Schritt leichter angehen.',
                es: 'Un problema grande es más fácil de enfrentar paso a paso.',
                ko: '큰 문제도 한 걸음씩 나누면 마주하기가 더 쉬워요.',
              }),
        steps: [
          t({
            en: 'Write the problem in one sentence.',
            tl: 'Isulat ang problema sa isang pangungusap.',
            fr: 'Écris le problème en une phrase.',
            de: 'Schreib das Problem in einem Satz auf.',
            es: 'Escribe el problema en una sola frase.',
            ko: '문제를 한 문장으로 적어요.',
          }),
          t({
            en: 'List 3 things you could do about it, even small ones.',
            tl: 'Maglista ng 3 bagay na puwede mong gawin tungkol dito, kahit maliliit.',
            fr: 'Liste 3 choses que tu pourrais faire, même petites.',
            de: 'Schreib 3 Dinge auf, die du tun könntest, auch kleine.',
            es: 'Anota 3 cosas que podrías hacer al respecto, aunque sean pequeñas.',
            ko: '작은 것이라도 할 수 있는 일 3가지를 적어요.',
          }),
          t({
            en: 'Pick one and do the first step this week.',
            tl: 'Pumili ng isa at gawin ang unang hakbang ngayong linggo.',
            fr: 'Choisis-en une et fais la première étape cette semaine.',
            de: 'Such dir eins aus und mach diese Woche den ersten Schritt.',
            es: 'Elige una y da el primer paso esta semana.',
            ko: '하나를 골라 이번 주에 첫 단계를 해 봐요.',
          }),
        ],
      });
      break;
    case 'family':
      week.push({
        id: 'conversation',
        title: t({
          en: 'Plan one honest conversation',
          tl: 'Magplano ng isang tapat na pag-uusap',
          fr: 'Prévois une conversation sincère',
          de: 'Plane ein ehrliches Gespräch',
          es: 'Planea una conversación sincera',
          ko: '솔직한 대화 한 번 계획하기',
        }),
        detail: t({
          en: 'Choose a calm moment. Start with "I feel ... when ... I need ...". Stick to one thing for now.',
          tl: 'Pumili ng kalmadong pagkakataon. Isang bagay lang muna ang pag-usapan. Simulan sa: "Nasasaktan ako kapag ... Sana ..."',
          fr: 'Choisis un moment calme. Commence par : « Je me sens… quand… J’ai besoin de… » Tiens-toi à un seul sujet pour l’instant.',
          de: 'Such dir einen ruhigen Moment aus. Fang so an: „Ich fühle mich …, wenn … Ich brauche …“ Bleib erst mal bei einem Thema.',
          es: 'Elige un momento tranquilo. Empieza con: “Me siento… cuando… Necesito…”. Por ahora, quédate con un solo tema.',
          ko: '차분한 때를 골라요. “…할 때 나는 …한 기분이 들어. 나는 …이 필요해.”로 시작해 보세요. 지금은 한 가지만 이야기해요.',
        }),
      });
      break;
    case 'health':
      week.push({
        id: 'health',
        title: t({
          en: 'Write down your health questions',
          tl: 'Isulat ang mga tanong mo tungkol sa kalusugan',
          fr: 'Note tes questions de santé',
          de: 'Schreib deine Gesundheitsfragen auf',
          es: 'Anota tus preguntas de salud',
          ko: '건강에 대한 질문 적어 두기',
        }),
        detail: t({
          en: 'List what worries you, then book one appointment to ask about it.',
          tl: 'Ilista ang mga inaalala mo, tapos magpa-appointment para itanong ito.',
          fr: 'Liste ce qui t’inquiète, puis prends un rendez-vous pour en parler.',
          de: 'Schreib auf, was dir Sorgen macht, und mach dann einen Termin, um danach zu fragen.',
          es: 'Haz una lista de lo que te preocupa y luego agenda una cita para preguntarlo.',
          ko: '걱정되는 것을 적고, 물어볼 수 있게 진료 예약을 하나 잡아요.',
        }),
      });
      break;
    case 'grief':
      week.push({
        id: 'grief',
        title: t({
          en: 'Give your grief some time each day',
          tl: 'Bigyan ng oras ang lungkot araw-araw',
          fr: 'Donne un peu de place à ton deuil chaque jour',
          de: 'Gib deiner Trauer jeden Tag etwas Zeit',
          es: 'Dale tiempo a tu duelo cada día',
          ko: '매일 슬픔에 시간을 내어 주기',
        }),
        detail: t({
          en: 'Grief comes in waves. Give it some time each day: look at photos, write to the person, or talk about them. Keep simple routines like meals and sleep.',
          tl: 'Dumarating nang paalon-alon ang lungkot. Bigyan ito ng kaunting oras araw-araw: tingnan ang mga litrato, sumulat sa taong nawala, o pag-usapan siya. Ituloy ang simpleng routine gaya ng pagkain at pagtulog.',
          fr: 'Le deuil vient par vagues. Accorde-lui un moment chaque jour : regarde des photos, écris à la personne ou parle d’elle. Garde des habitudes simples, comme les repas et le sommeil.',
          de: 'Trauer kommt in Wellen. Gib ihr jeden Tag etwas Zeit: Schau dir Fotos an, schreib der Person oder sprich über sie. Bleib bei festen Abläufen wie Essen und Schlafen.',
          es: 'El duelo llega en olas. Dale un poco de tiempo cada día: mira fotos, escríbele a esa persona o habla de ella. Mantén rutinas sencillas, como las comidas y el sueño.',
          ko: '슬픔은 파도처럼 밀려와요. 매일 조금씩 시간을 내어 주세요. 사진을 보거나, 그 사람에게 편지를 쓰거나, 그 사람 이야기를 해 보세요. 식사와 잠 같은 간단한 일상은 지켜요.',
        }),
      });
      break;
    case 'lonely':
      week.push({
        id: 'connect',
        exercise: 'message',
        title: t({
          en: 'Make one small contact each day',
          tl: 'Mag-message o kumustahin ang isang tao araw-araw',
          fr: 'Un petit contact chaque jour',
          de: 'Jeden Tag ein kleiner Kontakt',
          es: 'Un pequeño contacto cada día',
          ko: '매일 작은 연락 한 번',
        }),
        detail: t({
          en: 'A message, a call or a hello. This month, join one group: a class, a faith group or volunteering.',
          tl: 'Isang message, tawag, o hello. Ngayong buwan, sumali sa isang grupo: isang class, faith group, o volunteering.',
          fr: 'Un message, un appel ou un simple bonjour. Ce mois-ci, rejoins un groupe : un cours, un groupe dans une église évangélique ou du bénévolat.',
          de: 'Eine Nachricht, ein Anruf oder ein kurzes Hallo. Schließ dich diesen Monat einer Gruppe an: einem Kurs, einer Gemeindegruppe oder einem Ehrenamt.',
          es: 'Un mensaje, una llamada o un saludo. Este mes, únete a un grupo: una clase, un grupo de una iglesia evangélica o un voluntariado.',
          ko: '메시지, 전화, 짧은 인사도 좋아요. 이번 달에는 수업, 교회 소그룹, 봉사 활동 같은 모임 하나에 참여해 보세요.',
        }),
      });
      break;
    case 'purpose':
      week.push({
        id: 'values',
        title: t({
          en: 'Do one thing that matters to you',
          tl: 'Gumawa ng isang bagay na mahalaga sa iyo',
          fr: 'Fais une chose qui compte pour toi',
          de: 'Tu eine Sache, die dir wichtig ist',
          es: 'Haz una cosa que te importe',
          ko: '나에게 중요한 일 하나 하기',
        }),
        detail: t({
          en: 'Ask yourself: what kind of person do I want to be this week? Pick one small action that fits, like helping someone or finishing something you care about.',
          tl: 'Tanungin ang sarili: anong klaseng tao ang gusto kong maging ngayong linggo? Pumili ng isang maliit na gawaing tugma dito, gaya ng pagtulong sa iba o pagtatapos ng isang bagay na mahalaga sa iyo.',
          fr: 'Demande-toi : quelle personne ai-je envie d’être cette semaine ? Choisis une petite action qui va dans ce sens, comme aider quelqu’un ou terminer quelque chose qui te tient à cœur.',
          de: 'Frag dich: Was für ein Mensch möchte ich diese Woche sein? Such dir eine kleine Handlung aus, die dazu passt, zum Beispiel jemandem helfen oder etwas zu Ende bringen, das dir am Herzen liegt.',
          es: 'Pregúntate: ¿qué clase de persona quiero ser esta semana? Elige una acción pequeña que vaya con eso, como ayudar a alguien o terminar algo que te importa.',
          ko: '스스로에게 물어보세요. ‘이번 주에 나는 어떤 사람이 되고 싶을까?’ 그에 맞는 작은 행동 하나를 골라요. 누군가를 돕거나, 마음을 쓰고 있던 일을 마무리하는 것처럼요.',
        }),
      });
      break;
    default:
      week.push({
        id: 'check-in',
        title: t({
          en: 'Check in with yourself each evening',
          tl: 'Kumustahin ang sarili tuwing gabi',
          fr: 'Fais le point avec toi-même chaque soir',
          de: 'Schau jeden Abend, wie es dir geht',
          es: 'Revisa cómo estás cada noche',
          ko: '매일 저녁 내 마음 살피기',
        }),
        detail: t({
          en: 'Rate your mood from 1 to 10 and write one word for why. Patterns show up within a week.',
          tl: 'I-rate ang mood mo mula 1 hanggang 10 at isulat ang isang salita kung bakit. Makikita mo ang pattern sa loob ng isang linggo.',
          fr: 'Note ton humeur de 1 à 10 et écris un mot pour dire pourquoi. Des tendances apparaissent en une semaine.',
          de: 'Bewerte deine Stimmung von 1 bis 10 und schreib in einem Wort dazu, warum. Nach einer Woche erkennst du Muster.',
          es: 'Califica tu ánimo del 1 al 10 y escribe una palabra sobre el porqué. En una semana empiezas a ver patrones.',
          ko: '기분을 1부터 10까지 점수로 매기고, 이유를 한 단어로 적어요. 일주일이면 패턴이 보여요.',
        }),
      });
  }
  if (answers.support === 'no') {
    week.push({
      id: 'reach-out',
      exercise: 'message',
      title: t({
        en: 'Reach out to one person',
        tl: 'Kumausap ng isang tao',
        fr: 'Contacte une personne',
        de: 'Melde dich bei einem Menschen',
        es: 'Escríbele a una persona',
        ko: '한 사람에게 연락하기',
      }),
      detail: t({
        en: 'Pick one person you trust and send: "Can we talk this week? I\'ve been having a hard time."',
        tl: 'Pumili ng isang taong pinagkakatiwalaan mo at i-send ito: "Puwede ba tayong mag-usap ngayong linggo? Medyo mabigat lang ako lately."',
        fr: 'Choisis une personne de confiance et envoie-lui : « On peut parler cette semaine ? J’ai un peu de mal en ce moment. »',
        de: 'Such dir einen Menschen aus, dem du vertraust, und schreib: „Können wir diese Woche reden? Mir geht es gerade nicht so gut.“',
        es: 'Elige a alguien de confianza y envíale: “¿Podemos hablar esta semana? La he estado pasando mal”.',
        ko: '믿을 수 있는 사람 한 명을 골라 이렇게 보내 보세요. “이번 주에 이야기할 수 있을까? 요즘 좀 힘들어.”',
      }),
    });
  } else if (answers.support === 'sometimes') {
    week.push({
      id: 'reach-out',
      exercise: 'message',
      title: t({
        en: 'Set a time to talk',
        tl: 'Mag-set ng oras para mag-usap',
        fr: 'Fixe un moment pour parler',
        de: 'Mach eine Zeit zum Reden aus',
        es: 'Acuerda un momento para hablar',
        ko: '이야기할 시간 정하기',
      }),
      detail: t({
        en: 'Choose a day this week and tell someone you trust that you would like to talk.',
        tl: 'Pumili ng araw ngayong linggo at sabihan ang taong pinagkakatiwalaan mo na gusto mong makipag-usap.',
        fr: 'Choisis un jour cette semaine et dis à une personne de confiance que tu aimerais parler.',
        de: 'Such dir einen Tag diese Woche aus und sag einem Menschen, dem du vertraust, dass du gern reden würdest.',
        es: 'Elige un día de esta semana y dile a alguien de confianza que te gustaría hablar.',
        ko: '이번 주 중 하루를 정하고, 믿을 수 있는 사람에게 이야기하고 싶다고 말해 보세요.',
      }),
    });
  }
  sections.push({
    id: 'week',
    heading: t({
      en: 'Your step for this week',
      tl: 'Ang hakbang mo ngayong linggo',
      fr: 'Ton étape de la semaine',
      de: 'Dein Schritt für diese Woche',
      es: 'Tu paso de esta semana',
      ko: '이번 주의 한 걸음',
    }),
    items: week,
  });

  if (wantsFaith) {
    sections.push({
      id: 'faith',
      heading: t({
        en: 'Faith',
        tl: 'Pananampalataya',
        fr: 'La foi',
        de: 'Glaube',
        es: 'Fe',
        ko: '신앙',
      }),
      items: [
        {
          id: 'quiet-time',
          title: t({
            en: 'Take 5 quiet minutes each morning',
            tl: 'Maglaan ng 5 tahimik na minuto tuwing umaga',
            fr: 'Prends 5 minutes de calme chaque matin',
            de: 'Nimm dir jeden Morgen 5 ruhige Minuten',
            es: 'Toma 5 minutos de calma cada mañana',
            ko: '매일 아침 5분 조용한 시간 갖기',
          }),
          detail:
            answers.faith === 'yes'
              ? t({
                  en: 'Pray or read a Psalm before you check your phone. Psalm 23 and Psalm 46 are good places to start.',
                  tl: 'Magdasal o magbasa ng isang Psalm bago mo tingnan ang phone mo. Magandang simula ang Psalm 23 at Psalm 46.',
                  fr: 'Prie ou lis un psaume avant de regarder ton téléphone. Les Psaumes 23 et 46 sont un bon point de départ.',
                  de: 'Bete oder lies einen Psalm, bevor du aufs Handy schaust. Psalm 23 und Psalm 46 sind ein guter Anfang.',
                  es: 'Ora o lee un salmo antes de mirar tu celular. El Salmo 23 y el Salmo 46 son un buen comienzo.',
                  ko: '휴대폰을 보기 전에 기도하거나 시편 한 편을 읽어요. 시편 23편과 46편으로 시작해 보세요.',
                })
              : t({
                  en: 'Sit quietly before you check your phone. If you like, read Psalm 23 or say a short prayer.',
                  tl: 'Umupo nang tahimik bago mo tingnan ang phone mo. Kung gusto mo, basahin ang Psalm 23 o magdasal nang maikli.',
                  fr: 'Assieds-toi au calme avant de regarder ton téléphone. Si tu veux, lis le Psaume 23 ou dis une courte prière.',
                  de: 'Setz dich in Ruhe hin, bevor du aufs Handy schaust. Wenn du magst, lies Psalm 23 oder sprich ein kurzes Gebet.',
                  es: 'Siéntate en silencio antes de mirar tu celular. Si quieres, lee el Salmo 23 o haz una oración corta.',
                  ko: '휴대폰을 보기 전에 조용히 앉아 있어요. 원한다면 시편 23편을 읽거나 짧게 기도해요.',
                }),
          href: WAR_ROOM_URL,
          linkLabel: t({
            en: 'Use Prayer War Room for a guided prayer time',
            tl: 'Gamitin ang Prayer War Room para sa guided prayer time',
            fr: 'Prendre un temps de prière guidé avec Prayer War Room',
            de: 'Mit Prayer War Room angeleitet beten',
            es: 'Usar Prayer War Room para un tiempo de oración guiado',
            ko: 'Prayer War Room에서 안내에 따라 기도하기',
          }),
        },
      ],
    });
  }

  sections.push({
    id: 'track',
    heading: t({
      en: "See what's changed",
      tl: 'Silipin kung ano na ang nagbago',
      fr: 'Vois ce qui a changé',
      de: 'Sieh, was sich verändert hat',
      es: 'Mira lo que ha cambiado',
      ko: '달라진 점 살펴보기',
    }),
    items: [
      {
        id: 'retake',
        title: t({
          en: 'Take the check-in again each week',
          tl: 'Sagutan ulit ang check-in bawat linggo',
          fr: 'Refais le bilan chaque semaine',
          de: 'Mach den Check-in jede Woche noch mal',
          es: 'Vuelve a hacer el chequeo cada semana',
          ko: '매주 체크인 다시 하기',
        }),
        detail: t({
          en: 'Come back on the same day each week and take the check-in again. Your plan shows what has changed. Keep the tools that help and drop the ones that do not.',
          tl: 'Bumalik sa parehong araw bawat linggo at sagutan ulit ang check-in. Ipapakita ng plano mo kung ano ang nagbago. Ituloy ang mga tool na nakakatulong at bitawan ang hindi.',
          fr: 'Reviens le même jour chaque semaine et refais le bilan. Ton plan te montre ce qui a changé. Garde les outils qui t’aident et laisse tomber les autres.',
          de: 'Komm jede Woche am gleichen Tag wieder und mach den Check-in noch mal. Dein Plan zeigt dir, was sich verändert hat. Behalte die Übungen, die dir helfen, und lass die anderen weg.',
          es: 'Regresa el mismo día cada semana y vuelve a hacer el chequeo. Tu plan te muestra lo que ha cambiado. Quédate con las herramientas que te ayudan y deja las que no.',
          ko: '매주 같은 요일에 돌아와 체크인을 다시 해요. 계획에서 달라진 점을 볼 수 있어요. 도움이 되는 도구는 계속 쓰고, 그렇지 않은 건 내려놓아요.',
        }),
      },
    ],
  });

  const support: PlanItem[] = [];
  if (suggestProfessional) {
    support.push({
      id: 'professional',
      title: t({
        en: 'Talk to a doctor or counselor',
        tl: 'Kumausap ng doktor o counselor',
        fr: 'Parle à un médecin ou à un psy',
        de: 'Hol dir ärztliche oder psychologische Hilfe',
        es: 'Busca atención médica o psicológica',
        ko: '의사나 상담사와 이야기하기',
      }),
      detail: t({
        en: "From your answers, it's a good time to see a doctor or counselor. A quick check-in like this can only spot the signs. A trained person can help with what's behind them. This plan doesn't replace that.",
        tl: 'Base sa mga sagot mo, magandang magpatingin ka na sa doktor o counselor. Nakikita lang ng check-in na ito ang mga senyales. Sila ang makakatulong sa pinanggagalingan nito. Hindi kayang palitan ng planong ito ang tulong nila.',
        fr: 'D’après tes réponses, c’est le bon moment pour voir un médecin ou un psy. Un bilan rapide comme celui-ci peut seulement repérer des signes. Une personne formée peut t’aider avec ce qu’il y a derrière. Ce plan ne remplace pas cette aide.',
        de: 'Nach deinen Antworten ist jetzt ein guter Zeitpunkt für einen Termin in der Hausarztpraxis oder bei einer Beratungsstelle. Ein kurzer Check-in wie dieser kann nur Anzeichen erkennen. Eine Fachperson kann dir bei dem helfen, was dahintersteckt. Dieser Plan ersetzt das nicht.',
        es: 'Por tus respuestas, es un buen momento para buscar atención médica o psicológica. Un chequeo rápido como este solo puede detectar señales. Una persona preparada puede ayudarte con lo que hay detrás. Este plan no reemplaza esa ayuda.',
        ko: '답을 보면 지금 의사나 상담사를 만나 보면 좋겠어요. 이런 짧은 체크인은 신호를 알아차리는 데까지만 할 수 있어요. 훈련받은 사람은 그 신호 뒤에 있는 것을 함께 다룰 수 있어요. 이 계획이 그 도움을 대신하지는 못해요.',
      }),
    });
  }
  support.push({
    id: 'hope-ai',
    title: t({
      en: 'Talk it through with Hope AI',
      tl: 'Kausapin si Hope AI',
      fr: 'En parler avec Hope AI',
      de: 'Sprich es mit Hope AI durch',
      es: 'Habla de esto con Hope AI',
      ko: 'Hope AI와 이야기 나누기',
    }),
    detail: t({
      en: 'An AI assistant you can chat with at any hour.',
      tl: 'Isang AI assistant na puwede mong i-chat anumang oras.',
      fr: 'Un assistant IA avec qui discuter à toute heure.',
      de: 'Ein KI-Assistent, mit dem du jederzeit chatten kannst.',
      es: 'Un asistente de IA con el que puedes chatear a cualquier hora.',
      ko: '언제든 대화할 수 있는 AI 도우미예요.',
    }),
    href: '/hope-ai',
    linkLabel: t({
      en: 'Chat with Hope AI',
      tl: 'I-chat si Hope AI',
      fr: 'Discuter avec Hope AI',
      de: 'Mit Hope AI chatten',
      es: 'Chatear con Hope AI',
      ko: 'Hope AI와 대화하기',
    }),
  });
  if (wantsFaith) {
    support.push({
      id: 'prayer',
      title: t({
        en: 'Ask a Hope Carrier to pray for you',
        tl: 'Magpadasal sa isang Hope Carrier',
        fr: 'Demande à un Hope Carrier de prier pour toi',
        de: 'Bitte einen Hope Carrier, für dich zu beten',
        es: 'Pídele a un Hope Carrier que ore por ti',
        ko: 'Hope Carrier에게 기도 부탁하기',
      }),
      detail: t({
        en: 'Send a prayer request. You choose what to share.',
        tl: 'Magpadala ng prayer request. Ikaw ang bahala kung ano ang ibabahagi mo.',
        fr: 'Envoie une demande de prière. C’est toi qui choisis ce que tu partages.',
        de: 'Schick ein Gebetsanliegen. Du entscheidest, was du teilst.',
        es: 'Envía una petición de oración. Tú eliges qué compartir.',
        ko: '기도 제목을 보내 주세요. 무엇을 나눌지는 직접 정하면 돼요.',
      }),
      href: '/prayers',
      linkLabel: t({
        en: 'Send a prayer request',
        tl: 'Magpadala ng prayer request',
        fr: 'Envoyer une demande de prière',
        de: 'Gebetsanliegen schicken',
        es: 'Enviar una petición de oración',
        ko: '기도 제목 보내기',
      }),
    });
  }
  support.push({
    id: 'daily-hope',
    title: t({
      en: 'Get Daily Hope by email',
      tl: 'Kumuha ng Daily Hope sa email',
      fr: 'Reçois Daily Hope par e-mail',
      de: 'Hol dir Daily Hope per E-Mail',
      es: 'Recibe Daily Hope por correo',
      ko: 'Daily Hope 이메일로 받기',
    }),
    detail: t({
      en: 'A message in your email every day for 21 days.',
      tl: 'Isang mensahe sa email mo araw-araw sa loob ng 21 araw. Nasa English.',
      fr: 'Un message par e-mail chaque jour pendant 21 jours. Les messages sont en anglais.',
      de: 'Jeden Tag eine Nachricht per E-Mail, 21 Tage lang.',
      es: 'Un mensaje en tu correo cada día durante 21 días.',
      ko: '21일 동안 매일 이메일로 메시지가 와요. 메시지는 영어로 되어 있어요.',
    }),
    href: '/daily-hope',
    linkLabel: t({
      en: 'Sign up',
      tl: 'Mag-sign up',
      fr: 'S’inscrire',
      de: 'Anmelden',
      es: 'Suscribirme',
      ko: '신청하기',
    }),
  });
  sections.push({
    id: 'support',
    heading: t({
      en: 'More support',
      tl: 'Iba pang suporta',
      fr: 'Plus de soutien',
      de: 'Mehr Unterstützung',
      es: 'Más apoyo',
      ko: '더 많은 도움',
    }),
    items: support,
  });

  return {
    summary,
    needsSafetyPlan,
    suggestProfessional,
    sections,
    allTools,
  };
}
