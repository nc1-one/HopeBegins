import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToMainMenu } from '@/components/layout/BackToMainMenu';
import { CrisisBand } from '@/components/layout/CrisisBand';
import { WhatNext } from '@/components/layout/WhatNext';
import { InstallPromptCatcher } from '@/components/layout/InstallPromptCatcher';
import { PageVisitTracker } from '@/components/layout/PageVisitTracker';
import { OfflineSupport } from '@/components/layout/OfflineSupport';
import { LanguageRedirect } from '@/components/layout/LanguageRedirect';
import { PhotoTurnProvider } from '@/components/ui/PhotoTurn';
import { photoTurn } from '@/lib/photos';

// Pages are rebuilt every six hours so their photos take turns (see photos.ts).
export const revalidate = 21600;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-dm-sans">
      <Header />
      <BackToMainMenu />
      <main className="flex-1">
        <PhotoTurnProvider turn={photoTurn()}>{children}</PhotoTurnProvider>
      </main>
      <WhatNext />
      <CrisisBand />
      <Footer />
      <InstallPromptCatcher />
      <PageVisitTracker />
      <OfflineSupport />
      <LanguageRedirect />
    </div>
  );
}
