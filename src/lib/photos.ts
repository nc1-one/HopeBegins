/**
 * Real photos of everyday life in the Philippines, two or three per theme,
 * so a section shows a different one from time to time. Free under the
 * Pexels licence (no credit needed); the dawn photo is a still from the home
 * page clip. Most sit beside a label that says what they mean, so they are
 * decoration to screen readers (empty alt); `alt` is there for the few that
 * stand alone.
 */

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
    {
      src: `${dir}/anxious-rain.jpg`,
      alt: 'Rain on a jeepney window at night',
    },
    // Pexels 37475050
    {
      src: `${dir}/anxious-jeepney-rain.jpg`,
      alt: 'A jeepney with its lights on in heavy rain',
    },
    // Pexels 36969374
    {
      src: `${dir}/anxious-umbrellas.jpg`,
      alt: 'People walking under umbrellas in the rain',
    },
  ],
  tired: [
    // Pexels 33701852, Manila
    {
      src: `${dir}/tired-jeepney.jpg`,
      alt: 'A jeepney driver resting at the wheel',
    },
    // Pexels 4591396, Dumaguete
    {
      src: `${dir}/tired-tricycle.jpg`,
      alt: 'A tricycle driver asleep in his tricycle',
    },
  ],
  alone: [
    // Pexels 15577326, Iloilo
    {
      src: `${dir}/alone-balcony.jpg`,
      alt: 'A woman alone on a balcony over the street',
    },
    // Pexels 3226378, Manila Bay
    {
      src: `${dir}/alone-bay.jpg`,
      alt: 'A woman reading alone on the rocks by Manila Bay',
    },
    // Pexels 842536, Pasay
    {
      src: `${dir}/alone-train.jpg`,
      alt: 'One passenger in an empty train carriage',
    },
  ],
  sleep: [
    { src: `${dir}/sleep-night.jpg`, alt: 'A student still awake at night' },
    // Pexels 8070508
    {
      src: `${dir}/sleep-phone.jpg`,
      alt: 'A woman in bed on her phone by lamplight',
    },
    // Pexels 6940878
    {
      src: `${dir}/sleep-dim.jpg`,
      alt: 'A woman on her bed with her phone in a dim room',
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
      alt: 'A bangka on calm water at sunrise',
    },
  ],
  unsure: [
    // Pexels 33964966, Baguio
    {
      src: `${dir}/unsure-fog.jpg`,
      alt: 'A cyclist on a foggy mountain road',
    },
    // Pexels 39721905, Baguio
    {
      src: `${dir}/unsure-pines.jpg`,
      alt: 'A path through misty pine trees',
    },
    // Pexels 12225167
    { src: `${dir}/unsure-road.jpg`, alt: 'A road disappearing into fog' },
  ],
  talk: [
    // Pexels 3367850
    { src: `${dir}/talk-phone.jpg`, alt: 'A woman on her phone at night' },
    // Pexels 37374770
    {
      src: `${dir}/talk-jeepney.jpg`,
      alt: 'A man on his phone inside a jeepney',
    },
    // Pexels 37441563, Manila
    {
      src: `${dir}/talk-street.jpg`,
      alt: 'Two men talking on a city street',
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
      alt: 'Coffee being poured beside pandesal',
    },
    // Pexels 36903832, Baguio
    {
      src: `${dir}/morning-baguio.jpg`,
      alt: 'A cup of coffee held up over the mountains',
    },
  ],
  dawn: [{ src: '/assets/images/hero/manila-dawn.jpg', alt: 'Manila at dawn' }],
  care: [
    // Pexels 19524029, Manila
    {
      src: `${dir}/care-embrace.jpg`,
      alt: 'Three women holding each other close and smiling',
    },
    // Pexels 13067145
    {
      src: `${dir}/care-lola.jpg`,
      alt: 'A lola laughing with the baby in her arms',
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
 * The photo for a theme on this turn. Give a second spot on the same page a
 * different `offset` so the two never show the same picture.
 */
export function photo(theme: PhotoId, turn: number, offset = 0): Photo {
  const set = SETS[theme];
  return set[(turn + offset) % set.length];
}

/** Every photo in a theme, for places that show them all at once. */
export const photoSet = (theme: PhotoId) => SETS[theme];
