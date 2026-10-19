import type { Metadata } from "next";
import { Archivo_Black, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proximatechsolutions.com"),
  title: "Proximatech Solutions — Securing Your Future",
  description:
    "Next-generation workplace productivity software, RFID, barcode and asset tracking solutions from Proximatech Solutions, Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
