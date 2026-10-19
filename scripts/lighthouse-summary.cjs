const fs = require("fs");

for (const file of ["qa/lh-home.json", "qa/lh-store.json"]) {
  if (!fs.existsSync(file)) {
    console.log(file, "missing");
    continue;
  }
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  const scores = {};
  for (const [key, category] of Object.entries(report.categories)) {
    scores[key] = Math.round((category.score ?? 0) * 100);
  }
  console.log(file, JSON.stringify(scores));
  console.log(
    "  LCP:",
    report.audits["largest-contentful-paint"]?.displayValue,
    "| TBT:",
    report.audits["total-blocking-time"]?.displayValue,
    "| CLS:",
    report.audits["cumulative-layout-shift"]?.displayValue
  );
}
