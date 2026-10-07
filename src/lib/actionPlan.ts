/**
 * Hopeful Beginning Plan: the check-in questions and the rules that turn
 * answers into a personal self-help plan.
 *
 * - Mood and anxiety use the PHQ-2 and GAD-2 screening items (free to use).
 *   A score of 3+ on either flags that a professional check-up is worth it.
 * - The safety item is PHQ-9 item 9. Any answer other than "Not at all" puts a
 *   Stanley-Brown style safety plan first.
 * - Tools come from CBT self-help (worry time, sleep), behavioural activation
 *   (small scheduled actions for low mood), WHO "Doing What Matters in Times
 *   of Stress" (grounding, unhooking, acting on values) and safety planning.
 *
 * Answers never leave the browser. Only the finished plan is sent, and only
 * when the visitor asks for it by email.
 */

export const ECOACH_URL = 'https://m.me/Mayhimalaeveryday';
export const WAR_ROOM_URL = 'https://warroom.hopebegins.today';

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

export const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: 'Every morning',
  midday: 'Every afternoon',
  evening: 'Every evening',
  bedtime: 'Before bed',
};

export interface PlanItem {
  id: string;
  title: string;
  detail: string;
  steps?: string[];
  href?: string;
  linkLabel?: string;
  /** Daily tools: what "I will ..." reads as in the user's week. */
  action?: string;
  defaultTime?: TimeOfDay;
  /** Daily tools with a guided version on the page. */
  exercise?: 'breathe' | 'ground';
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
}

const TWO_WEEKS = 'Over the last 2 weeks, how often have you been bothered by:';

const frequency = [
  { value: '0', label: 'Not at all' },
  { value: '1', label: 'Several days' },
  { value: '2', label: 'More than half the days' },
  { value: '3', label: 'Nearly every day' },
];

export const questions: Question[] = [
  {
    key: 'down',
    stem: TWO_WEEKS,
    prompt: 'Feeling down, depressed or hopeless',
    options: frequency,
  },
  {
    key: 'interest',
    stem: TWO_WEEKS,
    prompt: 'Little interest or pleasure in doing things',
    options: frequency,
  },
  {
    key: 'nervous',
    stem: TWO_WEEKS,
    prompt: 'Feeling nervous, anxious or on edge',
    options: frequency,
  },
  {
    key: 'worry',
    stem: TWO_WEEKS,
    prompt: 'Not being able to stop or control worrying',
    options: frequency,
  },
  {
    key: 'sleep',
    prompt: 'How have you been sleeping?',
    options: [
      { value: 'fine', label: 'Fine' },
      { value: 'little', label: 'Hard to fall asleep or stay asleep' },
      { value: 'much', label: 'Sleeping too much' },
      { value: 'irregular', label: 'Different every night' },
    ],
  },
  {
    key: 'weight',
    prompt: "What's weighing on you most right now?",
    options: [
      { value: 'purpose', label: 'Feeling lost or without purpose' },
      { value: 'family', label: 'Family or relationships' },
      { value: 'work', label: 'Work or school' },
      { value: 'money', label: 'Money' },
      { value: 'health', label: 'My health' },
      { value: 'grief', label: 'Losing someone' },
      { value: 'lonely', label: 'Feeling alone' },
      { value: 'unsure', label: "I'm not sure" },
    ],
  },
  {
    key: 'support',
    prompt: 'Is there someone you can talk to openly?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'Not really' },
    ],
  },
  {
    key: 'faith',
    prompt: 'Should faith be part of your plan?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'open', label: "I'm open to it" },
      { value: 'no', label: 'No, keep it general' },
    ],
  },
  {
    key: 'safety',
    stem: TWO_WEEKS,
    prompt:
      'Thoughts that you would be better off dead, or of hurting yourself',
    note: 'Your answer stays on this device. It tells us what to put first in your plan.',
    options: frequency,
  },
];

const score = (answers: Answers, ...keys: QuestionKey[]) =>
  keys.reduce((total, key) => total + Number(answers[key] ?? 0), 0);

