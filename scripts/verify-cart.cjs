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

  await page.goto(BASE + "/store/rugged-mobile-scanner", { waitUntil: "networkidle0" });
  await sleep(1200);
  await page.evaluate(() => localStorage.removeItem("proximatech.cart.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1000);

  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Add to cart"
    );
    if (button) button.click();
  });
  await sleep(900);

  const afterAdd = await page.evaluate(() => ({
    stored: window.localStorage.getItem("proximatech.cart.v1"),
    drawerOpen: Boolean(document.querySelector('[role="dialog"][aria-label="Shopping cart"]')),
    badge: (document.querySelector('button[aria-label^="Open cart"]') || {}).textContent,
  }));
  console.log("after add:", JSON.stringify(afterAdd));

  await page.keyboard.press("Escape");
  await sleep(400);
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1200);
  const persisted = await page.evaluate(() => ({
    stored: window.localStorage.getItem("proximatech.cart.v1"),
    badge: (document.querySelector('button[aria-label^="Open cart"]') || {}).textContent,
  }));
  console.log("after reload:", JSON.stringify(persisted));

  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label^="Open cart"]');
    if (button) button.click();
  });
  await sleep(800);

  const inDrawer = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Shopping cart"]');
    return {
      hasItem: dialog ? dialog.textContent.includes("Rugged Mobile Scanner") : false,
      subtotal: dialog ? (dialog.textContent.match(/\u20B1[\d,]+/) || [null])[0] : null,
    };
  });
  console.log("drawer:", JSON.stringify(inDrawer));

  await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Shopping cart"]');
    const button = dialog
      ? Array.from(dialog.querySelectorAll("button")).find((b) => b.textContent.trim() === "Remove")
      : null;
    if (button) button.click();
  });
  await sleep(600);

  const afterRemove = await page.evaluate(() => ({
    stored: window.localStorage.getItem("proximatech.cart.v1"),
    empty: document.body.innerText.toUpperCase().includes("YOUR CART IS EMPTY."),
  }));
  console.log("after remove:", JSON.stringify(afterRemove));

  await browser.close();
})();

