'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type { AdminTeamMember } from '@/types/admin';

const addAdminSchema = z.object({
  first_name: z.string().trim().min(1, 'Add their first name'),
  last_name: z.string().trim(),
  email: z.string().trim().email('Check the email address'),
});

type AddAdminValues = z.infer<typeof addAdminSchema>;

const teamKey = ['admin', 'team'];

export function useAdminTeam() {
  const queryClient = useQueryClient();
  const [removeTarget, setRemoveTarget] = useState<AdminTeamMember | null>(
    null
  );

  const {
    data: team = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: teamKey,
    queryFn: adminService.getAdminTeam,
  });

  const form = useForm<AddAdminValues>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: { first_name: '', last_name: '', email: '' },
  });

  const addMutation = useMutation({
    mutationFn: adminService.addAdmin,
    onSuccess: (person) => {
      queryClient.invalidateQueries({ queryKey: teamKey });
      notify.success('Invite sent', `${person.email} will get an email.`);
      form.reset();
    },
    onError: (error: Error) => {
      notify.error('Could not add them', error.message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: adminService.resendAdminInvite,
    onSuccess: (person) => {
      notify.success('New link sent', `Sent to ${person.email}.`);
    },
    onError: (error: Error) => {
      notify.error('Could not send the link', error.message);
    },
  });

  const removeMutation = useMutation({
    mutationFn: adminService.removeAdmin,
    onSuccess: (person) => {
      queryClient.invalidateQueries({ queryKey: teamKey });
      notify.success('Access removed', `${person.email} is signed out.`);
      setRemoveTarget(null);
    },
    onError: (error: Error) => {
      notify.error('Could not remove access', error.message);
    },
  });

  return {
    team,
    isLoading,
    isError,
    refetch,
    form,
    onAdd: form.handleSubmit((values) => addMutation.mutate(values)),
    isAdding: addMutation.isPending,
    resend: resendMutation.mutate,
    resendingId: resendMutation.isPending ? resendMutation.variables : null,
    removeTarget,
    setRemoveTarget,
    remove: () => removeTarget && removeMutation.mutate(removeTarget.id),
    isRemoving: removeMutation.isPending,
  };
}
