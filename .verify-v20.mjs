import { chromium } from "playwright";

const URL = "https://zachsaws.github.io/continuum/";

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  console.log("→", URL);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  // Pricing section full
  const pricing = page.locator("#pricing");
  await pricing.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await pricing.screenshot({ path: ".screenshots/v20-en-pricing.png" });

  // 3 cards hover state
  const cards = pricing.locator("div.grid > div");
  const count = await cards.count();
  console.log("pricing card count:", count);

  // Hover on Pro (middle)
  const pro = cards.nth(1);
  await pro.hover();
  await page.waitForTimeout(500);
  await pricing.screenshot({ path: ".screenshots/v20-en-pricing-hover-pro.png" });

  // Pro card outerHTML head
  const proClass = await pro.getAttribute("class");
  console.log("pro class head:", proClass?.slice(0, 140));

  // Pro badge
  const badge = pro.locator("text=/most popular|最受欢迎/i");
  const badgeVisible = await badge.isVisible().catch(() => false);
  console.log("pro badge visible:", badgeVisible);

  // full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: ".screenshots/v20-en-full.png", fullPage: true });

  // Hero
  await page.screenshot({ path: ".screenshots/v20-en-hero.png" });

  // ZH
  await page.goto(URL + "?lang=zh", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  const pricingZh = page.locator("#pricing");
  await pricingZh.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await pricingZh.screenshot({ path: ".screenshots/v20-zh-pricing.png" });
  await page.screenshot({ path: ".screenshots/v20-zh-full.png", fullPage: true });

  // Manifesto
  await page.goto(URL + "manifesto", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: ".screenshots/v20-manifesto.png", fullPage: true });

  await browser.close();
  console.log("done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
