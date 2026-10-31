'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  Download,
  Loader2,
  Lock,
  MessageCircle,
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
  markTodayDone,
  MAX_SAFETY_LENGTH,
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
import { setLanguage, useLanguage } from '@/lib/languagePreference';
import { usePageLanguage } from '@/lib/pageLanguage';
import { TAGLISH_TWINS, twinLinks } from '@/lib/taglishTwins';
import { usePhoto } from '@/components/ui/PhotoTurn';
import { forgetTool } from '@/lib/myTool';
import { clearCheckIns } from '@/lib/checkIns';
import { clearToolNotes } from '@/lib/toolNotes';
import { calmerCount, clearToolChecks, useToolChecks } from '@/lib/toolChecks';
import {
  downloadReminder,
  googleCalendarUrl,
  reminderClock,
} from '@/lib/planReminders';
import { actionPlanService } from '@/services/actionPlanService';
import { analyticsService } from '@/services/analyticsService';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { ToolExercise } from '@/components/tools/ToolExercise';
import { FinishFlow, type FinishStep } from './FinishFlow';
import { MonthlyCheckIn } from './MonthlyCheckIn';
import { AfterwardsPanel } from './AfterwardsPanel';
import { UseMyTool, canTickToday, toolButtonClass } from './UseMyTool';
import { CallCrisisButton, CrisisList } from '@/components/help/Crisis';
import { useCountry } from '@/lib/country';

type EmailStatus = 'idle' | 'sending' | 'sent' | 'error';

const WEEKS = PLAN_DAYS / 7;

