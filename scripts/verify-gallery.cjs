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
  await page.goto(BASE + "/gallery", { waitUntil: "networkidle0" });
  await sleep(1200);

  const count = () => page.evaluate(() => document.querySelectorAll("main button img").length);
  console.log("images (All):", await count());

  await page.evaluate(() => {
    const chip = Array.from(document.querySelectorAll("button")).find((b) => b.textContent.trim() === "Events");
    if (chip) chip.click();
  });
  await sleep(500);
  console.log("images (Events):", await count());

  await page.evaluate(() => {
    const chip = Array.from(document.querySelectorAll("button")).find((b) => b.textContent.trim() === "All");
    if (chip) chip.click();
  });
  await sleep(500);

  await page.evaluate(() => {
    const imgButtons = Array.from(document.querySelectorAll("main button")).filter((b) => b.querySelector("img"));
    if (imgButtons[0]) imgButtons[0].click();
  });
  await sleep(600);

  const opened = await page.evaluate(() => {
    const box = document.getElementById("lightbox");
    const caption = box ? box.querySelector("figcaption") : null;
    return {
      exists: Boolean(box),
      focusInside: box ? box.contains(document.activeElement) : false,
      caption: caption ? caption.textContent.replace(/\s+/g, " ").trim() : null,
    };
  });
  console.log("lightbox open:", JSON.stringify(opened));

  await page.keyboard.press("ArrowRight");
  await sleep(500);
  const nextCaption = await page.evaluate(() => {
    const box = document.getElementById("lightbox");
    return box ? box.querySelector("figcaption").textContent.replace(/\s+/g, " ").trim() : null;
  });
  console.log("after ArrowRight:", nextCaption);

  await page.keyboard.press("Escape");
  await sleep(400);
  console.log("closed on Escape:", await page.evaluate(() => !document.getElementById("lightbox")));

  await browser.close();
})();
