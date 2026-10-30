'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { hopecastService } from '@/services/hopecastService';
import { CategoryFilter } from './_components/category-filter';
import { HopecastCard } from './_components/hopecast-card';
import { Category, Hopecast, HopecastListResponse } from '@/types/hopecast';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass, secondaryClass } from '@/components/tools/toolStyles';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { cn } from '@/lib/utils';

// The episodes are in English and Filipino, so the other languages say so.
const copy: PerLangNoTl<{
  title: string;
  subtitle: string;
  language?: string;
  loading: string;
  back: string;
  next: string;
  pageOf: (page: number, count: number) => string;
  failed: string;
  retry: string;
  empty: string;
}> = {
  en: {
    title: 'I need to hear hope today',
    subtitle: 'Short messages of hope you can listen to.',
    loading: 'Loading…',
    back: 'Back',
    next: 'Next',
    pageOf: (page, count) => `Page ${page} of ${count}`,
    failed: "We couldn't load HopeCasts. Check your connection and try again.",
    retry: 'Try again',
    empty: 'No HopeCasts on this topic yet. Try another one.',
  },
  fr: {
    title: 'J’ai besoin d’un mot d’espoir aujourd’hui',
    subtitle: 'De courts messages d’espoir à écouter.',
    language: 'Les HopeCasts sont en anglais et en filipino.',
    loading: 'Chargement…',
    back: 'Précédent',
    next: 'Suivant',
    pageOf: (page, count) => `Page ${page} sur ${count}`,
    failed:
      'Impossible de charger les HopeCasts. Vérifie ta connexion et réessaie.',
    retry: 'Réessayer',
    empty: 'Pas encore de HopeCast sur ce thème. Essaie un autre thème.',
  },
  de: {
    title: 'Ich brauche heute ein Wort der Hoffnung',
    subtitle: 'Kurze Botschaften der Hoffnung zum Anhören.',
    language: 'Die HopeCasts sind auf Englisch und Filipino.',
    loading: 'Wird geladen…',
    back: 'Zurück',
    next: 'Weiter',
    pageOf: (page, count) => `Seite ${page} von ${count}`,
    failed:
      'Die HopeCasts konnten nicht geladen werden. Prüf deine Verbindung und versuch es noch einmal.',
    retry: 'Noch einmal versuchen',
    empty: 'Zu diesem Thema gibt es noch keine HopeCasts. Probier ein anderes.',
  },
  es: {
    title: 'Hoy necesito una palabra de esperanza',
    subtitle: 'Mensajes cortos de esperanza para escuchar.',
    language: 'Los HopeCasts están en inglés y en filipino.',
    loading: 'Cargando…',
    back: 'Anterior',
    next: 'Siguiente',
    pageOf: (page, count) => `Página ${page} de ${count}`,
    failed:
      'No pudimos cargar los HopeCasts. Revisa tu conexión e inténtalo de nuevo.',
    retry: 'Intentar de nuevo',
    empty: 'Todavía no hay HopeCasts sobre este tema. Prueba con otro.',
  },
  ko: {
    title: '오늘 희망의 말이 필요해요',
    subtitle: '짧게 들을 수 있는 희망의 메시지예요.',
    language: 'HopeCast는 영어와 필리핀어로 되어 있어요.',
    loading: '불러오는 중…',
    back: '이전',
    next: '다음',
    pageOf: (page, count) => `${count}쪽 중 ${page}쪽`,
    failed:
      'HopeCast를 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.',
    retry: '다시 시도하기',
    empty: '이 주제의 HopeCast가 아직 없어요. 다른 주제를 골라 보세요.',
  },
};

export default function HopecastsPage() {
  const lang = usePageLanguage();
  const t = noTl(copy, lang);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Audio Playback State
  const [playingHopecast, setPlayingHopecast] = React.useState<Hopecast | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['hopecast-categories'],
    queryFn: () => hopecastService.getCategories(),
  });

  // Fetch hopecasts
  const {
    data: hopecastsData,
    isLoading: isLoadingHopecasts,
    isError: hopecastsFailed,
    refetch: retryHopecasts,
  } = useQuery<HopecastListResponse>({
    queryKey: ['hopecasts', selectedCategoryId, page],
    queryFn: () =>
      hopecastService.getHopecasts(selectedCategoryId, page, pageSize),
  });

  const hopecasts = hopecastsData?.results || [];

  // Reset page and stop audio when category changes
  React.useEffect(() => {
    setPage(1);

    // Stop audio playback on category change
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingHopecast(null);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [selectedCategoryId]);

  // Cleanup audio on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async (hopecast: Hopecast) => {
    // If it's already the same hopecast, toggle play/pause
    if (playingHopecast?.id === hopecast.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    // New hopecast to play
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(hopecast.mp4_link);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    try {
      setPlayingHopecast(hopecast);
      setIsPlaying(true);
      setProgress(0);

      // Play the audio
      await audio.play();

      // Call API to increment play count
      await hopecastService.playHopecast(hopecast.id);
    } catch (error) {
      console.error('Error playing hopecast:', error);
      setIsPlaying(false);
    }
  };

  const pageCount = hopecastsData
    ? Math.ceil(hopecastsData.count / pageSize)
    : 1;

  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          {t.language && (
            <p className="mt-4 text-sm text-[#6E5F47]">{t.language}</p>
          )}

          <div className="mt-8 mb-8">
            {isLoadingCategories ? (
              <div className="min-h-11" />
            ) : (
              <CategoryFilter
                lang={lang}
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            )}
          </div>

          {isLoadingHopecasts ? (
            // A screen tall, so what's under the list doesn't jump down
            // when the HopeCasts arrive.
            <p role="status" className="min-h-svh text-[#6E5F47]">
              {t.loading}
            </p>
          ) : hopecasts.length > 0 ? (
            <>
              <ul className="divide-y divide-[#E2DFDA] border-y border-[#E2DFDA]">
                {hopecasts.map((hopecast, i) => (
                  <li
                    key={hopecast.id}
                    className="py-6 hb-step-in"
                    style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                  >
                    <HopecastCard
                      lang={lang}
                      hopecast={hopecast}
                      onPlay={handlePlay}
                      isPlaying={
                        playingHopecast?.id === hopecast.id && isPlaying
                      }
                      progress={
                        playingHopecast?.id === hopecast.id ? progress : 0
                      }
                    />
                  </li>
                ))}
              </ul>

              {hopecastsData && hopecastsData.count > pageSize && (
                <div className="flex items-center gap-4 pt-8">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={cn(secondaryClass, 'font-medium')}
                  >
                    {t.back}
                  </button>
                  <span className="text-[#6E5F47] font-medium">
                    {t.pageOf(page, pageCount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= pageCount}
                    className={cn(secondaryClass, 'font-medium')}
                  >
                    {t.next}
                  </button>
                </div>
              )}
            </>
          ) : hopecastsFailed ? (
            <div role="alert" className="space-y-4">
              <p className="text-[#6E5F47]">{t.failed}</p>
              <button
                type="button"
                onClick={() => retryHopecasts()}
                className={primaryClass}
              >
                {t.retry}
              </button>
            </div>
          ) : (
            <p className="text-[#6E5F47]">{t.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
