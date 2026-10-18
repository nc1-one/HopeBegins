'use client';

import { secondaryClass } from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';
import { Category } from '@/types/hopecast';
import { toSentenceCase } from './sentence-case';

interface CategoryFilterProps {
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
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Topics"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 scroll-px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
    >
      <button
        type="button"
        aria-pressed={selectedCategoryId === null}
        onClick={() => onSelectCategory(null)}
        className={pillClass}
      >
        All
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
