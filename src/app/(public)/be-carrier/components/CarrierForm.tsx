'use client';

import { useCarrierForm } from '../hooks/useCarrierForm';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function CarrierForm() {
  const { form, onSubmit, isSubmitting } = useCarrierForm();

  return (
    <Card className="py-0 border-zinc-100 shadow-sm bg-white">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    Last Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
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
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    Phone (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="church_community"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    Church / Community (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your church or community"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carrier_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#6E5F47]">
                    Why do you want to be a Hope Carrier? *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A few sentences is enough"
                      className="min-h-[150px] bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 resize-none"
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
                name="agreed_to_guidelines"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          id="agreedToGuidelines"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-zinc-300 text-[#6b634d] focus:ring-[#6b634d]"
                        />
                      </FormControl>
                      <label
                        htmlFor="agreedToGuidelines"
                        className="text-sm text-zinc-500 font-medium cursor-pointer"
                      >
                        I agree to the{' '}
                        <Link
                          href="/guidelines"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6b634d] dark:text-emerald-500 hover:underline font-bold"
                        >
                          Hope Carrier guidelines and code of conduct
                        </Link>
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
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
              className="w-full h-12 rounded-2xl bg-[#6E5F47] font-poppins font-bold text-white shadow-sm transition-colors hover:bg-[#5c4f3b]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Become a Hope Carrier'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
