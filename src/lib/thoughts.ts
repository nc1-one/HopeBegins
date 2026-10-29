import type { FeelingLang } from './feelingPages';

/**
 * Heavy thoughts many Filipinos know, the thinking trap each one usually
 * falls into, and kinder, truer ways to see it. The tools offer these to
 * tap, so nobody has to find the words first; writing their own stays
 * optional.
 *
 * Built on CBT's thought record (notice the thought, rate it, name the
 * trap, weigh it, find a balanced thought, rate it again). The balanced
 * thoughts aim for believable, not cheerful. Clinical wording is reviewed
 * by the founder.
 */

type Both = Record<FeelingLang, string>;

export type TrapId =
  | 'mind-reading'
  | 'fortune-telling'
  | 'catastrophizing'
  | 'all-or-nothing'
  | 'labeling'
  | 'should'
  | 'personalizing'
  | 'emotional'
  | 'overgeneralizing';

export interface Trap {
  name: Both;
  means: Both;
  /** The question to ask yourself. */
  ask: Both;
  /** Balanced thoughts that fit any thought caught in this trap. */
  balanced: Both[];
}

export const TRAPS: Record<TrapId, Trap> = {
  'mind-reading': {
    name: { en: 'Mind reading', tl: 'Mind reading' },
    means: {
      en: 'Guessing what other people think of you, without proof.',
      tl: 'Hinuhulaan mo ang iniisip ng iba tungkol sa iyo, kahit walang patunay.',
    },
    ask: {
      en: 'What do I actually know, and what am I guessing?',
      tl: 'Ano ang talagang alam ko, at ano ang hula ko lang?',
    },
    balanced: [
      {
        en: "I can't read minds. I can ask, or let it go.",
        tl: 'Hindi ko nababasa ang isip ng iba. Puwede akong magtanong, o bitawan na lang ito.',
      },
      {
        en: 'Most people are busy with their own worries.',
        tl: 'Abala ang karamihan sa sarili nilang mga problema.',
      },
    ],
  },
  'fortune-telling': {
    name: { en: 'Fortune telling', tl: 'Fortune telling' },
    means: {
      en: 'Being sure something will go badly before it has happened.',
      tl: 'Sigurado kang papalpak ang isang bagay kahit hindi pa ito nangyayari.',
    },
    ask: {
      en: 'What else could happen? What happened the last time?',
      tl: 'Ano pa ang puwedeng mangyari? Ano ang nangyari noong huli?',
    },
    balanced: [
      {
        en: "I don't know how this will turn out yet.",
        tl: 'Hindi ko pa alam kung paano ito matatapos.',
      },
      {
        en: "I've expected the worst before, and it didn't happen.",
        tl: 'Inasahan ko na dati ang pinakamasama, at hindi ito nangyari.',
      },
    ],
  },
  catastrophizing: {
    name: { en: 'Catastrophizing', tl: 'Catastrophizing' },
    means: {
      en: 'Jumping straight to the worst thing that could happen.',
      tl: 'Pinakamasamang posibleng mangyari agad ang naiisip mo.',
    },
    ask: {
      en: 'What is most likely to happen, and how would I cope?',
      tl: 'Ano ang pinakamalamang na mangyari, at paano ko ito haharapin?',
    },
    balanced: [
      {
        en: 'This is hard, and I have got through hard things.',
        tl: 'Mahirap ito, at nalampasan ko na ang mahihirap na bagay.',
      },
      {
        en: 'The worst is possible. It is also unlikely.',
        tl: 'Posible ang pinakamasama. Malabo rin itong mangyari.',
      },
    ],
  },
  'all-or-nothing': {
    name: { en: 'All-or-nothing', tl: 'All-or-nothing' },
    means: {
      en: 'Seeing things as perfect or a total failure, with nothing in between.',
      tl: 'Perpekto o palpak lang ang tingin mo, walang gitna.',
    },
    ask: {
      en: 'Is there a middle ground here?',
      tl: 'May gitna ba rito?',
    },
    balanced: [
      {
        en: 'Some of it went wrong. Some of it went okay.',
        tl: 'May hindi naging maayos. May naging okay din.',
      },
      {
        en: 'Doing part of it still counts.',
        tl: 'May halaga pa rin ang nagawa ko, kahit bahagi lang.',
      },
    ],
  },
  labeling: {
    name: { en: 'Labeling', tl: 'Labeling' },
    means: {
      en: 'Calling yourself a harsh name because of one mistake or one hard day.',
      tl: 'Tinatawag mo ang sarili mo ng masakit na pangalan dahil sa isang pagkakamali o isang mahirap na araw.',
    },
    ask: {
      en: 'Would I call a friend that for the same thing?',
      tl: 'Tatawagin ko ba ang kaibigan ko ng ganyan dahil sa parehong bagay?',
    },
    balanced: [
      {
        en: 'I made a mistake. It is something I did, and it is only one part of me.',
        tl: 'Nagkamali ako. Ginawa ko iyon, at isang bahagi lang iyon ng pagkatao ko.',
      },
      {
        en: "I'm a person who is still learning.",
        tl: 'Tao ako na natututo pa.',
      },
    ],
  },
  should: {
    name: { en: 'Should statements', tl: "Puro 'dapat'" },
    means: {
      en: "Pushing yourself with 'should' and 'must' until it feels heavy.",
      tl: "Puro 'dapat' at 'kailangan' ang sinasabi mo sa sarili mo hanggang bumigat ang loob mo.",
    },
    ask: {
      en: 'Who says I should? What would I tell a friend?',
      tl: 'Sino ang nagsabing dapat? Ano ang sasabihin ko sa isang kaibigan?',
    },
    balanced: [
      {
        en: "I'd like to do better, and I can be patient with myself.",
        tl: 'Gusto kong mas gumaling pa, at kaya kong maging pasensyoso sa sarili ko.',
      },
      { en: 'My pace is my own.', tl: 'May sarili akong bilis.' },
    ],
  },
  personalizing: {
    name: { en: 'Personalizing', tl: 'Personalizing' },
    means: {
      en: "Taking all the blame for things that weren't only up to you.",
      tl: 'Inaako mo ang lahat ng sisi sa mga bagay na hindi lang ikaw ang may hawak.',
    },
    ask: {
      en: 'What else played a part here?',
      tl: 'Ano pa ang naging dahilan nito?',
    },
    balanced: [
      {
        en: 'I can own my part without carrying all of it.',
        tl: 'Kaya kong akuin ang bahagi ko nang hindi binubuhat ang lahat.',
      },
      {
        en: 'Other people and other things played a part too.',
        tl: 'May bahagi rin ang ibang tao at ibang bagay.',
      },
    ],
  },
  emotional: {
    name: { en: 'Emotional reasoning', tl: 'Emotional reasoning' },
    means: {
      en: 'Believing something is true because it feels true.',
      tl: 'Iniisip mong totoo ang isang bagay dahil ganoon ang pakiramdam mo.',
    },
    ask: {
      en: 'If I felt calmer, would I still believe this?',
      tl: 'Kung mas kalmado ako, ganito pa rin ba ang paniniwala ko?',
    },
    balanced: [
      {
        en: 'My feelings are real, and they can still be wrong about the facts.',
        tl: 'Totoo ang nararamdaman ko, at puwede pa rin itong magkamali tungkol sa nangyayari.',
      },
      {
        en: 'This feeling will pass, even if the problem takes longer.',
        tl: 'Lilipas din ang pakiramdam na ito, kahit matagal pa bago maayos ang problema.',
      },
    ],
  },
  overgeneralizing: {
    name: { en: 'Overgeneralizing', tl: 'Overgeneralizing' },
    means: {
      en: "Turning one bad moment into 'always' or 'never'.",
      tl: "Isang masamang pangyayari, tapos ginagawa mo nang 'palagi' o 'hindi kailanman'.",
    },
    ask: {
      en: 'Is it really always? When was it different?',
      tl: 'Palagi ba talaga? Kailan ito naging iba?',
    },
    balanced: [
      {
        en: "This happened, and it hasn't happened every time.",
        tl: 'Nangyari ito, at hindi ito nangyayari sa lahat ng pagkakataon.',
      },
      {
        en: 'There have been times it went differently.',
        tl: 'May mga pagkakataong iba ang nangyari.',
      },
    ],
  },
};

