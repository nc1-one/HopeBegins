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
  secondaryClass,
} from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';
import { useForgotPassword } from '../hooks/useForgotPassword';

const fieldClass = cn(inputClass, 'h-12 shadow-none');

export function ForgotPasswordForm() {
  const { form, onSubmit, isSubmitting, isSent, setIsSent } =
    useForgotPassword();

  return (
    <div>
      <OptionPageHeader
        title={isSent ? 'Check your email' : 'Forgot your password?'}
        subtitle={
          isSent
            ? 'We sent a link to your email. Open it to set a new password.'
            : "Type the email you log in with and we'll send you a link to set a new password."
        }
      />

      <div className="mt-8 max-w-md">
        {!isSent ? (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#6E5F47] data-[error=true]:text-[#6E5F47]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        autoComplete="email"
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-[#6E5F47]" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(primaryClass, 'w-full min-h-12')}
              >
                {isSubmitting ? 'Sending…' : 'Send me a link'}
              </button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <p className="text-[#6E5F47]">
              Didn&apos;t get it? Check your spam folder or try again.
            </p>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className={cn(secondaryClass, 'min-h-12')}
            >
              Use a different email
            </button>
          </div>
        )}

        <Link href="/login/carrier" className={cn(quietClass, 'mt-8 -ml-5')}>
          Back to login
        </Link>
      </div>
    </div>
  );
}
