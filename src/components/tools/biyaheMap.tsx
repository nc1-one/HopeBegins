import type { Ref } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { PAIR_ICONS } from './pairIcons';

/**
 * The Biyahe map: a winding road from home to the sea, drawn flat in the
 * site's colours. The road is made of one curve between each pair of stops,
 * so the jeepney can follow the same curve when it drives to the next stop.
 */

type Point = readonly [number, number];
type Curve = readonly [Point, Point, Point, Point];

// Each language has its own ordinary stops on the way to the sea: the corner
// shop, the market, the square or park, the church, the fields, the hills.
export const STOP_NAMES = [
  {
    en: 'Home',
    tl: 'Bahay',
    fr: 'Maison',
    de: 'Zuhause',
    es: 'Casa',
    ko: '집',
  },
  {
    en: 'Corner store',
    tl: 'Sari-sari store',
    fr: 'Boulangerie',
    de: 'Bäckerei',
    es: 'Tienda',
    ko: '편의점',
  },
  {
    en: 'Market',
    tl: 'Palengke',
    fr: 'Marché',
    de: 'Markt',
    es: 'Mercado',
    ko: '시장',
  },
  { en: 'Plaza', tl: 'Plaza', fr: 'Parc', de: 'Park', es: 'Plaza', ko: '공원' },
  {
    en: 'Chapel',
    tl: 'Kapilya',
    fr: 'Église',
    de: 'Kirche',
    es: 'Iglesia',
    ko: '교회',
  },
  {
    en: 'Rice fields',
    tl: 'Palayan',
    fr: 'Champs',
    de: 'Felder',
    es: 'Campos',
    ko: '논밭',
  },
  {
    en: 'Hills',
    tl: 'Burol',
    fr: 'Collines',
    de: 'Hügel',
    es: 'Cerros',
    ko: '언덕',
  },
  {
    en: 'The sea',
    tl: 'Dagat',
    fr: 'La mer',
    de: 'Meer',
    es: 'El mar',
    ko: '바다',
  },
] as const;

export const STOP_COUNT = STOP_NAMES.length;
export const LAST_STOP = STOP_COUNT - 1;

// Each curve starts at a stop and ends at the next one: three rows that wind
// right, back left, then right again down to the beach.
const CURVES: readonly Curve[] = [
  [
    [26, 44],
    [56, 44],
    [70, 34],
    [100, 34],
  ],
  [
    [100, 34],
    [130, 34],
    [148, 42],
    [178, 42],
  ],
  [
    [178, 42],
    [286, 42],
    [286, 98],
    [200, 98],
  ],
  [
    [200, 98],
    [170, 98],
    [146, 102],
    [116, 102],
  ],
  [
    [116, 102],
    [4, 102],
    [4, 152],
    [56, 152],
  ],
  [
    [56, 152],
    [90, 152],
    [114, 146],
    [148, 146],
  ],
  [
    [148, 146],
    [182, 146],
    [204, 150],
    [238, 150],
  ],
];

const STOPS: readonly Point[] = [CURVES[0][0], ...CURVES.map((c) => c[3])];

// The drawn road runs a little past the last stop, onto the sand.
const ROAD = `M${STOPS[0].join(' ')} ${CURVES.map(
  ([, a, b, c]) => `C${a.join(' ')} ${b.join(' ')} ${c.join(' ')}`
).join(' ')} C246 150 252 151 258 152`;

function onCurve([p0, p1, p2, p3]: Curve, t: number) {
  const u = 1 - t;
  const at = (i: 0 | 1) =>
    u * u * u * p0[i] +
    3 * u * u * t * p1[i] +
    3 * u * t * t * p2[i] +
    t * t * t * p3[i];
  const dx =
    3 * u * u * (p1[0] - p0[0]) +
    6 * u * t * (p2[0] - p1[0]) +
    3 * t * t * (p3[0] - p2[0]);
  return { x: at(0), y: at(1), dx };
}

// Distance along each curve at even steps, so the jeepney keeps an even
// speed through the bends instead of rushing the straight parts.
const SAMPLES = 32;
const LENGTHS = CURVES.map((curve) => {
  const lengths = [0];
  let last = onCurve(curve, 0);
  for (let i = 1; i <= SAMPLES; i++) {
    const next = onCurve(curve, i / SAMPLES);
    lengths.push(lengths[i - 1] + Math.hypot(next.x - last.x, next.y - last.y));
    last = next;
  }
  return lengths;
});

/** A point part of the way (0 to 1) along the road from `from` to the next stop. */
export function pointAlong(from: number, part: number) {
  const lengths = LENGTHS[from];
  const target = part * lengths[SAMPLES];
  let i = 1;
  while (i < SAMPLES && lengths[i] < target) i++;
  const span = lengths[i] - lengths[i - 1];
  const t =
    (i - 1 + (span > 0 ? (target - lengths[i - 1]) / span : 0)) / SAMPLES;
  return onCurve(CURVES[from], Math.min(1, Math.max(0, t)));
}

/** The jeepney is drawn facing left, so it flips when the road goes right. */
export function jeepTransform(x: number, y: number, dx: number) {
  return `translate(${x.toFixed(1)} ${y.toFixed(1)})${dx > 0 ? ' scale(-1 1)' : ''}`;
}

/** Parked at a stop, facing the way the road goes next. */
function parkedTransform(stop: number) {
  const [x, y] = STOPS[stop];
  const dx =
    stop < CURVES.length
      ? CURVES[stop][1][0] - CURVES[stop][0][0]
      : CURVES[stop - 1][3][0] - CURVES[stop - 1][2][0];
  return jeepTransform(x, y, dx);
}

