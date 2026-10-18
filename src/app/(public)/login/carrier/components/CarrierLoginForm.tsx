'use client';

import { useCarrierAuth } from '@/hooks/useCarrierAuth';
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
import { inputClass, primaryClass } from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';

const fieldClass = cn(inputClass, 'h-12 shadow-none');
const labelClass =
  'text-sm font-medium text-[#6E5F47] data-[error=true]:text-[#6E5F47]';
const messageClass = 'text-sm text-[#6E5F47]';

export function CarrierLoginForm() {
  const { form, onSubmit, isSubmitting, error } = useCarrierAuth();

  return (
    <div>
      <OptionPageHeader
        title="Hope Carrier login"
        subtitle="Log in to see the prayer requests waiting for you."
      />

      <div className="mt-8 max-w-md">
        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm text-[#6E5F47]"
          >
            {error}
          </p>
        )}

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      autoComplete="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      className={fieldClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={messageClass} />
                  <Link
                    href="/forgot-password"
                    className="inline-flex min-h-11 items-center justify-self-start text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA] rounded-md"
                  >
                    Forgot your password?
                  </Link>
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(primaryClass, 'w-full min-h-12')}
            >
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
