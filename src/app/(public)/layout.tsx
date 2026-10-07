import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToMainMenu } from '@/components/layout/BackToMainMenu';
import { CrisisBand } from '@/components/layout/CrisisBand';
import { WhatNext } from '@/components/layout/WhatNext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-dm-sans">
      <Header />
      <BackToMainMenu />
      <main className="flex-1">{children}</main>
      <WhatNext />
      <CrisisBand />
      <Footer />
    </div>
  );
}
