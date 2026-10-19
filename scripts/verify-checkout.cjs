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

  const clickText = async (text) => {
    await page.evaluate((label) => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === label
      );
      if (button) button.click();
    }, text);
    await sleep(400);
  };

  await page.goto(BASE + "/store/rugged-mobile-scanner", { waitUntil: "networkidle0" });
  await sleep(1000);
  await page.evaluate(() => localStorage.removeItem("proximatech.cart.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1000);
  await clickText("Add to cart");
  await page.keyboard.press("Escape");
  await sleep(400);

  await page.goto(BASE + "/store/checkout", { waitUntil: "networkidle0" });
  await sleep(1200);

  await clickText("Continue");
  const contactErrors = await page.evaluate(() =>
    document.body.innerText.includes("First name is required.")
  );
  console.log("empty contact blocked:", contactErrors);

  const fill = async (name, value) => {
    const input = await page.$(`input[name="${name}"]`);
    if (input) await input.type(value);
  };

  await fill("firstName", "Rani");
  await fill("lastName", "Rubillos");
  await fill("email", "rani@example.com");
  await fill("phone", "+63 976 339 4297");
  await clickText("Continue");

  console.log("shipping step:", await page.evaluate(() => Boolean(document.querySelector('input[name="address"]'))));

  await fill("address", "12 Mabini Street");
  await fill("city", "Sta. Rosa");
  await fill("province", "Laguna");
  await fill("postalCode", "4026");
  await clickText("Continue");

  console.log("payment step:", await page.evaluate(() => Boolean(document.querySelector('input[name="cardNumber"]'))));

  await fill("cardName", "Rani Rubillos");
  await fill("cardNumber", "4111 1111 1111 1111");
  await fill("expiry", "13/28");
  await fill("cvc", "123");
  await clickText("Continue");
  console.log("bad expiry blocked:", await page.evaluate(() => document.body.innerText.includes("Use MM/YY")));

  const expiry = await page.$('input[name="expiry"]');
  if (expiry) {
    await expiry.click({ clickCount: 3 });
    await expiry.type("09/29");
  }
  await clickText("Continue");

  const review = await page.evaluate(() => ({
    masked: document.body.innerText.includes("•••• 1111"),
    onReview: Array.from(document.querySelectorAll("button")).some((b) => b.textContent.trim() === "Place demo order"),
  }));
  console.log("review:", JSON.stringify(review));

  await clickText("Place demo order");
  await sleep(1400);

  const confirmation = await page.evaluate(() => ({
    confirmed: document.body.innerText.includes("Order confirmed."),
    orderId: (document.body.innerText.match(/PX-[A-Z0-9]+/) || [null])[0],
    cartCleared: window.localStorage.getItem("proximatech.cart.v1"),
  }));
  console.log("confirmation:", JSON.stringify(confirmation));

  await browser.close();
})();
