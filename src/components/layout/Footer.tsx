import Link from 'next/link';
import Image from 'next/image';
import headerLogo from '@/assets/images/header-logo.png';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { feelingPages } from '@/lib/feelingPages';

export function Footer() {
  return (
    <footer className="bg-[#6b634d] py-10 px-6 text-white mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Button
            variant="outline"
            asChild
            className="min-h-11 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-lg px-6 font-poppins font-bold uppercase tracking-widest text-xs"
          >
            <Link href="/be-carrier">I Want to Be a Hope Carrier</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="min-h-11 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-lg px-6 font-poppins font-bold uppercase tracking-widest text-xs"
          >
            <Link href="/login/carrier">Carrier Login</Link>
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center opacity-90 transition-opacity hover:opacity-100">
            <Link href="/">
              <Image
                src={headerLogo}
                alt="HopeBegins Logo"
                width={170}
                height={62}
                style={{ height: 'auto' }}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <div className="flex justify-center gap-2 py-1">
            <Link
              href="https://www.facebook.com/hopebeginstoday"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-all hover:bg-white/10 hover:opacity-100"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/hopebeginstoday"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-all hover:bg-white/10 hover:opacity-100"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/hopebeginstoday/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HopeBegins on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition-all hover:bg-white/10 hover:opacity-100"
            >
              <Linkedin size={20} />
            </Link>
          </div>

          <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/90 font-poppins">
            Faith-Driven Mental Health Support
          </div>
          {(['tl', 'en'] as const).map((lang) => (
            <nav
              key={lang}
              lang={lang}
              aria-label={
                lang === 'tl'
                  ? 'Kung ano ang nararamdaman mo'
                  : 'What you might be feeling'
              }
              className="flex flex-wrap justify-center gap-x-4 pt-1 text-sm"
            >
              {feelingPages
                .filter((page) => page.lang === lang)
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="inline-flex min-h-11 items-center text-white/90 underline-offset-4 hover:text-white hover:underline"
                  >
                    {page.label}
                  </Link>
                ))}
            </nav>
          ))}
          <div className="pt-4">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center text-sm text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              Privacy and Confidentiality
            </Link>
          </div>
          <div className="pt-4 text-xs text-white/85">
            © 2026 HOPEBEGINS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
