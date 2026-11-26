import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

/*
  A small per-IP speed bump for the waitlist API. Counts live in Postgres (table
  rate_limits, keyed by IP hash and minute), so they hold across serverless
  cold starts and instances. Without DATABASE_URL (tests, local smoke runs) the
  counts are kept in memory.

  It fails open: if the table is missing or the query fails, the request goes
  through. The honeypot field and the unique email constraint are the other two
  guards, so a broken limiter must never block a real signup.

  Only a salted hash of the IP is stored, and rows older than a day are deleted.
*/
export const RATE_LIMIT_PER_MINUTE = 5;

export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "boop-waitlist";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

const g = globalThis as unknown as { __boopHits?: Map<string, number> };
const memHits = (g.__boopHits ??= new Map<string, number>());

function hitInMemory(key: string, now: number): number {
  const minute = Math.floor(now / 60_000);
  const slot = `${key}:${minute}`;
  const count = (memHits.get(slot) ?? 0) + 1;
  memHits.set(slot, count);
  if (memHits.size > 5_000) {
    for (const k of memHits.keys()) {
      if (!k.endsWith(`:${minute}`)) memHits.delete(k);
    }
  }
  return count;
}

/** Counts this request and says whether the caller is over the limit. */
export async function rateLimited(req: Request, now = Date.now()): Promise<boolean> {
  const key = hashIp(clientIp(req));
  const url = process.env.DATABASE_URL;

  if (!url) return hitInMemory(key, now) > RATE_LIMIT_PER_MINUTE;

  try {
    const sql = neon(url);
    const rows = (await sql`
      insert into rate_limits (ip_hash, minute, hits)
      values (${key}, date_trunc('minute', now()), 1)
      on conflict (ip_hash, minute) do update set hits = rate_limits.hits + 1
      returning hits
    `) as unknown as { hits: number }[];

    // Tidy up now and then, so the table stays small without a cron job.
    if (Math.random() < 0.02) {
      await sql`delete from rate_limits where minute < now() - interval '1 day'`;
    }
    return (rows[0]?.hits ?? 0) > RATE_LIMIT_PER_MINUTE;
  } catch (err) {
    console.warn("rate limit check failed, letting the request through", err);
    return false;
  }
}
