/**
 * Real photos of everyday life, Filipino and Asian, two or three per theme,
 * so a section shows a different one from time to time. Calm and in
 * daylight where we can: no storms, no night streets, nothing grey. Free
 * under the Pexels licence (no credit needed). Most sit beside a label that says what they mean, so they are
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
      alt: 'A bangka on calm water at sunrise',
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
      alt: 'Coffee being poured beside pandesal',
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
