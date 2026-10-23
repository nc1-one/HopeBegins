'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import headerLogo from '@/assets/images/header-logo.png';
import { Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageLanguage } from '@/lib/pageLanguage';
import { pathIn } from '@/lib/taglishTwins';
import { analyticsService } from '@/services/analyticsService';
import { START_HASH, closeStartMenu } from '@/lib/startMenu';

const crisisCopy = {
  en: {
    short: 'Crisis? 1553',
    long: 'Crisis? Call 1553',
    hotline: 'NCMH Crisis Hotline',
  },
  tl: {
    short: 'Crisis? 1553',
    long: 'Crisis? Tumawag sa 1553',
    hotline: 'NCMH Crisis Hotline',
  },
};

export function Header() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  const crisis = crisisCopy[lang];
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
    { href: '/', label: 'Home' },
    { href: pathIn('/tools', lang), label: 'Tools' },
    { href: pathIn('/blog', lang), label: 'Blogs' },
    { href: '/our-approach', label: 'Our approach' },
    { href: '/give-hope', label: 'Give' },
  ];

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;

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
          'transition-all duration-300 border-b',
          hasScrolled || isMenuOpen
            ? 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-md shadow-zinc-900/5'
            : 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/40 dark:border-zinc-900/40'
        )}
      >
        {/* 64rem of content plus the 1.5rem gutters: the same edges as every page. */}
        <div className="max-w-[67rem] mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={handleHomeClick}
            >
              <Image
                src={headerLogo}
                alt="HopeBegins Logo"
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
                className="flex items-center text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-poppins"
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
              href="tel:1553"
              lang={lang}
              onClick={() => analyticsService.recordClick('header_crisis_call')}
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#DFE7CF] bg-[#EFF3E7] px-3 text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="sm:hidden">{crisis.short}</span>
              <span className="hidden sm:inline">{crisis.long}</span>
              <span className="sr-only">, {crisis.hotline}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              ref={toggleRef}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
                    className="flex min-h-12 items-center text-base font-semibold text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-poppins"
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
