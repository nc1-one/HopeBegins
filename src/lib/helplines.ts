/**
 * Free crisis and listening lines by country, for the country the visitor's
 * phone is in (see detectLocale.ts). Checked against each service's own page
 * on the date below; dial-test before going live and recheck yearly. A
 * country is left out rather than guessed: visitors elsewhere are sent to
 * findahelpline.com.
 */

export const HELPLINES_CHECKED = '2026-10-30';

/** An international directory of free helplines, for everywhere else. */
export const FIND_A_HELPLINE = 'https://findahelpline.com';

export interface HelpLine {
  /** The line's own name, as the service writes it. */
  name: string;
  /** The number as people there write it. */
  number: string;
  /** For tel: links. */
  tel: string;
  /** Other numbers for the same line, such as one per mobile network. */
  also?: { number: string; tel: string; label?: string }[];
  /** Open 24 hours, every day. */
  allDay: boolean;
  /** When allDay is false: opening hours, in English. */
  hours?: string;
  kind: 'crisis' | 'listening';
  free: boolean;
  /** A chat on the service's own site. */
  chat?: string;
  /** The service's own page that confirms the number. */
  source: string;
}

export interface CountryHelp {
  code: string;
  /** Police and ambulance, in immediate danger. */
  emergency: string;
  /** The crisis line first. */
  lines: HelpLine[];
}

export const COUNTRY_HELP: Record<string, CountryHelp> = {
  PH: {
    code: 'PH',
    emergency: '911',
    lines: [
      {
        name: 'NCMH Crisis Hotline',
        number: '1553',
        tel: '1553',
        also: [
          { number: '0917 899 8727', tel: '+639178998727', label: 'Globe/TM' },
          { number: '0966 351 4518', tel: '+639663514518', label: 'Globe/TM' },
          { number: '0919 057 1553', tel: '+639190571553', label: 'Smart/TNT' },
          { number: '1800 1888 1553', tel: '180018881553' },
        ],
        allDay: true,
        kind: 'crisis',
        free: true,
        source: 'https://ncmh.gov.ph/contact-us/',
      },
      {
        name: 'In Touch Crisis Line',
        number: '(02) 8893 7603',
        tel: '+63288937603',
        also: [
          { number: '0919 056 0709', tel: '+639190560709' },
          { number: '0917 800 1123', tel: '+639178001123' },
        ],
        allDay: true,
        kind: 'crisis',
        free: true,
        source: 'https://in-touch.org/contact/',
      },
      {
        name: 'Hopeline PH',
        number: '(02) 8804 4673',
        tel: '+63288044673',
        also: [
          { number: '0917 558 4673', tel: '+639175584673' },
          { number: '0918 873 4673', tel: '+639188734673' },
        ],
        allDay: true,
        kind: 'crisis',
        free: true,
        source: 'https://in-touch.org/contact/',
      },
    ],
  },
};

/** The free crisis line for a country, if the site has one for it. */
export const crisisLineIn = (country: string | null | undefined) =>
  country
    ? COUNTRY_HELP[country]?.lines.find((line) => line.kind === 'crisis')
    : undefined;
