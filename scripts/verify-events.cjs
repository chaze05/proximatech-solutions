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
  await page.goto(BASE + "/events", { waitUntil: "networkidle0" });
  await sleep(1300);

  const read = () =>
    page.evaluate(() => {
      const blocks = Array.from(document.querySelectorAll("p"));
      const block = document.querySelector('p[aria-live="polite"]');
      return block ? block.textContent.trim() : null;
    });

  const first = await read();
  await sleep(1400);
  const second = await read();
  console.log("countdown first:", first);
  console.log("countdown second:", second);
  console.log("ticks:", Boolean(first && second && first !== second));

  await browser.close();
})();

