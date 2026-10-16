/**
 * Landing pages for the words people type when they first realise something
 * is wrong (Google Philippines autocomplete, October 2026). Each page names
 * the feeling in the visitor's own words, gives one thing to do in the next
 * two minutes, then offers a person, a plan and prayer.
 *
 * Copy is Taglish for a general (not only Christian) audience. Crisis wording
 * follows WHO safe-messaging guidance: no methods, always hope and a number.
 */

export type FeelingTool =
  | 'breathe'
  | 'ground'
  | 'one-thing'
  | 'game'
  | 'message'
  | 'worry-note';
export type FeelingLang = 'tl' | 'en';

export interface FeelingPage {
  slug: string;
  lang: FeelingLang;
  /** The same page in the other language. */
  pair: string;
  /** Search result and browser tab title. */
  metaTitle: string;
  metaDescription: string;
  /** Short label for footer links. */
  label: string;
  heading: string;
  intro: string;
  /** Show the crisis line near the top, for phrases that can signal suicidal thoughts. */
  safetyFirst?: string;
  toolsHeading: string;
  tools: FeelingTool[];
  tip?: { title: string; body: string };
  /** The next step to put first. */
  firstStep: 'ecoach' | 'plan';
  /** Show a talk-to-an-e-coach button right under the intro. */
  talkNow?: boolean;
}

export const feelingPages: FeelingPage[] = [
  {
    slug: 'pagod-na-ako',
    lang: 'tl',
    pair: 'tired-of-everything',
    metaTitle: 'Pagod na ako: ano ang gagawin kapag pagod ka na sa lahat',
    metaDescription:
      'Pagod na sa lahat? Subukan ang 2-minute na paghinga, kausapin ang isang e-coach sa Messenger, o gumawa ng libreng plano para sa linggong ito.',
    label: 'Pagod na ako',
    heading: 'Pagod na ako.',
    intro:
      'Kapag pagod ka na sa lahat, mabigat gawin kahit ang maliliit na bagay. Magsimula sa isang maliit na bagay, o sa dalawang minutong paghinga.',
    safetyFirst:
      'Kung pagod ka na sa buhay o naiisip mong ayaw mo nang mabuhay, kausapin mo ang isang tao ngayon.',
    toolsHeading: 'Magsimula sa maliit',
    tools: ['one-thing', 'breathe'],
    firstStep: 'ecoach',
  },
  {
    slug: 'wala-akong-kausap',
    lang: 'tl',
    pair: 'i-feel-alone',
    metaTitle: 'Wala akong kausap: may makakausap ka ngayon',
    metaDescription:
      'Pakiramdam mo ba wala kang makausap? Kausapin ang isang e-coach sa Messenger, makipag-chat kay Hope AI anumang oras, o magpadala ng isang mensahe sa taong pinagkakatiwalaan mo.',
    label: 'Wala akong kausap',
    heading: 'Wala akong kausap.',
    intro:
      'Mabigat kapag pakiramdam mo walang nakikinig. May makakausap ka ngayon.',
    toolsHeading: 'Isang mensahe lang',
    tools: ['message'],
    tip: {
      title: 'Kung gabi na at gusto mo lang mag-type',
      body: 'AI assistant si Hope AI. Hindi siya makakapag-counsel o makakatulong sa emergency, pero puwede mo siyang i-chat anumang oras, kahit hatinggabi.',
    },
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'paano-mawala-ang-anxiety',
    lang: 'tl',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Paano mawala ang anxiety: 2-minute na paraan para kumalma',
    metaDescription:
      'Kumakabog ang dibdib at hindi mapakali ang isip? Subukan ang 2-minute na paghinga, ang 5-4-3-2-1 grounding o isang mabilis na laro, tapos gumawa ng libreng plano para sa anxiety.',
    label: 'Paano mawala ang anxiety',
    heading: 'Paano mawala ang anxiety?',
    intro:
      'Kapag kumakabog ang dibdib at hindi mapakali ang isip, subukan ang isa sa mga ito. Nakakatulong ang paghinga at ang 5-4-3-2-1 para kumalma ang katawan mo. Ang laro naman, bibigyan ng ibang gagawin ang isip mo.',
    toolsHeading: 'Subukan natin ito ngayon',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Bakit nakakatulong ang paghinga',
      body: 'Kapag mas mahaba ang paghinga palabas kaysa papasok, bumabagal ang tibok ng puso mo at kumakalma ang katawan. Kung madalas itong mangyari sa iyo, makakatulong ang isang plano at ang pakikipag-usap sa isang counselor.',
    },
    firstStep: 'plan',
  },
  {
    slug: 'hindi-makatulog-sa-kakaisip',
    lang: 'tl',
    pair: 'cant-sleep-overthinking',
    metaTitle: 'Hindi makatulog sa kakaisip: ano ang gagawin ngayong gabi',
    metaDescription:
      'Gabi na pero ayaw tumigil ng isip mo? Isulat muna ang iniisip mo, huminga nang dahan-dahan, at subukan ang mga paraan para makatulog ngayong gabi.',
    label: 'Hindi makatulog sa kakaisip',
    heading: 'Hindi ako makatulog sa kakaisip.',
    intro:
      'Gabi na pero ayaw tumigil ng isip mo. Isulat muna ang paulit-ulit mong iniisip, tapos subukan ang dahan-dahang paghinga.',
    toolsHeading: 'Ilabas muna ang iniisip',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Kung gising ka pa rin pagkalipas ng mga 20 minuto',
      body: 'Bumangon muna at gumawa ng tahimik na bagay sa dim na ilaw, gaya ng pagbabasa, hanggang antukin ka. Iwasan muna ang cellphone. Bukas, subukang gumising sa parehong oras.',
    },
    firstStep: 'plan',
  },
  {
    slug: 'tired-of-everything',
    lang: 'en',
    pair: 'pagod-na-ako',
    metaTitle: "Tired of everything? What to do when you're exhausted",
    metaDescription:
      'Tired of everything? Try a 2-minute breathing exercise, talk to an e-coach on Messenger, or make a free plan for this week.',
    label: 'Tired of everything',
    heading: "I'm tired of everything.",
    intro:
      "When you're tired of everything, even small things feel heavy. Start with one small thing, or two minutes of slow breathing.",
    safetyFirst:
      "If you're tired of living or thinking you'd rather not be here, please talk to someone now.",
    toolsHeading: 'Start small',
    tools: ['one-thing', 'breathe'],
    firstStep: 'ecoach',
  },
  {
    slug: 'i-feel-alone',
    lang: 'en',
    pair: 'wala-akong-kausap',
    metaTitle: 'I feel alone: someone can talk with you today',
    metaDescription:
      'Feel like you have no one to talk to? Message an e-coach on Messenger, chat with Hope AI any time, or send one message to someone you trust.',
    label: 'I feel alone',
    heading: 'I feel alone.',
    intro:
      "It's hard when it feels like no one is listening. You can talk to someone today.",
    toolsHeading: 'Just one message',
    tools: ['message'],
    tip: {
      title: "If it's late and you just want to type",
      body: "Hope AI is an AI assistant. It can't counsel you or help in an emergency, but you can chat with it any time, even in the middle of the night.",
    },
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'how-to-calm-anxiety',
    lang: 'en',
    pair: 'paano-mawala-ang-anxiety',
    metaTitle: 'How to calm anxiety right now: a 2-minute exercise',
    metaDescription:
      "Heart racing and your mind won't settle? Try 2-minute breathing, 5-4-3-2-1 grounding or a quick game, then make a free plan for anxiety.",
    label: 'How to calm anxiety',
    heading: 'How do I calm my anxiety?',
    intro:
      "When your heart is racing and your mind won't settle, try one of these. Breathing and 5-4-3-2-1 help your body calm down. The game gives your mind something else to do.",
    toolsHeading: 'Try this now',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Why breathing helps',
      body: 'When you breathe out for longer than you breathe in, your heart rate slows and your body starts to settle. If this happens to you often, a plan and talking to a counselor can help.',
    },
    firstStep: 'plan',
  },
  {
    slug: 'cant-sleep-overthinking',
    lang: 'en',
    pair: 'hindi-makatulog-sa-kakaisip',
    metaTitle: "Can't sleep from overthinking? What to do tonight",
    metaDescription:
      "It's late and your mind won't stop? Write down what you're thinking, breathe slowly, and try these ways to get to sleep tonight.",
    label: "Can't sleep from overthinking",
    heading: "I can't sleep. I keep overthinking.",
    intro:
      "It's late and your mind won't stop. Write down what keeps going round in your head, then try the slow breathing.",
    toolsHeading: 'Get it out of your head first',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: "If you're still awake after about 20 minutes",
      body: 'Get up and do something quiet in dim light, like reading, until you feel sleepy. Keep your phone away for now. Tomorrow, try to wake up at the same time.',
    },
    firstStep: 'plan',
  },
];

