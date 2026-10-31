'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import { usePathname } from 'next/navigation';
import headerLogo from '@/assets/images/header-logo.png';
import { Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageLanguage } from '@/lib/pageLanguage';
import { pathIn } from '@/lib/taglishTwins';
import { englishPathOf, localizeHref } from '@/lib/intlRoutes';
import { FIND_A_HELPLINE } from '@/lib/helplines';
import type { PerLang } from '@/lib/i18n';
import { useCrisisLine } from '@/components/help/Crisis';
import { LanguagePicker } from './LanguagePicker';
import { analyticsService } from '@/services/analyticsService';
import { START_HASH, closeStartMenu } from '@/lib/startMenu';

const crisisWord: PerLang<string> = {
  en: 'Crisis?',
  tl: 'Crisis?',
  fr: 'Crise\u00a0?',
  de: 'Krise?',
  es: '¿Crisis?',
  ko: '위기?',
};
const callWord: PerLang<(number: string) => string> = {
  en: (n) => `Call ${n}`,
  tl: (n) => `Tumawag sa ${n}`,
  fr: (n) => `Appelle le ${n}`,
  de: (n) => `Ruf ${n} an`,
  es: (n) => `Llama al ${n}`,
  ko: (n) => `${n}에 전화`,
};

const navCopy: PerLang<{
  home: string;
  checkIn: string;
  tools: string;
  blog: string;
  approach: string;
  give: string;
  menu: string;
}> = {
  en: {
    home: 'Home',
    checkIn: 'Check-in',
    tools: 'Tools',
    blog: 'Blog',
    approach: 'Our approach',
    give: 'Give',
    menu: 'Toggle menu',
  },
  tl: {
    home: 'Home',
    checkIn: 'Check-in',
    tools: 'Tools',
    blog: 'Blog',
    approach: 'Our approach',
    give: 'Give',
    menu: 'Buksan o isara ang menu',
  },
  fr: {
    home: 'Accueil',
    checkIn: 'Bilan du jour',
    tools: 'Outils',
    blog: 'Blog',
    approach: 'Notre approche',
    give: 'Faire un don',
    menu: 'Ouvrir ou fermer le menu',
  },
  de: {
    home: 'Start',
    checkIn: 'Check-in',
    tools: 'Übungen',
    blog: 'Blog',
    approach: 'Unser Ansatz',
    give: 'Spenden',
    menu: 'Menü öffnen oder schließen',
  },
  es: {
    home: 'Inicio',
    checkIn: 'Chequeo',
    tools: 'Herramientas',
    blog: 'Blog',
    approach: 'Nuestro enfoque',
    give: 'Donar',
    menu: 'Abrir o cerrar el menú',
  },
  ko: {
    home: '홈',
    checkIn: '체크인',
    tools: '도구',
    blog: '블로그',
    approach: '우리의 방식',
    give: '후원하기',
    menu: '메뉴 열기 또는 닫기',
  },
};

export function Header() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  const nav = navCopy[lang];
  const { line } = useCrisisLine(lang);
  // A long number reads "Krise?" on a phone; the full number shows wider.
  const crisisShort =
    line && line.number.length <= 6
      ? `${crisisWord[lang]} ${line.number}`
      : crisisWord[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On Taglish pages, Tools and Blog go to their Taglish addresses.
  const navLinks = [
    { href: '/', label: nav.home },
    { href: '/check-in', label: nav.checkIn },
    { href: pathIn('/tools', lang), label: nav.tools },
    { href: pathIn('/blog', lang), label: nav.blog },
    { href: '/our-approach', label: nav.approach },
    { href: '/give-hope', label: nav.give },
  ];
  const home = localizeHref('/', lang);
  // The page they are on, in any language, is marked in the menu.
  const here = englishPathOf(pathname ?? '/');
  const isHere = (href: string) => englishPathOf(href) === here;

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== home) return;

    event.preventDefault();
    setIsMenuOpen(false);
    // On the menu (/#start), Home goes back to "Not okay today?".
    if (window.location.hash === START_HASH) closeStartMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The mobile menu closes on Escape or a tap anywhere outside it.
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Navigation */}
      <nav
        ref={navRef}
        className={cn(
          'border-b bg-[#FCFDFA] transition-colors duration-300 dark:bg-zinc-950',
          hasScrolled || isMenuOpen
            ? 'border-[#E2DFDA] dark:border-zinc-800'
            : 'border-transparent'
        )}
      >
        {/* 64rem of content plus the 1.5rem gutters: the same edges as every page. */}
        <div className="max-w-[67rem] mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href={home}
              className="flex min-h-11 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
              onClick={handleHomeClick}
            >
              <Image
                src={headerLogo}
                alt="HopeBegins"
                width={170}
                height={62}
                // At the top of every page, so never lazy.
                loading="eager"
                className="w-[136px] sm:w-[170px]"
                style={{ height: 'auto' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-current={isHere(link.href) ? 'page' : undefined}
                className="flex min-h-11 items-center rounded-md text-sm font-semibold text-zinc-500 hover:text-zinc-900 aria-[current=page]:text-[#6E5F47] aria-[current=page]:underline aria-[current=page]:decoration-[#AEC488] aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 dark:hover:text-zinc-100 transition-colors font-poppins focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
                onClick={(e) => {
                  if (link.href === '/') {
                    handleHomeClick(e as any);
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:ml-6">
            {/* One tap to the crisis line from every page. */}
            <a
              href={line ? `tel:${line.tel}` : FIND_A_HELPLINE}
              lang={lang}
              {...(!line && { target: '_blank', rel: 'noopener noreferrer' })}
              onClick={() => analyticsService.recordClick('header_crisis_call')}
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#DFE7CF] bg-[#EFF3E7] px-3 text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="sm:hidden">{crisisShort}</span>
              <span className="hidden sm:inline">
                {crisisWord[lang]}{' '}
                {line ? callWord[lang](line.number) : 'findahelpline.com'}
              </span>
              {line && <span className="sr-only">, {line.name}</span>}
            </a>

            <LanguagePicker />

            {/* Mobile Menu Button */}
            <button
              ref={toggleRef}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={nav.menu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation: slides open and closed. */}
        <div
          id="mobile-menu"
          inert={!isMenuOpen}
          className={cn(
            'lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--hb-ease-out)]',
            isMenuOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 py-4 px-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-current={isHere(link.href) ? 'page' : undefined}
                    className="flex min-h-12 items-center rounded-lg px-2 -mx-2 text-base font-semibold text-zinc-600 hover:text-zinc-900 aria-[current=page]:bg-[#EFF3E7] aria-[current=page]:text-[#6E5F47] dark:hover:text-zinc-100 transition-colors font-poppins focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
                    onClick={(e) => {
                      if (link.href === '/') {
                        handleHomeClick(e as any);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
