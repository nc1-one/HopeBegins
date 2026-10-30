import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { StoryQuote } from '@/components/ui/testimonial-carousel';
import { storiesIn } from '@/lib/hopeStories';
import { photo, photoTurn } from '@/lib/photos';
import { GiveWays } from './components/GiveWays';
import { ShareHope } from './components/ShareHope';

const copy: PerLangNoTl<{ title: string; intro: string; words: string }> = {
  en: {
    title: 'Give Hope',
    intro:
      'HopeBegins is free for anyone who feels anxious, low or alone. Keep it that way with a gift, or with your time as a Hope Carrier who prays for people.',
    words: 'In their words',
  },
  fr: {
    title: 'Donner de l’espoir',
    intro:
      'HopeBegins est gratuit pour toute personne qui traverse l’anxiété, la déprime ou la solitude. Aide-nous à le garder gratuit avec un don, ou avec ton temps, comme Hope Carrier qui prie pour les autres.',
    words: 'Avec leurs propres mots',
  },
  de: {
    title: 'Hoffnung schenken',
    intro:
      'HopeBegins ist kostenlos für alle, die Angst haben, niedergeschlagen oder einsam sind. Hilf mit, dass es so bleibt: mit einer Spende oder mit deiner Zeit als Hope Carrier, im Gebet für andere.',
    words: 'In ihren eigenen Worten',
  },
  es: {
    title: 'Da esperanza',
    intro:
      'HopeBegins es gratis para cualquier persona que sienta ansiedad, tristeza o soledad. Ayúdanos a que siga así con una donación, o con tu tiempo como Hope Carrier que ora por otras personas.',
    words: 'En sus propias palabras',
  },
  ko: {
    title: '희망 나누기',
    intro:
      'HopeBegins는 불안하거나 우울하거나 외로운 누구에게나 무료예요. 후원으로, 또는 사람들을 위해 기도하는 Hope Carrier로 시간을 내어 계속 무료로 지켜 주세요.',
    words: '그들이 직접 전하는 이야기',
  },
};

/*
 * Giving, three ways: a gift that keeps HopeBegins free, your heart and time
 * as a Hope Carrier, or passing the site on. A real story says what it's
 * for; nothing here is made up.
 */
export function GiveHope({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  const turn = photoTurn();
  const hero = photo('hope', turn);
  // One participant's words, taking turns with the photos.
  const stories = storiesIn(lang);
  const story = stories[turn % stories.length];

  return (
    <div className="overflow-x-clip px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="max-w-3xl text-balance font-playfair text-5xl md:text-7xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
          {t.title}
        </h1>
        <p
          className="mt-5 max-w-2xl font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em] hb-step-in"
          style={{ animationDelay: '120ms' }}
        >
          {t.intro}
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
          <GiveWays lang={lang} />

          <Reveal
            as="section"
            className="grid gap-6 border-t border-[#E2DFDA] pt-10 md:grid-cols-[1fr_1.6fr] md:gap-14"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {t.words}
            </h2>
            <StoryQuote testimonial={story} lang={lang} />
          </Reveal>

          <Reveal>
            <ShareHope lang={lang} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
