import { ReactNode } from 'react';

interface StorySectionProps {
  title: string;
  children: ReactNode;
}

export function StorySection({ title, children }: StorySectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-100 bg-white p-6 md:p-8">
      <h2 className="mb-2 font-poppins text-xl font-bold text-[#6E5F47]">
        {title}
      </h2>
      <p className="text-[#6E5F47] leading-relaxed">{children}</p>
    </section>
  );
}
