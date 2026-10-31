'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { localDay } from '@/lib/toolNotes';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import {
  BiyaheMap,
  LAST_STOP,
  STOP_COUNT,
  STOP_NAMES,
  jeepTransform,
  pointAlong,
} from './biyaheMap';
import { primaryClass, quietClass, secondaryClass } from './toolStyles';

/**
 * Biyahe: a mission game for low days. Each small mission done moves a
 * jeepney one stop along the road, from home to the sea. A few missions a
 * day is plenty, and the trip waits on this phone for next time. Only plays,
 * missions done and finished trips are counted, never which mission.
 */

const KEY = 'hopebegins.biyahe.v1';
const CHANGE_EVENT = 'hopebegins-biyahe-change';
// Long enough to watch the jeepney go, short enough not to wait.
const DRIVE_MS = 900;
// After this many missions in a day, a note says resting counts too.
const PLENTY = 3;
// Holds a line's height while the trip is read, so nothing jumps.
const BLANK = '\u00a0';

const MISSIONS = [
  {
    en: 'Drink a glass of water',
    tl: 'Uminom ng isang basong tubig',
    fr: 'Bois un verre d’eau',
    de: 'Trink ein Glas Wasser',
    es: 'Toma un vaso de agua',
    ko: '물 한 잔 마시기',
  },
  {
    en: 'Open a window or step outside for 2 minutes',
    tl: 'Magbukas ng bintana o lumabas nang 2 minuto',
    fr: 'Ouvre une fenêtre ou sors 2 minutes',
    de: 'Öffne ein Fenster oder geh 2 Minuten raus',
    es: 'Abre una ventana o sal 2 minutos',
    ko: '창문을 열거나 2분 동안 밖에 나가기',
  },
  {
    en: 'Stretch your arms and neck for 1 minute',
    tl: 'Mag-stretch ng braso at leeg nang 1 minuto',
    fr: 'Étire tes bras et ta nuque pendant 1 minute',
    de: 'Dehn 1 Minute lang Arme und Nacken',
    es: 'Estira los brazos y el cuello durante 1 minuto',
    ko: '1분 동안 팔과 목 스트레칭하기',
  },
  {
    en: 'Wash your face',
    tl: 'Maghilamos',
    fr: 'Lave-toi le visage',
    de: 'Wasch dir das Gesicht',
    es: 'Lávate la cara',
    ko: '세수하기',
  },
  {
    en: 'Send a "how are you?" to someone',
    tl: 'Mag-send ng "kumusta" sa isang tao',
    fr: 'Envoie un « Ça va ? » à quelqu’un',
    de: 'Schick jemandem ein „Wie geht’s?“',
    es: 'Mándale un “¿Cómo estás?” a alguien',
    ko: '누군가에게 “잘 지내?” 하고 연락하기',
  },
  {
    en: 'Put away 5 things around you',
    tl: 'Magligpit ng 5 bagay sa paligid mo',
    fr: 'Remets 5 objets à leur place',
    de: 'Räum 5 Dinge um dich herum weg',
    es: 'Guarda 5 cosas que tengas alrededor',
    ko: '주변 물건 5개 제자리에 두기',
  },
  {
    en: 'Eat something, even something small',
    tl: 'Kumain, kahit kaunti',
    fr: 'Mange quelque chose, même un petit truc',
    de: 'Iss etwas, auch wenn es nur wenig ist',
    es: 'Come algo, aunque sea poquito',
    ko: '조금이라도 뭔가 먹기',
  },
  {
    en: 'Listen to one song you like',
    tl: 'Makinig sa isang kantang gusto mo',
    fr: 'Écoute une chanson que tu aimes',
    de: 'Hör dir ein Lied an, das du magst',
    es: 'Escucha una canción que te guste',
    ko: '좋아하는 노래 한 곡 듣기',
  },
  {
    en: 'Think of one thing that went okay today',
    tl: 'Isipin ang isang bagay na naging okay ngayong araw',
    fr: 'Pense à une chose qui s’est bien passée aujourd’hui',
    de: 'Denk an eine Sache, die heute okay war',
    es: 'Piensa en algo de hoy que estuvo bien',
    ko: '오늘 괜찮았던 일 하나 떠올리기',
  },
  {
    en: 'Look outside and find 3 colors',
    tl: 'Tumingin sa labas at maghanap ng 3 kulay',
    fr: 'Regarde dehors et trouve 3 couleurs',
    de: 'Schau nach draußen und finde 3 Farben',
    es: 'Mira afuera y encuentra 3 colores',
    ko: '창밖을 보고 색깔 3개 찾기',
  },
  {
    en: 'Take 5 slow breaths',
    tl: 'Huminga nang dahan-dahan nang 5 beses',
    fr: 'Respire lentement 5 fois',
    de: 'Atme 5-mal langsam ein und aus',
    es: 'Respira despacio 5 veces',
    ko: '천천히 다섯 번 숨쉬기',
  },
  {
    en: 'Fix one small corner of your room',
    tl: 'Ayusin ang isang maliit na sulok ng kuwarto mo',
    fr: 'Range un petit coin de ta chambre',
    de: 'Räum eine kleine Ecke in deinem Zimmer auf',
    es: 'Ordena un rinconcito de tu cuarto',
    ko: '내 방 작은 구석 하나 정리하기',
  },
] as const;

