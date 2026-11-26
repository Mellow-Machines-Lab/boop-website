/*
  First-touch attribution for the demand test. Reads UTM params, price cohort,
  referral code, and referrer on the first visit and stores them in a single
  first-party cookie for 30 days. The waitlist API reads this cookie
  server-side and stores it on the signup row. Covered by
  tests/attribution.test.mjs.
*/
export type Attribution = {
  priceCohort?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  ref_code_used?: string;
  ts?: string;
};

export const ATTR_COOKIE = "bg_attr";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const VALID_COHORTS = new Set([99, 129]);
export const DEFAULT_PRICE = 119;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function parseCohort(raw: string | null): number | undefined {
  if (!raw) return undefined;
  const n = Number(raw);
  return VALID_COHORTS.has(n) ? n : undefined;
}

function readStored(): Attribution | null {
  const raw = readCookie(ATTR_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** True when a visit carries a campaign: any UTM tag or a referral code. */
function hasCampaign(attr: Attribution): boolean {
  return Boolean(attr.ref_code_used) || UTM_KEYS.some((key) => Boolean(attr[key]));
}

/**
  Run on every page load. First touch wins: the first visit's tags are stored
  and later visits don't change them. So a visit with
  ?utm_source=tiktok&utm_medium=bio is stored as tiktok / bio and stays that
  way.

  One exception: if the stored first touch has no campaign at all (a direct
  visit), and this visit has one, the campaign is recorded. Otherwise someone
  who typed the address once and later tapped the TikTok link would count as
  "direct" for ever.
*/
export function captureAttribution(): void {
  if (typeof document === "undefined") return;

  const stored = readStored();
  const q = new URLSearchParams(window.location.search);
  const attr: Attribution = { ts: new Date().toISOString() };

  const cohort = parseCohort(q.get("p"));
  if (cohort) attr.priceCohort = cohort;

  for (const key of UTM_KEYS) {
    const v = q.get(key);
    if (v) attr[key] = v.slice(0, 200);
  }

  const ref = q.get("ref");
  if (ref) attr.ref_code_used = ref.slice(0, 32);
  if (document.referrer) attr.referrer = document.referrer.slice(0, 500);

  if (stored) {
    if (hasCampaign(stored) || !hasCampaign(attr)) return; // first touch stands
    // Keep what the direct visit already fixed: its price cohort.
    if (stored.priceCohort) attr.priceCohort = stored.priceCohort;
  }

  writeCookie(ATTR_COOKIE, JSON.stringify(attr), 30);
}

/**
  Price cohort for analytics only: never shown on the page. Reads the cookie,
  falls back to a live ?p= param, then $119.
*/
export function getPriceCohort(): number {
  const stored = parseCohort(
    (() => {
      const raw = readCookie(ATTR_COOKIE);
      if (!raw) return null;
      try {
        return String((JSON.parse(raw) as Attribution).priceCohort ?? "");
      } catch {
        return null;
      }
    })(),
  );
  if (stored) return stored;

  if (typeof window !== "undefined") {
    const live = parseCohort(new URLSearchParams(window.location.search).get("p"));
    if (live) return live;
  }
  return DEFAULT_PRICE;
}
