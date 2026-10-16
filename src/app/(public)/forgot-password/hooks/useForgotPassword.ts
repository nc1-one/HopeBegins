'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

const forgotPasswordSchema = z.object({
  email: z.string().email("That email doesn't look right. Please check it."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsSubmitting(true);
    try {
      await userService.forgotPassword(values.email);
      setIsSent(true);
      notify.success('We sent the link to your email.');
    } catch (error: any) {
      notify.error(error.message || "The link didn't send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    isSent,
    setIsSent,
  };
}
