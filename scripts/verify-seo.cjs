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

  const notFound = await page.goto(BASE + "/this-page-does-not-exist", {
    waitUntil: "networkidle0",
  });
  const status = notFound.status();
  const themed = await page.evaluate(() =>
    document.body.innerText.toUpperCase().includes("SIGNAL LOST.")
  );
  console.log("404 status:", status, "| themed:", themed);

  const sitemap = await page.goto(BASE + "/sitemap.xml", { waitUntil: "networkidle0" });
  const sitemapText = await page.evaluate(() => document.documentElement.innerText);
  console.log(
    "sitemap:",
    sitemap.status(),
    "| has store:",
    sitemapText.includes("/store/"),
    "| urls:",
    (sitemapText.match(/<url>/g) || []).length
  );

  const robots = await page.goto(BASE + "/robots.txt", { waitUntil: "networkidle0" });
  const robotsText = await page.evaluate(() => document.documentElement.innerText);
  console.log("robots:", robots.status(), "| sitemap:", robotsText.includes("Sitemap:"));

  const titles = [
    "/",
    "/products",
    "/services",
    "/gallery",
    "/store",
    "/events",
    "/contact",
  ];
  for (const route of titles) {
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    await sleep(200);
    const title = await page.title();
    console.log(route, "->", title);
  }

  await browser.close();
})();
