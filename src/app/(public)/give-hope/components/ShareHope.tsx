'use client';

import { useState } from 'react';
import { secondaryClass } from '@/components/tools/toolStyles';
import { analyticsService } from '@/services/analyticsService';

const SHARE = {
  title: 'HopeBegins',
  text: 'Free help for Filipinos who feel anxious or low, in English or Taglish.',
  url: 'https://hopebegins.today',
};

/** A third way to give: pass HopeBegins on to someone who needs it. */
export function ShareHope() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const share = async () => {
    analyticsService.recordClick('give_share');
    if (navigator.share) {
      try {
        await navigator.share(SHARE);
      } catch {
        // They closed the share sheet: nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE.url);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section
      aria-labelledby="share-title"
      className="flex flex-col gap-5 border-t border-[#E2DFDA] pt-10 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h2
          id="share-title"
          className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
        >
          Can&apos;t give right now?
        </h2>
        <p className="mt-3 max-w-xl text-[#6E5F47] leading-relaxed md:text-lg">
          Send HopeBegins to one person who has been having a hard time. That
          helps too.
        </p>
      </div>
      <div className="shrink-0">
        <button type="button" onClick={share} className={secondaryClass}>
          Share HopeBegins
        </button>
        <p role="status" className="mt-2 min-h-5 text-sm text-[#6E5F47]">
          {status === 'copied'
            ? 'Link copied.'
            : status === 'failed'
              ? `Copy this link: ${SHARE.url}`
              : ''}
        </p>
      </div>
    </section>
  );
}
