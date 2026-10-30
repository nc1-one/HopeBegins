'use client';

import React, { useState, useEffect } from 'react';
import {
  TestimonialCarousel,
  Testimonial,
} from '@/components/ui/testimonial-carousel';
import { SubmitHopeStoryModal } from '@/components/modals/SubmitHopeStoryModal';
import { secondaryClass } from '@/components/tools/toolStyles';
import { isIntlLang, noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import hopeStoryService from '@/services/hopeStoryService';

const copy: PerLangNoTl<{ title: string; intro: string; share: string }> = {
  en: {
    title: 'Stories of hope',
    intro: 'What people say about their time with HopeBegins.',
    share: 'Share your story',
  },
  fr: {
    title: 'Histoires d’espoir',
    intro: 'Ce que des personnes racontent de leur temps avec HopeBegins.',
    share: 'Partager ton histoire',
  },
  de: {
    title: 'Geschichten der Hoffnung',
    intro: 'Was Menschen über ihre Zeit mit HopeBegins erzählen.',
    share: 'Deine Geschichte teilen',
  },
  es: {
    title: 'Historias de esperanza',
    intro: 'Lo que cuentan algunas personas sobre su tiempo con HopeBegins.',
    share: 'Comparte tu historia',
  },
  ko: {
    title: '희망 이야기',
    intro: 'HopeBegins와 함께한 시간에 대해 사람들이 들려준 이야기예요.',
    share: '내 이야기 나누기',
  },
};

export function HopeStoriesSection({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  // Stories sent in through the site are in English or Taglish, so the
  // French, German, Spanish and Korean pages show the translated stories.
  const translated = isIntlLang(lang);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(!translated);

  const fetchStories = async () => {
    try {
      const data = await hopeStoryService.getApprovedStories();
      if (data && data.length > 0) {
        const mappedStories: Testimonial[] = data.map((story: any) => ({
          id: story.id,
          content: story.testimonial,
          name: story.full_name,
          role: story.occupation || undefined,
          avatar: story.photo || '', // Fallback handled in carousel or CSS
        }));
        setStories(mappedStories);
      }
    } catch (error) {
      console.error('Failed to fetch hope stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!translated) fetchStories();
  }, [translated]);

  return (
    <section aria-labelledby="stories-title" className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="stories-title"
              className="font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              {t.title}
            </h2>
            <p className="mt-3 max-w-lg text-[#6E5F47] leading-relaxed">
              {t.intro}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`self-start md:self-auto ${secondaryClass}`}
          >
            {t.share}
          </button>
        </div>

        <div className="mt-8">
          {loading ? (
            // Holds the space quietly until the stories arrive.
            <div className="min-h-64" aria-hidden />
          ) : (
            <TestimonialCarousel
              lang={lang}
              testimonials={stories.length > 0 ? stories : undefined}
            />
          )}
        </div>
      </div>

      <SubmitHopeStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
