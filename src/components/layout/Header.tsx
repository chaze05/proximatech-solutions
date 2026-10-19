"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = NAV.filter((item) => item.href !== "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-base/90 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]"
          : "border-white/5 bg-base/60"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-container items-center justify-between gap-4 px-5 transition-all duration-300 ${
          scrolled ? "min-h-[64px]" : "min-h-[76px]"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="Proximatech Solutions home">
          <Image
            src="/images/logo.png"
            alt="Proximatech Solutions"
            width={168}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[13px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-signal after:scale-x-100"
                  : "text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/store"
            aria-label="Store"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-secondary transition-colors duration-200 hover:border-signal/60 hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 7h12l1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H6.6a1.8 1.8 0 0 1-1.8-1.8L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
          </Link>

          <div className="hidden sm:block">
            <Button href="/contact" className="!px-5 !py-2.5">
              Get a quote
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/12 text-ink lg:hidden"
          >
            <span
              className={`h-px w-4 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-4 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-4 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div id="mobile-nav">
        <MobileNav open={open} onClose={() => setOpen(false)} pathname={pathname} />
      </div>
    </header>
  );
}
