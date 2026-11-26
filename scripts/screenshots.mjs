/*
  Saves a 390px-wide screenshot of every home page section and of the other
  pages, and one desktop picture of the home page, to screenshots/. Start the site first (npm run dev, or npm start), then:

    npm run screenshots                       # http://127.0.0.1:3000
    npm run screenshots -- https://some.url   # any deployment
*/
import { mkdirSync } from "node:fs";
import { chromium, devices } from "@playwright/test";

const base = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const out = new URL("../screenshots/", import.meta.url);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["iPhone 13"],
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce", // posters instead of video, and no reveal fades
});
const page = await context.newPage();

await page.goto(`${base}/`, { waitUntil: "networkidle" });
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
console.log(`home: horizontal overflow ${overflow}px`);

await page.screenshot({ path: new URL("home-first-screen.png", out).pathname });

const sections = await page.locator("[data-section]").all();
for (const section of sections) {
  const id = await section.getAttribute("data-section");
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({ path: new URL(`home-${id}.png`, out).pathname });
}

for (const [name, path] of [
  ["welcome", "/welcome?code=TEST"],
  ["privacy", "/privacy"],
  ["help", "/help"],
  ["flash", "/flash"],
]) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: new URL(`${name}.png`, out).pathname, fullPage: true });
}

// The home page at desktop size, in one tall picture. Scroll first, so lazy
// images load.
const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
await desktop.goto(`${base}/`, { waitUntil: "networkidle" });
for (const section of await desktop.locator("[data-section]").all()) {
  await section.scrollIntoViewIfNeeded();
}
await desktop.waitForLoadState("networkidle");
await desktop.evaluate(() => window.scrollTo(0, 0));
await desktop.screenshot({ path: new URL("desktop-full.png", out).pathname, fullPage: true });

await browser.close();
console.log(`saved to ${out.pathname}`);
