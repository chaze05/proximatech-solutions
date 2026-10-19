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
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 120)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 120));
  });

  /* 320px cart drawer */
  await page.setViewport({ width: 320, height: 844 });
  await page.goto(BASE + "/store/biometric-access-terminal", { waitUntil: "networkidle0" });
  await sleep(900);
  await page.evaluate(() => localStorage.removeItem("proximatech.cart.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(900);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((x) => x.textContent.trim() === "Add to cart");
    if (b) b.click();
  });
  await sleep(1100);

  const drawer = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Shopping cart"]');
    if (!dialog) return null;
    const buttons = Array.from(dialog.querySelectorAll("button"));
    const minus = buttons.find((b) => b.getAttribute("aria-label") && b.getAttribute("aria-label").startsWith("Decrease"));
    const plus = buttons.find((b) => b.getAttribute("aria-label") && b.getAttribute("aria-label").startsWith("Increase"));
    const size = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      minus: size(minus),
      plus: size(plus),
      dialogOverflow: dialog.scrollWidth - dialog.clientWidth,
    };
  });
  const docOverflow = await page.evaluate(
    () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth
  );
  console.log("drawer @320:", JSON.stringify(drawer), "| doc overflow:", docOverflow);

  /* dead footer links */
  const dead = await page.evaluate(() => document.querySelectorAll('footer a[href="#"]').length);
  console.log("dead footer links:", dead);

  /* expired card blocked at checkout */
  await page.setViewport({ width: 1440, height: 900 });
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
  await fill("expiry", "09/20");
  await fill("cvc", "123");
  await clickText("Continue");
  console.log(
    "expired card blocked:",
    await page.evaluate(() => document.body.innerText.includes("Card has expired."))
  );

  console.log("console errors:", errors.length);
  errors.slice(0, 5).forEach((e) => console.log(" -", e));
  await browser.close();
})();