export const TRAP_IDS = Object.keys(TRAPS) as TrapId[];

export interface Thought {
  id: string;
  text: Both;
  trap: TrapId;
  balanced: Both[];
  /** Thoughts that can come with thinking of ending your life. */
  risk?: boolean;
}

export const THOUGHTS: Thought[] = [
  {
    id: 'not-enough',
    text: { en: "I'm not good enough.", tl: 'Hindi ako sapat.' },
    trap: 'labeling',
    balanced: [
      {
        en: "I'm still learning, like everyone else.",
        tl: 'Natututo pa ako, gaya ng lahat.',
      },
      {
        en: 'One mistake or one bad day is only a small part of me.',
        tl: 'Maliit na bahagi lang ng pagkatao ko ang isang pagkakamali o isang masamang araw.',
      },
      {
        en: "God's love for me doesn't depend on how well I do.",
        tl: 'Hindi nakadepende sa galing ko ang pagmamahal ng Diyos sa akin.',
      },
    ],
  },
  {
    id: 'judging',
    text: {
      en: "Everyone's judging me.",
      tl: 'Hinuhusgahan ako ng lahat.',
    },
    trap: 'mind-reading',
    balanced: [
      {
        en: "I can't know what they're thinking. Most people are busy with their own worries.",
        tl: 'Hindi ko alam ang iniisip nila. Abala rin ang karamihan sa sarili nilang problema.',
      },
      {
        en: 'Even if a few people judge me, the people who matter know me better.',
        tl: 'Kahit may manghusga, mas kilala ako ng mga taong mahalaga sa akin.',
      },
      {
        en: 'How I see myself matters more than my guess about how they see me.',
        tl: 'Mas mahalaga ang tingin ko sa sarili ko kaysa sa hula ko sa tingin nila.',
      },
    ],
  },
  {
    id: 'never',
    text: {
      en: "I'll never get through this.",
      tl: 'Hindi ko na ito malalampasan.',
    },
    trap: 'fortune-telling',
    balanced: [
      {
        en: "This is hard right now. I've got through hard things before.",
        tl: 'Mahirap ito ngayon. Nalampasan ko na ang mahihirap na bagay dati.',
      },
      {
        en: 'Today I only need the next small step.',
        tl: 'Ang susunod na maliit na hakbang lang ang kailangan ko ngayon.',
      },
      {
        en: "Feelings this heavy do change, even when it seems they won't.",
        tl: 'Nagbabago rin ang ganito kabigat na pakiramdam, kahit parang hindi.',
      },
    ],
  },
  {
    id: 'something-bad',
    text: {
      en: 'Something bad is going to happen.',
      tl: 'May masamang mangyayari.',
    },
    trap: 'catastrophizing',
    balanced: [
      {
        en: "I'm picturing the worst. What usually happens is much smaller.",
        tl: 'Pinakamasama agad ang naiisip ko. Kadalasan, mas maliit ang talagang nangyayari.',
      },
      {
        en: "If something hard happens, I'll find a way through it, with help.",
        tl: 'Kung may mahirap na mangyari, makakahanap ako ng paraan, kasama ang ibang tao.',
      },
      {
        en: 'Right now, I can focus on what is in front of me.',
        tl: 'Ngayon, ang nasa harap ko lang ang kailangan kong harapin.',
      },
    ],
  },
  {
    id: 'my-fault',
    text: { en: "It's all my fault.", tl: 'Kasalanan ko lahat.' },
    trap: 'personalizing',
    balanced: [
      {
        en: 'Many things played a part, and some were out of my hands.',
        tl: 'Maraming dahilan kung bakit ito nangyari, at may mga bagay na hindi ko hawak.',
      },
      {
        en: 'I can own my part without carrying all of it.',
        tl: 'Kaya kong akuin ang bahagi ko nang hindi binubuhat ang lahat.',
      },
      {
        en: "If a friend were in my place, I wouldn't blame them for everything.",
        tl: 'Kung kaibigan ko ang nasa lugar ko, hindi ko siya sisisihin sa lahat.',
      },
    ],
  },
  {
    id: 'behind',
    text: {
      en: 'I should be further along by now.',
      tl: 'Dapat may narating na ako sa edad ko.',
    },
    trap: 'should',
    balanced: [
      {
        en: 'Everyone has their own timeline. Social media only shows the highlights.',
        tl: 'Iba-iba ang timeline ng bawat tao. Highlights lang ang nakikita ko sa social media.',
      },
      {
        en: "I've come further than I give myself credit for.",
        tl: 'Mas malayo na ang narating ko kaysa sa inaamin ko sa sarili ko.',
      },
      {
        en: 'I can take one step forward from where I am today.',
        tl: 'Kaya kong humakbang mula sa kung nasaan ako ngayon.',
      },
    ],
  },
  {
    id: 'burden',
    text: { en: "I'm a burden to everyone.", tl: 'Pabigat lang ako sa lahat.' },
    trap: 'emotional',
    risk: true,
    balanced: [
      {
        en: "I'm going through a hard season. Needing help is part of being human.",
        tl: 'Mabigat ang pinagdadaanan ko ngayon. Normal sa tao ang mangailangan ng tulong.',
      },
      {
        en: 'The people who care about me would want to help if they knew.',
        tl: 'Gugustuhin ng mga nagmamalasakit sa akin na tumulong kung alam nila.',
      },
      {
        en: "I've been there for others. It's okay to be the one helped now.",
        tl: 'Nandiyan din ako dati para sa iba. Okay lang na ako naman ang tulungan ngayon.',
      },
    ],
  },
  {
    id: 'nobody-cares',
    text: {
      en: 'Nobody really cares about me.',
      tl: 'Wala talagang may pakialam sa akin.',
    },
    trap: 'overgeneralizing',
    risk: true,
    balanced: [
      {
        en: 'It feels that way right now. Some people have shown me they care.',
        tl: 'Ganoon ang pakiramdam ko ngayon. May mga taong nagpakita na nagmamalasakit sila.',
      },
      {
        en: "Some people don't know how I feel because I haven't told them yet.",
        tl: 'May mga hindi nakakaalam ng nararamdaman ko dahil hindi ko pa nasasabi.',
      },
      {
        en: 'God sees me and cares for me, even when people fall short.',
        tl: 'Nakikita ako ng Diyos at mahalaga ako sa Kanya, kahit nagkukulang ang mga tao.',
      },
    ],
  },
];

/** How strongly the thought feels true, from 1 (a little) to 5 (completely). */
export const BELIEF: Both[] = [
  { en: 'A little', tl: 'Kaunti' },
  { en: 'Somewhat', tl: 'Medyo' },
  { en: 'Quite a bit', tl: 'Malaki' },
  { en: 'A lot', tl: 'Sobra' },
  { en: 'Completely', tl: 'Buong-buo' },
];

/** Worries people tap instead of typing, for worry time and the worry note. */
export const WORRY_TOPICS: Both[] = [
  { en: 'Money and bills', tl: 'Pera at bayarin' },
  { en: 'Family', tl: 'Pamilya' },
  { en: 'Work or school', tl: 'Trabaho o school' },
  { en: 'My health', tl: 'Kalusugan ko' },
  { en: 'A relationship', tl: 'Isang relasyon' },
  { en: 'The future', tl: 'Ang hinaharap' },
];