const ui = {
  en: {
    locale: 'en-US',
    introTitle: 'Get your free Hopeful Beginning Plan',
    introText:
      "Answer 9 quick questions about how you've been. You'll get a few small steps made for you, and you can start today.",
    nameLabel: 'What should we call you? (optional)',
    start: 'Start my plan',
    introNote: 'About 2 minutes. Free. Your answers stay on this device.',
    method:
      "The steps come from CBT, a common talk therapy, and the World Health Organization's stress guide. This isn't a diagnosis, and it doesn't replace seeing a doctor or counselor.",
    restorePrompt: 'Made a plan before and saved a backup?',
    restore: 'Restore from a backup',
    restoreError: 'That file is not a HopeBegins plan backup.',
    questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
    progress: 'Progress',
    previous: 'Back',
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
    notDiagnosis: "This isn't a diagnosis. It helps you pick where to start.",
    changedTitle: 'What has changed',
    lowMood: 'Low mood',
    worry: 'Worry',
    scoreNote: 'Lower is better. Each score is out of 6.',
    better:
      'Your scores have come down since your first check-in. Keep going with what is helping.',
    same: 'About the same as your first check-in. That is common in the first weeks. Keep going, and talk to an e-coach if you feel stuck.',
    worse:
      'Your scores have gone up since your first check-in. Please talk to someone this week: an e-coach, a counselor or a person you trust.',
    ecoachTitle: 'Want someone to go through this with you?',
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
    trackerHabit: 'Habits take weeks to stick. Most days is enough.',
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
    errorBoth: "That didn't go through.",
    errorCheckIn: "We couldn't set up your check-in.",
    errorPlan: "We couldn't send your plan.",
    errorTry: 'Check the email address and try again',
    errorPrint: ', or print the plan instead',
    emailPrivacy:
      'Your answers and progress are saved only on this device. We only use your email for what you ticked above. See our',
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
    startTool: 'Start',
    safetyWrite: 'Write yours',
    safetySaved: 'What you write here is saved only on this phone.',
    tickedToday: 'Ticked for today in your 4 weeks.',
    calmerAfter: (calmer: number, total: number) =>
      `You felt calmer after it ${calmer} of ${total} ${total === 1 ? 'time' : 'times'}.`,
    todayAfterBreak: 'Good to see you. Start with today.',
    seeWeeks: 'See your 4 weeks',
  },
  tl: {
    locale: 'fil-PH',
    introTitle: 'Kunin ang libreng Hopeful Beginning Plan mo',
    introText:
      'Sagutin ang 9 na mabilis na tanong tungkol sa pinagdadaanan mo. Bibigyan ka namin ng ilang maliliit na hakbang na puwede mong simulan ngayon.',
    nameLabel: 'Ano ang itatawag namin sa iyo? (optional)',
    start: 'Simulan ang plano ko',
    introNote:
      'Mga 2 minuto. Libre. Sa phone mo lang naka-save ang mga sagot mo.',
    method:
      'Galing ang mga hakbang sa CBT (isang uri ng talk therapy) at sa stress guide ng World Health Organization. Hindi ito diagnosis, at hindi nito mapapalitan ang pagpapatingin sa doktor o counselor.',
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
    notDiagnosis:
      'Hindi ito diagnosis. Tinutulungan ka lang nitong pumili kung saan magsisimula.',
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
      'Ilang linggo bago masanay. Okay na kung karamihan ng araw mo itong nagawa.',
    trackerEmpty:
      'Piliin ang "Idagdag sa 4 na linggo ko" sa 1 o 2 tool sa itaas. Lalabas sila dito para ma-tick mo araw-araw.',
    daysDone: (done: number) => `${done} sa ${PLAN_DAYS} araw`,
    weekOf: (week: number) => `Week ${week} sa ${WEEKS}`,
    weeksDone: 'Tapos na ang 4 na linggo',
    dayLabel: (date: string, done: boolean) =>
      `${date}${done ? ', nagawa' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `I-remind ako ${TIME_LABELS.tl[time].toLowerCase()} nang ${reminderClock(time)} sa loob ng 4 na linggo`,
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
    errorBoth: 'Hindi ito natuloy.',
    errorCheckIn: 'Hindi namin ma-set up ang check-in mo.',
    errorPlan: 'Hindi namin maipadala ang plano mo.',
    errorTry: 'Tingnan ang email address at subukan ulit',
    errorPrint: ', o i-print na lang ang plano',
    emailPrivacy:
      'Naka-save lang sa device na ito ang mga sagot at progress mo. Gagamitin lang namin ang email mo para sa mga pinili mo sa itaas. Basahin ang',
    privacyPolicy: 'privacy policy',
    saveTitle: 'I-save ang plano ko',
    saved:
      'Naka-save sa phone na ito. Kusang nase-save ang plano mo habang ginagamit mo, at hindi ito nakikita ng HopeBegins.',
    saveWhy:
      'May mga phone na nagbubura ng data ng website kapag isang linggo itong hindi nabuksan. Para hindi mawala ang 4 na linggo mo:',
    homeInstalled:
      'Binuksan mo ang HopeBegins mula sa home screen mo, kaya hindi mawawala ang plano mo sa phone na ito.',
    homeButton: 'Idagdag ang HopeBegins sa home screen ko',
    homeIphone:
      'Idagdag ang HopeBegins sa home screen mo: i-tap ang Share, tapos "Add to Home Screen". Doon mo buksan ang plano mo.',
    homeOther:
      'Idagdag ang HopeBegins sa home screen mo: buksan ang menu ng browser, tapos "Add to Home screen".',
    backupTitle: 'Mag-download ng backup',
    backupText:
      'Isang maliit na file na may plano at progress mo. Huwag itong ipasa sa iba. Kung mawala ang plano mo o magpalit ka ng phone, buksan ang hopebegins.today/action-plan at piliin ang "Ibalik mula sa backup".',
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
    startTool: 'Simulan',
    safetyWrite: 'Isulat ang sa iyo',
    safetySaved: 'Naka-save lang sa phone na ito ang isusulat mo dito.',
    tickedToday: 'Na-tick na para ngayong araw.',
    calmerAfter: (calmer: number, total: number) =>
      `Mas kumalma ka pagkatapos nito ${calmer} sa ${total} beses.`,
    todayAfterBreak: 'Buti bumalik ka. Simulan natin ngayong araw.',
    seeWeeks: 'Tingnan ang 4 na linggo mo',
  },
  fr: {
    locale: 'fr-FR',
    introTitle: 'Premiers pas vers l’espoir : ton plan gratuit',
    introText:
      'Réponds à 9 questions rapides sur la façon dont tu vas ces derniers temps. Tu recevras quelques petites étapes pensées pour toi, et tu peux commencer aujourd’hui.',
    nameLabel: 'Comment veux-tu qu’on t’appelle ? (facultatif)',
    start: 'Commencer mon plan',
    introNote:
      'Environ 2 minutes. Gratuit. Tes réponses restent sur cet appareil.',
    method:
      'Les étapes viennent de la TCC (thérapie cognitive et comportementale), une forme de thérapie très répandue, et du guide de l’Organisation mondiale de la santé sur le stress. Ce n’est pas un diagnostic, et ça ne remplace pas un rendez-vous chez un médecin ou un psy.',
    restorePrompt: 'Tu as déjà fait un plan et gardé une sauvegarde ?',
    restore: 'Restaurer depuis une sauvegarde',
    restoreError: 'Ce fichier n’est pas une sauvegarde de plan HopeBegins.',
    questionOf: (n: number, total: number) => `Question ${n} sur ${total}`,
    progress: 'Progression',
    previous: 'Retour',
    welcomeDay: (name: string, day: number) =>
      `Te revoilà${name ? `, ${name}` : ''}. C’est le jour ${day} de tes 4 semaines.`,
    welcomeBack: (name: string) => `Te revoilà${name ? `, ${name}` : ''}.`,
    checkInDueTitle: (name: string) =>
      `Ton dernier bilan date d’il y a une semaine${name ? `, ${name}` : ''}.`,
    checkInDueText: 'Refais-le pour voir ce qui a changé.',
    doneTitle: (name: string) =>
      `Tu as fait tes 4 semaines${name ? `, ${name}` : ''}.`,
    doneText:
      'Termine par un dernier bilan, choisis l’outil qui t’a fait le plus de bien et crée ta carte d’espoir.',
    finishButton: 'Terminer mes 4 semaines',
    hopeCardTitle: 'Ta carte d’espoir',
    hopeCardText:
      'Ton outil, tes signaux d’alerte et tes personnes de confiance, pour les jours où ça redevient dur.',
    openCard: 'Ouvrir ma carte d’espoir',
    takeAgain: 'Refaire le bilan',
    planTitle: (name: string) =>
      name
        ? `Premiers pas vers l’espoir : ton plan, ${name}`
        : 'Premiers pas vers l’espoir : ton plan',
    madeOn: (date: string) => `Fait pour toi le ${date}.`,
    startSafety: 'Commence aujourd’hui par ton plan de sécurité.',
    startTools:
      'Choisis 1 ou 2 outils du quotidien, ajoute-les à tes 4 semaines, puis coche-les chaque jour.',
    answersShow: 'Ce que montrent tes réponses',
    notDiagnosis:
      'Ce n’est pas un diagnostic. Ça t’aide à choisir par où commencer.',
    changedTitle: 'Ce qui a changé',
    lowMood: 'Moral bas',
    worry: 'Inquiétude',
    scoreNote: 'Plus c’est bas, mieux c’est. Chaque score est sur 6.',
    better:
      'Tes scores ont baissé depuis ton premier bilan. Continue ce qui t’aide.',
    same: 'À peu près comme à ton premier bilan. C’est courant les premières semaines. Continue, et appelle une ligne d’écoute gratuite si tu as l’impression de faire du surplace.',
    worse:
      'Tes scores ont augmenté depuis ton premier bilan. Parle à quelqu’un cette semaine, s’il te plaît : une ligne d’écoute gratuite, un psy ou une personne de confiance.',
    ecoachTitle: 'Envie que quelqu’un t’accompagne ?',
    ecoachText:
      'Sur une ligne d’écoute gratuite de ton pays, une vraie personne te répond. Hope AI est là aussi, à toute heure.',
    ecoachButton: 'Parler à quelqu’un',
    toolsHint:
      'Essaie-en un maintenant. Puis ajoute-en 1 ou 2 à tes 4 semaines et choisis un moment.',
    startHere: 'Commence ici',
    tryNow: 'Essayer maintenant',
    addToWeeks: 'Ajouter à mes 4 semaines',
    inWeeks: 'Dans mes 4 semaines',
    whenDo: 'Quand vas-tu le faire ?',
    trackerTitle: 'Tes 4 semaines',
    trackerIntro:
      'Coche chaque jour où tu le fais. Tu as raté un jour ? Reprends le lendemain. Les jours manqués n’effacent pas tes progrès.',
    trackerHabit:
      'Une habitude met des semaines à s’installer. La plupart des jours, c’est déjà bien.',
    trackerEmpty:
      'Choisis « Ajouter à mes 4 semaines » sur 1 ou 2 outils plus haut. Ils apparaîtront ici, et tu pourras les cocher chaque jour.',
    daysDone: (done: number) => `${done} sur ${PLAN_DAYS} jours`,
    weekOf: (week: number) => `Semaine ${week} sur ${WEEKS}`,
    weeksDone: '4 semaines terminées',
    dayLabel: (date: string, done: boolean) => `${date}${done ? ', fait' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `Me le rappeler ${TIME_LABELS.fr[time].toLowerCase()} à ${reminderClock(time, 'fr-FR')} pendant 4 semaines`,
    otherCalendar: 'iPhone ou Outlook',
    checkInTitle: 'On peut prendre de tes nouvelles la semaine prochaine ?',
    checkInText: (date: string) =>
      `On t’enverra un seul e-mail le ${date} pour savoir comment tu vas, avec un lien vers ton plan.`,
    checkInDone: (date: string) => `C’est noté. On t’écrira le ${date}.`,
    planSent: (email: string) =>
      `Ton plan est en route vers ${email}. Regarde dans tes spams si tu ne le vois pas.`,
    firstName: 'Prénom (facultatif)',
    email: 'E-mail',
    checkInConsent: 'Prendre de mes nouvelles dans 7 jours.',
    checkInConsentText:
      'HopeBegins utilisera mon e-mail pour ce seul message, puis l’effacera.',
    planConsent: 'M’envoyer mon plan par e-mail maintenant',
    planConsentText: ', pour l’avoir sur tous mes appareils.',
    submitBoth: 'Prendre de mes nouvelles et m’envoyer mon plan',
    submitCheckIn: 'Prendre de mes nouvelles la semaine prochaine',
    submitPlan: 'M’envoyer mon plan',
    submitNone: 'Choisis une option ci-dessus',
    errorBoth: 'Ça n’a pas marché.',
    errorCheckIn: 'On n’a pas pu prévoir l’e-mail de suivi.',
    errorPlan: 'On n’a pas pu envoyer ton plan.',
    errorTry: 'Vérifie l’adresse e-mail et réessaie',
    errorPrint: ', ou imprime plutôt ton plan',
    emailPrivacy:
      'Tes réponses et tes progrès sont enregistrés seulement sur cet appareil. On utilise ton e-mail uniquement pour ce que tu as coché plus haut. Voir notre',
    privacyPolicy: 'politique de confidentialité',
    saveTitle: 'Enregistrer mon plan',
    saved:
      'Enregistré sur ce téléphone. Ton plan s’enregistre tout seul au fur et à mesure, et HopeBegins ne peut pas le voir.',
    saveWhy:
      'Certains téléphones effacent les données des sites après environ une semaine sans visite. Pour garder tes 4 semaines à l’abri :',
    homeInstalled:
      'Tu as ouvert HopeBegins depuis ton écran d’accueil, donc ton plan reste sur ce téléphone.',
    homeButton: 'Ajouter HopeBegins à mon écran d’accueil',
    homeIphone:
      'Ajoute HopeBegins à ton écran d’accueil : touche Partager, puis « Sur l’écran d’accueil ». Ouvre ton plan depuis là.',
    homeOther:
      'Ajoute HopeBegins à ton écran d’accueil : ouvre le menu de ton navigateur, puis « Ajouter à l’écran d’accueil ».',
    backupTitle: 'Télécharger une sauvegarde',
    backupText:
      'Un petit fichier avec ton plan et tes progrès. Garde-le pour toi. Si ton plan disparaît ou si tu changes de téléphone, ouvre hopebegins.today/fr/action-plan et choisis « Restaurer depuis une sauvegarde ».',
    backupButton: 'Télécharger ma sauvegarde',
    print: 'Imprimer ou enregistrer en PDF',
    deletePlan: 'Supprimer mon plan de cet appareil',
    deleteConfirm: 'Supprimer ton plan et tes progrès de cet appareil ?',
    weekSection: 'Tes 4 semaines',
    weekSectionDetail:
      'Fais-le la plupart des jours pendant les 4 prochaines semaines.',
    todayTitle: 'Aujourd’hui',
    doneToday: 'Fait aujourd’hui',
    didToday: 'Fait',
    startTool: 'Commencer',
    safetyWrite: 'Écris le tien',
    safetySaved:
      'Ce que tu écris ici est enregistré seulement sur ce téléphone.',
    tickedToday: 'Coché pour aujourd’hui dans tes 4 semaines.',
    calmerAfter: (calmer: number, total: number) =>
      `Ça t’a apporté du calme ${calmer} fois sur ${total}.`,
    todayAfterBreak: 'Ça fait plaisir de te revoir. Commence par aujourd’hui.',
    seeWeeks: 'Voir tes 4 semaines',
  },
  de: {
    locale: 'de-DE',
    introTitle: 'Ein hoffnungsvoller Anfang: dein kostenloser Plan',
    introText:
      'Beantworte 9 kurze Fragen dazu, wie es dir in letzter Zeit ging. Du bekommst ein paar kleine Schritte, die zu dir passen, und kannst heute anfangen.',
    nameLabel: 'Wie dürfen wir dich nennen? (optional)',
    start: 'Meinen Plan starten',
    introNote:
      'Etwa 2 Minuten. Kostenlos. Deine Antworten bleiben auf diesem Gerät.',
    method:
      'Die Schritte kommen aus der kognitiven Verhaltenstherapie (KVT), einer bewährten Form der Psychotherapie, und aus dem Stress-Ratgeber der Weltgesundheitsorganisation. Das ist keine Diagnose und ersetzt keinen Besuch in einer Arztpraxis oder Beratungsstelle.',
    restorePrompt:
      'Schon mal einen Plan gemacht und eine Sicherung gespeichert?',
    restore: 'Aus einer Sicherung wiederherstellen',
    restoreError: 'Diese Datei ist keine Sicherung eines HopeBegins-Plans.',
    questionOf: (n: number, total: number) => `Frage ${n} von ${total}`,
    progress: 'Fortschritt',
    previous: 'Zurück',
    welcomeDay: (name: string, day: number) =>
      `Schön, dass du wieder da bist${name ? `, ${name}` : ''}. Heute ist Tag ${day} deiner 4 Wochen.`,
    welcomeBack: (name: string) =>
      `Schön, dass du wieder da bist${name ? `, ${name}` : ''}.`,
    checkInDueTitle: (name: string) =>
      `Dein letzter Check-in ist eine Woche her${name ? `, ${name}` : ''}.`,
    checkInDueText: 'Mach ihn noch mal, um zu sehen, was sich verändert hat.',
    doneTitle: (name: string) =>
      `Du hast 4 Wochen geschafft${name ? `, ${name}` : ''}.`,
    doneText:
      'Mach zum Schluss einen letzten Check-in, wähl die Übung, die dir am meisten geholfen hat, und erstelle deine Hoffnungskarte.',
    finishButton: 'Meine 4 Wochen abschließen',
    hopeCardTitle: 'Deine Hoffnungskarte',
    hopeCardText:
      'Deine Übung, deine Warnzeichen und deine Menschen, für die Tage, die wieder schwer werden.',
    openCard: 'Meine Hoffnungskarte öffnen',
    takeAgain: 'Check-in noch mal machen',
    planTitle: (name: string) =>
      name
        ? `Ein hoffnungsvoller Anfang: dein Plan, ${name}`
        : 'Ein hoffnungsvoller Anfang: dein Plan',
    madeOn: (date: string) => `Für dich erstellt am ${date}.`,
    startSafety: 'Fang heute mit deinem Sicherheitsplan an.',
    startTools:
      'Wähl 1 oder 2 tägliche Übungen, nimm sie in deine 4 Wochen auf und hak sie jeden Tag ab.',
    answersShow: 'Was deine Antworten zeigen',
    notDiagnosis:
      'Das ist keine Diagnose. Es hilft dir zu entscheiden, wo du anfängst.',
    changedTitle: 'Was sich verändert hat',
    lowMood: 'Gedrückte Stimmung',
    worry: 'Sorgen',
    scoreNote: 'Niedriger ist besser. Jeder Wert geht bis 6.',
    better:
      'Deine Werte sind seit deinem ersten Check-in gesunken. Mach weiter mit dem, was dir hilft.',
    same: 'Ungefähr wie bei deinem ersten Check-in. Das ist in den ersten Wochen häufig. Bleib dran, und ruf bei einem kostenlosen Hilfetelefon an, wenn du nicht weiterkommst.',
    worse:
      'Deine Werte sind seit deinem ersten Check-in gestiegen. Bitte sprich diese Woche mit jemandem: bei einem kostenlosen Hilfetelefon, in einer Beratungsstelle oder mit einem Menschen, dem du vertraust.',
    ecoachTitle: 'Möchtest du mit jemandem darüber reden?',
    ecoachText:
      'Bei den kostenlosen Hilfetelefonen in deinem Land hört dir jemand zu. Und Hope AI ist rund um die Uhr da.',
    ecoachButton: 'Mit jemandem reden',
    toolsHint:
      'Probier jetzt eine aus. Nimm dann 1 oder 2 in deine 4 Wochen auf und wähl eine Uhrzeit.',
    startHere: 'Fang hier an',
    tryNow: 'Jetzt ausprobieren',
    addToWeeks: 'Zu meinen 4 Wochen hinzufügen',
    inWeeks: 'In meinen 4 Wochen',
    whenDo: 'Wann machst du sie?',
    trackerTitle: 'Deine 4 Wochen',
    trackerIntro:
      'Hak jeden Tag ab, an dem du sie gemacht hast. Einen Tag verpasst? Mach am nächsten Tag weiter. Verpasste Tage machen deinen Fortschritt nicht zunichte.',
    trackerHabit:
      'Gewohnheiten brauchen Wochen. Es reicht, wenn du sie an den meisten Tagen machst.',
    trackerEmpty:
      'Wähl oben bei 1 oder 2 Übungen „Zu meinen 4 Wochen hinzufügen“. Dann erscheinen sie hier, und du kannst sie jeden Tag abhaken.',
    daysDone: (done: number) => `${done} von ${PLAN_DAYS} Tagen`,
    weekOf: (week: number) => `Woche ${week} von ${WEEKS}`,
    weeksDone: '4 Wochen geschafft',
    dayLabel: (date: string, done: boolean) =>
      `${date}${done ? ', erledigt' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `Erinnere mich 4 Wochen lang ${TIME_LABELS.de[time].charAt(0).toLowerCase()}${TIME_LABELS.de[time].slice(1)} um ${reminderClock(time, 'de-DE')} Uhr`,
    otherCalendar: 'iPhone oder Outlook',
    checkInTitle: 'Dürfen wir nächste Woche fragen, wie es dir geht?',
    checkInText: (date: string) =>
      `Wir schicken dir am ${date} eine einzige E-Mail und fragen, wie es dir geht, mit einem Link zurück zu deinem Plan.`,
    checkInDone: (date: string) => `Erledigt. Wir schreiben dir am ${date}.`,
    planSent: (email: string) =>
      `Dein Plan ist unterwegs an ${email}. Schau im Spam-Ordner nach, falls du ihn nicht siehst.`,
    firstName: 'Vorname (optional)',
    email: 'E-Mail',
    checkInConsent: 'In 7 Tagen nachfragen, wie es mir geht.',
    checkInConsentText:
      'HopeBegins nutzt meine E-Mail-Adresse nur für diese eine E-Mail und löscht sie danach.',
    planConsent: 'Meinen Plan jetzt per E-Mail schicken',
    planConsentText: ', damit ich ihn auf jedem Gerät habe.',
    submitBoth: 'Nachfragen und Plan schicken',
    submitCheckIn: 'Nächste Woche nachfragen',
    submitPlan: 'Plan per E-Mail schicken',
    submitNone: 'Wähl oben etwas aus',
    errorBoth: 'Das hat nicht geklappt.',
    errorCheckIn: 'Wir konnten die Nachfrage per E-Mail nicht einrichten.',
    errorPlan: 'Wir konnten deinen Plan nicht schicken.',
    errorTry: 'Prüf die E-Mail-Adresse und versuch es noch mal',
    errorPrint: ' oder druck den Plan stattdessen aus',
    emailPrivacy:
      'Deine Antworten und dein Fortschritt sind nur auf diesem Gerät gespeichert. Deine E-Mail-Adresse nutzen wir nur für das, was du oben angekreuzt hast. Mehr dazu in unserer',
    privacyPolicy: 'Datenschutzerklärung',
    saveTitle: 'Meinen Plan speichern',
    saved:
      'Auf diesem Handy gespeichert. Dein Plan speichert sich beim Benutzen von selbst, und HopeBegins kann ihn nicht sehen.',
    saveWhy:
      'Manche Handys löschen Website-Daten, wenn du etwa eine Woche nicht vorbeischaust. So bleiben deine 4 Wochen sicher:',
    homeInstalled:
      'Du hast HopeBegins über deinen Home-Bildschirm geöffnet, also bleibt dein Plan auf diesem Handy.',
    homeButton: 'HopeBegins zum Home-Bildschirm hinzufügen',
    homeIphone:
      'Füge HopeBegins zu deinem Home-Bildschirm hinzu: Tippe auf Teilen und dann auf „Zum Home-Bildschirm“. Öffne deinen Plan von dort.',
    homeOther:
      'Füge HopeBegins zu deinem Startbildschirm hinzu: Öffne das Menü deines Browsers und dann „Zum Startbildschirm hinzufügen“.',
    backupTitle: 'Eine Sicherung herunterladen',
    backupText:
      'Eine kleine Datei mit deinem Plan und deinem Fortschritt. Behalte sie für dich. Wenn dein Plan verschwindet oder du ein neues Handy hast, öffne hopebegins.today/de/action-plan und wähle „Aus einer Sicherung wiederherstellen“.',
    backupButton: 'Meine Sicherung herunterladen',
    print: 'Drucken oder als PDF speichern',
    deletePlan: 'Meinen Plan von diesem Gerät löschen',
    deleteConfirm:
      'Deinen Plan und deinen Fortschritt von diesem Gerät löschen?',
    weekSection: 'Deine 4 Wochen',
    weekSectionDetail: 'Mach es an den meisten Tagen der nächsten 4 Wochen.',
    todayTitle: 'Heute',
    doneToday: 'Heute erledigt',
    didToday: 'Erledigt',
    startTool: 'Starten',
    safetyWrite: 'Schreib deins auf',
    safetySaved:
      'Was du hier schreibst, wird nur auf diesem Handy gespeichert.',
    tickedToday: 'Für heute in deinen 4 Wochen abgehakt.',
    calmerAfter: (calmer: number, total: number) =>
      `Danach warst du ${calmer} von ${total} Mal ruhiger.`,
    todayAfterBreak: 'Schön, dich zu sehen. Fang mit heute an.',
    seeWeeks: 'Deine 4 Wochen ansehen',
  },
  es: {
    locale: 'es-419',
    introTitle: 'Un comienzo con esperanza: tu plan gratis',
    introText:
      'Responde 9 preguntas rápidas sobre cómo has estado. Recibirás unos pasos pequeños hechos para ti, y puedes empezar hoy.',
    nameLabel: '¿Cómo quieres que te llamemos? (opcional)',
    start: 'Empezar mi plan',
    introNote:
      'Unos 2 minutos. Gratis. Tus respuestas se quedan en este dispositivo.',
    method:
      'Los pasos vienen de la TCC (terapia cognitivo-conductual), una terapia muy usada, y de la guía sobre el estrés de la Organización Mundial de la Salud. No es un diagnóstico y no reemplaza una consulta médica o psicológica.',
    restorePrompt: '¿Ya hiciste un plan y guardaste un respaldo?',
    restore: 'Restaurar desde un respaldo',
    restoreError: 'Ese archivo no es un respaldo de un plan de HopeBegins.',
    questionOf: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    progress: 'Progreso',
    previous: 'Atrás',
    welcomeDay: (name: string, day: number) =>
      `Qué bueno verte de nuevo${name ? `, ${name}` : ''}. Hoy es el día ${day} de tus 4 semanas.`,
    welcomeBack: (name: string) =>
      `Qué bueno verte de nuevo${name ? `, ${name}` : ''}.`,
    checkInDueTitle: (name: string) =>
      `Ya pasó una semana desde tu último chequeo${name ? `, ${name}` : ''}.`,
    checkInDueText: 'Hazlo de nuevo para ver qué ha cambiado.',
    doneTitle: (name: string) =>
      `Completaste 4 semanas${name ? `, ${name}` : ''}.`,
    doneText:
      'Termina con un último chequeo, elige la herramienta que más te ayudó y haz tu tarjeta de esperanza.',
    finishButton: 'Terminar mis 4 semanas',
    hopeCardTitle: 'Tu tarjeta de esperanza',
    hopeCardText:
      'Tu herramienta, tus señales de alerta y tus personas, para los días que se vuelvan difíciles otra vez.',
    openCard: 'Abrir mi tarjeta de esperanza',
    takeAgain: 'Hacer el chequeo otra vez',
    planTitle: (name: string) =>
      name
        ? `Un comienzo con esperanza: el plan de ${name}`
        : 'Un comienzo con esperanza: tu plan',
    madeOn: (date: string) => `Hecho para ti el ${date}.`,
    startSafety: 'Empieza hoy con tu plan de seguridad.',
    startTools:
      'Elige 1 o 2 herramientas diarias, agrégalas a tus 4 semanas y márcalas cada día.',
    answersShow: 'Lo que muestran tus respuestas',
    notDiagnosis: 'No es un diagnóstico. Te ayuda a elegir por dónde empezar.',
    changedTitle: 'Lo que ha cambiado',
    lowMood: 'Ánimo bajo',
    worry: 'Preocupación',
    scoreNote: 'Mientras más bajo, mejor. Cada puntaje es sobre 6.',
    better:
      'Tus puntajes bajaron desde tu primer chequeo. Sigue con lo que te está ayudando.',
    same: 'Más o menos igual que en tu primer chequeo. Es común en las primeras semanas. Sigue adelante, y habla con alguien de una línea de ayuda gratuita si sientes que no avanzas.',
    worse:
      'Tus puntajes subieron desde tu primer chequeo. Por favor, habla con alguien esta semana: una línea de ayuda gratuita, un psicólogo o una persona de confianza.',
    ecoachTitle: '¿Quieres que alguien te acompañe en esto?',
    ecoachText:
      'Las líneas de ayuda gratuitas de tu país pueden escucharte, y Hope AI está disponible a cualquier hora.',
    ecoachButton: 'Hablar con alguien',
    toolsHint:
      'Prueba una ahora. Luego agrega 1 o 2 a tus 4 semanas y elige una hora.',
    startHere: 'Empieza aquí',
    tryNow: 'Probar ahora',
    addToWeeks: 'Agregar a mis 4 semanas',
    inWeeks: 'En mis 4 semanas',
    whenDo: '¿Cuándo la vas a usar?',
    trackerTitle: 'Tus 4 semanas',
    trackerIntro:
      'Marca cada día que la uses. ¿Te saltaste un día? Retómala al día siguiente. Los días que te saltes no borran tu avance.',
    trackerHabit:
      'Los hábitos tardan semanas en afianzarse. Con la mayoría de los días basta.',
    trackerEmpty:
      'Elige “Agregar a mis 4 semanas” en 1 o 2 herramientas de arriba. Aparecerán aquí para que las marques cada día.',
    daysDone: (done: number) => `${done} de ${PLAN_DAYS} días`,
    weekOf: (week: number) => `Semana ${week} de ${WEEKS}`,
    weeksDone: '4 semanas completadas',
    dayLabel: (date: string, done: boolean) =>
      `${date}${done ? ', hecho' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `Recordarme ${TIME_LABELS.es[time].toLowerCase()} a las ${reminderClock(time, 'es-419')} durante 4 semanas`,
    otherCalendar: 'iPhone u Outlook',
    checkInTitle: '¿Podemos preguntarte cómo estás la próxima semana?',
    checkInText: (date: string) =>
      `Te enviaremos un solo correo el ${date} para preguntarte cómo estás, con un enlace de vuelta a tu plan.`,
    checkInDone: (date: string) => `Listo. Te escribiremos el ${date}.`,
    planSent: (email: string) =>
      `Tu plan va en camino a ${email}. Revisa tu carpeta de spam si no lo ves.`,
    firstName: 'Nombre (opcional)',
    email: 'Correo electrónico',
    checkInConsent: 'Preguntarme cómo estoy en 7 días.',
    checkInConsentText:
      'HopeBegins usará mi correo solo para este mensaje y luego lo borrará.',
    planConsent: 'Enviarme mi plan por correo ahora',
    planConsentText: ', para tenerlo en cualquier dispositivo.',
    submitBoth: 'Preguntarme cómo estoy y enviarme mi plan',
    submitCheckIn: 'Preguntarme la próxima semana',
    submitPlan: 'Enviarme mi plan',
    submitNone: 'Elige una opción arriba',
    errorBoth: 'No se pudo completar.',
    errorCheckIn: 'No pudimos programar el correo para preguntarte cómo estás.',
    errorPlan: 'No pudimos enviar tu plan.',
    errorTry: 'Revisa el correo y vuelve a intentarlo',
    errorPrint: ', o mejor imprime el plan',
    emailPrivacy:
      'Tus respuestas y tu avance se guardan solo en este dispositivo. Usamos tu correo solo para lo que marcaste arriba. Consulta nuestra',
    privacyPolicy: 'política de privacidad',
    saveTitle: 'Guardar mi plan',
    saved:
      'Guardado en este celular. Tu plan se guarda automáticamente mientras lo usas, y HopeBegins no puede verlo.',
    saveWhy:
      'Algunos celulares borran los datos de los sitios web después de una semana sin visitarlos. Para cuidar tus 4 semanas:',
    homeInstalled:
      'Abriste HopeBegins desde tu pantalla de inicio, así que tu plan se queda en este celular.',
    homeButton: 'Agregar HopeBegins a mi pantalla de inicio',
    homeIphone:
      'Agrega HopeBegins a tu pantalla de inicio: toca Compartir y luego “Agregar a inicio”. Abre tu plan desde ahí.',
    homeOther:
      'Agrega HopeBegins a tu pantalla de inicio: abre el menú del navegador y luego “Agregar a la pantalla principal”.',
    backupTitle: 'Descargar un respaldo',
    backupText:
      'Un archivo pequeño con tu plan y tu avance. Guárdalo en privado. Si tu plan desaparece o cambias de celular, abre hopebegins.today/es/action-plan y elige “Restaurar desde un respaldo”.',
    backupButton: 'Descargar mi respaldo',
    print: 'Imprimir o guardar como PDF',
    deletePlan: 'Borrar mi plan de este dispositivo',
    deleteConfirm: '¿Borrar tu plan y tu avance de este dispositivo?',
    weekSection: 'Tus 4 semanas',
    weekSectionDetail:
      'Úsala la mayoría de los días durante las próximas 4 semanas.',
    todayTitle: 'Hoy',
    doneToday: 'Hecho hoy',
    didToday: 'Hecho',
    startTool: 'Empezar',
    safetyWrite: 'Escribe lo tuyo',
    safetySaved: 'Lo que escribas aquí se guarda solo en este celular.',
    tickedToday: 'Marcado por hoy en tus 4 semanas.',
    calmerAfter: (calmer: number, total: number) =>
      `Sentiste más calma después ${calmer} de ${total} ${total === 1 ? 'vez' : 'veces'}.`,
    todayAfterBreak: 'Qué bueno verte. Empieza por hoy.',
    seeWeeks: 'Ver tus 4 semanas',
  },
  ko: {
    locale: 'ko-KR',
    introTitle: '희망의 첫걸음: 나만의 무료 계획',
    introText:
      '요즘 어떻게 지냈는지 묻는 짧은 질문 9개에 답해 주세요. 나에게 맞춘 작은 단계 몇 가지를 받고, 오늘부터 시작할 수 있어요.',
    nameLabel: '뭐라고 불러 드릴까요? (선택)',
    start: '내 계획 시작하기',
    introNote: '약 2분. 무료. 답은 이 기기에만 저장돼요.',
    method:
      '이 단계들은 널리 쓰이는 상담 치료인 인지행동치료(CBT)와 세계보건기구(WHO)의 스트레스 가이드에서 가져왔어요. 진단이 아니며, 의사나 상담사를 만나는 것을 대신하지 않아요.',
    restorePrompt: '전에 계획을 만들고 백업을 저장해 두었나요?',
    restore: '백업에서 복원하기',
    restoreError: '이 파일은 HopeBegins 계획 백업이 아니에요.',
    questionOf: (n: number, total: number) => `질문 ${n}/${total}`,
    progress: '진행 상황',
    previous: '뒤로',
    welcomeDay: (name: string, day: number) =>
      `${name ? `${name}님, ` : ''}다시 와 줘서 반가워요. 오늘은 4주 중 ${day}일째예요.`,
    welcomeBack: (name: string) =>
      `${name ? `${name}님, ` : ''}다시 와 줘서 반가워요.`,
    checkInDueTitle: (name: string) =>
      `${name ? `${name}님, ` : ''}마지막 체크인 후 일주일이 지났어요.`,
    checkInDueText: '다시 해 보고 무엇이 달라졌는지 확인해 보세요.',
    doneTitle: (name: string) => `${name ? `${name}님, ` : ''}4주를 해냈어요.`,
    doneText:
      '마지막 체크인을 하고, 가장 도움이 된 도구를 고르고, 희망 카드를 만들어 보세요.',
    finishButton: '4주 마무리하기',
    hopeCardTitle: '내 희망 카드',
    hopeCardText:
      '다시 힘들어지는 날을 위한 내 도구, 경고 신호, 그리고 내 사람들이에요.',
    openCard: '내 희망 카드 열기',
    takeAgain: '체크인 다시 하기',
    planTitle: (name: string) =>
      name ? `희망의 첫걸음: ${name}님의 계획` : '희망의 첫걸음: 나만의 계획',
    madeOn: (date: string) => `${date}에 만든 나만의 계획이에요.`,
    startSafety: '오늘은 안전 계획부터 시작해요.',
    startTools: '매일 쓸 도구를 한두 개 골라 4주 계획에 넣고, 매일 체크해요.',
    answersShow: '답에서 보이는 것',
    notDiagnosis: '진단이 아니에요. 어디서부터 시작할지 고르는 데 도움이 돼요.',
    changedTitle: '달라진 점',
    lowMood: '가라앉은 기분',
    worry: '걱정',
    scoreNote: '낮을수록 좋아요. 각 점수는 6점 만점이에요.',
    better: '첫 체크인 이후 점수가 내려갔어요. 도움이 되는 것을 계속해요.',
    same: '첫 체크인과 거의 비슷해요. 처음 몇 주에는 흔한 일이에요. 계속해 보고, 막힌 느낌이 들면 무료 상담 전화로 이야기해 보세요.',
    worse:
      '첫 체크인 이후 점수가 올라갔어요. 이번 주에 꼭 누군가와 이야기해 주세요. 무료 상담 전화, 상담사, 믿을 수 있는 사람 모두 좋아요.',
    ecoachTitle: '누군가 곁에 있어 주면 좋겠나요?',
    ecoachText:
      '내가 있는 나라의 무료 상담 전화에서 이야기를 들어 줄 수 있어요. Hope AI와도 언제든 대화할 수 있어요.',
    ecoachButton: '누군가와 이야기하기',
    toolsHint:
      '지금 하나를 해 보세요. 그다음 한두 개를 4주 계획에 넣고 시간을 정해요.',
    startHere: '여기서 시작',
    tryNow: '지금 해 보기',
    addToWeeks: '4주 계획에 넣기',
    inWeeks: '4주 계획에 있어요',
    whenDo: '언제 할까요?',
    trackerTitle: '나의 4주',
    trackerIntro:
      '한 날마다 체크하세요. 하루를 놓쳤나요? 다음 날 다시 하면 돼요. 놓친 날이 있어도 그동안 해 온 것은 사라지지 않아요.',
    trackerHabit:
      '습관이 자리 잡으려면 몇 주가 걸려요. 대부분의 날에 하면 충분해요.',
    trackerEmpty:
      '위에서 도구 한두 개에 ‘4주 계획에 넣기’를 눌러 보세요. 여기에 나타나서 매일 체크할 수 있어요.',
    daysDone: (done: number) => `${PLAN_DAYS}일 중 ${done}일`,
    weekOf: (week: number) => `${WEEKS}주 중 ${week}주째`,
    weeksDone: '4주 완료',
    dayLabel: (date: string, done: boolean) => `${date}${done ? ', 완료' : ''}`,
    remindMe: (time: TimeOfDay) =>
      `4주 동안 매일 ${reminderClock(time, 'ko-KR-u-hc-h23')}에 알림 받기`,
    otherCalendar: 'iPhone 또는 Outlook',
    checkInTitle: '다음 주에 안부를 물어봐도 될까요?',
    checkInText: (date: string) =>
      `${date}에 잘 지내는지 묻는 이메일을 한 번만 보낼게요. 계획으로 돌아오는 링크도 함께 넣을게요.`,
    checkInDone: (date: string) => `좋아요. ${date}에 이메일을 보낼게요.`,
    planSent: (email: string) =>
      `계획을 이 주소로 보내고 있어요: ${email}. 보이지 않으면 스팸함을 확인해 보세요.`,
    firstName: '이름 (선택)',
    email: '이메일',
    checkInConsent: '7일 뒤에 안부를 물어봐 주세요.',
    checkInConsentText:
      'HopeBegins는 이 이메일 한 통을 보낼 때만 내 이메일 주소를 쓰고, 그다음 지워요.',
    planConsent: '지금 내 계획을 이메일로 받기',
    planConsentText: ': 어느 기기에서나 볼 수 있어요.',
    submitBoth: '안부 이메일과 계획 받기',
    submitCheckIn: '다음 주에 안부 이메일 받기',
    submitPlan: '계획을 이메일로 받기',
    submitNone: '위에서 하나를 골라 주세요',
    errorBoth: '전송되지 않았어요.',
    errorCheckIn: '안부 이메일을 예약하지 못했어요.',
    errorPlan: '계획을 보내지 못했어요.',
    errorTry: '이메일 주소를 확인하고 다시 시도해 주세요',
    errorPrint: '. 아니면 계획을 인쇄해 두세요',
    emailPrivacy:
      '답과 진행 상황은 이 기기에만 저장돼요. 이메일 주소는 위에서 체크한 용도로만 써요. 자세한 내용은',
    privacyPolicy: '개인정보 처리방침에서 확인하세요',
    saveTitle: '내 계획 저장하기',
    saved:
      '이 휴대폰에 저장됐어요. 계획은 쓰는 동안 자동으로 저장되고, HopeBegins는 볼 수 없어요.',
    saveWhy:
      '어떤 휴대폰은 일주일쯤 방문하지 않으면 웹사이트 데이터를 지워요. 4주 기록을 안전하게 지키려면:',
    homeInstalled:
      '홈 화면에서 HopeBegins를 열었으니, 계획이 이 휴대폰에 그대로 남아 있어요.',
    homeButton: 'HopeBegins를 홈 화면에 추가하기',
    homeIphone:
      'HopeBegins를 홈 화면에 추가하세요. 공유를 누른 다음 ‘홈 화면에 추가’를 누르고, 거기서 계획을 열면 돼요.',
    homeOther:
      'HopeBegins를 홈 화면에 추가하세요. 브라우저 메뉴를 열고 ‘홈 화면에 추가’를 누르면 돼요.',
    backupTitle: '백업 다운로드하기',
    backupText:
      '계획과 진행 상황이 담긴 작은 파일이에요. 다른 사람과 공유하지 마세요. 계획이 사라지거나 휴대폰을 바꾸면 hopebegins.today/ko/action-plan을 열고 ‘백업에서 복원하기’를 고르세요.',
    backupButton: '내 백업 다운로드하기',
    print: '인쇄하거나 PDF로 저장하기',
    deletePlan: '이 기기에서 내 계획 삭제하기',
    deleteConfirm: '이 기기에서 계획과 진행 상황을 삭제할까요?',
    weekSection: '나의 4주',
    weekSectionDetail: '앞으로 4주 동안 거의 매일 해 보세요.',
    todayTitle: '오늘',
    doneToday: '오늘 했어요',
    didToday: '완료',
    startTool: '시작하기',
    safetyWrite: '내 답 적기',
    safetySaved: '여기에 적은 내용은 이 휴대폰에만 저장돼요.',
    tickedToday: '4주 기록에 오늘을 체크했어요.',
    calmerAfter: (calmer: number, total: number) =>
      `${total}번 중 ${calmer}번은 하고 나서 더 차분해졌어요.`,
    todayAfterBreak: '다시 만나서 반가워요. 오늘부터 시작해요.',
    seeWeeks: '나의 4주 보기',
  },
};

type Copy = (typeof ui)['en'];

const linkClass =
  'mt-2 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none print:hidden';

const chipClass =
  'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

const reminderButtonClass =
  'inline-flex min-h-11 items-center rounded-xl border border-[#AEC488] bg-white px-4 text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

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
          className="inline-flex w-full shrink-0 items-center justify-center rounded-2xl bg-white px-5 py-4 text-center font-poppins font-bold leading-snug text-[#6E5F47] md:w-auto md:px-6 transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 print:hidden"
        >
          <MessageCircle className="mr-2 w-5 h-5 shrink-0" />
          <span>{t.ecoachButton}</span>
        </EcoachLink>
      </CardContent>
    </Card>
  );
}

