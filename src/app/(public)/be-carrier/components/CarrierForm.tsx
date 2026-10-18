'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useCarrierForm } from '../hooks/useCarrierForm';
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Form,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { primaryClass } from '@/components/tools/toolStyles';

const fieldClass =
  'h-12 rounded-xl border-zinc-200 bg-white text-base text-[#6E5F47] focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';
const labelClass = 'text-sm font-medium text-[#6E5F47]';

type FieldName =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'church_community';

export function CarrierForm() {
  const { form, onSubmit, isSubmitting, isSent } = useCarrierForm();

  if (isSent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-6 text-[#6E5F47] hb-panel-in"
      >
        <p className="font-playfair text-3xl leading-[0.95] tracking-[-0.04em]">
          Thank you for giving your time.
        </p>
        <p className="mt-3 leading-relaxed">
          We read every application. If yours is approved, we&apos;ll email you
          a password so you can sign in and start praying for people.
        </p>
      </div>
    );
  }

  const textField = (
    name: FieldName,
    label: string,
    props: ComponentProps<typeof Input> = {}
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>{label}</FormLabel>
          <FormControl>
            <Input className={fieldClass} {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {textField('first_name', 'First name', {
            autoComplete: 'given-name',
          })}
          {textField('last_name', 'Last name', {
            autoComplete: 'family-name',
          })}
        </div>
        {textField('email', 'Email', {
          type: 'email',
          autoComplete: 'email',
        })}
        {textField('phone', 'Phone (optional)', {
          type: 'tel',
          autoComplete: 'tel',
        })}
        {textField('church_community', 'Church or community (optional)')}

        <FormField
          control={form.control}
          name="carrier_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                Why do you want to be a Hope Carrier?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A few sentences is enough"
                  className="min-h-[140px] resize-none rounded-xl border-zinc-200 bg-white text-base text-[#6E5F47] focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreed_to_guidelines"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <input
                    type="checkbox"
                    id="agreedToGuidelines"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 accent-[#6E5F47]"
                  />
                </FormControl>
                <label
                  htmlFor="agreedToGuidelines"
                  className="cursor-pointer text-[#6E5F47] leading-snug"
                >
                  I agree to the{' '}
                  <Link
                    href="/guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-[#5c4f3b]"
                  >
                    Hope Carrier code of conduct
                  </Link>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Left empty by people; filled in by spam bots. */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="Your website"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNameHoney"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="Your last name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-base sm:w-auto ${primaryClass}`}
        >
          {isSubmitting ? 'Sending…' : 'Become a Hope Carrier'}
        </button>
      </form>
    </Form>
  );
}
