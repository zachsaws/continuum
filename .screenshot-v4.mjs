// Screenshot v4 — verify MemoryBear-inspired iterations
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
const got = await page.$("button:has-text('Got it')");
if (got) await got.click();
await page.waitForTimeout(300);

async function scrollTo(text) {
  await page.evaluate((t) => {
    const heads = Array.from(document.querySelectorAll("h1, h2, h3"));
    const target = heads.find((h) => h.textContent?.includes(t));
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
  }, text);
  await page.waitForTimeout(700);
}

async function shot(name) {
  await page.screenshot({ path: `${OUT_DIR}/${name}.png`, fullPage: false });
  console.log(`✓ ${name}.png`);
}

// 1. Features section — Layered Memory card should now show 3 layers
await page.evaluate(() => {
  const el = document.querySelector("#features");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(700);
await shot("v4-en-layered-memory");

// 2. Pricing — Pro tier should now have "Cuts 20-40% prompt repetition"
await page.evaluate(() => {
  const el = document.querySelector("#pricing");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(700);
await shot("v4-en-pricing");

// 3. FAQ — new entries for enterprise memory + AI bill
await scrollTo("Questions, asked and answered");
await shot("v4-en-faq-top");

// expand all FAQ items
const allFaq = await page.$$("details");
for (const f of allFaq) {
  await f.evaluate((el) => el.open = true);
}
await page.waitForTimeout(500);
await shot("v4-en-faq-expanded");

// 4. ZH versions
await page.click("button:has-text('中')");
await page.waitForTimeout(400);
await page.evaluate(() => {
  const el = document.querySelector("#features");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(700);
await shot("v4-zh-layered-memory");

await page.evaluate(() => {
  const el = document.querySelector("#pricing");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(700);
await shot("v4-zh-pricing");

// Mobile
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
const mg = await mp.$("button:has-text('Got it')");
if (mg) await mg.click();
await mp.waitForTimeout(300);
await mp.evaluate(() => {
  const el = document.querySelector("#features");
  if (el) el.scrollIntoView({ block: "start" });
});
await mp.waitForTimeout(700);
await mp.screenshot({ path: `${OUT_DIR}/v4-mobile-layered.png` });
console.log("✓ v4-mobile-layered.png");

await browser.close();
console.log("done");
