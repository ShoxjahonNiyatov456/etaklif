import type React from "react";
import { Inter, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/client-wrapper";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Taklifnoma - Zamonaviy taklifnomalar platformasi",
  description: "Chiroyli va zamonaviy taklifnomalarni yarating",
  generator: "v0.dev",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'https://etaklif.vercel.app'),
  openGraph: {
    title: "Taklifnoma - Zamonaviy taklifnomalar platformasi",
    description: "Chiroyli va zamonaviy taklifnomalarni yarating",
    siteName: "etaklif.vercel.app",
    locale: "uz",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "etaklif.vercel.app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taklifnoma - Zamonaviy taklifnomalar platformasi",
    description: "Chiroyli va zamonaviy taklifnomalarni yarating",
    creator: "@taklifnoma_uz",
    site: "@taklifnoma_uz",
    images: ["/twitter-image.png"],
  },
  other: {
    "telegram:card": "summary_large_image",
    "telegram:site": "@taklifnoma_uz",
    "telegram:title": "Taklifnoma - Zamonaviy taklifnomalar platformasi",
    "telegram:description": "Chiroyli va zamonaviy taklifnomalarni yarating",
    "telegram:image": "/opengraph-image.png",
    "telegram:creator": "@taklifnoma_uz",
    "og:url": "https://etaklif.vercel.app",
    "og:title": "Taklifnoma - Zamonaviy taklifnomalar platformasi",
    "og:description": "Chiroyli va zamonaviy taklifnomalarni yarating",
    "og:image": "/opengraph-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:site_name": "etaklif.vercel.app",
    "og:locale": "uz_UZ",
    "og:type": "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} font-sans`}
      >
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster />
      </body>
    </html>
  );
}
