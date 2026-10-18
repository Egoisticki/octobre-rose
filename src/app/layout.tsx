import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.campaign.title} | ${siteConfig.brand.name}`,
  description: siteConfig.campaign.description,
  keywords: ["Pink October", "Open Minds Club", "USTHB", "volunteer", "awareness"],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${siteConfig.campaign.title} — ${siteConfig.brand.name}`,
    description: siteConfig.campaign.subtitle,
    type: "website",
    locale: "en_DZ",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF7FA",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
