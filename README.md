# Boop website

The waitlist page for Boop, live at https://www.adoptaboop.com. Boop is a little
desk pet that keeps an eye on your AI coding agents: a Mac menu-bar app plus a
small ESP32 board with a screen. The product itself lives in
[Mellow-Machines-Lab/buddygotchi](https://github.com/Mellow-Machines-Lab/buddygotchi),
and its README is the source of truth for every claim on this site.

The site sits at the root of this repository.

## Stack

Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Neon Postgres, Vercel Web
Analytics, Resend for the confirmation email, and an optional TikTok Pixel.

## Local development

```sh
nvm install                    # Node 24 from .nvmrc, matching Vercel
npm ci
cp .env.example .env.local     # fill DATABASE_URL, or: npx vercel env pull .env.local
npm run db:push                # apply db/schema.sql (needs DATABASE_URL)
npm run dev                    # http://localhost:3000
```

The app starts with no env vars. Without `DATABASE_URL` the waitlist API returns
503 and the page still renders. To use the whole flow with no database, run with
`ALLOW_INMEM=1` (an in-memory store, for testing only). Without
`RESEND_API_KEY` the confirmation email is skipped and logged, and the signup
still succeeds.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production build / serve |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests in `tests/`: copy rules, email, first-touch attribution |
| `npm run test:e2e` | Playwright: the waitlist flow and a 390px layout check (`e2e/`) |
| `npm run screenshots` | Saves a 390px screenshot of every section to `screenshots/` |
| `npm run og` | Renders `public/og.png` from `scripts/og.html` |
| `npm run db:push` | Apply `db/schema.sql` to `DATABASE_URL` |
| `npm run emails:build` | Embed the templates from `emails/` |
| `npm run email:test -- you@example.com` | Send a rendered sample through Resend |

## Where things are

| Path | What it is |
| --- | --- |
| `src/lib/copy.ts` | Every word a visitor reads. `tests/copy-rules.test.mjs` checks it |
| `src/components/sections/` | The home page, top to bottom: Hero, Day, Mac, Moods, Flavors, Faq, Footer |
| `src/app/welcome/` | The page after a signup, with two optional questions |
| `src/app/api/waitlist/` | The signup API, and `answer/` for the optional questions |
| `src/lib/attribution.ts` | First-touch UTM capture |
| `src/lib/rate-limit.ts` | The per-IP limit, kept in Postgres |
| `db/schema.sql` | The whole database: `signups` and `rate_limits` |
| `emails/` | The confirmation email's source ([emails/README.md](emails/README.md)) |
| `SPEC.md` | The original July 2026 spec. Out of date: kept for history only |

## Copy rules

Boop is an adult desk gadget for developers, and the page is a waitlist.

- Boop only watches. Never say it approves, denies or blocks anything.
- No ship dates, no "pre-order", no battery claims, no certifications.
- Agents: Claude Code and Codex only, until buddygotchi's `agent-hooks` adds more.
- No hype words, no exclamation marks, no em dashes. Sentence case.

## Media

`public/media/` holds captures of Boop's real screen: short muted MP4 loops,
each with a WebP poster. They are recorded in full colour from buddygotchi's
native simulator, which runs the firmware's own drawing on the Mac. To make
them again after the character changes:

```sh
cd ~/src/buddygotchi   # a checkout at the latest main, with its simulator built
internal/tools/.venv/bin/python ~/src/boop-website/scripts/capture-boop.py /tmp/boop-frames
~/src/boop-website/scripts/capture-boop.sh /tmp/boop-frames
```

The menu-bar popover comes from buddygotchi's
`internal/tools/mediagen/mediagen.py --out DIR popover` (the right-hand pane).
The mood faces on the page must be faces the pack still draws: check
`mediagen.MOODS`.

**The hero film slot.** The hero shows the screen capture `boop-day.mp4` until
real footage exists. To replace it, add both of these files and deploy. No code
change is needed:

- `public/media/hero.mp4`: the board on a desk, muted, short, under 2 MB
- `public/media/hero-poster.jpg`: its first frame

Do not use AI-generated video here.

## Tracking

- **Attribution.** The first visit's UTM tags, referrer and price cohort
  (`?p=99` or `?p=129`, default 119) go into a first-party cookie and onto the
  signup row. A TikTok bio link should be
  `https://www.adoptaboop.com/?utm_source=tiktok&utm_medium=bio`.
- **Which video.** `/welcome` asks "Which video brought you here?" and stores
  the answer in `signups.video_source`.
- **Vercel Web Analytics events.** `signup`, `video_source`, `price_expectation`
  and `scroll_depth`.
- **TikTok Pixel.** Loads only when `NEXT_PUBLIC_TIKTOK_PIXEL_ID` is set. It
  sends a page view on every page and `CompleteRegistration` on a signup.
- `/privacy` describes all of the above. Change it when you change tracking.

## Abuse protection

The waitlist API has three guards: a per-IP limit of 5 requests a minute kept
in the `rate_limits` table, a hidden honeypot field, and the unique constraint
on `signups.email`. The limit fails open if the table is missing.

## Deploying to Vercel

Vercel deploys `main` to production, and every other branch gets a preview.

1. Import the repository. Leave **Root Directory** empty: the site is at the
   repository root.
2. Add a Neon database from the Marketplace. It sets `DATABASE_URL`.
3. Run `npm run db:push` once against that database, and again after any change
   to `db/schema.sql`.
4. Enable Web Analytics. Use Node.js 24.x.
5. Optional: `RESEND_API_KEY`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`, `RATE_LIMIT_SALT`.

## Before launch

- `hello@adoptaboop.com` must be a working inbox. It is the contact link and
  the reply-to address of the confirmation email.
- The Resend sending domain must be verified.
