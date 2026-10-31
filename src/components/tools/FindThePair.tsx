'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { RotateCcw } from 'lucide-react';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import {
  PAIR_ICONS,
  PAIR_ICON_IDS,
  PairIcon,
  type PairIconId,
} from './pairIcons';

/**
 * Find the pair: a short memory game for when thoughts keep looping. Holding
 * a few cards in mind leaves less room for the loop. No timer, nothing to
 * lose. The best score stays on this phone; only plays and finishes are
 * counted.
 */

const LEVELS = [4, 6, 8] as const;
type Level = (typeof LEVELS)[number];
const BEST_KEY = 'hopebegins.pairsBest';
// Long enough to see both cards, short enough not to wait.
const MISMATCH_MS = 900;

const copy = {
  en: {
    label: 'Find the pair game',
    hint: 'Tap a card, then find its pair.',
    found: (n: number, total: number) => `${n} of ${total} pairs`,
    tries: (n: number) => `${n} ${n === 1 ? 'try' : 'tries'}`,
    best: (n: number) => `Best: ${n}`,
    shuffle: 'Shuffle',
    howMany: 'How many pairs',
    level: (n: number) => `${n} pairs`,
    card: (i: number, name?: string) =>
      name ? `Card ${i}, ${name}` : `Card ${i}, face down`,
    pair: (name: string) => `${name}: a pair.`,
    notPair: (a: string, b: string) => `${a} and ${b}. Not a pair.`,
    doneTitle: (pairs: number) => `You found all ${pairs} pairs.`,
    doneTries: (tries: number) => `It took you ${tries} tries.`,
    newBest: 'Your best yet on this phone.',
    bestSoFar: (n: number) => `Your best on this phone: ${n} tries.`,
    again: 'Play again',
    harder: (n: number) => `Try ${n} pairs`,
    close: 'Close',
  },
  tl: {
    label: 'Larong Hanapin ang kapares',
    hint: 'Pumili ng card, tapos hanapin ang kapares nito.',
    found: (n: number, total: number) => `${n} sa ${total} na pares`,
    tries: (n: number) => `${n} subok`,
    best: (n: number) => `Best: ${n}`,
    shuffle: 'Balasahin',
    howMany: 'Ilang pares',
    level: (n: number) => `${n} na pares`,
    card: (i: number, name?: string) =>
      name ? `Card ${i}, ${name}` : `Card ${i}, nakataob`,
    pair: (name: string) => `Magkapares ang ${name}.`,
    notPair: (a: string, b: string) => `${a} at ${b}. Hindi magkapares.`,
    doneTitle: (pairs: number) => `Nahanap mo lahat ng ${pairs} na pares.`,
    doneTries: (tries: number) => `Sa ${tries} na subok.`,
    newBest: 'Ito na ang pinakamaganda mo sa phone na ito.',
    bestSoFar: (n: number) =>
      `Pinakamaganda mo sa phone na ito: ${n} na subok.`,
    again: 'Laro ulit',
    harder: (n: number) => `Subukan ang ${n} na pares`,
    close: 'Isara',
  },
  fr: {
    label: 'Jeu des paires',
    hint: 'Touche une carte, puis trouve sa paire.',
    found: (n: number, total: number) =>
      `${n} ${n > 1 ? 'paires' : 'paire'} sur ${total}`,
    tries: (n: number) => `${n} ${n > 1 ? 'essais' : 'essai'}`,
    best: (n: number) => `Record : ${n}`,
    shuffle: 'Mélanger',
    howMany: 'Nombre de paires',
    level: (n: number) => `${n} paires`,
    card: (i: number, name?: string) =>
      name ? `Carte ${i}, ${name}` : `Carte ${i}, face cachée`,
    pair: (name: string) => `Paire trouvée : ${name}.`,
    notPair: (a: string, b: string) => `${a} et ${b}. Ce n’est pas une paire.`,
    doneTitle: (pairs: number) => `Tu as trouvé les ${pairs} paires.`,
    doneTries: (tries: number) => `Il t’a fallu ${tries} essais.`,
    newBest: 'Nouveau record sur ce téléphone.',
    bestSoFar: (n: number) => `Ton record sur ce téléphone : ${n} essais.`,
    again: 'Rejouer',
    harder: (n: number) => `Essayer avec ${n} paires`,
    close: 'Fermer',
  },
  de: {
    label: 'Spiel „Paare finden“',
    hint: 'Tippe auf eine Karte und finde dann ihr Paar.',
    found: (n: number, total: number) => `${n} von ${total} Paaren`,
    tries: (n: number) => `${n} ${n === 1 ? 'Versuch' : 'Versuche'}`,
    best: (n: number) => `Rekord: ${n}`,
    shuffle: 'Mischen',
    howMany: 'Wie viele Paare',
    level: (n: number) => `${n} Paare`,
    card: (i: number, name?: string) =>
      name ? `Karte ${i}, ${name}` : `Karte ${i}, verdeckt`,
    pair: (name: string) => `Paar gefunden: ${name}.`,
    notPair: (a: string, b: string) => `${a} und ${b}. Kein Paar.`,
    doneTitle: (pairs: number) => `Du hast alle ${pairs} Paare gefunden.`,
    doneTries: (tries: number) => `Du hast ${tries} Versuche gebraucht.`,
    newBest: 'Neuer Rekord auf diesem Handy.',
    bestSoFar: (n: number) => `Dein Rekord auf diesem Handy: ${n} Versuche.`,
    again: 'Noch mal spielen',
    harder: (n: number) => `Mit ${n} Paaren spielen`,
    close: 'Schließen',
  },
  es: {
    label: 'Juego de encontrar parejas',
    hint: 'Toca una carta y luego busca su pareja.',
    found: (n: number, total: number) => `${n} de ${total} parejas`,
    tries: (n: number) => `${n} ${n === 1 ? 'intento' : 'intentos'}`,
    best: (n: number) => `Récord: ${n}`,
    shuffle: 'Barajar',
    howMany: 'Cuántas parejas',
    level: (n: number) => `${n} parejas`,
    card: (i: number, name?: string) =>
      name ? `Carta ${i}, ${name}` : `Carta ${i}, boca abajo`,
    pair: (name: string) => `Pareja encontrada: ${name}.`,
    notPair: (a: string, b: string) => `${a} y ${b}. No son pareja.`,
    doneTitle: (pairs: number) => `Encontraste las ${pairs} parejas.`,
    doneTries: (tries: number) => `Te tomó ${tries} intentos.`,
    newBest: 'Es tu nuevo récord en este celular.',
    bestSoFar: (n: number) => `Tu récord en este celular: ${n} intentos.`,
    again: 'Jugar otra vez',
    harder: (n: number) => `Probar con ${n} parejas`,
    close: 'Cerrar',
  },
  ko: {
    label: '짝 맞추기 게임',
    hint: '카드를 한 장 누르고, 그 짝을 찾아보세요.',
    found: (n: number, total: number) => `${total}쌍 중 ${n}쌍`,
    tries: (n: number) => `${n}번 시도`,
    best: (n: number) => `최고 기록: ${n}번`,
    shuffle: '섞기',
    howMany: '쌍 개수',
    level: (n: number) => `${n}쌍`,
    card: (i: number, name?: string) =>
      name ? `${i}번 카드, ${name}` : `${i}번 카드, 뒷면`,
    pair: (name: string) => `짝을 찾았어요: ${name}.`,
    notPair: (a: string, b: string) => `${a}, ${b}. 짝이 아니에요.`,
    doneTitle: (pairs: number) => `${pairs}쌍을 모두 찾았어요`,
    doneTries: (tries: number) => `${tries}번 만에 해냈어요.`,
    newBest: '이 휴대폰에서 낸 최고 기록이에요.',
    bestSoFar: (n: number) => `이 휴대폰 최고 기록: ${n}번.`,
    again: '다시 하기',
    harder: (n: number) => `${n}쌍으로 해 보기`,
    close: '닫기',
  },
};

