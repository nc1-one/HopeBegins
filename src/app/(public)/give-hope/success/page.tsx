'use client';

import { useState } from 'react';
import Link from '@/components/ui/LocalLink';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass, secondaryClass } from '@/components/tools/toolStyles';

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
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="Thank you for your gift"
            subtitle="It helps keep HopeBegins free for the next person who needs it."
          />

          <div className="mt-8 space-y-6 text-[#6E5F47]">
            <p>Donorbox has emailed you a receipt.</p>
            <div className="border-t border-[#E2DFDA] pt-6">
              <p>Know someone who is struggling? Share HopeBegins with them.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={share} className={primaryClass}>
                  Share HopeBegins
                </button>
                <Link href="/" className={secondaryClass}>
                  Go to the homepage
                </Link>
              </div>
              {copied && (
                <p className="mt-3 text-sm" role="status">
                  Link copied: {SHARE.url}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/#start"
            className="mt-8 inline-flex min-h-11 items-center font-poppins font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Need support yourself? Start here
          </Link>
        </div>
      </div>
    </div>
  );
}
