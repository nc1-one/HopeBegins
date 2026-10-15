const ALLOCATIONS = [
  {
    percent: '40%',
    label: 'Technology & Platform',
    description: 'Keeping HopeBegins accessible and free for everyone',
  },
  {
    percent: '30%',
    label: 'Content Creation',
    description: 'Producing HopeCasts, devotionals, and Daily Hope Drops',
  },
  {
    percent: '20%',
    label: 'Outreach & Growth',
    description: 'Reaching more people who need hope',
  },
  {
    percent: '10%',
    label: 'Operations',
    description: 'Supporting the team and volunteers behind HopeBegins',
  },
];

export function AllocationBreakdown() {
  return (
    <section aria-labelledby="allocation-title">
      <div className="rounded-2xl border border-zinc-100 bg-white p-6 md:p-8">
        <h2
          id="allocation-title"
          className="mb-6 font-poppins text-xl font-bold text-[#6E5F47]"
        >
          Where your Hope Seed goes
        </h2>
        <div className="space-y-4">
          {ALLOCATIONS.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-[#EFF3E7] text-sm font-bold text-[#6E5F47] tabular-nums">
                {item.percent}
              </div>
              <div>
                <p className="font-bold text-[#6E5F47]">{item.label}</p>
                <p className="mt-0.5 text-sm text-[#6E5F47] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
