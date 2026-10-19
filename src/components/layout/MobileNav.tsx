"use client";

import Link from "next/link";
import { NAV } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="border-t border-white/10 bg-base/95 backdrop-blur-xl lg:hidden">
      <nav aria-label="Mobile" className="mx-auto flex max-w-container flex-col px-5 py-4">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`rounded-lg px-2 py-3 text-base font-semibold transition-colors ${
              pathname === item.href ? "text-signal" : "text-ink hover:text-signal"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-3">
          <Button href="/contact" className="w-full">
            Get a quote
          </Button>
        </div>
      </nav>
    </div>
  );
}
