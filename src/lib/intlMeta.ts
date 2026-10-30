import type { IntlLang, IntlPage } from './i18n';

/**
 * What search results and browser tabs show for each core page in French,
 * German, Spanish and Korean: a title under 60 characters, a description of
 * about 150 characters saying what the reader gets, and about 5 phrases
 * people there search for. The English lines are in each page's own file.
 */
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  /** The page's short name in the breadcrumb: HopeBegins › crumb. */
  crumb: string;
}

export type IntlMetaPage = '/' | IntlPage;

export const INTL_META: Record<
  IntlMetaPage,
  Record<IntlLang, PageMeta>
> = {} as Record<IntlMetaPage, Record<IntlLang, PageMeta>>;