function ItemBody({ item }: { item: PlanItem }) {
  const lang = usePageLanguage();
  const href = item.href;
  const opensNewTab = href?.startsWith('http');

  if (item.crisisLines) {
    return (
      <>
        <p className="mt-1 text-[#6E5F47] leading-relaxed">
          <CrisisList lang={lang} />
        </p>
        <CallCrisisButton lang={lang} className={linkClass} />
      </>
    );
  }

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
  lang,
  t,
}: {
  item: PlanItem;
  emphasis?: boolean;
  lang: PlanLang;
  t: Copy;
}) {
  const [isTrying, setIsTrying] = useState(false);
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
        {item.exercise &&
          (isTrying ? (
            <ToolExercise
              kind={item.exercise}
              lang={lang}
              source="plan"
              onClose={() => setIsTrying(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsTrying(true)}
              className={`mt-5 print:hidden ${toolButtonClass}`}
            >
              {t.tryNow}
            </button>
          ))}
      </CardContent>
    </Card>
  );
}

/** A safety plan step with a place to write their own answer, kept on the phone. */
function SafetyStepCard({
  item,
  saved,
  t,
}: {
  item: PlanItem;
  saved: SavedPlan;
  t: Copy;
}) {
  const fieldId = `safety-${item.id}`;
  return (
    <Card className="py-0 bg-[#EFF3E7] border-[#AEC488]">
      <CardContent className="p-6">
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />
        <label
          htmlFor={fieldId}
          className="mt-4 block text-sm font-bold text-[#6E5F47]"
        >
          {t.safetyWrite}
          <span className="sr-only">: {item.title}</span>
        </label>
        <textarea
          id={fieldId}
          rows={2}
          maxLength={MAX_SAFETY_LENGTH}
          value={saved.safetyPlan?.[item.id] ?? ''}
          onChange={(event) => {
            const text = event.target.value;
            updatePlan((plan) => ({
              ...plan,
              safetyPlan: { ...plan.safetyPlan, [item.id]: text },
            }));
          }}
          className="mt-2 w-full rounded-xl border border-[#DFE7CF] bg-white p-3 text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 print:border-zinc-300"
        />
      </CardContent>
    </Card>
  );
}

