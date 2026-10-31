/**
 * Everyday Filipino things for the Find the pair cards, drawn flat in the
 * site's colours. Each has its own main colour, so pairs are easy to tell
 * apart at a glance.
 */

const BROWN = '#6E5F47';
const SAGE = '#AEC488';
const CREAM = '#FBF3DE';
const RED = '#D9644A';
const YELLOW = '#F4C152';

export const PAIR_ICONS = {
  mango: {
    name: {
      en: 'mango',
      tl: 'mangga',
      fr: 'mangue',
      de: 'Mango',
      es: 'mango',
      ko: '망고',
    },
    art: (
      <>
        <path
          d="M19 41C13 27 25 12 40 14c13 2 15 18 7 30-6 9-21 11-28-3Z"
          fill={YELLOW}
        />
        <path
          d="M23 40c-3-9 4-18 13-20"
          stroke="#FBE3A0"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M40 14c0-3 1.5-5.5 4-7"
          stroke={BROWN}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M42 10c6-6 14-4 16 0-6 4-12 4-16 0Z" fill={SAGE} />
      </>
    ),
  },
  parol: {
    name: {
      en: 'parol',
      tl: 'parol',
      fr: 'étoile de Noël',
      de: 'Weihnachtsstern',
      es: 'estrella navideña',
      ko: '크리스마스 별',
    },
    art: (
      <>
        <path d="M32 2v6" stroke={BROWN} strokeWidth="2" />
        <path
          d="M24 41c-2 6 2 10-1 16M40 41c2 6-2 10 1 16"
          stroke={YELLOW}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M32 37c-2 8 2 12 0 20"
          stroke={RED}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <polygon
          points="32,8 37.3,20.7 51,21.8 40.6,30.8 43.8,44.2 32,37 20.2,44.2 23.4,30.8 13,21.8 26.7,20.7"
          fill={RED}
          strokeLinejoin="round"
        />
        <polygon
          points="32,18 34.6,24.4 41.5,24.9 36.3,29.4 37.9,36.1 32,32.5 26.1,36.1 27.7,29.4 22.5,24.9 29.4,24.4"
          fill={YELLOW}
        />
        <circle cx="32" cy="28" r="3" fill={CREAM} />
      </>
    ),
  },
  jeepney: {
    name: {
      en: 'jeepney',
      tl: 'dyip',
      fr: 'bus',
      de: 'Bus',
      es: 'autobús',
      ko: '버스',
    },
    art: (
      <>
        <rect x="16" y="13" width="45" height="4" rx="2" fill={BROWN} />
        <path d="M18 17h40a3 3 0 0 1 3 3v24H18Z" fill="#91AFAA" />
        <path d="M18 27H9a6 6 0 0 0-6 6v11h15Z" fill="#7E9E99" />
        <path d="M8 27 10 21l2 6Z" fill="#DFE7CF" />
        <rect x="3" y="34" width="2.5" height="8" rx="1" fill={CREAM} />
        <rect x="21" y="20" width="7" height="7" rx="1.5" fill={CREAM} />
        <rect x="30" y="20" width="7" height="7" rx="1.5" fill={CREAM} />
        <rect x="39" y="20" width="7" height="7" rx="1.5" fill={CREAM} />
        <rect x="48" y="20" width="7" height="7" rx="1.5" fill={CREAM} />
        <rect x="57" y="20" width="4" height="24" fill="#5E7F7A" />
        <rect x="3" y="31" width="54" height="3" fill={RED} />
        <rect x="5" y="35.5" width="52" height="2" fill={YELLOW} />
        <circle cx="13" cy="45" r="5.5" fill={BROWN} />
        <circle cx="13" cy="45" r="2" fill="#DFE7CF" />
        <circle cx="49" cy="45" r="5.5" fill={BROWN} />
        <circle cx="49" cy="45" r="2" fill="#DFE7CF" />
      </>
    ),
  },
  tsinelas: {
    name: {
      en: 'tsinelas',
      tl: 'tsinelas',
      fr: 'tongs',
      de: 'Flip-Flops',
      es: 'chanclas',
      ko: '슬리퍼',
    },
    art: (
      <>
        <g transform="rotate(-9 22 33)">
          <rect x="14" y="11" width="16" height="44" rx="8" fill={SAGE} />
          <path
            d="M15.5 32 22 19l6.5 13"
            stroke={BROWN}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <g transform="rotate(9 42 33)">
          <rect x="34" y="11" width="16" height="44" rx="8" fill={SAGE} />
          <path
            d="M35.5 32 42 19l6.5 13"
            stroke={BROWN}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </>
    ),
  },
  'halo-halo': {
    name: {
      en: 'halo-halo',
      tl: 'halo-halo',
      fr: 'coupe glacée',
      de: 'Eisbecher',
      es: 'copa de helado',
      ko: '빙수',
    },
    art: (
      <>
        <path d="M18 24h28l-4 32H22Z" fill={CREAM} />
        <path d="M20.3 38h23.4l-.9 6H21Z" fill={SAGE} />
        <path d="M21 44h22l-.8 6H21.8Z" fill={YELLOW} />
        <path d="M21.8 50h20.4l-.7 6H22.5Z" fill={RED} />
        <path
          d="M18 24h28l-4 32H22Z"
          stroke={BROWN}
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="32" cy="21" r="9" fill="#8E6BA8" />
        <rect x="27" y="10" width="10" height="5" rx="2" fill={YELLOW} />
        <path
          d="M45 5l-6 19"
          stroke={BROWN}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'bahay-kubo': {
    name: {
      en: 'bahay kubo',
      tl: 'bahay kubo',
      fr: 'cabane',
      de: 'Hütte',
      es: 'cabaña',
      ko: '오두막',
    },
    art: (
      <>
        <path
          d="M19 46v11M45 46v11M8 57h48"
          stroke={BROWN}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="16"
          y="30"
          width="32"
          height="16"
          fill="#E8D3A6"
          stroke={BROWN}
          strokeWidth="1.5"
        />
        <path d="M21 31v14M43 31v14" stroke="#C9A46A" strokeWidth="1.5" />
        <rect x="27" y="34" width="10" height="8" rx="1" fill={BROWN} />
        <path
          d="M7 33 32 9l25 24Z"
          fill="#C9A46A"
          stroke={BROWN}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M32 12 24 32M32 12l8 20M32 12v20"
          stroke="#A8844C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  tabo: {
    name: {
      en: 'tabo',
      tl: 'tabo',
      fr: 'écope',
      de: 'Schöpfkelle',
      es: 'cucharón',
      ko: '바가지',
    },
    art: (
      <>
        <path
          d="M42 31 56 20a2.5 2.5 0 0 1 3.6.6l.6 1a2.5 2.5 0 0 1-.7 3.3L44 37Z"
          fill="#4A84BD"
        />
        <path
          d="M14 27h30l-3 25a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3Z"
          fill="#5B93C9"
        />
        <ellipse cx="29" cy="27" rx="15" ry="4" fill="#7FB0DB" />
        <ellipse cx="29" cy="27" rx="11.5" ry="2.5" fill="#3F78AE" />
        <path
          d="M22 34v14"
          stroke="#7FB0DB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  kape: {
    name: {
      en: 'coffee',
      tl: 'kape',
      fr: 'café',
      de: 'Kaffee',
      es: 'café',
      ko: '커피',
    },
    art: (
      <>
        <path
          d="M23 21c-2-3 2-5 0-9M31 21c-2-3 2-5 0-9M39 21c-2-3 2-5 0-9"
          stroke="#91AFAA"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="31" cy="53" rx="22" ry="4" fill="#DFE7CF" />
        <path
          d="M46 32c6 0 8 3 8 6.5S52 45 46 45"
          stroke={BROWN}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M15 27h32v13c0 6-5 11-11 11H26c-6 0-11-5-11-11Z"
          fill={CREAM}
          stroke={BROWN}
          strokeWidth="2"
        />
        <ellipse cx="31" cy="27" rx="16" ry="3" fill={BROWN} />
      </>
    ),
  },
} as const;

export type PairIconId = keyof typeof PAIR_ICONS;

export const PAIR_ICON_IDS = Object.keys(PAIR_ICONS) as PairIconId[];

export function PairIcon({
  id,
  className,
  style,
}: {
  id: PairIconId;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} style={style}>
      {PAIR_ICONS[id].art}
    </svg>
  );
}
