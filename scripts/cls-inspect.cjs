const fs = require("fs");

const r = JSON.parse(fs.readFileSync("qa/lh-home.json", "utf8"));
const audit = r.audits["layout-shift-elements"];
console.log("CLS:", r.audits["cumulative-layout-shift"].displayValue);
if (audit && audit.details && audit.details.items) {
  audit.details.items.slice(0, 6).forEach((item) => {
    console.log("- score", item.score, "|", (item.node && item.node.snippet) || JSON.stringify(item).slice(0, 160));
  });
} else {
  console.log("no layout shift elements listed");
}
