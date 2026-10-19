const puppeteer = require("puppeteer-core");

const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/products", { waitUntil: "networkidle0" });
  await sleep(800);

  const count = () => page.evaluate(() => document.querySelectorAll("main a[href^='/store/'], main a[href='/contact']").length);
  console.log("initial cards:", await count());

  await page.type("input[placeholder='Search products…']", "zzzz");
  await sleep(500);
  const emptyVisible = await page.evaluate(() =>
    document.body.innerText.includes("No products match your search.")
  );
  console.log("empty state visible:", emptyVisible);

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const reset = buttons.find((b) => b.textContent.trim().toLowerCase() === "reset filters");
    if (reset) reset.click();
  });
  await sleep(500);
  console.log("after reset:", await count());

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const chip = buttons.find((b) => b.textContent.trim() === "Networking");
    if (chip) chip.click();
  });
  await sleep(500);
  console.log("networking cards:", await count());

  await browser.close();
})();
