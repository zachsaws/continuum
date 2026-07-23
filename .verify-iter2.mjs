import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Home
await page.goto("https://zachsaws.github.io/continuum/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const h1 = await page.locator("h1").first().textContent();
console.log("Home h1:", h1);
await page.screenshot({ path: ".screenshots/v14-home.png", fullPage: false });

// Click manifesto in footer (SPA nav)
await page.locator("a:has-text('Manifesto')").first().click();
await page.waitForTimeout(2500);
const afterH1 = await page.locator("h1").first().textContent().catch(() => "");
const afterUrl = page.url();
console.log("After click Manifesto, h1:", afterH1);
console.log("After click URL:", afterUrl);
await page.screenshot({ path: ".screenshots/v14-manifesto.png", fullPage: true });

// Direct visit
await page.goto("https://zachsaws.github.io/continuum/manifesto", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);
const directH1 = await page.locator("h1").first().textContent();
console.log("Direct visit h1:", directH1);

// 404
await page.goto("https://zachsaws.github.io/continuum/foobar", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);
const fourOhFour = await page.locator("text=404").first().isVisible().catch(() => false);
const suggestionLink = await page.locator("a:has-text('Read the manifesto')").first().isVisible().catch(() => false);
console.log("404 visible:", fourOhFour, " / 404 manifesto link:", suggestionLink);
await page.screenshot({ path: ".screenshots/v14-404.png", fullPage: false });

// Switch to ZH and re-test
await page.goto("https://zachsaws.github.io/continuum/manifesto?lang=zh", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);
const zhH1 = await page.locator("h1").first().textContent();
console.log("ZH manifesto h1:", zhH1);
await page.screenshot({ path: ".screenshots/v14-manifesto-zh.png", fullPage: true });

await browser.close();
