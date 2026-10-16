'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  Download,
  Loader2,
  Lock,
  MessageCircle,
  Play,
  Plus,
  Printer,
  Smartphone,
  Upload,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import {
  Answers,
  PLAN_DAYS,
  Plan,
  PlanItem,
  PlanLang,
  TIME_LABELS,
  TimeOfDay,
  buildPlan,
  checkInScores,
  commitmentSentence,
  getQuestions,
} from '@/lib/actionPlan';
import {
  CheckInRecord,
  SavedPlan,
  clearPlan,
  dayOfPlan,
  daysSince,
  planBackup,
  readBackup,
  requestPersistentStorage,
  savePlan,
  updatePlan,
  useSavedPlan,
} from '@/lib/actionPlanStore';
import { downloadFile } from '@/lib/download';
import {
  promptInstall,
  useCanPromptInstall,
  useHomeScreenStatus,
} from '@/lib/installPrompt';
import { useLanguage } from '@/lib/languagePreference';
import {
  downloadReminder,
  googleCalendarUrl,
  reminderClock,
} from '@/lib/planReminders';
import { actionPlanService } from '@/services/actionPlanService';
import { analyticsService } from '@/services/analyticsService';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { BreathingExercise } from '@/components/tools/BreathingExercise';
import { GroundingExercise } from '@/components/tools/GroundingExercise';
import { FinishFlow, type FinishStep } from './FinishFlow';
import { MonthlyCheckIn } from './MonthlyCheckIn';
import { AfterwardsPanel } from './AfterwardsPanel';

type EmailStatus = 'idle' | 'sending' | 'sent' | 'error';

const WEEKS = PLAN_DAYS / 7;

