import Link from 'next/link';
import { BonfireInlineChat } from '@/components/bonfire/BonfireInlineChat';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ECOACH_URL } from '@/lib/actionPlan';

export default function HopeAIPage() {
  return (
    <div className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="I Need to Talk to Hope AI"
            subtitle="Talk it through with Hope, an AI assistant, at any hour of the day or night."
          />

          <div className="mt-8 flex min-h-[560px] flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
            <BonfireInlineChat />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-[#6E5F47]">
              Hope is an AI assistant, not a counselor.
            </p>
            <TrackedLink
              href={ECOACH_URL}
              target="_blank"
              rel="noopener noreferrer"
              linkName="ecoach_hope_ai"
              className="inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins text-sm font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              I&apos;d rather talk to a real person: message an e-coach
            </TrackedLink>
            <p className="text-sm">
              <Link
                href="/prayers"
                className="font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
              >
                Or send a prayer request
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
