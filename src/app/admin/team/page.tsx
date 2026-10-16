'use client';

import { AlertCircle, Loader2, RefreshCw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/useUserStore';
import { useAdminTeam } from './hooks/useAdminTeam';
import { TeamList } from './components/TeamList';
import { RemoveAdminModal } from './components/RemoveAdminModal';

const labelClass =
  'text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1';
const inputClass =
  'h-12 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:border-brand focus:ring-brand/20 rounded-xl';

export default function AdminTeamPage() {
  const currentUserId = (
    useUserStore((state) => state.user) as {
      id?: string;
    } | null
  )?.id;
  const {
    team,
    isLoading,
    isError,
    refetch,
    form,
    onAdd,
    isAdding,
    resend,
    resendingId,
    removeTarget,
    setRemoveTarget,
    remove,
    isRemoving,
  } = useAdminTeam();

  return (
    <>
      {removeTarget && (
        <RemoveAdminModal
          person={removeTarget}
          onConfirm={remove}
          onCancel={() => setRemoveTarget(null)}
          isPending={isRemoving}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-8 max-w-4xl">
        <header>
          <h1 className="text-3xl font-black italic tracking-tighter">
            Admin team
          </h1>
          <p className="mt-2 text-zinc-500 font-medium text-sm sm:text-base">
            Add people who help run HopeBegins. Admins see the dashboard,
            prayers, Hope Carriers, HopeCasts, Daily Hope, stories and pop-outs.
            Only super admins see Financials and this page.
          </p>
        </header>

        <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-xl font-black italic tracking-tighter uppercase">
            Add an admin
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            They&apos;ll get an email with a link to set their own password. The
            link works for 3 days.
          </p>
          <Form {...form}>
            <form onSubmit={onAdd} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>First name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs ml-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Last name (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs ml-1" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="off"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isAdding}
                className="h-12 px-6 rounded-xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold text-xs uppercase tracking-widest"
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send invite
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Card>

        <section className="space-y-4" aria-labelledby="team-title">
          <h2
            id="team-title"
            className="text-xl font-black italic tracking-tighter uppercase"
          >
            Who has access
          </h2>
          {isError ? (
            <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-2xl">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <p className="flex-1 text-sm font-medium">
                Couldn&apos;t load the admin team.
              </p>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="h-10 rounded-xl font-bold text-xs"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Try again
              </Button>
            </div>
          ) : (
            <TeamList
              team={team}
              isLoading={isLoading}
              currentUserId={currentUserId}
              resendingId={resendingId}
              onResend={resend}
              onRemove={setRemoveTarget}
            />
          )}
        </section>
      </div>
    </>
  );
}
