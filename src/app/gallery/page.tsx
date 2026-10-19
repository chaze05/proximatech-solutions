import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Proximatech Solutions",
  description:
    "Inside Proximatech Solutions — our team, our vision and the events we support.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Inside <span className="text-signal-light">Proximatech</span>
          </>
        }
        lede="The people, the work and the events behind the systems — moments from inside our team."
        crumb="Gallery"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-5">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
