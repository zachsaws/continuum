import { chromium } from "playwright";

const URL = "https://zachsaws.github.io/continuum/";

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  // Find mockup (BigProductMockup root — the macOS window chrome div)
  // It's inside Hero, after LogoBar
  const mockup = page.locator("section").first().locator("div").filter({ hasText: "Claude" }).filter({ hasText: "Continuum" }).first();

  // Capture at scrollY=0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  let transform = await page.evaluate(() => {
    const root = document.querySelector("section .reveal-stagger")?.parentElement;
    const mockupWrap = root?.querySelectorAll(":scope > div")[root.querySelectorAll(":scope > div").length - 1];
    return (mockupWrap)?.style?.transform || "no-transform";
  });
  console.log("scrollY=0 mockup transform:", transform);
  await page.screenshot({ path: ".screenshots/v22-hero-top.png" });

  // Scroll down 300px — should see mockup translated up
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);
  transform = await page.evaluate(() => {
    const root = document.querySelector("section .reveal-stagger")?.parentElement;
    const divs = root?.querySelectorAll(":scope > div") || [];
    const mockupWrap = divs[divs.length - 1];
    return (mockupWrap)?.style?.transform || "no-transform";
  });
  console.log("scrollY=300 mockup transform:", transform);
  await page.screenshot({ path: ".screenshots/v22-hero-scroll-300.png" });

  // Scroll down 600px — larger offset
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  transform = await page.evaluate(() => {
    const root = document.querySelector("section .reveal-stagger")?.parentElement;
    const divs = root?.querySelectorAll(":scope > div") || [];
    const mockupWrap = divs[divs.length - 1];
    return (mockupWrap)?.style?.transform || "no-transform";
  });
  console.log("scrollY=600 mockup transform:", transform);
  await page.screenshot({ path: ".screenshots/v22-hero-scroll-600.png" });

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: ".screenshots/v22-en-full.png", fullPage: true });

  await browser.close();
  console.log("done");
}

run().catch((e) => { console.error(e); process.exit(1); });
