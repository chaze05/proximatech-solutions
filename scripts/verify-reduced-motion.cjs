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
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await sleep(1200);

  const checks = await page.evaluate(() => {
    const animations = Array.from(document.querySelectorAll("*"))
      .map((el) => getComputedStyle(el).animationName)
      .filter((name) => name && name !== "none");
    return {
      runningAnimations: animations,
      heroVisible: Boolean(document.querySelector("h1")),
    };
  });

  console.log("reduced-motion running animations:", JSON.stringify(checks.runningAnimations));
  console.log("hero rendered:", checks.heroVisible);
  console.log(
    "reduced-motion pass:",
    checks.runningAnimations.length === 0 && checks.heroVisible
  );

  await browser.close();
})();
