import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CheckoutFlow } from "@/components/store/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — Proximatech Store (demo)",
  description:
    "Demo checkout flow for the Proximatech Solutions store. No real payment is taken.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Demo <span className="text-signal-light">checkout</span>
          </>
        }
        lede="Walk through the order flow end to end. This is a demonstration — no real payment will be taken."
        crumb="Store / Checkout"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-5">
          <CheckoutFlow />
        </div>
      </section>
    </>
  );
}