const copy = {
  en: {
    label: 'The trip game',
    status: (n: number, name: string) => `Stop ${n} of ${STOP_COUNT}: ${name}`,
    map: 'Map of the trip',
    mapAt: (n: number, name: string) =>
      `Map of the trip. The jeepney is at stop ${n} of ${STOP_COUNT}: ${name}.`,
    mapSea: 'Map of the trip. The jeepney made it to the sea.',
    hint: 'Finish a small mission to move the jeepney to the next stop.',
    mission: 'Your mission',
    done: 'Done',
    another: 'Another mission',
    newMission: (text: string) => `New mission: ${text}.`,
    cheers: ['Nice.', 'Good one.', 'There you go.'],
    next: (cheer: string, name: string) => `${cheer} Next stop: ${name}.`,
    plenty: "That's plenty for today. Resting is part of the trip too.",
    seaTitle: 'You made it to the sea.',
    seaText: 'Seven small missions, one at a time.',
    again: 'Start a new trip',
    close: 'Close',
  },
  tl: {
    label: 'Larong Biyahe',
    status: (n: number, name: string) => `Hinto ${n} sa ${STOP_COUNT}: ${name}`,
    map: 'Mapa ng biyahe',
    mapAt: (n: number, name: string) =>
      `Mapa ng biyahe. Nasa hinto ${n} sa ${STOP_COUNT} ang dyip: ${name}.`,
    mapSea: 'Mapa ng biyahe. Nakarating na sa dagat ang dyip.',
    hint: 'Tapusin ang isang maliit na mission para umusad ang dyip sa susunod na hinto.',
    mission: 'Ang mission mo',
    done: 'Tapos na',
    another: 'Ibang mission',
    newMission: (text: string) => `Bagong mission: ${text}.`,
    cheers: ['Ayos.', 'Galing.', 'Ayan, nagawa mo.'],
    next: (cheer: string, name: string) =>
      `${cheer} Susunod na hinto: ${name}.`,
    plenty:
      'Sapat na iyan para ngayong araw. Parte rin ng biyahe ang pagpapahinga.',
    seaTitle: 'Nakarating ka sa dagat.',
    seaText: 'Pitong maliliit na mission, paisa-isa.',
    again: 'Magsimula ng bagong biyahe',
    close: 'Isara',
  },
  fr: {
    label: 'Jeu du trajet',
    status: (n: number, name: string) =>
      `Arrêt ${n} sur ${STOP_COUNT} : ${name}`,
    map: 'Carte du trajet',
    mapAt: (n: number, name: string) =>
      `Carte du trajet. Le bus est à l’arrêt ${n} sur ${STOP_COUNT} : ${name}.`,
    mapSea: 'Carte du trajet. Le bus est arrivé à la mer.',
    hint: 'Termine une petite mission pour faire avancer le bus jusqu’au prochain arrêt.',
    mission: 'Ta mission',
    done: 'C’est fait',
    another: 'Une autre mission',
    newMission: (text: string) => `Nouvelle mission : ${text}.`,
    cheers: ['Super.', 'Bien joué.', 'Et voilà.'],
    next: (cheer: string, name: string) => `${cheer} Prochain arrêt : ${name}.`,
    plenty:
      'C’est bien assez pour aujourd’hui. Se reposer fait aussi partie du trajet.',
    seaTitle: 'Te voilà à la mer.',
    seaText: 'Sept petites missions, une à la fois.',
    again: 'Commencer un nouveau trajet',
    close: 'Fermer',
  },
  de: {
    label: 'Spiel „Die Fahrt“',
    status: (n: number, name: string) => `Halt ${n} von ${STOP_COUNT}: ${name}`,
    map: 'Streckenkarte',
    mapAt: (n: number, name: string) =>
      `Streckenkarte. Der Bus ist bei Halt ${n} von ${STOP_COUNT}: ${name}.`,
    mapSea: 'Streckenkarte. Der Bus ist am Meer angekommen.',
    hint: 'Schaff eine kleine Mission, dann fährt der Bus zum nächsten Halt.',
    mission: 'Deine Mission',
    done: 'Erledigt',
    another: 'Andere Mission',
    newMission: (text: string) => `Neue Mission: ${text}.`,
    cheers: ['Schön.', 'Gut gemacht.', 'Na also.'],
    next: (cheer: string, name: string) => `${cheer} Nächster Halt: ${name}.`,
    plenty: 'Für heute ist das genug. Pausen gehören auch zur Fahrt.',
    seaTitle: 'Du bist am Meer angekommen.',
    seaText: 'Sieben kleine Missionen, eine nach der anderen.',
    again: 'Neue Fahrt starten',
    close: 'Schließen',
  },
  es: {
    label: 'Juego del paseo en autobús',
    status: (n: number, name: string) =>
      `Parada ${n} de ${STOP_COUNT}: ${name}`,
    map: 'Mapa del recorrido',
    mapAt: (n: number, name: string) =>
      `Mapa del recorrido. El autobús está en la parada ${n} de ${STOP_COUNT}: ${name}.`,
    mapSea: 'Mapa del recorrido. El autobús llegó al mar.',
    hint: 'Termina una pequeña misión para que el autobús avance a la siguiente parada.',
    mission: 'Tu misión',
    done: 'Listo',
    another: 'Otra misión',
    newMission: (text: string) => `Nueva misión: ${text}.`,
    cheers: ['Bien.', 'Muy bien.', 'Eso es.'],
    next: (cheer: string, name: string) =>
      `${cheer} Siguiente parada: ${name}.`,
    plenty: 'Por hoy ya es bastante. Descansar también es parte del paseo.',
    seaTitle: 'Llegaste al mar.',
    seaText: 'Siete pequeñas misiones, una a la vez.',
    again: 'Empezar otro paseo',
    close: 'Cerrar',
  },
  ko: {
    label: '여행길 게임',
    status: (n: number, name: string) => `정류장 ${n}/${STOP_COUNT}: ${name}`,
    map: '여행길 지도',
    mapAt: (n: number, name: string) =>
      `여행길 지도. 버스가 ${n}번 정류장인 ${name}에 있어요. 정류장은 모두 ${STOP_COUNT}개예요.`,
    mapSea: '여행길 지도. 버스가 바다에 도착했어요.',
    hint: '작은 미션 하나를 끝내면 버스가 다음 정류장으로 가요.',
    mission: '나의 미션',
    done: '했어요',
    another: '다른 미션',
    newMission: (text: string) => `새 미션: ${text}.`,
    cheers: ['좋아요.', '잘했어요.', '바로 그거예요.'],
    next: (cheer: string, name: string) => `${cheer} 다음 정류장: ${name}.`,
    plenty: '오늘은 이 정도면 충분해요. 쉬는 것도 여행길의 일부예요.',
    seaTitle: '바다에 도착했어요',
    seaText: '작은 미션 일곱 개를 하나씩 해냈어요.',
    again: '새 여행길 떠나기',
    close: '닫기',
  },
};

