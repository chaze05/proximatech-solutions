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
  await page.goto(BASE + "/contact", { waitUntil: "networkidle0" });
  await sleep(1200);

  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Send message"
    );
    if (button) button.click();
  });
  await sleep(400);
  console.log(
    "empty submit blocked:",
    await page.evaluate(() => document.body.innerText.includes("First name is required."))
  );

  const fill = async (name, value) => {
    const el = await page.$(`[name="${name}"]`);
    if (el) await el.type(value);
  };

  await fill("firstName", "Rani");
  await fill("lastName", "Rubillos");
  await fill("email", "rani@example.com");
  await fill("phone", "+63 976 339 4297");
  await fill("subject", "RFID inquiry");
  await fill("message", "We need RFID tracking for two warehouses in Laguna.");

  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Send message"
    );
    if (button) button.click();
  });
  await sleep(1400);

  console.log(
    "success shown:",
    await page.evaluate(() =>
      document.body.innerText.toUpperCase().includes("WE'LL BE IN TOUCH")
    )
  );

  await browser.close();
})();
