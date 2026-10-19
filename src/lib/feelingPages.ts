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

/** Which of the real photos in photos.ts heads the page. */
export type FeelingPhoto = 'anxious' | 'tired' | 'alone' | 'sleep';

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
  photo: FeelingPhoto;
  /** Show the crisis line near the top, for phrases that can signal suicidal thoughts. */
  safetyFirst?: string;
  toolsHeading: string;
  tools: FeelingTool[];
  /** `hopeAi` adds a link to Hope AI under the tip. */
  tip?: { title: string; body: string; hopeAi?: boolean };
  /**
   * A short, honest explanation (signs, when to get help). Clinical wording:
   * the founder reviews it before it goes live.
   */
  explain?: { title: string; intro: string; points: string[]; note: string };
  /** A medical warning shown near the top, such as chest pain. */
  medicalNote?: string;
  /** Other feeling pages worth reading next, by slug. */
  related?: string[];
  /** Where the explanation comes from. */
  sources?: { label: string; href: string }[];
  /** The next step to put first. */
  firstStep: 'ecoach' | 'plan';
  /** Show a talk-to-an-e-coach button right under the intro. */
  talkNow?: boolean;
}

export const feelingPages: FeelingPage[] = [
  {
    slug: 'pagod-na-ako',
    photo: 'tired',
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
    related: ['depressed-ako'],
    firstStep: 'ecoach',
  },
  {
    slug: 'wala-akong-kausap',
    photo: 'alone',
    lang: 'tl',
    pair: 'i-feel-alone',
    metaTitle: 'Wala akong kausap: may makakausap ka ngayon',
    metaDescription:
      'Pakiramdam mo ba wala kang makausap? Kausapin ang isang e-coach sa Messenger, si Hope AI anumang oras, o magpadala ng mensahe sa taong pinagkakatiwalaan mo.',
    label: 'Wala akong kausap',
    heading: 'Wala akong kausap.',
    intro:
      'Mabigat kapag pakiramdam mo walang nakikinig. May makakausap ka ngayon.',
    toolsHeading: 'Isang mensahe lang',
    tools: ['message'],
    tip: {
      title: 'Kung gabi na at gusto mo lang mag-type',
      body: 'AI assistant si Hope AI. Hindi siya makakapag-counsel o makakatulong sa emergency, pero puwede mo siyang i-chat anumang oras, kahit hatinggabi.',
      hopeAi: true,
    },
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'paano-mawala-ang-anxiety',
    photo: 'anxious',
    lang: 'tl',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Paano mawala ang anxiety: 2-minute na paraan para kumalma',
    metaDescription:
      'Kumakabog ang dibdib at hindi mapakali ang isip? Subukan ang 2-minute na paghinga, ang 5-4-3-2-1 grounding o isang mabilis na laro, tapos gumawa ng libreng plano.',
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
    related: ['panic-attack-ano-gagawin'],
    firstStep: 'plan',
  },
  {
    slug: 'hindi-makatulog-sa-kakaisip',
    photo: 'sleep',
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
    photo: 'tired',
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
    related: ['i-feel-depressed'],
    firstStep: 'ecoach',
  },
  {
    slug: 'i-feel-alone',
    photo: 'alone',
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
      hopeAi: true,
    },
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'how-to-calm-anxiety',
    photo: 'anxious',
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
    related: ['panic-attack-what-to-do'],
    firstStep: 'plan',
  },
  {
    slug: 'cant-sleep-overthinking',
    photo: 'sleep',
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
  {
    slug: 'depressed-ako',
    photo: 'alone',
    lang: 'tl',
    pair: 'i-feel-depressed',
    metaTitle:
      'Depressed ako: ano ang gagawin ngayon at kailan hihingi ng tulong',
    metaDescription:
      'Malungkot o walang gana sa lahat halos araw-araw? Magsimula sa isang maliit na bagay ngayon, kausapin ang isang e-coach, at alamin kung kailan magpapatingin.',
    label: 'Depressed ako',
    heading: 'Depressed ako.',
    intro:
      'Kapag mabigat ang lahat at wala ka nang gana sa kahit ano, mahirap kahit ang bumangon. Puwede kang magsimula sa isang maliit na bagay ngayon, at may makakausap ka.',
    safetyFirst:
      'Kung naiisip mong tapusin na ang buhay mo, kausapin mo ang isang tao ngayon.',
    toolsHeading: 'Magsimula sa isang maliit na bagay',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Kailan puwedeng depression na ito',
      intro:
        'Lahat tayo may malulungkot na araw. Puwedeng depression na kung dalawang linggo o higit pa, halos buong araw kang malungkot o parang walang laman, o wala ka nang gana sa mga dati mong gusto, kasama ang ilan sa mga ito:',
      points: [
        'sobra o kulang ang tulog mo',
        'sobra o kulang ang kain mo',
        'laging pagod at walang lakas',
        'hirap mag-focus o magdesisyon',
        'pakiramdam mo wala kang kwenta o lagi kang may kasalanan',
        'wala kang nakikitang pag-asa sa hinaharap',
        'naiisip mo ang kamatayan o ang pagtapos ng buhay mo',
      ],
      note: 'Karaniwan ang depression at nagagamot ito. Matutulungan ka ng doktor, psychologist o counselor na alamin kung ano ang kailangan mo. Kung hindi mo alam kung saan magsisimula, tumawag sa NCMH Crisis Hotline (1553), bukas 24/7.',
    },
    tip: {
      title: 'Bakit nakakatulong ang isang maliit na bagay',
      body: 'Sa depression, parang hinihintay mo munang gumaan ang pakiramdam bago kumilos. Kapag gumawa ka muna ng isang maliit na kayang gawin, gaya ng maligo o maglakad sandali, kadalasang gumagaan nang kaunti ang loob mo, at mas madali na ang susunod.',
    },
    related: ['pagod-na-ako', 'wala-akong-kausap'],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'panic-attack-ano-gagawin',
    photo: 'anxious',
    lang: 'tl',
    pair: 'panic-attack-what-to-do',
    metaTitle: 'Panic attack: ano ang gagawin ngayon, hakbang-hakbang',
    metaDescription:
      'Kumakabog ang dibdib, hirap huminga, at parang may masamang mangyayari? Puwedeng panic attack ito. Huminga kasama namin nang 2 minuto habang lumilipas ito.',
    label: 'Panic attack',
    heading: 'Parang may panic attack ako.',
    intro:
      'Nakakatakot ang panic attack, pero lumilipas ito, kadalasan sa loob ng 5 hanggang 20 minuto. Huminga tayo ngayon: papasok nang 4, palabas nang 6.',
    medicalNote:
      'Kung unang beses ito, o may sakit sa dibdib na umaabot sa braso o panga, o hirap kang huminga at hindi ito gumagaan, tumawag sa 911 o pumunta sa pinakamalapit na emergency room.',
    toolsHeading: 'Huminga tayo ngayon',
    tools: ['breathe', 'ground'],
    explain: {
      title: 'Ano ang puwedeng maramdaman sa panic attack',
      intro: 'Biglang matinding takot, kasama ang ilan sa mga ito:',
      points: [
        'kumakabog o bumibilis ang tibok ng puso',
        'hirap huminga o masikip ang dibdib',
        'nanginginig, pinagpapawisan, o naiinitan o nilalamig',
        'nahihilo o parang mahihimatay',
        'nangingilig o namamanhid ang kamay o mukha',
        'pakiramdam mo may masamang mangyayari o mawawalan ka ng kontrol',
      ],
      note: 'Parang delikado ang pakiramdam, pero hindi nakakasama sa katawan mo ang panic attack mismo, at lumilipas ito. Kung paulit-ulit itong nangyayari, o umiiwas ka na sa mga lugar dahil dito, kausapin ang isang doktor o counselor. Nagagamot ang panic attacks.',
    },
    tip: {
      title: 'Bakit nakakatulong ang mabagal na pagbuga ng hangin',
      body: 'Sa panic attack, mabilis ang paghinga mo, at lalo nitong pinapalala ang hilo at pangingilig. Kapag mas mahaba ang pagbuga kaysa paghinga papasok, bumabagal ang tibok ng puso at kumakalma ang katawan.',
    },
    related: ['paano-mawala-ang-anxiety'],
    sources: [
      {
        label: 'NHS: Panic disorder',
        href: 'https://www.nhs.uk/mental-health/conditions/panic-disorder/',
      },
      {
        label: 'WHO: Anxiety disorders',
        href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'i-feel-depressed',
    photo: 'alone',
    lang: 'en',
    pair: 'depressed-ako',
    metaTitle: 'I feel depressed: what to do today, and when to get help',
    metaDescription:
      'Feeling low most days, with no energy or interest in anything? Start with one small thing today, talk to an e-coach, and learn when to see a doctor.',
    label: 'I feel depressed',
    heading: 'I feel depressed.',
    intro:
      'When everything feels heavy and nothing interests you, even getting up is hard. You can start with one small thing today, and you can talk to someone.',
    safetyFirst:
      "If you've been thinking about ending your life, please talk to someone now.",
    toolsHeading: 'Start with one small thing',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'When it might be depression',
      intro:
        'Everyone has low days. It may be depression when, for two weeks or more, you feel low or empty most of the day, or lose interest in things you used to enjoy, along with some of these:',
      points: [
        'sleeping much more or much less than usual',
        'eating much more or much less than usual',
        'feeling tired, with no energy',
        'finding it hard to focus or make decisions',
        'feeling worthless or guilty',
        'feeling hopeless about the future',
        'thoughts of death or of ending your life',
      ],
      note: "Depression is common and it can be treated. A doctor, psychologist or counselor can help you work out what you need. If you're not sure where to start, call the NCMH Crisis Hotline (1553), open 24/7.",
    },
    tip: {
      title: 'Why one small thing helps',
      body: 'Depression makes you wait to feel better before you do anything. Doing one small, doable thing first, like a shower or a short walk, often lifts your mood a little, and that makes the next thing easier.',
    },
    related: ['tired-of-everything', 'i-feel-alone'],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'panic-attack-what-to-do',
    photo: 'anxious',
    lang: 'en',
    pair: 'panic-attack-ano-gagawin',
    metaTitle: 'Panic attack: what to do right now, step by step',
    metaDescription:
      'Heart pounding, hard to breathe, sure something terrible is happening? It may be a panic attack. Breathe with us for 2 minutes while it passes.',
    label: 'Panic attack',
    heading: "I think I'm having a panic attack.",
    intro:
      "A panic attack is frightening, but it passes, usually within 5 to 20 minutes. Let's breathe now: in for 4, out for 6.",
    medicalNote:
      "If this is your first time, or you have chest pain that spreads to your arm or jaw, or trouble breathing that isn't easing, call 911 or go to the nearest emergency room.",
    toolsHeading: 'Breathe with us now',
    tools: ['breathe', 'ground'],
    explain: {
      title: 'What a panic attack can feel like',
      intro: 'A sudden rush of fear, with some of these:',
      points: [
        'a pounding or racing heart',
        'shortness of breath or a tight chest',
        'shaking, sweating, or feeling hot or cold',
        'dizziness or feeling faint',
        'tingling or numbness in your hands or face',
        'a feeling that something terrible is about to happen, or that you are losing control',
      ],
      note: "It feels dangerous, but a panic attack itself doesn't harm your body, and it passes. If panic attacks keep coming back, or you start avoiding places because of them, talk to a doctor or counselor. Panic attacks can be treated.",
    },
    tip: {
      title: 'Why breathing out slowly helps',
      body: 'During a panic attack you breathe fast, and that makes the dizziness and tingling worse. Breathing out for longer than you breathe in slows your heart and settles your body.',
    },
    related: ['how-to-calm-anxiety'],
    sources: [
      {
        label: 'NHS: Panic disorder',
        href: 'https://www.nhs.uk/mental-health/conditions/panic-disorder/',
      },
      {
        label: 'WHO: Anxiety disorders',
        href: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
      },
    ],
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
    alsoRead: 'Basahin din:',
    sources: 'Mga pinagkunan:',
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
    alsoRead: 'Also read:',
    sources: 'Sources:',
  },
} as const;

export function getFeelingPage(slug: string) {
  return feelingPages.find((page) => page.slug === slug);
}
