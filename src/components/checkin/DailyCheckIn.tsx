'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/LocalLink';
import {
  ArrowLeft,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  MessageCircle,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { ToolExercise, type ToolKind } from '@/components/tools/ToolExercise';
import {
  chipClass,
  primaryClass,
  quietClass,
  secondaryClass,
} from '@/components/tools/toolStyles';
import { VERSES, VERSE_ATTRIBUTION, type VerseKey } from '@/lib/blog/verses';
import {
  AREAS,
  clearCheckIns,
  daysAway,
  growth,
  isMilestone,
  saveCheckIn,
  thisWeek,
  useCheckIns,
  type Area,
  type CheckIn,
  type Weather,
} from '@/lib/checkIns';
import type { FeelingLang } from '@/lib/feelingPages';
import { LANG_INFO, type PerLang } from '@/lib/i18n';
import { pathIn } from '@/lib/taglishTwins';
import { localDay } from '@/lib/toolNotes';
import { analyticsService } from '@/services/analyticsService';
import { Sampaguita } from './Sampaguita';
import { CrisisSentence } from '@/components/help/Crisis';

/**
 * The daily check-in, in taps: the weather inside you today and what is on
 * your mind, then one small thing to try. Each day checked in grows a
 * sampaguita and unlocks a verse at each step. The tally is days, all time
 * and this week, so missing a day costs nothing. Everything stays on the
 * phone; the site counts only that a check-in happened.
 */

const WEATHER: { value: Weather; icon: LucideIcon }[] = [
  { value: 1, icon: CloudLightning },
  { value: 2, icon: CloudRain },
  { value: 3, icon: Cloud },
  { value: 4, icon: CloudSun },
  { value: 5, icon: Sun },
];

// A verse for each step of the plant, then one more for every bloom after.
const STAGE_VERSES: VerseKey[] = [
  'lam-3-22-23',
  'isa-40-31',
  'psa-46-1',
  'mat-11-28-30',
  'jhn-14-27',
  '2co-4-8-9',
];
const BLOOM_VERSES: VerseKey[] = [
  'psa-147-3',
  'psa-34-18',
  'php-4-6-7',
  'isa-41-10',
  'psa-56-3',
  'psa-94-19',
  '1pe-5-7',
  'psa-42-11',
  'mat-6-34',
  'psa-23-4',
];

function versesUnlocked(stage: number, extraBlooms: number): VerseKey[] {
  return [
    ...STAGE_VERSES.slice(0, stage),
    ...Array.from(
      { length: extraBlooms },
      (_, i) => BLOOM_VERSES[i % BLOOM_VERSES.length]
    ),
  ];
}

interface Copy {
  weatherTitle: string;
  weatherHint: string;
  weather: Record<Weather, string>;
  areasTitle: string;
  areas: Record<Area, string>;
  save: string;
  back: string;
  privacy: string;
  firstTitle: string;
  backTitle: string;
  grewTitle: string;
  doneTitle: string;
  againTitle: string;
  days: (n: number) => string;
  daysLabel: string;
  weekLabel: string;
  weekCount: (n: number) => string;
  /** One per stage of the plant, empty pot first. */
  stageNames: string[];
  /** "N more days until" what comes next at each stage. */
  toNext: (n: number, what: string) => string;
  nextWhat: string[];
  neverWilts: string;
  verseNew: string;
  versesTitle: (n: number) => string;
  recentTitle: string;
  change: string;
  clear: string;
  clearConfirm: string;
  suggestTitle: string;
  suggest: Record<Weather, string>;
  tools: Partial<Record<ToolKind, string>>;
  story: string;
  ecoach: string;
  heavyRun: string;
}

const copy: PerLang<Copy> = {
  en: {
    weatherTitle: 'How are you today?',
    weatherHint: 'Pick the weather closest to how you feel.',
    weather: {
      1: 'Stormy',
      2: 'Rainy',
      3: 'Cloudy',
      4: 'Some sun',
      5: 'Sunny',
    } as Record<Weather, string>,
    areasTitle: "What's on your mind? Tap any that fit.",
    areas: {
      work: 'Work or school',
      family: 'Family',
      money: 'Money',
      love: 'Love life',
      friends: 'Friends',
      health: 'Health',
      sleep: 'Sleep',
      faith: 'Faith',
      lonely: 'Feeling alone',
    } as Record<Area, string>,
    save: 'Check in',
    back: 'Back',
    privacy: 'Your check-ins stay on this phone.',
    firstTitle: 'You planted a seed.',
    backTitle: 'Welcome back.',
    grewTitle: 'Your sampaguita grew.',
    doneTitle: 'Checked in for today.',
    againTitle: "You've checked in today.",
    days: (n: number) => (n === 1 ? '1 day' : `${n} days`),
    daysLabel: 'of checking in',
    weekLabel: 'This week',
    weekCount: (n: number) =>
      n === 1 ? '1 day this week' : `${n} days this week`,
    stageNames: [
      'An empty pot',
      'A seed',
      'A sprout',
      'First leaves',
      'Growing',
      'First flower',
      'In bloom',
    ],
    toNext: (n: number, what: string) =>
      `${n} more ${n === 1 ? 'day' : 'days'} until ${what}.`,
    nextWhat: [
      'your seed',
      'it sprouts',
      'its first leaves',
      'it grows more leaves',
      'its first flower',
      'it blooms fully',
      'another flower',
    ],
    neverWilts:
      'Missed a day? Your plant never wilts here. Every day you come back counts.',
    verseNew: 'A verse for you',
    versesTitle: (n: number) => `Your verses (${n})`,
    recentTitle: 'Your last check-ins',
    change: "Change today's answer",
    clear: 'Delete my check-ins from this phone',
    clearConfirm: 'Delete all your check-ins and your plant from this phone?',
    suggestTitle: 'Something for today',
    suggest: {
      1: 'Stormy days are heavy. Start with your breath, and tell someone how you are today.',
      2: 'Pick one of these for a few minutes. Small steps help on rainy days.',
      3: 'A few minutes with one of these can clear the sky a little.',
      4: 'Keep the good going.',
      5: 'Keep the good going.',
    } as Record<Weather, string>,
    tools: {
      breathe: 'Slow breathing, 2 min',
      'thought-check': 'Thought check, 3 min',
      'one-thing': 'One small thing, 10 min',
      'worry-note': 'Worry note, 2 min',
      message: 'Message someone, 1 min',
      kite: 'Saranggola, a 1-minute game',
    } as Partial<Record<ToolKind, string>>,
    story: 'Read a story of hope',
    ecoach: 'Talk to an e-coach',
    heavyRun:
      'Your last few check-ins have been heavy. Please talk to someone this week. An e-coach can listen, free.',
  },
  tl: {
    weatherTitle: 'Kumusta ka ngayon?',
    weatherHint: 'Piliin ang panahong pinakamalapit sa nararamdaman mo.',
    weather: {
      1: 'Bumabagyo',
      2: 'Umuulan',
      3: 'Maulap',
      4: 'May araw',
      5: 'Maaraw',
    } as Record<Weather, string>,
    areasTitle: 'Ano ang nasa isip mo? I-tap ang mga tugma.',
    areas: {
      work: 'Trabaho o school',
      family: 'Pamilya',
      money: 'Pera',
      love: 'Love life',
      friends: 'Barkada',
      health: 'Kalusugan',
      sleep: 'Tulog',
      faith: 'Pananampalataya',
      lonely: 'Pag-iisa',
    } as Record<Area, string>,
    save: 'Mag-check in',
    back: 'Bumalik',
    privacy: 'Sa phone na ito lang naka-save ang mga check-in mo.',
    firstTitle: 'Nagtanim ka ng binhi.',
    backTitle: 'Welcome back.',
    grewTitle: 'Lumaki ang sampaguita mo.',
    doneTitle: 'Naka-check in ka na ngayong araw.',
    againTitle: 'Nakapag-check in ka na ngayong araw.',
    days: (n: number) => `${n} araw`,
    daysLabel: 'ng pag-check in',
    weekLabel: 'Ngayong linggo',
    weekCount: (n: number) => `${n} araw ngayong linggo`,
    stageNames: [
      'Walang lamang paso',
      'Binhi',
      'Usbong',
      'Mga unang dahon',
      'Lumalaki',
      'Unang bulaklak',
      'Namumulaklak',
    ],
    toNext: (n: number, what: string) => `${n} araw pa bago ${what}.`,
    nextWhat: [
      'itanim ang binhi',
      'ito sumibol',
      'magkadahon ito',
      'dumami ang dahon nito',
      'ang unang bulaklak',
      'mamukadkad ito nang buo',
      'ang isa pang bulaklak',
    ],
    neverWilts:
      'May araw kang nakaligtaan? Hindi nalalanta ang halaman mo dito. Bilang ang bawat araw na bumabalik ka.',
    verseNew: 'Isang talata para sa iyo',
    versesTitle: (n: number) => `Ang mga talata mo (${n})`,
    recentTitle: 'Ang mga huling check-in mo',
    change: 'Palitan ang sagot ngayong araw',
    clear: 'Burahin ang mga check-in ko sa phone na ito',
    clearConfirm:
      'Burahin ang lahat ng check-in at ang halaman mo sa phone na ito?',
    suggestTitle: 'Para sa araw na ito',
    suggest: {
      1: 'Mabigat ang mga araw na bumabagyo. Magsimula sa paghinga, at sabihin sa isang tao ang kalagayan mo ngayon.',
      2: 'Pumili ng isa rito para sa ilang minuto. Nakakatulong ang maliliit na hakbang sa maulang araw.',
      3: 'Ilang minuto sa isa sa mga ito, at puwedeng lumiwanag nang kaunti.',
      4: 'Ituloy ang maganda.',
      5: 'Ituloy ang maganda.',
    } as Record<Weather, string>,
    tools: {
      breathe: 'Dahan-dahang paghinga, 2 min',
      'thought-check': 'Thought check, 3 min',
      'one-thing': 'Isang maliit na bagay, 10 min',
      'worry-note': 'Worry note, 2 min',
      message: 'Mag-message sa isang tao, 1 min',
      kite: 'Saranggola, larong 1 minuto',
    } as Partial<Record<ToolKind, string>>,
    story: 'Magbasa ng kuwento ng pag-asa',
    ecoach: 'Kausapin ang e-coach',
    heavyRun:
      'Mabigat ang huling ilang check-in mo. Kumausap ng isang tao ngayong linggo. Puwedeng makinig ang isang e-coach, libre.',
  },
  // The plant is a jasmine in these languages. There are no e-coaches here:
  // the talk button goes to free helplines in the visitor's country.
  fr: {
    weatherTitle: 'Comment ça va aujourd’hui ?',
    weatherHint: 'Choisis la météo la plus proche de ce que tu ressens.',
    weather: {
      1: 'Orage',
      2: 'Pluie',
      3: 'Nuages',
      4: 'Éclaircies',
      5: 'Soleil',
    },
    areasTitle:
      'Qu’est-ce qui occupe tes pensées ? Touche tout ce qui correspond.',
    areas: {
      work: 'Travail ou études',
      family: 'Famille',
      money: 'Argent',
      love: 'Vie amoureuse',
      friends: 'Amis',
      health: 'Santé',
      sleep: 'Sommeil',
      faith: 'Foi',
      lonely: 'Solitude',
    },
    save: 'Valider',
    back: 'Retour',
    privacy: 'Tes bilans restent sur ce téléphone.',
    firstTitle: 'Tu as planté une graine.',
    backTitle: 'Te revoilà.',
    grewTitle: 'Ton jasmin a grandi.',
    doneTitle: 'C’est fait pour aujourd’hui.',
    againTitle: 'Tu as déjà fait ton bilan aujourd’hui.',
    days: (n: number) => (n === 1 ? '1 jour' : `${n} jours`),
    daysLabel: 'où tu as fait ton bilan',
    weekLabel: 'Cette semaine',
    weekCount: (n: number) =>
      n <= 1 ? `${n} jour cette semaine` : `${n} jours cette semaine`,
    stageNames: [
      'Un pot vide',
      'Une graine',
      'Une pousse',
      'Premières feuilles',
      'En pleine croissance',
      'Première fleur',
      'En fleurs',
    ],
    toNext: (n: number, what: string) =>
      `Encore ${n} ${n === 1 ? 'jour' : 'jours'} avant ${what}.`,
    nextWhat: [
      'de planter ta graine',
      'qu’il germe',
      'ses premières feuilles',
      'qu’il ait plus de feuilles',
      'sa première fleur',
      'qu’il soit en pleine floraison',
      'une nouvelle fleur',
    ],
    neverWilts:
      'Tu as manqué un jour ? Ici, ta plante ne fane jamais. Chaque jour où tu reviens compte.',
    verseNew: 'Un verset pour toi',
    versesTitle: (n: number) => `Tes versets (${n})`,
    recentTitle: 'Tes derniers bilans',
    change: 'Modifier ma réponse d’aujourd’hui',
    clear: 'Effacer mes bilans de ce téléphone',
    clearConfirm: 'Effacer tous tes bilans et ta plante de ce téléphone ?',
    suggestTitle: 'Quelque chose pour aujourd’hui',
    suggest: {
      1: 'Les jours d’orage sont lourds. Commence par ta respiration, et dis à quelqu’un comment tu vas aujourd’hui.',
      2: 'Choisis l’une de ces idées pour quelques minutes. Les jours de pluie, les petits pas font du bien.',
      3: 'Quelques minutes avec l’une de ces idées peuvent éclaircir un peu le ciel.',
      4: 'Continue sur cette lancée.',
      5: 'Continue sur cette lancée.',
    },
    tools: {
      breathe: 'Respiration lente, 2 min',
      'thought-check': 'Vérifier une pensée, 3 min',
      'one-thing': 'Une petite chose, 10 min',
      'worry-note': 'Mettre tes soucis de côté, 2 min',
      message: 'Écrire à quelqu’un, 1 min',
      kite: 'Le cerf-volant, un jeu d’une minute',
    },
    story: 'Lire une histoire d’espoir',
    ecoach: 'Parler à quelqu’un',
    heavyRun:
      'Tes derniers bilans ont été lourds. S’il te plaît, parle à quelqu’un cette semaine. Tu peux appeler une ligne d’écoute, c’est gratuit.',
  },
  de: {
    weatherTitle: 'Wie geht es dir heute?',
    weatherHint: 'Wähl das Wetter, das am besten zu deinem Gefühl passt.',
    weather: {
      1: 'Gewitter',
      2: 'Regen',
      3: 'Wolken',
      4: 'Etwas Sonne',
      5: 'Sonne',
    },
    areasTitle: 'Was beschäftigt dich? Tippe alles an, was passt.',
    areas: {
      work: 'Arbeit oder Schule',
      family: 'Familie',
      money: 'Geld',
      love: 'Liebe',
      friends: 'Freunde',
      health: 'Gesundheit',
      sleep: 'Schlaf',
      faith: 'Glaube',
      lonely: 'Einsamkeit',
    },
    save: 'Einchecken',
    back: 'Zurück',
    privacy: 'Deine Check-ins bleiben auf diesem Handy.',
    firstTitle: 'Du hast einen Samen gesät.',
    backTitle: 'Schön, dass du wieder da bist.',
    grewTitle: 'Dein Jasmin ist gewachsen.',
    doneTitle: 'Für heute eingecheckt.',
    againTitle: 'Du hast heute schon eingecheckt.',
    days: (n: number) => (n === 1 ? '1 Tag' : `${n} Tage`),
    daysLabel: 'eingecheckt',
    weekLabel: 'Diese Woche',
    weekCount: (n: number) =>
      n === 1 ? '1 Tag diese Woche' : `${n} Tage diese Woche`,
    stageNames: [
      'Ein leerer Topf',
      'Ein Samenkorn',
      'Ein Keimling',
      'Erste Blätter',
      'Im Wachstum',
      'Erste Blüte',
      'In voller Blüte',
    ],
    toNext: (n: number, what: string) =>
      `Noch ${n} ${n === 1 ? 'Tag' : 'Tage'} bis ${what}.`,
    nextWhat: [
      'zum Aussäen',
      'zum Keimen',
      'zu den ersten Blättern',
      'zu neuen Blättern',
      'zur ersten Blüte',
      'zur vollen Blüte',
      'zur nächsten Blüte',
    ],
    neverWilts:
      'Einen Tag verpasst? Deine Pflanze welkt hier nie. Jeder Tag, an dem du wiederkommst, zählt.',
    verseNew: 'Ein Bibelvers für dich',
    versesTitle: (n: number) => `Deine Bibelverse (${n})`,
    recentTitle: 'Deine letzten Check-ins',
    change: 'Meine Antwort von heute ändern',
    clear: 'Meine Check-ins von diesem Handy löschen',
    clearConfirm:
      'Alle deine Check-ins und deine Pflanze von diesem Handy löschen?',
    suggestTitle: 'Etwas für heute',
    suggest: {
      1: 'Gewittertage sind schwer. Fang mit deinem Atem an und erzähl heute jemandem, wie es dir geht.',
      2: 'Nimm dir ein paar Minuten für eins davon. Kleine Schritte helfen an Regentagen.',
      3: 'Ein paar Minuten mit einem davon können den Himmel ein bisschen aufhellen.',
      4: 'Halte das Gute fest.',
      5: 'Halte das Gute fest.',
    },
    tools: {
      breathe: 'Langsames Atmen, 2 Min.',
      'thought-check': 'Gedanken-Check, 3 Min.',
      'one-thing': 'Eine kleine Sache, 10 Min.',
      'worry-note': 'Sorgenzettel, 2 Min.',
      message: 'Jemandem schreiben, 1 Min.',
      kite: 'Der Drachen, ein 1-Minuten-Spiel',
    },
    story: 'Eine Geschichte der Hoffnung lesen',
    ecoach: 'Mit jemandem reden',
    heavyRun:
      'Deine letzten Check-ins waren schwer. Bitte sprich diese Woche mit jemandem. Ein kostenloses Hilfetelefon hört dir zu.',
  },
  es: {
    weatherTitle: '¿Cómo estás hoy?',
    weatherHint: 'Elige el clima que más se parezca a cómo te sientes.',
    weather: {
      1: 'Tormenta',
      2: 'Lluvia',
      3: 'Nublado',
      4: 'Algo de sol',
      5: 'Soleado',
    },
    areasTitle: '¿Qué tienes en mente? Toca todo lo que corresponda.',
    areas: {
      work: 'Trabajo o estudios',
      family: 'Familia',
      money: 'Dinero',
      love: 'Vida amorosa',
      friends: 'Amistades',
      health: 'Salud',
      sleep: 'Sueño',
      faith: 'Fe',
      lonely: 'Soledad',
    },
    save: 'Guardar mi chequeo',
    back: 'Volver',
    privacy: 'Tus chequeos se quedan en este celular.',
    firstTitle: 'Plantaste una semilla.',
    backTitle: 'Qué bueno verte de nuevo.',
    grewTitle: 'Tu jazmín creció.',
    doneTitle: 'Chequeo de hoy listo.',
    againTitle: 'Ya hiciste tu chequeo de hoy.',
    days: (n: number) => (n === 1 ? '1 día' : `${n} días`),
    daysLabel: 'haciendo tu chequeo',
    weekLabel: 'Esta semana',
    weekCount: (n: number) =>
      n === 1 ? '1 día esta semana' : `${n} días esta semana`,
    stageNames: [
      'Una maceta vacía',
      'Una semilla',
      'Un brote',
      'Primeras hojas',
      'Creciendo',
      'Primera flor',
      'En flor',
    ],
    toNext: (n: number, what: string) =>
      `${n === 1 ? 'Falta 1 día' : `Faltan ${n} días`} para ${what}.`,
    nextWhat: [
      'plantar tu semilla',
      'que brote',
      'sus primeras hojas',
      'que le salgan más hojas',
      'su primera flor',
      'que florezca por completo',
      'otra flor',
    ],
    neverWilts:
      '¿Te saltaste un día? Aquí tu planta nunca se marchita. Cada día que vuelves cuenta.',
    verseNew: 'Un versículo para ti',
    versesTitle: (n: number) => `Tus versículos (${n})`,
    recentTitle: 'Tus últimos chequeos',
    change: 'Cambiar mi respuesta de hoy',
    clear: 'Borrar mis chequeos de este celular',
    clearConfirm: '¿Borrar todos tus chequeos y tu planta de este celular?',
    suggestTitle: 'Algo para hoy',
    suggest: {
      1: 'Los días de tormenta pesan. Empieza por tu respiración y cuéntale a alguien cómo estás hoy.',
      2: 'Elige uno de estos por unos minutos. Los pasos pequeños ayudan en los días de lluvia.',
      3: 'Unos minutos con uno de estos pueden despejar un poco el cielo.',
      4: 'Que siga lo bueno.',
      5: 'Que siga lo bueno.',
    },
    tools: {
      breathe: 'Respiración lenta, 2 min',
      'thought-check': 'Revisar un pensamiento, 3 min',
      'one-thing': 'Una cosa pequeña, 10 min',
      'worry-note': 'Nota de preocupaciones, 2 min',
      message: 'Escribirle a alguien, 1 min',
      kite: 'La cometa, un juego de 1 minuto',
    },
    story: 'Leer una historia de esperanza',
    ecoach: 'Hablar con alguien',
    heavyRun:
      'Tus últimos chequeos han sido pesados. Por favor, habla con alguien esta semana. Una línea de ayuda gratuita puede escucharte.',
  },
  ko: {
    weatherTitle: '오늘 기분이 어때요?',
    weatherHint: '지금 마음과 가장 가까운 날씨를 골라 보세요.',
    weather: {
      1: '폭풍우',
      2: '비',
      3: '흐림',
      4: '햇살 조금',
      5: '맑음',
    },
    areasTitle: '마음에 걸리는 게 있나요? 해당하는 걸 모두 눌러 보세요',
    areas: {
      work: '일이나 공부',
      family: '가족',
      money: '돈',
      love: '연애',
      friends: '친구',
      health: '건강',
      sleep: '잠',
      faith: '신앙',
      lonely: '외로움',
    },
    save: '체크인하기',
    back: '뒤로',
    privacy: '체크인 기록은 이 휴대폰에만 저장돼요.',
    firstTitle: '씨앗을 심었어요',
    backTitle: '다시 만나서 반가워요',
    grewTitle: '재스민이 자랐어요',
    doneTitle: '오늘 체크인 완료',
    againTitle: '오늘은 이미 체크인했어요',
    days: (n: number) => `${n}일`,
    daysLabel: '체크인한 날',
    weekLabel: '이번 주',
    weekCount: (n: number) => `이번 주 ${n}일`,
    stageNames: [
      '빈 화분',
      '씨앗',
      '새싹',
      '첫 잎',
      '자라는 중',
      '첫 꽃',
      '활짝 핀 꽃',
    ],
    toNext: (n: number, what: string) => `${what}까지 ${n}일 남았어요.`,
    nextWhat: [
      '씨앗을 심기',
      '싹이 트기',
      '첫 잎이 나기',
      '잎이 더 나기',
      '첫 꽃이 피기',
      '꽃이 활짝 피기',
      '다음 꽃이 피기',
    ],
    neverWilts:
      '하루 놓쳤나요? 여기서는 식물이 절대 시들지 않아요. 다시 오는 하루하루가 모두 소중해요.',
    verseNew: '당신을 위한 말씀',
    versesTitle: (n: number) => `모은 말씀 (${n})`,
    recentTitle: '최근 체크인',
    change: '오늘 답 바꾸기',
    clear: '이 휴대폰에서 내 체크인 삭제하기',
    clearConfirm: '이 휴대폰에서 모든 체크인과 식물을 삭제할까요?',
    suggestTitle: '오늘 해 볼 만한 것',
    suggest: {
      1: '폭풍우 치는 날은 마음이 무거워요. 숨부터 천천히 쉬어 보고, 오늘 어떤지 누군가에게 말해 보세요.',
      2: '이 중 하나를 골라 몇 분만 해 보세요. 비 오는 날엔 작은 걸음이 도움이 돼요.',
      3: '이 중 하나로 몇 분을 보내면 하늘이 조금 갤 수 있어요.',
      4: '지금의 좋은 기분을 이어 가요.',
      5: '지금의 좋은 기분을 이어 가요.',
    },
    tools: {
      breathe: '천천히 숨쉬기, 2분',
      'thought-check': '생각 점검, 3분',
      'one-thing': '작은 일 하나, 10분',
      'worry-note': '걱정 메모, 2분',
      message: '누군가에게 메시지 보내기, 1분',
      kite: '연날리기, 1분 게임',
    },
    story: '희망 이야기 읽기',
    ecoach: '누군가와 이야기하기',
    heavyRun:
      '최근 체크인이 계속 무거웠어요. 이번 주에는 꼭 누군가와 이야기해 보세요. 무료 상담 전화에서 이야기를 들어 줄 거예요.',
  },
};

/** One or two tools that fit how today feels and what is on their mind. */
function toolsFor(weather: Weather, areas: Area[]): ToolKind[] {
  if (weather === 1) return ['breathe'];
  if (weather >= 4) return ['kite'];
  if (areas.includes('sleep')) return ['worry-note', 'thought-check'];
  if (areas.includes('lonely')) return ['message', 'thought-check'];
  return ['thought-check', 'one-thing'];
}

type Outcome = 'first' | 'back' | 'grew' | 'done' | 'again';

function CrisisLine({ lang }: { lang: FeelingLang }) {
  return (
    <p className="text-sm leading-relaxed">
      <CrisisSentence lang={lang} lead />
    </p>
  );
}

function WeatherIcon({
  weather,
  className,
}: {
  weather: Weather;
  className?: string;
}) {
  const Icon = WEATHER[weather - 1].icon;
  return <Icon aria-hidden className={className} />;
}

export function DailyCheckIn({ lang }: { lang: FeelingLang }) {
  const t = copy[lang];
  const checkIns = useCheckIns();
  const today = localDay();
  const todays = checkIns.find((entry) => entry.day === today);
  const [isAnswering, setIsAnswering] = useState(false);
  const [step, setStep] = useState<'weather' | 'areas'>('weather');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [openTool, setOpenTool] = useState<ToolKind | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Each new step or result is announced by moving focus to its heading.
  useEffect(() => {
    if (isAnswering || outcome)
      headingRef.current?.focus({ preventScroll: true });
  }, [step, outcome, isAnswering]);

  const showQuestions = isAnswering || (!todays && !outcome);

  const save = () => {
    if (!weather) return;
    const away = daysAway(checkIns);
    const isNewDay = saveCheckIn(weather, areas);
    const total = checkIns.filter((entry) => entry.day !== today).length + 1;
    analyticsService.recordClick('checkin_done');
    if (isNewDay && away !== null)
      analyticsService.recordClick('checkin_return');
    const grew = isNewDay && isMilestone(total);
    if (grew) analyticsService.recordClick(`checkin_milestone_${total}`);
    setOutcome(
      !isNewDay
        ? 'done'
        : total === 1
          ? 'first'
          : grew
            ? 'grew'
            : away !== null && away > 1
              ? 'back'
              : 'done'
    );
    setIsAnswering(false);
    setOpenTool(null);
    window.scrollTo({ top: 0 });
  };

  if (showQuestions) {
    return (
      <div className="hb-step-in" key={step}>
        {step === 'weather' ? (
          <fieldset>
            <legend className="contents">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-balance font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none md:text-4xl"
              >
                {t.weatherTitle}
              </h2>
            </legend>
            <p className="mt-3 text-[#6E5F47]">{t.weatherHint}</p>
            <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
              {WEATHER.map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={weather === value}
                  onClick={() => {
                    setWeather(value);
                    setStep('areas');
                  }}
                  className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-[#DFE7CF] bg-white px-1 py-3 text-center font-poppins text-xs font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] hover:bg-[#F6F8F1] aria-pressed:border-[#6E5F47] aria-pressed:bg-[#F6F8F1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 sm:text-sm"
                >
                  <Icon
                    aria-hidden
                    strokeWidth={1.6}
                    className="h-8 w-8 text-[#91AFAA]"
                  />
                  {t.weather[value]}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#6E5F47]">{t.privacy}</p>
          </fieldset>
        ) : (
          <fieldset>
            <legend className="contents">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-balance font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none md:text-4xl"
              >
                {t.areasTitle}
              </h2>
            </legend>
            {weather && (
              <p className="mt-3 inline-flex items-center gap-2 text-[#6E5F47]">
                <WeatherIcon
                  weather={weather}
                  className="h-5 w-5 text-[#91AFAA]"
                />
                {t.weather[weather]}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {AREAS.map((area) => {
                const isPicked = areas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    aria-pressed={isPicked}
                    onClick={() =>
                      setAreas((list) =>
                        isPicked
                          ? list.filter((item) => item !== area)
                          : [...list, area]
                      )
                    }
                    className={chipClass}
                  >
                    {t.areas[area]}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <button type="button" onClick={save} className={primaryClass}>
                {t.save}
              </button>
              <button
                type="button"
                onClick={() => setStep('weather')}
                className={`${quietClass} -ml-1 gap-2`}
              >
                <ArrowLeft aria-hidden className="h-4 w-4" />
                {t.back}
              </button>
            </div>
          </fieldset>
        )}
      </div>
    );
  }

  const entry: CheckIn | undefined = todays;
  const total = checkIns.length;
  const { stage, extraBlooms, next, previous } = growth(total);
  const verses = versesUnlocked(stage, extraBlooms);
  const week = thisWeek(checkIns);
  const weekDone = week.filter((day) => day.done).length;
  const recent = checkIns.slice(-7);
  const isHeavyRun =
    recent.length >= 3 && recent.slice(-3).every((item) => item.weather <= 2);
  const shown = outcome ?? 'again';
  const title = {
    first: t.firstTitle,
    back: t.backTitle,
    grew: t.grewTitle,
    done: t.doneTitle,
    again: t.againTitle,
  }[shown];
  // Counts today, so the bar is never empty on the day a step is reached.
  const progress = Math.round(
    ((total - previous + 1) / (next - previous + 1)) * 100
  );
  const suggested = entry ? toolsFor(entry.weather, entry.areas) : [];

  return (
    <div className="hb-step-in">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-balance font-playfair text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none md:text-5xl"
      >
        {title}
      </h2>

      <section
        aria-label={t.stageNames[stage]}
        className="mt-8 grid grid-cols-[112px_1fr] items-end gap-5 sm:grid-cols-[180px_1fr] sm:gap-8"
      >
        <div>
          <Sampaguita
            stage={stage}
            extraBlooms={extraBlooms}
            className={`h-auto w-full ${outcome === 'grew' || outcome === 'first' ? 'hb-panel-in' : ''}`}
          />
        </div>
        <div className="text-[#6E5F47]">
          <p className="font-poppins text-4xl font-bold tabular-nums tracking-[-0.03em] sm:text-5xl">
            {t.days(total)}
          </p>
          <p className="mt-1">{t.daysLabel}</p>
          <p className="mt-4 font-poppins font-semibold">
            {t.stageNames[stage]}
          </p>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-[#DFE7CF]"
            role="progressbar"
            aria-valuemin={previous}
            aria-valuemax={next}
            aria-valuenow={total}
            aria-label={t.toNext(next - total, t.nextWhat[stage])}
          >
            <div
              className="h-full rounded-full bg-[#AEC488] transition-[width] duration-[var(--hb-slow)] ease-[var(--hb-ease-out)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm">
            {t.toNext(next - total, t.nextWhat[stage])}
          </p>
        </div>
      </section>

      <section aria-labelledby="week-title" className="mt-8">
        <div className="flex items-baseline justify-between gap-4 text-[#6E5F47]">
          <h3 id="week-title" className="font-poppins font-semibold">
            {t.weekLabel}
          </h3>
          <p className="text-sm tabular-nums">{t.weekCount(weekDone)}</p>
        </div>
        <ol className="mt-3 grid grid-cols-7 gap-1.5">
          {week.map((day) => {
            const item = checkIns.find((check) => check.day === day.day);
            const label = day.date.toLocaleDateString(LANG_INFO[lang].locale, {
              weekday: 'short',
            });
            return (
              <li
                key={day.day}
                className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl text-xs text-[#6E5F47] ${
                  day.done
                    ? 'bg-[#EFF3E7]'
                    : day.isToday
                      ? 'border-2 border-[#6E5F47]'
                      : 'border border-[#E2DFDA]'
                }`}
              >
                <span>{label}</span>
                {item ? (
                  <>
                    <WeatherIcon
                      weather={item.weather}
                      className="h-5 w-5 text-[#91AFAA]"
                    />
                    <span className="sr-only">{t.weather[item.weather]}</span>
                  </>
                ) : (
                  <span aria-hidden className="h-5" />
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm text-[#6E5F47]">{t.neverWilts}</p>
      </section>

      {outcome === 'grew' || outcome === 'first' ? (
        <figure className="mt-8 border-l-4 border-[#AEC488] pl-5 text-[#6E5F47]">
          <figcaption className="text-sm">{t.verseNew}</figcaption>
          <blockquote
            lang={lang}
            className="mt-2 font-playfair text-xl leading-snug"
          >
            {VERSES[verses[verses.length - 1]][lang].text}
          </blockquote>
          <p className="mt-2 font-poppins text-sm font-semibold">
            {VERSES[verses[verses.length - 1]][lang].reference}
          </p>
        </figure>
      ) : null}

      {entry && (
        <section
          aria-labelledby="suggest-title"
          className="mt-10 border-t border-[#E2DFDA] pt-8"
        >
          <h3
            id="suggest-title"
            className="font-playfair text-2xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
          >
            {t.suggestTitle}
          </h3>
          <p className="mt-3 text-[#6E5F47]">{t.suggest[entry.weather]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggested.map((kind) => (
              <button
                key={kind}
                type="button"
                aria-pressed={openTool === kind}
                onClick={() => setOpenTool(openTool === kind ? null : kind)}
                className={secondaryClass}
              >
                {t.tools[kind]}
              </button>
            ))}
            {entry.weather >= 4 && (
              <Link href={pathIn('/blog', lang)} className={secondaryClass}>
                {t.story}
              </Link>
            )}
            {(entry.weather <= 2 || isHeavyRun) && (
              <EcoachLink linkName="ecoach_checkin" className={secondaryClass}>
                <MessageCircle aria-hidden className="h-4 w-4" />
                {t.ecoach}
              </EcoachLink>
            )}
          </div>
          {openTool && (
            <ToolExercise
              key={openTool}
              kind={openTool}
              lang={lang}
              source="checkin"
              onClose={() => setOpenTool(null)}
            />
          )}
          {isHeavyRun && entry.weather > 1 && (
            <p className="mt-5 text-[#6E5F47]">{t.heavyRun}</p>
          )}
          {entry.weather === 1 && (
            <div className="mt-5 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <CrisisLine lang={lang} />
            </div>
          )}
        </section>
      )}

      {recent.length > 1 && (
        <section aria-labelledby="recent-title" className="mt-10">
          <h3
            id="recent-title"
            className="font-poppins font-semibold text-[#6E5F47]"
          >
            {t.recentTitle}
          </h3>
          <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#6E5F47]">
            {recent.map((item) => (
              <li key={item.day} className="inline-flex items-center gap-1.5">
                <WeatherIcon
                  weather={item.weather}
                  className="h-4 w-4 text-[#91AFAA]"
                />
                <span>
                  {new Date(`${item.day}T00:00:00`).toLocaleDateString(
                    LANG_INFO[lang].locale,
                    { month: 'short', day: 'numeric' }
                  )}
                  <span className="sr-only">: {t.weather[item.weather]}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {verses.length > 0 && (
        <details className="group mt-8 border-t border-[#E2DFDA] pt-6 text-[#6E5F47]">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-poppins font-semibold underline-offset-4 hover:underline">
            {t.versesTitle(verses.length)}
          </summary>
          <ul className="mt-3 space-y-4">
            {verses.map((key, i) => (
              <li key={`${key}-${i}`} lang={lang}>
                <p className="leading-relaxed">{VERSES[key][lang].text}</p>
                <p className="mt-1 text-sm font-semibold">
                  {VERSES[key][lang].reference}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs">{VERSE_ATTRIBUTION[lang]}</p>
        </details>
      )}

      <button
        type="button"
        onClick={() => {
          setWeather(entry?.weather ?? null);
          setAreas(entry?.areas ?? []);
          setStep('weather');
          setIsAnswering(true);
          setOutcome(null);
        }}
        className={`mt-8 -ml-3 ${quietClass}`}
      >
        {t.change}
      </button>
      <button
        type="button"
        onClick={() => {
          if (!window.confirm(t.clearConfirm)) return;
          clearCheckIns();
          setOutcome(null);
          setWeather(null);
          setAreas([]);
          setStep('weather');
        }}
        className="mt-2 block text-sm text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
      >
        {t.clear}
      </button>
    </div>
  );
}
