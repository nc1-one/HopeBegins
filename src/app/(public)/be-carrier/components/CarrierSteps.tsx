import Link from 'next/link';

const STEPS = [
  {
    title: 'Apply here',
    text: 'Tell us a little about yourself and why you want to pray for people.',
  },
  {
    title: 'We read every application',
    text: "If yours is approved, we'll email you a password to sign in.",
  },
  {
    title: 'Pray for the requests given to you',
    text: 'Sign in from your phone, pray for each person, and mark it once you have prayed.',
  },
];

/** How being a Hope Carrier works, in three plain steps. */
export function CarrierSteps({
  headingLevel = 'h2',
}: {
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <div className="text-[#6E5F47]">
      <Heading className="font-playfair text-2xl md:text-3xl leading-[0.95] tracking-[-0.04em]">
        What a Hope Carrier does
      </Heading>
      <ol className="mt-6 space-y-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="w-8 shrink-0 font-playfair text-4xl leading-none text-[#AEC488] tabular-nums">
              {index + 1}
            </span>
            <span>
              <span className="block font-poppins text-lg font-semibold">
                {step.title}
              </span>
              <span className="mt-1 block leading-relaxed">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 leading-relaxed">
        Hope Carriers keep every request private and point people to
        professional help when they need it.{' '}
        <Link
          href="/guidelines"
          className="font-medium underline underline-offset-4 hover:text-[#5c4f3b]"
        >
          Read the code of conduct
        </Link>
      </p>
    </div>
  );
}
