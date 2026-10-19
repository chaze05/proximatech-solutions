import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductExplorer } from "@/components/products/ProductExplorer";

export const metadata: Metadata = {
  title: "Products — Proximatech Solutions",
  description:
    "Enterprise barcode, RFID, surveillance, mobility and networking hardware from Proximatech Solutions.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Hardware that <span className="text-signal">performs</span>
          </>
        }
        lede="Enterprise-grade scanners, terminals, networking and surveillance from brands you already trust — deployed, configured and supported by our team."
        crumb="Products"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-5">
          <ProductExplorer />
        </div>
      </section>
    </>
  );
}
