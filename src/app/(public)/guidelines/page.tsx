import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { Reveal } from '@/components/ui/Reveal';

const h2Class =
  'font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const h3Class =
  'font-playfair text-xl md:text-2xl text-[#6E5F47] leading-[1.05] tracking-[-0.03em]';
const listClass = 'list-disc pl-5 space-y-1';

export default function GuidelinesPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="Volunteer code of conduct"
            subtitle="For every HopeBegins volunteer. Last updated March 2026."
          />

          <div className="mt-12 space-y-12 text-lg leading-relaxed text-[#6E5F47]">
            <section className="space-y-4">
              <h2 className={h2Class}>1. Our mission</h2>
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

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>2. Core values for every volunteer</h2>
              <p>Every HopeBegins volunteer commits to the following values:</p>

              <div className="space-y-8 pt-4">
                <div className="space-y-3">
                  <h3 className={h3Class}>Faith-centered service</h3>
                  <p>We honor God in the way we serve others.</p>
                  <figure>
                    <blockquote className="font-playfair text-xl md:text-2xl italic leading-[1.25] tracking-[-0.02em]">
                      &ldquo;Serve one another humbly in love.&rdquo;
                    </blockquote>
                    <figcaption className="mt-1 text-sm text-[#6E5F47]/85">
                      Galatians 5:13
                    </figcaption>
                  </figure>
                  <p>
                    Our encouragement, guidance, and interactions should reflect
                    biblical wisdom, grace, and truth.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Compassion before correction</h3>
                  <p>Many people we serve are hurting. Volunteers must:</p>
                  <ul className={listClass}>
                    <li>Listen first</li>
                    <li>Respond with empathy</li>
                    <li>Avoid judgment or condemnation</li>
                  </ul>
                  <p>Never pressure or shame anyone.</p>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Integrity and honesty</h3>
                  <p>
                    Volunteers must represent HopeBegins truthfully and
                    ethically. You should:
                  </p>
                  <ul className={listClass}>
                    <li>Speak honestly</li>
                    <li>Avoid exaggerating claims</li>
                    <li>Respect confidentiality</li>
                    <li>Maintain moral and ethical conduct</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Humility in service</h3>
                  <p>
                    Serve quietly and support others, so people see Christ in
                    how you treat them.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>3. Volunteer conduct expectations</h2>
              <p>All volunteers agree to the following behavioral standards.</p>

              <div className="space-y-8 pt-4">
                <div className="space-y-3">
                  <h3 className={h3Class}>Respect and dignity</h3>
                  <p>Treat everyone with respect regardless of:</p>
                  <ul className={listClass}>
                    <li>Background</li>
                    <li>Struggles</li>
                    <li>Beliefs</li>
                    <li>Personal history</li>
                  </ul>
                  <p>We serve people with patience, grace, and dignity.</p>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Confidentiality</h3>
                  <p>
                    Many participants may share personal struggles including
                    anxiety, depression, or life challenges. Volunteers must:
                  </p>
                  <ul className={listClass}>
                    <li>Keep personal information confidential</li>
                    <li>Never share private stories without permission</li>
                    <li>
                      Avoid discussing participant situations outside approved
                      ministry contexts
                    </li>
                  </ul>
                  <p>Confidentiality protects trust and emotional safety.</p>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Healthy boundaries</h3>
                  <p>
                    Volunteers must maintain appropriate relational boundaries.
                    This includes:
                  </p>
                  <ul className={listClass}>
                    <li>Avoiding dependency or emotional over-involvement</li>
                    <li>Not presenting yourself as a therapist</li>
                    <li>Not giving medical or psychological diagnoses</li>
                    <li>
                      Directing individuals to professional help when necessary
                    </li>
                  </ul>
                  <p>
                    HopeBegins volunteers encourage and guide, but do not
                    replace professional care.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className={h3Class}>Safe communication</h3>
                  <p>
                    All communication should be respectful, encouraging and free
                    from manipulation or coercion.
                  </p>
                  <p>Volunteers must avoid:</p>
                  <ul className={listClass}>
                    <li>Harassment</li>
                    <li>Discrimination</li>
                    <li>Spiritual manipulation</li>
                    <li>
                      Romantic or inappropriate relationships with participants
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>4. Digital and AI responsibility</h2>
              <p>
                HopeBegins uses technology and AI tools to support coaching and
                encouragement. Volunteers must:
              </p>
              <ul className={listClass}>
                <li>Use digital tools responsibly</li>
                <li>Never misuse personal data</li>
                <li>Avoid generating misleading or harmful AI content</li>
                <li>Respect the privacy of all users</li>
              </ul>
              <p>Never use these tools to exploit anyone.</p>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>5. Commitment to spiritual growth</h2>
              <p>
                HopeBegins volunteers are encouraged to maintain a healthy
                spiritual life. This includes:
              </p>
              <ul className={listClass}>
                <li>Personal prayer</li>
                <li>Reading Scripture</li>
                <li>Being accountable in a Christian community</li>
                <li>Continuing to grow in character and faith</li>
              </ul>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>6. Professionalism and reliability</h2>
              <p>
                Volunteers must demonstrate commitment and responsibility. This
                includes:
              </p>
              <ul className={listClass}>
                <li>Showing up on time</li>
                <li>Following program guidelines</li>
                <li>Completing assigned responsibilities</li>
                <li>Communicating clearly with team leaders</li>
              </ul>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>7. Social media guidelines</h2>
              <p>
                Volunteers represent HopeBegins both online and offline. Please
                ensure that:
              </p>
              <ul className={listClass}>
                <li>Social media posts reflect Christian values</li>
                <li>
                  Personal opinions are not presented as official HopeBegins
                  statements
                </li>
                <li>Confidential information is never shared online</li>
              </ul>
            </Reveal>

            <Reveal
              as="section"
              className="space-y-4 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]"
            >
              <h2 className={h2Class}>8. Safety and crisis awareness</h2>
              <p>If a participant expresses:</p>
              <ul className={listClass}>
                <li>suicidal thoughts</li>
                <li>self-harm</li>
                <li>danger to themselves or others</li>
              </ul>
              <p>Volunteers must:</p>
              <ul className={listClass}>
                <li>Stay calm and compassionate</li>
                <li>Immediately escalate the concern to a HopeBegins leader</li>
                <li>Encourage the person to seek professional help</li>
              </ul>
              <p>
                Volunteers should never attempt to manage crisis situations
                alone.
              </p>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>9. Accountability</h2>
              <p>Volunteers who violate this code of conduct may face:</p>
              <ul className={listClass}>
                <li>Warning or corrective coaching</li>
                <li>Temporary suspension from volunteering</li>
                <li>Removal from the HopeBegins volunteer team</li>
              </ul>
            </Reveal>

            <Reveal as="section" className="space-y-4">
              <h2 className={h2Class}>10. Volunteer commitment</h2>
              <p>By volunteering with HopeBegins, I commit to:</p>
              <ul className={listClass}>
                <li>Serve with humility and compassion</li>
                <li>Uphold Christian values in my conduct</li>
                <li>Protect the confidentiality of participants</li>
                <li>Maintain healthy boundaries</li>
                <li>Support the mission of restoring hope</li>
              </ul>
              <p>
                I understand that serving with HopeBegins is both a privilege
                and a responsibility.
              </p>
            </Reveal>

            <p>
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
