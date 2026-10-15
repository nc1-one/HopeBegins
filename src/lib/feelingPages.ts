/**
 * Landing pages for the words people type when they first realise something
 * is wrong (Google Philippines autocomplete, October 2026). Each page names
 * the feeling in the visitor's own words, gives one thing to do in the next
 * two minutes, then offers a person, a plan and prayer.
 *
 * Copy is Taglish for a general (not only Christian) audience. Crisis wording
 * follows WHO safe-messaging guidance: no methods, always hope and a number.
 */

export type FeelingTool = 'breathe' | 'ground' | 'message' | 'worry-note';
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
      'Pagod na sa lahat? Hindi mo kailangang ayusin ang lahat ngayon. Subukan ang isang 2-minute na paghinga, makipag-usap sa isang e-coach, o gumawa ng libreng plano.',
    label: 'Pagod na ako',
    heading: 'Pagod na ako.',
    intro:
      'Minsan hindi lang katawan ang napapagod, pati isip at puso. Hindi mo kailangang ayusin ang lahat ngayon. Isang maliit na hakbang muna.',
    safetyFirst:
      'Kung pagod ka na sa buhay at naiisip mong ayaw mo nang mabuhay, hindi mo kailangang harapin ito nang mag-isa.',
    toolsHeading: 'Huminga muna tayo',
    tools: ['breathe'],
    tip: {
      title: 'Isang maliit na bagay para sa araw na ito',
      body: 'Pumili ng isang bagay na kaya mong tapusin sa loob ng 10 minuto: maligo, kumain, o lumabas sandali. Sapat na iyon ngayong araw. Kadalasan, sumusunod ang gaan ng loob pagkatapos gumawa, hindi bago.',
    },
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
      'Mabigat kapag pakiramdam mo walang nakikinig. May makakausap ka ngayon, at hindi mo kailangang magpaliwanag nang mahaba.',
    toolsHeading: 'Isang mensahe lang',
    tools: ['message'],
    tip: {
      title: 'Kung gabi na at gusto mo lang mag-type',
      body: 'Nandiyan si Hope AI, isang AI assistant na puwede mong kausapin anumang oras. Hindi siya counselor, pero makakatulong siyang ilabas ang nasa isip mo.',
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
      'Kumakabog ang dibdib at hindi mapakali ang isip? Subukan ang 2-minute na paghinga at ang 5-4-3-2-1 grounding, pagkatapos gumawa ng libreng plano para sa anxiety.',
    label: 'Paano mawala ang anxiety',
    heading: 'Paano mawala ang anxiety?',
    intro:
      'Kapag kumakabog ang dibdib at hindi mapakali ang isip, may magagawa ka ngayon mismo. Hindi nito tatanggalin agad ang lahat, pero makakatulong itong kumalma ang katawan mo.',
    toolsHeading: 'Subukan natin ito ngayon',
    tools: ['breathe', 'ground'],
    tip: {
      title: 'Bakit gumagana ang paghinga',
      body: 'Kapag mas mahaba ang paghinga palabas kaysa papasok, sinasabihan nito ang katawan mo na ligtas ka. Kung madalas itong mangyari sa iyo, makakatulong ang isang plano at ang pakikipag-usap sa isang counselor.',
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
      'Gabi na pero ayaw tumigil ng isip mo. Hindi mo kailangang lutasin ngayong gabi ang lahat ng iniisip mo. Subukan natin ito.',
    toolsHeading: 'Ilabas muna ang iniisip',
    tools: ['worry-note', 'breathe'],
    tip: {
      title: 'Kung gising ka pa rin pagkalipas ng mga 20 minuto',
      body: 'Bumangon muna at gumawa ng tahimik na bagay sa malamlam na ilaw, gaya ng pagbabasa, hanggang antukin ka. Iwasan muna ang cellphone. Bukas, subukang gumising sa parehong oras.',
    },
    firstStep: 'plan',
  },
  {
    slug: 'tired-of-everything',
    lang: 'en',
    pair: 'pagod-na-ako',
    metaTitle: "Tired of everything? What to do when you're exhausted",
    metaDescription:
      "Tired of everything? You don't have to fix it all today. Try a 2-minute breathing exercise, talk to an e-coach, or make a free plan.",
    label: 'Tired of everything',
    heading: "I'm tired of everything.",
    intro:
      "Sometimes it isn't just your body that's tired. Your mind and heart are tired too. You don't have to fix everything today. One small step first.",
    safetyFirst:
      "If you're tired of living and thinking you'd rather not be here, you don't have to face this alone.",
    toolsHeading: "Let's breathe first",
    tools: ['breathe'],
    tip: {
      title: 'One small thing for today',
      body: "Pick one thing you can finish in 10 minutes: take a shower, eat something, or step outside for a bit. That's enough for today. Feeling lighter often comes after doing, not before.",
    },
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
      "It's heavy when it feels like no one is listening. Someone can talk with you today, and you don't have to explain everything.",
    toolsHeading: 'Just one message',
    tools: ['message'],
    tip: {
      title: "If it's late and you just want to type",
      body: "Hope AI is an AI assistant you can talk to any time. It isn't a counselor, but it can help you get what's on your mind out.",
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
      "Heart racing and your mind won't settle? Try 2-minute breathing and 5-4-3-2-1 grounding, then make a free plan for anxiety.",
    label: 'How to calm anxiety',
    heading: 'How do I calm my anxiety?',
    intro:
      "When your heart is racing and your mind won't settle, there is something you can do right now. It won't make everything go away at once, but it can help your body calm down.",
    toolsHeading: 'Try this now',
    tools: ['breathe', 'ground'],
    tip: {
      title: 'Why breathing helps',
      body: "When you breathe out for longer than you breathe in, it tells your body you're safe. If this happens to you often, a plan and talking to a counselor can help.",
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
      "It's late and your mind won't stop. You don't have to solve everything you're thinking about tonight. Let's try this.",
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
    seeAll: 'Tingnan ang lahat ng paraan para makatulong',
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
  },
} as const;

export function getFeelingPage(slug: string) {
  return feelingPages.find((page) => page.slug === slug);
}
