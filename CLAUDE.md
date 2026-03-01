# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run check:ts     # TypeScript type checking (also aliased as `npm run lint`)
```

No test runner is configured. Linting is TypeScript-only via `tsc --noEmit`.

## Architecture

**Stack:** React 19 + Vite 5 + TypeScript + Tailwind CSS 3. Deployed on Vercel.

**Entry flow:** `index.html` → `src/main.tsx` → `components/javascript.tsx` (App component)

**Data layer — two-tier tool system:**
1. `aitoollist.ts` (root) — 234 AI tools with base schema: id, name, handle, website, description, category, free, openSource, and optional flags (blockchain, privacy, web3, verified)
2. `src/data/enrichedTools.ts` — Extended metadata keyed by tool handle: tagline, tags, features, badges (openSource/free/freemium/paid/privacyFocused/selfHostable/noSignup/apiAvailable), and links (website/github/docs/huggingface)

Tools flow through `data/aiToolsWithWeb3.ts` into `components/reactdesign.tsx` (AIToolsSection) which handles filtering, search, sorting, and display.

**16 categories** including "All". Filtering supports: category, free-only toggle, open-source toggle, Web3 toggle, and text search with multi-stage scoring (exact prefix → contains → fuzzy → category → description).

**Logo system:** Privacy-first, zero network requests. Uses `simple-icons` package with a custom mapping in `src/data/simpleIconsMap.ts` (~85 icons). Fallback generates colored initials from a deterministic hash. No external favicon APIs.

**Icon library:** The project shims `lucide-react` via `shims/lucide-react.js` (Vite alias). Icons from `simple-icons` are used for tool logos, but general UI icons should use inline SVG.

## API Routes (Vercel Serverless)

- `GET /api/challenge` — Generates HMAC challenge tokens (5-min TTL) for bot prevention
- `POST /api/feedback` — Email submission via Nodemailer with Zod validation, honeypot, rate limiting (3/60s/email), origin checking

Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `BOT_CHALLENGE_SECRET`

## Key Conventions

- **Privacy-first:** No tracking, no analytics, no external requests for logos/favicons. All SVGs bundled at build time.
- **External links:** Always use `getSafeExternalUrl()` from `src/utils/externalLinks.ts` which validates protocol (http/https only) and opens with `noopener,noreferrer`.
- **Animations:** Scroll-reveal via `data-reveal` attribute + Intersection Observer. Custom cursor (dot + ring) on fine-pointer devices. tsparticles for background effects.
- **Security headers** defined in `vercel.json` including strict CSP.
- **Manual chunks:** `@tsparticles` packages are split into a separate chunk in `vite.config.js`.
