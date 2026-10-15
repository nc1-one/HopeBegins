'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, Share2 } from 'lucide-react';

const SHARE = {
  title: 'HopeBegins',
  text: 'Free support when you are not okay: a personal plan, calming tools and e-coaches.',
  url: 'https://hopebegins.today',
};

export default function DonationSuccessPage() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      await navigator.share(SHARE).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE.url);
      setCopied(true);
    } catch {
      // Clipboard blocked: the link is shown on the page to copy by hand.
      setCopied(true);
    }
  };

  return (
    <div className="px-6 pt-10 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <CheckCircle2 className="h-12 w-12 text-[#91AFAA]" />
          <h1 className="mt-6 text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            Hope Seed planted
          </h1>
          <p className="mt-4 max-w-xl font-poppins text-lg text-[#6E5F47] leading-[1.4]">
            Thank you. Your gift helps keep HopeBegins free for people who need
            it.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-6 space-y-6">
            <p className="flex items-start gap-3 text-[#6E5F47]">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#91AFAA]" />
              Donorbox has emailed you a receipt.
            </p>
            <div className="border-t border-zinc-100 pt-6">
              <p className="font-poppins font-bold text-[#6E5F47]">
                Know someone who is struggling? Share HopeBegins with them.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                >
                  <Share2 className="h-4 w-4" />
                  Share HopeBegins
                </button>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-6 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                >
                  Go to the homepage
                </Link>
              </div>
              {copied && (
                <p className="mt-3 text-sm text-[#6E5F47]" role="status">
                  Link copied: {SHARE.url}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/#start"
            className="mt-8 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
          >
            Need support yourself? Start here
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