/** The trip so far, kept only on this phone. */
interface Trip {
  /** The stop the jeepney is at: 0 is home, 7 is the sea. */
  stop: number;
  /** The last day a mission was done, as YYYY-MM-DD in local time. */
  day: string;
  /** Missions done that day. */
  today: number;
}

const NEW_TRIP: Trip = { stop: 0, day: '', today: 0 };
const DAY = /^\d{4}-\d{2}-\d{2}$/;

const isCount = (value: unknown, max: number): value is number =>
  Number.isInteger(value) && (value as number) >= 0 && (value as number) <= max;

function parseTrip(data: unknown): Trip {
  if (typeof data !== 'object' || data === null) return NEW_TRIP;
  const { stop, day, today } = data as Record<string, unknown>;
  if (!isCount(stop, LAST_STOP)) return NEW_TRIP;
  if (typeof day !== 'string' || !DAY.test(day) || !isCount(today, 999)) {
    return { stop, day: '', today: 0 };
  }
  return { stop, day, today };
}

// Used when the browser blocks storage, so the trip still works this visit.
let memory: Trip = NEW_TRIP;
// useSyncExternalStore needs the same object back while nothing changed.
let cached: { raw: string | null; day: string; trip: Trip } | null = null;

function readTrip(): Trip {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return memory;
  }
  const day = localDay();
  if (cached && cached.raw === raw && cached.day === day) return cached.trip;
  let trip = NEW_TRIP;
  try {
    trip = raw ? parseTrip(JSON.parse(raw)) : NEW_TRIP;
  } catch {
    trip = NEW_TRIP;
  }
  // Missions from an earlier day don't count toward today's.
  if (trip.day !== day && trip.today !== 0) trip = { ...trip, today: 0 };
  cached = { raw, day, trip };
  return trip;
}

