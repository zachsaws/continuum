// Screenshot v3 — full page + key section captures
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT_DIR = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

const url = "http://127.0.0.1:4321/";
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.click("button:has-text('EN')");
await page.waitForTimeout(300);
// dismiss cookie banner so it doesn't cover the magic moment
const gotIt = await page.$("button:has-text('Got it')");
if (gotIt) await gotIt.click();
await page.waitForTimeout(300);

async function scrollToText(text) {
  await page.evaluate((t) => {
    const headings = Array.from(document.querySelectorAll("h1, h2"));
    const target = headings.find((h) => h.textContent?.includes(t));
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
  }, text);
  await page.waitForTimeout(600);
}

async function shot(name) {
  await page.screenshot({ path: `${OUT_DIR}/${name}.png`, fullPage: false });
  console.log(`✓ ${name}.png`);
}

// 1. Full page (English)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT_DIR}/v3-en-fullpage.png`, fullPage: true });
console.log("✓ v3-en-fullpage.png");

// 2. Hero with magic moment
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT_DIR}/v3-en-hero.png` });
console.log("✓ v3-en-hero.png");

// 3. Magic moment scrolled into view
await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (h1) {
    const card = h1.closest("section")?.querySelector(".card");
    if (card) card.scrollIntoView({ block: "center" });
  }
});
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT_DIR}/v3-en-magic-moment.png` });
console.log("✓ v3-en-magic-moment.png");

// 4. IsForMe
await scrollToText("You might not need us");
await shot("v3-en-is-for-me");

// 5. Code section (find the tab "configure" or step 2)
await page.evaluate(() => {
  const heads = Array.from(document.querySelectorAll("h2"));
  const code = heads.find((h) => h.textContent?.includes("Five lines of JSON"));
  if (code) code.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(600);
await shot("v3-en-code");

// 6. Pricing
await page.evaluate(() => {
  const el = document.querySelector("#pricing");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(500);
await shot("v3-en-pricing");

// 7. Final CTA (find it)
await scrollToText("Stop explaining yourself");
await shot("v3-en-final-cta");

// 8. Changelog
await scrollToText("v0.1.0");
await shot("v3-en-changelog");

// 9. Chinese hero
await page.click("button:has-text('中')");
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await shot("v3-zh-hero");

// 10. Chinese IsForMe
await page.evaluate(() => {
  const heads = Array.from(document.querySelectorAll("h2"));
  const is = heads.find((h) => h.textContent?.includes("你可能不需要"));
  if (is) is.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(500);
await shot("v3-zh-is-for-me");

// 11. Mobile hero
await context.close();
const mctx = await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
  isMobile: true,
});
const mp = await mctx.newPage();
await mp.goto(url, { waitUntil: "networkidle" });
await mp.waitForTimeout(800);
await mp.click("button:has-text('EN')");
await mp.waitForTimeout(300);
const mGot = await mp.$("button:has-text('Got it')");
if (mGot) await mGot.click();
await mp.waitForTimeout(300);
await mp.evaluate(() => window.scrollTo(0, 0));
await mp.waitForTimeout(400);
await mp.screenshot({ path: `${OUT_DIR}/v3-mobile-hero.png` });
console.log("✓ v3-mobile-hero.png");

// Mobile magic moment
await mp.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (h1) {
    const card = h1.closest("section")?.querySelector(".card");
    if (card) card.scrollIntoView({ block: "start" });
  }
});
await mp.waitForTimeout(500);
await mp.screenshot({ path: `${OUT_DIR}/v3-mobile-magic.png` });
console.log("✓ v3-mobile-magic.png");

// Mobile IsForMe
await mp.evaluate(() => {
  const heads = Array.from(document.querySelectorAll("h2"));
  const is = heads.find((h) => h.textContent?.includes("might not need"));
  if (is) is.scrollIntoView({ block: "start" });
});
await mp.waitForTimeout(500);
await mp.screenshot({ path: `${OUT_DIR}/v3-mobile-is-for-me.png` });
console.log("✓ v3-mobile-is-for-me.png");

await browser.close();
console.log("done");
