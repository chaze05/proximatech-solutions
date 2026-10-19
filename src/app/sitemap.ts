import type { MetadataRoute } from "next";
import { STORE_PRODUCTS } from "@/data/store";

const BASE = "https://proximatechsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/services",
    "/gallery",
    "/store",
    "/events",
    "/contact",
  ];

  return [
    ...routes.map((route) => ({
      url: BASE + route,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...STORE_PRODUCTS.map((product) => ({
      url: `${BASE}/store/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
