import test from "node:test";
import assert from "node:assert/strict";
import { filterProducts } from "../src/lib/catalog.ts";

const items = [
  {
    slug: "p1",
    name: "Rugged Mobile Scanner",
    brand: "Proxima",
    category: "Barcode & RFID",
    blurb: "Rugged scanners and mobile computers.",
    image: "/x1.avif",
  },
  {
    slug: "p2",
    name: "Enterprise Wi-Fi Access Point",
    brand: "Ubiquiti",
    category: "Networking",
    blurb: "Wi-Fi for offices.",
    image: "/x2.avif",
  },
  {
    slug: "p3",
    name: "Smart POS Terminal",
    brand: "Proxima",
    category: "Terminals",
    blurb: "Point of sale.",
    image: "/x3.avif",
  },
];

test("empty query and category returns everything", () => {
  assert.equal(filterProducts(items, "", null).length, 3);
});

test("query matches name and brand case-insensitively", () => {
  assert.equal(filterProducts(items, "wi-fi", null)[0].slug, "p2");
  assert.equal(filterProducts(items, "proxima", null).length, 2);
});

test("category filter narrows results", () => {
  assert.equal(filterProducts(items, "", "Terminals")[0].slug, "p3");
});

test("no match returns empty array", () => {
  assert.deepEqual(filterProducts(items, "zzz", null), []);
  assert.deepEqual(filterProducts(items, "", "Surveillance"), []);
});

test("query and category combine", () => {
  assert.equal(filterProducts(items, "proxima", "Terminals").length, 1);
});
