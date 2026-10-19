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
  page.on("console", (m) => console.log("[console:" + m.type() + "]", m.text().slice(0, 200)));
  page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 300)));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/products", { waitUntil: "networkidle0" });
  await sleep(1000);

  const before = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log("BEFORE:", JSON.stringify(before));

  const input = await page.$("input");
  await input.click();
  await input.type("zzzz", { delay: 30 });
  await sleep(800);

  const after = await page.evaluate(() => ({
    text: document.body.innerText.slice(0, 500),
    forms: document.querySelectorAll("main").length,
    buttons: Array.from(document.querySelectorAll("button")).map((b) => b.textContent.trim()).slice(0, 12),
  }));
  console.log("AFTER:", JSON.stringify(after, null, 1));
  await browser.close();
})();
