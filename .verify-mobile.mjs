import { chromium } from "playwright";

const URL = "https://zachsaws.github.io/continuum/";
const OUT = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const noThanks = page.locator("button:has-text(\"No thanks\")");
if (await noThanks.count()) await noThanks.click();
await page.waitForTimeout(200);

await page.screenshot({ path: `${OUT}/v16-mobile-en.png`, fullPage: true });

// Switch to ZH
await page.locator("button[role=tab]:has-text(\"中\")").click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/v16-mobile-zh.png`, fullPage: true });

await browser.close();
console.log("done");
