'use client';

import { useDailyHopeForm } from '../hooks/useDailyHopeForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { inputClass, primaryClass } from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';

const fieldClass = cn(inputClass, 'h-12 shadow-none');

const DAYS_PREVIEW = [
  { day: 1, title: 'The seed of hope' },
  { day: 2, title: 'Roots of faith' },
  { day: 3, title: 'Light in darkness' },
];

export function DailyHopeForm() {
  const { form, onSubmit, isSubmitting } = useDailyHopeForm();

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    First name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your first name"
                      className={fieldClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    Last name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your last name"
                      className={fieldClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#6E5F47]">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            className={cn(primaryClass, 'w-full min-h-12')}
          >
            {isSubmitting ? 'Sending…' : 'Start my Daily Hope'}
          </button>
        </form>
      </Form>

      <p className="text-sm text-[#6E5F47]">
        Day 1 arrives right after you sign up.
      </p>

      <div className="rounded-2xl bg-[#EFF3E7] p-5 text-[#6E5F47]">
        <p className="font-poppins font-medium">Your first three days</p>
        <ol className="mt-2 space-y-1">
          {DAYS_PREVIEW.map((item) => (
            <li key={item.day}>
              Day {item.day}: {item.title}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
