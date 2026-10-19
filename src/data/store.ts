export type StoreStock = "in" | "low" | "out";

export type StoreProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
  stock: StoreStock;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "rugged-mobile-scanner",
    name: "Rugged Mobile Scanner",
    brand: "Proxima",
    category: "Barcode & RFID",
    price: 18900,
    image: "/images/products/product-1.avif",
    description:
      "A frontline workhorse: rugged 2D scanning, all-day battery and enterprise Wi-Fi in a pocketable frame built for warehouses and field crews.",
    specs: [
      "Android 13 · 5.5-inch touch display",
      "2D imager with IP67 rating",
      "Hot-swappable 5,200 mAh battery",
      "Wi-Fi 6E + 5G connectivity",
    ],
    stock: "in",
  },
  {
    slug: "smart-pos-terminal",
    name: "Smart POS Terminal",
    brand: "Proxima",
    category: "Terminals",
    price: 15990,
    image: "/images/products/product-5.avif",
    description:
      "A compact point-of-sale terminal for retail and hospitality — integrated payments, receipt printing and inventory sync out of the box.",
    specs: [
      "15-inch capacitive touchscreen",
      "Built-in 80mm thermal printer",
      "Dual-core processor · 4GB RAM",
      "USB-C, LAN and Wi-Fi connectivity",
    ],
    stock: "in",
  },
  {
    slug: "industrial-label-printer",
    name: "Industrial Label Printer",
    brand: "Proxima",
    category: "Accessories",
    price: 12500,
    image: "/images/products/product-6.avif",
    description:
      "High-volume thermal label printing with precise registration — built for barcode-heavy operations that cannot afford a misprint.",
    specs: [
      "300 dpi thermal transfer",
      "Up to 150mm/s print speed",
      "USB, Ethernet and Bluetooth",
      "Ribbon and media auto-calibration",
    ],
    stock: "low",
  },
  {
    slug: "enterprise-wifi-ap",
    name: "Enterprise Wi-Fi Access Point",
    brand: "Ubiquiti",
    category: "Networking",
    price: 8750,
    image: "/images/products/product-8.avif",
    description:
      "Ceiling-mount enterprise Wi-Fi with centralised management — clean coverage for offices, warehouses and multi-branch deployments.",
    specs: [
      "Wi-Fi 6 · dual-band 4x4 MIMO",
      "PoE-powered, ceiling mount",
      "Centralised cloud controller",
      "Up to 300 concurrent clients",
    ],
    stock: "in",
  },
  {
    slug: "biometric-access-terminal",
    name: "Biometric Access Terminal",
    brand: "HID",
    category: "Terminals",
    price: 24500,
    image: "/images/products/product-11.avif",
    description:
      "Fingerprint and card access control with audit-ready logs — secure doors, timekeeping and attendance from one terminal.",
    specs: [
      "Fingerprint + RFID + PIN entry",
      "Anti-passback and duress support",
      "IP65-rated metal housing",
      "Offline mode with encrypted sync",
    ],
    stock: "low",
  },
  {
    slug: "industrial-labels-tape",
    name: "Industrial Labels & Tape",
    brand: "Proxima",
    category: "Accessories",
    price: 1850,
    image: "/images/products/product-16.avif",
    description:
      "Durable asset, barcode and safety labels that survive heat, moisture and years on the warehouse floor.",
    specs: [
      "Synthetic stock · waterproof adhesive",
      "Barcode-grade print surface",
      "Roll width 50mm · 500 labels",
      "Temperature range -20°C to 80°C",
    ],
    stock: "in",
  },
];

export function getStoreProduct(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}
