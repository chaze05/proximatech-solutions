export type ProductCategory =
  | "Barcode & RFID"
  | "Surveillance"
  | "Mobility"
  | "Terminals"
  | "Networking"
  | "Accessories";

export type CatalogProduct = {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  blurb: string;
  image: string;
  storeSlug?: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Barcode & RFID",
  "Surveillance",
  "Mobility",
  "Terminals",
  "Networking",
  "Accessories",
];

export const PRODUCTS: CatalogProduct[] = [
  {
    slug: "rugged-mobile-scanner",
    name: "Rugged Mobile Scanner",
    brand: "Proxima",
    category: "Barcode & RFID",
    blurb:
      "Rugged scanners, printers and mobile computers built for frontline speed and accuracy.",
    image: "/images/products/product-1.avif",
    storeSlug: "rugged-mobile-scanner",
  },
  {
    slug: "aiot-surveillance-kit",
    name: "AIoT Surveillance Kit",
    brand: "Proxima",
    category: "Surveillance",
    blurb:
      "Intelligent AIoT surveillance for clarity, reliability and peace of mind.",
    image: "/images/products/product-2.avif",
  },
  {
    slug: "rugged-handheld",
    name: "Rugged Handheld",
    brand: "Proxima",
    category: "Mobility",
    blurb: "Smart mobility, built tough for field teams.",
    image: "/images/products/product-3.avif",
  },
  {
    slug: "acer-commercial-laptop",
    name: "Acer Commercial Laptop",
    brand: "Acer",
    category: "Terminals",
    blurb: "Business-grade Acer devices that power your world.",
    image: "/images/products/product-4.avif",
  },
  {
    slug: "smart-pos-terminal",
    name: "Smart POS Terminal",
    brand: "Proxima",
    category: "Terminals",
    blurb: "Smart terminals for smarter industries.",
    image: "/images/products/product-5.avif",
    storeSlug: "smart-pos-terminal",
  },
  {
    slug: "industrial-label-printer",
    name: "Industrial Label Printer",
    brand: "Proxima",
    category: "Accessories",
    blurb: "Precision meets sustainability on every label.",
    image: "/images/products/product-6.avif",
    storeSlug: "industrial-label-printer",
  },
  {
    slug: "acer-all-in-one",
    name: "Acer All-in-One",
    brand: "Acer",
    category: "Terminals",
    blurb: "Smarter technology for all your workspaces.",
    image: "/images/products/product-7.avif",
  },
  {
    slug: "enterprise-wifi-ap",
    name: "Enterprise Wi-Fi Access Point",
    brand: "Ubiquiti",
    category: "Networking",
    blurb: "Enterprise Wi-Fi, simplified for growing teams.",
    image: "/images/products/product-8.avif",
    storeSlug: "enterprise-wifi-ap",
  },
  {
    slug: "hybrid-work-device",
    name: "Hybrid Work Device",
    brand: "Acer",
    category: "Terminals",
    blurb: "Reinventing how you work and play.",
    image: "/images/products/product-9.avif",
  },
  {
    slug: "workplace-safety-sensor",
    name: "Workplace Safety Sensor",
    brand: "Proxima",
    category: "Surveillance",
    blurb: "Smart solutions for safer workplaces.",
    image: "/images/products/product-14.avif",
  },
  {
    slug: "biometric-access-terminal",
    name: "Biometric Access Terminal",
    brand: "HID",
    category: "Terminals",
    blurb: "Biometrics that protect and connect your people.",
    image: "/images/products/product-11.avif",
    storeSlug: "biometric-access-terminal",
  },
  {
    slug: "high-performance-router",
    name: "High-Performance Router",
    brand: "Ubiquiti",
    category: "Networking",
    blurb: "Performance-driven connectivity for every site.",
    image: "/images/products/product-15.avif",
  },
  {
    slug: "smart-security-camera",
    name: "Smart Security Camera",
    brand: "Proxima",
    category: "Surveillance",
    blurb: "Smart security made simple.",
    image: "/images/products/product-13.avif",
  },
  {
    slug: "industrial-computing-module",
    name: "Industrial Computing Module",
    brand: "Proxima",
    category: "Terminals",
    blurb: "Innovation that powers industries.",
    image: "/images/products/product-18.avif",
  },
  {
    slug: "industrial-labels-tape",
    name: "Industrial Labels & Tape",
    brand: "Proxima",
    category: "Accessories",
    blurb: "Labels and tapes built to last.",
    image: "/images/products/product-16.avif",
    storeSlug: "industrial-labels-tape",
  },
  {
    slug: "structured-cabling-kit",
    name: "Structured Cabling Kit",
    brand: "Proxima",
    category: "Networking",
    blurb: "Connecting the world, one network at a time.",
    image: "/images/products/product-17.avif",
  },
];
