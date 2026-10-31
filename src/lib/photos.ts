/**
 * Real photos of everyday life, Filipino and Asian, two or three per theme,
 * so a section shows a different one from time to time. Calm and in
 * daylight where we can: no storms, no night streets, nothing grey. Free
 * under the Pexels licence (no credit needed). Most sit beside a label that says what they mean, so they are
 * decoration to screen readers (empty alt); `alt` is there for the few that
 * stand alone.
 */

import type { Lang } from './i18n';

export type PhotoId =
  | 'anxious'
  | 'tired'
  | 'alone'
  | 'sleep'
  | 'hope'
  | 'unsure'
  | 'talk'
  | 'morning'
  | 'dawn'
  | 'care';

export interface Photo {
  src: string;
  alt: string;
}

const dir = '/assets/images/photos';

const SETS: Record<PhotoId, Photo[]> = {
  anxious: [
    // Pexels 7592291
    {
      src: `${dir}/anxious-morning-tea.jpg`,
      alt: 'A woman smiling over a warm drink by a bright window',
    },
    // Pexels 7507679
    {
      src: `${dir}/anxious-porch-tea.jpg`,
      alt: 'A woman wrapped in a blanket with tea on a quiet porch',
    },
    // Pexels 6798808
    {
      src: `${dir}/anxious-garden-breath.jpg`,
      alt: 'A woman resting with her eyes closed among plants',
    },
  ],
  tired: [
    // Pexels 7431009, Davao
    {
      src: `${dir}/tired-hammock-beach.jpg`,
      alt: 'A woman resting in a hammock by the sea',
    },
    // Pexels 7350909
    {
      src: `${dir}/tired-couch-rest.jpg`,
      alt: 'A woman lying on a sofa in a bright living room',
    },
  ],
  alone: [
    // Pexels 3226378, Manila Bay
    {
      src: `${dir}/alone-bay.jpg`,
      alt: 'A woman reading alone on the rocks by Manila Bay',
    },
    // Pexels 7262900
    {
      src: `${dir}/alone-garden-bench.jpg`,
      alt: 'A woman reading on a garden bench',
    },
    // Pexels 5530675
    {
      src: `${dir}/alone-reading-outdoors.jpg`,
      alt: 'A woman reading at an outdoor table',
    },
  ],
  sleep: [
    // Pexels 9641783
    {
      src: `${dir}/sleep-morning-rest.jpg`,
      alt: 'A woman asleep in a sunlit bedroom',
    },
    // Pexels 8070508
    {
      src: `${dir}/sleep-phone.jpg`,
      alt: 'A woman in bed on her phone by lamplight',
    },
  ],
  hope: [
    // Pexels 35771640, Malolos
    {
      src: `${dir}/hope-sunrise.jpg`,
      alt: 'A fisherman poling his boat across the water at sunrise',
    },
    // Pexels 37441569
    {
      src: `${dir}/hope-jeepney-window.jpg`,
      alt: 'A child looking out of a jeepney window',
    },
    // Pexels 38354745
    {
      src: `${dir}/hope-bangka.jpg`,
      alt: 'A small outrigger boat on calm water at sunrise',
    },
  ],
  unsure: [
    // Pexels 32958033, Sariaya, Quezon
    {
      src: `${dir}/unsure-rice-field.jpg`,
      alt: 'Green rice fields below a mountain',
    },
    // Pexels 31451558, Davao
    {
      src: `${dir}/unsure-misty-hills.jpg`,
      alt: 'Morning mist over green hills',
    },
  ],
  talk: [
    // Pexels 36578169
    {
      src: `${dir}/talk-mother-daughter.jpg`,
      alt: 'A daughter holding her mother’s hands as they talk',
    },
    // Pexels 8518887
    {
      src: `${dir}/talk-friends-coffee.jpg`,
      alt: 'Two friends talking over coffee',
    },
    // Pexels 37374770
    {
      src: `${dir}/talk-jeepney.jpg`,
      alt: 'A man on his phone inside a jeepney',
    },
  ],
  morning: [
    // Pexels 5049265, Valencia
    {
      src: `${dir}/plan-morning.jpg`,
      alt: 'A man with a hot drink looking over green hills',
    },
    // Pexels 34276362
    {
      src: `${dir}/morning-pandesal.jpg`,
      alt: 'Coffee being poured beside pandesal, Filipino bread rolls',
    },
    // Pexels 36903832, Baguio
    {
      src: `${dir}/morning-baguio.jpg`,
      alt: 'A cup of coffee held up over the mountains',
    },
  ],
  // Pexels 2407608, also the home page background
  dawn: [
    {
      src: '/assets/images/hero/rice-field-golden.jpg',
      alt: 'Rice fields in golden light',
    },
  ],
  care: [
    // Pexels 19524029, Manila
    {
      src: `${dir}/care-embrace.jpg`,
      alt: 'Three women holding each other close and smiling',
    },
    // Pexels 13067145
    {
      src: `${dir}/care-lola.jpg`,
      alt: 'A grandmother laughing with the baby in her arms',
    },
  ],
};

