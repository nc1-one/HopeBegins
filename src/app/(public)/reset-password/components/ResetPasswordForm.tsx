'use client';

import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import {
  inputClass,
  primaryClass,
  quietClass,
} from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';
import { useResetPassword } from '../hooks/useResetPassword';

const fieldClass = cn(inputClass, 'h-12 shadow-none');
const labelClass =
  'text-sm font-medium text-[#6E5F47] data-[error=true]:text-[#6E5F47]';
const messageClass = 'text-sm text-[#6E5F47]';

export function ResetPasswordForm() {
  const { form, onSubmit, isSubmitting, isSuccess, hasToken, loginHref } =
    useResetPassword();

  if (isSuccess) {
    return (
      <div>
        <OptionPageHeader
          title="Password changed"
          subtitle="Your new password is set. Taking you to the login page…"
        />
        <div className="mt-8 max-w-md">
          <Link
            href={loginHref}
            className={cn(primaryClass, 'w-full min-h-12')}
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <OptionPageHeader
        title="Set a new password"
        subtitle="Choose a password with at least 8 characters."
      />

      <div className="mt-8 max-w-md">
        {!hasToken ? (
          <p
            role="alert"
            className="rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm text-[#6E5F47]"
          >
            This link has expired or doesn&apos;t work. Please ask for a new
            one.
          </p>
        ) : (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Type the new password again
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(primaryClass, 'w-full min-h-12')}
              >
                {isSubmitting ? 'Saving…' : 'Save new password'}
              </button>
            </form>
          </Form>
        )}

        <Link href={loginHref} className={cn(quietClass, 'mt-8 -ml-5')}>
          Back to login
        </Link>
      </div>
    </div>
  );
}
