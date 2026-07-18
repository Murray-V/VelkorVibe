# Velkor Vibe — starter

**The app shell for the Multi-Seat Venture OS.** Run a software venture with a crew of
specialized AI seats — two teams (Venture + Build) coordinating through one Supabase
database that is the single source of truth, with you as the one human decider.

This repo is the free, MIT-licensed starter: the minimal app the OS needs to run —
the live-commit heartbeat and the operator dashboard. The full **Velkor Vibe package**
(playbook, canon installer, bootstrap prompts, guides) is licensed separately.

## What's in the box

| Path | What it is |
|---|---|
| `app/api/version` | `GET /api/version` — the heartbeat. Returns the live deployed commit. Every seat grounds on this. |
| `app/pm` | The operator dashboard — Needs-you panel, status board, open bus notes, surfaces, canon index. A **view** of the database, never a second source of truth. |
| `lib/supabase.ts` | Server-only Supabase client (service role — never exposed to the browser). |
| `.env.example` | The three environment variables you need. |

## Quick start

1. **Use this template** (green button above) → create your venture's repo.
2. **Create a Supabase project** (free tier is fine) and run the Velkor Vibe
   **seed installer** (`30_Seed-Install.sql` from the package) once in the SQL editor.
   It creates five `pm_*` tables with row-level security on and seeds the full canon.
3. **Import the repo into Vercel** (vercel.com → Add New → Project). In
   Project → Settings → Environment Variables, set the three from `.env.example`:
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `PM_KEY`.
4. Deploy. Then:
   - `curl https://YOUR-APP.vercel.app/api/version` → returns the live commit ✓
   - open `https://YOUR-APP.vercel.app/pm?key=YOUR-PM-KEY` → the build map is alive ✓
5. **Boot Mike** (the Manager seat) per the package's startup sequence. He takes it from there.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # http://localhost:3000 — /pm gate is off in dev
```

## The rules this app embodies

- **The database is the single source of truth** — this app only reads and displays it.
- `/api/version` exists because seats **ground on the live commit**, never on memory.
- `/pm` is gated (`?key=`) because the build map is for the operator, not the public.
- The service-role key is **server-only** and RLS is on from install.

---
© 2026 Velkor Projects Ltd. · Starter: MIT (see LICENSE) · Package: licensed separately
