/**
 * Real photos of everyday life in the Philippines, one per feeling. Free
 * under the Pexels licence (no credit needed); the first two are stills
 * from the home page clips. They sit beside a label that says what they
 * mean, so they are decoration to screen readers (empty alt).
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
  | 'dawn';

export const PHOTOS: Record<PhotoId, string> = {
  // Rain on a jeepney window at night.
  anxious: '/assets/images/photos/anxious-rain.jpg',
  // A jeepney driver resting at the wheel, Manila (Pexels 33701852).
  tired: '/assets/images/photos/tired-jeepney.jpg',
  // A woman alone on a balcony over the street, Iloilo (Pexels 15577326).
  alone: '/assets/images/photos/alone-balcony.jpg',
  // A student still awake at night.
  sleep: '/assets/images/photos/sleep-night.jpg',
  // A fisherman poling his boat at sunrise, Malolos (Pexels 35771640).
  hope: '/assets/images/photos/hope-sunrise.jpg',
  // A cyclist on a foggy road, Baguio (Pexels 33964966).
  unsure: '/assets/images/photos/unsure-fog.jpg',
  // A woman on her phone at night (Pexels 3367850).
  talk: '/assets/images/photos/talk-phone.jpg',
  // A man with a hot drink over green hills, Valencia (Pexels 5049265).
  morning: '/assets/images/photos/plan-morning.jpg',
  // Manila at dawn: a still from the home page clip.
  dawn: '/assets/images/hero/manila-dawn.jpg',
};
