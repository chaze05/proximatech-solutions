import test from "node:test";
import assert from "node:assert/strict";
import { formatPeso, formatCountdown } from "../src/lib/format.ts";

test("formatPeso formats PHP amounts without decimals", () => {
  assert.equal(formatPeso(1499), "₱1,499");
  assert.equal(formatPeso(25000), "₱25,000");
  assert.equal(formatPeso(0), "₱0");
});

test("formatCountdown formats days and trims leading zero units", () => {
  const d245 = 245 * 86400000 + 12 * 3600000 + 6 * 60000 + 22000;
  assert.equal(formatCountdown(d245), "245d 12h 06m 22s");
  assert.equal(formatCountdown(5 * 3600000 + 60000), "05h 01m 00s");
  assert.equal(formatCountdown(65000), "01m 05s");
  assert.equal(formatCountdown(0), "Started");
  assert.equal(formatCountdown(-5000), "Started");
});
