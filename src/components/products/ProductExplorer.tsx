"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { filterProducts } from "@/lib/catalog";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "./ProductCard";

export function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(
    () => filterProducts(PRODUCTS, query, category),
    [query, category]
  );

  return (
    <div>
      <h2 className="sr-only">All products</h2>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip active={category === null} onClick={() => setCategory(null)}>
            All
          </Chip>
          {PRODUCT_CATEGORIES.map((item) => (
            <Chip
              key={item}
              active={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Chip>
          ))}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-white/12 bg-panel py-3 pl-11 pr-5 text-sm text-ink transition-colors placeholder:text-muted focus:border-signal focus:outline-none"
          />
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </label>
      </div>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
        {results.length} {results.length === 1 ? "product" : "products"}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-panel/50 px-6 py-16 text-center">
          <p className="font-display text-xl uppercase tracking-wide">
            No products match your search.
          </p>
          <p className="mt-2 text-sm text-secondary">
            Try a different keyword or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
            className="mt-6 min-h-11 rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-signal/60"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
