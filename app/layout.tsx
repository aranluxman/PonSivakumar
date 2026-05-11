import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Pon Sivakumar Commercial Real Estate",
  description:
    "Premium Ontario commercial real estate investment and brokerage firm focused on commercial, industrial, and development-grade assets.",
  metadataBase: new URL("https://ponsivakumar.vercel.app"),
  openGraph: {
    title: "Pon Sivakumar Commercial Real Estate",
    description:
      "Commercial, industrial, and development-grade real estate opportunities across Ontario.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
