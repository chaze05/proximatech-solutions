import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/data/store";
import { formatPeso } from "@/lib/format";

const stockLabel: Record<StoreProduct["stock"], string> = {
  in: "In stock",
  low: "Low stock",
  out: "Out of stock",
};

const stockClass: Record<StoreProduct["stock"], string> = {
  in: "text-success",
  low: "text-warning",
  out: "text-muted",
};

export function StoreCard({ product }: { product: StoreProduct }) {
  return (
    <Link
      href={`/store/${product.slug}`}
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
        <span
          className={`absolute right-4 top-4 rounded-full border border-white/10 bg-night/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur ${stockClass[product.stock]}`}
        >
          {stockLabel[product.stock]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          {product.brand} · {product.category}
        </span>
        <h3 className="mt-2 font-display text-lg uppercase leading-snug tracking-wide">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-secondary">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-display text-xl text-ink">
            {formatPeso(product.price)}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            View product
          </span>
        </div>
      </div>
    </Link>
  );
}
