import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { StoryQuote } from '@/components/ui/testimonial-carousel';
import { defaultTestimonials } from '@/lib/hopeStories';
import { photo, photoTurn } from '@/lib/photos';
import { GiveWays } from './components/GiveWays';
import { ImpactStats } from './components/ImpactStats';
import { ShareHope } from './components/ShareHope';

/*
 * Giving, three ways: a gift that keeps HopeBegins free, your heart and time
 * as a Hope Carrier, or passing the site on. Real numbers and a real story
 * say what it's for; nothing here is made up.
 */
export default function GiveHopePage() {
  const turn = photoTurn();
  const hero = photo('hope', turn);
  // One participant's words, taking turns with the photos.
  const story = defaultTestimonials[turn % defaultTestimonials.length];

  return (
    <div className="overflow-x-clip px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="max-w-3xl text-balance font-playfair text-5xl md:text-7xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
          Give Hope
        </h1>
        <p
          className="mt-5 max-w-2xl font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em] hb-step-in"
          style={{ animationDelay: '120ms' }}
        >
          HopeBegins is free for anyone who feels anxious, low or alone. Keep it
          that way with a gift, or with your time as a Hope Carrier who prays
          for people.
        </p>
        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[21/9]">
          <Image
            src={hero.src}
            alt=""
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover hb-photo-settle"
          />
        </div>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          <ImpactStats />

          <GiveWays />

          <Reveal
            as="section"
            className="grid gap-6 border-t border-[#E2DFDA] pt-10 md:grid-cols-[1fr_1.6fr] md:gap-14"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              In their words
            </h2>
            <StoryQuote testimonial={story} />
          </Reveal>

          <Reveal>
            <ShareHope />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
