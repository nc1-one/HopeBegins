'use client';

import { useDailyHopeForm } from '../hooks/useDailyHopeForm';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Calendar, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS_PREVIEW = [
  { day: 1, title: 'The Seed of Hope', icon: <Sparkles className="h-4 w-4" /> },
  { day: 2, title: 'Roots of Faith', icon: <Target className="h-4 w-4" /> },
  {
    day: 3,
    title: 'Light in Darkness',
    icon: <Calendar className="h-4 w-4" />,
  },
];

export function DailyHopeForm() {
  const { form, onSubmit, isSubmitting } = useDailyHopeForm();

  return (
    <div className="space-y-8">
      {/* Journey Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DAYS_PREVIEW.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl border border-zinc-100 flex flex-col items-center text-center space-y-2"
          >
            <div className="h-8 w-8 rounded-full bg-[#E9EFEE] flex items-center justify-center text-[#91AFAA]">
              {item.icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#6E5F47]">
                Day {item.day}
              </span>
              <p className="text-sm font-bold text-[#6E5F47]">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="py-0 border-zinc-100 shadow-sm bg-white">
        <CardContent className="p-6 md:p-8">
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
                          className="bg-white border-zinc-200 h-12 rounded-xl"
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
                          className="bg-white border-zinc-200 h-12 rounded-xl"
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
                        className="bg-white border-zinc-200 h-12 rounded-xl"
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

              <Button
                type="submit"
                className="w-full h-12 bg-[#6E5F47] hover:bg-[#5c4f3b] text-white font-poppins font-bold text-base rounded-2xl shadow-lg transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Start my Daily Hope'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="text-sm text-[#6E5F47]">
        Free. One email a day for 21 days.
      </p>
    </div>
  );
}
