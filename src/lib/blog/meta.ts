import type { FeelingLang } from '../feelingPages';
import type { StoryTheme } from './types';

/*
 * What the parts of the site that load everywhere (visit counts, the crisis
 * band, the admin dashboard) need to know about the blog. Kept apart from
 * the stories so their text stays out of every page's JavaScript. index.ts
 * checks STORY_META against the stories, so the build fails if the two ever
 * disagree; the scratchpad's gen-meta.mjs rewrites it from the stories.
 */

export const BLOG_PATH = '/blog';
/** The blog's name; the menu calls it Blog. */
export const BLOG_NAME = 'Stories of Hope';

export const THEMES: Record<FeelingLang, Record<StoryTheme, string>> = {
  en: {
    anxiety: 'Anxiety',
    pressure: 'Pressure and burnout',
    lonely: 'Loneliness',
    loss: 'Grief and heartbreak',
    low: 'Feeling low',
    faith: 'Faith',
    'new-start': 'Starting over',
  },
  tl: {
    anxiety: 'Anxiety',
    pressure: 'Pressure at burnout',
    lonely: 'Lungkot at pag-iisa',
    loss: 'Pagluluksa at heartbreak',
    low: 'Mabigat ang loob',
    faith: 'Pananampalataya',
    'new-start': 'Pagsisimula ulit',
  },
  fr: {
    anxiety: 'Anxiété',
    pressure: 'Pression et burn-out',
    lonely: 'Solitude',
    loss: 'Deuil et chagrin d’amour',
    low: 'Moral en berne',
    faith: 'Foi',
    'new-start': 'Nouveau départ',
  },
  de: {
    anxiety: 'Angst',
    pressure: 'Druck und Burnout',
    lonely: 'Einsamkeit',
    loss: 'Trauer und Liebeskummer',
    low: 'Gedrückte Stimmung',
    faith: 'Glaube',
    'new-start': 'Neuanfang',
  },
  es: {
    anxiety: 'Ansiedad',
    pressure: 'Presión y agotamiento',
    lonely: 'Soledad',
    loss: 'Duelo y desamor',
    low: 'Ánimo bajo',
    faith: 'Fe',
    'new-start': 'Volver a empezar',
  },
  ko: {
    anxiety: '불안',
    pressure: '압박감과 번아웃',
    lonely: '외로움',
    loss: '상실과 이별',
    low: '우울감',
    faith: '신앙',
    'new-start': '다시 시작하기',
  },
};

export const THEME_IDS = Object.keys(THEMES.en) as StoryTheme[];

interface StoryMeta {
  lang: FeelingLang;
  theme: StoryTheme;
}

/** Every story's slug, language and theme. */
export const STORY_META: Record<string, StoryMeta> = {
  'stop-overthinking-at-night': { lang: 'en', theme: 'anxiety' },
  'pagod-na-sa-trabaho': { lang: 'tl', theme: 'pressure' },
  'ofw-loneliness-homesick': { lang: 'en', theme: 'lonely' },
  'failed-board-exam-what-now': { lang: 'en', theme: 'new-start' },
  'first-panic-attack-jeepney': { lang: 'en', theme: 'anxiety' },
  'grieving-a-grandparent': { lang: 'en', theme: 'loss' },
  'paano-mag-move-on': { lang: 'tl', theme: 'loss' },
  'panganay-breadwinner': { lang: 'tl', theme: 'pressure' },
  'new-mom-feeling-overwhelmed': { lang: 'en', theme: 'low' },
  'college-stress-thesis': { lang: 'en', theme: 'pressure' },
  'lonely-in-a-new-city': { lang: 'en', theme: 'lonely' },
  'when-god-feels-far': { lang: 'en', theme: 'faith' },
  'social-anxiety-small-steps': { lang: 'en', theme: 'anxiety' },
  'stop-comparing-yourself-social-media': { lang: 'en', theme: 'low' },
  'lost-my-job-what-now': { lang: 'en', theme: 'new-start' },
  'caregiver-burnout': { lang: 'en', theme: 'pressure' },
  'walang-gana-sa-lahat': { lang: 'tl', theme: 'low' },
  'helping-a-friend-with-depression': { lang: 'en', theme: 'low' },
  'stress-sa-utang': { lang: 'tl', theme: 'anxiety' },
  'how-to-start-over-in-life': { lang: 'en', theme: 'new-start' },
  'mens-mental-health-filipino-fathers': { lang: 'en', theme: 'low' },
  'anxiety-after-a-typhoon': { lang: 'en', theme: 'anxiety' },
  'when-you-feel-like-giving-up': { lang: 'en', theme: 'low' },
  'how-to-pray-when-you-cant-find-the-words': { lang: 'en', theme: 'faith' },
  'paano-bumangon-ulit': { lang: 'tl', theme: 'new-start' },
  'paano-tumigil-sa-overthinking-sa-gabi': { lang: 'tl', theme: 'anxiety' },
  'tired-of-my-job-night-shift': { lang: 'en', theme: 'pressure' },
  'lungkot-ng-ofw-homesick': { lang: 'tl', theme: 'lonely' },
  'bumagsak-sa-board-exam': { lang: 'tl', theme: 'new-start' },
  'unang-panic-attack-sa-jeep': { lang: 'tl', theme: 'anxiety' },
  'pagluluksa-sa-pagkawala-ni-lola': { lang: 'tl', theme: 'loss' },
  'how-to-move-on-after-a-breakup': { lang: 'en', theme: 'loss' },
  'eldest-child-breadwinner-pressure': { lang: 'en', theme: 'pressure' },
  'bagong-nanay-postpartum-lungkot': { lang: 'tl', theme: 'low' },
  'stress-sa-thesis-college': { lang: 'tl', theme: 'pressure' },
  'lonely-sa-bagong-lugar': { lang: 'tl', theme: 'lonely' },
  'parang-malayo-ang-diyos': { lang: 'tl', theme: 'faith' },
  'social-anxiety-paano-labanan': { lang: 'tl', theme: 'anxiety' },
  'pagkukumpara-sa-social-media': { lang: 'tl', theme: 'low' },
  'nawalan-ng-trabaho-ano-gagawin': { lang: 'tl', theme: 'new-start' },
  'pagod-mag-alaga-ng-magulang': { lang: 'tl', theme: 'pressure' },
  'no-motivation-for-anything': { lang: 'en', theme: 'low' },
  'paano-tulungan-ang-kaibigang-depressed': { lang: 'tl', theme: 'low' },
  'debt-stress-and-anxiety': { lang: 'en', theme: 'anxiety' },
  'paano-magsimula-ulit-sa-buhay': { lang: 'tl', theme: 'new-start' },
  'mental-health-ng-mga-tatay': { lang: 'tl', theme: 'low' },
  'takot-pagkatapos-ng-bagyo': { lang: 'tl', theme: 'anxiety' },
  'gusto-ko-nang-sumuko': { lang: 'tl', theme: 'low' },
  'paano-magdasal-kapag-walang-masabi': { lang: 'tl', theme: 'faith' },
  'how-to-get-back-up-again': { lang: 'en', theme: 'new-start' },
};

/** The story a path points to, if it is one. */
export function storySlugAt(pathname: string | null) {
  if (!pathname?.startsWith(`${BLOG_PATH}/`)) return undefined;
  const slug = pathname.slice(BLOG_PATH.length + 1);
  return slug in STORY_META ? slug : undefined;
}
