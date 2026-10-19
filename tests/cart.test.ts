import test from "node:test";
import assert from "node:assert/strict";
import {
  parseStoredCart,
  addToCart,
  setQty,
  removeFromCart,
  cartCount,
  cartSubtotal,
} from "../src/lib/cart.ts";

const products = [
  { slug: "a", price: 1000 },
  { slug: "b", price: 2500 },
];
const valid = products.map((p) => p.slug);

test("parseStoredCart tolerates invalid input", () => {
  assert.deepEqual(parseStoredCart(null, valid), []);
  assert.deepEqual(parseStoredCart("not json", valid), []);
  assert.deepEqual(parseStoredCart('[{"slug":"ghost","qty":1}]', valid), []);
  assert.deepEqual(parseStoredCart('[{"slug":"a","qty":0}]', valid), []);
  assert.deepEqual(parseStoredCart('[{"slug":"a","qty":2}]', valid), [
    { slug: "a", qty: 2 },
  ]);
});

test("parseStoredCart merges duplicates and clamps quantity", () => {
  assert.deepEqual(
    parseStoredCart('[{"slug":"a","qty":2},{"slug":"a","qty":3}]', valid),
    [{ slug: "a", qty: 5 }]
  );
  assert.deepEqual(parseStoredCart('[{"slug":"b","qty":1.7}]', valid), [
    { slug: "b", qty: 1 },
  ]);
  assert.deepEqual(parseStoredCart('[{"slug":"b","qty":-4}]', valid), []);
});

test("addToCart adds new lines and increments existing", () => {
  assert.deepEqual(addToCart([], "a"), [{ slug: "a", qty: 1 }]);
  assert.deepEqual(addToCart([{ slug: "a", qty: 1 }], "a", 2), [
    { slug: "a", qty: 3 },
  ]);
});

test("setQty updates or removes", () => {
  assert.deepEqual(setQty([{ slug: "a", qty: 1 }], "a", 4), [
    { slug: "a", qty: 4 },
  ]);
  assert.deepEqual(setQty([{ slug: "a", qty: 1 }], "a", 0), []);
});

test("removeFromCart removes a line", () => {
  assert.deepEqual(
    removeFromCart(
      [
        { slug: "a", qty: 1 },
        { slug: "b", qty: 1 },
      ],
      "a"
    ),
    [{ slug: "b", qty: 1 }]
  );
});

test("cartCount and cartSubtotal", () => {
  const lines = [
    { slug: "a", qty: 2 },
    { slug: "b", qty: 3 },
  ];
  assert.equal(cartCount(lines), 5);
  assert.equal(cartSubtotal(lines, products), 2 * 1000 + 3 * 2500);
  assert.equal(cartSubtotal([{ slug: "ghost", qty: 4 }], products), 0);
});