function saveTrip(trip: Trip) {
  memory = trip;
  try {
    localStorage.setItem(KEY, JSON.stringify(trip));
  } catch {
    // Storage blocked: the trip is kept in memory for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** A random mission, never the one just shown. */
function pickMission(not = -1): number {
  const others = not >= 0 ? MISSIONS.length - 1 : MISSIONS.length;
  const i = Math.floor(Math.random() * others);
  return not >= 0 && i >= not ? i + 1 : i;
}

const easeOut = (part: number) => 1 - (1 - part) ** 3;

export function Biyahe({
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
  // The trip lives on this phone, so the server draws the map with no
  // jeepney and keeps the mission card's space until the browser reads it.
  const trip = useSyncExternalStore(subscribe, readTrip, () => null);
  const [mission, setMission] = useState(pickMission);
  const [turn, setTurn] = useState(0);
  const [cheerAt, setCheerAt] = useState<number | null>(null);
  const [driving, setDriving] = useState(false);
  const [message, setMessage] = useState('');
  const started = useRef(false);
  const lastDone = useRef(-Infinity);
  const justArrived = useRef(false);
  const frame = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const jeepRef = useRef<SVGGElement>(null);
  const seaRef = useRef<HTMLParagraphElement>(null);

  const stop = trip?.stop ?? null;
  const atSea = stop === LAST_STOP;

  useEffect(() => {
    if (!autoFocus) return;
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, [autoFocus]);

  useEffect(() => {
    if (!atSea || !justArrived.current) return;
    justArrived.current = false;
    seaRef.current?.focus({ preventScroll: true });
  }, [atSea]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    analyticsService.recordClick(`tool_mission_start_${source}`);
  };

  /** Drives the jeepney along the road from `from` to the next stop. */
  const drive = (from: number) => {
    cancelAnimationFrame(frame.current);
    const jeep = jeepRef.current;
    if (
      !jeep ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDriving(false);
      return;
    }
    setDriving(true);
    let start: number | undefined;
    const step = (now: number) => {
      start ??= now;
      const part = Math.min(1, (now - start) / DRIVE_MS);
      const { x, y, dx } = pointAlong(from, easeOut(part));
      jeep.setAttribute('transform', jeepTransform(x, y, dx));
      if (part < 1) frame.current = requestAnimationFrame(step);
      else setDriving(false);
    };
    frame.current = requestAnimationFrame(step);
  };

  const cheer = (at: number) =>
    t.next(t.cheers[at % t.cheers.length], STOP_NAMES[at + 1][lang]);

  const done = () => {
    if (!trip || trip.stop >= LAST_STOP) return;
    // A quick second tap counts once.
    const now = performance.now();
    if (now - lastDone.current < DRIVE_MS) return;
    lastDone.current = now;
    markStarted();
    analyticsService.recordClick(`tool_mission_done_${source}`);

    const from = trip.stop;
    const next = from + 1;
    const today = trip.today + 1;
    saveTrip({ stop: next, day: localDay(), today });
    drive(from);

    const status = `${t.status(next + 1, STOP_NAMES[next][lang])}.`;
    if (next === LAST_STOP) {
      analyticsService.recordClick(`tool_mission_trip_${source}`);
      justArrived.current = true;
      setCheerAt(null);
      setMessage(`${status} ${t.seaTitle}`);
      return;
    }
    const nextMission = pickMission(mission);
    setMission(nextMission);
    setTurn(turn + 1);
    setCheerAt(next);
    setMessage(
      [
        status,
        cheer(next),
        today === PLENTY ? t.plenty : '',
        t.newMission(MISSIONS[nextMission][lang]),
      ]
        .filter(Boolean)
        .join(' ')
    );
  };

  const another = () => {
    markStarted();
    const next = pickMission(mission);
    setMission(next);
    setTurn(turn + 1);
    setMessage(t.newMission(MISSIONS[next][lang]));
  };

  const newTrip = () => {
    cancelAnimationFrame(frame.current);
    lastDone.current = -Infinity;
    saveTrip({ stop: 0, day: localDay(), today: trip?.today ?? 0 });
    setDriving(false);
    setMission(pickMission(mission));
    setTurn(turn + 1);
    setCheerAt(null);
    setMessage(`${t.status(1, STOP_NAMES[0][lang])}.`);
    boxRef.current?.focus({ preventScroll: true });
  };

  const stopName = stop === null ? '' : STOP_NAMES[stop][lang];
  const mapLabel =
    stop === null ? t.map : atSea ? t.mapSea : t.mapAt(stop + 1, stopName);
  const isPlenty = trip !== null && trip.today >= PLENTY;

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className="rounded-2xl bg-[#EFF3E7] p-4 text-[#6E5F47] focus:outline-none sm:p-6 hb-panel-in"
    >
      <div className="mx-auto max-w-[26rem]">
        <p className="font-poppins text-sm font-bold tabular-nums">
          {stop === null ? BLANK : t.status(stop + 1, stopName)}
        </p>

        <div className="mt-3 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#DFE7CF]">
          <BiyaheMap
            stop={stop}
            driving={driving}
            lang={lang}
            label={mapLabel}
            jeepRef={jeepRef}
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {message}
        </p>

        {atSea ? (
          <div className="mt-4 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-[#DFE7CF] hb-step-in">
            <p
              ref={seaRef}
              tabIndex={-1}
              className="font-poppins text-lg font-bold focus:outline-none"
            >
              {t.seaTitle}
            </p>
            <p className="mt-1">{t.seaText}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={newTrip} className={primaryClass}>
                {t.again}
              </button>
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
            <p className="mt-3 min-h-5 text-center text-sm">
              {stop === null ? BLANK : cheerAt === stop ? cheer(stop) : t.hint}
            </p>
            {isPlenty && (
              <p className="mt-1 text-center text-sm hb-step-in">{t.plenty}</p>
            )}

            <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#DFE7CF]">
              <p className="font-poppins text-sm font-medium">{t.mission}</p>
              <p
                key={turn}
                className={`mt-1 min-h-14 font-poppins text-lg font-bold leading-7 ${
                  trip ? 'hb-step-in' : ''
                }`}
              >
                {trip ? MISSIONS[mission][lang] : BLANK}
              </p>
              <div
                className={`mt-4 flex flex-wrap gap-2 ${trip ? '' : 'invisible'}`}
              >
                <button
                  type="button"
                  onClick={done}
                  disabled={!trip}
                  className={primaryClass}
                >
                  {t.done}
                </button>
                <button
                  type="button"
                  onClick={another}
                  disabled={!trip}
                  className={quietClass}
                >
                  {t.another}
                </button>
              </div>
            </div>

            {onClose && (
              <div className="mt-3 text-center">
                <button type="button" onClick={onClose} className={quietClass}>
                  {t.close}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
