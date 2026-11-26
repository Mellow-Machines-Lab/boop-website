import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

/*
  First-touch attribution (src/lib/attribution.ts), run against a tiny fake of
  the browser's document and window. The rule under test: the first campaign a
  visitor arrives with is the one stored on their signup.
*/
const { captureAttribution, getPriceCohort, ATTR_COOKIE, DEFAULT_PRICE } = await import(
  "../src/lib/attribution.ts"
);

let jar;

function visit(search, referrer = "") {
  globalThis.window = { location: { search } };
  globalThis.document = {
    referrer,
    get cookie() {
      return [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(value) {
      const [pair] = value.split(";");
      const eq = pair.indexOf("=");
      jar.set(pair.slice(0, eq), pair.slice(eq + 1));
    },
  };
  captureAttribution();
}

function stored() {
  const raw = jar.get(ATTR_COOKIE);
  return raw ? JSON.parse(decodeURIComponent(raw)) : null;
}

beforeEach(() => {
  jar = new Map();
});

test("a TikTok bio visit is stored as first touch", () => {
  visit("?utm_source=tiktok&utm_medium=bio", "https://www.tiktok.com/");
  const attr = stored();
  assert.equal(attr.utm_source, "tiktok");
  assert.equal(attr.utm_medium, "bio");
  assert.equal(attr.referrer, "https://www.tiktok.com/");
  assert.ok(attr.ts, "first touch has a timestamp");
});

test("a later visit with other tags does not replace the first touch", () => {
  visit("?utm_source=tiktok&utm_medium=bio");
  visit("?utm_source=newsletter&utm_medium=email");
  visit("");
  const attr = stored();
  assert.equal(attr.utm_source, "tiktok");
  assert.equal(attr.utm_medium, "bio");
});

test("a campaign visit upgrades an earlier direct visit", () => {
  visit("");
  assert.equal(stored().utm_source, undefined);
  visit("?utm_source=tiktok&utm_medium=bio");
  assert.equal(stored().utm_source, "tiktok");
  assert.equal(stored().utm_medium, "bio");
});

test("a direct revisit never clears a stored campaign", () => {
  visit("?utm_source=tiktok&utm_medium=bio&utm_campaign=launch");
  visit("");
  assert.equal(stored().utm_campaign, "launch");
});

test("price cohort is read from ?p= and defaults to 119", () => {
  visit("?utm_source=tiktok&utm_medium=bio&p=99");
  assert.equal(stored().priceCohort, 99);
  assert.equal(getPriceCohort(), 99);

  jar = new Map();
  visit("?p=7");
  assert.equal(stored().priceCohort, undefined);
  assert.equal(getPriceCohort(), DEFAULT_PRICE);
});

test("a referral code is kept with the first touch", () => {
  visit("?ref=ABC123");
  assert.equal(stored().ref_code_used, "ABC123");
});