const weightLabel = (answers: Answers) =>
  questions
    .find((q) => q.key === 'weight')
    ?.options.find((o) => o.value === answers.weight)?.label;

export function buildPlan(answers: Answers): Plan {
  const mood = score(answers, 'down', 'interest');
  const anxiety = score(answers, 'nervous', 'worry');
  const needsSafetyPlan = score(answers, 'safety') > 0;
  const suggestProfessional = mood >= 3 || anxiety >= 3 || needsSafetyPlan;
  const lowMood = mood >= 2 || Number(answers.down ?? 0) >= 2;
  const anxious = anxiety >= 2;
  const hopeless =
    Number(answers.down ?? 0) >= 2 || answers.weight === 'purpose';
  const wantsFaith = answers.faith === 'yes' || answers.faith === 'open';

  const summary: string[] = [];
  if (mood >= 3) {
    summary.push('Low mood or loss of interest on many days.');
  } else if (mood > 0) {
    summary.push('Some days of low mood.');
  }
  if (anxiety >= 3) {
    summary.push('Worry and nerves that are hard to control.');
  } else if (anxiety > 0) {
    summary.push('Some days of worry or nerves.');
  }
  if (answers.sleep && answers.sleep !== 'fine') {
    summary.push('Sleep that is off.');
  }
  const weight = weightLabel(answers);
  if (weight && answers.weight !== 'unsure') {
    summary.push(`Weighing on you most: ${weight.toLowerCase()}.`);
  }
  if (summary.length === 0) {
    summary.push(
      'You are mostly coping. This plan helps you keep it that way.'
    );
  }

  const sections: PlanSection[] = [];

  if (needsSafetyPlan) {
    sections.push({
      id: 'safety',
      heading: 'Your safety plan',
      intro:
        'Do this first. Fill it in today, save it on your phone, and use it when things get dark.',
      items: [
        {
          id: 'warning-signs',
          title: '1. Know your warning signs',
          detail:
            'Write down the thoughts, feelings or situations that come before your worst moments.',
        },
        {
          id: 'cope-alone',
          title: '2. Things that help you on your own',
          detail:
            'List 3 things that take your mind off it for a while, like a walk, music, a shower or cleaning.',
        },
        {
          id: 'be-around-people',
          title: '3. People and places that distract you',
          detail:
            'Name a person you can sit with or a place you can go to be around others, even without talking about it.',
        },
        {
          id: 'ask-for-help',
          title: '4. People you can ask for help',
          detail:
            'Write down 2 people you can call and tell how you feel. Save their numbers at the top of your contacts.',
        },
        {
          id: 'professionals',
          title: '5. Crisis lines, open 24/7',
          detail:
            'NCMH Crisis Hotline: 1553 from a landline or 0917 899 8727 from a mobile. Hopeline: (02) 8804-4673. If you are in immediate danger, call 911.',
          href: 'tel:1553',
          linkLabel: 'Call 1553 now',
        },
        {
          id: 'safe-space',
          title: '6. Make your space safer',
          detail:
            'Put away anything you might use to hurt yourself, or ask someone you trust to keep it for now.',
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
        action: 'plan one small thing for tomorrow',
        defaultTime: 'evening',
        title: 'Plan one small thing each day',
        detail:
          "With low mood, waiting to feel like it doesn't work. Doing comes first, and feeling better follows.",
        steps: [
          'Each evening, choose one thing for tomorrow: something you used to enjoy, or a small task you have been putting off.',
          'Make it small enough to finish in 10 minutes.',
          'Do it even if you do not feel like it, then notice how you feel after.',
        ],
      },
    ],
    [
      hopeless || needsSafetyPlan,
      {
        id: 'reasons',
        action: 'read my reasons to keep going',
        defaultTime: 'morning',
        title: 'Write your reasons to keep going',
        detail:
          'List the people, plans and small things that matter to you. Keep the list on your phone and read it on hard days.',
      },
    ],
    [
      anxious,
      {
        id: 'breathe',
        action: 'slow my breathing for 2 minutes',
        defaultTime: 'morning',
        exercise: 'breathe',
        title: 'Slow your breathing',
        detail:
          'Breathe in through your nose for 4 counts, then out through your mouth for 6. Keep going for 2 minutes. A longer out-breath tells your body it is safe.',
        steps: [
          'Use it when you feel tense.',
          'Practise once a day when calm.',
        ],
      },
    ],
    [
      Number(answers.worry ?? 0) >= 2 || anxiety >= 3,
      {
        id: 'worry-time',
        action: 'take my 15-minute worry time',
        defaultTime: 'evening',
        title: 'Give worry a time slot',
        detail: 'This puts worry on hold so it takes over less of your day.',
        steps: [
          'Pick 15 minutes at the same time each day.',
          'When a worry comes up at another time, write it down and save it for later.',
          'In your worry time, ask of each one: can I do something about this? If yes, plan one step. If no, let it go for today.',
        ],
      },
    ],
    [
      sleepTrouble,
      {
        id: 'sleep',
        action: 'wake up at my set time',
        defaultTime: 'morning',
        title: 'Reset your sleep',
        detail: 'A steady rhythm helps your body know when to sleep.',
        steps: [
          'Wake up at the same time every day, weekends too.',
          'Put screens away 30 minutes before bed.',
          'If you cannot sleep after about 20 minutes, get up and do something calm until you feel sleepy.',
        ],
      },
    ],
    [
      answers.sleep === 'much',
      {
        id: 'sleep',
        action: 'get up with my alarm and get daylight',
        defaultTime: 'morning',
        title: 'Wake up at the same time every day',
        detail:
          'Set an alarm, get up when it rings, and get daylight within the first hour.',
      },
    ],
    [
      anxious || needsSafetyPlan || answers.weight === 'grief',
      {
        id: 'ground',
        action: 'ground myself with 5-4-3-2-1',
        defaultTime: 'midday',
        exercise: 'ground',
        title: 'Ground yourself with 5-4-3-2-1',
        detail:
          'When worry or panic builds, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell and 1 you can taste.',
      },
    ],
    [
      lowMood,
      {
        id: 'move',
        action: 'move for 10 minutes',
        defaultTime: 'midday',
        title: 'Move for 10 minutes a day',
        detail:
          'A walk outside counts. Daylight and movement both lift mood and help sleep.',
      },
    ],
    [
      anxious || lowMood,
      {
        id: 'unhook',
        action: 'notice and name one heavy thought',
        defaultTime: 'midday',
        title: 'Unhook from heavy thoughts',
        detail:
          'When a hard thought grabs you, name it: "I\'m having the thought that I\'m not good enough." Then bring your attention back to what you are doing.',
      },
    ],
    [
      true,
      {
        id: 'good-thing',
        action: 'write down one good thing',
        defaultTime: 'bedtime',
        title: 'Write down one good thing each night',
        detail:
          'Something that went okay or that you are thankful for, however small.',
      },
    ],
  ];
  const applicable = toolCandidates
    .filter(([applies]) => applies)
    .map(([, item]) => item);
  // The fallback only fills in when fewer than 2 tools apply.
  const tools =
    applicable.length > 2
      ? applicable.filter((item) => item.id !== 'good-thing')
      : applicable;
  sections.push({
    id: 'tools',
    heading: 'Your daily tools',
    intro: 'Start with one or two. Use them every day for a week.',
    items: tools.slice(0, 4),
  });

  const week: PlanItem[] = [];
  switch (answers.weight) {
    case 'work':
    case 'money':
      week.push({
        id: 'problem-solve',
        title: 'Break the problem into steps',
        detail:
          answers.weight === 'money'
            ? 'Money worries feel smaller once they are on paper.'
            : 'A big problem is easier to face one step at a time.',
        steps: [
          'Write the problem in one sentence.',
          'List 3 things you could do about it, even small ones.',
          'Pick one and do the first step this week.',
        ],
      });
      break;
    case 'family':
      week.push({
        id: 'conversation',
        title: 'Plan one honest conversation',
        detail:
          'Choose a calm moment. Start with "I feel ... when ... I need ...". Talk about one thing, not everything.',
      });
      break;
    case 'health':
      week.push({
        id: 'health',
        title: 'Write down your health questions',
        detail:
          'List what worries you, then book one appointment to ask about it.',
      });
      break;
    case 'grief':
      week.push({
        id: 'grief',
        title: 'Make space for grief',
        detail:
          'Grief comes in waves. Give it some time each day: look at photos, write to the person, or talk about them. Keep simple routines like meals and sleep.',
      });
      break;
    case 'lonely':
      week.push({
        id: 'connect',
        title: 'Make one small contact each day',
        detail:
          'A message, a call or a hello. This month, join one group: a class, a faith group or volunteering.',
      });
      break;
    case 'purpose':
      week.push({
        id: 'values',
        title: 'Do one thing that matters to you',
        detail:
          'Ask yourself: what kind of person do I want to be this week? Pick one small action that fits, like helping someone or finishing something you care about.',
      });
      break;
    default:
      week.push({
        id: 'check-in',
        title: 'Check in with yourself each evening',
        detail:
          'Rate your mood from 1 to 10 and write one word for why. Patterns show up within a week.',
      });
  }
  if (answers.support === 'no') {
    week.push({
      id: 'reach-out',
      title: 'Reach out to one person',
      detail:
        'Pick one person you trust and send: "Can we talk this week? I\'ve been having a hard time."',
    });
  } else if (answers.support === 'sometimes') {
    week.push({
      id: 'reach-out',
      title: 'Set a time to talk',
      detail:
        'Choose a day this week and tell someone you trust that you would like to talk.',
    });
  }
  sections.push({
    id: 'week',
    heading: 'Your step for this week',
    items: week,
  });

  if (wantsFaith) {
    sections.push({
      id: 'faith',
      heading: 'Faith',
      items: [
        {
          id: 'quiet-time',
          title: 'Take 5 quiet minutes each morning',
          detail:
            answers.faith === 'yes'
              ? 'Pray or read a Psalm before you check your phone. Psalm 23 and Psalm 46 are good places to start.'
              : 'Sit quietly before you check your phone. If you like, read Psalm 23 or say a short prayer.',
          href: WAR_ROOM_URL,
          linkLabel: 'Use Prayer War Room for a guided prayer time',
        },
      ],
    });
  }

  sections.push({
    id: 'track',
    heading: 'Track your progress',
    items: [
      {
        id: 'retake',
        title: 'Take this check-in again in 2 weeks',
        detail:
          'Come back to hopebegins.today/action-plan and compare your answers. Keep the tools that help and drop the ones that do not.',
      },
    ],
  });

  const support: PlanItem[] = [];
  if (suggestProfessional) {
    support.push({
      id: 'professional',
      title: 'Talk to a doctor or counselor',
      detail:
        'Your answers suggest a professional check-up is worth it. Screening tools like this one flag when talking to someone trained can help. This plan does not replace professional care.',
    });
  }
  support.push({
    id: 'hope-ai',
    title: 'Talk it through with Hope AI',
    detail: 'An AI assistant you can chat with at any hour.',
    href: '/hope-ai',
    linkLabel: 'Chat with Hope',
  });
  if (wantsFaith) {
    support.push({
      id: 'prayer',
      title: 'Ask a Hope Carrier to pray for you',
      detail: 'Send a prayer request. You choose what to share.',
      href: '/prayers',
      linkLabel: 'Send a prayer request',
    });
  }
  support.push({
    id: 'daily-hope',
    title: 'Get Daily Hope Drops',
    detail: 'A message in your email every day for 21 days.',
    href: '/daily-hope',
    linkLabel: 'Sign up',
  });
  sections.push({
    id: 'support',
    heading: 'More support',
    items: support,
  });

  return { summary, needsSafetyPlan, suggestProfessional, sections };
}
