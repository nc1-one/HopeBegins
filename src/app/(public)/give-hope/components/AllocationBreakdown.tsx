const ALLOCATIONS = [
  { percent: '40%', label: 'keeps the site running and free' },
  { percent: '30%', label: 'makes new HopeCasts, devotionals and Daily Hope' },
  { percent: '20%', label: 'helps more Filipinos who are struggling find us' },
  { percent: '10%', label: 'supports the team and volunteers' },
];

export function AllocationBreakdown() {
  return (
    <section aria-labelledby="allocation-title">
      <h3
        id="allocation-title"
        className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        Where your gift goes
      </h3>
      <ul className="mt-5 divide-y divide-[#E2DFDA] border-y border-[#E2DFDA] text-[#6E5F47]">
        {ALLOCATIONS.map((item) => (
          <li key={item.label} className="flex items-baseline gap-4 py-3">
            <span className="w-14 shrink-0 font-playfair text-2xl tabular-nums">
              {item.percent}
            </span>
            <span className="leading-snug">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
