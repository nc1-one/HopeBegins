import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '@/assets/images/header-logo.png';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { feelingPages } from '@/lib/feelingPages';

/*
 * Kept short on purpose: a few main links, then every feeling page in one
 * quiet row. Those links are on every page so search engines keep finding
 * them; the sitemap lists everything else.
 */

const mainLinks = [
  { href: '/free-mental-health-help-philippines', label: 'Free help' },
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blogs' },
  { href: '/laro-muna', label: 'Games' },
  { href: '/our-approach', label: 'Our approach' },
  { href: '/give-hope', label: 'Give' },
  { href: '/privacy', label: 'Privacy' },
];

const carrierLinks = [
  { href: '/be-carrier', label: 'Be a Hope Carrier' },
  { href: '/login/carrier', label: 'Hope Carrier login' },
];

const socials = [
  {
    href: 'https://www.facebook.com/hopebeginstoday',
    label: 'HopeBegins on Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/hopebeginstoday',
    label: 'HopeBegins on Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.linkedin.com/company/hopebeginstoday/',
    label: 'HopeBegins on LinkedIn',
    icon: Linkedin,
  },
];

const linkClass =
  'inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:underline focus-visible:outline-none';

export function Footer() {
  return (
    <footer className="mt-auto bg-[#6b634d] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="inline-block w-fit opacity-90 hover:opacity-100"
          >
            <Image
              src={headerLogo}
              alt="HopeBegins Logo"
              width={150}
              height={55}
              style={{ height: 'auto' }}
              className="brightness-0 invert"
            />
          </Link>
          <nav aria-label="HopeBegins">
            <ul className="flex flex-wrap gap-x-6 font-poppins text-sm font-bold text-white/90">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav
          aria-label="What you might be feeling"
          className="mt-6 border-t border-white/15 pt-4"
        >
          <ul className="flex flex-wrap gap-x-5 text-sm text-white/80">
            {feelingPages.map((page) => (
              <li key={page.slug} lang={page.lang}>
                <Link href={`/${page.slug}`} className={linkClass}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HopeBegins. Faith-driven mental health support.</p>
          <div className="flex flex-wrap items-center gap-x-4">
            {carrierLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <span className="flex">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-all hover:bg-white/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
