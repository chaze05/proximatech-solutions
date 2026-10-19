"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
};

const navButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night/70 text-ink backdrop-blur transition-colors hover:border-signal/60";

export function Lightbox({ images, index, onClose, onNav }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  const go = useCallback(
    (direction: number) => {
      onNav((index + direction + images.length) % images.length);
    },
    [index, images.length, onNav]
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Tab") {
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>("#lightbox button")
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [go, onClose]);

  if (!image) return null;

  return (
    <div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-night/95 p-4 backdrop-blur"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className={`${navButton} absolute right-5 top-5`}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous image"
        className={`${navButton} absolute left-4 top-1/2 -translate-y-1/2`}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      <figure className="flex w-full max-w-5xl flex-col items-center">
        <div className="relative h-[72vh] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-secondary">
          <span>{image.category}</span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span>
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next image"
        className={`${navButton} absolute right-4 top-1/2 -translate-y-1/2`}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