interface Card {
  id: number;
  icon: PairIconId;
}

type Best = Partial<Record<Level, number>>;

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** A fresh board: a random set of pictures, each twice, in random order. */
function deal(pairs: Level): Card[] {
  const icons = shuffle([...PAIR_ICON_IDS]).slice(0, pairs);
  return shuffle([...icons, ...icons]).map((icon, id) => ({ id, icon }));
}

function readBest(): Best {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(BEST_KEY) ?? '{}');
    const best: Best = {};
    for (const level of LEVELS) {
      const value = (saved as Record<string, unknown>)?.[level];
      if (typeof value === 'number' && value >= level && value < 1000) {
        best[level] = value;
      }
    }
    return best;
  } catch {
    return {};
  }
}

function saveBest(best: Best) {
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(best));
  } catch {
    // Storage blocked: the score just isn't kept.
  }
}

const noSubscribe = () => () => {};

const chipClass =
  'min-h-11 rounded-xl px-4 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] aria-pressed:bg-[#6E5F47] aria-pressed:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';
const primaryClass =
  'inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

export function FindThePair({
  lang,
  source,
  onClose,
  autoFocus = true,
}: {
  lang: FeelingLang;
  /** Where it was opened, so the dashboard can count plays per stage. */
  source: ToolSource;
  /** Shows a Close button, for the game opened inside another page. */
  onClose?: () => void;
  /** Move focus to the game when it appears (off when it is the page). */
  autoFocus?: boolean;
}) {
  const t = copy[lang];
  // The board is shuffled in the browser, so the server sends a face-down
  // placeholder of the same size and nothing jumps.
  const isClient = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false
  );
  const [pairs, setPairs] = useState<Level>(6);
  const [deck, setDeck] = useState(() => deal(6));
  const [round, setRound] = useState(0);
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<PairIconId[]>([]);
  const [tries, setTries] = useState(0);
  const [best, setBest] = useState(readBest);
  const [isNewBest, setIsNewBest] = useState(false);
  const [message, setMessage] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const started = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  const isWon = found.length === pairs;

  useEffect(() => {
    if (!autoFocus) return;
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, [autoFocus]);

  useEffect(() => {
    if (isWon) doneRef.current?.focus({ preventScroll: true });
  }, [isWon]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const finish = (total: number) => {
    analyticsService.recordClick(`tool_game_done_${source}`);
    const before = best[pairs];
    if (before === undefined || total < before) {
      const next = { ...best, [pairs]: total };
      setBest(next);
      saveBest(next);
    }
    setIsNewBest(before !== undefined && total < before);
    setMessage(`${t.doneTitle(pairs)} ${t.doneTries(total)}`);
  };

  const flip = (index: number) => {
    const card = deck[index];
    if (isWon || found.includes(card.icon) || open.includes(index)) return;
    if (!started.current) {
      started.current = true;
      analyticsService.recordClick(`tool_game_start_${source}`);
    }
    window.clearTimeout(timer.current);
    // Two cards that didn't match are still showing: turn them back now.
    const showing = open.length === 2 ? [] : open;
    const next = [...showing, index];
    if (next.length === 1) {
      setOpen(next);
      return;
    }

    const first = deck[next[0]];
    const name = PAIR_ICONS[card.icon].name[lang];
    setTries(tries + 1);
    if (first.icon === card.icon) {
      const nowFound = [...found, card.icon];
      setFound(nowFound);
      setOpen([]);
      if (nowFound.length === pairs) finish(tries + 1);
      else setMessage(t.pair(name));
    } else {
      setOpen(next);
      setMessage(t.notPair(PAIR_ICONS[first.icon].name[lang], name));
      timer.current = window.setTimeout(() => setOpen([]), MISMATCH_MS);
    }
  };

  const newGame = (level: Level = pairs) => {
    window.clearTimeout(timer.current);
    started.current = false;
    setPairs(level);
    setDeck(deal(level));
    setRound(round + 1);
    setOpen([]);
    setFound([]);
    setTries(0);
    setIsNewBest(false);
    setMessage('');
    if (isWon) boxRef.current?.focus({ preventScroll: true });
  };

  const nextLevel = LEVELS.find((level) => level > pairs);

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className="rounded-2xl bg-[#EFF3E7] p-4 text-[#6E5F47] focus:outline-none sm:p-6 hb-panel-in"
    >
      <div className="mx-auto max-w-[26rem]">
        <div className="flex items-center justify-between gap-3 font-poppins text-sm">
          <p className="font-bold tabular-nums">
            {t.found(found.length, pairs)}
          </p>
          <p className="tabular-nums">
            {t.tries(tries)}
            {best[pairs] !== undefined && (
              <span className="text-[#6E5F47]/70">
                {' '}
                · {t.best(best[pairs])}
              </span>
            )}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {isClient
            ? deck.map((card, index) => {
                const isFound = found.includes(card.icon);
                const isUp = isFound || open.includes(index);
                const name = PAIR_ICONS[card.icon].name[lang];
                return (
                  <button
                    key={`${round}-${card.id}`}
                    type="button"
                    onClick={() => flip(index)}
                    disabled={isFound}
                    aria-label={t.card(index + 1, isUp ? name : undefined)}
                    className="group relative aspect-square rounded-xl [perspective:800px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                  >
                    <span
                      className={`absolute inset-0 rounded-xl transition-transform duration-[var(--hb-base)] ease-[var(--hb-ease-out)] [transform-style:preserve-3d] ${
                        isUp ? '[transform:rotateY(180deg)]' : ''
                      }`}
                    >
                      <span className="hb-banig absolute inset-0 rounded-xl shadow-sm ring-1 ring-inset ring-white/70 transition-shadow [backface-visibility:hidden] group-hover:shadow-md" />
                      <span
                        className={`absolute inset-0 flex items-center justify-center rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                          isFound
                            ? 'bg-white ring-2 ring-[#AEC488]'
                            : 'bg-white shadow-sm ring-1 ring-[#DFE7CF]'
                        }`}
                      >
                        <PairIcon
                          id={card.icon}
                          className={`h-[74%] w-[74%] ${
                            isWon
                              ? 'animate-[hb-pop_var(--hb-slow)_var(--hb-ease-out)_both]'
                              : isFound
                                ? 'animate-[hb-pop_var(--hb-base)_var(--hb-ease-out)]'
                                : ''
                          }`}
                          style={
                            isWon
                              ? { animationDelay: `${index * 35}ms` }
                              : undefined
                          }
                        />
                      </span>
                    </span>
                  </button>
                );
              })
            : Array.from({ length: pairs * 2 }, (_, index) => (
                <span
                  key={index}
                  className="hb-banig aspect-square rounded-xl shadow-sm ring-1 ring-inset ring-white/70"
                />
              ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {message}
        </p>

        {isWon ? (
          <div className="mt-5 text-center hb-step-in">
            <p
              ref={doneRef}
              tabIndex={-1}
              className="font-poppins text-lg font-bold focus:outline-none"
            >
              {t.doneTitle(pairs)}
            </p>
            <p className="mt-1">
              {t.doneTries(tries)}{' '}
              {isNewBest
                ? t.newBest
                : best[pairs] !== undefined && best[pairs] < tries
                  ? t.bestSoFar(best[pairs])
                  : null}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => newGame()}
                className={primaryClass}
              >
                {t.again}
              </button>
              {nextLevel && (
                <button
                  type="button"
                  onClick={() => newGame(nextLevel)}
                  className={secondaryClass}
                >
                  {t.harder(nextLevel)}
                </button>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={secondaryClass}
                >
                  {t.close}
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="mt-3 text-center text-sm">{t.hint}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <div
                role="group"
                aria-label={t.howMany}
                className="inline-flex rounded-xl border border-[#DFE7CF] bg-white p-1"
              >
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={pairs === level}
                    onClick={() => newGame(level)}
                    className={chipClass}
                  >
                    {t.level(level)}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => newGame()}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
              >
                <RotateCcw className="h-4 w-4" />
                {t.shuffle}
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
                >
                  {t.close}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
