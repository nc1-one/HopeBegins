import { isIntlLang, noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import { ArrowRight } from 'lucide-react';
import { CrisisSentence } from '@/components/help/Crisis';
import { HopeStoriesSection } from '@/components/sections/HopeStoriesSection';
import { Reveal } from '@/components/ui/Reveal';
import { localizeHref } from '@/lib/intlRoutes';
import { photo, photoTurn } from '@/lib/photos';
import { ApproachOffers, type Offer } from './ApproachOffers';
import { ApproachSteps, type ApproachStep } from './ApproachSteps';

/*
 * The whole HopeBegins approach on one page, read top to bottom: why it
 * exists, what it aims for, the steps it walks someone through, and what
 * people can use. It replaces Our Story; /our-story redirects here.
 *
 * In French, German, Spanish and Korean it says what those readers really
 * get: the e-coaches speak English and Filipino, so "talk to an e-coach"
 * becomes a free helpline in their country, and what is only in English
 * says so.
 */

const copy: PerLangNoTl<{
  title: string;
  intro: string;
  whyTitle: string;
  why: [string, string];
  goalsTitle: string;
  stepsTitle: string;
  offersTitle: string;
  howTitle: string;
  /** "Not okay today?", with "today" set apart. */
  notOkay: [string, string, string];
  thatsMe: string;
  makePlan: string;
}> = {
  en: {
    title: 'Help in the first minute, and in the months after.',
    intro:
      'HopeBegins is free, faith-driven mental health support. You get help the moment something feels wrong, and you leave with a tool you can keep using.',
    whyTitle: 'Why we started',
    why: [
      'HopeBegins started as a small group that prayed for people. Today people come to ask for prayer, make a plan for the week and talk to an e-coach.',
      "When you're at your lowest, help should be one tap away. We want anyone who feels anxious or low to find it on their phone, in their own language.",
    ],
    goalsTitle: 'What we aim for',
    stepsTitle: 'Step by step, from the first search to months later',
    offersTitle: 'What you can use, all free',
    howTitle: 'How we work',
    notOkay: ['Not okay ', 'today', '?'],
    thatsMe: "That's me",
    makePlan: 'Make my free plan',
  },
  fr: {
    title: 'On marche avec toi jusqu’à ce que tu t’en sortes.',
    intro:
      'HopeBegins, c’est un soutien gratuit pour la santé mentale, porté par la foi. Né aux Philippines, il existe maintenant aussi en français. Tu trouves de l’aide dès que quelque chose ne va pas, et tu repars avec un outil que tu peux continuer à utiliser.',
    whyTitle: 'Pourquoi on a commencé',
    why: [
      'HopeBegins a commencé aux Philippines, avec un petit groupe qui priait pour les gens. Aujourd’hui, on y vient pour demander qu’on prie pour soi, se faire un plan pour la semaine et trouver quelqu’un à qui parler.',
      'Quand tu es au plus bas, l’aide devrait être à portée de main. On veut que toute personne qui traverse l’anxiété ou un coup de déprime puisse la trouver sur son téléphone, maintenant aussi en français.',
    ],
    goalsTitle: 'Ce qu’on vise',
    stepsTitle: 'Pas à pas, de la première recherche aux mois qui suivent',
    offersTitle: 'Tout ce que tu peux utiliser, gratuitement',
    howTitle: 'Notre façon de faire',
    notOkay: ['Ça ne va pas ', 'aujourd’hui', ' ?'],
    thatsMe: 'C’est moi',
    makePlan: 'Faire mon plan gratuit',
  },
  de: {
    title: 'Wir gehen mit dir, bis du es geschafft hast.',
    intro:
      'HopeBegins ist kostenlose Unterstützung für die psychische Gesundheit, getragen vom Glauben. Es hat auf den Philippinen angefangen und gibt es jetzt auch auf Deutsch. Du bekommst Hilfe, sobald sich etwas nicht gut anfühlt, und nimmst eine Übung mit, die du weiter nutzen kannst.',
    whyTitle: 'Warum wir angefangen haben',
    why: [
      'HopeBegins hat auf den Philippinen als kleine Gruppe angefangen, die für Menschen gebetet hat. Heute bitten Menschen hier um Gebet, machen einen Plan für ihre Woche und finden jemanden zum Reden.',
      'Wenn du ganz unten bist, sollte Hilfe nur einen Fingertipp entfernt sein. Wir wollen, dass alle, die Angst haben oder niedergeschlagen sind, sie auf dem Handy finden, jetzt auch auf Deutsch.',
    ],
    goalsTitle: 'Was wir erreichen wollen',
    stepsTitle: 'Schritt für Schritt, von der ersten Suche bis Monate später',
    offersTitle: 'Was du nutzen kannst, alles kostenlos',
    howTitle: 'So arbeiten wir',
    notOkay: ['', 'Heute', ' nicht okay?'],
    thatsMe: 'Das bin ich',
    makePlan: 'Meinen kostenlosen Plan machen',
  },
  es: {
    title: 'Caminamos contigo hasta que salgas adelante.',
    intro:
      'HopeBegins es apoyo gratuito para la salud mental, inspirado en la fe. Nació en Filipinas y ahora también está en español. Recibes ayuda en cuanto sientes que algo no anda bien, y te llevas una herramienta que puedes seguir usando.',
    whyTitle: 'Por qué empezamos',
    why: [
      'HopeBegins empezó en Filipinas como un grupo pequeño que oraba por las personas. Hoy la gente viene a pedir oración, a hacer un plan para la semana y a encontrar a alguien con quien hablar.',
      'Cuando estás en tu peor momento, la ayuda debería estar al alcance de tu mano. Queremos que cualquier persona con ansiedad o tristeza la encuentre en su celular, ahora también en español.',
    ],
    goalsTitle: 'Lo que buscamos',
    stepsTitle: 'Paso a paso, desde la primera búsqueda hasta meses después',
    offersTitle: 'Lo que puedes usar, todo gratis',
    howTitle: 'Cómo trabajamos',
    notOkay: ['¿No estás bien ', 'hoy', '?'],
    thatsMe: 'Así me siento',
    makePlan: 'Hacer mi plan gratis',
  },
  ko: {
    title: '이겨낼 때까지 곁에서 함께 걸을게요',
    intro:
      'HopeBegins는 신앙에 뿌리를 둔 무료 마음 건강 지원이에요. 필리핀에서 시작해 이제 한국어로도 만날 수 있어요. 뭔가 잘못됐다고 느끼는 순간 바로 도움을 받고, 계속 쓸 수 있는 도구를 하나 갖게 돼요.',
    whyTitle: '우리가 시작한 이유',
    why: [
      'HopeBegins는 필리핀에서 사람들을 위해 기도하던 작은 모임으로 시작했어요. 지금은 많은 사람이 이곳에서 기도를 부탁하고, 한 주 계획을 세우고, 이야기할 사람을 찾아요.',
      '가장 힘들 때 도움은 손 닿는 곳에 있어야 해요. 불안하거나 마음이 가라앉은 누구나 휴대폰에서 도움을 찾을 수 있기를 바라요. 이제 한국어로도요.',
    ],
    goalsTitle: '우리가 바라는 것',
    stepsTitle: '첫 검색부터 몇 달 뒤까지, 한 걸음씩',
    offersTitle: '무료로 쓸 수 있는 모든 것',
    howTitle: '우리가 일하는 방식',
    notOkay: ['', '오늘', ' 괜찮지 않나요?'],
    thatsMe: '제 얘기예요',
    makePlan: '무료 계획 만들기',
  },
};

const GOALS: PerLangNoTl<{ title: string; text: string }>[] = [
  {
    en: {
      title: 'Help in the first minute',
      text: 'Every feeling page starts with something to do right now.',
    },
    fr: {
      title: 'De l’aide dès la première minute',
      text: 'Chaque page sur une émotion commence par quelque chose à faire tout de suite.',
    },
    de: {
      title: 'Hilfe in der ersten Minute',
      text: 'Jede Seite zu einem Gefühl beginnt mit etwas, das du sofort tun kannst.',
    },
    es: {
      title: 'Ayuda desde el primer minuto',
      text: 'Cada página sobre una emoción empieza con algo que puedes hacer ahora mismo.',
    },
    ko: {
      title: '첫 1분 안에 도움',
      text: '감정별 페이지는 모두 지금 바로 할 수 있는 일로 시작해요.',
    },
  },
  {
    en: {
      title: 'A plan made for you',
      text: '9 questions, then small steps for your week.',
    },
    fr: {
      title: 'Un plan fait pour toi',
      text: '9 questions, puis de petites étapes pour ta semaine.',
    },
    de: {
      title: 'Ein Plan, der zu dir passt',
      text: '9 Fragen, dann kleine Schritte für deine Woche.',
    },
    es: {
      title: 'Un plan hecho para ti',
      text: '9 preguntas y luego pasos pequeños para tu semana.',
    },
    ko: {
      title: '나에게 맞춘 계획',
      text: '9가지 질문에 답하면 한 주를 위한 작은 걸음이 나와요.',
    },
  },
  {
    en: {
      title: 'A tool you keep using',
      text: '4 weeks of practice and a Hope Card to keep.',
    },
    fr: {
      title: 'Un outil qui reste avec toi',
      text: '4 semaines de pratique et une carte d’espoir à garder.',
    },
    de: {
      title: 'Eine Übung, die bleibt',
      text: '4 Wochen Üben und eine Hoffnungskarte zum Behalten.',
    },
    es: {
      title: 'Una herramienta que sigues usando',
      text: '4 semanas de práctica y una tarjeta de esperanza para guardar.',
    },
    ko: {
      title: '계속 쓰는 도구',
      text: '4주 동안의 연습, 그리고 간직할 희망 카드.',
    },
  },
  {
    en: {
      title: 'Someone to turn to',
      text: 'E-coaches, Hope Carriers, and the crisis line on every page.',
    },
    fr: {
      title: 'Quelqu’un vers qui te tourner',
      text: 'Des lignes d’écoute gratuites dans ton pays, des Hope Carriers et, sur chaque page, le numéro à appeler en cas de crise.',
    },
    de: {
      title: 'Jemand, an den du dich wenden kannst',
      text: 'Kostenlose Hilfetelefone in deinem Land, Hope Carrier und das Krisentelefon auf jeder Seite.',
    },
    es: {
      title: 'Alguien a quien acudir',
      text: 'Líneas de ayuda gratuitas en tu país, Hope Carriers y la línea de crisis en cada página.',
    },
    ko: {
      title: '기댈 수 있는 사람',
      text: '무료 상담 전화, Hope Carrier, 그리고 모든 페이지에 있는 위기 상담 번호.',
    },
  },
];

type StepWords = Pick<ApproachStep, 'name' | 'text' | 'link'>;

const STAGES: (Pick<ApproachStep, 'photo' | 'offset'> & {
  words: PerLangNoTl<StepWords>;
})[] = [
  {
    photo: 'sleep',
    words: {
      en: {
        name: 'The moment you realize',
        text: 'You search "tired of everything" late at night and land on a page with something to do right now.',
        link: { href: '/tired-of-everything', label: 'See "Tired of everything"' },
      },
      // The same feeling page in each language, once it is written there.
      fr: {
        name: 'Le moment où tu t’en rends compte',
        text: 'Tard le soir, tu cherches « je n’en peux plus » et tu tombes sur une page avec quelque chose à faire tout de suite.',
        link: { href: '/tired-of-everything', label: 'Voir cette page' },
      },
      de: {
        name: 'Der Moment, in dem du es merkst',
        text: 'Spät in der Nacht suchst du nach „ich kann nicht mehr“ und landest auf einer Seite mit etwas, das du sofort tun kannst.',
        link: { href: '/tired-of-everything', label: 'Diese Seite ansehen' },
      },
      es: {
        name: 'El momento en que te das cuenta',
        text: 'A medianoche buscas “ya no puedo más” y llegas a una página con algo que puedes hacer ahora mismo.',
        link: { href: '/tired-of-everything', label: 'Ver esa página' },
      },
      ko: {
        name: '알아차리는 순간',
        text: '늦은 밤 ‘너무 지쳤어’를 검색하다가, 지금 바로 할 수 있는 일이 있는 페이지를 만나요.',
        link: { href: '/tired-of-everything', label: '그 페이지 보기' },
      },
    },
  },
  {
    photo: 'talk',
    words: {
      en: {
        name: 'Telling us how you feel',
        text: 'You pick how you feel, and we show you one next step, or a real person to talk to.',
        link: { href: '/#start', label: 'Open "How are you feeling?"' },
      },
      fr: {
        name: 'Nous dire comment tu te sens',
        text: 'Tu choisis ce que tu ressens, et on te montre une prochaine étape, ou une ligne gratuite où une vraie personne t’écoute.',
        link: { href: '/#start', label: 'Choisir ce que je ressens' },
      },
      de: {
        name: 'Uns sagen, wie es dir geht',
        text: 'Du wählst aus, wie es dir geht, und wir zeigen dir einen nächsten Schritt oder ein kostenloses Hilfetelefon, bei dem dir ein echter Mensch zuhört.',
        link: { href: '/#start', label: 'Auswählen, wie es mir geht' },
      },
      es: {
        name: 'Contarnos cómo te sientes',
        text: 'Eliges cómo te sientes y te mostramos un siguiente paso, o una línea gratuita donde una persona real te escucha.',
        link: { href: '/#start', label: 'Elegir cómo me siento' },
      },
      ko: {
        name: '지금 기분 알려 주기',
        text: '지금 기분을 고르면 다음에 할 일 하나를 보여 드려요. 실제 사람이 들어 주는 무료 상담 전화도 있어요.',
        link: { href: '/#start', label: '내 기분 고르기' },
      },
    },
  },
  {
    photo: 'morning',
    words: {
      en: {
        name: 'The first hour',
        text: 'You answer 9 questions and get your Hopeful Beginning Plan.',
        link: { href: '/action-plan', label: 'Make your plan' },
      },
      fr: {
        name: 'La première heure',
        text: 'Tu réponds à 9 questions et tu reçois ton plan personnel.',
        link: { href: '/action-plan', label: 'Faire ton plan' },
      },
      de: {
        name: 'Die erste Stunde',
        text: 'Du beantwortest 9 Fragen und bekommst deinen persönlichen Plan.',
        link: { href: '/action-plan', label: 'Deinen Plan machen' },
      },
      es: {
        name: 'La primera hora',
        text: 'Respondes 9 preguntas y recibes tu plan personal.',
        link: { href: '/action-plan', label: 'Haz tu plan' },
      },
      ko: {
        name: '첫 한 시간',
        text: '9가지 질문에 답하면 나만의 계획이 나와요.',
        link: { href: '/action-plan', label: '내 계획 만들기' },
      },
    },
  },
  {
    photo: 'unsure',
    words: {
      en: {
        name: 'The weeks after',
        text: 'You practice your tool most days for 4 weeks, with reminders on your phone.',
      },
      fr: {
        name: 'Les semaines suivantes',
        text: 'Pendant 4 semaines, tu pratiques ton outil presque tous les jours, avec des rappels sur ton téléphone.',
      },
      de: {
        name: 'Die Wochen danach',
        text: '4 Wochen lang machst du an den meisten Tagen deine Übung, mit Erinnerungen auf dem Handy.',
      },
      es: {
        name: 'Las semanas siguientes',
        text: 'Durante 4 semanas practicas tu herramienta casi todos los días, con recordatorios en tu celular.',
      },
      ko: {
        name: '그다음 몇 주',
        text: '4주 동안 거의 매일 내 도구를 연습해요. 휴대폰 알림이 챙겨 줘요.',
      },
    },
  },
  {
    photo: 'hope',
    // The hero already shows this turn's sunrise; take the next one.
    offset: 1,
    words: {
      en: {
        name: 'Getting through it',
        text: 'You see how far you have come, and keep what helped on your Hope Card.',
      },
      fr: {
        name: 'S’en sortir',
        text: 'Tu vois combien tu as avancé, et tu gardes sur ta carte d’espoir ce qui t’a aidé.',
      },
      de: {
        name: 'Es schaffen',
        text: 'Du siehst, wie weit du gekommen bist, und hältst auf deiner Hoffnungskarte fest, was dir geholfen hat.',
      },
      es: {
        name: 'Salir adelante',
        text: 'Ves cuánto has avanzado y guardas en tu tarjeta de esperanza lo que te ayudó.',
      },
      ko: {
        name: '이겨내기',
        text: '얼마나 왔는지 돌아보고, 도움이 된 것을 희망 카드에 담아 둬요.',
      },
    },
  },
  {
    photo: 'care',
    words: {
      en: {
        name: 'Afterwards',
        text: 'A 1-minute check-in each month, and help one tap away if things come back.',
      },
      fr: {
        name: 'Et après',
        text: 'Un bilan d’une minute chaque mois, et de l’aide à portée de main si ça revient.',
      },
      de: {
        name: 'Danach',
        text: 'Jeden Monat ein Check-in von einer Minute, und Hilfe nur einen Fingertipp entfernt, falls es wiederkommt.',
      },
      es: {
        name: 'Después',
        text: 'Un chequeo de 1 minuto cada mes, y ayuda al alcance de tu mano si vuelves a sentirte mal.',
      },
      ko: {
        name: '그 후에',
        text: '매달 1분 체크인, 그리고 다시 힘들어지면 바로 닿는 도움.',
      },
    },
  },
];

type OfferWords = Pick<Offer, 'title' | 'text'>;

const OFFERS: {
  title: PerLangNoTl<string>;
  items: (Omit<Offer, 'title' | 'text'> & { words: PerLangNoTl<OfferWords> })[];
}[] = [
  {
    title: {
      en: 'For right now',
      fr: 'Tout de suite',
      de: 'Sofort',
      es: 'Ahora mismo',
      ko: '지금 바로',
    },
    items: [
      {
        href: '/tools',
        words: {
          en: {
            title: 'Tools for hard moments',
            text: 'Breathing, 5-4-3-2-1, worry time and more.',
          },
          fr: {
            title: 'Des outils pour les moments difficiles',
            text: 'La respiration lente, l’ancrage 5-4-3-2-1, le quart d’heure des soucis et d’autres encore.',
          },
          de: {
            title: 'Übungen für schwere Momente',
            text: 'Langsames Atmen, die 5-4-3-2-1-Übung, Sorgenzeit und mehr.',
          },
          es: {
            title: 'Herramientas para momentos difíciles',
            text: 'Respiración lenta, el ejercicio 5-4-3-2-1, tiempo para preocuparte y más.',
          },
          ko: {
            title: '힘든 순간을 위한 도구',
            text: '천천히 숨쉬기, 5-4-3-2-1 그라운딩, 걱정 시간 등.',
          },
        },
      },
      {
        href: '/laro-muna',
        words: {
          en: {
            title: 'Games',
            text: 'Find the pair, Saranggola and The trip.',
          },
          fr: {
            title: 'Des jeux',
            text: 'Trouve la paire, Le cerf-volant et Le trajet.',
          },
          de: {
            title: 'Spiele',
            text: 'Paare finden, Der Drachen und Die Fahrt.',
          },
          es: {
            title: 'Juegos',
            text: 'Encuentra las parejas, La cometa y El paseo en autobús.',
          },
          ko: {
            title: '게임',
            text: '짝 맞추기, 연날리기, 여행길.',
          },
        },
      },
    ],
  },
  {
    title: {
      en: 'People to talk to',
      fr: 'À qui parler',
      de: 'Zum Reden',
      es: 'Con quién hablar',
      ko: '이야기할 사람',
    },
    items: [
      {
        // Goes to the free lines in the reader's country on their pages.
        ecoach: true,
        words: {
          en: {
            title: 'E-coaches',
            text: 'Real people from Himala Everyday, on Messenger.',
          },
          fr: {
            title: 'Parler à quelqu’un',
            text: 'Des lignes d’écoute gratuites dans ton pays.',
          },
          de: {
            title: 'Mit jemandem reden',
            text: 'Kostenlose Hilfetelefone in deinem Land.',
          },
          es: {
            title: 'Hablar con alguien',
            text: 'Líneas de ayuda gratuitas en tu país.',
          },
          ko: {
            title: '누군가와 이야기하기',
            text: '내가 있는 나라의 무료 상담 전화.',
          },
        },
      },
      {
        href: '/prayers',
        words: {
          en: {
            title: 'Hope Carriers',
            text: 'Volunteers who pray for your request.',
          },
          fr: {
            title: 'Hope Carriers',
            text: 'Des bénévoles qui prient pour ta demande.',
          },
          de: {
            title: 'Hope Carrier',
            text: 'Ehrenamtliche, die für dein Anliegen beten.',
          },
          es: {
            title: 'Hope Carriers',
            text: 'Personas voluntarias que oran por tu petición.',
          },
          ko: {
            title: 'Hope Carrier',
            text: '내 기도 제목을 위해 기도해 주는 자원봉사자들.',
          },
        },
      },
      {
        href: '/hope-ai',
        words: {
          en: { title: 'Hope AI', text: 'An AI assistant, any hour.' },
          fr: { title: 'Hope AI', text: 'Un assistant IA, à toute heure.' },
          de: { title: 'Hope AI', text: 'Ein KI-Assistent, jederzeit.' },
          es: {
            title: 'Hope AI',
            text: 'Un asistente de IA, a cualquier hora.',
          },
          ko: { title: 'Hope AI', text: '언제든 대화할 수 있는 AI 도우미.' },
        },
      },
    ],
  },
  {
    title: {
      en: 'To keep going',
      fr: 'Pour continuer',
      de: 'Dranbleiben',
      es: 'Para seguir',
      ko: '꾸준히 이어 가기',
    },
    items: [
      {
        href: '/action-plan',
        words: {
          en: {
            title: 'Hopeful Beginning Plan',
            text: 'A free plan that stays on your phone.',
          },
          fr: {
            title: 'Ton plan personnel',
            text: 'Un plan gratuit qui reste sur ton téléphone.',
          },
          de: {
            title: 'Dein persönlicher Plan',
            text: 'Ein kostenloser Plan, der auf deinem Handy bleibt.',
          },
          es: {
            title: 'Tu plan personal',
            text: 'Un plan gratis que se queda en tu celular.',
          },
          ko: {
            title: '나만의 계획',
            text: '내 휴대폰에만 저장되는 무료 계획.',
          },
        },
      },
      {
        href: '/get-started',
        words: {
          en: {
            title: 'Five steps for hopeless days',
            text: 'A video, a prayer and a Bible reading.',
          },
          fr: {
            title: 'Cinq petites étapes quand tu perds espoir',
            text: 'Une vidéo (en anglais), une prière et une lecture de la Bible.',
          },
          de: {
            title: 'Fünf Schritte für hoffnungslose Tage',
            text: 'Ein Video (auf Englisch), ein Gebet und ein Bibeltext.',
          },
          es: {
            title: 'Cinco pasos cortos para cuando pierdes la esperanza',
            text: 'Un video (en inglés), una oración y una lectura de la Biblia.',
          },
          ko: {
            title: '희망이 보이지 않을 때, 다섯 걸음',
            text: '영상(영어), 기도, 성경 읽기.',
          },
        },
      },
      {
        href: '/daily-hope',
        words: {
          en: {
            title: 'Daily Hope',
            text: 'An encouraging email a day for 21 days.',
          },
          fr: {
            title: 'Daily Hope',
            text: 'Un e-mail d’encouragement par jour pendant 21 jours.',
          },
          de: {
            title: 'Daily Hope',
            text: '21 Tage lang jeden Tag eine ermutigende E-Mail.',
          },
          es: {
            title: 'Daily Hope',
            text: 'Un correo de ánimo al día durante 21 días.',
          },
          ko: {
            title: 'Daily Hope',
            text: '21일 동안 매일 받는 격려 메일(영어).',
          },
        },
      },
      {
        href: '/hopecasts',
        words: {
          en: { title: 'HopeCasts', text: 'Short audio messages of hope.' },
          fr: {
            title: 'HopeCasts',
            text: 'De courts messages audio d’espoir, en anglais.',
          },
          de: {
            title: 'HopeCasts',
            text: 'Kurze Hoffnungsbotschaften zum Anhören, auf Englisch.',
          },
          es: {
            title: 'HopeCasts',
            text: 'Mensajes cortos de esperanza en audio, en inglés.',
          },
          ko: { title: 'HopeCasts', text: '짧은 희망 오디오 메시지(영어).' },
        },
      },
      {
        href: 'https://warroom.hopebegins.today',
        external: true,
        words: {
          en: { title: 'Prayer War Room', text: 'A free prayer app.' },
          fr: {
            title: 'Prayer War Room',
            text: 'Une appli de prière gratuite, en anglais.',
          },
          de: {
            title: 'Prayer War Room',
            text: 'Eine kostenlose Gebets-App, auf Englisch.',
          },
          es: {
            title: 'Prayer War Room',
            text: 'Una app de oración gratuita, en inglés.',
          },
          ko: { title: 'Prayer War Room', text: '무료 기도 앱(영어).' },
        },
      },
    ],
  },
];

/** `line`: the visitor's own crisis line follows the text. */
const HOW: PerLangNoTl<{ title: string; text: string; line?: boolean }>[] = [
  {
    en: {
      title: 'The method',
      text: "The plan's steps come from CBT, a common talk therapy, and the World Health Organization's stress guide.",
    },
    fr: {
      title: 'La méthode',
      text: 'Les étapes du plan viennent de la TCC (thérapie cognitive et comportementale), une forme de psychothérapie très courante, et du guide de l’Organisation mondiale de la santé sur le stress.',
    },
    de: {
      title: 'Die Methode',
      text: 'Die Schritte im Plan stammen aus der kognitiven Verhaltenstherapie (KVT), einer verbreiteten Form der Psychotherapie, und aus dem Stress-Ratgeber der Weltgesundheitsorganisation (WHO).',
    },
    es: {
      title: 'El método',
      text: 'Los pasos del plan vienen de la TCC (terapia cognitivo-conductual), una terapia psicológica muy común, y de la guía de la Organización Mundial de la Salud para manejar el estrés.',
    },
    ko: {
      title: '방법',
      text: '계획의 단계는 널리 쓰이는 심리치료인 인지행동치료(CBT)와 세계보건기구(WHO)의 스트레스 관리 안내서를 바탕으로 해요.',
    },
  },
  {
    en: {
      title: 'Your privacy',
      text: 'Your plan, answers and Hope Card stay on your phone. We only get your email if you ask us to send something.',
    },
    fr: {
      title: 'Ta vie privée',
      text: 'Ton plan, tes réponses et ta carte d’espoir restent sur ton téléphone. On ne reçoit ton e-mail que si tu nous demandes de t’envoyer quelque chose.',
    },
    de: {
      title: 'Deine Privatsphäre',
      text: 'Dein Plan, deine Antworten und deine Hoffnungskarte bleiben auf deinem Handy. Deine E-Mail-Adresse bekommen wir nur, wenn du uns bittest, dir etwas zu schicken.',
    },
    es: {
      title: 'Tu privacidad',
      text: 'Tu plan, tus respuestas y tu tarjeta de esperanza se quedan en tu celular. Solo recibimos tu correo si nos pides que te enviemos algo.',
    },
    ko: {
      title: '개인정보',
      text: '내 계획과 답변, 희망 카드는 내 휴대폰에만 저장돼요. 무언가를 보내 달라고 할 때만 이메일 주소를 받아요.',
    },
  },
  {
    en: {
      title: 'In a crisis',
      text: 'The free crisis line for the country you are in is one tap away on every page, 24/7.',
    },
    fr: {
      title: 'En cas de crise',
      text: 'Le numéro gratuit à appeler en cas de crise dans ton pays est en haut de chaque page, 24h/24.',
      line: true,
    },
    de: {
      title: 'In einer Krise',
      text: 'Das kostenlose Krisentelefon deines Landes erreichst du auf jeder Seite mit einem Fingertipp, rund um die Uhr.',
      line: true,
    },
    es: {
      title: 'En una crisis',
      text: 'La línea de crisis de tu país está al alcance de tu mano, arriba en cada página.',
      line: true,
    },
    ko: {
      title: '위기 상황이라면',
      text: '모든 페이지 맨 위에서 내 나라의 위기 상담 전화로 바로 연결돼요.',
      line: true,
    },
  },
];

/**
 * On a French, German, Spanish or Korean page, a step links to its page
 * only once that page is written in the reader's language.
 */
const inLanguage = (href: string, lang: Lang) =>
  !isIntlLang(lang) || localizeHref(href, lang) !== href;

const h2Class =
  'text-balance font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';

export function OurApproach({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  const turn = photoTurn();
  const hero = photo('hope', turn);
  const goals = GOALS.map((goal) => noTl(goal, lang));
  const steps: ApproachStep[] = STAGES.map(({ words, ...stage }) => {
    const step = noTl(words, lang);
    const link =
      step.link && inLanguage(step.link.href, lang) ? step.link : undefined;
    return { ...stage, ...step, link };
  });
  const offers = OFFERS.map((group) => ({
    title: noTl(group.title, lang),
    items: group.items.map(({ words, ...offer }) => ({
      ...offer,
      ...noTl(words, lang),
    })),
  }));
  const how = HOW.map((item) => noTl(item, lang));

  return (
    <div className="overflow-x-clip pt-10 md:pt-16">
      <div className="px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-3xl text-balance font-playfair text-5xl md:text-7xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            {t.title}
          </h1>
          <p
            className="mt-6 max-w-2xl font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em] hb-step-in"
            style={{ animationDelay: '120ms' }}
          >
            {t.intro}
          </p>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[21/9]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover hb-photo-settle"
            />
          </div>

          <Reveal
            as="section"
            className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[1fr_1.3fr] md:gap-14"
          >
            <h2 className={h2Class}>{t.whyTitle}</h2>
            <div className="space-y-4 text-lg text-[#6E5F47] leading-relaxed">
              <p>{t.why[0]}</p>
              <p>{t.why[1]}</p>
            </div>
          </Reveal>

          <section aria-labelledby="goals-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="goals-title" className={h2Class}>
                {t.goalsTitle}
              </h2>
            </Reveal>
            <ol className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {goals.map((goal, index) => (
                <Reveal key={goal.title} as="li" className="flex gap-5">
                  <span className="w-9 shrink-0 font-playfair text-5xl leading-none text-[#AEC488] tabular-nums">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-poppins text-xl font-semibold text-[#6E5F47]">
                      {goal.title}
                    </span>
                    <span className="mt-1 block text-[#6E5F47] leading-relaxed">
                      {goal.text}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-labelledby="steps-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="steps-title" className={h2Class}>
                {t.stepsTitle}
              </h2>
            </Reveal>
            <ApproachSteps steps={steps} turn={turn} lang={lang} />
          </section>

          <section aria-labelledby="offers-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="offers-title" className={h2Class}>
                {t.offersTitle}
              </h2>
            </Reveal>
            <ApproachOffers groups={offers} lang={lang} />
          </section>

          <section
            aria-labelledby="how-title"
            className="mt-20 border-t border-[#E2DFDA] pt-12 md:mt-28"
          >
            <h2 id="how-title" className="sr-only">
              {t.howTitle}
            </h2>
            <ul className="grid gap-8 md:grid-cols-3">
              {how.map((item) => (
                <Reveal key={item.title} as="li">
                  <p className="font-poppins text-lg font-semibold text-[#6E5F47]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[#6E5F47] leading-relaxed">
                    {item.text}
                    {item.line && (
                      <>
                        {' '}
                        <CrisisSentence lang={lang} danger={false} />
                      </>
                    )}
                  </p>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <HopeStoriesSection lang={lang} />
      </div>

      {/* The end: a real dawn, and the same first step as the home page. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={photo('dawn', turn).src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover hb-photo-settle"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <Reveal className="px-6 py-24 text-center md:py-32">
          <h2 className="text-balance font-playfair text-5xl md:text-7xl text-white leading-[0.95] tracking-[-0.04em]">
            {t.notOkay[0]}
            <em className="text-[#EFF3E7]">{t.notOkay[1]}</em>
            {t.notOkay[2]}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#start"
              className="inline-flex min-h-12 items-center rounded-2xl bg-white px-8 font-poppins text-lg font-bold text-[#6E5F47] transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {t.thatsMe}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/action-plan"
              className="inline-flex min-h-12 items-center rounded-2xl border border-white/70 px-8 font-poppins text-lg font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {t.makePlan}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
