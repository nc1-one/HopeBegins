import { LANG_INFO, type Lang } from './i18n';

/*
 * The visitor's language and country, read from the phone's own settings:
 * its languages and its time zone. Nothing is looked up online. Only the
 * country leaves the phone, as one anonymous count per visit
 * (analyticsService.recordCountry) and with an email someone asks for.
 */

const BY_LANGUAGE: Record<string, Lang> = {
  en: 'en',
  fil: 'tl',
  tl: 'tl',
  fr: 'fr',
  de: 'de',
  es: 'es',
  ko: 'ko',
};

// Time zones of the countries with helplines in helplines.ts. A name ending
// in "/" covers every zone under it.
const ZONES: Record<string, string[]> = {
  PH: ['Asia/Manila'],
  US: [
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/',
    'America/Indiana/',
    'America/Chicago',
    'America/Menominee',
    'America/North_Dakota/',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'America/Puerto_Rico',
    'Pacific/Honolulu',
  ],
  CA: [
    'America/Toronto',
    'America/Montreal',
    'America/Vancouver',
    'America/Edmonton',
    'America/Winnipeg',
    'America/Regina',
    'America/Halifax',
    'America/St_Johns',
    'America/Moncton',
    'America/Whitehorse',
    'America/Yellowknife',
    'America/Iqaluit',
  ],
  GB: ['Europe/London'],
  IE: ['Europe/Dublin'],
  AU: ['Australia/'],
  NZ: ['Pacific/Auckland', 'Pacific/Chatham'],
  SG: ['Asia/Singapore'],
  FR: ['Europe/Paris'],
  BE: ['Europe/Brussels'],
  CH: ['Europe/Zurich'],
  LU: ['Europe/Luxembourg'],
  DE: ['Europe/Berlin', 'Europe/Busingen'],
  AT: ['Europe/Vienna'],
  ES: ['Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary'],
  MX: [
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Chihuahua',
    'America/Ciudad_Juarez',
    'America/Ojinaga',
    'America/Mazatlan',
    'America/Bahia_Banderas',
    'America/Hermosillo',
    'America/Tijuana',
  ],
  CO: ['America/Bogota'],
  AR: ['America/Argentina/', 'America/Buenos_Aires'],
  CL: ['America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter'],
  PE: ['America/Lima'],
  EC: ['America/Guayaquil', 'Pacific/Galapagos'],
  KR: ['Asia/Seoul'],
};

/** For a phone in a language the site doesn't speak: the country's language. */
const LANG_BY_COUNTRY: Record<string, Lang> = {
  FR: 'fr',
  BE: 'fr',
  LU: 'fr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  ES: 'es',
  MX: 'es',
  CO: 'es',
  AR: 'es',
  CL: 'es',
  PE: 'es',
  EC: 'es',
  KR: 'ko',
};

function phoneLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return [];
  return navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
}

/**
 * The country the phone is in, by its time zone, or failing that by the
 * region in its language setting ("es-MX"). Undefined when neither names a
 * country the site has helplines for.
 */
export function detectCountry(): string | undefined {
  let zone = '';
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  } catch {
    // No time zone: go by the language setting.
  }
  const byZone = Object.entries(ZONES).find(([, zones]) =>
    zones.some((name) =>
      name.endsWith('/') ? zone.startsWith(name) : zone === name
    )
  );
  if (byZone) return byZone[0];
  for (const tag of phoneLanguages()) {
    const region = tag.split('-')[1]?.toUpperCase();
    if (region && region in ZONES) return region;
  }
  return undefined;
}

/**
 * The first language the phone is set to that the site speaks. A phone set
 * only to other languages gets its country's language, or English.
 */
export function detectLanguage(): Lang {
  for (const tag of phoneLanguages()) {
    const lang = BY_LANGUAGE[tag.toLowerCase().split('-')[0]];
    if (lang) return lang;
  }
  return LANG_BY_COUNTRY[detectCountry() ?? ''] ?? 'en';
}

/** The country to assume for a language before the phone is asked. */
export const defaultCountry = (lang: Lang) => LANG_INFO[lang].country;
