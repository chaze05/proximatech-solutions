const puppeteer = require("puppeteer-core");

const BASE = "http://localhost:3000";
const OUT = "C:/rani/proximatech-solutions/qa";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(1500);

  const sections = await page.$$("main > section");
  console.log("sections:", sections.length);

  for (let i = 0; i < sections.length; i++) {
    await page.evaluate((index) => {
      const el = document.querySelectorAll("main > section")[index];
      el.scrollIntoView({ block: "start", behavior: "instant" });
    }, i);
    await sleep(900);
    const el = sections[i];
    await el.screenshot({ path: `${OUT}/home-sec-${i}.jpg` });
  }

  await browser.close();
  console.log("done");
})();
