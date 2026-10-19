import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { PRODUCTS } from "../src/data/products.ts";
import { STORE_PRODUCTS } from "../src/data/store.ts";
import { SERVICES } from "../src/data/services.ts";
import { VALUE_CARDS } from "../src/data/values.ts";
import { TESTIMONIALS } from "../src/data/testimonials.ts";
import { EVENTS } from "../src/data/events.ts";
import { GALLERY } from "../src/data/gallery.ts";
import { SITE } from "../src/data/site.ts";
import { NAV } from "../src/data/navigation.ts";

test("catalog has 16 products with unique slugs", () => {
  assert.equal(PRODUCTS.length, 16);
  assert.equal(new Set(PRODUCTS.map((p) => p.slug)).size, 16);
});

test("store has 6 priced items and valid store links", () => {
  assert.equal(STORE_PRODUCTS.length, 6);
  const slugs = new Set(STORE_PRODUCTS.map((p) => p.slug));
  for (const p of PRODUCTS) {
    if (p.storeSlug) {
      assert.ok(slugs.has(p.storeSlug), "unknown storeSlug: " + p.storeSlug);
    }
  }
  for (const p of STORE_PRODUCTS) {
    assert.ok(
      Number.isInteger(p.price) && p.price >= 1500 && p.price <= 25000,
      p.slug + " price out of range"
    );
    assert.ok(p.specs.length >= 3, p.slug + " needs specs");
  }
});

test("sections have expected counts", () => {
  assert.equal(SERVICES.length, 8);
  assert.equal(VALUE_CARDS.length, 6);
  assert.equal(TESTIMONIALS.length, 3);
  assert.equal(EVENTS.length, 1);
});

test("all referenced images exist on disk", () => {
  const srcs = [
    "/images/logo.png",
    ...PRODUCTS.map((p) => p.image),
    ...STORE_PRODUCTS.map((p) => p.image),
    ...SERVICES.map((s) => s.image),
    ...GALLERY.map((g) => g.src),
    ...EVENTS.map((e) => e.image),
  ];
  for (const src of srcs) {
    assert.ok(src.startsWith("/images/"), src);
    assert.ok(existsSync("public" + src), "missing file: " + src);
  }
});

test("nav and site basics", () => {
  assert.equal(NAV.length, 7);
  assert.ok(SITE.phones.length >= 1);
  assert.match(SITE.email, /@/);
  assert.ok(SITE.address.length > 10);
});
