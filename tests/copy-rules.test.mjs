import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

/*
  The copy rules as a unit test. It scans the raw copy source, so it catches
  future edits with no build step. The product facts behind the rules are in
  the README of Mellow-Machines-Lab/buddygotchi.
*/
const src = readFileSync(new URL("../src/lib/copy.ts", import.meta.url), "utf8");

// Only the string literals, so code (comments, keys, `as const`) can't trip it.
const strings = [...src.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).join("\n");

// Hype words. `premium` and `productivity` are here because the page sells a
// desk pet, not a tool.
const BANNED = [
  "revolutionary",
  "supercharge",
  "AI-powered",
  "game-changer",
  "productivity",
  "premium",
];

// Words the product must not be sold with: it is an adult desk gadget and a
// waitlist. No dates, no battery, no certifications.
const OFF_LIMITS = [
  "toy",
  "kids",
  "squishy",
  "plush",
  "all ages",
  "pre-order",
  "preorder",
  "battery",
  "FCC",
  "UL listed",
  "CE mark",
  "certified",
  "Founding Litter",
  "Cursor",
  "VS Code",
];

function hasWord(text, word) {
  const escaped = word.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  return new RegExp(`(^|[^A-Za-z])${escaped}([^A-Za-z]|$)`, "i").test(text);
}

test("copy contains no banned hype words", () => {
  for (const word of BANNED) {
    assert.ok(!hasWord(strings, word), `banned word found in copy: ${word}`);
  }
});

test("copy stays inside what we can honestly say", () => {
  for (const word of OFF_LIMITS) {
    assert.ok(!hasWord(strings, word), `off-limits word found in copy: ${word}`);
  }
});

test("copy contains no exclamation marks", () => {
  assert.ok(!strings.includes("!"), "exclamation mark found in copy strings");
});

test("copy contains no em dashes", () => {
  assert.ok(!strings.includes("\u2014"), "em dash found in copy strings");
});

test("Boop is never said to approve or deny anything", () => {
  // Every sentence that mentions approving must also say that Boop does not,
  // or be about the agent asking for the person's own approval.
  const sentences = strings.split(/(?<=[.?])\s+|\n/).filter((s) => /approv|deny|denies/i.test(s));
  assert.ok(sentences.length > 0, "the page should say plainly that Boop only watches");
  for (const sentence of sentences) {
    assert.ok(
      /never|does it|your approval/i.test(sentence),
      `this sentence may claim Boop approves things: "${sentence}"`,
    );
  }
});

test("no user-facing source file has an em dash in a string or JSX text", () => {
  // Pages and components render text of their own (aria labels, metadata).
  const roots = ["../src/app/", "../src/components/"];
  const offenders = [];
  const walk = (dir) => {
    for (const entry of readdirSync(new URL(dir, import.meta.url), { withFileTypes: true })) {
      if (entry.isDirectory()) walk(`${dir}${entry.name}/`);
      else if (/\.tsx?$/.test(entry.name)) {
        const text = readFileSync(new URL(`${dir}${entry.name}`, import.meta.url), "utf8");
        if (text.includes("\u2014")) offenders.push(`${dir}${entry.name}`);
      }
    }
  };
  roots.forEach(walk);
  assert.deepEqual(offenders, [], "em dash found in a page or component");
});
