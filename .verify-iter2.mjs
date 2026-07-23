import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Home page
await page.goto("https://zachsaws.github.io/continuum/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const heroH1 = await page.locator("h1").first().textContent();
console.log("Home h1:", heroH1);
await page.screenshot({ path: ".screenshots/v13-home.png", fullPage: false });

// Manifesto page
await page.goto("https://zachsaws.github.io/continuum/manifesto", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const manifestH1 = await page.locator("h1").first().textContent().catch(() => "no h1");
console.log("Manifesto h1:", manifestH1);
const mSections = await page.locator("text=The thing we keep seeing").first().isVisible().catch(() => false);
console.log("Manifesto section visible:", mSections);
await page.screenshot({ path: ".screenshots/v13-manifesto.png", fullPage: true });

// 404 page
await page.goto("https://zachsaws.github.io/continuum/foobar", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const fourOhFour = await page.locator("text=404").first().isVisible().catch(() => false);
console.log("404 visible:", fourOhFour);
const manifestLink = await page.locator("a:has-text('Read the manifesto')").first().isVisible().catch(() => false);
console.log("404 manifesto link:", manifestLink);
await page.screenshot({ path: ".screenshots/v13-404.png", fullPage: false });

// SPA navigation test — go home, click manifesto link in footer
await page.goto("https://zachsaws.github.io/continuum/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);
await page.locator("a:has-text('Manifesto')").first().click();
await page.waitForTimeout(2500);
const afterClick = await page.locator("h1").first().textContent().catch(() => "");
console.log("After click Manifesto, h1:", afterClick);
const url = page.url();
console.log("URL after click:", url);

await browser.close();
