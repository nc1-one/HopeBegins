import { pageMetadata } from '@/lib/pageMetadata';
import Link from 'next/link';

export const metadata = pageMetadata(
  '/privacy',
  'Privacy and confidentiality',
  'What HopeBegins collects, who can see it, how we protect it, and your rights. Your plan, answers and Hope Card stay on your phone.'
);

const LAST_UPDATED = 'October 15, 2026';
const PRIVACY_EMAIL = 'connect@hopebegins.today';

const sections = [
  {
    title: 'What we collect',
    items: [
      'Prayer requests: your name, email, the message you write, and the category and organization you choose.',
      'Daily Hope emails: your first name, last name and email.',
      'Hope Stories: your name, occupation, photo and story. We publish a story only after we review and approve it.',
      'Hopeful Beginning Plan: your answers, plan, progress and Hope Card are saved only in your browser on your device, so you can come back to them. They are not sent to us, and you can delete them at any time from the plan page. If you download a backup file, it stays with you; we never receive it. If you ask us to email your plan, we receive your email, your first name if you give it, and the plan.',
      'Plan check-in: if you ask us to check on you, we keep your email and first name until we send that one email 7 days later, then delete them.',
      'Hope Carrier applications: the details you give when you apply to volunteer.',
      'Donations: Donorbox processes donations. Your card details go to Donorbox and its payment partners, not to HopeBegins.',
      'Hope AI: chats run on Bonfire (heybonfire.com), a third-party service that processes your messages.',
      'Site usage: our own count of page visits and of taps on links and tools. It has no cookies, no names and nothing you type, and we use no outside analytics.',
    ],
  },
  {
    title: 'How we use it',
    items: [
      'To pray for you, reply to you and send the emails you asked for.',
      'To run and improve HopeBegins.',
      'We do not sell your personal information.',
    ],
  },
  {
    title: 'Who can see it',
    items: [
      'Hope Carriers see the message and category of a prayer request. They see your first name only if you choose to share it. We do not show them your email.',
      'HopeBegins staff who run the service, only as needed for their work.',
      'The third-party services named above, only for the service they provide.',
    ],
  },
  {
    title: 'How we keep it confidential',
    items: [
      'Every Hope Carrier agrees to our Code of Conduct, which requires them to keep what you share confidential and never share stories without permission.',
      'Data between your device and HopeBegins is encrypted in transit (HTTPS).',
      'Access to personal information is limited to people who need it to serve you.',
    ],
  },
  {
    title: 'Your rights',
    items: [
      'Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you can ask to see, correct or delete your personal information, and you can withdraw your consent.',
      'You can unsubscribe from our emails at any time using the link in each email.',
      'If you believe your rights have been violated, you can file a complaint with the National Privacy Commission (privacy.gov.ph).',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            Privacy and confidentiality
          </h1>
          <p className="mt-4 text-sm text-[#6E5F47]">
            Last updated {LAST_UPDATED}
          </p>
          <p className="mt-6 font-poppins text-lg text-[#6E5F47] leading-relaxed tracking-[-0.022em]">
            People share personal and painful things with HopeBegins. This page
            explains what we collect, who can see it, how we protect it, and the
            choices you have.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-3 list-disc pl-5 marker:text-[#AEC488]">
                  {section.items.map((item) => (
                    <li key={item} className="text-[#6E5F47] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section>
              <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                Contact us
              </h2>
              <p className="mt-4 text-[#6E5F47] leading-relaxed">
                To make a request about your information, email{' '}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="font-bold underline underline-offset-4"
                >
                  {PRIVACY_EMAIL}
                </a>
                . Read the Hope Carrier{' '}
                <Link
                  href="/guidelines"
                  className="font-bold underline underline-offset-4"
                >
                  Code of Conduct
                </Link>
                .
              </p>
            </section>

            <section className="rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <h2 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                HopeBegins is not an emergency service
              </h2>
              <p className="mt-3 text-[#6E5F47] leading-relaxed">
                If you are in crisis or thinking of ending your life, call the
                NCMH Crisis Hotline, open 24/7:{' '}
                <a
                  href="tel:1553"
                  className="font-bold underline underline-offset-4"
                >
                  1553
                </a>{' '}
                or{' '}
                <a
                  href="tel:+639178998727"
                  className="font-bold underline underline-offset-4 whitespace-nowrap"
                >
                  0917 899 8727
                </a>
                . If you are in immediate danger, call 911.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
