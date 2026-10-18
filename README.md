# OMC Pink October 2026

A production-ready volunteer registration website for Open Minds Club's Pink October 2026 campaign at USTHB. Built with Next.js App Router, TypeScript, Tailwind CSS, Motion, React Hook Form, Zod, and a server-side Google Apps Script integration.

## Features

- Responsive campaign landing page with accessible navigation and reduced-motion support
- Config-driven campaign content, brand colors, logo path, event details, and social links
- Client and server validation from a shared Zod schema
- Server-only proxy to Google Apps Script with a 10-second timeout and no automatic retries
- Honeypot, minimum-completion-time check, and basic per-instance IP rate limiting
- Confirmed success state only after Apps Script returns `{ "success": true }`
- Validation and route behavior tests with Vitest

## Local setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The supplied `.env.local` contains the provided Apps Script endpoint. `.env.example` intentionally contains no secret or deployment-specific URL.

## Verification commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Google Sheets setup

The frontend sends registrations to `/api/register`; only the Next.js server contacts Google Apps Script. The following columns are expected, in order:

`Timestamp, Name, Discord, Phone, Availability, Time, Notes, Stand Commitment`

Do not make the spreadsheet public. The website never exposes a read endpoint for registrations and does not log submitted personal data.

The current Apps Script deployment was not live-tested because that would create a real registration. To verify compatibility without writing data, compare your script with [`docs/google-apps-script.gs`](docs/google-apps-script.gs). If your current script does not parse JSON or return JSON containing `success: true`, replace it with that file:

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Create a sheet tab named `Registrations` and add the eight headers above in row 1.
3. Replace the editor contents with `docs/google-apps-script.gs` and save.
4. Choose **Deploy → Manage deployments → Edit** (or create a new Web app deployment).
5. Set **Execute as** to yourself and access to the audience appropriate for receiving the server request (commonly **Anyone** for this endpoint).
6. Deploy, authorize the script, copy the `/exec` URL, and set `GOOGLE_APPS_SCRIPT_URL` to it.

When a script changes, create a new deployment version; saving code alone does not update an existing versioned deployment.

## Deploy to Vercel

1. Push this project to a Git repository and import it in Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Add `GOOGLE_APPS_SCRIPT_URL` in **Project Settings → Environment Variables** for Production (and Preview if desired).
4. Deploy. Vercel will run `next build` and host the `/api/register` server route.

Do not configure this project as a static export: the secure registration proxy requires a server runtime.

## Branding and content

- Replace `public/assets/logos/omc-placeholder.svg` with the official logo, keeping the same filename, or update `brand.logoPath` in `src/config/site.ts`.
- Add future campaign photography to `public/assets/images/`.
- Keep reusable decorative assets in `public/assets/decorations/`.
- Update campaign text, event details, colors, and social links in `src/config/site.ts`.

The current OMC mark is explicitly a text placeholder and is not presented as the official club logo.

## Anti-spam note

The in-memory IP limiter is intentionally lightweight and may reset when a serverless instance restarts. For a public high-traffic campaign, add a durable edge limiter (for example, Vercel WAF/Firewall or a managed rate-limiting store) while keeping the existing honeypot and timing checks.
