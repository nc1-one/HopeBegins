'use client';

import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from '@/components/ui/LocalLink';
import headerLogo from '@/assets/images/header-logo.png';
import { feelingPages } from '@/lib/feelingPages';
import {
  isIntlLang,
  noTl,
  withLocale,
  type IntlLang,
  type PerLangNoTl,
} from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

/** A French, German, Spanish or Korean feeling page, for the quiet row. */
export interface FooterFeeling {
  lang: IntlLang;
  slug: string;
  label: string;
}

// English only before the four new languages, so Taglish pages keep it.
const copy: PerLangNoTl<{
  freeHelp: string;
  tools: string;
  blog: string;
  games: string;
  approach: string;
  give: string;
  privacy: string;
  feelingsNav: string;
  tagline: string;
  beCarrier: string;
  carrierLogin: string;
  social: (network: string) => string;
  logo: string;
}> = {
  en: {
    freeHelp: 'Free help',
    tools: 'Tools',
    blog: 'Blog',
    games: 'Games',
    approach: 'Our approach',
    give: 'Give',
    privacy: 'Privacy',
    feelingsNav: 'What you might be feeling',
    tagline: 'Faith-driven mental health support.',
    beCarrier: 'Be a Hope Carrier',
    carrierLogin: 'Hope Carrier login',
    social: (network) => `HopeBegins on ${network}`,
    logo: 'HopeBegins logo',
  },
  fr: {
    freeHelp: 'Aide gratuite',
    tools: 'Outils',
    blog: 'Blog',
    games: 'Jeux',
    approach: 'Notre approche',
    give: 'Faire un don',
    privacy: 'Confidentialité',
    feelingsNav: 'Ce que tu ressens peut-être',
    tagline: 'Soutien en santé mentale, porté par la foi.',
    beCarrier: 'Devenir Hope Carrier',
    carrierLogin: 'Connexion Hope Carrier',
    social: (network) => `HopeBegins sur ${network}`,
    logo: 'Logo HopeBegins',
  },
  de: {
    freeHelp: 'Kostenlose Hilfe',
    tools: 'Übungen',
    blog: 'Blog',
    games: 'Spiele',
    approach: 'Unser Ansatz',
    give: 'Spenden',
    privacy: 'Datenschutz',
    feelingsNav: 'Was du vielleicht fühlst',
    tagline: 'Hilfe für die psychische Gesundheit, getragen vom Glauben.',
    beCarrier: 'Hope Carrier werden',
    carrierLogin: 'Login für Hope Carrier',
    social: (network) => `HopeBegins auf ${network}`,
    logo: 'HopeBegins-Logo',
  },
  es: {
    freeHelp: 'Ayuda gratuita',
    tools: 'Herramientas',
    blog: 'Blog',
    games: 'Juegos',
    approach: 'Nuestro enfoque',
    give: 'Donar',
    privacy: 'Privacidad',
    feelingsNav: 'Lo que quizá sientes',
    tagline: 'Apoyo en salud mental desde la fe.',
    beCarrier: 'Hazte Hope Carrier',
    carrierLogin: 'Acceso para Hope Carriers',
    social: (network) => `HopeBegins en ${network}`,
    logo: 'Logo de HopeBegins',
  },
  ko: {
    freeHelp: '무료 상담 전화',
    tools: '도구',
    blog: '블로그',
    games: '게임',
    approach: '돕는 방식',
    give: '후원하기',
    privacy: '개인정보 처리방침',
    feelingsNav: '이런 마음이 들 때',
    tagline: '신앙에 뿌리를 둔 마음 건강 지원',
    beCarrier: 'Hope Carrier 되기',
    carrierLogin: 'Hope Carrier 로그인',
    social: (network) => `HopeBegins ${network}`,
    logo: 'HopeBegins 로고',
  },
};

const socials = [
  {
    href: 'https://www.facebook.com/hopebeginstoday',
    network: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/hopebeginstoday',
    network: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.linkedin.com/company/hopebeginstoday/',
    network: 'LinkedIn',
    icon: Linkedin,
  },
];

const linkClass =
  'inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:underline focus-visible:outline-none';

/** The footer in the page's language. */
export function FooterContent({
  intlFeelings,
}: {
  intlFeelings: FooterFeeling[];
}) {
  const lang = usePageLanguage();
  const t = noTl(copy, lang);
  const isIntl = isIntlLang(lang);

  const mainLinks = [
    // The Philippine guide in English and Taglish. Elsewhere, the help
    // page: free lines in the visitor's own country.
    {
      href: isIntl ? '/help' : '/free-mental-health-help-philippines',
      label: t.freeHelp,
    },
    { href: '/tools', label: t.tools },
    { href: '/blog', label: t.blog },
    { href: '/laro-muna', label: t.games },
    { href: '/our-approach', label: t.approach },
    { href: '/give-hope', label: t.give },
    { href: '/privacy', label: t.privacy },
  ];

  const carrierLinks = [
    { href: '/be-carrier', label: t.beCarrier },
    { href: '/login/carrier', label: t.carrierLogin },
  ];

  // English and Taglish pages list every English and Taglish feeling page;
  // a French, German, Spanish or Korean page lists the ones in its language.
  const feelings = isIntl
    ? intlFeelings
        .filter((page) => page.lang === lang)
        .map((page) => ({
          ...page,
          href: withLocale(page.lang, `/${page.slug}`),
        }))
    : feelingPages.map((page) => ({
        lang: page.lang,
        slug: page.slug,
        label: page.label,
        href: `/${page.slug}`,
      }));

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
              alt={t.logo}
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

        {feelings.length > 0 && (
          <nav
            aria-label={t.feelingsNav}
            className="mt-6 border-t border-white/15 pt-4"
          >
            <ul className="flex flex-wrap gap-x-5 text-sm text-white/80">
              {feelings.map((page) => (
                <li key={page.href} lang={page.lang}>
                  <Link href={page.href} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HopeBegins. {t.tagline}</p>
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
                  aria-label={t.social(social.network)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-[background-color,opacity] hover:bg-white/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
