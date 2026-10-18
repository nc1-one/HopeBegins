import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  carrierApplicationSchema,
  CarrierApplicationFormData,
} from '@/types/carrier';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

export function useCarrierForm() {
  const form = useForm<CarrierApplicationFormData>({
    resolver: zodResolver(carrierApplicationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      church_community: '',
      carrier_reason: '',
      agreed_to_guidelines: false,
      website: '',
      lastNameHoney: '',
      startTime: 0,
    },
  });

  useEffect(() => {
    form.setValue('startTime', Date.now());
  }, [form]);

  const mutation = useMutation({
    mutationFn: userService.applyAsCarrier,
    // The form says thank you in place of itself; no pop-up as well.
    onSuccess: () => {
      form.reset();
    },
    onError: (error: any) => {
      notify.error(
        error.message || "Your application didn't go through. Please try again."
      );
    },
  });

  const onSubmit = (data: CarrierApplicationFormData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
    isSent: mutation.isSuccess,
  };
}
