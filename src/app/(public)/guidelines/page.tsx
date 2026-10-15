import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              Volunteer Code of Conduct
            </h1>
            <p className="font-poppins text-[#6E5F47]">
              For every HopeBegins volunteer. Last updated March 2026.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-[#6E5F47] text-lg leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-8">
                1. Our Mission
              </h2>
              <p>
                HopeBegins gives free, faith-driven support to people dealing
                with anxiety, depression and hopelessness, through prayer,
                self-help tools and e-coaching.
              </p>
              <p>
                As a volunteer, you represent HopeBegins. Serve with compassion,
                humility, integrity and faithfulness when you help people who
                may be dealing with anxiety, discouragement or a loss of
                purpose.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-6">
              <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-8">
                2. Core Values for Every Volunteer
              </h2>
              <p>Every HopeBegins volunteer commits to the following values:</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                  <h3 className="font-poppins text-xl font-bold text-[#6E5F47] mb-2">
                    Faith-Centered Service
                  </h3>
                  <p>We honor God in the way we serve others.</p>
                  <p className="italic text-zinc-500 my-3 font-semibold">
                    “Serve one another humbly in love.”
                    <br />– Bible (Galatians 5:13)
                  </p>
                  <p className="text-sm text-zinc-500">
                    Our encouragement, guidance, and interactions should reflect
                    biblical wisdom, grace, and truth.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                  <h3 className="font-poppins text-xl font-bold text-[#6E5F47] mb-2">
                    Compassion Before Correction
                  </h3>
                  <p>Many people we serve are hurting. Volunteers must:</p>
                  <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500 mb-3">
                    <li>Listen first</li>
                    <li>Respond with empathy</li>
                    <li>Avoid judgment or condemnation</li>
                  </ul>
                  <p className="text-sm text-[#6E5F47] font-bold">
                    Never pressure or shame anyone.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                  <h3 className="font-poppins text-xl font-bold text-[#6E5F47] mb-2">
                    Integrity and Honesty
                  </h3>
                  <p>
                    Volunteers must represent HopeBegins truthfully and
                    ethically. You should:
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500">
                    <li>Speak honestly</li>
                    <li>Avoid exaggerating claims</li>
                    <li>Respect confidentiality</li>
                    <li>Maintain moral and ethical conduct</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                  <h3 className="font-poppins text-xl font-bold text-[#6E5F47] mb-2">
                    Humility in Service
                  </h3>
                  <p>
                    Serving at HopeBegins is not about recognition or influence.
                    It is about:
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-500">
                    <li>Serving quietly</li>
                    <li>Supporting others</li>
                    <li>Reflecting Christ-like character</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-6">
              <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-12">
                3. Volunteer Conduct Expectations
              </h2>
              <p>All volunteers agree to the following behavioral standards.</p>

              <div className="space-y-8 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
                    Respect and Dignity
                  </h3>
                  <p className="my-2">
                    Treat everyone with respect regardless of:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                    <li>Background</li>
                    <li>Struggles</li>
                    <li>Beliefs</li>
                    <li>Personal history</li>
                  </ul>
                  <p className="text-sm text-[#6E5F47] font-bold">
                    We serve people with patience, grace, and dignity.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
                    Confidentiality
                  </h3>
                  <p className="my-2">
                    Many participants may share personal struggles including
                    anxiety, depression, or life challenges. Volunteers must:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                    <li>Keep personal information confidential</li>
                    <li>Never share private stories without permission</li>
                    <li>
                      Avoid discussing participant situations outside approved
                      ministry contexts
                    </li>
                  </ul>
                  <p className="text-sm text-[#6E5F47] font-bold">
                    Confidentiality protects trust and emotional safety.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
                    Healthy Boundaries
                  </h3>
                  <p className="my-2">
                    Volunteers must maintain appropriate relational boundaries.
                    This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base mb-3">
                    <li>Avoiding dependency or emotional over-involvement</li>
                    <li>Not presenting yourself as a therapist</li>
                    <li>Not giving medical or psychological diagnoses</li>
                    <li>
                      Directing individuals to professional help when necessary
                    </li>
                  </ul>
                  <p className="text-sm text-[#6E5F47] font-bold">
                    HopeBegins volunteers encourage and guide, but do not
                    replace professional care.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
                    Safe Communication
                  </h3>
                  <p className="my-2 text-[#6E5F47] font-bold">
                    All communication should be: Respectful, Encouraging, and
                    Free from manipulation or coercion.
                  </p>
                  <p className="mb-2 mt-2">Volunteers must avoid:</p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-500 text-base">
                    <li>Harassment</li>
                    <li>Discrimination</li>
                    <li>Spiritual manipulation</li>
                    <li>
                      Romantic or inappropriate relationships with participants
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sections 4, 5, 6, 7 */}
            <section className="space-y-10">
              <div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-12 mb-4">
                  4. Digital and AI Responsibility
                </h2>
                <p>
                  HopeBegins utilizes technology and AI tools to support
                  coaching and encouragement. Volunteers must:
                </p>
                <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                  <li>Use digital tools responsibly</li>
                  <li>Never misuse personal data</li>
                  <li>Avoid generating misleading or harmful AI content</li>
                  <li>Respect the privacy of all users</li>
                </ul>
                <p className="text-sm text-[#6E5F47] font-bold">
                  Never use these tools to exploit anyone.
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-8 mb-4">
                  5. Commitment to Spiritual Growth
                </h2>
                <p>
                  HopeBegins volunteers are encouraged to maintain a healthy
                  spiritual life. This includes:
                </p>
                <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                  <li>Personal prayer</li>
                  <li>Reading Scripture</li>
                  <li>Being accountable in a Christian community</li>
                  <li>Continuing to grow in character and faith</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-8 mb-4">
                  6. Professionalism and Reliability
                </h2>
                <p>
                  Volunteers must demonstrate commitment and responsibility.
                  This includes:
                </p>
                <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                  <li>Showing up on time</li>
                  <li>Following program guidelines</li>
                  <li>Completing assigned responsibilities</li>
                  <li>Communicating clearly with team leaders</li>
                </ul>
              </div>

              <div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mt-8 mb-4">
                  7. Social Media Guidelines
                </h2>
                <p>
                  Volunteers represent HopeBegins both online and offline.
                  Please ensure that:
                </p>
                <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                  <li>Social media posts reflect Christian values</li>
                  <li>
                    Personal opinions are not presented as official HopeBegins
                    statements
                  </li>
                  <li>Confidential information is never shared online</li>
                </ul>
              </div>
            </section>

            {/* Section 8, 9, 10 */}
            <section className="space-y-10 pt-4">
              <div className="bg-rose-50 dark:bg-rose-950/30 p-8 md:p-10 rounded-3xl border border-rose-100 dark:border-rose-900/50 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-rose-100 dark:text-rose-900/30 rotate-12">
                  <ShieldAlert className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-rose-800 dark:text-rose-300 font-poppins flex items-center gap-3 mb-6">
                    <ShieldAlert className="w-8 h-8 shrink-0" />
                    8. Safety and Crisis Awareness
                  </h2>

                  <p className="text-rose-800 dark:text-rose-400 font-bold mb-2">
                    If a participant expresses:
                  </p>
                  <ul className="list-disc pl-5 mb-6 space-y-1 text-rose-700 dark:text-rose-300">
                    <li>suicidal thoughts</li>
                    <li>self-harm</li>
                    <li>danger to themselves or others</li>
                  </ul>

                  <p className="text-rose-800 dark:text-rose-400 font-bold mb-2 pt-2 border-t border-rose-200/50 dark:border-rose-900/50">
                    Volunteers must:
                  </p>
                  <ul className="list-disc pl-5 mb-6 space-y-1 text-rose-700 dark:text-rose-300">
                    <li>Stay calm and compassionate</li>
                    <li>
                      Immediately escalate the concern to a HopeBegins leader
                    </li>
                    <li>Encourage the person to seek professional help</li>
                  </ul>
                  <p className="mt-4 text-white bg-rose-700 dark:bg-rose-900 py-3 px-4 rounded-xl text-center font-bold text-sm shadow-sm border border-rose-700 dark:border-rose-800">
                    Volunteers should never attempt to manage crisis situations
                    alone.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mb-4">
                  9. Accountability
                </h2>
                <p>Volunteers who violate this code of conduct may face:</p>
                <ul className="list-disc pl-5 my-3 space-y-1 text-zinc-500">
                  <li>Warning or corrective coaching</li>
                  <li>Temporary suspension from volunteering</li>
                  <li>Removal from the HopeBegins volunteer team</li>
                </ul>
              </div>

              <div className="bg-[#EFF3E7] py-8 px-6 md:px-10 rounded-2xl border border-[#DFE7CF]">
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#91AFAA]" />
                </div>
                <h2 className="font-playfair text-3xl text-[#6E5F47] leading-tight tracking-[-0.02em] mb-4">
                  10. Volunteer Commitment
                </h2>
                <p className="text-[#6E5F47] font-bold mb-6">
                  By volunteering with HopeBegins, I commit to:
                </p>

                <ul className="space-y-4 bg-white p-6 rounded-2xl border border-zinc-100 mb-6">
                  {[
                    'Serve with humility and compassion',
                    'Uphold Christian values in my conduct',
                    'Protect the confidentiality of participants',
                    'Maintain healthy boundaries',
                    'Support the mission of restoring hope',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-bold"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#EFF3E7] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6E5F47]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[#6E5F47] font-semibold border-t border-[#DFE7CF] pt-6">
                  I understand that serving with HopeBegins is both a privilege
                  and a responsibility.
                </p>
              </div>
            </section>

            <p className="pt-8">
              Questions about this code? Email{' '}
              <a
                href="mailto:connect@hopebegins.today"
                className="font-bold underline underline-offset-4"
              >
                connect@hopebegins.today
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
