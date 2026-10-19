import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoreProduct, STORE_PRODUCTS } from "@/data/store";
import { formatPeso } from "@/lib/format";
import { StoreCard } from "@/components/store/StoreCard";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORE_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) return { title: "Product not found — Proximatech Solutions" };

  return {
    title: `${product.name} — Proximatech Store`,
    description: product.description,
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) notFound();

  const related = STORE_PRODUCTS.filter(
    (item) => item.category === product.category && item.slug !== product.slug
  ).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden="true" className="circuit-bg absolute inset-0" />
        <div className="relative mx-auto w-full max-w-container px-5 pb-16 pt-24 sm:pt-28">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-muted">
            <Link href="/store" className="transition-colors hover:text-ink">
              Store
            </Link>
            <span aria-hidden="true" className="mx-2 text-white/20">
              /
            </span>
            <span className="text-secondary">{product.category}</span>
          </nav>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-elevated">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-contain p-12"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                {product.brand}
              </span>
              <h1 className="mt-2 font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 font-display text-2xl text-signal">
                {formatPeso(product.price)}
              </p>
              <p className="mt-5 leading-relaxed text-secondary">
                {product.description}
              </p>

              <dl className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-panel/50 p-5 text-sm">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-signal"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-secondary">{spec}</span>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-signal/60"
                >
                  Ask about this product
                </Link>
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted">
                Demo store — no real payment will be taken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-20">
          <div className="mx-auto w-full max-w-container px-5">
            <h2 className="font-display text-2xl uppercase tracking-wide">
              Related products
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StoreCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