/** The photos change every six hours; pages are rebuilt on the same beat. */
export const PHOTO_TURN_SECONDS = 6 * 60 * 60;

/** Which turn of the rotation it is right now. */
export function photoTurn(): number {
  return Math.floor(Date.now() / (PHOTO_TURN_SECONDS * 1000));
}

/**
 * Photos for the French, German, Spanish and Korean pages, so the people in
 * them look like the people reading: calm, in daylight, from Pexels (free
 * licence). A theme without its own photos here uses the ones above.
 */
const LOCAL_SETS: Partial<Record<Lang, Partial<Record<PhotoId, Photo[]>>>> = {
  // Korea, from Pexels by id: 2467464, 3701227, 19474884 (Gyeongbokgung,
  // Seoul), 6941123, 7437166, 31955787 (Seoul), 33125408 (Gapyeong), 26633730,
  // 5990491, 17113716 (Seoul), 5693383.
  ko: {
    anxious: [
      {
        src: `${dir}/ko/anxious-window-coffee.jpg`,
        alt: '햇살이 드는 창가에서 커피를 마시는 여성',
      },
    ],
    tired: [
      {
        src: `${dir}/ko/tired-eyes-closed.jpg`,
        alt: '눈을 감고 벽에 기대어 쉬는 여성',
      },
    ],
    alone: [
      {
        src: `${dir}/ko/alone-palace-bench.jpg`,
        alt: '고궁 연못가 벤치에 혼자 앉아 있는 사람',
      },
    ],
    sleep: [
      {
        src: `${dir}/ko/sleep-awake-in-bed.jpg`,
        alt: '침대에 누워 생각에 잠긴 여성',
      },
      {
        src: `${dir}/ko/sleep-resting.jpg`,
        alt: '하얀 이불을 덮고 편히 잠든 남성',
      },
    ],
    hope: [
      {
        src: `${dir}/ko/hope-spring-park.jpg`,
        alt: '봄꽃이 핀 공원에서 웃고 있는 여성',
      },
    ],
    unsure: [
      {
        src: `${dir}/ko/unsure-misty-lake.jpg`,
        alt: '안개 낀 가평의 잔잔한 호수',
      },
    ],
    talk: [
      {
        src: `${dir}/ko/talk-friends-park.jpg`,
        alt: '공원에서 함께 웃으며 이야기하는 친구들',
      },
    ],
    morning: [
      {
        src: `${dir}/ko/morning-family-breakfast.jpg`,
        alt: '식탁에 둘러앉아 아침을 먹는 가족',
      },
    ],
    dawn: [
      { src: `${dir}/ko/dawn-han-river.jpg`, alt: '해 뜰 무렵의 한강과 서울' },
    ],
    care: [
      {
        src: `${dir}/ko/care-grandmother.jpg`,
        alt: '손녀에게 뜨개질을 가르쳐 주는 할머니',
      },
    ],
  },
  // France, from Pexels by id: 4769490, 6206145, 36669834 (the Seine, Paris),
  // 7556602, 7504709, 8393494, 35395123, 5176889 (Paris), 2930966, 30037076
  // (Gordes, Provence), 7086010.
  fr: {
    anxious: [
      {
        src: `${dir}/fr/anxious-tea-window.jpg`,
        alt: 'Une femme boit une tasse de thé près d’une fenêtre, un livre à la main',
      },
    ],
    tired: [
      {
        src: `${dir}/fr/tired-headphones-rest.jpg`,
        alt: 'Une femme se repose les yeux fermés, un casque sur les oreilles',
      },
    ],
    alone: [
      {
        src: `${dir}/fr/alone-seine-bench.jpg`,
        alt: 'Une femme assise seule sur un banc au bord de la Seine',
      },
    ],
    sleep: [
      {
        src: `${dir}/fr/sleep-awake-in-bed.jpg`,
        alt: 'Une femme éveillée dans son lit, pensive',
      },
      {
        src: `${dir}/fr/sleep-morning-rest.jpg`,
        alt: 'Une femme se repose dans un lit, dans la lumière du matin',
      },
    ],
    hope: [
      {
        src: `${dir}/fr/hope-lavender.jpg`,
        alt: 'Une femme assise au soleil dans un champ de lavande',
      },
    ],
    unsure: [
      {
        src: `${dir}/fr/unsure-misty-fields.jpg`,
        alt: 'Des champs verts dans la brume du matin',
      },
    ],
    talk: [
      {
        src: `${dir}/fr/talk-cafe-terrace.jpg`,
        alt: 'Deux amis discutent en riant à une terrasse de café',
      },
    ],
    morning: [
      {
        src: `${dir}/fr/morning-croissant.jpg`,
        alt: 'Un café et un croissant sur une table au soleil',
      },
    ],
    dawn: [
      {
        src: `${dir}/fr/dawn-gordes.jpg`,
        alt: 'Les maisons en pierre de Gordes, en Provence',
      },
    ],
    care: [
      {
        src: `${dir}/fr/care-grandmother.jpg`,
        alt: 'Une grand-mère serre sa petite-fille dans ses bras',
      },
    ],
  },
  // Germany, from Pexels by id: 6633308, 3786636, 37663164 (Berlin), 20577603
  // (Berlin), 5990944, 13875643 (Bayreuth), 29451794, 7505203 (Berlin),
  // 30887276, 4275885 (Krün, Bavaria), 10451989.
  de: {
    anxious: [
      {
        src: `${dir}/de/anxious-blanket-tea.jpg`,
        alt: 'Eine Frau trinkt am Fenster Tee, in eine Decke gehüllt',
      },
    ],
    tired: [
      {
        src: `${dir}/de/tired-sofa-rest.jpg`,
        alt: 'Eine Frau ruht mit geschlossenen Augen auf dem Sofa',
      },
    ],
    alone: [
      {
        src: `${dir}/de/alone-berlin-bench.jpg`,
        alt: 'Ein junger Mann sitzt allein auf einer Parkbank in der Morgensonne',
      },
      {
        src: `${dir}/de/alone-park-autumn.jpg`,
        alt: 'Eine ältere Frau sitzt im Herbst auf einer Bank in einem Berliner Park',
      },
    ],
    sleep: [
      {
        src: `${dir}/de/sleep-awake.jpg`,
        alt: 'Ein Mann liegt wach im Bett und denkt nach',
      },
    ],
    hope: [
      {
        src: `${dir}/de/hope-field.jpg`,
        alt: 'Eine Frau steht mit geschlossenen Augen in einem sonnigen Feld',
      },
    ],
    unsure: [
      {
        src: `${dir}/de/unsure-forest-mist.jpg`,
        alt: 'Ein Waldweg im Morgennebel',
      },
    ],
    talk: [
      {
        src: `${dir}/de/talk-friends-cafe.jpg`,
        alt: 'Freunde lachen und reden zusammen vor einem Café',
      },
    ],
    morning: [
      {
        src: `${dir}/de/morning-bread.jpg`,
        alt: 'Frische Brötchen, Brezeln und Croissants zum Frühstück',
      },
    ],
    dawn: [
      {
        src: `${dir}/de/dawn-bavaria.jpg`,
        alt: 'Eine Wiese mit Hütte vor den bayerischen Alpen',
      },
    ],
    care: [
      {
        src: `${dir}/de/care-grandfather.jpg`,
        alt: 'Ein Großvater liegt lachend mit seinem Enkel im Gras',
      },
    ],
  },
  // Latin America, from Pexels by id: 6347886, 13199131 (Aguascalientes,
  // Mexico), 6633131, 12324870 (Comitán, Mexico), 3807985, 32437353, 12731534
  // (Ecuador), 36765285, 18257257 (Mexico), 15699965 (Cocora Valley, Colombia;
  // also the home screen), 36883134.
  es: {
    anxious: [
      {
        src: `${dir}/es/anxious-coffee-kitchen.jpg`,
        alt: 'Una mujer toma una taza de café en su cocina, pensativa',
      },
    ],
    tired: [
      {
        src: `${dir}/es/tired-sofa-window.jpg`,
        alt: 'Una mujer descansa en el sofá junto a una ventana',
      },
      {
        src: `${dir}/es/tired-sofa-rest.jpg`,
        alt: 'Una mujer descansa en el sofá con los ojos cerrados',
      },
    ],
    alone: [
      {
        src: `${dir}/es/alone-plaza-bench.jpg`,
        alt: 'Una mujer sentada sola en una plaza, pensativa',
      },
    ],
    sleep: [
      {
        src: `${dir}/es/sleep-in-bed.jpg`,
        alt: 'Una mujer recostada en su cama por la mañana',
      },
    ],
    hope: [
      {
        src: `${dir}/es/hope-field.jpg`,
        alt: 'Una mujer sonríe en un campo verde bajo el sol',
      },
    ],
    unsure: [
      {
        src: `${dir}/es/unsure-andes-mist.jpg`,
        alt: 'Montañas verdes de los Andes entre la neblina',
      },
    ],
    talk: [
      {
        src: `${dir}/es/talk-cafe-friends.jpg`,
        alt: 'Dos amigas conversan con un café en una terraza',
      },
    ],
    morning: [
      {
        src: `${dir}/es/morning-breakfast.jpg`,
        alt: 'Un desayuno con huevos, fruta y café sobre un mantel de colores',
      },
    ],
    dawn: [
      {
        src: '/assets/images/hero/es-cocora-valley.jpg',
        alt: 'El valle de Cocora, en Colombia, con sus palmas de cera',
      },
    ],
    care: [
      {
        src: `${dir}/es/care-grandmother.jpg`,
        alt: 'Una abuela y su nieta, mejilla con mejilla',
      },
    ],
  },
};

const setFor = (theme: PhotoId, lang: Lang = 'en') =>
  LOCAL_SETS[lang]?.[theme] ?? SETS[theme];

/**
 * The photo for a theme on this turn, in the page's language. Give a second
 * spot on the same page a different `offset` so the two never show the same
 * picture.
 */
export function photo(
  theme: PhotoId,
  turn: number,
  offset = 0,
  lang?: Lang
): Photo {
  const set = setFor(theme, lang);
  return set[(turn + offset) % set.length];
}

/** Every photo in a theme, for places that show them all at once. */
export const photoSet = (theme: PhotoId, lang?: Lang) => setFor(theme, lang);

/**
 * A story's photo in its language: the first photo of a theme, for the
 * French, German, Spanish and Korean stories (see LOCAL_SETS).
 */
export const storyPhoto = (lang: Lang, theme: PhotoId): Photo =>
  setFor(theme, lang)[0];
