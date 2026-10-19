import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/data/products";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const href = product.storeSlug ? `/store/${product.storeSlug}` : "/contact";

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition duration-300 hover:-translate-y-1 hover:border-signal/40"
    >
      <div className="relative aspect-square overflow-hidden bg-elevated">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 92vw"
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-night/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          {product.brand}
        </span>
        <h3 className="mt-2 font-display text-lg uppercase leading-snug tracking-wide">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          {product.blurb}
        </p>
        <span className="mt-auto pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-signal-light">
          {product.storeSlug ? "Shop now" : "Request a quote"}
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
