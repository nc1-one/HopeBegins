import { fetchWithAuth } from './api';
import { config } from '@/config';
import type { Plan } from '@/lib/actionPlan';

interface EmailPlanItem {
  title: string;
  detail: string;
  steps?: string[];
  link?: string;
  link_label?: string;
}

export interface EmailActionPlanPayload {
  first_name?: string;
  email: string;
  summary: string[];
  sections: { heading: string; intro?: string; items: EmailPlanItem[] }[];
  website: string;
  startTime: number;
}

export const actionPlanService = {
  // Backend contract: docs/phase-2/action-plan-email-plan.md
  emailPlan: async (
    email: string,
    firstName: string,
    plan: Plan,
    week: string[],
    antiSpam: { website: string; startTime: number }
  ): Promise<void> => {
    const payload: EmailActionPlanPayload = {
      email,
      first_name: firstName || undefined,
      website: antiSpam.website,
      startTime: antiSpam.startTime,
      summary: plan.summary,
      sections: [
        ...(week.length > 0
          ? [
              {
                heading: 'Your week',
                items: week.map((commitment) => ({
                  title: commitment,
                  detail: 'Do it every day for the next 7 days.',
                })),
              },
            ]
          : []),
        ...plan.sections.map((section) => ({
          heading: section.heading,
          intro: section.intro,
          items: section.items.map((item) => ({
            title: item.title,
            detail: item.detail,
            steps: item.steps,
            // Site paths stay relative; the backend adds its own site URL.
            link: item.href,
            link_label: item.linkLabel,
          })),
        })),
      ],
    };

    await fetchWithAuth(`${config.API_URL}/action-plans/email/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
