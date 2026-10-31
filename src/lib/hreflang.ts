import { LANG_INFO, LANGS } from './i18n';
import { pathInLang } from './intlRoutes';
import { isTwinReady, TAGLISH_TWINS } from './taglishTwins';

/**
 * hreflang for a page: its address in every language it exists in, and the
 * English page for everyone else. A Taglish version counts only at its own
 * address, once that address may be indexed (see taglishTwins.ts).
 */
export function hreflang(english: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    const path = pathInLang(english, lang);
    if (!path) continue;
    if (lang === 'tl') {
      const twin = Object.values(TAGLISH_TWINS).find((t) => t.en === english);
      if (path === english || (twin && !isTwinReady(twin))) continue;
    }
    languages[LANG_INFO[lang].hreflang] = path;
  }
  languages['x-default'] = english;
  return languages;
}
