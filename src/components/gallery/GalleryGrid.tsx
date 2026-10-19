"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GALLERY, type GalleryCategory } from "@/data/gallery";
import { Chip } from "@/components/ui/Chip";
import { Lightbox } from "./Lightbox";

const categories: Array<"All" | GalleryCategory> = [
  "All",
  "Team",
  "Vision",
  "Events",
];

export function GalleryGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      active === "All"
        ? GALLERY
        : GALLERY.filter((image) => image.category === active),
    [active]
  );

  useEffect(() => {
    setIndex(null);
  }, [active]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Chip
            key={category}
            active={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </Chip>
        ))}
      </div>

      {images.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-panel/50 px-6 py-16 text-center">
          <p className="font-display text-xl uppercase tracking-wide">
            No photos in this category yet.
          </p>
          <p className="mt-2 text-sm text-secondary">
            Check back soon — we&apos;re always adding new moments.
          </p>
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, imageIndex) => (
            <button
              key={image.src + imageIndex}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 text-left"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 92vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {image.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {index !== null ? (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setIndex(null)}
          onNav={(next) => setIndex(next)}
        />
      ) : null}
    </>
  );
}
