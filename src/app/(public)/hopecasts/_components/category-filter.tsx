'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/hopecast';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10">
      <Button
        variant="outline"
        onClick={() => onSelectCategory(null)}
        className={cn(
          'rounded-full px-5 py-2 h-auto text-sm font-medium transition-all border-zinc-200 shadow-none',
          selectedCategoryId === null
            ? 'bg-[#6E5F47] text-white border-[#6E5F47] hover:bg-[#5c4f3b] hover:text-white'
            : 'text-[#6E5F47] hover:bg-[#EFF3E7] hover:border-[#C6D6AC] bg-white'
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'rounded-full px-5 py-2 h-auto text-sm font-medium transition-all border-zinc-200 shadow-none',
            selectedCategoryId === category.id
              ? 'bg-[#6E5F47] text-white border-[#6E5F47] hover:bg-[#5c4f3b] hover:text-white'
              : 'text-[#6E5F47] hover:bg-[#EFF3E7] hover:border-[#C6D6AC] bg-white'
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
