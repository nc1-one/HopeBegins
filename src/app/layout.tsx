import type { Metadata } from 'next';
import { Poppins, DM_Sans, Playfair_Display } from 'next/font/google';
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
    // carry their own lang, since one root layout serves every page.
    <html
      lang="en-PH"
      className={`${poppins.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <body className={dmSans.className} suppressHydrationWarning>
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
