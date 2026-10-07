# Action Plan Email: Backend Endpoint

The public page `/action-plan` asks 9 questions and builds a Hopeful Beginning
action plan in the browser (`src/lib/actionPlan.ts`). The visitor can ask for
the plan by email. The frontend calls an endpoint that does not exist yet.

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
          "title": "Plan one small thing each day",
          "detail": "With low mood, waiting to feel like it doesn't work...",
          "steps": ["Each evening, choose one thing for tomorrow...", "..."],
          "link": "https://hopebegins.today/hope-ai"
        }
      ]
    }
  ]
}
```

- `first_name`, `intro`, `steps` and `link` are optional.
- `link` can be a web URL or a `tel:` link (the crisis hotline).
- Respond `2xx` on success. Any non-2xx shows "We couldn't send your plan" in the UI.

## Requirements

- Send one email with the subject "Your Hopeful Beginning Plan". Render the
  summary, then each section heading, intro and items in order, with steps as a
  numbered list and links as buttons.
- Include the e-coach link (https://m.me/Mayhimalaeveryday) near the top:
  "Want someone to journey with you? Talk to an e-coach on Messenger." (E-coaches
  are from Himala Everyday.) If a section with heading "Your safety plan"
  is present, it must be the first section in the email.
- Use the brand email template used for Daily Hope.
- Always include the NCMH Crisis Hotline (1553 / 0917 899 8727) in the email footer.
- Do not subscribe the address to any list. Use it only to send this email
  (this is what `/privacy` and the consent checkbox promise).
- Do not store the plan after sending. If a send log is needed, keep only the
  timestamp and a hash of the email.
- Rate limit per IP and per email address (for example 5 per hour) and reuse
  the honeypot pattern from the prayer form to block spam.
- The quiz answers are never sent to the server. Keep it that way.
