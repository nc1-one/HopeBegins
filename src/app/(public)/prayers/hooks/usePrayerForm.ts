/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { prayerSchema } from '@/types/prayer';
import { prayerService } from '@/services/prayerService';
import { organizationService } from '@/services/organizationService';
import { notify } from '@/lib/notifications';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { PerLang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { useCountry } from '@/lib/country';

// Our own words in the page's language; the server's are in English.
const messages: PerLang<{ sent: string; failed: string }> = {
  en: {
    sent: 'Your prayer request was sent. A Hope Carrier will pray for you.',
    failed: "Your request didn't go through. Please try again.",
  },
  tl: {
    sent: 'Your prayer request was sent. A Hope Carrier will pray for you.',
    failed: "Your request didn't go through. Please try again.",
  },
  fr: {
    sent: 'Ta demande de prière est envoyée. Un Hope Carrier va prier pour toi.',
    failed: 'Ta demande n’est pas partie. Réessaie.',
  },
  de: {
    sent: 'Dein Gebetsanliegen ist angekommen. Ein Hope Carrier wird für dich beten.',
    failed: 'Dein Anliegen wurde nicht gesendet. Bitte versuch es noch einmal.',
  },
  es: {
    sent: 'Tu petición de oración se envió. Un Hope Carrier va a orar por ti.',
    failed: 'Tu petición no se envió. Inténtalo de nuevo.',
  },
  ko: {
    sent: '기도 제목을 보냈어요. Hope Carrier가 기도해 줄 거예요.',
    failed: '기도 제목을 보내지 못했어요. 다시 시도해 주세요.',
  },
};

export function usePrayerForm() {
  const queryClient = useQueryClient();

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations', 'public'],
    queryFn: organizationService.getPublicOrganizations,
  });

  // Organisations share /prayers?org=<id> with their members. Everyone
  // else never sees the organisation field.
  const orgParam = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get('org'),
    () => null
  );
  const linkedOrganization =
    organizations.find((org: any) => org.id === orgParam) ?? null;

  const form = useForm<any>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      title: '',
      email: '',
      content: '',
      category: 'GENERAL',
      isAnonymous: false,
      shareFirstName: true,
      wantsFollowUp: false,
      website: '',
      lastNameHoney: '',
      startTime: 0,
      organizationId: null,
    },
  });

  useEffect(() => {
    form.setValue('startTime', Date.now());
  }, [form]);

  useEffect(() => {
    if (linkedOrganization) {
      form.setValue('organizationId', linkedOrganization.id);
    }
  }, [form, linkedOrganization]);

  const lang = usePageLanguage();
  const t = messages[lang];
  const english = lang === 'en' || lang === 'tl';
  // For the crisis line in the email back; "ZZ" points to Find A Helpline.
  const country = useCountry(lang) ?? 'ZZ';
  const mutation = useMutation({
    mutationFn: prayerService.createPrayer,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['prayers'] });
      notify.success((english && data?.message) || t.sent);
      form.reset();
    },
    onError: (error: any) => {
      notify.error((english && error.message) || t.failed);
    },
  });

  const onSubmit = (data: any) => {
    // Handle "none" organization selection
    const payload = {
      ...data,
      lang,
      country,
      organizationId:
        data.organizationId === 'none' ? null : data.organizationId,
    };
    mutation.mutate(payload);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
    linkedOrganization,
  };
}
