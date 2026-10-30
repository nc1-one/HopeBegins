import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CrisisSentence } from '@/components/help/Crisis';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfdfa] font-dm-sans">
      <Header />
      <main className="flex-1 px-6 pt-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="font-poppins text-sm font-bold text-[#6E5F47]">404</p>
            <h1 className="mt-2 text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              We couldn&apos;t find that page.
            </h1>
            <p className="mt-4 font-poppins text-lg text-[#6E5F47] leading-[1.4]">
              The link may be old or mistyped. Here is where to go next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#start"
                className="inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
              >
                See how we can help
              </Link>
              <Link
                href="/action-plan"
                className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-6 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
              >
                Open my plan
              </Link>
            </div>
            <p className="mt-10 text-[#6E5F47] leading-relaxed">
              <CrisisSentence lang="en" lead />
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
