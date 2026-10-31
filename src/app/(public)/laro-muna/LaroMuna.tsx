'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FindThePair } from '@/components/tools/FindThePair';
import { Saranggola } from '@/components/tools/Saranggola';
import { Biyahe } from '@/components/tools/Biyahe';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage, useLanguage } from '@/lib/languagePreference';

type Game = 'pair' | 'kite' | 'trip';
type Text = Record<FeelingLang, string>;

const GAMES: { id: Game; title: Text; text: Text }[] = [
  {
    id: 'pair',
    title: {
      en: 'Find the pair',
      tl: 'Hanapin ang kapares',
      fr: 'Trouve la paire',
      de: 'Paare finden',
      es: 'Encuentra las parejas',
      ko: '짝 맞추기',
    },
    text: {
      en: 'Match jeepneys, mangoes and parols. No timer.',
      tl: 'Ipares ang mga dyip, mangga at parol. Walang timer.',
      fr: 'Retrouve les paires de bus, de mangues et d’étoiles de Noël. Sans chrono.',
      de: 'Finde Paare aus Bussen, Mangos und Weihnachtssternen. Ohne Zeitdruck.',
      es: 'Encuentra parejas de autobuses, mangos y estrellas navideñas. Sin límite de tiempo.',
      ko: '버스, 망고, 크리스마스 별의 짝을 맞춰요. 시간 제한은 없어요.',
    },
  },
  {
    id: 'kite',
    title: {
      en: 'Saranggola',
      tl: 'Saranggola',
      fr: 'Le cerf-volant',
      de: 'Der Drachen',
      es: 'La cometa',
      ko: '연날리기',
    },
    text: {
      en: 'Fly a kite from morning to sunset and catch the stars. One minute.',
      tl: 'Paliparin ang saranggola mula umaga hanggang dapithapon at hulihin ang mga bituin. Isang minuto.',
      fr: 'Fais voler un cerf-volant du matin au coucher du soleil et attrape les étoiles. Une minute.',
      de: 'Lass einen Drachen vom Morgen bis zum Sonnenuntergang steigen und fang Sterne. Eine Minute.',
      es: 'Vuela una cometa desde la mañana hasta el atardecer y atrapa las estrellas. Un minuto.',
      ko: '아침부터 해 질 녘까지 연을 날리며 별을 잡아요. 1분이면 돼요.',
    },
  },
  {
    id: 'trip',
    title: {
      en: 'The trip',
      tl: 'Biyahe',
      fr: 'Le trajet',
      de: 'Die Fahrt',
      es: 'El paseo en autobús',
      ko: '여행길',
    },
    text: {
      en: 'Do tiny real-life missions to drive a jeepney from home to the sea.',
      tl: 'Gawin ang maliliit na misyon para makarating ang dyip mula bahay hanggang dagat.',
      fr: 'Accomplis de toutes petites missions dans la vraie vie pour emmener le bus de la maison jusqu’à la mer.',
      de: 'Erledige winzige Missionen im echten Leben und bring den Bus von zu Hause bis ans Meer.',
      es: 'Cumple misiones pequeñitas en la vida real para llevar el autobús de tu casa hasta el mar.',
      ko: '일상 속 작은 미션을 하나씩 해내며 버스를 집에서 바다까지 데려가요.',
    },
  },
];

const copy = {
  en: {
    title: 'Play for a bit.',
    subtitle: 'Short games for when your head is too full.',
  },
  tl: {
    title: 'Laro muna.',
    subtitle: 'Maiikling laro para sa mga oras na puno ang isip mo.',
  },
  fr: {
    title: 'Une pause jeu.',
    subtitle: 'De petits jeux pour quand ta tête est trop pleine.',
  },
  de: {
    title: 'Kurz spielen.',
    subtitle: 'Kurze Spiele für Momente, in denen dein Kopf zu voll ist.',
  },
  es: {
    title: 'Un rato de juego.',
    subtitle: 'Juegos cortos para cuando tu cabeza está demasiado llena.',
  },
  ko: {
    title: '잠깐 놀이',
    subtitle: '머릿속이 너무 복잡할 때 하는 짧은 게임이에요.',
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
        </div>
      </div>
    </div>
  );
}
