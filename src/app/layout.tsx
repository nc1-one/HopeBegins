import type { Metadata } from 'next';
import {
  Poppins,
  DM_Sans,
  Playfair_Display,
  Noto_Sans_KR,
  Noto_Serif_KR,
} from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { BonfireBubbleChat } from '@/components/bonfire/BonfireBubbleChat';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

// Hangul for the Korean pages: Noto Serif KR stands in for Playfair, Noto
// Sans KR for Poppins and DM Sans (see globals.css). Not preloaded, so
// other pages never fetch them.
const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  preload: false,
  display: 'swap',
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['400', '600'],
  variable: '--font-noto-serif-kr',
  preload: false,
  display: 'swap',
});

const SITE_DESCRIPTION =
  'Feeling anxious, low or alone? Free support right now: a personal plan, someone to pray for you, and e-coaches on Messenger. In crisis, call NCMH 1553.';

export const metadata: Metadata = {
  metadataBase: new URL('https://hopebegins.today'),
  // Opens full screen when added to an iPhone home screen.
  appleWebApp: {
    capable: true,
    title: 'HopeBegins',
    statusBarStyle: 'default',
  },
  title: {
    default: 'HopeBegins: Not okay today?',
    template: '%s | HopeBegins',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'HopeBegins',
    locale: 'en_PH',
    title: 'Not okay today? HopeBegins',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og/hopebegins.jpg',
        width: 1200,
        height: 630,
        alt: 'Not okay today? HopeBegins',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Not okay today? HopeBegins',
    description: SITE_DESCRIPTION,
    images: ['/og/hopebegins.jpg'],
  },
};

import EngagementPopout from '@/components/layout/EngagementPopout';
import { jsonLdHtml, siteJsonLd } from '@/lib/structuredData';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Philippine English for the site; Taglish pages and parts of a page
    // carry their own lang, since one root layout serves every page. The
    // script below switches it on /fr, /de, /es and /ko pages.
    <html
      lang="en-PH"
      className={`${poppins.variable} ${dmSans.variable} ${playfair.variable} ${notoSansKr.variable} ${notoSerifKr.variable}`}
      suppressHydrationWarning
    >
      <body className={dmSans.className} suppressHydrationWarning>
        {/* French, German, Spanish and Korean pages set their language
            before the first paint, for screen readers and Korean type. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=location.pathname.match(/^\\/(fr|de|es|ko)(\\/|$)/);if(m)document.documentElement.lang=m[1]==='es'?'es-419':m[1];})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(siteJsonLd)}
        />
        <Providers>
          {children}
          <EngagementPopout />
          <BonfireBubbleChat />
        </Providers>
      </body>
    </html>
  );
}
