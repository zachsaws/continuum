import { chromium } from "playwright";

const URL = "https://zachsaws.github.io/continuum/";
const OUT = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => { if (m.type() === "error") console.log("[console error]", m.text()); });

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const noThanks = page.locator("button:has-text(\"No thanks\")");
if (await noThanks.count()) await noThanks.click();
await page.waitForTimeout(300);

await page.screenshot({ path: `${OUT}/v19-en-hero.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/v19-en-full.png`, fullPage: true });

// Capture each feature
const featureIds = ["#features", "#install"];
for (const fid of featureIds) {
  const el = page.locator(fid).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/v19-en-${fid.replace("#", "")}.png`, fullPage: false });
}

// Each feature viz
const features = page.locator("#features .grid").first();
await features.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const featureRows = page.locator("#features .reveal > .grid, #features .reveal.grid");
const count = await featureRows.count();
console.log("feature rows:", count);
for (let i = 0; i < count; i++) {
  const row = featureRows.nth(i);
  await row.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/v19-en-feature-${i}.png`, fullPage: false });
}

// ZH
await page.locator("button[role=tab]:has-text(\"中\")").click();
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/v19-zh-hero.png`, fullPage: false });

await page.locator("#features").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/v19-zh-features.png`, fullPage: false });

await page.locator("#install").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/v19-zh-install.png`, fullPage: false });

// Mobile
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL + "?lang=zh", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const noThanks2 = page.locator("button:has-text(\"不了\")");
if (await noThanks2.count()) await noThanks2.click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/v19-mobile-hero.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/v19-mobile-features.png`, fullPage: true });

await browser.close();
console.log("done");
