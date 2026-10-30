'use client';

import type { ReactNode } from 'react';
import { usePrayerForm } from '../hooks/usePrayerForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { inputClass, primaryClass } from '@/components/tools/toolStyles';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { cn } from '@/lib/utils';
import type { Prayer } from '@/types/prayer';

const fieldClass = cn(inputClass, 'h-12 shadow-none');

type Topic = Prayer['category'];

/** The topics in the order the menu lists them; the values are stored. */
const TOPICS: Topic[] = [
  'GENERAL',
  'ANXIETY_FEAR',
  'HEALTH',
  'FINANCE',
  'RELATIONSHIP',
  'OTHER',
];

const copy: PerLangNoTl<{
  firstName: string;
  firstNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  topic: string;
  topicPlaceholder: string;
  topics: Record<Topic, string>;
  sharedWith: (name: ReactNode) => ReactNode;
  request: string;
  requestPlaceholder: string;
  shareFirstName: string;
  followUp: string;
  sending: string;
  send: string;
  /**
   * What the form's checks say, in the languages they weren't written in.
   * English shows the checks' own words.
   */
  errors?: { title: string; email: string; content: string };
}> = {
  en: {
    firstName: 'First name *',
    firstNamePlaceholder: 'Your first name',
    email: 'Email *',
    emailPlaceholder: 'your@email.com',
    topic: 'Topic (optional)',
    topicPlaceholder: 'Choose a topic',
    topics: {
      GENERAL: 'General',
      ANXIETY_FEAR: 'Worry or fear',
      HEALTH: 'Health',
      FINANCE: 'Money',
      RELATIONSHIP: 'Family or relationships',
      OTHER: 'Other',
    },
    sharedWith: (name) => <>Your request will be shared with {name}.</>,
    request: 'What would you like prayer for? *',
    requestPlaceholder: "Share as much or as little as you'd like...",
    shareFirstName: 'Share my first name with the Hope Carrier',
    followUp: 'Send me a short note of encouragement after',
    sending: 'Sending…',
    send: 'Send my prayer request',
  },
  fr: {
    firstName: 'Prénom *',
    firstNamePlaceholder: 'Ton prénom',
    email: 'E-mail *',
    emailPlaceholder: 'prenom@example.com',
    topic: 'Thème (facultatif)',
    topicPlaceholder: 'Choisis un thème',
    topics: {
      GENERAL: 'Général',
      ANXIETY_FEAR: 'Inquiétude ou peur',
      HEALTH: 'Santé',
      FINANCE: 'Argent',
      RELATIONSHIP: 'Famille ou relations',
      OTHER: 'Autre',
    },
    sharedWith: (name) => <>Ta demande sera partagée avec {name}.</>,
    request: 'Quel est ton sujet de prière ? *',
    requestPlaceholder: 'Écris autant ou aussi peu que tu veux.',
    shareFirstName: 'Partager mon prénom avec le Hope Carrier',
    followUp: 'M’envoyer ensuite un petit mot d’encouragement (en anglais)',
    sending: 'Envoi…',
    send: 'Envoyer ma demande de prière',
    errors: {
      title: 'Écris au moins 2 caractères pour ton prénom.',
      email:
        'Cette adresse e-mail ne semble pas correcte. Vérifie-la, s’il te plaît.',
      content: 'Écris au moins 10 caractères pour ton sujet de prière.',
    },
  },
  de: {
    firstName: 'Vorname *',
    firstNamePlaceholder: 'Dein Vorname',
    email: 'E-Mail *',
    emailPlaceholder: 'name@example.com',
    topic: 'Thema (optional)',
    topicPlaceholder: 'Wähl ein Thema',
    topics: {
      GENERAL: 'Allgemein',
      ANXIETY_FEAR: 'Sorgen oder Angst',
      HEALTH: 'Gesundheit',
      FINANCE: 'Geld',
      RELATIONSHIP: 'Familie oder Beziehungen',
      OTHER: 'Anderes',
    },
    sharedWith: (name) => <>Dein Anliegen wird mit {name} geteilt.</>,
    request: 'Wofür sollen wir beten? *',
    requestPlaceholder: 'Schreib so viel oder so wenig, wie du möchtest.',
    shareFirstName: 'Meinen Vornamen mit dem Hope Carrier teilen',
    followUp: 'Mir danach ein paar ermutigende Worte schicken (auf Englisch)',
    sending: 'Wird gesendet…',
    send: 'Mein Gebetsanliegen senden',
    errors: {
      title: 'Bitte schreib mindestens 2 Zeichen für deinen Vornamen.',
      email:
        'Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte prüf sie noch mal.',
      content: 'Bitte schreib mindestens 10 Zeichen für dein Gebetsanliegen.',
    },
  },
  es: {
    firstName: 'Nombre *',
    firstNamePlaceholder: 'Tu nombre',
    email: 'Correo electrónico *',
    emailPlaceholder: 'nombre@example.com',
    topic: 'Tema (opcional)',
    topicPlaceholder: 'Elige un tema',
    topics: {
      GENERAL: 'General',
      ANXIETY_FEAR: 'Preocupación o miedo',
      HEALTH: 'Salud',
      FINANCE: 'Dinero',
      RELATIONSHIP: 'Familia o relaciones',
      OTHER: 'Otro',
    },
    sharedWith: (name) => <>Tu petición se compartirá con {name}.</>,
    request: '¿Cuál es tu petición de oración? *',
    requestPlaceholder: 'Comparte tanto o tan poco como quieras.',
    shareFirstName: 'Compartir mi nombre con el Hope Carrier',
    followUp: 'Enviarme después un mensaje corto de ánimo (en inglés)',
    sending: 'Enviando…',
    send: 'Enviar mi petición de oración',
    errors: {
      title: 'Escribe al menos 2 caracteres de tu nombre.',
      email: 'Ese correo no parece correcto. Revísalo, por favor.',
      content: 'Escribe al menos 10 caracteres en tu petición de oración.',
    },
  },
  ko: {
    firstName: '이름 *',
    firstNamePlaceholder: '이름을 적어 주세요',
    email: '이메일 *',
    emailPlaceholder: 'name@example.com',
    topic: '주제 (선택)',
    topicPlaceholder: '주제를 골라 주세요',
    topics: {
      GENERAL: '일반',
      ANXIETY_FEAR: '걱정이나 두려움',
      HEALTH: '건강',
      FINANCE: '돈 문제',
      RELATIONSHIP: '가족이나 관계',
      OTHER: '기타',
    },
    sharedWith: (name) => <>기도 제목이 {name}에도 전달돼요.</>,
    request: '어떤 기도 제목이 있나요? *',
    requestPlaceholder: '원하는 만큼 편하게 적어 주세요.',
    shareFirstName: 'Hope Carrier에게 제 이름 알려 주기',
    followUp: '기도 후에 짧은 격려 메시지 받기 (영어)',
    sending: '보내는 중…',
    send: '기도 제목 보내기',
    errors: {
      title: '이름을 2자 이상 적어 주세요.',
      email: '이메일 주소가 맞지 않는 것 같아요. 다시 확인해 주세요.',
      content: '기도 제목을 10자 이상 적어 주세요.',
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

export function PrayerForm() {
  const { form, onSubmit, isSubmitting, linkedOrganization } = usePrayerForm();
  const t = noTl(copy, usePageLanguage());

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
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
              <FieldError text={t.errors?.title} />
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#6E5F47]">
                {t.topic}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-xl border-zinc-200 bg-white px-3 text-base text-[#6E5F47] shadow-none data-[size=default]:h-12 focus-visible:border-zinc-200 focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40">
                    <SelectValue placeholder={t.topicPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TOPICS.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {t.topics[topic]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError />
            </FormItem>
          )}
        />

        {linkedOrganization && (
          <p className="rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm text-[#6E5F47]">
            {t.sharedWith(
              <span className="font-bold">{linkedOrganization.name}</span>
            )}
          </p>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#6E5F47]">
                {t.request}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.requestPlaceholder}
                  className={cn(fieldClass, 'h-auto min-h-[150px] resize-none')}
                  {...field}
                />
              </FormControl>
              <FieldError text={t.errors?.content} />
            </FormItem>
          )}
        />

        <div className="space-y-3 pt-2">
          <FormField
            control={form.control}
            name="shareFirstName"
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="shareFirstName"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-zinc-300 accent-[#6E5F47] focus:ring-[#6E5F47]"
                />
                <label
                  htmlFor="shareFirstName"
                  className="text-sm text-[#6E5F47] cursor-pointer"
                >
                  {t.shareFirstName}
                </label>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="wantsFollowUp"
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="wantsFollowUp"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-zinc-300 accent-[#6E5F47] focus:ring-[#6E5F47]"
                />
                <label
                  htmlFor="wantsFollowUp"
                  className="text-sm text-[#6E5F47] cursor-pointer"
                >
                  {t.followUp}
                </label>
              </div>
            )}
          />
        </div>

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
          {isSubmitting ? t.sending : t.send}
        </button>
      </form>
    </Form>
  );
}
