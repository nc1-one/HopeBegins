import type { Lang } from '@/lib/i18n';
import Link from '@/components/ui/LocalLink';

const linkClass =
  'inline-flex min-h-11 items-center underline underline-offset-4 hover:text-[#5c4f3b]';

// The feelings people search for most, in their own words.
const feelings = [
  { href: '/pagod-na-ako', label: 'Pagod na ako', lang: 'tl' },
  { href: '/wala-akong-kausap', label: 'Wala akong kausap', lang: 'tl' },
  { href: '/depressed-ako', label: 'Depressed ako', lang: 'tl' },
  {
    href: '/paano-mawala-ang-anxiety',
    label: 'Paano mawala ang anxiety',
    lang: 'tl',
  },
  { href: '/i-feel-depressed', label: 'I feel depressed', lang: 'en' },
  { href: '/how-to-calm-anxiety', label: 'How to calm anxiety', lang: 'en' },
  {
    href: '/cant-sleep-overthinking',
    label: "Can't sleep from overthinking",
    lang: 'en',
  },
  { href: '/i-feel-alone', label: 'I feel alone', lang: 'en' },
];

/**
 * Below the "Not okay today?" screen: what HopeBegins is, in plain words,
 * for anyone who scrolls on and for search engines, with the main ways in.
 */
export function HomeAbout({ lang = 'en' }: { lang?: Lang } = {}) {
  return (
    <section
      aria-labelledby="about-title"
      className="px-6 py-16 text-[#6E5F47] md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2
            id="about-title"
            className="text-balance font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl"
          >
            Free mental health support for Filipinos
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            HopeBegins is free, faith-driven support for anyone in the
            Philippines who feels anxious, low, tired or alone. Pick how you
            feel and get one small thing to try today, a free personal plan,
            calming tools, someone to pray for you, and an e-coach you can
            message on Messenger. In English or Taglish.
          </p>
          <p lang="tl" className="mt-4 leading-relaxed">
            Libre ang HopeBegins para sa sinumang nababalisa, malungkot, pagod o
            pakiramdam ay mag-isa. Piliin kung ano ang nararamdaman mo, at may
            isang maliit na bagay kang masusubukan ngayon.
          </p>
        </div>

        <h3 className="mt-10 font-poppins text-lg font-semibold">
          Start with how you feel
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {feelings.map((feeling) => (
            <li key={feeling.href} lang={feeling.lang}>
              <Link href={feeling.href} className={linkClass}>
                {feeling.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl leading-relaxed">
          Need a number?{' '}
          <Link
            href="/free-mental-health-help-philippines"
            className="underline underline-offset-4 hover:text-[#5c4f3b]"
          >
            Free hotlines and counseling in the Philippines
          </Link>
          . Want to read how others got through a hard season?{' '}
          <Link
            href="/blog"
            className="underline underline-offset-4 hover:text-[#5c4f3b]"
          >
            Stories of Hope, the HopeBegins blog
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
