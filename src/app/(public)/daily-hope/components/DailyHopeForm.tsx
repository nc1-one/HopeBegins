'use client';

import { useDailyHopeForm } from '../hooks/useDailyHopeForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inputClass, primaryClass } from '@/components/tools/toolStyles';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { cn } from '@/lib/utils';

const fieldClass = cn(inputClass, 'h-12 shadow-none');

const copy: PerLangNoTl<{
  firstName: string;
  firstNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  sending: string;
  start: string;
  dayOne: string;
  inEach: string;
  /** What every day's email has. */
  each: string[];
  stop: string;
  /**
   * What the form's checks say, in the languages they weren't written in.
   * English shows the checks' own words.
   */
  errors?: { firstName: string; email: string };
}> = {
  en: {
    firstName: 'First name *',
    firstNamePlaceholder: 'Your first name',
    email: 'Email *',
    emailPlaceholder: 'your@email.com',
    sending: 'Sending…',
    start: 'Start my Daily Hope',
    dayOne: 'Day 1 arrives right after you sign up.',
    inEach: 'What each email has',
    each: [
      'A short reading, about 2 minutes',
      'A Bible verse',
      'One question to think about',
      'A short prayer',
    ],
    stop: 'You can stop the emails any time with the link at the bottom of each one.',
  },
  fr: {
    firstName: 'Prénom *',
    firstNamePlaceholder: 'Ton prénom',
    email: 'E-mail *',
    emailPlaceholder: 'prenom@example.com',
    sending: 'Envoi…',
    start: 'Commencer mon Daily Hope',
    dayOne: 'Le jour 1 arrive juste après ton inscription.',
    inEach: 'Dans chaque e-mail',
    each: [
      'Un court texte, environ 2 minutes de lecture',
      'Un verset de la Bible',
      'Une question à méditer',
      'Une courte prière',
    ],
    stop: 'Tu peux arrêter les e-mails à tout moment avec le lien en bas de chacun.',
    errors: {
      firstName: 'Écris ton prénom.',
      email:
        'Cette adresse e-mail ne semble pas correcte. Vérifie-la, s’il te plaît.',
    },
  },
  de: {
    firstName: 'Vorname *',
    firstNamePlaceholder: 'Dein Vorname',
    email: 'E-Mail *',
    emailPlaceholder: 'name@example.com',
    sending: 'Wird gesendet…',
    start: 'Mein Daily Hope starten',
    dayOne: 'Tag 1 kommt direkt nach deiner Anmeldung.',
    inEach: 'In jeder E-Mail',
    each: [
      'Ein kurzer Text, etwa 2 Minuten Lesezeit',
      'Ein Bibelvers',
      'Eine Frage zum Nachdenken',
      'Ein kurzes Gebet',
    ],
    stop: 'Du kannst die E-Mails jederzeit über den Link unten in jeder E-Mail abbestellen.',
    errors: {
      firstName: 'Bitte gib deinen Vornamen ein.',
      email:
        'Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte prüf sie noch mal.',
    },
  },
  es: {
    firstName: 'Nombre *',
    firstNamePlaceholder: 'Tu nombre',
    email: 'Correo electrónico *',
    emailPlaceholder: 'nombre@example.com',
    sending: 'Enviando…',
    start: 'Empezar mi Daily Hope',
    dayOne: 'El día 1 llega justo después de que te registres.',
    inEach: 'En cada correo',
    each: [
      'Una lectura corta, de unos 2 minutos',
      'Un versículo de la Biblia',
      'Una pregunta para pensar',
      'Una oración corta',
    ],
    stop: 'Puedes dejar de recibir los correos cuando quieras con el enlace al final de cada uno.',
    errors: {
      firstName: 'Escribe tu nombre.',
      email: 'Ese correo no parece correcto. Revísalo, por favor.',
    },
  },
  ko: {
    firstName: '이름 *',
    firstNamePlaceholder: '이름',
    email: '이메일 *',
    emailPlaceholder: 'name@example.com',
    sending: '보내는 중…',
    start: 'Daily Hope 시작하기',
    dayOne: '가입하면 바로 1일 차 이메일이 와요.',
    inEach: '이메일마다 담긴 것',
    each: [
      '2분 정도면 읽는 짧은 글',
      '성경 말씀 한 구절',
      '생각해 볼 질문 하나',
      '짧은 기도',
    ],
    stop: '이메일 맨 아래 링크로 언제든 그만 받을 수 있어요.',
    errors: {
      firstName: '이름을 적어 주세요.',
      email: '이메일 주소가 맞지 않는 것 같아요. 다시 확인해 주세요.',
    },
  },
};

/**
 * A field's error, like FormMessage, in the page's language. The checks
 * are the same in every language; only their words change.
 */
function FieldError({ text }: { text?: string }) {
  const { error, formMessageId } = useFormField();
  if (!error) return null;
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className="text-destructive text-sm"
    >
      {text ?? String(error.message ?? '')}
    </p>
  );
}

export function DailyHopeForm() {
  const { form, onSubmit, isSubmitting } = useDailyHopeForm();
  const t = noTl(copy, usePageLanguage());

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#6E5F47]">
                  {t.firstName}
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="given-name"
                    placeholder={t.firstNamePlaceholder}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FieldError text={t.errors?.firstName} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#6E5F47]">
                  {t.email}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={t.emailPlaceholder}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FieldError text={t.errors?.email} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    placeholder="Your website"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastNameHoney"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    placeholder="Your last name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(primaryClass, 'w-full min-h-12')}
          >
            {isSubmitting ? t.sending : t.start}
          </button>
        </form>
      </Form>

      <p className="text-sm text-[#6E5F47]">{t.dayOne}</p>

      <div className="rounded-2xl bg-[#EFF3E7] p-5 text-[#6E5F47]">
        <p className="font-poppins font-medium">{t.inEach}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {t.each.map((part) => (
            <li key={part}>{part}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm">{t.stop}</p>
      </div>
    </div>
  );
}
