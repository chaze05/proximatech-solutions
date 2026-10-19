const fs = require("fs");

for (const file of ["qa/lh-home.json", "qa/lh-store.json"]) {
  const r = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log("\n==", file, "==");

  const lcpEl = r.audits["largest-contentful-paint-element"];
  if (lcpEl && lcpEl.details && lcpEl.details.items && lcpEl.details.items[0]) {
    const node = lcpEl.details.items[0].node;
    console.log("LCP element:", node ? node.snippet : "n/a");
  }

  const a11yIds = new Set(r.categories.accessibility.auditRefs.map((a) => a.id));
  for (const audit of Object.values(r.audits)) {
    if (a11yIds.has(audit.id) && audit.score !== null && audit.score < 1) {
      console.log("a11y fail:", audit.id, "-", audit.title);
      const items = audit.details && audit.details.items ? audit.details.items : [];
      items.slice(0, 3).forEach((item) => {
        const snip = item.node ? item.node.snippet : JSON.stringify(item).slice(0, 140);
        console.log("   ", snip);
      });
    }
  }

  const perfIds = new Set(r.categories.performance.auditRefs.map((a) => a.id));
  for (const audit of Object.values(r.audits)) {
    if (perfIds.has(audit.id) && audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "notApplicable") {
      console.log("perf opportunity:", audit.id, "-", audit.title, "|", audit.displayValue || "");
    }
  }
}
