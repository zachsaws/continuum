import { chromium } from "playwright";

const URL = "https://zachsaws.github.io/continuum/";
const OUT = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// EN home
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
// Dismiss cookie banner if visible
const noThanks = page.locator("button:has-text(\"No thanks\")");
if (await noThanks.count()) await noThanks.click();
await page.waitForTimeout(200);

// Scroll to WhyExists
await page.locator("a[href=\"#how\"]").first().click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/v16-en-whyexists.png`, fullPage: false });

// Scroll to features area to inspect
await page.locator("a[href=\"#features\"]").first().click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/v16-en-features.png`, fullPage: false });

// Scroll to security
await page.locator("a[href=\"#how\"]").first().click();  // first match is the section, not a separate security
await page.waitForTimeout(700);
const security = page.locator("text=Your memory is yours").first();
await security.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/v16-en-security.png`, fullPage: false });

// Final CTA
const finalCTA = page.locator("text=Go meet your AI").first();
await finalCTA.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/v16-en-finalcta.png`, fullPage: false });

await browser.close();
console.log("done");
