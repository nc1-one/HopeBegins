import Link from 'next/link';
import { BonfireInlineChat } from '@/components/bonfire/BonfireInlineChat';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ECOACH_URL } from '@/lib/actionPlan';

export default function HopeAIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative shrink-0 overflow-hidden px-6 pb-10 pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20" />
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="font-poppins text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 md:text-4xl">
            I Need to Talk to Hope AI
          </h1>
          <p className="text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
            A faith-filled conversation, anytime you need it.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <BonfireInlineChat />
        </div>
      </section>

      <div className="mx-auto max-w-2xl space-y-3 px-6 pb-10 pt-4 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
            className="font-medium text-zinc-500 underline underline-offset-4 transition-colors hover:text-[#6E5F47] dark:text-zinc-400"
          >
            Or send a prayer request
          </Link>
        </p>
      </div>
    </div>
  );
}
