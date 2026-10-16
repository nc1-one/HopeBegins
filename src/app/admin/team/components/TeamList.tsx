'use client';

import { Loader2, Mail, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AdminTeamMember } from '@/types/admin';

export const displayName = (person: AdminTeamMember) =>
  [person.first_name, person.last_name].filter(Boolean).join(' ') ||
  person.email;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

function status(person: AdminTeamMember) {
  if (!person.is_active)
    return { label: 'Access removed', className: 'bg-zinc-100 text-zinc-500' };
  if (!person.has_password)
    return {
      label: "Invited, hasn't set a password",
      className: 'bg-amber-50 text-amber-700',
    };
  return {
    label: person.last_login
      ? `Active, last signed in ${formatDate(person.last_login)}`
      : 'Active, not signed in yet',
    className: 'bg-brand-muted text-brand',
  };
}

interface Props {
  team: AdminTeamMember[];
  isLoading: boolean;
  currentUserId: string | undefined;
  resendingId: string | null | undefined;
  onResend: (id: string) => void;
  onRemove: (person: AdminTeamMember) => void;
}

export function TeamList({
  team,
  isLoading,
  currentUserId,
  resendingId,
  onResend,
  onRemove,
}: Props) {
  if (isLoading) {
    return (
      <div className="h-40 rounded-2xl bg-white dark:bg-zinc-900 animate-pulse" />
    );
  }

  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl">
      {team.map((person) => {
        const isMe = person.id === currentUserId;
        const badge = status(person);
        return (
          <li
            key={person.id}
            className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${
              person.is_active ? '' : 'opacity-60'
            }`}
          >
            <div className="min-w-0">
              <p className="font-black">
                {displayName(person)}
                {isMe && (
                  <span className="ml-2 text-xs font-bold text-zinc-400">
                    (you)
                  </span>
                )}
              </p>
              <p className="truncate text-sm text-zinc-500">{person.email}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider">
                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {person.role === 'admin'
                    ? 'Super admin'
                    : 'Admin, no financials'}
                </span>
                <span className={`rounded-full px-2 py-0.5 ${badge.className}`}>
                  {badge.label}
                </span>
              </div>
            </div>

            {person.is_active && !isMe && (
              <div className="flex shrink-0 gap-2">
                {!person.has_password && (
                  <Button
                    variant="outline"
                    onClick={() => onResend(person.id)}
                    disabled={resendingId === person.id}
                    className="h-10 rounded-xl font-bold text-xs"
                  >
                    {resendingId === person.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send a new link
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => onRemove(person)}
                  className="h-10 rounded-xl font-bold text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Remove access
                </Button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
