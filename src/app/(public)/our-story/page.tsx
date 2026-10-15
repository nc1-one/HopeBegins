import Link from 'next/link';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { StorySection } from './components/StorySection';

const STORY_SECTIONS = [
  {
    title: 'Our mission',
    content:
      'HopeBegins gives free, faith-driven mental health support to people dealing with anxiety, depression and hopelessness.',
  },
  {
    title: 'Our vision',
    content: 'That no one in their darkest moments has to look far for help.',
  },
  {
    title: 'How it started',
    content:
      'HopeBegins started as a small prayer initiative. Today people come to it to ask for prayer, make a self-help plan and talk to an e-coach.',
  },
  {
    title: 'The H.O.P.E. framework',
    content:
      'Heal from the past, Overcome present challenges, find Purpose in your story, and Embrace a hopeful future.',
  },
];

export default function OurStoryPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="Our Story"
            subtitle="How HopeBegins started and what it does."
          />
          <div className="mt-10 space-y-4">
            {STORY_SECTIONS.map((section) => (
              <StorySection key={section.title} title={section.title}>
                {section.content}
              </StorySection>
            ))}
          </div>
          <Link
            href="/#start"
            className="mt-10 inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            See how we can help
          </Link>
        </div>
      </div>
    </div>
  );
}
