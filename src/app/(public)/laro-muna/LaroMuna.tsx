'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FindThePair } from '@/components/tools/FindThePair';
import { Saranggola } from '@/components/tools/Saranggola';
import { Biyahe } from '@/components/tools/Biyahe';
import { ExerciseLauncher } from '@/components/tools/ExerciseLauncher';
import { PairIcon } from '@/components/tools/pairIcons';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';

type Game = 'pair' | 'kite' | 'trip';
type Text = Record<FeelingLang, string>;

/** A small kite for the list, drawn like the one in the game. */
function KiteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path
        d="M30 46c-4 4-8 3-11 6s-5 6-9 6"
        stroke="#6E5F47"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M32 6 18 28l14 22Z" fill="#D9644A" />
      <path d="M32 6 46 28 32 50Z" fill="#F4C152" />
      <path
        d="M32 6v44M18 28h28"
        stroke="#fff"
        strokeWidth="1.5"
        opacity="0.85"
      />
    </svg>
  );
}

const GAMES: { id: Game; title: Text; text: Text }[] = [
  {
    id: 'pair',
    title: { en: 'Find the pair', tl: 'Hanapin ang kapares' },
    text: {
      en: 'Match jeepneys, mangoes and parols. No timer.',
      tl: 'Ipares ang mga dyip, mangga at parol. Walang timer.',
    },
  },
  {
    id: 'kite',
    title: { en: 'Saranggola', tl: 'Saranggola' },
    text: {
      en: 'Fly a kite from morning to sunset and catch the stars. One minute.',
      tl: 'Paliparin ang saranggola mula umaga hanggang dapithapon at hulihin ang mga bituin. Isang minuto.',
    },
  },
  {
    id: 'trip',
    title: { en: 'The trip', tl: 'Biyahe' },
    text: {
      en: 'Do tiny real-life missions to drive a jeepney from home to the sea.',
      tl: 'Gawin ang maliliit na misyon para makarating ang dyip mula bahay hanggang dagat.',
    },
  },
];

const copy = {
  en: {
    title: 'Play for a bit.',
    subtitle:
      'Short games for when your head is too full. Pick one, and play as long as you like.',
    after: 'If your body still feels tense after playing',
  },
  tl: {
    title: 'Laro muna.',
    subtitle:
      "Maiikling laro para sa mga oras na puno ang isip mo. Pumili ng isa, at maglaro hangga't gusto mo.",
    after: 'Kung tensyonado pa rin ang katawan mo pagkatapos maglaro',
  },
};

export function LaroMuna() {
  const lang = useLanguage();
  const t = copy[lang];
  const [open, setOpen] = useState<Game | null>(null);
  const rows = useRef<Record<Game, HTMLButtonElement | null>>({
    pair: null,
    kite: null,
    trip: null,
  });

  // Links from Taglish pages open the games in Taglish (?lang=tl).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'tl' || requested === 'en') setLanguage(requested);
  }, []);

  const close = () => {
    const game = open;
    setOpen(null);
    if (game) requestAnimationFrame(() => rows.current[game]?.focus());
  };

  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="mb-6 flex justify-end">
            <LanguageSwitch />
          </div>
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          <ul className={`mt-8 ${groupClass}`}>
            {GAMES.map((game) => (
              <li key={game.id}>
                <button
                  ref={(el) => {
                    rows.current[game.id] = el;
                  }}
                  type="button"
                  aria-expanded={open === game.id}
                  onClick={() => setOpen(open === game.id ? null : game.id)}
                  className={`${rowClass} w-full text-left`}
                >
                  {game.id === 'kite' ? (
                    <KiteIcon className="h-10 w-10 shrink-0" />
                  ) : (
                    <PairIcon
                      id={game.id === 'pair' ? 'parol' : 'jeepney'}
                      className="h-10 w-10 shrink-0"
                    />
                  )}
                  <span className="flex-1">
                    <span className="block font-poppins font-bold text-[#6E5F47]">
                      {game.title[lang]}
                    </span>
                    <span className="block text-sm text-[#6E5F47]/85 leading-relaxed">
                      {game.text[lang]}
                    </span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 text-[#C5BFB5] transition-transform duration-[var(--hb-quick)] group-hover:text-[#6E5F47] ${
                      open === game.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {open === game.id && (
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                    {game.id === 'pair' ? (
                      <FindThePair lang={lang} source="page" onClose={close} />
                    ) : game.id === 'kite' ? (
                      <Saranggola lang={lang} source="page" onClose={close} />
                    ) : (
                      <Biyahe lang={lang} source="page" onClose={close} />
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <section aria-labelledby="after-title" className="mt-10">
            <h2
              id="after-title"
              className="font-poppins font-bold text-lg text-[#6E5F47]"
            >
              {t.after}
            </h2>
            <div className="mt-3">
              <ExerciseLauncher kind="breathe" lang={lang} source="page" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
