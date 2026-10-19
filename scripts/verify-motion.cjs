const puppeteer = require("puppeteer-core");

const BASE = "http://localhost:3000";
const OUT = "C:/rani/proximatech-solutions/qa";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 140)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 140));
  });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(1200);

  const counter = () =>
    page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("span")).find((s) =>
        /^\d{2} \/ \d{2}$/.test(s.textContent.trim())
      );
      return el ? el.textContent.trim() : null;
    });

  const c1 = await counter();
  await sleep(3400);
  const c2 = await counter();
  console.log("autoplay:", c1, "->", c2, "| advanced:", c1 !== c2);

  // Pause on hover
  await page.mouse.move(720, 450);
  await sleep(500);
  const h1 = await counter();
  await sleep(3400);
  const h2 = await counter();
  console.log("hover pause:", h1, "->", h2, "| paused:", h1 === h2);

  // Arrows
  await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Next slide"]');
    if (b) b.click();
  });
  await sleep(800);
  const afterNext = await counter();
  await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Previous slide"]');
    if (b) b.click();
  });
  await sleep(800);
  const afterPrev = await counter();
  console.log("next ->", afterNext, "| prev ->", afterPrev);

  // Drag / swipe
  const beforeDrag = await counter();
  await page.mouse.move(900, 500);
  await page.mouse.down();
  await page.mouse.move(700, 500, { steps: 6 });
  await page.mouse.up();
  await sleep(800);
  const afterDrag = await counter();
  console.log("drag:", beforeDrag, "->", afterDrag, "| changed:", beforeDrag !== afterDrag);

  // Cursor: follows + grows over a link
  await page.mouse.move(500, 400);
  await sleep(700);
  const cursor = await page.evaluate(() => {
    const ring = document.querySelector(".cursor-ring");
    const dot = document.querySelector(".cursor-dot");
    const wrap = ring ? ring.parentElement : null;
    return {
      exists: Boolean(ring && dot),
      transform: wrap ? wrap.style.transform : null,
      opacity: wrap ? wrap.style.opacity : null,
    };
  });
  console.log("cursor follows:", JSON.stringify(cursor));

  const linkBox = await page.evaluate(() => {
    const a = document.querySelector('header a[href="/products"]');
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  let grown = false;
  if (linkBox) {
    await page.mouse.move(linkBox.x, linkBox.y);
    await sleep(500);
    grown = await page.evaluate(() => {
      const ring = document.querySelector(".cursor-ring");
      return Boolean(ring && ring.parentElement.classList.contains("cursor-ring--active"));
    });
  }
  console.log("cursor grows on link:", grown);

  await page.screenshot({ path: OUT + "/hero-motion.jpg" });

  // Reduced motion: no autoplay, no cursor
  const reducePage = await browser.newPage();
  await reducePage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await reducePage.setViewport({ width: 1440, height: 900 });
  await reducePage.goto(BASE + "/", { waitUntil: "networkidle0" });
  await sleep(1200);
  const rCounter = () =>
    reducePage.evaluate(() => {
      const el = Array.from(document.querySelectorAll("span")).find((s) =>
        /^\d{2} \/ \d{2}$/.test(s.textContent.trim())
      );
      return el ? el.textContent.trim() : null;
    });
  const r1 = await rCounter();
  await sleep(3400);
  const r2 = await rCounter();
  const reduceState = await reducePage.evaluate(() => ({
    cursorRendered: Boolean(document.querySelector(".cursor-ring")),
    wordsVisible: Array.from(document.querySelectorAll(".hero-word")).every(
      (w) => getComputedStyle(w).opacity === "1"
    ),
  }));
  console.log("reduced motion:", JSON.stringify({ r1, r2, autoplayOff: r1 === r2, ...reduceState }));

  console.log("console errors:", errors.length);
  errors.slice(0, 6).forEach((e) => console.log(" -", e));
  await browser.close();
})();
