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

  // 1. Cart subtotal text on product page drawer
  await page.goto(BASE + "/store/rugged-mobile-scanner", { waitUntil: "networkidle0" });
  await sleep(900);
  await page.evaluate(() => localStorage.removeItem("proximatech.cart.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(900);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((x) => x.textContent.trim() === "Add to cart");
    if (b) b.click();
  });
  await sleep(1200);
  const cartText = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-label="Shopping cart"]');
    return d ? d.textContent : "";
  });
  console.log("cart has 18,900:", cartText.includes("18,900"), "| has Subtotal:", cartText.includes("Subtotal"));

  // 2. Products empty state (case-insensitive)
  await page.goto(BASE + "/products", { waitUntil: "networkidle0" });
  await sleep(900);
  const input = await page.$("input");
  if (input) {
    await input.click();
    await input.type("zzzz");
  }
  await sleep(600);
  const empty = await page.evaluate(() => document.body.innerText.toUpperCase().includes("NO PRODUCTS MATCH"));
  console.log("products empty state:", empty);

  // 3. Checkout masked card (bullet char via \u2022)
  await page.goto(BASE + "/store/checkout", { waitUntil: "networkidle0" });
  await sleep(900);
  const fill = async (name, value) => {
    const el = await page.$(`[name="${name}"]`);
    if (el) await el.type(value);
  };
  const clickText = async (label) => {
    await page.evaluate((t) => {
      const b = Array.from(document.querySelectorAll("button")).find((x) => x.textContent.trim() === t);
      if (b) b.click();
    }, label);
    await sleep(350);
  };

  await fill("firstName", "Rani");
  await fill("lastName", "Rubillos");
  await fill("email", "rani@example.com");
  await fill("phone", "+63 976 339 4297");
  await clickText("Continue");
  await fill("address", "12 Mabini Street");
  await fill("city", "Sta. Rosa");
  await fill("province", "Laguna");
  await fill("postalCode", "4026");
  await clickText("Continue");
  await fill("cardName", "Rani Rubillos");
  await fill("cardNumber", "4111 1111 1111 1111");
  await fill("expiry", "09/29");
  await fill("cvc", "123");
  await clickText("Continue");

  const review = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasLast4: text.includes("1111"),
      hasBullets: /\u2022{4}/.test(text),
    };
  });
  console.log("review masked:", JSON.stringify(review));

  await browser.close();
})();
