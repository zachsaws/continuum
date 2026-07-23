import { chromium } from "playwright";

const OUT = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";

const browser = await chromium.launch();

// Desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Apple home
await page.goto("https://www.apple.com/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/apple-home.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/apple-home-full.png`, fullPage: true });

// iPhone Air
await page.goto("https://www.apple.com/iphone-air/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/apple-iphone-air.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/apple-iphone-air-full.png`, fullPage: true });

// iPhone 17 Pro
await page.goto("https://www.apple.com/iphone-17-pro/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/apple-iphone-17-pro.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/apple-iphone-17-pro-full.png`, fullPage: true });

await browser.close();
console.log("done");
