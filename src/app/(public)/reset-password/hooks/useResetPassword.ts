'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get('uid');
  const token = searchParams.get('token');
  // Admin invites send people to the admin sign-in instead.
  const loginHref =
    searchParams.get('for') === 'admin' ? '/admin/login' : '/login/carrier';

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (!uidb64 || !token) {
      notify.error("This reset link doesn't work. Please ask for a new one.");
    }
  }, [uidb64, token]);

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!uidb64 || !token) {
      notify.error("This reset link doesn't work. Please ask for a new one.");
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.resetPassword({
        uidb64,
        token,
        new_password: values.password,
      });
      setIsSuccess(true);
      notify.success('Your new password is set.');
      setTimeout(() => {
        router.push(loginHref);
      }, 3000);
    } catch (error: any) {
      notify.error(
        error.message || "Your password didn't change. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    isSuccess,
    hasToken: !!(uidb64 && token),
    loginHref,
  };
}
