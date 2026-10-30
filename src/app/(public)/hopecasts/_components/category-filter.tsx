'use client';

import { secondaryClass } from '@/components/tools/toolStyles';
import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Category } from '@/types/hopecast';
import { toSentenceCase } from './sentence-case';

// The topics' own names come from the HopeCasts, in English or Filipino.
const copy: PerLangNoTl<{ topics: string; all: string }> = {
  en: { topics: 'Topics', all: 'All' },
  fr: { topics: 'Thèmes', all: 'Tous' },
  de: { topics: 'Themen', all: 'Alle' },
  es: { topics: 'Temas', all: 'Todos' },
  ko: { topics: '주제', all: '전체' },
};

interface CategoryFilterProps {
  lang: Lang;
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

const pillClass = cn(
  secondaryClass,
  'shrink-0 whitespace-nowrap px-4 text-sm aria-pressed:border-[#6E5F47]'
);

/** One scrolling row of topics on phones; it wraps on wider screens. */
export function CategoryFilter({
  lang,
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = noTl(copy, lang);
  return (
    <div
      role="group"
      aria-label={t.topics}
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 scroll-px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
    >
      <button
        type="button"
        aria-pressed={selectedCategoryId === null}
        onClick={() => onSelectCategory(null)}
        className={pillClass}
      >
        {t.all}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          aria-pressed={selectedCategoryId === category.id}
          onClick={() => onSelectCategory(category.id)}
          className={pillClass}
        >
          {toSentenceCase(category.name)}
        </button>
      ))}
    </div>
  );
}
