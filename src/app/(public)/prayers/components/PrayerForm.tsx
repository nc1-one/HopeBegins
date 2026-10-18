'use client';

import { usePrayerForm } from '../hooks/usePrayerForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { inputClass, primaryClass } from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';

const fieldClass = cn(inputClass, 'h-12 shadow-none');

export function PrayerForm() {
  const { form, onSubmit, isSubmitting, linkedOrganization } = usePrayerForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#6E5F47]">
                Topic (optional)
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-xl border-zinc-200 bg-white px-3 text-base text-[#6E5F47] shadow-none data-[size=default]:h-12 focus-visible:border-zinc-200 focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40">
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="ANXIETY_FEAR">Worry or fear</SelectItem>
                  <SelectItem value="HEALTH">Health</SelectItem>
                  <SelectItem value="FINANCE">Money</SelectItem>
                  <SelectItem value="RELATIONSHIP">
                    Family or relationships
                  </SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {linkedOrganization && (
          <p className="rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm text-[#6E5F47]">
            Your request will be shared with{' '}
            <span className="font-bold">{linkedOrganization.name}</span>.
          </p>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-[#6E5F47]">
                What would you like prayer for? *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share as much or as little as you'd like..."
                  className={cn(fieldClass, 'h-auto min-h-[150px] resize-none')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3 pt-2">
          <FormField
            control={form.control}
            name="shareFirstName"
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="shareFirstName"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-zinc-300 accent-[#6E5F47] focus:ring-[#6E5F47]"
                />
                <label
                  htmlFor="shareFirstName"
                  className="text-sm text-[#6E5F47] cursor-pointer"
                >
                  Share my first name with the Hope Carrier
                </label>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="wantsFollowUp"
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="wantsFollowUp"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-zinc-300 accent-[#6E5F47] focus:ring-[#6E5F47]"
                />
                <label
                  htmlFor="wantsFollowUp"
                  className="text-sm text-[#6E5F47] cursor-pointer"
                >
                  Send me a short note of encouragement after
                </label>
              </div>
            )}
          />
        </div>

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
          {isSubmitting ? 'Sending…' : 'Send my prayer request'}
        </button>
      </form>
    </Form>
  );
}
