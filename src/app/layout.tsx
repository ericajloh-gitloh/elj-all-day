import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const shareImage = {
  url: SITE.shareImagePath,
  width: 1200,
  height: 1200,
  alt: "ELJ All Day — Strategic design for sports, media & fandom",
  type: "image/png" as const,
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — Design Advisory for Sports, Media & Fan Platforms`,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    title: SITE.name,
  },
  openGraph: {
    title: "Strategic design for sports, media & fandom.",
    description: "\u200B",
    url: SITE.url,
    siteName: "eljallday.com",
    locale: "en_US",
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic design for sports, media & fandom.",
    description: "\u200B",
    images: [SITE.shareImagePath],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