const ui = {
  en: {
    locale: 'en-US',
    introTitle: 'Get your free Hopeful Beginning Plan',
    introText:
      'Answer 9 quick questions about how you have been. You will get a personal plan with simple steps to manage anxiety, low mood and stress, starting today.',
    includes: [
      'Calming tools you can try right on the page',
      "A step for this week, based on what's weighing on you",
      'A 4-week habit tracker, with reminders on your phone at the time you pick',
      'One check-in email next week, if you want it',
      'An e-coach on Messenger if you want someone to talk it through with',
    ],
    nameLabel: 'What should we call you? (optional)',
    start: 'Start my plan',
    introNote: 'About 2 minutes. Free. Your answers stay on this device.',
    method:
      "Built on proven self-help methods from cognitive behavioural therapy (CBT) and the World Health Organization's stress guide. This check-in is not a diagnosis and does not replace professional care.",
    restorePrompt: 'Made a plan before and saved a backup?',
    restore: 'Restore from a backup',
    restoreError: 'That file is not a HopeBegins plan backup.',
    questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
    progress: 'Progress',
    previous: 'Previous',
    welcomeDay: (name: string, day: number) =>
      `Welcome back${name ? `, ${name}` : ''}. This is day ${day} of your 4 weeks.`,
    welcomeBack: (name: string) => `Welcome back${name ? `, ${name}` : ''}.`,
    checkInDueTitle: (name: string) =>
      `It's been a week since your last check-in${name ? `, ${name}` : ''}.`,
    checkInDueText: 'Take it again to see what has changed.',
    doneTitle: (name: string) =>
      `You've done 4 weeks${name ? `, ${name}` : ''}.`,
    doneText:
      'Finish with one last check-in, choose the tool that helped most, and make your Hope Card.',
    finishButton: 'Finish my 4 weeks',
    hopeCardTitle: 'Your Hope Card',
    hopeCardText:
      'Your tool, your warning signs and your people, for the days that get hard again.',
    openCard: 'Open my Hope Card',
    takeAgain: 'Take the check-in again',
    planTitle: (name: string) =>
      name ? `${name}'s Hopeful Beginning Plan` : 'Your Hopeful Beginning Plan',
    madeOn: (date: string) => `Made for you on ${date}.`,
    startSafety: 'Start with your safety plan today.',
    startTools:
      'Pick 1 or 2 daily tools, add them to your 4 weeks, then tick them off each day.',
    answersShow: 'What your answers show',
    notDiagnosis: 'This is not a diagnosis. It is a starting point.',
    changedTitle: 'What has changed',
    lowMood: 'Low mood',
    worry: 'Worry',
    scoreNote: 'Lower is better. Each score is out of 6.',
    better:
      'Your scores have come down since your first check-in. Keep going with what is helping.',
    same: 'About the same as your first check-in. That is common in the first weeks. Keep going, and talk to an e-coach if you feel stuck.',
    worse:
      'Your scores have gone up since your first check-in. Please talk to someone this week: an e-coach, a counselor or a person you trust.',
    ecoachTitle: 'Want someone to journey with you?',
    ecoachText:
      'E-coaches from Himala Everyday can help you choose where to start.',
    ecoachButton: 'Talk to an e-coach on Messenger',
    toolsHint: 'Try one now. Then add 1 or 2 to your 4 weeks and pick a time.',
    startHere: 'Start here',
    tryNow: 'Try it now',
    addToWeeks: 'Add to my 4 weeks',
    inWeeks: 'In my 4 weeks',
    whenDo: 'When will you do it?',
    trackerTitle: 'Your 4 weeks',
    trackerIntro:
      "Tick each day you do it. Missed a day? Pick it up the next day. Missed days don't undo your progress.",
    trackerHabit:
      'Habits take weeks to stick. Aim for most days, not every day.',
    trackerEmpty:
      'Choose "Add to my 4 weeks" on 1 or 2 tools above. They will show up here so you can tick them off each day.',
    daysDone: (done: number) => `${done} of ${PLAN_DAYS} days`,
    weekOf: (week: number) => `Week ${week} of ${WEEKS}`,
    weeksDone: '4 weeks done',
    dayLabel: (date: string, done: boolean) => `${date}${done ? ', done' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `Remind me ${TIME_LABELS.en[time].toLowerCase()} at ${reminderClock(time)} for 4 weeks`,
    otherCalendar: 'iPhone or Outlook',
    checkInTitle: 'Can we check on you next week?',
    checkInText: (date: string) =>
      `We'll send one email on ${date} to ask how you're doing, with a link back to your plan.`,
    checkInDone: (date: string) => `Done. We'll email you on ${date}.`,
    planSent: (email: string) =>
      `Your plan is on its way to ${email}. Check your spam folder if you don't see it.`,
    firstName: 'First name (optional)',
    email: 'Email',
    checkInConsent: 'Check on me in 7 days.',
    checkInConsentText:
      'HopeBegins will use my email only for this one email, then delete it.',
    planConsent: 'Email me my plan now',
    planConsentText: ', so I have it on any device.',
    submitBoth: 'Check on me and email my plan',
    submitCheckIn: 'Check on me next week',
    submitPlan: 'Email my plan',
    submitNone: 'Choose one above',
    errorBoth: "We couldn't reach you.",
    errorCheckIn: "We couldn't set up your check-in.",
    errorPlan: "We couldn't send your plan.",
    errorTry: 'Check the email address and try again',
    errorPrint: ', or print the plan instead',
    emailPrivacy:
      'Your answers and progress are saved only on this device. We receive your email only for what you tick above. See our',
    privacyPolicy: 'privacy policy',
    saveTitle: 'Save my plan',
    saved:
      "Saved on this phone. Your plan saves itself as you go, and HopeBegins can't see it.",
    saveWhy:
      'Some phones clear website data after about a week without a visit. To keep your 4 weeks safe:',
    homeInstalled:
      'You opened HopeBegins from your home screen, so your plan stays on this phone.',
    homeButton: 'Add HopeBegins to my home screen',
    homeIphone:
      'Add HopeBegins to your home screen: tap Share, then "Add to Home Screen". Open your plan from there.',
    homeOther:
      'Add HopeBegins to your home screen: open your browser menu, then "Add to Home screen".',
    backupTitle: 'Download a backup',
    backupText:
      'A small file with your plan and progress. Keep it private. If your plan disappears or you change phones, open hopebegins.today/action-plan and choose "Restore from a backup".',
    backupButton: 'Download my backup',
    print: 'Print or save as PDF',
    deletePlan: 'Delete my plan from this device',
    deleteConfirm: 'Delete your plan and progress from this device?',
    weekSection: 'Your 4 weeks',
    weekSectionDetail: 'Use it on most days for the next 4 weeks.',
    todayTitle: 'Today',
    doneToday: 'Done today',
    didToday: 'Done',
    seeWeeks: 'See your 4 weeks',
  },
  tl: {
    locale: 'fil-PH',
    introTitle: 'Kunin ang libreng Hopeful Beginning Plan mo',
    introText:
      'Sagutin ang 9 na mabilis na tanong tungkol sa pinagdadaanan mo. Makakakuha ka ng personal na plano na may simpleng hakbang para sa anxiety, mababang mood, at stress, simula ngayon.',
    includes: [
      'Mga pampakalmang tool na masusubukan mo agad dito',
      'Isang hakbang para ngayong linggo, base sa pinakamabigat sa loob mo',
      'Isang 4-week habit tracker, may reminder sa phone mo sa oras na pipiliin mo',
      'Isang check-in email sa susunod na linggo, kung gusto mo',
      'Isang e-coach sa Messenger kung gusto mo ng makakausap',
    ],
    nameLabel: 'Ano ang itatawag namin sa iyo? (optional)',
    start: 'Simulan ang plano ko',
    introNote:
      'Mga 2 minuto. Libre. Mananatili ang mga sagot mo sa device na ito.',
    method:
      'Batay sa mga subok nang self-help method mula sa cognitive behavioural therapy (CBT) at sa stress guide ng World Health Organization. Hindi ito diagnosis at hindi ito pumapalit sa professional care.',
    restorePrompt: 'Nakagawa ka na ba ng plano at may backup ka?',
    restore: 'Ibalik mula sa backup',
    restoreError: 'Hindi HopeBegins plan backup ang file na iyan.',
    questionOf: (n: number, total: number) => `Tanong ${n} sa ${total}`,
    progress: 'Progress',
    previous: 'Bumalik',
    welcomeDay: (name: string, day: number) =>
      `Welcome back${name ? `, ${name}` : ''}. Day ${day} mo na sa 4 na linggo.`,
    welcomeBack: (name: string) => `Welcome back${name ? `, ${name}` : ''}.`,
    checkInDueTitle: (name: string) =>
      `Isang linggo na mula sa huling check-in mo${name ? `, ${name}` : ''}.`,
    checkInDueText: 'Sagutan ulit para makita kung ano ang nagbago.',
    doneTitle: (name: string) =>
      `Natapos mo ang 4 na linggo${name ? `, ${name}` : ''}.`,
    doneText:
      'Tapusin sa huling check-in, piliin ang tool na pinakanakatulong, at gawin ang Hope Card mo.',
    finishButton: 'Tapusin ang 4 na linggo ko',
    hopeCardTitle: 'Ang Hope Card mo',
    hopeCardText:
      'Ang tool mo, mga warning sign, at mga taong malalapitan mo, para sa mga araw na bumigat ulit.',
    openCard: 'Buksan ang Hope Card ko',
    takeAgain: 'Sagutan ulit ang check-in',
    planTitle: (name: string) =>
      name
        ? `Hopeful Beginning Plan ni ${name}`
        : 'Ang Hopeful Beginning Plan mo',
    madeOn: (date: string) => `Ginawa para sa iyo noong ${date}.`,
    startSafety: 'Unahin ang safety plan mo ngayong araw.',
    startTools:
      'Pumili ng 1 o 2 daily tool, idagdag sa 4 na linggo mo, at i-tick araw-araw.',
    answersShow: 'Ano ang ipinapakita ng mga sagot mo',
    notDiagnosis: 'Hindi ito diagnosis. Panimula lang ito.',
    changedTitle: 'Ano ang nagbago',
    lowMood: 'Mababang mood',
    worry: 'Pag-aalala',
    scoreNote: 'Mas mababa, mas mabuti. Mula 0 hanggang 6 ang bawat score.',
    better:
      'Bumaba ang scores mo mula sa unang check-in. Ituloy ang nakakatulong.',
    same: 'Halos pareho sa unang check-in mo. Karaniwan iyan sa mga unang linggo. Ituloy lang, at kumausap ng e-coach kung pakiramdam mo stuck ka.',
    worse:
      'Tumaas ang scores mo mula sa unang check-in. Kumausap ng isang tao ngayong linggo: isang e-coach, counselor, o taong pinagkakatiwalaan mo.',
    ecoachTitle: 'Gusto mo ba ng kasama sa pinagdadaanan mo?',
    ecoachText:
      'Matutulungan ka ng mga e-coach ng Himala Everyday na pumili kung saan magsisimula.',
    ecoachButton: 'Kausapin ang e-coach sa Messenger',
    toolsHint:
      'Subukan ang isa ngayon. Tapos idagdag ang 1 o 2 sa 4 na linggo mo at pumili ng oras.',
    startHere: 'Dito magsimula',
    tryNow: 'Subukan ngayon',
    addToWeeks: 'Idagdag sa 4 na linggo ko',
    inWeeks: 'Nasa 4 na linggo ko',
    whenDo: 'Kailan mo ito gagawin?',
    trackerTitle: 'Ang 4 na linggo mo',
    trackerIntro:
      'I-tick ang bawat araw na nagawa mo. May araw na hindi mo nagawa? Ituloy lang kinabukasan. Hindi nabubura ang progress mo dahil doon.',
    trackerHabit:
      'Ilang linggo bago maging habit ang isang bagay. Sikaping magawa ito sa karamihan ng araw, hindi kailangang araw-araw.',
    trackerEmpty:
      'Piliin ang "Idagdag sa 4 na linggo ko" sa 1 o 2 tool sa itaas. Lalabas sila dito para ma-tick mo araw-araw.',
    daysDone: (done: number) => `${done} sa ${PLAN_DAYS} araw`,
    weekOf: (week: number) => `Week ${week} sa ${WEEKS}`,
    weeksDone: 'Tapos na ang 4 na linggo',
    dayLabel: (date: string, done: boolean) =>
      `${date}${done ? ', nagawa' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `Paalalahanan ako ${TIME_LABELS.tl[time].toLowerCase()} nang ${reminderClock(time)} sa loob ng 4 na linggo`,
    otherCalendar: 'iPhone o Outlook',
    checkInTitle: 'Puwede ka ba naming kumustahin sa susunod na linggo?',
    checkInText: (date: string) =>
      `Magpapadala kami ng isang email sa ${date} para kumustahin ka, kasama ang link pabalik sa plano mo.`,
    checkInDone: (date: string) => `Ayos na. Ie-email ka namin sa ${date}.`,
    planSent: (email: string) =>
      `Papunta na ang plano mo sa ${email}. Tingnan ang spam folder kung hindi mo makita.`,
    firstName: 'Pangalan (optional)',
    email: 'Email',
    checkInConsent: 'Kumustahin ako pagkalipas ng 7 araw.',
    checkInConsentText:
      'Gagamitin lang ng HopeBegins ang email ko para sa isang email na ito, tapos buburahin na.',
    planConsent: 'I-email na ngayon ang plano ko',
    planConsentText: ', para hawak ko ito sa kahit anong device.',
    submitBoth: 'Kumustahin ako at i-email ang plano ko',
    submitCheckIn: 'Kumustahin ako next week',
    submitPlan: 'I-email ang plano ko',
    submitNone: 'Pumili muna sa itaas',
    errorBoth: 'Hindi ka namin ma-reach.',
    errorCheckIn: 'Hindi namin ma-set up ang check-in mo.',
    errorPlan: 'Hindi namin maipadala ang plano mo.',
    errorTry: 'Tingnan ang email address at subukan ulit',
    errorPrint: ', o i-print na lang ang plano',
    emailPrivacy:
      'Naka-save lang sa device na ito ang mga sagot at progress mo. Natatanggap lang namin ang email mo para sa mga pinili mo sa itaas. Basahin ang',
    privacyPolicy: 'privacy policy',
    saveTitle: 'I-save ang plano ko',
    saved:
      'Naka-save sa phone na ito. Kusang nase-save ang plano mo habang ginagamit mo, at hindi ito nakikita ng HopeBegins.',
    saveWhy:
      'May mga phone na nagbubura ng data ng website kapag isang linggo itong hindi nabuksan. Para hindi mawala ang 4 na linggo mo:',
    homeInstalled:
      'Binuksan mo ang HopeBegins mula sa home screen mo, kaya mananatili ang plano mo sa phone na ito.',
    homeButton: 'Idagdag ang HopeBegins sa home screen ko',
    homeIphone:
      'Idagdag ang HopeBegins sa home screen mo: i-tap ang Share, tapos "Add to Home Screen". Doon mo buksan ang plano mo.',
    homeOther:
      'Idagdag ang HopeBegins sa home screen mo: buksan ang menu ng browser, tapos "Add to Home screen".',
    backupTitle: 'Mag-download ng backup',
    backupText:
      'Isang maliit na file na may plano at progress mo. Itago ito nang pribado. Kung mawala ang plano mo o magpalit ka ng phone, buksan ang hopebegins.today/action-plan at piliin ang "Ibalik mula sa backup".',
    backupButton: 'I-download ang backup ko',
    print: 'I-print o i-save bilang PDF',
    deletePlan: 'Burahin ang plano ko sa device na ito',
    deleteConfirm: 'Burahin ang plano at progress mo sa device na ito?',
    weekSection: 'Ang 4 na linggo mo',
    weekSectionDetail:
      'Gawin ito sa karamihan ng araw sa susunod na 4 na linggo.',
    todayTitle: 'Ngayong araw',
    doneToday: 'Nagawa ko ngayon',
    didToday: 'Nagawa',
    seeWeeks: 'Tingnan ang 4 na linggo mo',
  },
};

type Copy = (typeof ui)['en'];

const linkClass =
  'mt-3 inline-flex items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none print:hidden';

const chipClass =
  'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

const reminderButtonClass =
  'inline-flex items-center rounded-xl border border-[#AEC488] bg-white px-3 py-1.5 text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

const secondaryButtonClass =
  'inline-flex items-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

const sectionHeadingClass =
  'font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';

function weekFromToday(locale: string) {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

const firstCheckIn = (plan: SavedPlan): CheckInRecord => ({
  date: plan.startedAt,
  ...checkInScores(plan.answers),
});

function ECoachCard({ t }: { t: Copy }) {
  return (
    <Card className="py-0 bg-[#6E5F47] border-none text-white">
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 className="font-poppins font-bold text-xl">{t.ecoachTitle}</h2>
          <p className="mt-2 text-white/85 leading-relaxed">{t.ecoachText}</p>
        </div>
        <EcoachLink
          linkName="ecoach_plan"
          className="inline-flex w-full shrink-0 items-center justify-center rounded-2xl bg-white px-5 py-4 text-center font-poppins font-bold leading-snug text-[#6E5F47] md:w-auto md:px-6 shadow-lg transition-all duration-300 hover:bg-zinc-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 print:hidden"
        >
          <MessageCircle className="mr-2 w-5 h-5 shrink-0" />
          <span>{t.ecoachButton}</span>
        </EcoachLink>
      </CardContent>
    </Card>
  );
}

function ItemBody({ item }: { item: PlanItem }) {
  const href = item.href;
  const opensNewTab = href?.startsWith('http');

  return (
    <>
      <p className="mt-1 text-[#6E5F47] leading-relaxed">{item.detail}</p>
      {item.steps && (
        <ol className="mt-3 space-y-1.5 list-decimal pl-5 marker:font-bold marker:text-[#91AFAA]">
          {item.steps.map((step) => (
            <li key={step} className="text-[#6E5F47] leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      )}
      {href &&
        (href.startsWith('/') ? (
          <Link href={href} className={linkClass}>
            {item.linkLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        ) : (
          <a
            href={href}
            target={opensNewTab ? '_blank' : undefined}
            rel={opensNewTab ? 'noopener noreferrer' : undefined}
            className={linkClass}
          >
            {item.linkLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        ))}
    </>
  );
}

function PlanItemCard({
  item,
  emphasis,
}: {
  item: PlanItem;
  emphasis?: boolean;
}) {
  return (
    <Card
      className={
        emphasis
          ? 'py-0 bg-[#EFF3E7] border-[#AEC488]'
          : 'py-0 bg-white border-zinc-100'
      }
    >
      <CardContent className="p-6">
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />
      </CardContent>
    </Card>
  );
}

function ToolCard({
  item,
  isFirst,
  time,
  lang,
  t,
}: {
  item: PlanItem;
  isFirst: boolean;
  time?: TimeOfDay;
  lang: PlanLang;
  t: Copy;
}) {
  const [isTrying, setIsTrying] = useState(false);
  const isInWeek = time !== undefined;

  const toggleWeek = () => {
    if (!isInWeek) analyticsService.recordClick('plan_tool_add');
    updatePlan((plan) => {
      const commitments = { ...plan.commitments };
      if (commitments[item.id]) {
        delete commitments[item.id];
      } else {
        commitments[item.id] = item.defaultTime ?? 'morning';
      }
      return { ...plan, commitments };
    });
  };

  const setTime = (next: TimeOfDay) =>
    updatePlan((plan) => ({
      ...plan,
      commitments: { ...plan.commitments, [item.id]: next },
    }));

  return (
    <Card
      className={
        isFirst
          ? 'py-0 bg-white border-[#AEC488] shadow-md'
          : 'py-0 bg-white border-zinc-100'
      }
    >
      <CardContent className="p-6">
        {isFirst && (
          <p className="mb-2 inline-flex rounded-full bg-[#EFF3E7] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#6E5F47]">
            {t.startHere}
          </p>
        )}
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />

        {isTrying && item.exercise === 'breathe' && (
          <BreathingExercise
            lang={lang}
            source="plan"
            onClose={() => setIsTrying(false)}
          />
        )}
        {isTrying && item.exercise === 'ground' && (
          <GroundingExercise
            lang={lang}
            source="plan"
            onClose={() => setIsTrying(false)}
          />
        )}

        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          {item.exercise && !isTrying && (
            <button
              type="button"
              onClick={() => {
                analyticsService.recordClick('plan_tool_try');
                setIsTrying(true);
              }}
              className="inline-flex items-center rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              <Play className="mr-2 w-4 h-4" />
              {t.tryNow}
            </button>
          )}
          {item.action && (
            <button
              type="button"
              onClick={toggleWeek}
              aria-pressed={isInWeek}
              className={`inline-flex items-center rounded-2xl border px-5 py-2.5 font-poppins font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 ${
                isInWeek
                  ? 'border-[#AEC488] bg-[#EFF3E7] text-[#6E5F47]'
                  : 'border-zinc-200 bg-white text-[#6E5F47] hover:bg-[#EFF3E7]'
              }`}
            >
              {isInWeek ? (
                <Check className="mr-2 w-4 h-4" />
              ) : (
                <Plus className="mr-2 w-4 h-4" />
              )}
              {isInWeek ? t.inWeeks : t.addToWeeks}
            </button>
          )}
        </div>

        {isInWeek && time && (
          <div className="mt-4 rounded-2xl bg-[#EFF3E7] p-4 print:bg-transparent print:p-0">
            <p className="text-sm text-[#6E5F47] print:hidden">{t.whenDo}</p>
            <div className="mt-2 flex flex-wrap gap-2 print:hidden">
              {(Object.keys(TIME_LABELS[lang]) as TimeOfDay[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTime(option)}
                  aria-pressed={time === option}
                  className={`${chipClass} ${
                    time === option
                      ? 'border-[#6E5F47] bg-[#6E5F47] text-white'
                      : 'border-[#C5BFB5] bg-white text-[#6E5F47] hover:bg-[#DFE7CF]'
                  }`}
                >
                  {TIME_LABELS[lang][option]}
                </button>
              ))}
            </div>
            <p className="mt-3 font-poppins font-bold text-[#6E5F47]">
              {commitmentSentence(item, time, lang)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProgressCard({
  history,
  locale,
  t,
}: {
  history: CheckInRecord[];
  locale: string;
  t: Copy;
}) {
  const first = history[0];
  const latest = history[history.length - 1];
  const change = latest.mood + latest.anxiety - (first.mood + first.anxiety);
  const short = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
    });
  const rows = [
    { label: t.lowMood, from: first.mood, to: latest.mood },
    { label: t.worry, from: first.anxiety, to: latest.anxiety },
  ];

  return (
    <Card className="mt-4 py-0 bg-white border-zinc-100">
      <CardContent className="p-6">
        <h2 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {t.changedTitle}
        </h2>
        <div className="mt-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 gap-y-2 text-[#6E5F47]">
          <span />
          <span className="text-xs text-right">{short(first.date)}</span>
          <span />
          <span className="text-xs text-right">{short(latest.date)}</span>
          {rows.map((row) => (
            <div key={row.label} className="contents">
              <span>{row.label}</span>
              <span className="text-right tabular-nums">{row.from}</span>
              <ArrowRight className="h-4 w-4 text-[#C5BFB5]" />
              <span className="text-right font-bold tabular-nums">
                {row.to}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[#6E5F47] leading-relaxed">
          {change < 0 ? t.better : change === 0 ? t.same : t.worse}
        </p>
        <p className="mt-2 text-sm text-[#6E5F47]">{t.scoreNote}</p>
      </CardContent>
    </Card>
  );
}

function toggleDay(toolId: string, day: number) {
  updatePlan((plan) => {
    const checks = Array.from(
      { length: PLAN_DAYS },
      (_, i) => plan.checks[toolId]?.[i] === true
    );
    checks[day] = !checks[day];
    return { ...plan, checks: { ...plan.checks, [toolId]: checks } };
  });
}

/**
 * For someone coming back: today's tools at the top of the plan, ticked in
 * one tap, so they don't scroll past the whole plan to reach the calendar.
 */
function TodayCard({
  saved,
  tools,
  lang,
  t,
}: {
  saved: SavedPlan;
  tools: PlanItem[];
  lang: PlanLang;
  t: Copy;
}) {
  const today = dayOfPlan(saved.startedAt);
  const committed = tools.filter((tool) => saved.commitments[tool.id]);
  if (committed.length === 0 || today < 1 || today >= PLAN_DAYS) return null;

  return (
    <section
      aria-labelledby="today-title"
      className="mb-6 rounded-2xl border border-[#DFE7CF] bg-white p-5 print:hidden"
    >
      <h2
        id="today-title"
        className="font-poppins font-bold text-lg text-[#6E5F47]"
      >
        {t.todayTitle}
      </h2>
      <ul className="mt-3 space-y-3">
        {committed.map((tool) => {
          const checks = saved.checks[tool.id] ?? [];
          const isDone = checks[today] === true;
          return (
            <li
              key={tool.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="sm:flex-1">
                <p className="text-[#6E5F47]">
                  {commitmentSentence(tool, saved.commitments[tool.id], lang)}
                </p>
                <p className="text-sm text-[#6E5F47]">
                  {t.daysDone(checks.filter(Boolean).length)}
                </p>
              </div>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => {
                  if (!isDone) analyticsService.recordClick('plan_today_done');
                  toggleDay(tool.id, today);
                }}
                className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-2xl border px-5 font-poppins font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 ${
                  isDone
                    ? 'border-[#AEC488] bg-[#EFF3E7] text-[#6E5F47]'
                    : 'border-[#6E5F47] bg-[#6E5F47] text-white hover:bg-[#5c4f3b]'
                }`}
              >
                {isDone && <Check className="mr-2 h-4 w-4" />}
                {isDone ? t.didToday : t.doneToday}
              </button>
            </li>
          );
        })}
      </ul>
      <a
        href="#your-weeks"
        className="mt-4 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
      >
        {t.seeWeeks}
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </section>
  );
}

