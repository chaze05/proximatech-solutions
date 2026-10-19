const puppeteer = require("puppeteer-core");

const BASE = "http://localhost:3000";
const route = process.argv[2] || "/";
const mobile = process.argv[3] === "mobile";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport(mobile ? { width: 390, height: 844 } : { width: 1350, height: 940 });

  await page.evaluateOnNewDocument(() => {
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__shifts.push({
            value: entry.value,
            start: Math.round(entry.startTime),
            sources: (entry.sources || []).map((source) => ({
              tag: source.node ? source.node.tagName : null,
              cls: source.node ? String(source.node.className || "").slice(0, 70) : null,
              prev: source.previousRect ? Math.round(source.previousRect.top) : null,
              next: source.currentRect ? Math.round(source.currentRect.top) : null,
            })),
          });
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto(BASE + route, { waitUntil: "networkidle0" });
  await sleep(2500);

  const shifts = await page.evaluate(() => window.__shifts);
  console.log(route, mobile ? "(mobile)" : "(desktop)");
  console.log(JSON.stringify(shifts, null, 1));
  console.log(
    "total CLS:",
    shifts.reduce((sum, s) => sum + s.value, 0).toFixed(3)
  );

  await browser.close();
})();
