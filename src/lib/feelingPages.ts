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
import type { Lang } from './i18n';

/** Every language the site speaks; see i18n.ts. */
export type FeelingLang = Lang;

/** Which of the real photos in photos.ts heads the page. */
export type FeelingPhoto = 'anxious' | 'tired' | 'alone' | 'sleep' | 'unsure';

export interface FeelingPage {
  slug: string;
  lang: FeelingLang;
  /** The same page in the other language. */
  pair: string;
  /** Search result and browser tab title. */
  metaTitle: string;
  metaDescription: string;
  /** What people search for that the page answers, in its own language. */
  keywords: string[];
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
  /** Short answers to what people ask Google about this feeling. */
  faq?: { q: string; a: string }[];
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
      'Pagod na sa lahat? Subukan ang 2 minutong paghinga, mag-message sa e-coach sa Messenger, o gumawa ng libreng plano para sa linggong ito.',
    keywords: [
      'pagod na ako',
      'pagod na sa lahat',
      'pagod at walang gana',
      'ano ang gagawin kapag pagod na',
      'paghinga para kumalma',
      'pagod na ako sa buhay',
      'pagod kahit walang ginagawa',
    ],
    label: 'Pagod na ako',
    heading: 'Pagod na ako.',
    intro:
      'Kapag pagod ka na sa lahat, mabigat gawin kahit ang maliliit na bagay. Magsimula sa isang maliit na bagay, o sa dalawang minutong mabagal na paghinga.',
    safetyFirst:
      'Kung pagod ka na sa buhay o naiisip mong ayaw mo nang mabuhay, kausapin mo ang isang tao ngayon.',
    toolsHeading: 'Magsimula sa maliit',
    tools: ['one-thing', 'breathe'],
    related: ['depressed-ako'],
    faq: [
      {
        q: 'Normal lang bang mapagod sa lahat?',
        a: 'Normal lang mapagod paminsan-minsan. Pero kung halos araw-araw kang pagod at walang gana nang dalawang linggo o higit pa, puwedeng senyales na ito ng depression o burnout. Kausapin ang isang doktor o counselor.',
      },
      {
        q: 'Ano ang gagawin kapag pagod na ako sa buhay?',
        a: 'Magsimula sa isang maliit na bagay ngayon: uminom ng tubig, lumabas nang dalawang minuto, o huminga nang dahan-dahan. Sabihin sa isang taong pinagkakatiwalaan mo kung gaano ka na kapagod. Kung umaabot na sa puntong ayaw mo nang mabuhay, tumawag ngayon sa NCMH Crisis Hotline sa 1553, bukas 24/7.',
      },
      {
        q: 'Bakit pagod ako kahit wala naman akong ginagawa?',
        a: 'Puwedeng galing ang pagod sa stress, sobrang pag-iisip, kulang na tulog, o lungkot na matagal mo nang dala. Puwede ring galing ito sa katawan mo mismo. Kung halos araw-araw ka nang ganito nang dalawang linggo o higit pa, magpatingin sa doktor para matingnan pareho.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'wala-akong-kausap',
    photo: 'alone',
    lang: 'tl',
    pair: 'i-feel-alone',
    metaTitle: 'Wala akong kausap: may makakausap ka ngayon',
    metaDescription:
      'Pakiramdam mo ba wala kang makausap? Mag-message sa e-coach sa Messenger, i-chat si Hope AI anumang oras, o mag-text sa taong pinagkakatiwalaan mo.',
    keywords: [
      'wala akong kausap',
      'walang makausap',
      'kailangan ko ng kausap',
      'e-coach sa Messenger',
      'Hope AI',
      'wala akong makausap',
      'walang nakakaintindi sa akin',
    ],
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
    faq: [
      {
        q: 'Saan ako puwedeng makipag-usap nang libre?',
        a: 'Puwede kang mag-message nang libre sa isang e-coach mula sa Himala Everyday sa Messenger. Kung nasa crisis ka ngayon, tumawag sa NCMH Crisis Hotline sa 1553, bukas 24/7.',
      },
      {
        q: 'Paano kung pakiramdam ko walang nakakaintindi sa akin?',
        a: 'Sapat na ang isang taong handang makinig, kahit hindi niya alam ang tamang sasabihin. Magpadala ng maikling message sa isang tao, gaya ng "Puwede ba tayong mag-usap this week?" Kung wala kang maisip, mag-message nang libre sa e-coach sa Messenger. Kung naiisip mong tapusin ang buhay mo, tumawag ngayon sa NCMH Crisis Hotline sa 1553, bukas 24/7.',
      },
      {
        q: 'Saan ako puwedeng mag-chat kapag gabi na at gising pa ako?',
        a: 'Puwedeng i-chat si Hope AI anumang oras, kahit hatinggabi. Pero AI assistant lang si Hope AI. Kung nasa crisis ka, tumawag sa NCMH Crisis Hotline sa 1553, bukas 24/7.',
      },
    ],
    related: ['free-mental-health-help-philippines'],
    firstStep: 'ecoach',
    talkNow: true,
  },
  {
    slug: 'paano-mawala-ang-anxiety',
    photo: 'anxious',
    lang: 'tl',
    pair: 'how-to-calm-anxiety',
    metaTitle: 'Paano mawala ang anxiety at kaba: 2-minute na paraan',
    metaDescription:
      'Paano maalis ang kaba at kontrolin ang anxiety? Subukan ang 2-minute na paghinga, ang 5-4-3-2-1 grounding o isang laro, tapos gumawa ng libreng plano.',
    keywords: [
      'paano mawala ang anxiety',
      'paano kumalma',
      'anxiety sa Tagalog',
      'breathing exercise para sa anxiety',
      '5-4-3-2-1 grounding',
      'paano maalis ang kaba',
      'paano kontrolin ang anxiety',
    ],
    label: 'Paano mawala ang anxiety',
    heading: 'Paano mawala ang anxiety?',
    intro:
      'Kapag kumakabog ang dibdib at hindi mapakali ang isip, subukan ang isa sa mga ito. Nakakatulong ang paghinga at ang 5-4-3-2-1 para kumalma ang katawan mo. Ang laro naman, binibigyan ng ibang mapagkakaabalahan ang isip mo.',
    toolsHeading: 'Subukan natin ito ngayon',
    tools: ['breathe', 'ground', 'game'],
    tip: {
      title: 'Bakit nakakatulong ang paghinga',
      body: 'Kapag mas mahaba ang paghinga palabas kaysa papasok, bumabagal ang tibok ng puso mo at kumakalma ang katawan. Kung madalas itong mangyari sa iyo, makakatulong ang isang plano at ang pakikipag-usap sa isang counselor.',
    },
    related: [
      'panic-attack-ano-gagawin',
      'mental-health-sa-tagalog',
      'bible-verse-para-sa-anxiety',
    ],
    faq: [
      {
        q: 'Ano ang anxiety sa Tagalog?',
        a: 'Kadalasan itong tinatawag na pagkabalisa, kaba o nerbiyos: takot o pag-aalala na mahirap pigilan, minsan kasama ang mabilis na tibok ng puso o hirap huminga.',
      },
      {
        q: 'Gaano katagal ang anxiety attack?',
        a: 'Kadalasang pinakamatindi ang kaba sa unang ilang minuto at humuhupa ito sa loob ng mga 5 hanggang 20 minuto. Kung madalas itong mangyari, kausapin ang isang doktor o counselor.',
      },
      {
        q: 'Paano maalis ang kaba?',
        a: 'Huminga nang dahan-dahan: papasok nang 4, palabas nang 6, nang mga dalawang minuto. Ilapat ang mga paa sa sahig at pansinin ang limang bagay na nakikita mo. Kadalasang humuhupa ang kaba sa loob ng ilang minuto. Kung madalas itong bumalik, kausapin ang isang doktor o counselor.',
      },
      {
        q: 'Paano kontrolin ang anxiety araw-araw?',
        a: 'Sanayin ang paghinga habang kalmado ka pa, para madali itong magamit kapag kinakabahan ka. Matulog nang sapat, bawasan ang kape, at isulat ang mga inaalala mo sa parehong oras araw-araw. Kung nakakaabala na ang anxiety sa trabaho, pag-aaral o tulog, magpatingin sa doktor o counselor.',
      },
    ],
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
    keywords: [
      'hindi makatulog sa kakaisip',
      'overthinking sa gabi',
      'paano tumigil sa overthinking',
      'hindi makatulog sa gabi',
      'hindi makatulog sa gabi sa kaiisip',
    ],
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
    faq: [
      {
        q: 'Paano tumigil sa overthinking sa gabi?',
        a: 'Isulat muna ang iniisip mo bago matulog para makabitaw ang isip, ilayo ang cellphone, at huminga nang dahan-dahan. Kung gising ka pa rin pagkalipas ng mga 20 minuto, bumangon at gumawa ng tahimik na bagay hanggang antukin ka.',
      },
      {
        q: 'Ano ang overthinking sa Tagalog?',
        a: 'Kadalasan itong tinatawag na sobrang pag-iisip: paulit-ulit na pag-iisip tungkol sa parehong problema nang hindi nakakahanap ng sagot.',
      },
      {
        q: 'Bakit mas malala ang overthinking sa gabi?',
        a: 'Sa araw, abala ang isip sa trabaho at sa mga tao. Pagdating ng gabi, tahimik na, kaya bumabalik ang mga inaalala. Kapag kulang ka pa sa tulog, mas lumalaki ang mga ito sa isip mo.',
      },
    ],
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
    keywords: [
      'tired of everything',
      'exhausted all the time',
      'emotionally exhausted',
      'what to do when you are tired',
      'breathing exercise',
      'always tired even after rest',
    ],
    label: 'Tired of everything',
    heading: "I'm tired of everything.",
    intro:
      "When you're tired of everything, even small things feel heavy. Start with one small thing, or two minutes of slow breathing.",
    safetyFirst:
      "If you're tired of living or thinking you'd rather not be here, please talk to someone now.",
    toolsHeading: 'Start small',
    tools: ['one-thing', 'breathe'],
    related: ['i-feel-depressed'],
    faq: [
      {
        q: 'Is it normal to be tired of everything?',
        a: "Everyone gets worn out sometimes. But if you've felt tired and uninterested in almost everything most days for two weeks or more, it may be depression or burnout. Talk to a doctor or counselor.",
      },
      {
        q: 'Why am I always tired, even after I rest?',
        a: 'Tiredness can come from stress, worry, poor sleep or a low mood that has gone on for a while, as well as from your body. If you feel this way most days for two weeks or more, see a doctor, who can check both.',
      },
    ],
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
    keywords: [
      'I feel alone',
      'no one to talk to',
      'feeling lonely',
      'someone to talk to',
      'e-coach on Messenger',
      'nobody cares about me',
      'no one to talk to',
    ],
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
    faq: [
      {
        q: 'Where can I talk to someone for free?',
        a: 'You can message an e-coach from Himala Everyday on Messenger, for free. In a crisis, call the crisis line in your country now: in the Philippines, the NCMH Crisis Hotline on 1553, open 24/7.',
      },
      {
        q: 'What can I do when it feels like nobody cares about me?',
        a: 'Send one short message to someone, even "Can we talk this week?" If no one comes to mind right now, an e-coach on Messenger can listen, free. If you are thinking of ending your life, call the crisis line in your country now: in the Philippines, the NCMH Crisis Hotline on 1553, open 24/7.',
      },
    ],
    related: ['free-mental-health-help-philippines'],
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
    keywords: [
      'how to calm anxiety',
      'calm anxiety fast',
      'breathing exercise for anxiety',
      '5-4-3-2-1 grounding',
      'anxiety relief',
      'how to manage anxiety every day',
    ],
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
    related: ['panic-attack-what-to-do', 'bible-verses-for-anxiety'],
    faq: [
      {
        q: 'What is the fastest way to calm anxiety?',
        a: 'Slow your breathing: in for 4, out for 6, for about two minutes. Then name 5 things you can see, 4 you can hear and 3 you can touch to bring your mind back to the room.',
      },
      {
        q: 'Why do I feel anxious for no reason?',
        a: "Anxiety can build from stress, poor sleep, caffeine or worries you haven't put into words, so it can seem to come from nowhere. If it happens most days, talk to a doctor or counselor.",
      },
      {
        q: 'What helps with anxiety every day?',
        a: 'Practice slow breathing while you are calm, so it comes easily when you need it. Sleep enough, cut back on coffee, and write your worries down at a set time each day. If anxiety gets in the way of work, school or sleep, see a doctor or counselor.',
      },
    ],
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
    keywords: [
      "can't sleep overthinking",
      'overthinking at night',
      'how to stop overthinking',
      'racing thoughts at night',
      'why do I overthink at night',
    ],
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
    faq: [
      {
        q: 'How do I stop overthinking at night?',
        a: "Write your thoughts down before bed so your mind can let go of them, keep your phone out of reach, and breathe slowly. If you're still awake after about 20 minutes, get up and do something quiet until you feel sleepy.",
      },
      {
        q: 'Why does overthinking get worse at night?',
        a: 'During the day, work and people keep your mind busy. At night it gets quiet, so the worries you pushed aside come back. Being tired also makes them feel bigger.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'depressed-ako',
    photo: 'alone',
    lang: 'tl',
    pair: 'i-feel-depressed',
    metaTitle: 'Depressed ako: ano ang gagawin at kailan hihingi ng tulong',
    metaDescription:
      'Malungkot o walang gana sa lahat halos araw-araw? Magsimula sa isang maliit na bagay ngayon, kausapin ang isang e-coach, at alamin kung kailan magpapatingin.',
    keywords: [
      'depressed ako',
      'depression sa Tagalog',
      'senyales ng depression',
      'walang gana sa lahat',
      'saan hihingi ng tulong',
      'paano malalaman kung depressed',
      'nadedepress ako',
    ],
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
        'naiisip mo ang kamatayan, o naiisip mong tapusin ang buhay mo',
      ],
      note: 'Karaniwan ang depression at nagagamot ito. Matutulungan ka ng doktor, psychologist o counselor na alamin kung ano ang kailangan mo. Kung hindi mo alam kung saan magsisimula, tumawag sa NCMH Crisis Hotline (1553). Libre ito, bukas 24/7, at masasabi nila kung saan ka puwedeng magpatingin.',
    },
    tip: {
      title: 'Bakit nakakatulong ang isang maliit na bagay',
      body: 'Sa depression, parang hinihintay mo munang gumaan ang pakiramdam bago kumilos. Kapag gumawa ka muna ng isang maliit na bagay na kaya mo, gaya ng maligo o maglakad sandali, kadalasang gumagaan nang kaunti ang loob mo, at mas madali na ang susunod.',
    },
    related: [
      'pagod-na-ako',
      'wala-akong-kausap',
      'ano-ang-sasabihin-sa-kaibigang-depressed',
      'mental-health-sa-tagalog',
      'bible-verse-para-sa-malungkot',
    ],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Ano ang depression sa Tagalog?',
        a: 'Madalas itong tinatawag na depresyon o matinding lungkot: lungkot o kawalan ng gana na tumatagal nang dalawang linggo o higit pa at nakakaapekto sa tulog, kain, lakas at pag-iisip.',
      },
      {
        q: 'Nawawala ba ang depression nang kusa?',
        a: 'Minsan gumagaan ito, pero mas mabilis at mas sigurado ang paggaling kapag may tulong. Nagagamot ang depression sa counseling, at minsan sa gamot na nireseta ng doktor.',
      },
      {
        q: 'Paano malalaman kung depressed na ako?',
        a: 'Kung halos araw-araw, nang dalawang linggo o higit pa, malungkot ka o wala kang gana sa mga dati mong gusto, at nahihirapan ka sa tulog, pagkain o pag-focus, puwedeng depression ito. Doktor o counselor ang makakapagsabi nang sigurado, at nagagamot ito.',
      },
      {
        q: 'Saan puwedeng humingi ng libreng tulong para sa depression?',
        a: 'Libre at bukas 24/7 ang NCMH Crisis Hotline sa 1553. Puwede ka ring mag-message nang libre sa isang e-coach sa Messenger. Nasa page namin na Free mental health help in the Philippines ang iba pang libreng hotline at counseling.',
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
      'Kumakabog ang dibdib, hirap huminga, at parang may masamang mangyayari? Puwedeng panic attack ito. Sabayan kami sa paghinga nang 2 minuto habang lumilipas ito.',
    keywords: [
      'panic attack ano gagawin',
      'panic attack sa Tagalog',
      'sintomas ng panic attack',
      'paano kumalma sa panic attack',
      'paano mapigilan ang panic attack',
    ],
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
        'parang tinutusok-tusok o namamanhid ang kamay o mukha',
        'pakiramdam mo may masamang mangyayari o mawawalan ka ng kontrol',
      ],
      note: 'Parang delikado ang pakiramdam, pero hindi nakakasama sa katawan mo ang panic attack mismo, at lumilipas ito. Kung paulit-ulit itong nangyayari, o umiiwas ka na sa mga lugar dahil dito, kausapin ang isang doktor o counselor. Nagagamot ang panic attacks.',
    },
    tip: {
      title: 'Bakit nakakatulong ang mabagal na pagbuga ng hangin',
      body: 'Sa panic attack, mabilis ang paghinga mo, at lalo nitong pinapalala ang hilo at pamamanhid. Kapag mas mahaba ang pagbuga kaysa paghinga papasok, bumabagal ang tibok ng puso at kumakalma ang katawan.',
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
    faq: [
      {
        q: 'Gaano katagal ang panic attack?',
        a: 'Kadalasang 5 hanggang 20 minuto ang panic attack, at sa unang ilang minuto ang pinakamatindi.',
      },
      {
        q: 'Nakakasama ba sa katawan ang panic attack?',
        a: 'Nakakatakot ang panic attack, pero hindi ito nakakasama sa katawan. Kung hindi ka sigurado kung panic attack ito o problema sa puso, magpatingin sa doktor.',
      },
      {
        q: 'Paano mapigilan ang panic attack?',
        a: 'Habang nangyayari: huminga nang dahan-dahan, 4 papasok at 6 palabas, ilapat ang paa sa sahig, at sabihin sa sarili na panic attack ito at lilipas din. Para hindi ito madalas bumalik, sanayin ang paghinga araw-araw at kausapin ang isang doktor o counselor.',
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
    keywords: [
      'I feel depressed',
      'signs of depression',
      'what to do when you feel depressed',
      'when to get help for depression',
      'depression help Philippines',
      'i feel depressed for no reason',
      'i feel depressed and alone',
    ],
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
      note: "Depression is common and it can be treated. A doctor, psychologist or counselor can help you work out what you need. If you're not sure where to start, a free helpline in your country can point you to help: in the Philippines, the NCMH Crisis Hotline (1553), open 24/7.",
    },
    tip: {
      title: 'Why one small thing helps',
      body: 'Depression makes you wait to feel better before you do anything. Doing one small, doable thing first, like a shower or a short walk, often lifts your mood a little, and that makes the next thing easier.',
    },
    related: [
      'tired-of-everything',
      'i-feel-alone',
      'what-to-say-to-a-depressed-friend',
      'bible-verses-when-you-feel-down',
    ],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'What is depression in Tagalog?',
        a: "It's usually called depresyon or matinding lungkot: low mood or loss of interest that lasts two weeks or more and affects sleep, appetite, energy and thinking.",
      },
      {
        q: 'Can depression go away on its own?',
        a: 'It sometimes eases, but recovery is faster and more likely with help. Depression can be treated with talking therapy, and sometimes with medicine prescribed by a doctor.',
      },
      {
        q: 'Why do I feel depressed for no reason?',
        a: 'Depression does not always have one clear cause. It can build from stress, loss, poor sleep, health or changes in your body, sometimes all at once. A doctor or counselor can help you sort it out, and depression can be treated.',
      },
      {
        q: 'What should I do if I feel depressed and alone?',
        a: 'Tell one person today, even in a short message. If no one comes to mind, message an e-coach on Messenger, free. If you are thinking of ending your life, call the crisis line in your country now: in the Philippines, the NCMH Crisis Hotline on 1553, open 24/7.',
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
    keywords: [
      'panic attack what to do',
      'how to stop a panic attack',
      'panic attack symptoms',
      'breathing for panic attacks',
      'how to stop a panic attack fast',
    ],
    label: 'Panic attack',
    heading: "I think I'm having a panic attack.",
    intro:
      "A panic attack is frightening, but it passes, usually within 5 to 20 minutes. Let's breathe now: in for 4, out for 6.",
    medicalNote:
      "If this is your first time, or you have chest pain that spreads to your arm or jaw, or trouble breathing that isn't easing, call your emergency number (911 in the Philippines) or go to the nearest emergency room.",
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
    faq: [
      {
        q: 'How long does a panic attack last?',
        a: 'Most panic attacks last between 5 and 20 minutes, and the worst of it usually comes in the first few minutes.',
      },
      {
        q: 'Can a panic attack hurt me?',
        a: "A panic attack is frightening, but it doesn't harm your body. If you're not sure whether it's panic or something like a heart problem, get checked by a doctor.",
      },
      {
        q: 'How do I stop a panic attack fast?',
        a: 'Slow your breathing, in for 4 and out for 6, put your feet flat on the floor, and tell yourself it is a panic attack and it will pass. To have fewer of them, practice the breathing every day and talk to a doctor or counselor.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'hindi-ko-alam-gagawin-ko-sa-buhay',
    photo: 'unsure',
    lang: 'tl',
    pair: 'i-feel-lost',
    metaTitle: 'Hindi ko alam gagawin ko sa buhay: saan magsisimula ngayon',
    metaDescription:
      'Pakiramdam mo naliligaw ka o parang walang laman ang loob mo? Magsimula sa isang maliit na hakbang ngayon, at kausapin ang taong makakatulong sa iyo.',
    keywords: [
      'hindi ko alam gagawin ko sa buhay',
      'naliligaw sa buhay',
      'walang direksyon sa buhay',
      'parang walang laman ang loob',
      'saan magsisimula',
      'paano magsimula ulit sa buhay',
    ],
    label: 'Hindi ko alam gagawin ko',
    heading: 'Hindi ko alam gagawin ko sa buhay.',
    intro:
      'Kapag hindi mo alam kung saan papunta ang buhay mo, o parang walang laman ang loob mo, mahirap malaman kung saan magsisimula. Puwede kang magsimula sa maliit, ngayon.',
    safetyFirst:
      'Kung kasama ng pakiramdam na ito ang pag-iisip na tapusin na ang buhay mo, kausapin mo ang isang tao ngayon.',
    toolsHeading: 'Magsimula sa maliit',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'Kailan dapat humingi ng tulong',
      intro:
        'Normal ang maligaw paminsan-minsan, lalo na sa malalaking pagbabago gaya ng pagtatapos sa pag-aaral, bagong trabaho o hiwalayan. Kausapin ang doktor o counselor kung dalawang linggo o higit pa:',
      points: [
        'halos buong araw mong nararamdaman na walang laman ang loob mo',
        'wala ka nang gana sa halos lahat',
        'sobra o kulang ang tulog o kain mo',
        'hirap ka nang makaraos sa trabaho, pag-aaral o bahay',
      ],
      note: 'Puwedeng senyales ito ng depression, at nagagamot iyon. Mas mahaba ang paliwanag sa page namin tungkol sa depression.',
    },
    tip: {
      title: 'Isang paraan para magsimula',
      body: 'Isulat ang tatlong bagay na naging mahalaga sa iyo, kahit maliit: isang tao, isang lugar, o isang bagay na dati mong gusto. Pumili ng isa at gumawa ng isang maliit na hakbang para dito ngayong linggo.',
    },
    related: ['depressed-ako', 'pagod-na-ako'],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Bakit parang walang laman ang loob ko?',
        a: 'Puwedeng galing ito sa stress, pag-iisa, malaking pagkawala o pagbabago, o depression. Kung dalawang linggo na o higit pa, o wala ka nang gana sa halos lahat, kausapin ang isang doktor o counselor.',
      },
      {
        q: 'Paano magsimula ulit kapag naliligaw ka sa buhay?',
        a: 'Pumili ng isang maliit na hakbang para sa araw na ito, at isa pa para bukas. Sabihin sa isang taong pinagkakatiwalaan mo ang nararamdaman mo. Sapat na ang susunod na hakbang; saka na ang buong plano.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'burnout-sa-trabaho',
    photo: 'tired',
    lang: 'tl',
    pair: 'burnout',
    metaTitle: 'Burnout sa trabaho: mga senyales at ano ang gagawin',
    metaDescription:
      'Ubos na ang lakas at wala nang gana sa trabaho o pag-aaral? Puwedeng burnout ito. Alamin ang mga senyales, magpahinga nang totoo ngayon at gumawa ng plano.',
    keywords: [
      'burnout sa trabaho',
      'senyales ng burnout',
      'pagod sa trabaho',
      'burnout sa Tagalog',
      'ano ang gagawin sa burnout',
    ],
    label: 'Burnout sa trabaho',
    heading: 'Burnout na ako.',
    intro:
      'Kapag naubos ka na ng trabaho, pag-aaral o pag-aalaga sa iba, parang hindi ka na nakakapahinga kahit nagpapahinga ka. Magsimula sa isang totoong break ngayon, kahit sampung minuto.',
    toolsHeading: 'Huminto muna sandali',
    tools: ['breathe', 'one-thing'],
    explain: {
      title: 'Mga senyales ng burnout',
      intro:
        'Ayon sa World Health Organization, galing ang burnout sa matagal na stress sa trabaho na hindi naaayos. Kadalasang ganito ito:',
      points: [
        'laging ubos ang lakas at pagod',
        'lumalayo ang loob mo sa trabaho, o nagiging negatibo ka tungkol dito',
        'kaunti na lang ang natatapos mo kahit pilit mong ginagawa',
      ],
      note: 'Tungkol sa trabaho at matagal na stress ang burnout. Kung halos buong araw ka ring malungkot, o wala ka nang gana kahit sa labas ng trabaho, puwedeng depression na rin ito. Kausapin ang isang doktor o counselor.',
    },
    tip: {
      title: 'Isang limit ngayong linggo',
      body: 'Pumili ng isang bagay na iingatan mo: totoong lunch break, oras na titigil ka sa pagtingin ng messages, o isang araw na pahinga. Sabihin sa isang tao para mas madali mo itong masunod.',
    },
    related: ['pagod-na-ako', 'depressed-ako'],
    sources: [
      {
        label: 'WHO: Burn-out an "occupational phenomenon"',
        href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      },
    ],
    faq: [
      {
        q: 'Pareho ba ang burnout at depression?',
        a: 'Hindi. Galing ang burnout sa matagal na stress sa trabaho, at kadalasang tungkol sa trabaho ang epekto nito. Sa depression naman, apektado ang buong buhay. Puwedeng magkasabay ang dalawa, kaya kung halos buong araw kang malungkot, kausapin ang isang doktor o counselor.',
      },
      {
        q: 'Ano ang burnout sa Tagalog?',
        a: 'Kadalasan itong tinatawag na sobrang pagod o pagkaubos dahil sa trabaho: pagod na hindi nawawala kahit magpahinga, kasama ang pagkainis o kawalang-gana sa trabaho at pagbaba ng nagagawa.',
      },
    ],
    firstStep: 'plan',
  },
  {
    slug: 'i-feel-lost',
    photo: 'unsure',
    lang: 'en',
    pair: 'hindi-ko-alam-gagawin-ko-sa-buhay',
    metaTitle: 'I feel lost and empty: what to do when nothing makes sense',
    metaDescription:
      'Feel lost in life or empty inside? Start with one small step today, and talk to someone who can help you sort it out. It is free.',
    keywords: [
      'I feel lost',
      'feeling lost in life',
      'I feel empty inside',
      'what to do when you feel lost',
      'no direction in life',
      'what to do when you feel lost in life',
    ],
    label: 'I feel lost',
    heading: 'I feel lost.',
    intro:
      "When you don't know where your life is going, or you feel empty inside, it's hard to know where to start. You can start small, today.",
    safetyFirst:
      'If the emptiness comes with thoughts of ending your life, please talk to someone now.',
    toolsHeading: 'Start small',
    tools: ['one-thing', 'message'],
    explain: {
      title: 'When to get help',
      intro:
        'Feeling lost now and then is part of life, especially at big turns like graduating, a new job or a breakup. Talk to a doctor or counselor if, for two weeks or more:',
      points: [
        'you feel empty most of the day',
        "you've lost interest in almost everything",
        "you're sleeping or eating much more or much less",
        "it's hard to get through work, school or home",
      ],
      note: 'These can be signs of depression, which can be treated. Our page on depression explains more.',
    },
    tip: {
      title: 'One way to start',
      body: 'Write down three things that have mattered to you, even small ones: a person, a place, something you used to enjoy. Pick one and take one small step toward it this week.',
    },
    related: ['i-feel-depressed', 'tired-of-everything'],
    sources: [
      {
        label: 'WHO: Depressive disorder (depression)',
        href: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      },
    ],
    faq: [
      {
        q: 'Why do I feel empty inside?',
        a: 'Feeling empty can come from stress, loneliness, a big loss or change, or depression. If it lasts two weeks or more, or comes with losing interest in most things, talk to a doctor or counselor.',
      },
      {
        q: 'What should I do when I feel lost in life?',
        a: 'Pick one small step for today and one for tomorrow, and tell someone you trust how you feel. The next step is enough for now; the bigger plan can come later.',
      },
    ],
    firstStep: 'ecoach',
  },
  {
    slug: 'burnout',
    photo: 'tired',
    lang: 'en',
    pair: 'burnout-sa-trabaho',
    metaTitle: 'Burnout: the signs, and what to do when work drains you',
    metaDescription:
      'Exhausted, negative about work, and getting less done even when you try? It may be burnout. Take a real break today, set one limit, and make a free plan.',
    keywords: [
      'burnout',
      'signs of burnout',
      'work burnout',
      'burnout recovery',
      'what to do about burnout',
      'burnout in Tagalog',
    ],
    label: 'Burnout',
    heading: "I'm burned out.",
    intro:
      'When work, school or caring for others has drained you, rest stops feeling like rest. Start with a real break today, even ten minutes.',
    toolsHeading: 'Stop for a moment',
    tools: ['breathe', 'one-thing'],
    explain: {
      title: 'Signs of burnout',
      intro:
        'The World Health Organization describes burnout as the result of long-term stress at work that has not been managed. It usually shows up as:',
      points: [
        'feeling drained or exhausted most of the time',
        'feeling distant from your work, or negative and cynical about it',
        'getting less done, even when you try hard',
      ],
      note: 'Burnout is about work and long stretches of stress. If you also feel low most of the day, or have lost interest in things outside work, it may be depression too. Talk to a doctor or counselor.',
    },
    tip: {
      title: 'One limit for this week',
      body: 'Pick one thing to protect: a real lunch break, a time you stop checking messages, or one day off. Tell someone, so it is easier to keep.',
    },
    related: ['tired-of-everything', 'i-feel-depressed'],
    sources: [
      {
        label: 'WHO: Burn-out an "occupational phenomenon"',
        href: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      },
    ],
    faq: [
      {
        q: 'Is burnout the same as depression?',
        a: 'No. Burnout comes from long-term stress at work and mostly affects how you feel about work. Depression affects every part of life. The two can overlap, so if you feel low most of the day, talk to a doctor or counselor.',
      },
      {
        q: 'What is burnout in Tagalog?',
        a: 'People often call it sobrang pagod or pagkaubos sa trabaho: tiredness that rest does not fix, along with feeling fed up with work and getting less done.',
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
    hopeAi: 'Kausapin si Hope AI',
    nextHeading: 'Ano ang susunod?',
    ecoachTitle: 'Kausapin ang isang e-coach',
    ecoachText: 'Totoong tao mula sa Himala Everyday, sa Messenger.',
    planTitle: 'Gumawa ng sarili mong plano',
    planText:
      '9 na tanong, libre. Makakakuha ka ng mga hakbang para sa linggong ito.',
    prayerTitle: 'Gusto mo bang ipagdasal ka namin?',
    prayerText:
      'Magpadala ng prayer request. Ipagdadasal ka ng isang Hope Carrier.',
    seeAll: 'Tingnan lahat ng maitutulong namin',
    allTools: 'Tingnan lahat ng tool',
    alsoRead: 'Basahin din:',
    sources: 'Mga pinagkunan:',
    faqHeading: 'Mga madalas itanong',
  },
  en: {
    htmlLang: 'en',
    switchLabel: 'Basahin sa Taglish',
    talkNow: 'Talk to an e-coach now',
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
    faqHeading: 'Common questions',
  },
  // French, German, Spanish and Korean have no e-coach: their e-coach links
  // go to the help page, so these lines offer someone to talk to at a free
  // helpline. switchLabel is not shown on their pages.
  fr: {
    htmlLang: 'fr',
    switchLabel: 'Lire en anglais',
    talkNow: 'Parler à quelqu’un maintenant',
    hopeAi: 'Parler à Hope AI',
    nextHeading: 'Et maintenant ?',
    ecoachTitle: 'Parler à quelqu’un',
    ecoachText:
      'Une ligne gratuite de ton pays, où une vraie personne t’écoute.',
    planTitle: 'Faire ton propre plan',
    planText:
      '9 questions, gratuit. Tu recevras de petites étapes pour cette semaine.',
    prayerTitle: 'Veux-tu qu’on prie pour toi ?',
    prayerText:
      'Envoie une demande de prière. Un Hope Carrier priera pour toi.',
    seeAll: 'Voir toutes les façons dont on peut t’aider',
    allTools: 'Voir tous les outils',
    alsoRead: 'À lire aussi :',
    sources: 'Sources :',
    faqHeading: 'Questions fréquentes',
  },
  de: {
    htmlLang: 'de',
    switchLabel: 'Auf Englisch lesen',
    talkNow: 'Jetzt mit jemandem reden',
    hopeAi: 'Mit Hope AI reden',
    nextHeading: 'Wie geht es weiter?',
    ecoachTitle: 'Mit jemandem reden',
    ecoachText:
      'Kostenlose Hilfetelefone in deinem Land, bei denen ein echter Mensch zuhört.',
    planTitle: 'Deinen eigenen Plan machen',
    planText:
      '9 Fragen, kostenlos. Du bekommst kleine Schritte für diese Woche.',
    prayerTitle: 'Sollen wir für dich beten?',
    prayerText:
      'Schick uns dein Gebetsanliegen. Ein Hope Carrier betet für dich.',
    seeAll: 'Alle Wege ansehen, wie wir helfen können',
    allTools: 'Alle Übungen ansehen',
    alsoRead: 'Lies auch:',
    sources: 'Quellen:',
    faqHeading: 'Häufige Fragen',
  },
  es: {
    htmlLang: 'es-419',
    switchLabel: 'Leer en inglés',
    talkNow: 'Hablar con alguien ahora',
    hopeAi: 'Hablar con Hope AI',
    nextHeading: '¿Y ahora qué?',
    ecoachTitle: 'Hablar con alguien',
    ecoachText:
      'Una línea gratuita de tu país, donde una persona real te escucha.',
    planTitle: 'Haz tu propio plan',
    planText: '9 preguntas, gratis. Recibirás pasos pequeños para esta semana.',
    prayerTitle: '¿Quieres que oremos por ti?',
    prayerText: 'Envía una petición de oración. Un Hope Carrier orará por ti.',
    seeAll: 'Ver todas las formas en que podemos ayudarte',
    allTools: 'Ver todas las herramientas',
    alsoRead: 'Lee también:',
    sources: 'Fuentes:',
    faqHeading: 'Preguntas frecuentes',
  },
  ko: {
    htmlLang: 'ko',
    switchLabel: '영어로 읽기',
    talkNow: '지금 누군가와 이야기하기',
    hopeAi: 'Hope AI와 이야기하기',
    nextHeading: '이제 무엇을 해 볼까요?',
    ecoachTitle: '누군가와 이야기하기',
    ecoachText: '실제 사람이 이야기를 들어 주는 무료 상담 전화예요.',
    planTitle: '나만의 계획 만들기',
    planText: '질문 9개, 무료예요. 이번 주에 해 볼 작은 걸음을 알려 드려요.',
    prayerTitle: '저희가 기도해 드려도 될까요?',
    prayerText:
      '기도 제목을 보내 주세요. Hope Carrier가 기도해 줄 거예요.',
    seeAll: '저희가 도울 수 있는 모든 방법 보기',
    allTools: '모든 도구 보기',
    alsoRead: '함께 읽어 보세요:',
    sources: '출처:',
    faqHeading: '자주 묻는 질문',
  },
} as const;

export function getFeelingPage(slug: string) {
  return feelingPages.find((page) => page.slug === slug);
}
