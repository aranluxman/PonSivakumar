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
- `GET /api/investor-package` redirects to the print-ready investor package HTML document.
- `GET /api/health` returns deployment health metadata.

## Optional Production Integrations

The backend works without secrets, but these environment variables enable production delivery:

- `LEAD_WEBHOOK_URL`: receives JSON lead payloads by POST.
- `RESEND_API_KEY`: enables email delivery through Resend.
- `LEAD_TO_EMAIL`: recipient for lead notifications. Defaults to `pon@ponhome.com`.
- `LEAD_FROM_EMAIL`: verified sender address for Resend. Defaults to `Pon Sivakumar <onboarding@resend.dev>`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
