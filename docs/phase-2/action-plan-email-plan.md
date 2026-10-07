# Action Plan Email

The public page `/action-plan` asks 9 questions and builds a Hopeful Beginning
Plan in the browser (`src/lib/actionPlan.ts`). Visitors can ask for the plan by
email. The backend endpoint lives in `Hope-Begin-Backend` under
`apps/action_plans`.

## Endpoint

`POST /api/action-plans/email/` (public, no auth)

```json
{
  "email": "person@example.com",
  "first_name": "Ana",
  "summary": ["Some days of low mood.", "Sleep that is off."],
  "sections": [
    {
      "heading": "Your daily tools",
      "intro": "Start with one or two. Use them every day for a week.",
      "items": [
        {
          "title": "Talk it through with Hope AI",
          "detail": "An AI assistant you can chat with at any hour.",
          "steps": ["..."],
          "link": "/hope-ai",
          "link_label": "Chat with Hope"
        }
      ]
    }
  ],
  "website": "",
  "startTime": 1791350000000
}
```

- `first_name`, `intro`, `steps`, `link` and `link_label` are optional.
- `link` is a site path (`/hope-ai`, made absolute with the backend's
  `FRONTEND_URL`), a `https://` link to hopebegins.today or
  warroom.hopebegins.today, the e-coach page `https://m.me/Mayhimalaeveryday`,
  or a `tel:` number. Anything else is rejected.
- `website` is a honeypot and must be empty. `startTime` is when the visitor
  first focused the email form; it must be 3 seconds to 1 hour old.
- 200 means sent. 400 is a validation or anti-spam failure, 429 a rate limit,
  503 an SMTP failure. The page shows "We couldn't send your plan" for all of them.

## Behaviour

- One email, subject "Your Hopeful Beginning Plan", in the brand colours, with
  the e-coach box after the summary, or after the safety plan when there is one.
  The safety plan is always the first section. The NCMH crisis line is always in
  the footer.
- Nothing is stored. The address is used only to send this email and is not
  added to any list (this is what `/privacy` and the consent checkbox promise).
- Limits: 30 requests per IP per hour (`action_plan_email` throttle) and
  3 emails per address per day.
- The quiz answers are never sent to the server.

## Ops note

The IP limit relies on nginx forwarding the client address
(`proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`). Without it,
all visitors share one limit, which also affects the existing `public_form`
throttle.
