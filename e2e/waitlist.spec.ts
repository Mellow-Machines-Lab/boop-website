import { test, expect } from "@playwright/test";

test("the waitlist flow lands on /welcome and saves both answers", async ({ page }) => {
  await page.goto("/?utm_source=tiktok&utm_medium=bio");

  // First touch is stored as soon as the page loads.
  await expect
    .poll(async () => {
      const cookie = (await page.context().cookies()).find((c) => c.name === "bg_attr");
      return cookie ? JSON.parse(decodeURIComponent(cookie.value)).utm_source : null;
    })
    .toBe("tiktok");

  // The form is on the page, with no modal, and shows no price.
  const submit = page.getByTestId("hero-submit");
  await expect(submit).toHaveText("Join the waitlist");
  await expect(submit).not.toContainText("$");

  const email = `e2e+${Date.now()}@example.com`;
  await page.getByLabel("Email address").first().fill(email);
  await submit.click();

  await page.waitForURL(/\/welcome\?code=/);
  await expect(page.getByRole("heading", { name: "You're on the list." })).toBeVisible();

  // Which video brought you here?
  await page.getByLabel("Which video brought you here?").fill("the one where it knocks");
  await page.getByTestId("video_source-send").click();
  await expect(page.getByTestId("video_source-thanks")).toBeVisible();

  // The price question is still there, and still optional.
  await page
    .getByLabel("What would you honestly expect a ready-made Boop to cost?")
    .fill("$119");
  await page.getByTestId("price_expectation-send").click();
  await expect(page.getByTestId("price_expectation-thanks")).toBeVisible();
});

test("a filled honeypot looks like success and stores nothing", async ({ request }) => {
  const email = `bot+${Date.now()}@example.com`;
  // Its own address, so the per-IP limit never mixes it with the other tests.
  const headers = { "x-forwarded-for": `203.0.113.${Math.floor(Math.random() * 250) + 1}` };
  const bot = await request.post("/api/waitlist", {
    headers,
    data: { email, source: "hero", website: "https://spam.example" },
  });
  expect(bot.ok()).toBeTruthy();
  expect((await bot.json()).referralCode).toBe("");

  // The same address then signs up for real and is created as new.
  const real = await request.post("/api/waitlist", { headers, data: { email, source: "hero" } });
  expect((await real.json()).created).toBe(true);
});

test("the page says nothing the product does not do", async ({ page }) => {
  await page.goto("/");
  const text = (await page.locator("main").innerText()).toLowerCase();
  for (const gone of ["approve with a pet", "founding litter", "pre-order", "cursor", "light strip", "a brain that works alone"]) {
    expect(text).not.toContain(gone);
  }
  expect(text).toContain("it never approves, denies or blocks anything");
});

test.describe("at 390px wide", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const path of ["/", "/welcome?code=TEST", "/privacy", "/help", "/flash"]) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("the email field and button are on the first screen", async ({ page }) => {
    await page.goto("/");
    const box = await page.getByTestId("hero-submit").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(844);
  });
});
