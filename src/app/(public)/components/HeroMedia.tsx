'use client';

import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

/**
 * The "Not okay today?" background: a calm landscape in daylight from the
 * reader's part of the world. Philippine rice fields in golden light for
 * English and Taglish (Pexels 2407608); the Boseong tea fields in Korea
 * (31860105); lavender in Provence (29837799); the Tegernsee in Bavaria
 * (1093046); the Cocora Valley in Colombia (15699965). A still photo, so
 * the first screen is calm and paints at once on any phone. The shade
 * keeps the white text readable.
 */
const HEROES: Record<Lang, { src: string; position: string }> = {
  en: {
    src: '/assets/images/hero/rice-field-golden.jpg',
    position: 'object-[40%_50%]',
  },
  tl: {
    src: '/assets/images/hero/rice-field-golden.jpg',
    position: 'object-[40%_50%]',
  },
  ko: {
    src: '/assets/images/hero/ko-boseong-tea-fields.jpg',
    position: 'object-[50%_50%]',
  },
  fr: {
    src: '/assets/images/hero/fr-lavender-provence.jpg',
    position: 'object-[50%_45%]',
  },
  de: {
    src: '/assets/images/hero/de-tegernsee.jpg',
    position: 'object-[50%_50%]',
  },
  es: {
    src: '/assets/images/hero/es-cocora-valley.jpg',
    position: 'object-[50%_50%]',
  },
};

export function HeroMedia() {
  const hero = HEROES[usePageLanguage()];
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Image
        src={hero.src}
        alt=""
        fill
        // The first screen's picture: fetched first and never lazy.
        preload
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className={`object-cover ${hero.position}`}
      />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
