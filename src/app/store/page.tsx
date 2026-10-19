import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { StoreCatalog } from "@/components/store/StoreCatalog";

export const metadata: Metadata = {
  title: "Store — Proximatech Solutions",
  description:
    "Browse enterprise hardware from Proximatech Solutions. Demo checkout — prices are illustrative and no real payment is taken.",
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store"
        title={
          <>
            Proximatech <span className="text-signal-light">Store</span>
          </>
        }
        lede="Order-ready hardware from our catalog. This is a working demo store — prices are illustrative and checkout is simulated."
        crumb="Store"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-5">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-warning/25 bg-warning/5 px-5 py-4">
            <p className="text-xs text-warning">
              Demo store — no real payment will be taken. Prices in PHP and for
              demonstration only.
            </p>
            <Link
              href="/contact"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary transition-colors hover:text-ink"
            >
              Need a custom quote? →
            </Link>
          </div>

          <StoreCatalog />
        </div>
      </section>
    </>
  );
}