export const feelingSlugs = feelingPages.map((page) => `/${page.slug}`);

/** Interface text for the feeling pages and their tools, per language. */
export const feelingUi = {
  tl: {
    htmlLang: 'tl',
    switchLabel: 'Read in English',
    talkNow: 'Kausapin ang isang e-coach ngayon',
    crisisCall: 'Tumawag ngayon sa NCMH Crisis Hotline, bukas 24/7:',
    or: 'o',
    danger: 'Kung nasa panganib ka ngayon, tumawag sa 911.',
    hopeAi: 'Kausapin si Hope AI',
    nextHeading: 'Ano ang susunod?',
    ecoachTitle: 'Kausapin ang isang e-coach',
    ecoachText: 'Totoong tao mula sa Himala Everyday, sa Messenger.',
    planTitle: 'Gumawa ng sarili mong plano',
    planText:
      '9 na tanong, libre. Makakakuha ka ng mga hakbang para sa linggong ito.',
    prayerTitle: 'Gusto mo bang ipagdasal ka namin?',
    prayerText:
      'Magpadala ng prayer request. May Hope Carrier na magdarasal para sa iyo.',
    seeAll: 'Tingnan lahat ng maitutulong namin',
    allTools: 'Tingnan lahat ng tool',
  },
  en: {
    htmlLang: 'en',
    switchLabel: 'Basahin sa Taglish',
    talkNow: 'Talk to an e-coach now',
    crisisCall: 'Call the NCMH Crisis Hotline now, open 24/7:',
    or: 'or',
    danger: 'If you are in immediate danger, call 911.',
    hopeAi: 'Talk to Hope AI',
    nextHeading: 'What next?',
    ecoachTitle: 'Talk to an e-coach',
    ecoachText: 'A real person from Himala Everyday, on Messenger.',
    planTitle: 'Make your own plan',
    planText: "9 questions, free. You'll get small steps for this week.",
    prayerTitle: 'Would you like us to pray for you?',
    prayerText: 'Send a prayer request. A Hope Carrier will pray for you.',
    seeAll: 'See all the ways we can help',
    allTools: 'See all the tools',
  },
} as const;

export function getFeelingPage(slug: string) {
  return feelingPages.find((page) => page.slug === slug);
}
