import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featured = PRODUCTS.slice(0, 4);

export function ProductsPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-container px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Hardware"
              title={
                <>
                  Hardware that <span className="text-signal-light">performs</span>
                </>
              }
              lede="Enterprise-grade scanners, terminals, networking and surveillance from brands you already trust."
            />
          </Reveal>
          <Reveal delay={100}>
            <Button href="/products" variant="ghost">
              All products
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.slug} delay={index * 80}>
              <Link
                href={product.storeSlug ? `/store/${product.storeSlug}` : "/products"}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition-colors duration-300 hover:border-signal/40"
              >
                <div className="relative aspect-square overflow-hidden bg-elevated">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    {product.brand}
                  </span>
                  <h3 className="mt-2 font-display text-base uppercase leading-snug tracking-wide">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-secondary">
                    {product.blurb}
                  </p>
                  <span className="mt-auto pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-signal-light">
                    {product.storeSlug ? "Shop now" : "Request quote"}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
