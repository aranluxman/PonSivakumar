# Pon Sivakumar Commercial Real Estate

Premium Ontario commercial real estate investment and brokerage website built as a full Next.js application with backend route handlers.

## Stack

- Next.js App Router
- TypeScript
- Server-side API routes for lead capture and investor package requests
- Vercel-ready deployment configuration

## Backend Routes

- `POST /api/contact` validates and captures contact form submissions.
- `POST /api/investor-package` validates investor package requests.
- `GET /api/investor-package` generates a downloadable investor package HTML document.
- `POST /api/chat` runs the on-site investment assistant through the OpenAI Responses API.
- `GET /api/health` returns deployment health metadata.

## Optional Production Integrations

The backend works without secrets, but these environment variables enable production delivery:

- `LEAD_WEBHOOK_URL`: receives JSON lead payloads by POST.
- `RESEND_API_KEY`: enables email delivery through Resend.
- `LEAD_TO_EMAIL`: recipient for lead notifications. Defaults to `pon@ponhome.com`.
- `LEAD_FROM_EMAIL`: verified sender address for Resend. Defaults to `Pon Sivakumar <onboarding@resend.dev>`.
- `OPENAI_API_KEY`: server-only OpenAI API key for the website chatbot.
- `OPENAI_MODEL`: optional model override for the chatbot. Defaults to `gpt-5.2`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
