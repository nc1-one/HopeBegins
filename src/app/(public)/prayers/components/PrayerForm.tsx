'use client';

import { usePrayerForm } from '../hooks/usePrayerForm';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function PrayerForm() {
  const { form, onSubmit, isSubmitting, linkedOrganization } = usePrayerForm();

  return (
    <Card className="py-0 border-zinc-100 shadow-sm bg-white">
      <CardContent className="p-6 md:p-8">
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
                      className="bg-white border-zinc-200 h-12"
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
                      className="bg-white border-zinc-200 h-12"
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
                    Category *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-zinc-200 h-12">
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GENERAL">General</SelectItem>
                      <SelectItem value="ANXIETY_FEAR">
                        Anxiety & Fear
                      </SelectItem>
                      <SelectItem value="HEALTH">Health</SelectItem>
                      <SelectItem value="FINANCE">Finance</SelectItem>
                      <SelectItem value="RELATIONSHIP">Relationship</SelectItem>
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
                      className="min-h-[150px] bg-white border-zinc-200 resize-none"
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
                      I&apos;d like a follow-up encouraging message
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

            <Button
              type="submit"
              className="w-full h-12 bg-[#6E5F47] hover:bg-[#5c4f3b] text-white font-poppins font-bold text-base rounded-2xl shadow-lg transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Send my prayer request'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
