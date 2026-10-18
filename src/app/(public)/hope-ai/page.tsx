import Link from 'next/link';
import { BonfireInlineChat } from '@/components/bonfire/BonfireInlineChat';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass } from '@/components/tools/toolStyles';
import { EcoachLink } from '@/components/ui/EcoachLink';

export default function HopeAIPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="I need to talk to Hope AI"
            subtitle="Any hour, day or night."
          />

          {/* The chat draws its own card, so nothing frames it here. */}
          <div className="mt-8 flex min-h-[560px] flex-col">
            <BonfireInlineChat />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-[#6E5F47]">
              Hope AI is an AI assistant. It can&apos;t counsel you or help in
              an emergency.
            </p>
            <EcoachLink linkName="ecoach_hope_ai" className={primaryClass}>
              Talk to a real person
            </EcoachLink>
            <p className="text-sm">
              <Link
                href="/prayers"
                className="inline-flex min-h-11 items-center font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
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
