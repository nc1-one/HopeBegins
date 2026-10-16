import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '@/assets/images/header-logo.png';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { feelingPages } from '@/lib/feelingPages';

const linkClass =
  'inline-flex min-h-11 items-center text-sm text-white/90 underline-offset-4 hover:text-white hover:underline focus-visible:underline focus-visible:outline-none';
const headingClass = 'text-balance font-poppins text-sm font-bold text-white';
const socialClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-all hover:bg-white/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60';

const columns: {
  heading: string;
  lang?: 'tl' | 'en';
  links: { href: string; label: string }[];
}[] = [
  {
    heading: 'Kung ano ang nararamdaman mo',
    lang: 'tl',
    links: feelingPages
      .filter((page) => page.lang === 'tl')
      .map((page) => ({ href: `/${page.slug}`, label: page.label })),
  },
  {
    heading: 'What you might be feeling',
    lang: 'en',
    links: feelingPages
      .filter((page) => page.lang === 'en')
      .map((page) => ({ href: `/${page.slug}`, label: page.label })),
  },
  {
    heading: 'Free help',
    links: [
      { href: '/tools', label: 'Tools for hard moments' },
      { href: '/laro-muna', label: 'Laro muna: Find the pair' },
      { href: '/action-plan', label: 'Make your free plan' },
      { href: '/prayers', label: 'Ask for prayer' },
      { href: '/hope-ai', label: 'Talk to Hope AI' },
      { href: '/our-approach', label: 'Our approach' },
    ],
  },
  {
    heading: 'Hope Carriers',
    links: [
      { href: '/be-carrier', label: 'Be a Hope Carrier' },
      { href: '/login/carrier', label: 'Hope Carrier login' },
      { href: '/give-hope', label: 'Give' },
      { href: '/privacy', label: 'Privacy and confidentiality' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#6b634d] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-block opacity-90 hover:opacity-100"
            >
              <Image
                src={headerLogo}
                alt="HopeBegins Logo"
                width={170}
                height={62}
                style={{ height: 'auto' }}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-2 font-poppins text-sm text-white/90">
              Faith-driven mental health support
            </p>
          </div>
          <div className="-ml-3 flex gap-1 md:ml-0 md:-mr-3">
            <Link
              href="https://www.facebook.com/hopebeginstoday"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on Facebook"
              className={socialClass}
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/hopebeginstoday"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on Instagram"
              className={socialClass}
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/hopebeginstoday/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on LinkedIn"
              className={socialClass}
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <nav
              key={column.heading}
              lang={column.lang}
              aria-label={column.heading}
            >
              <p className={headingClass}>{column.heading}</p>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-10 border-t border-white/15 pt-6 text-xs text-white/85">
          © 2026 HopeBegins. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
