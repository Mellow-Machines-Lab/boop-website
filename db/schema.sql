-- Boop waitlist. Applied via `npm run db:push`. Every statement is safe to run
-- again, so the same file creates a new database and updates an old one.
create table if not exists signups (
  id             bigint generated always as identity primary key,
  email          text not null unique,
  source         text not null,              -- 'hero' | 'footer'
  price_cohort   integer,                    -- 99 | 129 | null (default 119)
  utm_source     text,                       -- first touch, e.g. 'tiktok'
  utm_medium     text,                       -- first touch, e.g. 'bio'
  utm_campaign   text,
  utm_content    text,
  utm_term       text,
  referrer       text,                       -- document.referrer at landing
  ref_code_used  text,                       -- ?ref= code they arrived with
  referral_code  text not null unique,       -- their own code; keys the /welcome answers
  referral_count integer not null default 0,
  price_expectation text,                    -- optional /welcome answer
  video_source   text,                       -- optional /welcome answer: which video brought them
  created_at     timestamptz not null default now()
);

create index if not exists signups_created_at_idx on signups (created_at);
create index if not exists signups_referral_code_idx on signups (referral_code);

alter table signups add column if not exists price_expectation text;
alter table signups add column if not exists video_source text;

-- Per-IP speed bump for the waitlist API (src/lib/rate-limit.ts). Holds a
-- salted hash of the IP, never the IP. Rows older than a day are deleted.
create table if not exists rate_limits (
  ip_hash text not null,
  minute  timestamptz not null,
  hits    integer not null default 1,
  primary key (ip_hash, minute)
);
