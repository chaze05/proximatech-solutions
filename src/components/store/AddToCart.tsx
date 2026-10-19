"use client";

import { useState } from "react";
import type { StoreProduct } from "@/data/store";
import { useCart } from "./CartProvider";

export function AddToCart({ product }: { product: StoreProduct }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock === "out";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-white/15">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((current) => Math.max(1, current - 1))}
          disabled={soldOut}
          className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-signal-light disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center text-sm" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((current) => current + 1)}
          disabled={soldOut}
          className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-signal-light disabled:opacity-40"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => add(product.slug, qty)}
        disabled={soldOut}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover disabled:pointer-events-none disabled:opacity-50"
      >
        {soldOut ? "Out of stock" : "Add to cart"}
      </button>
    </div>
  );
}
