'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { dailyHopeService } from '@/services/dailyHopeService';
import { toast } from 'sonner';

const dailyHopeSchema = z.object({
  firstName: z.string().min(2, { message: 'Please enter your first name.' }),
  lastName: z.string().min(1, { message: 'Please enter your last name.' }),
  email: z
    .string()
    .email({ message: "That email doesn't look right. Please check it." }),
  website: z.string().optional(),
  lastNameHoney: z.string().optional(),
  startTime: z.number().optional(),
});

type DailyHopeFormValues = z.infer<typeof dailyHopeSchema>;

export function useDailyHopeForm() {
  const form = useForm<DailyHopeFormValues>({
    resolver: zodResolver(dailyHopeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
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
        last_name: data.lastName,
        email: data.email,
        website: data.website,
        last_name_honey: data.lastNameHoney,
        start_time: data.startTime,
      }),
    onSuccess: (response) => {
      const message =
        response?.message || "You're signed up for 21 days of Daily Hope.";
      toast.success(message);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
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
