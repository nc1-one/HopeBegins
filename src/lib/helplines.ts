/**
 * Free crisis and listening lines by country, for the country the visitor's
 * phone is in (see detectLocale.ts). Only official lines: each is run or
 * named by a government or health ministry, and `source` is the ministry's
 * or the service's own page, checked on the date below. Dial-test from a
 * local phone before relying on a number, and recheck yearly.
 *
 * Visitors anywhere else are sent to Find A Helpline (findahelpline.com),
 * the directory the International Association for Suicide Prevention points
 * to, with their local emergency number.
 */

export const HELPLINES_CHECKED = '2026-10-30';

/** The directory IASP points to, for countries not listed here. */
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
  /** Free to call. Lines that may cost a call are marked false. */
  free: boolean;
  /** Chat or text on the service's own channel. */
  chat?: string;
  /** The service's or ministry's own page that confirms the number. */
  source: string;
}

export interface CountryHelp {
  code: string;
  /** Police and ambulance, in immediate danger. */
  emergency: string;
  /** The crisis line first. */
  lines: HelpLine[];
}

const allDayCrisis = { allDay: true, kind: 'crisis', free: true } as const;

export const COUNTRY_HELP: Record<string, CountryHelp> = {
  PH: {
    code: 'PH',
    emergency: '911',
    lines: [
      {
        // The mobile numbers are charged as normal calls.
        name: 'NCMH Crisis Hotline',
        number: '1553',
        tel: '1553',
        also: [
          { number: '0917 899 8727', tel: '+639178998727', label: 'Globe/TM' },
          { number: '0966 351 4518', tel: '+639663514518', label: 'Globe/TM' },
          { number: '0919 057 1553', tel: '+639190571553', label: 'Smart/TNT' },
          { number: '1800 1888 1553', tel: '180018881553' },
        ],
        ...allDayCrisis,
        source: 'https://ncmh.gov.ph/contact-us/',
      },
    ],
  },
  US: {
    code: 'US',
    emergency: '911',
    lines: [
      {
        // In Spanish too: press 2, or text AYUDA to 988.
        name: '988 Suicide & Crisis Lifeline',
        number: '988',
        tel: '988',
        ...allDayCrisis,
        chat: 'https://chat.988lifeline.org/',
        source: 'https://988lifeline.org/',
      },
    ],
  },
  CA: {
    code: 'CA',
    emergency: '911',
    lines: [
      {
        name: '9-8-8: Suicide Crisis Helpline',
        number: '988',
        tel: '988',
        ...allDayCrisis,
        chat: 'sms:988',
        source: 'https://988.ca/',
      },
    ],
  },
  GB: {
    code: 'GB',
    emergency: '999',
    lines: [
      {
        name: 'Samaritans',
        number: '116 123',
        tel: '116123',
        ...allDayCrisis,
        source: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/',
      },
    ],
  },
  IE: {
    code: 'IE',
    emergency: '112',
    lines: [
      {
        name: 'Pieta 24-Hour Crisis Helpline',
        number: '1800 247 247',
        tel: '+3531800247247',
        ...allDayCrisis,
        source: 'https://www.pieta.ie/',
      },
      {
        name: 'Samaritans',
        number: '116 123',
        tel: '116123',
        allDay: true,
        kind: 'listening',
        free: true,
        source: 'https://www.samaritans.org/ireland/samaritans-ireland/',
      },
    ],
  },
  AU: {
    code: 'AU',
    emergency: '000',
    lines: [
      {
        name: 'Lifeline',
        number: '13 11 14',
        tel: '131114',
        ...allDayCrisis,
        chat: 'https://www.lifeline.org.au/chat',
        source: 'https://www.lifeline.org.au/131114/',
      },
    ],
  },
  NZ: {
    code: 'NZ',
    emergency: '111',
    lines: [
      {
        name: '1737, Need to talk?',
        number: '1737',
        tel: '1737',
        ...allDayCrisis,
        chat: 'sms:1737',
        source:
          'https://www.healthnz.govt.nz/health-topics/mental-health/where-to-get-help',
      },
      {
        name: 'Depression Helpline',
        number: '0800 111 757',
        tel: '+64800111757',
        allDay: true,
        kind: 'listening',
        free: true,
        chat: 'sms:4202',
        source: 'https://depression.org.nz/get-help/',
      },
    ],
  },
  SG: {
    code: 'SG',
    emergency: '995',
    lines: [
      {
        name: 'Samaritans of Singapore (SOS)',
        number: '1767',
        tel: '1767',
        ...allDayCrisis,
        chat: 'https://wa.me/6591511767',
        source: 'https://www.sos.org.sg/faq/',
      },
    ],
  },
  FR: {
    code: 'FR',
    emergency: '112',
    lines: [
      {
        name: 'Numéro national de prévention du suicide',
        number: '3114',
        tel: '3114',
        ...allDayCrisis,
        source: 'https://3114.fr/',
      },
    ],
  },
  BE: {
    code: 'BE',
    emergency: '112',
    lines: [
      {
        name: 'Centre de Prévention du Suicide',
        number: '0800 32 123',
        tel: '+3280032123',
        ...allDayCrisis,
        source: 'https://www.preventionsuicide.be/la-ligne-decoute-0800-32-123',
      },
      {
        name: 'Télé-Accueil',
        number: '107',
        tel: '107',
        allDay: true,
        kind: 'listening',
        free: true,
        chat: 'https://tele-accueil.be/quelquun-a-qui-parler#parler-chat',
        source: 'https://tele-accueil.be/quelquun-a-qui-parler',
      },
    ],
  },
  CH: {
    code: 'CH',
    emergency: '144',
    lines: [
      {
        // Phone companies may charge for the call.
        name: 'La Main Tendue / Die Dargebotene Hand',
        number: '143',
        tel: '143',
        allDay: true,
        kind: 'crisis',
        free: false,
        chat: 'https://www.143.ch/fr/chat-suisse-romandie/',
        source: 'https://www.143.ch/fr/un-dialogue-aide-souvent-a-avancer/',
      },
    ],
  },
  LU: {
    code: 'LU',
    emergency: '112',
    lines: [
      {
        // Luxembourg has no 24/7 line; this is the national one.
        name: 'SOS Détresse',
        number: '45 45 45',
        tel: '+352454545',
        allDay: false,
        hours: 'Every day, 11:00 to 23:00 (Fri and Sat until 3:00)',
        kind: 'crisis',
        free: false,
        source: 'https://454545.lu/notre-offre/telephone/',
      },
    ],
  },
  DE: {
    code: 'DE',
    emergency: '112',
    lines: [
      {
        name: 'TelefonSeelsorge',
        number: '0800 111 0 111',
        tel: '+498001110111',
        also: [
          { number: '0800 111 0 222', tel: '+498001110222' },
          { number: '116 123', tel: '116123' },
        ],
        ...allDayCrisis,
        chat: 'https://www.telefonseelsorge.de/chat/',
        source: 'https://www.telefonseelsorge.de/telefon/',
      },
    ],
  },
  AT: {
    code: 'AT',
    emergency: '144',
    lines: [
      {
        name: 'Telefonseelsorge, Notruf 142',
        number: '142',
        tel: '142',
        ...allDayCrisis,
        chat: 'https://chat.onlineberatung-telefonseelsorge.at/hc/de/p/chat',
        source: 'https://www.telefonseelsorge.at/',
      },
      {
        name: 'Ö3-Kummernummer',
        number: '116 123',
        tel: '116123',
        allDay: false,
        hours: 'Every day, 16:00 to 24:00',
        kind: 'listening',
        free: true,
        source:
          'https://www.roteskreuz.at/wien/ich-brauche-hilfe/telefonische-beratung',
      },
    ],
  },
  MX: {
    code: 'MX',
    emergency: '911',
    lines: [
      {
        name: 'Línea de la Vida',
        number: '800 911 2000',
        tel: '+528009112000',
        ...allDayCrisis,
        source:
          'https://www.gob.mx/conasama/articulos/linea-de-la-vida-800-911-2000',
      },
    ],
  },
  CO: {
    code: 'CO',
    emergency: '123',
    lines: [
      {
        name: 'Línea 106',
        number: '106',
        tel: '106',
        ...allDayCrisis,
        source:
          'https://minsalud.gov.co/salud/publica/salud-mental/Paginas/linea-106.aspx',
      },
    ],
  },
  AR: {
    code: 'AR',
    emergency: '911',
    lines: [
      {
        name: 'Línea Nacional de Orientación y Apoyo en la Urgencia de Salud Mental',
        number: '0800 999 0091',
        tel: '+548009990091',
        ...allDayCrisis,
        source: 'https://www.argentina.gob.ar/dispositivo-0800',
      },
    ],
  },
  CL: {
    code: 'CL',
    emergency: '131',
    lines: [
      {
        // From mobiles only. iPhones won't dial * from a link, so the
        // number always shows as text too.
        name: 'Línea de Prevención del Suicidio *4141',
        number: '*4141',
        tel: '*4141',
        ...allDayCrisis,
        source:
          'https://www.minsal.cl/linea-de-atencion-4141-no-estas-solo-no-estas-sola/',
      },
    ],
  },
  PE: {
    code: 'PE',
    emergency: '106',
    lines: [
      {
        name: 'Línea 113 Salud, opción 5 (salud mental)',
        number: '113',
        tel: '113',
        ...allDayCrisis,
        source:
          'https://www.gob.pe/555-linea-113-salud-recibir-orientacion-e-informacion-en-salud',
      },
    ],
  },
  EC: {
    code: 'EC',
    emergency: '911',
    lines: [
      {
        name: 'Línea 171, opción 6 (salud mental)',
        number: '171',
        tel: '171',
        allDay: false,
        hours: 'Every day, 7:00 to 20:00',
        kind: 'crisis',
        free: true,
        source:
          'https://www.salud.gob.ec/a-traves-de-la-linea-171-msp-ofrece-atencion-en-salud-mental/',
      },
    ],
  },
  ES: {
    code: 'ES',
    emergency: '112',
    lines: [
      {
        name: '024. Línea de atención a la conducta suicida',
        number: '024',
        tel: '024',
        ...allDayCrisis,
        chat: 'https://www2.cruzroja.es/web/cruzroja/chat-linea024',
        source: 'https://www.sanidad.gob.es/linea024/home.htm',
      },
    ],
  },
  KR: {
    code: 'KR',
    emergency: '119',
    lines: [
      {
        name: '자살예방상담전화',
        number: '109',
        tel: '109',
        ...allDayCrisis,
        chat: 'https://www.129.go.kr/etc/madlan',
        source: 'https://www.129.go.kr/109',
      },
    ],
  },
};

/** The free crisis line for a country, if the site has one for it. */
export const crisisLineIn = (country: string | null | undefined) =>
  country
    ? COUNTRY_HELP[country]?.lines.find((line) => line.kind === 'crisis')
    : undefined;
