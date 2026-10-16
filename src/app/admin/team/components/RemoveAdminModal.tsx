'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, UserX } from 'lucide-react';
import type { AdminTeamMember } from '@/types/admin';
import { displayName } from './TeamList';

interface Props {
  person: AdminTeamMember;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function RemoveAdminModal({
  person,
  onConfirm,
  onCancel,
  isPending,
}: Props) {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <UserX className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">
            Remove {displayName(person)}&apos;s access?
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium mt-2">
            They&apos;ll be signed out right away and can&apos;t sign in to the
            admin panel. You can add them again later with the same email.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold"
          >
            Keep access
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            variant="destructive"
            className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-500/20"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Remove access'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