function HabitTracker({
  saved,
  tools,
  lang,
  t,
}: {
  saved: SavedPlan;
  tools: PlanItem[];
  lang: PlanLang;
  t: Copy;
}) {
  const today = dayOfPlan(saved.startedAt);
  const start = new Date(saved.startedAt);
  const days = Array.from({ length: PLAN_DAYS }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
  const weekdays = days
    .slice(0, 7)
    .map((date) => date.toLocaleDateString(t.locale, { weekday: 'short' }));
  const currentWeek = Math.min(Math.floor(today / 7) + 1, WEEKS);
  const committed = tools.filter((tool) => saved.commitments[tool.id]);

  return (
    <section id="your-weeks" className="mt-12 scroll-mt-24">
      <h2 className={sectionHeadingClass}>{t.trackerTitle}</h2>
      <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
        {t.trackerIntro}
      </p>
      <p className="mt-2 text-sm text-[#6E5F47]">{t.trackerHabit}</p>

      {committed.length === 0 ? (
        <Card className="mt-5 py-0 border-dashed border-[#C5BFB5] bg-transparent shadow-none">
          <CardContent className="p-6 text-[#6E5F47]">
            {t.trackerEmpty}
          </CardContent>
        </Card>
      ) : (
        <div className="mt-5 space-y-3">
          {committed.map((tool) => {
            const time = saved.commitments[tool.id];
            const checks = saved.checks[tool.id] ?? [];
            const doneCount = checks.filter(Boolean).length;
            return (
              <Card key={tool.id} className="py-0 bg-white border-zinc-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-poppins font-bold text-[#6E5F47]">
                      {commitmentSentence(tool, time, lang)}
                    </p>
                    <p className="shrink-0 font-poppins font-bold text-[#91AFAA] tabular-nums">
                      {t.daysDone(doneCount)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-medium text-[#6E5F47]">
                    {today >= PLAN_DAYS ? t.weeksDone : t.weekOf(currentWeek)}
                  </p>
                  <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
                    {weekdays.map((label, i) => (
                      <span
                        key={`label-${i}`}
                        aria-hidden
                        className="text-center text-xs text-[#6E5F47]"
                      >
                        {label}
                      </span>
                    ))}
                    {days.map((date, day) => {
                      const isDone = Boolean(checks[day]);
                      const isToday = day === today;
                      const isFuture = day > today;
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isFuture}
                          onClick={() => toggleDay(tool.id, day)}
                          aria-pressed={isDone}
                          aria-label={t.dayLabel(
                            date.toLocaleDateString(t.locale, {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            }),
                            isDone
                          )}
                          className={`flex h-10 items-center justify-center rounded-xl border text-xs font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] disabled:cursor-not-allowed disabled:opacity-40 ${
                            isDone
                              ? 'border-[#AEC488] bg-[#AEC488] text-white'
                              : isToday
                                ? 'border-2 border-[#6E5F47] bg-white text-[#6E5F47]'
                                : 'border-zinc-200 bg-white text-[#6E5F47] hover:bg-[#EFF3E7]'
                          }`}
                        >
                          {isDone ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            date.getDate()
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center print:hidden">
                    <p className="flex items-center gap-2 text-sm text-[#6E5F47] sm:flex-1">
                      <CalendarPlus className="h-4 w-4 shrink-0 text-[#91AFAA]" />
                      {t.remindMe(time)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={googleCalendarUrl(tool, time, lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          analyticsService.recordClick('plan_reminder_google')
                        }
                        className={reminderButtonClass}
                      >
                        Google Calendar
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          analyticsService.recordClick('plan_reminder_ics');
                          downloadReminder(tool, time, lang);
                        }}
                        className={reminderButtonClass}
                      >
                        {t.otherCalendar}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

function CheckInCard({
  saved,
  plan,
  weekSentences,
  lang,
  t,
}: {
  saved: SavedPlan;
  plan: Plan;
  weekSentences: string[];
  lang: PlanLang;
  t: Copy;
}) {
  const [firstName, setFirstName] = useState(saved.name);
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState(false);
  const [sendPlan, setSendPlan] = useState(false);
  const [website, setWebsite] = useState('');
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<EmailStatus>('idle');
  const [done, setDone] = useState({ checkIn: false, plan: false });
  const checkInDate = weekFromToday(t.locale);

  const submitLabel =
    checkIn && sendPlan
      ? t.submitBoth
      : checkIn
        ? t.submitCheckIn
        : sendPlan
          ? t.submitPlan
          : t.submitNone;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkIn && !sendPlan) return;
    setStatus('sending');
    const name = firstName.trim();
    const antiSpam = { website, startTime: formStartedAt ?? 0 };
    const [checkInResult, planResult] = await Promise.allSettled([
      checkIn
        ? actionPlanService.requestCheckIn(email, name, lang, antiSpam)
        : Promise.resolve(),
      sendPlan
        ? actionPlanService.emailPlan(email, name, plan, lang, antiSpam, {
            heading: t.weekSection,
            detail: t.weekSectionDetail,
            items: weekSentences,
          })
        : Promise.resolve(),
    ]);
    const checkInOk = checkIn && checkInResult.status === 'fulfilled';
    const planOk = sendPlan && planResult.status === 'fulfilled';
    if (checkInOk) analyticsService.recordClick('plan_check_in');
    if (planOk) analyticsService.recordClick('plan_email');
    setDone({ checkIn: checkInOk, plan: planOk });
    setStatus(
      (checkIn && !checkInOk) || (sendPlan && !planOk) ? 'error' : 'sent'
    );
  };

  return (
    <Card className="mt-12 py-0 bg-[#EFF3E7] border-[#DFE7CF] print:hidden">
      <CardContent className="p-6 md:p-8">
        <h2 className="font-poppins font-bold text-xl text-[#6E5F47]">
          {t.checkInTitle}
        </h2>
        {!done.checkIn && (
          <p className="mt-2 text-[#6E5F47] leading-relaxed">
            {t.checkInText(checkInDate)}
          </p>
        )}

        {(done.checkIn || done.plan) && (
          <div className="mt-4 space-y-1 text-[#6E5F47]" role="status">
            {done.checkIn && (
              <p className="font-bold">{t.checkInDone(checkInDate)}</p>
            )}
            {done.plan && <p>{t.planSent(email)}</p>}
          </div>
        )}

        {status !== 'sent' && (
          <form
            onSubmit={handleSubmit}
            onFocus={() => setFormStartedAt((s) => s ?? Date.now())}
            className="mt-6 space-y-5"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
            />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="plan-first-name" className="text-[#6E5F47]">
                  {t.firstName}
                </Label>
                <Input
                  id="plan-first-name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-email" className="text-[#6E5F47]">
                  {t.email}
                </Label>
                <Input
                  id="plan-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-[#6E5F47]">
                <input
                  type="checkbox"
                  checked={checkIn}
                  onChange={(e) => setCheckIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#6E5F47]"
                />
                <span>
                  <span className="font-bold">{t.checkInConsent}</span>{' '}
                  {t.checkInConsentText}
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-[#6E5F47]">
                <input
                  type="checkbox"
                  checked={sendPlan}
                  onChange={(e) => setSendPlan(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#6E5F47]"
                />
                <span>
                  <span className="font-bold">{t.planConsent}</span>
                  {t.planConsentText}
                </span>
              </label>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-700" role="alert">
                {checkIn && !done.checkIn && sendPlan && !done.plan
                  ? t.errorBoth
                  : checkIn && !done.checkIn
                    ? t.errorCheckIn
                    : t.errorPlan}{' '}
                {t.errorTry}
                {sendPlan && !done.plan ? t.errorPrint : ''}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || (!checkIn && !sendPlan)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-8 py-4 font-poppins font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#5c4f3b] hover:shadow-xl disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              {status === 'sending' && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              {submitLabel}
            </button>
          </form>
        )}

        <p className="mt-6 flex items-start gap-2 text-sm text-[#6E5F47]">
          <Lock className="mt-0.5 w-4 h-4 shrink-0 text-[#91AFAA]" />
          <span>
            {t.emailPrivacy}{' '}
            <Link
              href="/privacy"
              className="font-bold underline underline-offset-4"
            >
              {t.privacyPolicy}
            </Link>
            .
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

function SavePlanCard({ saved, t }: { saved: SavedPlan; t: Copy }) {
  const homeScreen = useHomeScreenStatus();
  const canPromptInstall = useCanPromptInstall();

  const downloadBackup = () => {
    analyticsService.recordClick('plan_backup_download');
    const date = new Date().toISOString().slice(0, 10);
    downloadFile(
      `hopebegins-plan-${date}.json`,
      planBackup(saved),
      'application/json'
    );
  };

  return (
    <Card className="mt-4 py-0 bg-white border-zinc-100 print:hidden">
      <CardContent className="p-6 md:p-8">
        <h2 className="font-poppins font-bold text-xl text-[#6E5F47]">
          {t.saveTitle}
        </h2>
        <p className="mt-2 flex items-start gap-2 text-[#6E5F47] leading-relaxed">
          <Check className="mt-1 h-4 w-4 shrink-0 text-[#91AFAA]" />
          {t.saved}
        </p>
        {homeScreen !== 'installed' && (
          <p className="mt-3 text-sm text-[#6E5F47]">{t.saveWhy}</p>
        )}

        <div className="mt-5 space-y-5">
          <div className="flex items-start gap-3 text-[#6E5F47]">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-[#91AFAA]" />
            <div>
              {homeScreen === 'installed' ? (
                <p>{t.homeInstalled}</p>
              ) : canPromptInstall ? (
                <button
                  type="button"
                  onClick={() => {
                    analyticsService.recordClick('plan_install_prompt');
                    promptInstall();
                  }}
                  className={secondaryButtonClass}
                >
                  {t.homeButton}
                </button>
              ) : (
                <p>{homeScreen === 'iphone' ? t.homeIphone : t.homeOther}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 text-[#6E5F47]">
            <Download className="mt-0.5 h-5 w-5 shrink-0 text-[#91AFAA]" />
            <div>
              <p className="font-bold">{t.backupTitle}</p>
              <p className="mt-1 text-sm leading-relaxed">{t.backupText}</p>
              <button
                type="button"
                onClick={downloadBackup}
                className={`mt-3 ${secondaryButtonClass}`}
              >
                {t.backupButton}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RestoreBackup({ t }: { t: Copy }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const restore = async (file: File | undefined) => {
    if (!file) return;
    const plan = readBackup(await file.text());
    if (!plan) {
      setError(true);
      return;
    }
    analyticsService.recordClick('plan_backup_restore');
    savePlan(plan);
    requestPersistentStorage();
  };

  return (
    <div className="mt-8 rounded-2xl border border-dashed border-[#C5BFB5] p-5 text-[#6E5F47]">
      <p>{t.restorePrompt}</p>
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => restore(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => {
          setError(false);
          inputRef.current?.click();
        }}
        className={`mt-3 ${secondaryButtonClass}`}
      >
        <Upload className="h-4 w-4" />
        {t.restore}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {t.restoreError}
        </p>
      )}
    </div>
  );
}

export default function ActionPlanPage() {
  const saved = useSavedPlan();
  const lang = useLanguage();
  const t = ui[lang];
  const questions = getQuestions(lang);
  const [isRetaking, setIsRetaking] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  // The end of the 4 weeks: a last check-in, then the finish steps.
  const [finish, setFinish] = useState<
    'checkin' | 'monthly' | FinishStep | null
  >(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const showPlan = saved !== null && !isRetaking;
  const showQuestions = !showPlan && (hasStarted || isRetaking);
  const question = questions[current];

  useEffect(() => {
    if (!showPlan && !showQuestions) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [showPlan, showQuestions, current]);

  const handleAnswer = (value: string) => {
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    window.scrollTo({ top: 0 });
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      return;
    }
    analyticsService.recordClick(
      isRetaking ? 'plan_check_in_again' : 'plan_done'
    );
    const record: CheckInRecord = {
      date: new Date().toISOString(),
      ...checkInScores(nextAnswers),
    };
    if (isRetaking && saved) {
      // A new check-in keeps the 4 weeks: same start, tools and ticks.
      updatePlan((plan) => ({
        ...plan,
        name: name.trim(),
        answers: nextAnswers,
        history: [
          ...(plan.history?.length ? plan.history : [firstCheckIn(plan)]),
          record,
        ],
      }));
      if (finish === 'checkin') setFinish('tool');
    } else {
      savePlan({
        name: name.trim(),
        answers: nextAnswers,
        startedAt: record.date,
        commitments: {},
        checks: {},
        history: [record],
      });
      requestPersistentStorage();
    }
    setIsRetaking(false);
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else if (isRetaking) {
      setIsRetaking(false);
      setFinish(null);
    } else {
      setHasStarted(false);
    }
  };

  const handleRetake = () => {
    setName(saved?.name ?? '');
    setAnswers({});
    setCurrent(0);
    setIsRetaking(true);
    window.scrollTo({ top: 0 });
  };

  const startFinish = () => {
    analyticsService.recordClick('plan_finish_start');
    handleRetake();
    setFinish('checkin');
  };

  const handleDelete = () => {
    if (!window.confirm(t.deleteConfirm)) return;
    clearPlan();
    setAnswers({});
    setCurrent(0);
    setName('');
    setHasStarted(false);
    window.scrollTo({ top: 0 });
  };

  const header = (
    <div className="mb-6 flex justify-end">
      <LanguageSwitch />
    </div>
  );

  if (!showPlan && !showQuestions) {
    return (
      <div lang={lang} className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {header}
            <h1 className="text-balance font-playfair text-5xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {t.introTitle}
            </h1>
            <p className="mt-6 font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em]">
              {t.introText}
            </p>

            <ul className="mt-8 space-y-3">
              {t.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#6E5F47]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFF3E7]">
                    <Check className="w-4 h-4 text-[#91AFAA]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <form
              className="mt-10"
              onSubmit={(event) => {
                event.preventDefault();
                analyticsService.recordClick('plan_start');
                setHasStarted(true);
              }}
            >
              <Label htmlFor="plan-name" className="text-[#6E5F47]">
                {t.nameLabel}
              </Label>
              <Input
                id="plan-name"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 max-w-xs bg-white"
              />
              <button
                type="submit"
                className="group mt-6 inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-10 py-4 font-poppins text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5c4f3b] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50 motion-reduce:hover:translate-y-0"
              >
                {t.start}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </button>
            </form>

            <p className="mt-6 text-sm text-[#6E5F47]">{t.introNote}</p>

            <RestoreBackup t={t} />

            <p className="mt-10 border-t border-[#E2DFDA] pt-6 text-sm text-[#6E5F47] leading-relaxed">
              {t.method}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showQuestions) {
    return (
      <div lang={lang} className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {header}
            <Card className="py-0 bg-white border-zinc-100">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 text-sm text-[#6E5F47]">
                  <span>{t.questionOf(current + 1, questions.length)}</span>
                  <div
                    className="h-1.5 w-32 rounded-full bg-[#EFF3E7]"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-valuenow={current + 1}
                    aria-label={t.progress}
                  >
                    <div
                      className="h-full rounded-full bg-[#AEC488] transition-[width] duration-300 motion-reduce:transition-none"
                      style={{
                        width: `${((current + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {question.stem && (
                  <p className="mt-6 text-sm text-[#6E5F47]">{question.stem}</p>
                )}
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className={`${question.stem ? 'mt-2' : 'mt-6'} font-poppins font-bold text-xl md:text-2xl text-[#6E5F47] focus:outline-none`}
                >
                  {question.prompt}
                </h1>
                {question.note && (
                  <p className="mt-2 text-sm text-[#6E5F47]">{question.note}</p>
                )}

                <div className="mt-6 grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      aria-pressed={answers[question.key] === option.value}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left font-poppins font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 aria-pressed:border-[#AEC488] aria-pressed:bg-[#EFF3E7]"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handlePrevious}
                  className="mt-6 inline-flex items-center gap-2 -ml-3 rounded-xl px-3 py-2 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.previous}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!saved) return null;

  const plan = buildPlan(saved.answers, lang);
  const toolsSection = plan.sections.find((section) => section.id === 'tools');
  const recommended = toolsSection?.items ?? [];
  // Tools already in their 4 weeks stay, even if a new check-in no longer
  // recommends them.
  const tools = [
    ...recommended,
    ...plan.allTools.filter(
      (tool) =>
        saved.commitments[tool.id] &&
        !recommended.some((item) => item.id === tool.id)
    ),
  ];
  const otherSections = plan.sections.filter(
    (section) => section.id !== 'tools' && section.id !== 'safety'
  );
  const safety = plan.sections.find((section) => section.id === 'safety');
  const day = dayOfPlan(saved.startedAt);
  const history = saved.history?.length ? saved.history : [firstCheckIn(saved)];
  const sinceCheckIn = daysSince(history[history.length - 1].date);
  const madeOn = new Date(saved.startedAt).toLocaleDateString(t.locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const weekSentences = tools
    .filter((tool) => saved.commitments[tool.id])
    .map((tool) => commitmentSentence(tool, saved.commitments[tool.id], lang));

  const banner =
    day >= PLAN_DAYS - 1 && !saved.hopeCard
      ? {
          title: t.doneTitle(saved.name),
          text: t.doneText,
          button: t.finishButton,
          onClick: startFinish,
        }
      : sinceCheckIn >= 7 && day < PLAN_DAYS
        ? {
            title: t.checkInDueTitle(saved.name),
            text: t.checkInDueText,
            button: t.takeAgain,
            onClick: handleRetake,
          }
        : null;

  // After the 4 weeks, once the Hope Card is made.
  const isAfter = Boolean(saved.hopeCard) && day >= PLAN_DAYS - 1;
  const cardTool = plan.allTools.find(
    (tool) => tool.id === saved.hopeCard?.toolId
  );

  if (finish === 'monthly') {
    return (
      <div lang={lang} className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {header}
            <MonthlyCheckIn
              saved={saved}
              tool={cardTool}
              lang={lang}
              onClose={() => setFinish(null)}
              onOpenCard={() => setFinish('view')}
              onFullCheckIn={() => {
                setFinish(null);
                handleRetake();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (finish && finish !== 'checkin') {
    // Tools in their 4 weeks first, then the rest of the plan's tools.
    const choices = [
      ...tools.filter((tool) => saved.commitments[tool.id]),
      ...tools.filter((tool) => !saved.commitments[tool.id]),
      ...plan.allTools.filter(
        (tool) =>
          tool.id === saved.hopeCard?.toolId &&
          !tools.some((item) => item.id === tool.id)
      ),
    ];
    return (
      <div lang={lang} className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {header}
            <FinishFlow
              saved={saved}
              tools={choices}
              lang={lang}
              start={finish}
              onClose={() => setFinish(null)}
              progress={
                history.length >= 2 ? (
                  <ProgressCard history={history} locale={t.locale} t={t} />
                ) : null
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div lang={lang} className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          {header}
          <div id="action-plan">
            {banner ? (
              <div className="mb-6 rounded-2xl bg-[#EFF3E7] px-5 py-4 text-[#6E5F47] print:hidden">
                <p className="font-poppins font-bold">{banner.title}</p>
                <p className="mt-1">{banner.text}</p>
                <button
                  type="button"
                  onClick={banner.onClick}
                  className="mt-3 min-h-11 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                >
                  {banner.button}
                </button>
              </div>
            ) : (
              day >= 1 && (
                <p className="mb-6 rounded-2xl bg-[#EFF3E7] px-5 py-3 font-poppins text-[#6E5F47] print:hidden">
                  {day >= PLAN_DAYS || isAfter
                    ? t.welcomeBack(saved.name)
                    : t.welcomeDay(saved.name, day + 1)}
                </p>
              )
            )}

            {isAfter && (
              <AfterwardsPanel
                saved={saved}
                tool={cardTool}
                lang={lang}
                onMonthly={() => setFinish('monthly')}
                onOpenCard={() => setFinish('view')}
              />
            )}

            <TodayCard saved={saved} tools={tools} lang={lang} t={t} />

            {saved.hopeCard && !isAfter && (
              <section
                aria-labelledby="hope-card-title"
                className="mb-6 rounded-2xl border border-[#DFE7CF] bg-[#EFF3E7] p-5 print:hidden"
              >
                <h2
                  id="hope-card-title"
                  className="font-poppins font-bold text-lg text-[#6E5F47]"
                >
                  {t.hopeCardTitle}
                </h2>
                <p className="mt-1 text-[#6E5F47]">{t.hopeCardText}</p>
                <button
                  type="button"
                  onClick={() => setFinish('view')}
                  className="mt-3 inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                >
                  {t.openCard}
                </button>
              </section>
            )}

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
            >
              {t.planTitle(saved.name)}
            </h1>
            <p className="mt-4 font-poppins text-[#6E5F47] tracking-[-0.022em]">
              {t.madeOn(madeOn)}{' '}
              {plan.needsSafetyPlan ? t.startSafety : t.startTools}
            </p>

            <Card className="mt-8 py-0 bg-white border-zinc-100">
              <CardContent className="p-6">
                <h2 className="font-poppins font-bold text-lg text-[#6E5F47]">
                  {t.answersShow}
                </h2>
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-[#AEC488]">
                  {plan.summary.map((line) => (
                    <li key={line} className="text-[#6E5F47]">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[#6E5F47]">{t.notDiagnosis}</p>
              </CardContent>
            </Card>

            {history.length >= 2 && (
              <ProgressCard history={history} locale={t.locale} t={t} />
            )}

            {safety && (
              <section className="mt-12">
                <h2 className={sectionHeadingClass}>{safety.heading}</h2>
                {safety.intro && (
                  <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                    {safety.intro}
                  </p>
                )}
                <div className="mt-5 space-y-3">
                  {safety.items.map((item) => (
                    <PlanItemCard key={item.id} item={item} emphasis />
                  ))}
                </div>
              </section>
            )}

            <div className="mt-6">
              <ECoachCard t={t} />
            </div>

            <section className="mt-12">
              <h2 className={sectionHeadingClass}>{toolsSection?.heading}</h2>
              <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                {t.toolsHint}
              </p>
              <div className="mt-5 space-y-3">
                {tools.map((item, idx) => (
                  <ToolCard
                    key={item.id}
                    item={item}
                    isFirst={idx === 0}
                    time={saved.commitments[item.id]}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>
            </section>

            <HabitTracker saved={saved} tools={tools} lang={lang} t={t} />

            <CheckInCard
              key={saved.startedAt}
              saved={saved}
              plan={plan}
              weekSentences={weekSentences}
              lang={lang}
              t={t}
            />

            <SavePlanCard saved={saved} t={t} />

            {otherSections.map((section) => (
              <section key={section.id} className="mt-12">
                <h2 className={sectionHeadingClass}>{section.heading}</h2>
                {section.intro && (
                  <p className="mt-3 font-poppins text-[#6E5F47] tracking-[-0.022em]">
                    {section.intro}
                  </p>
                )}
                <div className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <PlanItemCard
                      key={item.id}
                      item={item}
                      emphasis={item.id === 'professional'}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              <Printer className="w-4 h-4" />
              {t.print}
            </button>
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {t.takeAgain}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-poppins font-medium text-sm text-[#6E5F47] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {t.deletePlan}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
