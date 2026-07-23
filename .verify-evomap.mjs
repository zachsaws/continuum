import { chromium } from "playwright";

const OUT = "/Users/tianxiang/.minimax-agent-cn/projects/continuum/.screenshots";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Try the URL user gave
const urls = [
  "https://evomap.ai/zh/evox/beta",
  "https://evomap.ai/evox/beta",
  "https://evomap.ai/",
];

for (const u of urls) {
  console.log("==", u);
  try {
    const resp = await page.goto(u, { waitUntil: "networkidle", timeout: 25000 });
    console.log("status:", resp?.status());
    await page.waitForTimeout(1500);
  } catch (e) {
    console.log("err:", e.message);
  }
}

await page.screenshot({ path: `${OUT}/evomap-home.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/evomap-home-full.png`, fullPage: true });

// Try evox/beta specifically
try {
  await page.goto("https://evomap.ai/zh/evox/beta", { waitUntil: "networkidle", timeout: 25000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/evomap-evox.png`, fullPage: false });
  await page.screenshot({ path: `${OUT}/evomap-evox-full.png`, fullPage: true });
} catch (e) {
  console.log("evox err:", e.message);
}

await browser.close();
console.log("done");
