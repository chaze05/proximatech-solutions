const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: "C:/rani/proximatech-solutions/qa/hero-slide1.jpg" });

  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label="Next slide"]');
    if (button) button.click();
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: "C:/rani/proximatech-solutions/qa/hero-slide2.jpg" });

  console.log("hero frames captured");
  await browser.close();
})();