const SEA_STYLE = `
@keyframes hb-biyahe-shimmer {
  0%, 100% { opacity: 0.35; transform: translateX(-2px); }
  50% { opacity: 0.9; transform: translateX(2px); }
}
.hb-biyahe-shimmer { animation: hb-biyahe-shimmer 3.6s ease-in-out infinite; }
.hb-biyahe-pop {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: hb-pop var(--hb-slow) var(--hb-ease-out) 900ms both;
}
@media (prefers-reduced-motion: reduce) {
  .hb-biyahe-shimmer, .hb-biyahe-pop { animation: none; }
}
`;

const WAVES = [
  'M300 116q4-3 8 0t8 0',
  'M288 130q5-3 10 0t10 0',
  'M292 148q5-3 10 0t10 0',
  'M282 166q5-3 10 0t10 0',
];

const RICE: readonly Point[] = [
  [86, 137],
  [98, 133],
  [110, 137],
  [122, 133],
];

function CoconutTree({
  x,
  y,
  size = 1,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path
        d="M0 0C1-10-1-22-4-30"
        stroke="#A8844C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M-4-30C-10-36-18-34-22-27C-16-31-10-31-4-30Z" fill="#8FAA6A" />
      <path d="M-4-30C2-37 11-36 15-29C9-32 3-32-4-30Z" fill="#8FAA6A" />
      <path d="M-4-30C-7-38-4-44 2-46C-2-40-3-35-4-30Z" fill="#AEC488" />
      <path d="M-4-30C-12-33-16-40-15-45C-11-39-8-35-4-30Z" fill="#AEC488" />
      <circle cx="-5.5" cy="-28" r="1.8" fill="#6E5F47" />
      <circle cx="-2.5" cy="-27.5" r="1.8" fill="#6E5F47" />
    </g>
  );
}

export function BiyaheMap({
  stop,
  driving,
  lang,
  label,
  jeepRef,
}: {
  /** The stop the jeepney is at, or null before this phone's trip is read. */
  stop: number | null;
  /** On its way to `stop`, so that stop is still showing. */
  driving: boolean;
  lang: FeelingLang;
  label: string;
  /** The moving jeepney, so the game can drive it between stops. */
  jeepRef: Ref<SVGGElement>;
}) {
  const atSea = stop === LAST_STOP;
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label={label}
      className="block aspect-[16/9] h-auto w-full"
    >
      <style>{SEA_STYLE}</style>

      {/* Hills behind the first bend */}
      <path
        d="M192 42C212 18 238 8 262 22C278 8 302 4 320 12V66C298 60 270 54 250 50C226 46 208 44 192 42Z"
        fill="#E6EDDB"
      />
      <path
        d="M226 48C244 28 268 24 290 36C300 30 312 28 320 30V68C296 62 258 54 226 48Z"
        fill="#D2DFBC"
      />

      {/* A rice paddy and a low hill by their stops */}
      {RICE.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y}c0-3-1-5-4-7M${x} ${y}c0-3 0-6 1-9M${x} ${y}c0-3 1-5 4-6`}
          stroke="#AEC488"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <path
        d="M134 142C144 126 158 120 170 130C178 122 192 122 202 142Z"
        fill="#E6EDDB"
      />

      {/* Beach and sea at the end of the road */}
      <path
        d="M320 88C292 92 270 104 260 120C250 136 252 160 242 180H320Z"
        fill="#FBF3DE"
      />
      <path
        d="M320 102C300 106 286 116 278 130C270 144 276 162 266 180H320Z"
        fill="#91AFAA"
      />
      {WAVES.map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="#FCFDFA"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity={atSea ? undefined : 0.6}
          className={atSea ? 'hb-biyahe-shimmer' : undefined}
          style={atSea ? { animationDelay: `${i * 450}ms` } : undefined}
        />
      ))}
      <CoconutTree x={298} y={100} />
      <CoconutTree x={312} y={94} size={0.8} />

      {/* The road: a soft edge, the road, and a dashed centre line */}
      <path
        d={ROAD}
        stroke="#CFDCB8"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={ROAD}
        stroke="#DFE7CF"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={ROAD}
        stroke="#FCFDFA"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />

      {STOPS.map(([x, y], i) => {
        const reached = stop !== null && i <= stop;
        // The parked jeepney covers its stop.
        const covered = i === stop && !driving;
        return (
          <g key={i}>
            {!covered && (
              <circle
                cx={x}
                cy={y}
                r="5.5"
                fill={reached ? '#6E5F47' : '#AEC488'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            )}
            <text
              x={x}
              y={y + 17}
              textAnchor="middle"
              fontSize="10"
              fontWeight={i === stop ? 700 : 500}
              fill="#6E5F47"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
              paintOrder="stroke"
              className="font-poppins"
            >
              {STOP_NAMES[i][lang]}
            </text>
          </g>
        );
      })}

      {stop !== null && (
        <g ref={jeepRef} transform={parkedTransform(stop)}>
          <g className={atSea ? 'hb-biyahe-pop' : undefined}>
            <ellipse
              cx="0"
              cy="3"
              rx="15"
              ry="2.5"
              fill="#6E5F47"
              opacity="0.15"
            />
            <svg x="-20" y="-28" width="40" height="40" viewBox="0 0 64 64">
              {PAIR_ICONS.jeepney.art}
            </svg>
          </g>
        </g>
      )}
    </svg>
  );
}