function ToolCard({
  item,
  isFirst,
  saved,
  lang,
  t,
}: {
  item: PlanItem;
  isFirst: boolean;
  saved: SavedPlan;
  lang: PlanLang;
  t: Copy;
}) {
  const [isTrying, setIsTrying] = useState(false);
  // Decided when the tool opens, so the note matches what finishing does.
  const [willTick, setWillTick] = useState(false);
  const tryRef = useRef<HTMLButtonElement>(null);
  // Back to "Try it now" once the exercise closes.
  const closeTry = () => {
    setIsTrying(false);
    requestAnimationFrame(() => tryRef.current?.focus());
  };
  const time = saved.commitments[item.id];
  const isInWeek = time !== undefined;
  const helped = calmerCount(useToolChecks(), item.id);

  const handleFinish = useCallback(() => {
    if (markTodayDone(item.id)) {
      analyticsService.recordClick(`plan_today_done_${item.id}`);
    }
  }, [item.id]);

  const toggleWeek = () => {
    if (!isInWeek) analyticsService.recordClick(`plan_tool_add_${item.id}`);
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
          ? 'py-0 bg-white border-[#AEC488] shadow-none'
          : 'py-0 bg-white border-zinc-100'
      }
    >
      <CardContent className="p-6">
        {isFirst && (
          <p className="mb-2 inline-flex rounded-full bg-[#EFF3E7] px-3 py-1 text-sm font-bold text-[#6E5F47]">
            {t.startHere}
          </p>
        )}
        <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
          {item.title}
        </h3>
        <ItemBody item={item} />
        {helped.total > 0 && (
          <p className="mt-3 text-sm font-bold text-[#6E5F47]">
            {t.calmerAfter(helped.calmer, helped.total)}
          </p>
        )}

        {isTrying && item.exercise && (
          <ToolExercise
            kind={item.exercise}
            lang={lang}
            source="plan"
            onClose={closeTry}
            onFinish={handleFinish}
            doneNote={willTick ? t.tickedToday : undefined}
          />
        )}

        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          {item.exercise && !isTrying && (
            <button
              ref={tryRef}
              type="button"
              onClick={() => {
                analyticsService.recordClick('plan_tool_try');
                setWillTick(canTickToday(saved, item.id));
                setIsTrying(true);
              }}
              className="inline-flex items-center rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
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
          <div className="mt-4 rounded-2xl bg-[#EFF3E7] p-4 print:bg-transparent print:p-0 hb-panel-in">
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
  // Back after a day or more without ticking: start with today, no tally.
  const isBackAfterBreak =
    today >= 2 &&
    committed.every((tool) => saved.checks[tool.id]?.[today - 1] !== true);

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
      {isBackAfterBreak && (
        <p className="mt-1 text-[#6E5F47]">{t.todayAfterBreak}</p>
      )}
      <ul className="mt-3 space-y-4">
        {committed.map((tool) => {
          const checks = saved.checks[tool.id] ?? [];
          const isDone = checks[today] === true;
          return (
            <li
              key={tool.id}
              id={`today-${tool.id}`}
              className="scroll-mt-24 space-y-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                    if (!isDone) {
                      analyticsService.recordClick(
                        `plan_today_done_${tool.id}`
                      );
                    }
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
              </div>
              {tool.exercise && (
                <UseMyTool
                  tool={tool}
                  saved={saved}
                  lang={lang}
                  label={t.startTool}
                  buttonClassName={`${toolButtonClass} w-full sm:w-auto`}
                />
              )}
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
  // Reminders cover the days left in the 4 weeks, and stop being offered after.
  const daysLeft = PLAN_DAYS - today;
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
                    <p className="shrink-0 font-poppins font-bold text-[#6E5F47] tabular-nums">
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
                          onClick={() => {
                            if (!isDone) {
                              analyticsService.recordClick(
                                `plan_grid_tick_${tool.id}`
                              );
                            }
                            toggleDay(tool.id, day);
                          }}
                          aria-pressed={isDone}
                          aria-label={t.dayLabel(
                            date.toLocaleDateString(t.locale, {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            }),
                            isDone
                          )}
                          className={`flex h-11 items-center justify-center rounded-xl border text-xs font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] disabled:cursor-not-allowed disabled:opacity-40 ${
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
                  {daysLeft > 1 && (
                    <div className="mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-4 print:hidden">
                      <p className="flex items-center gap-2 text-sm text-[#6E5F47]">
                        <CalendarPlus className="h-4 w-4 shrink-0 text-[#91AFAA]" />
                        {t.remindMe(time)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={googleCalendarUrl(tool, time, lang, daysLeft)}
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
                            downloadReminder(tool, time, lang, daysLeft);
                          }}
                          className={reminderButtonClass}
                        >
                          {t.otherCalendar}
                        </button>
                      </div>
                    </div>
                  )}
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
  // For the crisis line in the emails: "ZZ" when the phone is somewhere the
  // site has no line for, so the email points to Find A Helpline.
  const country = useCountry(lang) ?? 'ZZ';
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
        ? actionPlanService.requestCheckIn(email, name, lang, country, antiSpam)
        : Promise.resolve(),
      sendPlan
        ? actionPlanService.emailPlan(
            email,
            name,
            plan,
            lang,
            country,
            antiSpam,
            {
              heading: t.weekSection,
              detail: t.weekSectionDetail,
              items: weekSentences,
            }
          )
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
              className="inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-8 py-4 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
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
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mt-4 text-sm text-[#6E5F47]">
      <span>{t.restorePrompt}</span>{' '}
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => {
          restore(e.target.files?.[0]);
          // So picking the same file again still works.
          e.target.value = '';
        }}
      />
      <button
        type="button"
        onClick={() => {
          setError(false);
          inputRef.current?.click();
        }}
        className="inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4 hover:text-[#5c4f3b]"
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

/**
 * The plan in the visitor's language, or in `lang` on the plan's Taglish
 * address (see taglishTwins.ts).
 */
export default function ActionPlan({
  lang: pageLang,
}: { lang?: PlanLang } = {}) {
  const morning = usePhoto('morning');
  const saved = useSavedPlan();
  const preferred = useLanguage();
  const lang = pageLang ?? preferred;
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

  // The Taglish address, and older links with ?lang=tl, make Taglish the
  // choice, so the plan stays in Taglish when opened from the home screen.
  const reminderTool = useRef<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chosen = pageLang ?? params.get('lang');
    if (chosen === 'tl' || chosen === 'en') setLanguage(chosen);
    // A reminder (?tool=breathe) opens on that tool in the Today card.
    reminderTool.current = params.get('tool');
  }, [pageLang]);
  useEffect(() => {
    const id = reminderTool.current;
    if (!id || !saved) return;
    const row = document.getElementById(`today-${id}`);
    if (!row) return;
    reminderTool.current = null;
    row.scrollIntoView({ block: 'center' });
    const buttons = row.querySelectorAll<HTMLButtonElement>('button');
    buttons[buttons.length - 1]?.focus({ preventScroll: true });
  }, [saved]);

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
    forgetTool();
    clearToolChecks();
    clearToolNotes();
    clearCheckIns();
    setAnswers({});
    setCurrent(0);
    setName('');
    setHasStarted(false);
    window.scrollTo({ top: 0 });
  };

  const header = (
    <div className="mb-6 flex justify-end">
      {pageLang ? (
        <LanguageSwitch
          links={twinLinks(TAGLISH_TWINS.plan)}
          current={pageLang}
        />
      ) : (
        <LanguageSwitch />
      )}
    </div>
  );

  // A real Filipino morning: the plan's one picture.
  const morningPhoto = (
    <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#EFF3E7] print:hidden">
      <Image
        src={morning.src}
        alt=""
        fill
        preload
        fetchPriority="high"
        loading="eager"
        sizes="(min-width: 768px) 672px, 100vw"
        className="object-cover"
      />
    </div>
  );

  if (!showPlan && !showQuestions) {
    return (
      <div lang={lang} className="px-6 pt-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            {header}
            {morningPhoto}
            <h1 className="text-balance font-playfair text-5xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {t.introTitle}
            </h1>
            <p className="mt-6 font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em]">
              {t.introText}
            </p>
            <form
              className="mt-8"
              onSubmit={(event) => {
                event.preventDefault();
                analyticsService.recordClick('plan_start');
                setHasStarted(true);
                window.scrollTo({ top: 0 });
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
                className="group mt-6 flex min-h-12 w-fit items-center justify-center rounded-2xl bg-[#6E5F47] px-8 font-poppins text-lg font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
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
            <div>
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

              <div key={current} className="hb-step-in">
                {question.stem && (
                  <p className="mt-6 text-sm text-[#6E5F47]">{question.stem}</p>
                )}
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className={`${question.stem ? 'mt-2' : 'mt-6'} text-balance font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none`}
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
              </div>

              <button
                type="button"
                onClick={handlePrevious}
                className="mt-6 inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.previous}
              </button>
            </div>
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
          isWeekly: false,
          title: t.doneTitle(saved.name),
          text: t.doneText,
          button: t.finishButton,
          onClick: startFinish,
        }
      : sinceCheckIn >= 7 && day < PLAN_DAYS
        ? {
            isWeekly: true,
            title: t.checkInDueTitle(saved.name),
            text: t.checkInDueText,
            button: t.takeAgain,
            onClick: handleRetake,
          }
        : null;
  const bannerCard = banner && (
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
  );

  const renderSection = (section: (typeof otherSections)[number]) => (
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
            lang={lang}
            t={t}
          />
        ))}
      </div>
    </section>
  );

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
          {morningPhoto}
          <div id="action-plan">
            <h1 className="sr-only">{t.planTitle(saved.name)}</h1>
            {banner
              ? !banner.isWeekly && bannerCard
              : day >= 1 && (
                  <p className="mb-6 rounded-2xl bg-[#EFF3E7] px-5 py-3 font-poppins text-[#6E5F47] print:hidden">
                    {day >= PLAN_DAYS || isAfter
                      ? t.welcomeBack(saved.name)
                      : t.welcomeDay(saved.name, day + 1)}
                  </p>
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

            {/* The weekly check-in comes after today's tools. */}
            {banner?.isWeekly && bannerCard}

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

            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em] focus:outline-none"
            >
              {t.planTitle(saved.name)}
            </h2>
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
                    <SafetyStepCard
                      key={item.id}
                      item={item}
                      saved={saved}
                      t={t}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#6E5F47]">{t.safetySaved}</p>
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
                    saved={saved}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>
            </section>

            <HabitTracker saved={saved} tools={tools} lang={lang} t={t} />

            {/* This week's step sits with the daily tools, before saving and email. */}
            {otherSections
              .filter((section) => section.id === 'week')
              .map(renderSection)}

            <CheckInCard
              key={saved.startedAt}
              saved={saved}
              plan={plan}
              weekSentences={weekSentences}
              lang={lang}
              t={t}
            />

            <SavePlanCard saved={saved} t={t} />

            {otherSections
              .filter((section) => section.id !== 'week')
              .map(renderSection)}
          </div>

          <div className="mt-12 print:hidden">
            <div className="flex flex-wrap gap-3">
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
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
              >
                {t.takeAgain}
              </button>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg font-poppins text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {t.deletePlan}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
