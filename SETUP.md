# Environment Setup

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Zoho Mail values in `.env.local`

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com) → your project → **Settings** → **Environment Variables**
2. Add each variable:

   | Name               | Value                        | Environment              |
   |--------------------|------------------------------|--------------------------|
   | `SMTP_HOST`        | `smtp.zoho.com`              | Production, Preview, Dev |
   | `SMTP_PORT`        | `465`                        | Production, Preview, Dev |
   | `SMTP_USER`        | Your Zoho email address      | Production, Preview, Dev |
   | `SMTP_PASS`        | Your Zoho password/App Pass  | Production, Preview, Dev |
   | `CONTACT_TO_EMAIL` | Email to receive submissions | Production, Preview, Dev |
   | `BOT_CHALLENGE_SECRET` | Any random string (anti-bot) | Production, Preview, Dev |

   Generate `BOT_CHALLENGE_SECRET` by running: `openssl rand -hex 32`

3. Check all 3 environments for each variable
4. Click **Redeploy** to apply

All values are encrypted at rest on Vercel and never visible in code, logs, or client-side bundles.

## Security Notes

- `.env.local` is gitignored via the `.env*` rule — it will never be committed
- All credentials are read server-side only in `api/` routes via `process.env`
- No tracking, no analytics, no third-party services — just Zoho Mail SMTP
- The server-side route includes origin checking and rate limiting
