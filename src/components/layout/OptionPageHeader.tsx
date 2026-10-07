export function OptionPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header>
      <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl font-poppins text-lg text-[#6E5F47] leading-[1.4] tracking-[-0.022em]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
