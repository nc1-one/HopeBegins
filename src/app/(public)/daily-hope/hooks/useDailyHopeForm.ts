'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { dailyHopeService } from '@/services/dailyHopeService';
import { toast } from 'sonner';
import type { PerLang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { useCountry } from '@/lib/country';

// Our own words, in the page's language. The server's error messages are
// in English, so the other languages show their own.
const messages: PerLang<{ done: string; failed: string }> = {
  en: {
    done: "You're signed up for 21 days of Daily Hope. Check your email for day 1.",
    failed: 'Something went wrong. Please try again.',
  },
  tl: {
    done: 'Naka-sign up ka na sa 21 araw ng Daily Hope. Tingnan ang email mo para sa day 1.',
    failed: 'May nagka-problema. Subukan ulit.',
  },
  fr: {
    done: 'C’est fait\u00a0: 21 jours de Daily Hope t’attendent. Regarde tes e-mails pour le premier jour.',
    failed: 'Un problème est survenu. Réessaie.',
  },
  de: {
    done: 'Du bist für 21 Tage Daily Hope angemeldet. Schau in deine E-Mails, dort wartet Tag 1.',
    failed: 'Etwas ist schiefgelaufen. Bitte versuch es noch einmal.',
  },
  es: {
    done: 'Listo: ya tienes 21 días de Daily Hope. Revisa tu correo para el día 1.',
    failed: 'Algo salió mal. Inténtalo de nuevo.',
  },
  ko: {
    done: '21일 Daily Hope 신청이 완료됐어요. 첫째 날 메일을 확인해 주세요.',
    failed: '문제가 생겼어요. 다시 시도해 주세요.',
  },
};

const dailyHopeSchema = z.object({
  firstName: z.string().min(2, { message: 'Please enter your first name.' }),
  email: z
    .string()
    .email({ message: "That email doesn't look right. Please check it." }),
  website: z.string().optional(),
  lastNameHoney: z.string().optional(),
  startTime: z.number().optional(),
});

type DailyHopeFormValues = z.infer<typeof dailyHopeSchema>;

export function useDailyHopeForm() {
  const lang = usePageLanguage();
  const t = messages[lang];
  // Where they are, for the crisis line in the emails.
  const country = useCountry(lang);
  const form = useForm<DailyHopeFormValues>({
    resolver: zodResolver(dailyHopeSchema),
    defaultValues: {
      firstName: '',
      email: '',
      website: '',
      lastNameHoney: '',
      startTime: 0,
    },
  });

  useEffect(() => {
    form.setValue('startTime', Date.now());
  }, [form]);

  const mutation = useMutation({
    mutationFn: (data: DailyHopeFormValues) =>
      dailyHopeService.subscribe({
        first_name: data.firstName,
        email: data.email,
        lang,
        country,
        website: data.website,
        last_name_honey: data.lastNameHoney,
        start_time: data.startTime,
      }),
    // Our own words, in the page's language.
    onSuccess: () => {
      toast.success(t.done);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(
        lang === 'en' || lang === 'tl' ? error.message || t.failed : t.failed
      );
    },
  });

  const onSubmit = (data: DailyHopeFormValues) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
  };
}
