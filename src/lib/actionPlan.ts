import type { FeelingLang } from './feelingPages';

/**
 * Hopeful Beginning Plan: the check-in questions and the rules that turn
 * answers into a personal self-help plan, in English and Taglish.
 *
 * - Mood and anxiety use the PHQ-2 and GAD-2 screening items (free to use).
 *   A score of 3+ on either flags that a professional check-up is worth it.
 * - The safety item is PHQ-9 item 9. Any answer other than "Not at all" puts a
 *   Stanley-Brown style safety plan first.
 * - Tools come from CBT self-help (worry time, sleep), behavioural activation
 *   (small scheduled actions for low mood), WHO "Doing What Matters in Times
 *   of Stress" (grounding, unhooking, acting on values) and safety planning.
 * - The Taglish screening items follow the Filipino PHQ and GAD wording; the
 *   founder reviews any change to them.
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
  /**
   * Daily tools: the commitment in the user's week. English reads after
   * "I will"; Taglish is the whole first-person clause.
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
  return lang === 'tl'
    ? `${TIME_LABELS.tl[time]}, ${item.action}.`
    : `${TIME_LABELS.en[time]}, I will ${item.action}.`;
}

type Both = { en: string; tl: string };

const TWO_WEEKS: Both = {
  en: 'Over the last 2 weeks, how often have you been bothered by:',
  tl: 'Sa nakaraang 2 linggo, gaano kadalas mong naranasan ang:',
};

const frequency: { value: string; label: Both }[] = [
  { value: '0', label: { en: 'Not at all', tl: 'Hindi kailanman' } },
  { value: '1', label: { en: 'Several days', tl: 'Ilang araw' } },
  {
    value: '2',
    label: {
      en: 'More than half the days',
      tl: 'Higit sa kalahati ng mga araw',
    },
  },
  { value: '3', label: { en: 'Nearly every day', tl: 'Halos araw-araw' } },
];

const questionText: {
  key: QuestionKey;
  stem?: Both;
  prompt: Both;
  note?: Both;
  options: { value: string; label: Both }[];
}[] = [
  {
    key: 'down',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Feeling down, depressed or hopeless',
      tl: 'Pakiramdam na malungkot, depressed, o wala nang pag-asa',
    },
    options: frequency,
  },
  {
    key: 'interest',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Little interest or pleasure in doing things',
      tl: 'Kaunti o walang gana o saya sa paggawa ng mga bagay',
    },
    options: frequency,
  },
  {
    key: 'nervous',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Feeling nervous, anxious or on edge',
      tl: 'Kinakabahan, balisa, o hindi mapakali',
    },
    options: frequency,
  },
  {
    key: 'worry',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Not being able to stop or control worrying',
      tl: 'Hindi mapigilan o makontrol ang pag-aalala',
    },
    options: frequency,
  },
  {
    key: 'sleep',
    prompt: {
      en: 'How have you been sleeping?',
      tl: 'Kumusta ang tulog mo nitong mga nakaraang araw?',
    },
    options: [
      { value: 'fine', label: { en: 'Fine', tl: 'Okay naman' } },
      {
        value: 'little',
        label: {
          en: 'Hard to fall asleep or stay asleep',
          tl: 'Hirap makatulog o madalas magising',
        },
      },
      {
        value: 'much',
        label: { en: 'Sleeping too much', tl: 'Sobra ang tulog' },
      },
      {
        value: 'irregular',
        label: { en: 'Different every night', tl: 'Iba-iba gabi-gabi' },
      },
    ],
  },
  {
    key: 'weight',
    prompt: {
      en: "What's weighing on you most right now?",
      tl: 'Ano ang pinakamabigat sa loob mo ngayon?',
    },
    options: [
      {
        value: 'purpose',
        label: {
          en: 'Feeling lost or without purpose',
          tl: 'Pakiramdam na naliligaw o walang direksyon',
        },
      },
      {
        value: 'family',
        label: { en: 'Family or relationships', tl: 'Pamilya o relasyon' },
      },
      {
        value: 'work',
        label: { en: 'Work or school', tl: 'Trabaho o school' },
      },
      { value: 'money', label: { en: 'Money', tl: 'Pera' } },
      { value: 'health', label: { en: 'My health', tl: 'Kalusugan ko' } },
      {
        value: 'grief',
        label: { en: 'Losing someone', tl: 'Pagkawala ng mahal sa buhay' },
      },
      {
        value: 'lonely',
        label: { en: 'Feeling alone', tl: 'Pakiramdam na mag-isa' },
      },
      {
        value: 'unsure',
        label: { en: "I'm not sure", tl: 'Hindi ako sigurado' },
      },
    ],
  },
  {
    key: 'support',
    prompt: {
      en: 'Is there someone you can talk to openly?',
      tl: 'May tao ka bang nakakausap nang bukas ang loob?',
    },
    options: [
      { value: 'yes', label: { en: 'Yes', tl: 'Oo' } },
      { value: 'sometimes', label: { en: 'Sometimes', tl: 'Minsan' } },
      { value: 'no', label: { en: 'Not really', tl: 'Wala talaga' } },
    ],
  },
  {
    key: 'faith',
    prompt: {
      en: 'Should faith be part of your plan?',
      tl: 'Gusto mo bang kasama ang faith sa plano mo?',
    },
    options: [
      { value: 'yes', label: { en: 'Yes', tl: 'Oo' } },
      { value: 'open', label: { en: "I'm open to it", tl: 'Bukas ako diyan' } },
      {
        value: 'no',
        label: { en: 'No, keep it general', tl: 'Hindi, general lang' },
      },
    ],
  },
  {
    key: 'safety',
    stem: TWO_WEEKS,
    prompt: {
      en: 'Thoughts that you would be better off dead, or of hurting yourself',
      tl: 'Mga isip na mas mabuti pang mamatay ka na, o saktan ang sarili mo',
    },
    note: {
      en: 'Your answer stays on this device. It tells us what to put first in your plan.',
      tl: 'Sa phone mo lang naka-save ang sagot mo. Ginagamit lang ito para malaman kung ano ang uunahin sa plano mo.',
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
  const t = (en: string, tl: string) => (lang === 'tl' ? tl : en);
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
      t(
        'Low mood or loss of interest on many days.',
        'Malungkot o walang gana sa maraming araw.'
      )
    );
  } else if (mood > 0) {
    summary.push(
      t('Some days of low mood.', 'May mga araw na mababa ang mood.')
    );
  }
  if (anxiety >= 3) {
    summary.push(
      t(
        'Worry and nerves that are hard to control.',
        'Pag-aalala at kaba na mahirap kontrolin.'
      )
    );
  } else if (anxiety > 0) {
    summary.push(
      t('Some days of worry or nerves.', 'May mga araw ng pag-aalala o kaba.')
    );
  }
  if (answers.sleep && answers.sleep !== 'fine') {
    summary.push(t('Sleep that is off.', 'Hindi maayos ang tulog.'));
  }
  const weight = getQuestions(lang)
    .find((q) => q.key === 'weight')
    ?.options.find((o) => o.value === answers.weight)?.label;
  if (weight && answers.weight !== 'unsure') {
    summary.push(
      t(
        `Weighing on you most: ${weight.toLowerCase()}.`,
        `Pinakamabigat sa loob mo: ${weight.toLowerCase()}.`
      )
    );
  }
  if (summary.length === 0) {
    summary.push(
      t(
        "You're doing okay most days. This plan helps keep it that way.",
        "Kaya mo naman halos araw-araw. Makakatulong ang planong ito para tuloy-tuloy 'yan."
      )
    );
  }

  const sections: PlanSection[] = [];

  if (needsSafetyPlan) {
    sections.push({
      id: 'safety',
      heading: t('Your safety plan', 'Ang safety plan mo'),
      intro: t(
        'Do this first. Fill it in today, save it on your phone, and use it when it all feels too heavy.',
        'Unahin ito. Sagutan ngayong araw, i-save sa phone mo, at gamitin kapag sobrang bigat na.'
      ),
      items: [
        {
          id: 'warning-signs',
          title: t(
            '1. Know your warning signs',
            '1. Kilalanin ang warning signs mo'
          ),
          detail: t(
            'Write down the thoughts, feelings or situations that come before your worst moments.',
            'Isulat ang mga naiisip, pakiramdam, o sitwasyon na nauuna bago ang pinakamabibigat mong sandali.'
          ),
        },
        {
          id: 'cope-alone',
          title: t(
            '2. Things that help you on your own',
            '2. Mga bagay na nakakatulong kapag mag-isa ka'
          ),
          detail: t(
            'List 3 things that take your mind off it for a while, like a walk, music, a shower or cleaning.',
            'Maglista ng 3 bagay na nakakalibang sa iyo sandali, gaya ng paglalakad, music, pagligo, o paglilinis.'
          ),
        },
        {
          id: 'be-around-people',
          title: t(
            '3. People and places that distract you',
            '3. Mga tao at lugar na nakakatulong mag-distract'
          ),
          detail: t(
            'Name a person you can sit with or a place you can go to be around others, even without talking about it.',
            'Isipin ang isang taong puwede mong samahan o lugar na may ibang tao, kahit hindi mo pag-usapan ang nararamdaman mo.'
          ),
        },
        {
          id: 'ask-for-help',
          title: t(
            '4. People you can ask for help',
            '4. Mga taong puwede mong hingan ng tulong'
          ),
          detail: t(
            'Write down 2 people you can call and tell how you feel. Save their numbers at the top of your contacts.',
            'Isulat ang 2 taong puwede mong tawagan at sabihan ng nararamdaman mo. I-save ang numero nila sa itaas ng contacts mo.'
          ),
        },
        {
          id: 'professionals',
          title: t('5. Crisis lines, open 24/7', '5. Crisis lines, bukas 24/7'),
          detail: t(
            'NCMH Crisis Hotline: 1553 from a landline or 0917 899 8727 from a mobile. Hopeline: (02) 8804-4673. If you are in immediate danger, call 911.',
            'NCMH Crisis Hotline: 1553 mula sa landline o 0917 899 8727 mula sa mobile. Hopeline: (02) 8804-4673. Kung nasa panganib ka ngayon, tumawag sa 911.'
          ),
          href: 'tel:1553',
          linkLabel: t('Call 1553 now', 'Tumawag sa 1553 ngayon'),
        },
        {
          id: 'safe-space',
          title: t(
            '6. Make your space safer',
            '6. Gawing mas ligtas ang paligid mo'
          ),
          detail: t(
            'Put away anything you might use to hurt yourself, or ask someone you trust to keep it for now.',
            'Itabi ang anumang bagay na puwede mong gamitin para saktan ang sarili mo, o ipatago muna ito sa taong pinagkakatiwalaan mo.'
          ),
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
        action: t(
          'plan one small thing for tomorrow',
          'magpaplano ako ng isang maliit na gagawin bukas'
        ),
        defaultTime: 'evening',
        title: t(
          'Plan one small thing each day',
          'Magplano ng isang maliit na gagawin bawat araw'
        ),
        detail: t(
          "With low mood, waiting to feel like it doesn't work. Start small. The energy often comes after.",
          'Kapag malungkot ka, bihirang dumating ang gana kung hihintayin mo. Kumilos muna nang kaunti, madalas sumusunod ang gaan.'
        ),
        steps: [
          t(
            'Each evening, choose one thing for tomorrow: something you used to enjoy, or a small task you have been putting off.',
            'Tuwing gabi, pumili ng isang gagawin bukas: isang bagay na dati mong ine-enjoy, o isang maliit na gawaing matagal mo nang pinagpapaliban.'
          ),
          t(
            'Make it small enough to finish in 10 minutes.',
            'Dapat maliit lang, kaya mong tapusin sa loob ng 10 minuto.'
          ),
          t(
            'Do it even if you do not feel like it, then notice how you feel after.',
            'Gawin ito kahit wala kang gana, tapos pansinin ang pakiramdam mo pagkatapos.'
          ),
        ],
      },
    ],
    [
      hopeless || needsSafetyPlan,
      {
        id: 'reasons',
        exercise: 'reasons',
        action: t(
          'read my reasons to keep going',
          'babasahin ko ang mga dahilan ko para magpatuloy'
        ),
        defaultTime: 'morning',
        title: t(
          'Write your reasons to keep going',
          'Isulat ang mga dahilan mo para magpatuloy'
        ),
        detail: t(
          'List the people, plans and small things that matter to you. Keep the list on your phone and read it on hard days.',
          'Ilista ang mga tao, plano, at maliliit na bagay na mahalaga sa iyo. Itago ang listahan sa phone mo at basahin ito sa mabibigat na araw.'
        ),
      },
    ],
    [
      anxious,
      {
        id: 'breathe',
        action: t(
          'slow my breathing for 2 minutes',
          'hihinga ako nang dahan-dahan nang 2 minuto'
        ),
        defaultTime: 'morning',
        exercise: 'breathe',
        title: t('Slow your breathing', 'Dahan-dahang paghinga'),
        detail: t(
          'Breathe in through your nose for 4 counts, then out through your mouth for 6. Keep going for 2 minutes. A longer out-breath slows your heart rate.',
          'Huminga papasok sa ilong nang 4 na bilang, palabas sa bibig nang 6. Ituloy nang 2 minuto. Kapag mas mahaba ang paghinga palabas, bumabagal ang tibok ng puso mo.'
        ),
        steps: [
          t('Use it when you feel tense.', 'Gamitin ito kapag tense ka.'),
          t(
            'Practise once a day when calm.',
            'Mag-practice isang beses araw-araw kahit kalmado ka.'
          ),
        ],
      },
    ],
    [
      Number(answers.worry ?? 0) >= 2 || anxiety >= 3,
      {
        id: 'worry-time',
        exercise: 'worry-time',
        action: t(
          'take my 15-minute worry time',
          'gagawin ko ang 15-minute worry time ko'
        ),
        defaultTime: 'evening',
        title: t('Give worry a time slot', 'Bigyan ng oras ang pag-aalala'),
        detail: t(
          'This puts worry on hold so it takes over less of your day.',
          'Naitatabi nito ang pag-aalala para hindi nito sakupin ang buong araw mo.'
        ),
        steps: [
          t(
            'Pick 15 minutes at the same time each day.',
            'Pumili ng 15 minuto sa parehong oras araw-araw.'
          ),
          t(
            'When a worry comes up at another time, write it down and save it for later.',
            'Kapag may pag-aalalang dumating sa ibang oras, isulat ito at itabi muna para mamaya.'
          ),
          t(
            'In your worry time, ask of each one: can I do something about this? If yes, plan one step. If no, let it go for today.',
            'Sa worry time mo, tanungin ang sarili sa bawat isa: may magagawa ba ako dito? Kung oo, magplano ng isang hakbang. Kung wala, bitawan muna ito ngayong araw.'
          ),
        ],
      },
    ],
    [
      sleepTrouble,
      {
        id: 'sleep',
        action: t(
          'wake up at my set time',
          'gigising ako sa oras na pinili ko'
        ),
        defaultTime: 'morning',
        title: t('Reset your sleep', 'Ayusin ang tulog mo'),
        detail: t(
          'A steady rhythm helps your body know when to sleep.',
          'Kapag pare-pareho ang oras, natututo ang katawan mo kung kailan matutulog.'
        ),
        steps: [
          t(
            'Wake up at the same time every day, weekends too.',
            'Gumising sa parehong oras araw-araw, kahit weekend.'
          ),
          t(
            'Put screens away 30 minutes before bed.',
            'Itabi ang phone at iba pang screen 30 minuto bago matulog.'
          ),
          t(
            'If you cannot sleep after about 20 minutes, get up and do something calm until you feel sleepy.',
            'Kung hindi ka makatulog pagkalipas ng mga 20 minuto, bumangon at gumawa ng tahimik na bagay hanggang antukin ka.'
          ),
        ],
      },
    ],
    [
      answers.sleep === 'much',
      {
        id: 'sleep',
        action: t(
          'get up with my alarm and get daylight',
          'babangon ako sa alarm at magpapaaraw'
        ),
        defaultTime: 'morning',
        title: t(
          'Wake up at the same time every day',
          'Gumising sa parehong oras araw-araw'
        ),
        detail: t(
          'Set an alarm, get up when it rings, and get daylight within the first hour.',
          'Mag-set ng alarm, bumangon pagtunog nito, at magpaaraw sa loob ng unang oras.'
        ),
      },
    ],
    [
      anxious || needsSafetyPlan || answers.weight === 'grief',
      {
        id: 'ground',
        action: t(
          'ground myself with 5-4-3-2-1',
          'gagawin ko ang 5-4-3-2-1 grounding'
        ),
        defaultTime: 'midday',
        exercise: 'ground',
        title: t(
          'Use your 5 senses (5-4-3-2-1)',
          'Gamitin ang 5 senses mo (5-4-3-2-1)'
        ),
        detail: t(
          'When worry or panic builds, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell and 1 you can taste.',
          'Kapag lumalaki ang pag-aalala o panic, pangalanan ang 5 bagay na nakikita mo, 4 na nahahawakan mo, 3 na naririnig mo, 2 na naaamoy mo, at 1 na nalalasahan mo.'
        ),
      },
    ],
    [
      lowMood,
      {
        id: 'move',
        action: t('move for 10 minutes', 'gagalaw ako nang 10 minuto'),
        defaultTime: 'midday',
        title: t(
          'Move for 10 minutes a day',
          'Gumalaw nang 10 minuto araw-araw'
        ),
        detail: t(
          'A walk outside counts. Daylight and movement both lift mood and help sleep.',
          'Pasok na ang paglalakad sa labas. Ang pagpapaaraw at paggalaw ay parehong nakakagaan ng mood at nakakatulong sa tulog.'
        ),
      },
    ],
    [
      anxious || lowMood,
      {
        id: 'unhook',
        exercise: 'unhook',
        action: t(
          'notice and name one heavy thought',
          'papansinin at papangalanan ko ang isang mabigat na isip'
        ),
        defaultTime: 'midday',
        title: t(
          'Step back from a heavy thought',
          'Lumayo nang kaunti sa mabigat na isip'
        ),
        detail: t(
          'When a hard thought grabs you, name it: "I\'m having the thought that I\'m not good enough." Then bring your attention back to what you are doing.',
          'Kapag may mabigat na isip na kumapit sa iyo, pangalanan ito: "Napapansin kong iniisip ko na hindi ako sapat." Tapos ibalik ang atensyon mo sa ginagawa mo.'
        ),
      },
    ],
    [
      true,
      {
        id: 'good-thing',
        action: t(
          'write down one good thing',
          'isusulat ko ang isang magandang nangyari'
        ),
        defaultTime: 'bedtime',
        title: t(
          'Write down one good thing each night',
          'Isulat ang isang magandang nangyari bawat gabi'
        ),
        detail: t(
          'Something that went okay or that you are thankful for, however small.',
          'Isang bagay na naging okay o ipinagpapasalamat mo, kahit gaano kaliit.'
        ),
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
    heading: t('Your daily tools', 'Ang mga daily tool mo'),
    intro: t(
      'Start with one or two. Use them on most days for 4 weeks.',
      'Magsimula sa isa o dalawa. Gamitin ang mga ito sa karamihan ng araw sa loob ng 4 na linggo.'
    ),
    items: tools.slice(0, 4),
  });

  const week: PlanItem[] = [];
  switch (answers.weight) {
    case 'work':
    case 'money':
      week.push({
        id: 'problem-solve',
        title: t(
          'Break the problem into steps',
          'Hatiin ang problema sa maliliit na hakbang'
        ),
        detail:
          answers.weight === 'money'
            ? t(
                'Money worries feel smaller once they are on paper.',
                'Mas lumiliit ang problema sa pera kapag nakasulat na.'
              )
            : t(
                'A big problem is easier to face one step at a time.',
                'Mas madaling harapin ang malaking problema nang paisa-isang hakbang.'
              ),
        steps: [
          t(
            'Write the problem in one sentence.',
            'Isulat ang problema sa isang pangungusap.'
          ),
          t(
            'List 3 things you could do about it, even small ones.',
            'Maglista ng 3 bagay na puwede mong gawin tungkol dito, kahit maliliit.'
          ),
          t(
            'Pick one and do the first step this week.',
            'Pumili ng isa at gawin ang unang hakbang ngayong linggo.'
          ),
        ],
      });
      break;
    case 'family':
      week.push({
        id: 'conversation',
        title: t(
          'Plan one honest conversation',
          'Magplano ng isang tapat na pag-uusap'
        ),
        detail: t(
          'Choose a calm moment. Start with "I feel ... when ... I need ...". Stick to one thing for now.',
          'Pumili ng kalmadong pagkakataon. Isang bagay lang muna ang pag-usapan. Simulan sa: "Nasasaktan ako kapag ... Sana ..."'
        ),
      });
      break;
    case 'health':
      week.push({
        id: 'health',
        title: t(
          'Write down your health questions',
          'Isulat ang mga tanong mo tungkol sa kalusugan'
        ),
        detail: t(
          'List what worries you, then book one appointment to ask about it.',
          'Ilista ang mga inaalala mo, tapos magpa-appointment para itanong ito.'
        ),
      });
      break;
    case 'grief':
      week.push({
        id: 'grief',
        title: t(
          'Give your grief some time each day',
          'Bigyan ng oras ang lungkot araw-araw'
        ),
        detail: t(
          'Grief comes in waves. Give it some time each day: look at photos, write to the person, or talk about them. Keep simple routines like meals and sleep.',
          'Dumarating nang paalon-alon ang lungkot. Bigyan ito ng kaunting oras araw-araw: tingnan ang mga litrato, sumulat sa taong nawala, o pag-usapan siya. Ituloy ang simpleng routine gaya ng pagkain at pagtulog.'
        ),
      });
      break;
    case 'lonely':
      week.push({
        id: 'connect',
        exercise: 'message',
        title: t(
          'Make one small contact each day',
          'Mag-message o kumustahin ang isang tao araw-araw'
        ),
        detail: t(
          'A message, a call or a hello. This month, join one group: a class, a faith group or volunteering.',
          'Isang message, tawag, o hello. Ngayong buwan, sumali sa isang grupo: isang class, faith group, o volunteering.'
        ),
      });
      break;
    case 'purpose':
      week.push({
        id: 'values',
        title: t(
          'Do one thing that matters to you',
          'Gumawa ng isang bagay na mahalaga sa iyo'
        ),
        detail: t(
          'Ask yourself: what kind of person do I want to be this week? Pick one small action that fits, like helping someone or finishing something you care about.',
          'Tanungin ang sarili: anong klaseng tao ang gusto kong maging ngayong linggo? Pumili ng isang maliit na gawaing tugma dito, gaya ng pagtulong sa iba o pagtatapos ng isang bagay na mahalaga sa iyo.'
        ),
      });
      break;
    default:
      week.push({
        id: 'check-in',
        title: t(
          'Check in with yourself each evening',
          'Kumustahin ang sarili tuwing gabi'
        ),
        detail: t(
          'Rate your mood from 1 to 10 and write one word for why. Patterns show up within a week.',
          'I-rate ang mood mo mula 1 hanggang 10 at isulat ang isang salita kung bakit. Makikita mo ang pattern sa loob ng isang linggo.'
        ),
      });
  }
  if (answers.support === 'no') {
    week.push({
      id: 'reach-out',
      exercise: 'message',
      title: t('Reach out to one person', 'Kumausap ng isang tao'),
      detail: t(
        'Pick one person you trust and send: "Can we talk this week? I\'ve been having a hard time."',
        'Pumili ng isang taong pinagkakatiwalaan mo at i-send ito: "Puwede ba tayong mag-usap ngayong linggo? Medyo mabigat lang ako lately."'
      ),
    });
  } else if (answers.support === 'sometimes') {
    week.push({
      id: 'reach-out',
      exercise: 'message',
      title: t('Set a time to talk', 'Mag-set ng oras para mag-usap'),
      detail: t(
        'Choose a day this week and tell someone you trust that you would like to talk.',
        'Pumili ng araw ngayong linggo at sabihan ang taong pinagkakatiwalaan mo na gusto mong makipag-usap.'
      ),
    });
  }
  sections.push({
    id: 'week',
    heading: t('Your step for this week', 'Ang hakbang mo ngayong linggo'),
    items: week,
  });

  if (wantsFaith) {
    sections.push({
      id: 'faith',
      heading: t('Faith', 'Pananampalataya'),
      items: [
        {
          id: 'quiet-time',
          title: t(
            'Take 5 quiet minutes each morning',
            'Maglaan ng 5 tahimik na minuto tuwing umaga'
          ),
          detail:
            answers.faith === 'yes'
              ? t(
                  'Pray or read a Psalm before you check your phone. Psalm 23 and Psalm 46 are good places to start.',
                  'Magdasal o magbasa ng isang Psalm bago mo tingnan ang phone mo. Magandang simula ang Psalm 23 at Psalm 46.'
                )
              : t(
                  'Sit quietly before you check your phone. If you like, read Psalm 23 or say a short prayer.',
                  'Umupo nang tahimik bago mo tingnan ang phone mo. Kung gusto mo, basahin ang Psalm 23 o magdasal nang maikli.'
                ),
          href: WAR_ROOM_URL,
          linkLabel: t(
            'Use Prayer War Room for a guided prayer time',
            'Gamitin ang Prayer War Room para sa guided prayer time'
          ),
        },
      ],
    });
  }

  sections.push({
    id: 'track',
    heading: t("See what's changed", 'Silipin kung ano na ang nagbago'),
    items: [
      {
        id: 'retake',
        title: t(
          'Take the check-in again each week',
          'Sagutan ulit ang check-in bawat linggo'
        ),
        detail: t(
          'Come back on the same day each week and take the check-in again. Your plan shows what has changed. Keep the tools that help and drop the ones that do not.',
          'Bumalik sa parehong araw bawat linggo at sagutan ulit ang check-in. Ipapakita ng plano mo kung ano ang nagbago. Ituloy ang mga tool na nakakatulong at bitawan ang hindi.'
        ),
      },
    ],
  });

  const support: PlanItem[] = [];
  if (suggestProfessional) {
    support.push({
      id: 'professional',
      title: t(
        'Talk to a doctor or counselor',
        'Kumausap ng doktor o counselor'
      ),
      detail: t(
        "From your answers, it's a good time to see a doctor or counselor. A quick check-in like this can only spot the signs. A trained person can help with what's behind them. This plan doesn't replace that.",
        'Base sa mga sagot mo, magandang magpatingin ka na sa doktor o counselor. Nakikita lang ng check-in na ito ang mga senyales. Sila ang makakatulong sa pinanggagalingan nito. Hindi kayang palitan ng planong ito ang tulong nila.'
      ),
    });
  }
  support.push({
    id: 'hope-ai',
    title: t('Talk it through with Hope AI', 'Kausapin si Hope AI'),
    detail: t(
      'An AI assistant you can chat with at any hour.',
      'Isang AI assistant na puwede mong i-chat anumang oras.'
    ),
    href: '/hope-ai',
    linkLabel: t('Chat with Hope AI', 'I-chat si Hope AI'),
  });
  if (wantsFaith) {
    support.push({
      id: 'prayer',
      title: t(
        'Ask a Hope Carrier to pray for you',
        'Magpadasal sa isang Hope Carrier'
      ),
      detail: t(
        'Send a prayer request. You choose what to share.',
        'Magpadala ng prayer request. Ikaw ang bahala kung ano ang ibabahagi mo.'
      ),
      href: '/prayers',
      linkLabel: t('Send a prayer request', 'Magpadala ng prayer request'),
    });
  }
  support.push({
    id: 'daily-hope',
    title: t('Get Daily Hope by email', 'Kumuha ng Daily Hope sa email'),
    detail: t(
      'A message in your email every day for 21 days.',
      'Isang mensahe sa email mo araw-araw sa loob ng 21 araw. Nasa English.'
    ),
    href: '/daily-hope',
    linkLabel: t('Sign up', 'Mag-sign up'),
  });
  sections.push({
    id: 'support',
    heading: t('More support', 'Iba pang suporta'),
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
