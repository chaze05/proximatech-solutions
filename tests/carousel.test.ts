import test from "node:test";
import assert from "node:assert/strict";
import { nextIndex, slideCounter } from "../src/lib/carousel.ts";

test("nextIndex wraps forward and backward", () => {
  assert.equal(nextIndex(0, 3, 1), 1);
  assert.equal(nextIndex(2, 3, 1), 0);
  assert.equal(nextIndex(0, 3, -1), 2);
  assert.equal(nextIndex(1, 3, -1), 0);
});

test("nextIndex handles single-slide sets", () => {
  assert.equal(nextIndex(0, 1, 1), 0);
  assert.equal(nextIndex(0, 1, -1), 0);
});

test("slideCounter formats padded counters", () => {
  assert.equal(slideCounter(0, 3), "01 / 03");
  assert.equal(slideCounter(2, 12), "03 / 12");
});
