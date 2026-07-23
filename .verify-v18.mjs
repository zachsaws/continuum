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

await page.screenshot({ path: `${OUT}/v18-en-hero.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/v18-en-full.png`, fullPage: true });

// Scroll to capture just the mockup
const mockup = page.locator(".rounded-xl").first();
await mockup.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/v18-en-mockup.png`, fullPage: false });

// ZH
await page.locator("button[role=tab]:has-text(\"中\")").click();
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/v18-zh-hero.png`, fullPage: false });

// Mobile
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL + "?lang=zh", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const noThanks2 = page.locator("button:has-text(\"不了\")");
if (await noThanks2.count()) await noThanks2.click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/v18-mobile-hero.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/v18-mobile-full.png`, fullPage: true });

await browser.close();
console.log("done");
