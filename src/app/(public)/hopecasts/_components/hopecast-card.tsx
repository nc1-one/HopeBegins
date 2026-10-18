import React from 'react';
import Link from 'next/link';
import { secondaryClass } from '@/components/tools/toolStyles';
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

/** "By: Ptr. Ana" and "By Ptr. Ana" both show as "Ptr. Ana". */
function speakerName(name: string | undefined) {
  const cleaned = (name || '').replace(/^\s*by(\s*:|\s)\s*/i, '').trim();
  return cleaned || 'Anonymous';
}

interface HopecastCardProps {
  hopecast: Hopecast;
  onPlay?: (hopecast: Hopecast) => void;
  isPlaying?: boolean;
  progress?: number;
}

export function HopecastCard({
  hopecast,
  onPlay,
  isPlaying = false,
  progress = 0,
}: HopecastCardProps) {
  const categoryName = toSentenceCase(
    hopecast.category_details?.[0]?.name || 'General'
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
              {speakerName(hopecast.name)}
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
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isPlaying ? 'Pause' : 'Play'}
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
            Ask someone to pray for you
          </Link>
        </div>
      )}
    </article>
  );
}
