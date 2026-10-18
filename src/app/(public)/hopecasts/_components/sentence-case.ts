// Words that keep a capital letter when an all-caps title is lowered.
const PROPER: Record<string, string> = {
  i: 'I',
  god: 'God',
  jesus: 'Jesus',
  christ: 'Christ',
  lord: 'Lord',
  bible: 'Bible',
  diyos: 'Diyos',
  hesus: 'Hesus',
  panginoon: 'Panginoon',
  kristo: 'Kristo',
  filipino: 'Filipino',
  filipinos: 'Filipinos',
  pinoy: 'Pinoy',
  philippines: 'Philippines',
  hopebegins: 'HopeBegins',
  hopecast: 'HopeCast',
  hopecasts: 'HopeCasts',
};

/**
 * Turns an all-caps title ("HOPE IS A DECISION") into sentence case
 * ("Hope is a decision"), keeping names like God and Jesus capitalised.
 * Anything that is not entirely upper case is returned as it is.
 */
export function toSentenceCase(text: string): string {
  if (!/\p{Lu}/u.test(text) || text !== text.toUpperCase()) return text;

  let capitalizeNext = true;
  const lowered = text.toLowerCase().replace(/[\p{L}'’]+|[.!?]/gu, (token) => {
    if (/^[.!?]$/.test(token)) {
      capitalizeNext = true;
      return token;
    }
    const [base, ...rest] = token.split(/(['’])/);
    let word = PROPER[base] ? PROPER[base] + rest.join('') : token;
    if (capitalizeNext) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      capitalizeNext = false;
    }
    return word;
  });

  return lowered
    .replace(/\b[Hh]oly spirit\b/g, 'Holy Spirit')
    .replace(/\b[Ee]spiritu santo\b/g, 'Espiritu Santo');
}
