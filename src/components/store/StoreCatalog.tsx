"use client";

import { useMemo, useState } from "react";
import { STORE_PRODUCTS } from "@/data/store";
import { Chip } from "@/components/ui/Chip";
import { StoreCard } from "./StoreCard";

export function StoreCatalog() {
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(STORE_PRODUCTS.map((product) => product.category))),
    []
  );

  const products = useMemo(
    () =>
      category
        ? STORE_PRODUCTS.filter((product) => product.category === category)
        : STORE_PRODUCTS,
    [category]
  );

  return (
    <div>
      <h2 className="sr-only">Store products</h2>
      <div className="flex flex-wrap gap-2">
        <Chip active={category === null} onClick={() => setCategory(null)}>
          All
        </Chip>
        {categories.map((item) => (
          <Chip
            key={item}
            active={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </Chip>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StoreCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-panel/50 px-6 py-16 text-center">
          <p className="font-display text-xl uppercase tracking-wide">
            Nothing in this category yet.
          </p>
          <button
            type="button"
            onClick={() => setCategory(null)}
            className="mt-6 min-h-11 rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-signal/60"
          >
            Show all products
          </button>
        </div>
      )}
    </div>
  );
}
