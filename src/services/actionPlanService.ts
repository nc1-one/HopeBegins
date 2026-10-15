import { fetchWithAuth } from './api';
import { config } from '@/config';
import type { Plan, PlanLang } from '@/lib/actionPlan';

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
  lang: PlanLang;
  website: string;
  startTime: number;
}

export const actionPlanService = {
  // Backend contract: docs/phase-2/action-plan-email-plan.md
  emailPlan: async (
    email: string,
    firstName: string,
    plan: Plan,
    lang: PlanLang,
    antiSpam: { website: string; startTime: number },
    // The tools they added, written as commitments in the plan's language.
    week: { heading: string; detail: string; items: string[] }
  ): Promise<void> => {
    const payload: EmailActionPlanPayload = {
      email,
      first_name: firstName || undefined,
      lang,
      website: antiSpam.website,
      startTime: antiSpam.startTime,
      summary: plan.summary,
      sections: [
        ...(week.items.length > 0
          ? [
              {
                heading: week.heading,
                items: week.items.map((commitment) => ({
                  title: commitment,
                  detail: week.detail,
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

  // One email in 7 days asking how they are. Only the address and name are
  // stored, and the backend deletes them once the email is sent.
  requestCheckIn: async (
    email: string,
    firstName: string,
    lang: PlanLang,
    antiSpam: { website: string; startTime: number }
  ): Promise<void> => {
    await fetchWithAuth(`${config.API_URL}/action-plans/check-in/`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        first_name: firstName || undefined,
        lang,
        website: antiSpam.website,
        startTime: antiSpam.startTime,
      }),
    });
  },
};
