import Image from 'next/image';

/**
 * The "Not okay today?" background: Philippine rice fields in golden light
 * (Pexels 2407608). A still photo, so the first screen is calm and paints at
 * once on any phone, with nothing moving behind the words. The shade keeps
 * the white text readable.
 */
export function HeroMedia() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Image
        src="/assets/images/hero/rice-field-golden.jpg"
        alt=""
        fill
        // The first screen's picture: fetched first and never lazy.
        preload
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className="object-cover object-[40%_50%]"
      />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
