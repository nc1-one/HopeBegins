import React from 'react';
import Link from '@/components/ui/LocalLink';
import { secondaryClass } from '@/components/tools/toolStyles';
import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Hopecast } from '@/types/hopecast';
import { toSentenceCase } from './sentence-case';
import 'react-quill-new/dist/quill.snow.css';

const HopecastContent = React.memo(({ verse }: { verse: string }) => {
  if (!verse) return null;

  // Replace all non-breaking spaces (HTML entities or raw characters) with normal spaces
  // This prevents weird word breaking (like 'ide a:') when text is pasted from other sources
  const cleanVerse = verse.replace(/&nbsp;|\u00A0/g, ' ');

  return (
    <div className="ql-snow">
      <div
        className="ql-editor !p-0 text-base text-[#6E5F47] [&_p:empty]:min-h-[1.42em]"
        dangerouslySetInnerHTML={{
          __html: cleanVerse,
        }}
      />
    </div>
  );
});
HopecastContent.displayName = 'HopecastContent';

// The episodes' titles, speakers and words are their own, in English or
// Filipino; only what's around them changes language.
const copy: PerLangNoTl<{
  general: string;
  anonymous: string;
  play: string;
  pause: string;
  playLabel: (title: string) => string;
  pauseLabel: (title: string) => string;
  pray: string;
}> = {
  en: {
    general: 'General',
    anonymous: 'Anonymous',
    play: 'Play',
    pause: 'Pause',
    playLabel: (title) => `Play ${title}`,
    pauseLabel: (title) => `Pause ${title}`,
    pray: 'Ask someone to pray for you',
  },
  fr: {
    general: 'Général',
    anonymous: 'Anonyme',
    play: 'Écouter',
    pause: 'Pause',
    playLabel: (title) => `Écouter ${title}`,
    pauseLabel: (title) => `Mettre en pause ${title}`,
    pray: 'Demander qu’on prie pour toi',
  },
  de: {
    general: 'Allgemein',
    anonymous: 'Anonym',
    play: 'Anhören',
    pause: 'Pause',
    playLabel: (title) => `${title} anhören`,
    pauseLabel: (title) => `${title} pausieren`,
    pray: 'Jemanden bitten, für dich zu beten',
  },
  es: {
    general: 'General',
    anonymous: 'Anónimo',
    play: 'Escuchar',
    pause: 'Pausar',
    playLabel: (title) => `Escuchar ${title}`,
    pauseLabel: (title) => `Pausar ${title}`,
    pray: 'Pedir que oren por ti',
  },
  ko: {
    general: '일반',
    anonymous: '익명',
    play: '듣기',
    pause: '일시정지',
    playLabel: (title) => `${title} 듣기`,
    pauseLabel: (title) => `${title} 일시정지`,
    pray: '기도 부탁하기',
  },
};

/** "By: Ptr. Ana" and "By Ptr. Ana" both show as "Ptr. Ana"; no name is "". */
function speakerName(name: string | undefined) {
  return (name || '').replace(/^\s*by(\s*:|\s)\s*/i, '').trim();
}

interface HopecastCardProps {
  lang: Lang;
  hopecast: Hopecast;
  onPlay?: (hopecast: Hopecast) => void;
  isPlaying?: boolean;
  progress?: number;
}

export function HopecastCard({
  lang,
  hopecast,
  onPlay,
  isPlaying = false,
  progress = 0,
}: HopecastCardProps) {
  const t = noTl(copy, lang);
  const categoryName = toSentenceCase(
    hopecast.category_details?.[0]?.name || t.general
  );
  const title = toSentenceCase(hopecast.title);

  return (
    <article className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm text-[#6E5F47]/85">{categoryName}</p>
          <h2 className="text-balance font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            {title}
          </h2>
          <p className="flex flex-wrap gap-x-3 text-sm text-[#6E5F47]/85">
            <span className="whitespace-nowrap">
              {speakerName(hopecast.name) || t.anonymous}
            </span>
            <span className="whitespace-nowrap">
              {hopecast.duration || 'Daily Hope'}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => onPlay?.(hopecast)}
          className={cn(secondaryClass, 'min-w-24 shrink-0')}
          aria-label={isPlaying ? t.pauseLabel(title) : t.playLabel(title)}
        >
          {isPlaying ? t.pause : t.play}
        </button>
      </div>

      {/* Player Controls & Quote Section */}
      {isPlaying && (
        <div className="space-y-5 hb-panel-in">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2DFDA]">
            <div
              className="h-full bg-[#AEC488] transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <HopecastContent verse={hopecast.verse || ''} />

          <Link
            href="/prayers"
            className="inline-flex min-h-11 items-center font-poppins font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] rounded-md"
          >
            {t.pray}
          </Link>
        </div>
      )}
    </article>
  );
}
