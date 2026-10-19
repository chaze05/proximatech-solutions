import type { Metadata } from "next";
import { Archivo_Black, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/store/CartProvider";
import { CartDrawer } from "@/components/store/CartDrawer";
import "./globals.css";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "optional",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proximatechsolutions.com"),
  title: "Proximatech Solutions — Securing Your Future",
  description:
    "Next-generation workplace productivity software, RFID, barcode and asset tracking solutions from Proximatech Solutions, Philippines.",
  openGraph: {
    title: "Proximatech Solutions — Securing Your Future",
    description:
      "RFID, barcode, asset tracking and custom software for modern workplaces.",
    type: "website",
    locale: "en_PH",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Proximatech Solutions — Securing Your Future",
    description:
      "RFID, barcode, asset tracking and custom software for modern workplaces.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-signal px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
