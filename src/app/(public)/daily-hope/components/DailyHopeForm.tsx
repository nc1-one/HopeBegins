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
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  sending: string;
  start: string;
  dayOne: string;
  firstDays: string;
  day: (day: number, title: string) => string;
  /** The first three emails' titles. */
  days: string[];
  /**
   * What the form's checks say, in the languages they weren't written in.
   * English shows the checks' own words.
   */
  errors?: { firstName: string; lastName: string; email: string };
}> = {
  en: {
    firstName: 'First name *',
    firstNamePlaceholder: 'Your first name',
    lastName: 'Last name *',
    lastNamePlaceholder: 'Your last name',
    email: 'Email *',
    emailPlaceholder: 'your@email.com',
    sending: 'Sending…',
    start: 'Start my Daily Hope',
    dayOne: 'Day 1 arrives right after you sign up.',
    firstDays: 'Your first three days',
    day: (day, title) => `Day ${day}: ${title}`,
    days: ['The seed of hope', 'Roots of faith', 'Light in darkness'],
  },
  fr: {
    firstName: 'Prénom *',
    firstNamePlaceholder: 'Ton prénom',
    lastName: 'Nom *',
    lastNamePlaceholder: 'Ton nom',
    email: 'E-mail *',
    emailPlaceholder: 'prenom@example.com',
    sending: 'Envoi…',
    start: 'Commencer mon Daily Hope',
    dayOne: 'Le jour 1 arrive juste après ton inscription.',
    firstDays: 'Tes trois premiers jours',
    day: (day, title) => `Jour ${day} : ${title}`,
    days: [
      'Une graine d’espoir',
      'Les racines de la foi',
      'La lumière dans les ténèbres',
    ],
    errors: {
      firstName: 'Écris ton prénom.',
      lastName: 'Écris ton nom.',
      email:
        'Cette adresse e-mail ne semble pas correcte. Vérifie-la, s’il te plaît.',
    },
  },
  de: {
    firstName: 'Vorname *',
    firstNamePlaceholder: 'Dein Vorname',
    lastName: 'Nachname *',
    lastNamePlaceholder: 'Dein Nachname',
    email: 'E-Mail *',
    emailPlaceholder: 'name@example.com',
    sending: 'Wird gesendet…',
    start: 'Mein Daily Hope starten',
    dayOne: 'Tag 1 kommt direkt nach deiner Anmeldung.',
    firstDays: 'Deine ersten drei Tage',
    day: (day, title) => `Tag ${day}: ${title}`,
    days: [
      'Das Samenkorn der Hoffnung',
      'Wurzeln des Glaubens',
      'Licht in der Dunkelheit',
    ],
    errors: {
      firstName: 'Bitte gib deinen Vornamen ein.',
      lastName: 'Bitte gib deinen Nachnamen ein.',
      email:
        'Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte prüf sie noch mal.',
    },
  },
  es: {
    firstName: 'Nombre *',
    firstNamePlaceholder: 'Tu nombre',
    lastName: 'Apellido *',
    lastNamePlaceholder: 'Tu apellido',
    email: 'Correo electrónico *',
    emailPlaceholder: 'nombre@example.com',
    sending: 'Enviando…',
    start: 'Empezar mi Daily Hope',
    dayOne: 'El día 1 llega justo después de que te registres.',
    firstDays: 'Tus primeros tres días',
    day: (day, title) => `Día ${day}: ${title}`,
    days: ['La semilla de la esperanza', 'Raíces de fe', 'Luz en la oscuridad'],
    errors: {
      firstName: 'Escribe tu nombre.',
      lastName: 'Escribe tu apellido.',
      email: 'Ese correo no parece correcto. Revísalo, por favor.',
    },
  },
  ko: {
    firstName: '이름 *',
    firstNamePlaceholder: '이름',
    lastName: '성 *',
    lastNamePlaceholder: '성',
    email: '이메일 *',
    emailPlaceholder: 'name@example.com',
    sending: '보내는 중…',
    start: 'Daily Hope 시작하기',
    dayOne: '가입하면 바로 1일 차 이메일이 와요.',
    firstDays: '처음 3일',
    day: (day, title) => `${day}일 차: ${title}`,
    days: ['희망의 씨앗', '믿음의 뿌리', '어둠 속의 빛'],
    errors: {
      firstName: '이름을 적어 주세요.',
      lastName: '성을 적어 주세요.',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    {t.lastName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.lastNamePlaceholder}
                      className={fieldClass}
                      {...field}
                    />
                  </FormControl>
                  <FieldError text={t.errors?.lastName} />
                </FormItem>
              )}
            />
          </div>

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
        <p className="font-poppins font-medium">{t.firstDays}</p>
        <ol className="mt-2 space-y-1">
          {t.days.map((title, index) => (
            <li key={index}>{t.day(index + 1, title)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
