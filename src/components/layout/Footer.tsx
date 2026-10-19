import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/#story" },
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Store", href: "/store" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "Get a quote", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#06070B]">
      <div className="mx-auto w-full max-w-container px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt="Proximatech Solutions"
              width={168}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-secondary">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-3">
              {(["facebook", "linkedin", "youtube"] as const).map((network) => (
                <a
                  key={network}
                  href={SITE.socials[network]}
                  aria-label={network}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[10px] font-bold uppercase tracking-wider text-secondary transition-colors hover:border-signal/60 hover:text-ink"
                >
                  {network.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-secondary">
              {SITE.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-ink"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="max-w-[28ch] leading-relaxed">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.24em]">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
