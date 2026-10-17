const ALLOCATIONS = [
  { percent: '40%', label: 'keeps the site running and free' },
  { percent: '30%', label: 'makes new HopeCasts, devotionals and Daily Hope' },
  { percent: '20%', label: 'helps more Filipinos who are struggling find us' },
  { percent: '10%', label: 'supports the team and volunteers' },
];

export function AllocationBreakdown() {
  return (
    <section aria-labelledby="allocation-title">
      <h2
        id="allocation-title"
        className="font-poppins text-xl font-bold text-[#6E5F47]"
      >
        Where your gift goes
      </h2>
      <ul className="mt-3 space-y-2 text-[#6E5F47]">
        {ALLOCATIONS.map((item) => (
          <li key={item.label}>
            <span className="font-bold tabular-nums">{item.percent}</span>{' '}
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
